import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, editTask } from '../redux/taskSlice';
import { X } from 'lucide-react';

const TaskForm = ({ task = null, onClose }) => {
  const dispatch = useDispatch();
  const isEditing = !!task;
  
  const [formData, setFormData] = useState({
    title: '',
    priority: 'MEDIUM',
    category: '',
    dueDate: '',
    completed: false
  });
  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        priority: task.priority || 'MEDIUM',
        category: task.category || '',
        dueDate: task.dueDate || '',
        completed: task.completed || false
      });
    }
  }, [task]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;
    
    if (isEditing) {
      dispatch(editTask({
        id: task.id,
        updatedTask: formData
      }));
    } else {
      dispatch(createTask({
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      }));
    }
    
    setFormData({
      title: '',
      priority: 'MEDIUM',
      category: '',
      dueDate: '',
      completed: false
    });
    
    if (onClose) onClose();
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Work, Personal"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dueDate">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          {onClose && (
            <button 
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;