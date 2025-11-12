import type { ExternalToast } from 'sonner';

/**
 * Opciones por defecto para los toasts en la aplicación
 */
export const toastOptions: ExternalToast = {
  position: 'top-right',
  style: {
    background: 'hsl(var(--secondary))',
    color: 'hsl(var(--primary))',
    border: '1px solid hsl(var(--primary))',
  },
};

