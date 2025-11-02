import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import type { UserProfile, UserRole } from '@/types/user';
import type { ClientProfile } from '@/types/client';

const USERS_COLLECTION: string = 'users';
const CLIENTS_COLLECTION: string = 'clients';

export const firestoreService = {
  // Crear perfil de usuario
  async createUserProfile(
    uid: string,
    data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
  ) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const now = new Date().toISOString();

    const userData: UserProfile = {
      ...data,
      uid,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(userRef, userData);
    return userData;
  },

  // Obtener perfil de usuario
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }

    return null;
  },

  // Actualizar perfil de usuario
  async updateUserProfile(
    uid: string,
    data: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
  ) {
    //primero verificar si existe el usuario, si no existe crearlo
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await firestoreService.createUserProfile(
        uid,
        data as Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'> & {
          email: string;
        }
      );
      return;
    }

    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  // Obtener todos los usuarios (admin)
  async getAllUsers(): Promise<UserProfile[]> {
    const usersRef = collection(db, USERS_COLLECTION);
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => doc.data() as UserProfile);
  },

  async getUsersByClientId(clientId: string): Promise<string[]> {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('client_id', '==', clientId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.id as string);
  },

  // Buscar usuarios por tipo
  async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('role', '==', role));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as UserProfile);
  },

  async getClientById(uid: string): Promise<ClientProfile | null> {
    const clientRef = doc(db, CLIENTS_COLLECTION, uid);
    const clientSnap = await getDoc(clientRef);

    if (clientSnap.exists()) {
      return clientSnap.data() as ClientProfile;
    }

    return null;
  },
};

