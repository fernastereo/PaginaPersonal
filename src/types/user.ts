export type UserRole = "admin" | "user" | "guest";

export interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  ciudad: string;
  tipoUsuario: UserRole;
  telefono?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  nombre: string;
  ciudad: string;
  tipoUsuario: UserRole;
  telefono?: string;
}

