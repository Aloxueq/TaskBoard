import { Task } from '@/lib/types/task';

class TaskService {
  // Add new task
  async addTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: taskData.text,
        category: taskData.category,
        priority: taskData.priority,
        completed: false,
        lastModified: new Date().getTime()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add task');
    }

    return response.json();
  }

  // Load tasks
  async loadTasks(): Promise<Task[]> {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to load tasks');
      }
      return response.json();
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  // Update task
  async updateTask(taskId: number, updates: Partial<Task>): Promise<Task | null> {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  }

  // Delete task
  async deleteTask(taskId: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }
}

export const taskService = new TaskService(); 