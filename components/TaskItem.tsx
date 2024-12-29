import { Task } from '@/lib/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg shadow 
      ${task.priority === 'high' ? 'bg-red-100' : 
        task.priority === 'medium' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5"
      />
      <div className="flex-1">
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.text}
        </span>
        <div className="text-sm text-gray-500">
          <span className="mr-2">{task.category}</span>
          •
          <span className="ml-2">{task.priority} Priority</span>
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
      >
        Delete
      </button>
    </div>
  );
} 