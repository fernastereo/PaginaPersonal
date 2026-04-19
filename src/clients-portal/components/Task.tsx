import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { z } from 'zod';
import { Upload, BookmarkCheck } from 'lucide-react';
import { FileItem } from '@/clients-portal/components/FileItem';
import { TaskComments } from '@/clients-portal/components/TaskComments';
import { useAuth } from '@/clients-portal/auth/useAuth';
import { taskService } from '@/clients-portal/integrations/firebase/taskService';
import { brevoEmailService } from '@/clients-portal/integrations/brevo/emailService';
import { firestoreService } from '@/clients-portal/integrations/firebase/firestoreService';
import type { Task as TaskType, TaskStatus } from '@/clients-portal/types/task';
import {
  analytics,
  logEvent,
  isProduction,
} from '@/clients-portal/integrations/firebase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserProfile } from '@/clients-portal/types/user';
import type { ClientProfile } from '@/clients-portal/types/client';
import { toastOptions } from '@/clients-portal/utils/toastOptions';

const taskSchema = z.object({
  title: z
    .string()
    .min(10, 'El título debe tener al menos 10 caracteres')
    .max(200),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000),
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx'];

const isValidFileType = (file: File): boolean => {
  const mimeType = file.type.toLowerCase();
  const extension = file.name.toLowerCase().split('.').pop() || '';
  return ALLOWED_MIME_TYPES.includes(mimeType) || ALLOWED_EXTENSIONS.includes(extension);
};

interface TaskProps {
  editingTask: TaskType | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const Task = ({ editingTask, onSuccess, onCancel }: TaskProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfile[] | null>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [taskNumber, setTaskNumber] = useState(editingTask?.taskNumber || '');
  const [formData, setFormData] = useState({
    title: editingTask?.title || '',
    description: editingTask?.description || '',
    status: (editingTask?.status ?? 'pending') as TaskStatus,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>(editingTask?.files || []);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const taskStatus = useMemo(
    () => ({
      cancelled: 'Cancelado',
      pending: 'Pendiente',
      in_progress: 'En progreso',
      on_hold: 'En espera',
      completed: 'Completado',
    }),
    []
  );

  useEffect(() => {
    if (editingTask) {
      setTaskNumber(editingTask.taskNumber);
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
      setExistingFiles(editingTask.files || []);
    } else {
      setTaskNumber('');
      setFormData({ title: '', description: '', status: 'pending' as TaskStatus });
      setFiles([]);
      setExistingFiles([]);
    }
  }, [editingTask]);

  useEffect(() => {
    const loadProfile = async () => {
      const currentUserProfile = await firestoreService.getUserProfile(user?.uid || '');
      const currentClientProfile = await firestoreService.getClientById(
        currentUserProfile?.client_id || []
      );
      setUserProfile(currentUserProfile);

      if (currentClientProfile) {
        setClientProfile(currentClientProfile);

        if (currentUserProfile?.role !== 'admin') {
          setSelectedClient({
            uid: currentClientProfile[0].uid,
            name: currentClientProfile[0].name,
            prefix: currentClientProfile[0].prefix,
          });
        } else if (editingTask) {
          setSelectedClient({
            uid: editingTask.client_id,
            name: editingTask.client_name,
            prefix: '',
          });
        }
      }
    };
    loadProfile();
  }, [user, editingTask]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} es demasiado grande (máximo 10MB)`, toastOptions);
        continue;
      }
      if (!isValidFileType(file)) {
        toast.error(
          `${file.name} no es un archivo válido. Tipos permitidos: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX`,
          toastOptions
        );
        continue;
      }
      validFiles.push(file);
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));
  const removeExistingFile = (index: number) => setExistingFiles(prev => prev.filter((_, i) => i !== index));

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'pending' as TaskStatus });
    setFiles([]);
    setExistingFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      taskSchema.parse(formData);

      if (!user) {
        toast.error('No estás autenticado', toastOptions);
        setLoading(false);
        return;
      }

      if (userProfile?.role === 'admin' && !selectedClient) {
        toast.error('No se ha seleccionado un cliente', toastOptions);
        setLoading(false);
        return;
      }

      if (editingTask) {
        const statusChangedToCompleted =
          editingTask.status !== 'completed' && formData.status === 'completed';

        await taskService.updateTask(
          editingTask.uid,
          {
            title: formData.title,
            description: formData.description,
            status: formData.status,
            client_id: selectedClient?.uid || '',
            client_name: selectedClient?.name || '',
            files: existingFiles,
          },
          files.length > 0 ? files : undefined
        );

        if (statusChangedToCompleted) {
          brevoEmailService
            .sendTaskCompletedNotification({
              taskNumber: editingTask.taskNumber,
              taskTitle: editingTask.title,
              taskCreatorId: editingTask.user_id,
              completedAt: new Date().toISOString(),
            })
            .catch(err => console.warn('No se pudo enviar notificación de tarea completada:', err));
        }
      } else {
        const newTask = await taskService.createTask(
          {
            user_id: user.uid,
            user_name: userProfile?.name || '',
            client_id: selectedClient?.uid || '',
            client_name: selectedClient?.name || '',
            title: formData.title,
            description: formData.description,
            status: 'pending',
          },
          files.length > 0 ? files : undefined
        );

        brevoEmailService
          .sendNewTaskNotification({
            taskNumber: newTask.taskNumber,
            taskTitle: newTask.title,
            taskDescription: newTask.description,
            creatorName: userProfile?.name || '',
            clientName: selectedClient?.name || '',
            createdAt: newTask.createdAt,
          })
          .catch(err => console.warn('No se pudo enviar notificación de nueva tarea:', err));
      }

      if (isProduction) {
        logEvent(analytics, editingTask ? 'update_task' : 'create_task', {
          task: formData.title,
          user: userProfile?.name || '',
        });
      }

      toast.success(
        editingTask ? 'Tarea actualizada correctamente' : 'Tarea creada correctamente',
        toastOptions
      );
      resetForm();
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Error de validación', { description: error.issues[0].message });
      } else {
        toast.error(
          editingTask ? 'No se pudo actualizar la tarea' : 'No se pudo crear la tarea',
          { description: (error as { message?: string }).message || 'Ocurrió un error' }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      {/* Cabecera */}
      <div className="flex items-center gap-2 mb-6">
        <BookmarkCheck className="h-5 w-5 text-primary" />
        {taskNumber && (
          <span className="text-sm font-semibold text-primary">{taskNumber}</span>
        )}
        <span className="text-lg font-semibold">
          {editingTask ? 'Actualizar Tarea' : 'Nueva Tarea'}
        </span>
        <span className="text-sm text-muted-foreground">
          {editingTask ? '— Actualiza los datos de la tarea' : '— Completa los datos para registrar una nueva tarea'}
        </span>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row gap-2">
          <div className={`space-y-2 ${editingTask ? 'w-[75%]' : 'w-full'}`}>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Título de la tarea"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div className={`space-y-2 ${editingTask ? 'block w-[25%]' : 'hidden'}`}>
            <Label htmlFor="status">Estado *</Label>
            <Select
              value={formData.status}
              onValueChange={value => setFormData({ ...formData, status: value as TaskStatus })}
              required
              disabled={loading}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(taskStatus).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="space-y-2 w-[75%]">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe la incidencia en detalle..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={12}
              className="resize-none h-40 md:h-48"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2 w-[25%] pt-6 px-2 flex flex-col gap-2">
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm font-medium">Informador</span>
              <span className="text-sm text-muted-foreground">
                {editingTask?.user_name || '- -'}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm font-medium">Estimación Original</span>
              <span className="text-sm text-muted-foreground">- -</span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm font-medium">Prioridad</span>
              <span className="text-sm text-muted-foreground">- -</span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm font-medium">Etiquetas</span>
              <span className="text-sm text-muted-foreground">- -</span>
            </div>
            {userProfile?.role === 'admin' && (
              <div className="flex flex-row gap-2 justify-between">
                <Label htmlFor="client">Cliente</Label>
                <Select
                  value={selectedClient?.uid || ''}
                  onValueChange={value =>
                    setSelectedClient({
                      uid: value,
                      name: clientProfile?.find(c => c.uid === value)?.name || '',
                      prefix: clientProfile?.find(c => c.uid === value)?.prefix || '',
                    })
                  }
                  required
                  disabled={loading}
                >
                  <SelectTrigger id="client" className="w-[70%] text-xs" size="sm">
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientProfile?.map(client => (
                      <SelectItem key={client.uid} value={client.uid}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 w-[75%]">
          <Label htmlFor="archivos">Archivos Adjuntos</Label>
          <div className="flex items-center gap-2">
            <Input
              id="archivos"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('archivos')?.click()}
              disabled={loading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Seleccionar archivos
            </Button>
            {(files.length > 0 || existingFiles.length > 0) && (
              <span className="text-sm text-muted-foreground">
                {files.length + existingFiles.length} archivo(s)
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            PDF, JPG, PNG, DOC, DOCX, XLS, XLSX (máx. 10MB por archivo)
          </p>
          {(files.length > 0 || existingFiles.length > 0) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {existingFiles.map((fileUrl, index) => (
                <FileItem
                  key={`existing-${index}`}
                  fileUrl={fileUrl}
                  index={index}
                  onRemove={removeExistingFile}
                  loading={loading}
                />
              ))}
              {files.map((file, index) => (
                <FileItem
                  key={`new-${index}`}
                  file={file}
                  index={index}
                  onRemove={removeFile}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? 'Guardando...'
              : editingTask
                ? 'Actualizar Tarea'
                : 'Crear Tarea'}
          </Button>
        </div>
      </form>

      {editingTask && (
        <TaskComments
          taskId={editingTask.uid}
          initialComments={editingTask.comments || []}
          currentUserId={user?.uid || ''}
          currentUserName={userProfile?.name || ''}
          taskCreatorId={editingTask.user_id}
          taskNumber={editingTask.taskNumber}
          taskTitle={editingTask.title}
        />
      )}
    </>
  );
};
