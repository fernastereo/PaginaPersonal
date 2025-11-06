import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { z } from 'zod';
import { Upload, X, BookmarkCheck } from 'lucide-react';
import { useAuth } from './auth/useAuth';
import { taskService } from '@/integrations/firebase/taskService';
import { firestoreService } from '@/integrations/firebase/firestoreService';
import type { Task, TaskStatus } from '@/types/task';
import {
  analytics,
  logEvent,
  isProduction,
} from '@/integrations/firebase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
  'application/doc',
  'application/docx',
  'application/xls',
  'application/xlsx',
];

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editingTask: Task | null;
}

export const TaskDialog = ({
  open,
  onOpenChange,
  onSuccess,
  editingTask,
}: TaskDialogProps) => {
  const toastOptions = useMemo(
    () => ({
      position: 'top-right' as const,
      style: {
        background: 'hsl(var(--secondary))',
        color: 'hsl(var(--primary))',
        border: '1px solid hsl(var(--primary))',
      },
    }),
    []
  );

  const taskStatus = useMemo(
    () => ({
      cancelled: 'Cancelado',
      pending: 'Pendiente',
      in_progress: 'En progreso',
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
    } else {
      // Resetear cuando no hay tarea para editar
      setTaskNumber('');
      setFormData({
        title: '',
        description: '',
        status: 'pending' as TaskStatus,
      });
      setFiles([]);
    }
  }, [editingTask, open]);

  const [taskNumber, setTaskNumber] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as TaskStatus,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      const validFiles: File[] = [];
      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(
            `${file.name} es demasiado grande (máximo 10MB)`,
            toastOptions
          );
          continue;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.error(`${file.name} no es un archivo válido`, toastOptions);
          continue;
        }

        validFiles.push(file);
      }

      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending' as TaskStatus,
    });
    setFiles([]);
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

      const userProfile = await firestoreService.getUserProfile(user.uid);
      const clientProfile = await firestoreService.getClientById(
        userProfile?.client_id || []
      );
      const clientId = userProfile?.client_id[0] || '';
      const clientName =
        userProfile?.role !== 'admin' ? clientProfile[0].name : 'Admin';

      if (editingTask) {
        await taskService.updateTask(editingTask.uid, {
          title: formData.title,
          description: formData.description,
          status: formData.status,
        });
      } else {
        await taskService.createTask(
          {
            user_id: user.uid,
            user_name: userProfile?.name || '',
            client_id: clientId,
            client_name: clientName || '',
            title: formData.title,
            description: formData.description,
            status: 'pending',
          },
          files.length > 0 ? files : undefined
        );
      }
      if (isProduction) {
        logEvent(analytics, editingTask ? 'update_task' : 'create_task', {
          task: formData.title,
          user: userProfile?.name || '',
        });
      }

      toast.success(
        editingTask
          ? 'Tarea actualizada correctamente'
          : 'Tarea creada correctamente',
        toastOptions
      );
      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Error de validación', {
          description: error.issues[0].message,
        });
      } else {
        toast.error(
          editingTask
            ? 'No se pudo actualizar la tarea'
            : 'No se pudo crear la tarea',
          {
            description:
              (error as { message?: string }).message || 'Ocurrió un error',
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !loading) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Toaster />
      <DialogContent className="h-[65vh] md:max-w-[calc(100%-35rem)] md:h-[61vh] block overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {taskNumber ? taskNumber : ''}
            </span>
            <span className="text-sm font-semibold">
              {editingTask ? 'Actualizar Incidencia' : 'Nueva Incidencia'}
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-md text-muted-foreground">
              {editingTask
                ? 'Actualiza los datos de la incidencia'
                : 'Completa los datos para registrar una nueva incidencia'}
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex flex-row gap-2">
            <div className={`space-y-2 ${editingTask ? 'w-[75%]' : 'w-full'}`}>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                placeholder="Título de la incidencia"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
            <div
              className={`space-y-2 ${
                editingTask ? 'block w-[25%]' : 'hidden'
              }`}
            >
              <Label htmlFor="status">Estado *</Label>
              <Select
                value={formData.status}
                onValueChange={value =>
                  setFormData({ ...formData, status: value as TaskStatus })
                }
                required
                disabled={loading}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(taskStatus).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe la incidencia en detalle..."
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={12}
              className="resize-none h-40 md:h-48"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="archivos">Archivos Adjuntos</Label>
            <div className="flex items-center gap-2">
              <Input
                id="archivos"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx, xls, xlsx"
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
              {files.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {files.length} archivo(s) seleccionado(s)
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              PDF, JPG, PNG, DOC, DOCX, XLS, XLSX (máx. 10MB por archivo)
            </p>
            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-accent/50 rounded-md"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm truncate block">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? 'Creando...'
                : editingTask
                ? 'Actualizar Incidencia'
                : 'Crear Incidencia'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
