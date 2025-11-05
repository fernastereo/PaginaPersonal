import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Plus,
  LogOut,
  Search,
  Calendar,
  MessageCircle,
  Paperclip,
  Pencil,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TaskDialog } from '@/components/TaskDialog';
import { taskService } from '@/integrations/firebase/taskService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useAuth } from '@/components/auth/useAuth';
import {
  analytics,
  auth,
  logEvent,
  isProduction,
} from '@/integrations/firebase/client';
import type { Task } from '@/types/task';
import type { UserProfile } from '@/types/user';
import { firestoreService } from '@/integrations/firebase/firestoreService';

const ITEMS_PER_PAGE = 10;

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user, client_id } = useAuth();

  const checkAuth = useCallback(async () => {
    const userProfile = await firestoreService.getUserProfile(user?.uid || '');
    setUserProfile(userProfile);
    if (!user) {
      navigate('/clients/login');
    }
  }, [user, navigate]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    if (client_id) {
      const tasks = await taskService.getTasks(client_id);
      setTasks(tasks);
      setFilteredTasks(tasks);
    }
    if (isProduction) {
      logEvent(analytics, 'load tasks page', {});
    }
    setLoading(false);
  }, [client_id]);

  useEffect(() => {
    checkAuth();
    loadTasks();
  }, [checkAuth, loadTasks]);

  const filterTasks = useCallback(() => {
    let filtered = [...tasks];

    if (searchTitle) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter(task =>
        format(new Date(task.createdAt), 'yyyy-MM-dd').includes(searchDate)
      );
    }

    setFilteredTasks(filtered);
    setCurrentPage(1);
  }, [tasks, searchTitle, searchDate]);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/clients/login');
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    if (isProduction) {
      logEvent(analytics, 'click_on_edit_task', { task: task.title });
    }
    setDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendiente', className: 'bg-red-500' as const },
      in_progress: { label: 'En Proceso', className: 'bg-yellow-500' as const },
      completed: { label: 'Resuelto', className: 'bg-green-500' as const },
      cancelled: { label: 'Cerrado', className: 'bg-gray-500' as const },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Incidencias</h1>
            <p className="text-muted-foreground mt-2">
              Administra y registra incidencias
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Salir
          </Button>
        </div>

        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Busca incidencias por título o Date
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              onClick={() => {
                if (isProduction) {
                  logEvent(analytics, 'click_on_new_task', {});
                }
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva Incidencia
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando incidencias...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron incidencias
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground font-semibold">
                      ID
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Título
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      {userProfile?.role !== 'admin'
                        ? 'Descripción'
                        : 'Cliente'}
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Creado
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Actualizado
                    </TableHead>
                    <TableHead className="text-center w-[50px] text-muted-foreground font-semibold">
                      <Paperclip className="h-4 w-4 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center w-[50px] text-muted-foreground font-semibold">
                      <MessageCircle className="h-4 w-4 mx-auto" />
                    </TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTasks.map(task => (
                    <TableRow key={task.uid} className="border-border">
                      <TableCell className="font-medium">
                        <Button
                          variant="link"
                          className="cursor-pointer p-0"
                          onClick={() => handleEdit(task)}
                        >
                          {task.taskNumber}
                        </Button>
                      </TableCell>
                      <TableCell className="flex flex-col font-medium">
                        {task.title}
                        <span className="text-xs text-muted-foreground">
                          {task.user_name}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {userProfile?.role !== 'admin'
                          ? task.description
                          : task.client_name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(task.createdAt), 'dd/MM/yyyy', {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(task.updatedAt), 'dd/MM/yyyy', {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        {task.files?.length > 0 && (
                          <Paperclip className="h-4 w-4 mx-auto text-primary" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {task.comments?.length > 0 && (
                          <MessageCircle className="h-4 w-4 mx-auto text-primary" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            className="border-border"
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(task)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      page => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage(p => Math.min(totalPages, p + 1))
                        }
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        <TaskDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={loadTasks}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
};

export default Tasks;
