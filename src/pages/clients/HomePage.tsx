import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  analytics,
  logEvent,
  auth,
  isProduction,
} from '@/integrations/firebase/client';
import { useAuth } from '@/components/auth/useAuth';
import { Button } from '@/components/ui/button';
import {
  Home,
  Users,
  UserCircle,
  LogOut,
  Menu,
  X,
  FolderKanban,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { UserProfile } from '@/types/user';
import { firestoreService } from '@/integrations/firebase/firestoreService';

const HomePage = () => {
  const { user, client_id } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/clients/login');
  };

  const loadProfile = useCallback(async () => {
    const userProfile = await firestoreService.getUserProfile(user?.uid || '');
    setUserProfile(userProfile);

    if (userProfile && client_id) {
      const clientProfile = await firestoreService.getClientById(client_id);

      if (clientProfile) {
        if (userProfile.role !== 'admin') {
          setClientName(clientProfile[0].name);
        } else {
          setClientName('Admin');
        }
      }
    }

    if (isProduction) {
      logEvent(analytics, 'log in to clients portal', {
        user: userProfile?.name,
        client: clientName || '',
      });
    }
  }, [user, client_id, clientName]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user, loadProfile]);

  const navItems =
    userProfile?.role === 'admin' && userProfile
      ? [
          { path: '/clients/home', icon: Home, label: 'Inicio' },
          { path: '/clients/tasks', icon: FolderKanban, label: 'Tareas' },
          { path: '/clients/users', icon: Users, label: 'Usuarios' },
          { path: '/clients/profile', icon: UserCircle, label: 'Mi Perfil' },
        ]
      : [
          { path: '/clients/home', icon: Home, label: 'Inicio' },
          { path: '/clients/tasks', icon: FolderKanban, label: 'Tareas' },
          { path: '/clients/profile', icon: UserCircle, label: 'Mi Perfil' },
        ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {userProfile?.name}
            </p>
            <span className="text-xs font-bold text-muted-foreground">
              {clientName}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;

