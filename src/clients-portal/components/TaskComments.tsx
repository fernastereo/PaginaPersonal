import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, MessageSquare, X, Paperclip } from 'lucide-react';
import { FileItem } from '@/clients-portal/components/FileItem';
import { taskService } from '@/clients-portal/integrations/firebase/taskService';
import { brevoEmailService } from '@/clients-portal/integrations/brevo/emailService';
import type { TaskComment } from '@/clients-portal/types/task';
import { toastOptions } from '@/clients-portal/utils/toastOptions';

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

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() || '')
    .join('');
};

interface TaskCommentsProps {
  taskId: string;
  initialComments: TaskComment[];
  currentUserId: string;
  currentUserName: string;
  taskCreatorId: string;
  taskNumber: string;
  taskTitle: string;
}

export const TaskComments = ({
  taskId,
  initialComments,
  currentUserId,
  currentUserName,
  taskCreatorId,
  taskNumber,
  taskTitle,
}: TaskCommentsProps) => {
  const [comments, setComments] = useState<TaskComment[]>(
    [...(initialComments || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );
  const [commentText, setCommentText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} supera el tamaño máximo (10MB)`, toastOptions);
        continue;
      }
      if (!isValidFileType(file)) {
        toast.error(
          `${file.name} no es un tipo de archivo válido. Tipos permitidos: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX`,
          toastOptions
        );
        continue;
      }
      validFiles.push(file);
    }

    setFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim() && files.length === 0) {
      toast.error('Escribe un comentario o adjunta un archivo', toastOptions);
      return;
    }

    if (commentText.trim().length > 0 && commentText.trim().length < 5) {
      toast.error('El comentario debe tener al menos 5 caracteres', toastOptions);
      return;
    }

    setLoading(true);
    try {
      const newComment = await taskService.addComment(
        taskId,
        {
          text: commentText.trim(),
          user_id: currentUserId,
          user_name: currentUserName,
        },
        files.length > 0 ? files : undefined
      );

      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      setFiles([]);
      toast.success('Comentario agregado', toastOptions);

      // Enviar notificación por email en segundo plano (no bloquear la UI)
      brevoEmailService
        .sendCommentNotification({
          taskId,
          taskNumber,
          taskTitle,
          taskCreatorId,
          commenterName: currentUserName,
          commentText: newComment.text,
          commentCreatedAt: newComment.createdAt,
          filesCount: newComment.files.length,
          currentUserId,
        })
        .catch(err => {
          console.warn('No se pudo enviar la notificación por email:', err);
        });
    } catch {
      toast.error('No se pudo agregar el comentario', toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border mt-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">
          Comentarios
          {comments.length > 0 && (
            <span className="ml-1.5 text-xs text-muted-foreground font-normal">
              ({comments.length})
            </span>
          )}
        </span>
      </div>

      {/* Formulario de nuevo comentario */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2 items-start">
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold"
            title={currentUserName}
          >
            {getUserInitials(currentUserName)}
          </div>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Escribe un comentario..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
              className="resize-none text-sm"
              disabled={loading}
            />
            {files.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {files.map((file, index) => (
                  <FileItem
                    key={`comment-new-${index}`}
                    file={file}
                    index={index}
                    onRemove={removeFile}
                    loading={loading}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="text-muted-foreground hover:text-primary h-7 px-2"
                  title="Adjuntar archivo"
                >
                  <Paperclip className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Adjuntar</span>
                </Button>
                {files.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiles([])}
                    disabled={loading}
                    className="text-muted-foreground hover:text-destructive h-7 px-2"
                    title="Eliminar todos los adjuntos"
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">
                      {files.length} adjunto{files.length !== 1 ? 's' : ''}
                    </span>
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={
                  loading || (!commentText.trim() && files.length === 0)
                }
                className="h-7 px-3 text-xs"
              >
                <Send className="h-3 w-3 mr-1" />
                {loading ? 'Enviando...' : 'Comentar'}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <MessageSquare className="h-8 w-8 text-muted-foreground/40 mb-2" />
          <p className="text-sm text-muted-foreground">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
          {comments.map(comment => (
            <div key={comment.uid} className="flex gap-2 items-start">
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center text-xs font-semibold"
                title={comment.user_name}
              >
                {getUserInitials(comment.user_name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold">
                    {comment.user_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt)} ·{' '}
                    {formatTime(comment.createdAt)}
                  </span>
                </div>
                {comment.text && (
                  <p className="text-sm mt-0.5 whitespace-pre-wrap break-words">
                    {comment.text}
                  </p>
                )}
                {comment.files && comment.files.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                    {comment.files.map((fileUrl, index) => (
                      <FileItem
                        key={`comment-file-${comment.uid}-${index}`}
                        fileUrl={fileUrl}
                        index={index}
                        onRemove={() => {}}
                        loading={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botón para cargar más si hay muchos comentarios */}
      {comments.length >= 10 && (
        <p className="text-xs text-center text-muted-foreground">
          Mostrando los {comments.length} comentarios más recientes
        </p>
      )}
    </div>
  );
};
