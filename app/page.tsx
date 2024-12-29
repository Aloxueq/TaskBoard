'use client';

import { useState, useEffect } from 'react';
import { DatabaseTest } from '@/components/DatabaseTest';
import { taskService } from '@/services/TaskService';
import { Task } from '@/lib/types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newCategory, setNewCategory] = useState('personal');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Load tasks from API when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await taskService.loadTasks();
    setTasks(tasks);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const task = await taskService.addTask({
        text: newTask,
        category: newCategory,
        priority: newPriority,
        completed: false,
        lastModified: new Date().getTime()
      });
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const categories = ['personal', 'work', 'shopping', 'health'];
  
  const priorityColors = {
    low: 'bg-gray-100',
    medium: 'bg-yellow-100',
    high: 'bg-red-100'
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  // Get counts for summary
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
        
        {/* Add the test component */}
        <div className="mb-8">
          <DatabaseTest />
        </div>

        {/* Task Summary */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <div className="text-gray-500">Total Tasks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-gray-500">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{pendingTasks}</div>
            <div className="text-gray-500">Pending</div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="space-y-4 mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Enter a new task"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>
          
          <div className="flex gap-4">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="p-2 border rounded-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="p-2 border rounded-lg"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg shadow ${priorityColors[task.priority]}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.text}
                </span>
                <div className="text-sm text-gray-500">
                  <span className="mr-2">
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </span>
                  •
                  <span className="ml-2">
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Clear Completed Button */}
        {completedTasks > 0 && (
          <button
            onClick={clearCompleted}
            className="mt-4 px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear Completed Tasks
          </button>
        )}
      </div>
    </main>
  );
}
