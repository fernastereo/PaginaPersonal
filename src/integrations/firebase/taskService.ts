import { db } from "@/integrations/firebase/client";
import { collection, doc, getDoc, setDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import type { Task } from '@/types/task'
import { uploadTaskFileToS3 } from '@/integrations/aws/storage';

const TASK_COLLECTION: string = 'tasks';

export const taskService = {
  async createTask(
    data: Omit<
      Task,
      | 'uid'
      | 'createdAt'
      | 'updatedAt'
      | 'completedAt'
      | 'comments'
      | 'files'
      | 'files_completed'
    >,
    files?: File[]
  ): Promise<Task> {
    try {
      const taskRef = doc(collection(db, TASK_COLLECTION));
      const uid = taskRef.id;
      const now = new Date().toISOString();

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
        files: fileURLs || [],
        completedAt: '',
        comments: [],
        files_completed: [],
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
};