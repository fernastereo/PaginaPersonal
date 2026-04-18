export type TaskStatus =
  | 'cancelled'
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'on_hold';

export interface TaskComment {
  uid: string;
  text: string;
  user_id: string;
  user_name: string;
  files: string[];
  createdAt: string;
}

export interface Task {
  uid: string;
  taskNumber: string;
  user_id: string;
  user_name: string;
  client_id: string;
  client_name: string;
  title: string;
  description: string;
  status: TaskStatus;
  completedAt: string;
  comments: TaskComment[];
  filesCompleted: string[];
  files: string[];
  createdAt: string;
  updatedAt: string;
}
