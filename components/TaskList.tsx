import { useState, useEffect } from 'react';
import { Task } from '@/lib/types/task';
import { TaskItem } from './TaskItem';
import { taskService } from '@/services/TaskService';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.loadTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    
    try {
      const task = await taskService.addTask({
        text: newTask,
        category: 'personal',
        priority: 'medium',
        completed: false
      });
      setTasks([...tasks, task]);
      setNewTask('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add new task"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={(id) => {/* handle toggle */}}
            onDelete={(id) => {/* handle delete */}}
          />
        ))}
      </div>

      {loading && <div>Loading...</div>}
    </div>
  );
} 