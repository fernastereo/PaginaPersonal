import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { useEffect, useState, type ReactNode } from "react";
import { AuthCtx } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (u) => { 
    setUser(u); 
    setLoading(false); 
  }), []);

  return <AuthCtx.Provider 
          value={{ user, loading }}
        >
          {children}
        </AuthCtx.Provider>;
}