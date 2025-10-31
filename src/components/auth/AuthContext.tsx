import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextType = { 
  user: User | null; 
  loading: boolean 
};

export const AuthCtx = createContext<AuthContextType>({ 
  user: null, 
  loading: true 
});

