import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '@/clients-portal/integrations/firebase/client';
import { useEffect, useState, type ReactNode } from 'react';
import { AuthCtx } from './AuthContext';
import { firestoreService } from '@/clients-portal/integrations/firebase/firestoreService';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [client_id, setClient_id] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, async u => {
        setUser(u);
        if (u) {
          const userProfile = await firestoreService.getUserProfile(
            u.uid || ''
          );
          if (userProfile) {
            setClient_id(userProfile.client_id);
          }
        }
        setLoading(false);
      }),
    []
  );

  return (
    <AuthCtx.Provider value={{ user, client_id, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}