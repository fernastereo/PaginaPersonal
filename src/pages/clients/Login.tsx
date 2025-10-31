import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { auth } from "@/integrations/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/components/auth/useAuth";
import { useTranslation } from 'react-i18next';

const authSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId } = useParams();
  const { user } = useAuth();
  const { t } = useTranslation();

  const toastOptions = { 
    position: "top-right" as const,
    style: { 
      background: "hsl(var(--secondary))",
      color: "hsl(var(--primary))",
      border: "1px solid hsl(var(--primary))"
    }
  }

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || `/clients/dashboard`;
      navigate(from, { replace: true });
    }
  }, [user, navigate, location, clientId]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      authSchema.parse({ email, password });

        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sesión iniciada correctamente", toastOptions);
        navigate(`/dashboard`);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        toast.error("Error de validación", toastOptions);
      }else{
        const code = (error as { code?: string }).code;
        const message =
          code === "auth/invalid-credential" || code === "auth/wrong-password"
            ? "Credenciales incorrectas"
            : code === "auth/user-not-found"
            ? "Usuario no encontrado"
            : code === "auth/email-already-in-use"
            ? "Este email ya está registrado"
            : (error as { message?: string }).message || "Ocurrió un error";
        toast.error(message, toastOptions);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-accent/20 p-4">
      <Toaster/>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t('clients.login')}</CardTitle>
          <CardDescription>
              {t('clients.login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('clients.login.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('clients.login.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('clients.login.loading') : t('clients.login.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;