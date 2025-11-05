import { db } from "@/integrations/firebase/client";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import type { Task } from '@/types/task';
import { uploadTaskFileToS3 } from '@/integrations/aws/storage';
import { firestoreService } from '@/integrations/firebase/firestoreService';
import { counterService } from './counterService';

const TASK_COLLECTION: string = 'tasks';

export const taskService = {
  async createTask(
    data: Omit<
      Task,
      | 'uid'
      | 'taskNumber'
      | 'createdAt'
      | 'updatedAt'
      | 'completedAt'
      | 'comments'
      | 'files'
      | 'filesCompleted'
    >,
    files?: File[]
  ): Promise<Task> {
    try {
      const taskRef = doc(collection(db, TASK_COLLECTION));
      const uid = taskRef.id;
      const now = new Date().toISOString();

      const taskNumber = await counterService.getNextTaskNumber(data.client_id);

      let fileURLs: string[] | null = null;
      if (files && files.length > 0) {
        const uploadPromises = files.map(file =>
          uploadTaskFileToS3(uid, file, 'original')
        );
        fileURLs = (await Promise.all(uploadPromises)) as string[] | null;
      }

      const taskData: Task = {
        ...data,
        uid,
        taskNumber,
        files: fileURLs || [],
        completedAt: '',
        comments: [],
        filesCompleted: [],
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(taskRef, taskData);
      return taskData;
    } catch (error) {
      console.error('Error en createTask:', error);
      throw error;
    }
  },

  async getTasks(clientId: string[]): Promise<Task[]> {
    try {
      const users = await firestoreService.getUsersByClientId(clientId);
      const tasks = await this.getTasksByUserIds(users);
      return tasks;
    } catch (error) {
      console.error('Error en getTasks:', error);
      throw error;
    }
  },

  async getTasksByUserIds(userIds: string[]): Promise<Task[]> {
    try {
      const tasksRef = collection(db, TASK_COLLECTION);
      const q = query(
        tasksRef,
        where('user_id', 'in', userIds),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data() as Task);
    } catch (error) {
      console.error('Error en getTasksByUserIds:', error);
      throw error;
    }
  },

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    try {
      const taskRef = doc(db, TASK_COLLECTION, taskId);
      await updateDoc(taskRef, data);
      return data as Task;
    } catch (error) {
      console.error('Error en updateTask:', error);
      throw error;
    }
  },
};