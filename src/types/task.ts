export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  uid: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  status: TaskStatus;
  completedAt: string;
  comments: string[];
  files_completed: string[];
  files: string[];
  createdAt: string;
  updatedAt: string;
}