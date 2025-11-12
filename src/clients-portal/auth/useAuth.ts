import { useContext } from "react";
import { AuthCtx } from "./AuthContext";

export const useAuth = () => useContext(AuthCtx);

