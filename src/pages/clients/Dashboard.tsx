import { signOut } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  FileText,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Task } from '@/types/task';
import { taskService } from '@/integrations/firebase/taskService';
import { useAuth } from '@/components/auth/useAuth';

interface Stats {
  total: number;
  pendiente: number;
  en_proceso: number;
  resuelto: number;
  cerrado: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, client_id } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/clients/login');
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pendiente: 0,
    en_proceso: 0,
    resuelto: 0,
    cerrado: 0,
  });
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    if (!user) {
      navigate('/clients/login');
    }
  }, [user, navigate]);

  const loadData = useCallback(async () => {
    setLoading(true);
    if (client_id) {
      const tasks = await taskService.getTasks(client_id);
      setTasks(tasks);
      calculateStats(tasks);
    }
    setLoading(false);
  }, [client_id]);

  useEffect(() => {
    checkAuth();
    loadData();
  }, [checkAuth, loadData]);

  const calculateStats = (data: Task[]) => {
    const stats: Stats = {
      total: data.length,
      pendiente: data.filter(i => i.status === 'pending').length,
      en_proceso: data.filter(i => i.status === 'in_progress').length,
      resuelto: data.filter(i => i.status === 'completed').length,
      cerrado: data.filter(i => i.status === 'cancelled').length,
    };
    setStats(stats);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pendiente: '#f59e0b',
      en_proceso: '#3b82f6',
      resuelto: '#10b981',
      cerrado: '#6b7280',
    };
    return colors[status as keyof typeof colors] || colors.pendiente;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pendiente: 'Pendiente',
      en_proceso: 'En Proceso',
      resuelto: 'Resuelto',
      cerrado: 'Cerrado',
    };
    return labels[status as keyof typeof labels] || status;
  };

  // Datos para gráfico de distribución por estado
  const statusDistributionData = [
    { name: 'Pendiente', value: stats.pendiente, color: '#f59e0b' },
    { name: 'En Proceso', value: stats.en_proceso, color: '#3b82f6' },
    { name: 'Resuelto', value: stats.resuelto, color: '#10b981' },
    { name: 'Cerrado', value: stats.cerrado, color: '#6b7280' },
  ].filter(item => item.value > 0);

  // Datos para gráfico de tendencia (últimos 7 días)
  const getTrendData = () => {
    const days = 7;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      const created = tasks.filter(
        task =>
          new Date(task.createdAt) >= dayStart &&
          new Date(task.createdAt) <= dayEnd
      ).length;

      const resolved = tasks.filter(
        task =>
          task.status === 'completed' &&
          new Date(task.updatedAt) >= dayStart &&
          new Date(task.updatedAt) <= dayEnd
      ).length;

      data.push({
        date: format(date, 'dd/MM', { locale: es }),
        creadas: created,
        resueltas: resolved,
      });
    }

    return data;
  };

  const trendData = getTrendData();

  // Incidencias recientes
  const recentTasks = tasks.slice(0, 3);

  // Tiempo promedio de resolución (en días)
  const getAverageResolutionTime = () => {
    const resolved = tasks.filter(
      task => task.status === 'completed' || task.status === 'cancelled'
    );
    if (resolved.length === 0) return 0;

    const totalDays = resolved.reduce((acc, task) => {
      const created = new Date(task.createdAt);
      const updated = new Date(task.updatedAt);
      const days = Math.ceil(
        (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      );
      return acc + days;
    }, 0);

    return (totalDays / resolved.length).toFixed(1);
  };

  const avgResolutionTime = getAverageResolutionTime();

  const chartConfig = {
    creadas: {
      label: 'Creadas',
      color: 'hsl(var(--primary))',
    },
    resueltas: {
      label: 'Resueltas',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard de Incidencias</h1>
            <p className="text-muted-foreground mt-2">
              Vista general y métricas
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/clients/tasks')}
              variant="outline"
              size="sm"
            >
              <FileText className="mr-2 h-4 w-4" />
              Ver Todas
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando datos...</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card className="hover:shadow-lg transition-shadow border-border py-4 gap-0 h-[130px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Total Incidencias
                  </CardTitle>
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Todas las incidencias registradas
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-border py-4 gap-0 h-[130px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Pendientes
                  </CardTitle>
                  <AlertCircle className="h-8 w-8 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.pendiente}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Requieren atención
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-border py-4 gap-0 h-[130px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    En Proceso
                  </CardTitle>
                  <Activity className="h-8 w-8 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.en_proceso}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Siendo atendidas
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-border py-4 gap-0 h-[130px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Resueltas
                  </CardTitle>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats.resuelto + stats.cerrado}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Completadas con éxito
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Tendencia de 7 días */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tendencia (Últimos 7 días)
                  </CardTitle>
                  <CardDescription>
                    Incidencias creadas vs resueltas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-0">
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="creadas"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Creadas"
                        />
                        <Line
                          type="monotone"
                          dataKey="resueltas"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={2}
                          name="Resueltas"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Distribución por Estado */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Distribución por Estado
                  </CardTitle>
                  <CardDescription>
                    Porcentaje de incidencias por estado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Métrica de Tiempo Promedio */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Tiempo Promedio
                  </CardTitle>
                  <CardDescription>Resolución de incidencias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">
                    {avgResolutionTime}
                  </div>
                  <p className="text-sm text-muted-foreground">días promedio</p>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Resueltas:</span>
                      <span className="font-medium">{stats.resuelto}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cerradas:</span>
                      <span className="font-medium">{stats.cerrado}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Incidencias Recientes */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Incidencias Recientes</CardTitle>
                      <CardDescription>
                        Últimas 3 incidencias registradas
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/clients/tasks')}
                    >
                      Ver todas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        No hay incidencias registradas
                      </p>
                    ) : (
                      recentTasks.map(task => (
                        <div
                          key={task.uid}
                          className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-medium text-sm break-words">
                                {task.title}
                              </h4>
                              <Badge
                                variant="secondary"
                                className="shrink-0"
                                style={{
                                  backgroundColor: `${getStatusColor(
                                    task.status
                                  )}20`,
                                  color: getStatusColor(task.status),
                                }}
                              >
                                {getStatusLabel(task.status)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                              {task.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(
                                new Date(task.createdAt),
                                'dd/MM/yyyy HH:mm',
                                {
                                  locale: es,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

