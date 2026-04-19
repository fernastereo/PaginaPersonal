import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/clients-portal/components/Task';
import { taskService } from '@/clients-portal/integrations/firebase/taskService';
import type { Task as TaskType } from '@/clients-portal/types/task';
import { toast } from 'sonner';
import { toastOptions } from '@/clients-portal/utils/toastOptions';

const TaskView = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const isNew = !taskId;

  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew || !taskId) return;

    const loadTask = async () => {
      setLoading(true);
      try {
        const fetched = await taskService.getTaskById(taskId);
        if (fetched) {
          setTask(fetched);
        } else {
          toast.error('Tarea no encontrada', toastOptions);
          navigate('/clients/tasks');
        }
      } catch {
        toast.error('No se pudo cargar la tarea', toastOptions);
        navigate('/clients/tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId, isNew, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <div className="container mx-auto p-4 md:p-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2"
          onClick={() => navigate('/clients/tasks')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a tareas
        </Button>

        <Task
          editingTask={task}
          onSuccess={() => navigate('/clients/tasks')}
          onCancel={() => navigate('/clients/tasks')}
        />
      </div>
    </div>
  );
};

export default TaskView;
