export type UserRole = "admin" | "user" | "guest";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  city: string;
  role: UserRole;
  phone?: string;
  client_id?: string;
  createdAt: string;
  updatedAt: string;
}


