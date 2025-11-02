import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { auth } from "@/integrations/firebase/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestoreService } from "@/integrations/firebase/firestoreService";
import type { UserRole } from "@/types/user";

//TODO: Actualmente esto crea el usuario y se loguea automaticamente, 
//Dado que el admin es el unico que puede crear usuarios, deberia crear el usuario y luego redirigir a la pagina de usuarios como admin
const registerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  ciudad: z.string().min(2, { message: "La ciudad es requerida" }),
  telefono: z.string().optional(),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    city: '',
    phone: '',
    client_id: '',
    role: 'user' as UserRole,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar datos
      registerSchema.parse(formData);

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Crear perfil en Firestore
      await firestoreService.createUserProfile(userCredential.user.uid, {
        email: formData.email,
        name: formData.name,
        city: formData.city,
        phone: formData.phone,
        client_id: '',
        role: formData.role,
      });

      toast.success('Cuenta creada correctamente');
      navigate('/clients/users');
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else {
        const code = (error as { code?: string }).code;
        const message =
          code === 'auth/email-already-in-use'
            ? 'Este email ya está registrado'
            : code === 'auth/weak-password'
            ? 'La contraseña es muy débil'
            : (error as { message?: string }).message || 'Ocurrió un error';
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-accent/20 p-4">
      <Toaster />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
          <CardDescription>
            Completa el formulario para registrarte
          </CardDescription>
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
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
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
                <Label htmlFor="phone">Teléfono (opcional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuario</Label>
                <Select
                  value={formData.role}
                  onValueChange={value =>
                    setFormData({ ...formData, role: value as UserRole })
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
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

