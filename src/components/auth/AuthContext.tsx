import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  client_id: string[];
  loading: boolean;
};

export const AuthCtx = createContext<AuthContextType>({
  user: null,
  client_id: [],
  loading: true,
});

