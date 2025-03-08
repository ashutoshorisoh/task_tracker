import React, { useState } from 'react';
import { Clock, Calendar, BarChart2, Check, Plus, Edit2, Trash2, Filter, Search, Tag, Flag, Star, Menu } from 'lucide-react';

const TaskTrackerApp = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(false);
  
  // Sample tasks data
  const tasks = [
    { id: 1, title: 'Complete Redux implementation', completed: false, priority: 'high', category: 'Development' },
    { id: 2, title: 'Design responsive UI components', completed: true, priority: 'medium', category: 'Design' },
    { id: 3, title: 'Set up localStorage persistence', completed: false, priority: 'medium', category: 'Development' },
    { id: 4, title: 'Add drag-and-drop functionality', completed: false, priority: 'low', category: 'Enhancement' },
  ];
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <h1 className="text-xl font-bold">Task Tracker</h1>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-indigo-700" onClick={() => setShowStats(!showStats)}>
              <BarChart2 className="h-5 w-5" />
            </button>
            <button className="p-2 rounded hover:bg-indigo-700">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white p-4 border-r border-gray-200">
          <div className="mb-6">
            <button className="w-full bg-indigo-600 text-white p-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              <span>Add New Task</span>
            </button>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Filters</p>
            <button 
              className={`w-full text-left p-2 rounded-md flex items-center space-x-2 ${activeTab === 'all' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('all')}
            >
              <Calendar className="h-4 w-4" />
              <span>All Tasks</span>
              <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">{tasks.length}</span>
            </button>
            <button 
              className={`w-full text-left p-2 rounded-md flex items-center space-x-2 ${activeTab === 'active' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('active')}
            >
              <Star className="h-4 w-4" />
              <span>Active</span>
              <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">{tasks.filter(t => !t.completed).length}</span>
            </button>
            <button 
              className={`w-full text-left p-2 rounded-md flex items-center space-x-2 ${activeTab === 'completed' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('completed')}
            >
              <Check className="h-4 w-4" />
              <span>Completed</span>
              <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">{tasks.filter(t => t.completed).length}</span>
            </button>
          </div>
          
          <div className="mt-6 space-y-1">
            <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Categories</p>
            <button className="w-full text-left p-2 rounded-md flex items-center space-x-2 hover:bg-gray-100">
              <Tag className="h-4 w-4 text-purple-500" />
              <span>Development</span>
              <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">2</span>
            </button>
            <button className="w-full text-left p-2 rounded-md flex items-center space-x-2 hover:bg-gray-100">
              <Tag className="h-4 w-4 text-blue-500" />
              <span>Design</span>
              <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">1</span>
            </button>
            <button className="w-full text-left p-2 rounded-md flex items-center space-x-2 hover:bg-gray-100">
              <Tag className="h-4 w-4 text-green-500" />
              <span>Enhancement</span>
              <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">1</span>
            </button>
          </div>
        </div>
        
        {/* Task Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Search Bar */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {showStats ? (
            <div className="bg-white p-6 rounded-lg shadow mb-4">
              <h2 className="text-lg font-semibold mb-4">Task Completion Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Tasks Completed</p>
                  <p className="text-2xl font-bold">{tasks.filter(t => t.completed).length} / {tasks.length}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }} 
                    />
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">High Priority</p>
                  <p className="text-2xl font-bold">{tasks.filter(t => t.priority === 'high').filter(t => t.completed).length} / {tasks.filter(t => t.priority === 'high').length}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(tasks.filter(t => t.priority === 'high' && t.completed).length / Math.max(1, tasks.filter(t => t.priority === 'high').length)) * 100}%` }} 
                    />
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Weekly Progress</p>
                  <p className="text-2xl font-bold">75%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          
          {/* Task List */}
          <div className="space-y-2">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <button className={`h-5 w-5 rounded-full border flex items-center justify-center ${task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                      {task.completed && <Check className="h-3 w-3 text-white" />}
                    </button>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                        {task.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-indigo-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTrackerApp;