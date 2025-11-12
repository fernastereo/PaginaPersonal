import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/clients-portal/auth/useAuth';
import { firestoreService } from '@/clients-portal/integrations/firebase/firestoreService';
import type { UserProfile } from '@/clients-portal/types/user';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { UserCircle, Save, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    role: 'user' as UserProfile['role'],
    email: '',
    phone: '',
    client_id: [] as string[],
  });

  const loadProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await firestoreService.getUserProfile(user.uid);
      if (data) {
        setProfile(data);
        setFormData({
          name: data.name,
          city: data.city,
          role: data.role,
          email: data.email || '',
          phone: data.phone || '',
          client_id: data.client_id || [],
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Error al cargar el perfil', toastOptions);
    } finally {
      setLoading(false);
    }
  }, [user, toastOptions]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user, loadProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      await firestoreService.updateUserProfile(user.uid, formData);
      toast.success('Perfil actualizado correctamente', toastOptions);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil', toastOptions);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Toaster />
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Administra tu información personal
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-primary" />
            </div>
            <div>
              <CardTitle>{profile?.name || 'Usuario'}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={e =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              {formData?.role === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de Usuario</Label>
                  <Select
                    value={formData.role}
                    onValueChange={value =>
                      setFormData({
                        ...formData,
                        role: value as UserProfile['role'],
                      })
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Usuario</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="guest">Invitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Metadata Card */}
      {profile && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID de Usuario:</span>
              <span className="font-mono">{profile.uid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha de Registro:</span>
              <span>{new Date(profile.createdAt).toLocaleString('es-ES')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Última Actualización:
              </span>
              <span>{new Date(profile.updatedAt).toLocaleString('es-ES')}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
