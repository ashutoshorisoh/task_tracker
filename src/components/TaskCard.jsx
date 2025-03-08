import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from '../redux/taskSlice';
import { Edit2, Trash2, Check } from 'lucide-react';

function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();
  
  const getPriorityColor = (priority) => {
    switch(priority?.toUpperCase()) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div 
      id={`task-${task.id}`}
      className={` p-4 rounded-xl shadow border-l-4  
        ${task.priority?.toUpperCase() === 'HIGH' ? 'border-red-500 bg-red-200' : 
          task.priority?.toUpperCase() === 'MEDIUM' ? 'border-yellow-500 bg-yellow-200' : 'border-green-500  bg-green-200'} 
         hover:shadow-xl transition-shadow mb-2`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <button 
            id={`toggle-${task.id}`}
            onClick={handleToggleStatus}
            className={`h-5 w-5 rounded-full border flex items-center justify-center 
              ${task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-700'}`}
          >
            {task.completed && <Check className="h-3 w-3 text-white" />}
          </button>
        </div>
        <div className="ml-3 flex-1">
          <p 
            id={`title-${task.id}`}
            className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
          >
            {task.title}
          </p>
          <div className="mt-1 flex items-center space-x-2">
            <span id={`priority-${task.id}`} className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority?.toUpperCase()}
            </span>
            <span id={`category-${task.id}`} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
              {task.category}
            </span>
            {task.dueDate && (
              <span id={`dueDate-${task.id}`} className="text-xs text-gray-500">
                Due: {task.dueDate}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            id={`edit-${task.id}`}
            className="text-gray-400 hover:text-indigo-600"
            onClick={() => onEdit(task)}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            id={`delete-${task.id}`}
            className="text-gray-400 hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
