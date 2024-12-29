export interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  lastModified: number;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
} 