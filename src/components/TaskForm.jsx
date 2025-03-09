import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, editTask } from '../redux/taskSlice';
import { X, ChevronDown } from 'lucide-react';

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

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  const validateForm = (data = formData) => {
    let newErrors = {};

    if (!data.title.trim()) {
      newErrors.title = 'Title cannot be empty.';
    }

    if (!data.category.trim()) {
      newErrors.category = 'Category cannot be empty.';
    }

    if (data.dueDate) {
      const selectedDate = new Date(data.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past.';
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updatedFormData = { ...prev, [name]: value };

      
      validateForm(updatedFormData);

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    validateForm(); 
  
    if (Object.keys(errors).length > 0) return; 
  
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
        {/* Task Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            name="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Priority Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <div 
              className="relative w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {formData.priority}
              <ChevronDown className="h-4 w-4" />
            </div>

            {isDropdownOpen && (
              <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10">
                {['HIGH', 'MEDIUM', 'LOW'].map((option) => (
                  <div 
                    key={option}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, priority: option }));
                      setDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              name="category"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Work, Personal"
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              name="dueDate"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.dueDate}
              onChange={handleChange}
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
          </div>
        </div>

        {/* Buttons */}
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
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${Object.keys(errors).length ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={Object.keys(errors).length > 0}
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
