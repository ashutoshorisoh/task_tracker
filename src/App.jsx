import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, BarChart2, Menu, Plus } from 'lucide-react';
import { toggleStats } from './redux/taskSlice';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskStats from './components/TaskStats';

const App = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery, showStats } = useSelector(state => state.tasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    // Apply status filter
    const statusMatch = 
      filter === 'all' ? true : 
      filter === 'completed' ? task.completed : 
      filter === 'active' ? !task.completed : 
      task.category === filter; // Category filter condition
  
    // Apply search filter
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = searchQuery === '' ? true : 
      task.title?.toLowerCase().includes(searchLower) || 
      task.category?.toLowerCase().includes(searchLower);
      
    return statusMatch && searchMatch;
  });
  
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };
  
  const handleCloseForm = () => {
    setShowAddTask(false);
    setEditingTask(null);
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
            <button 
              className="p-2 rounded hover:bg-indigo-700"
              onClick={() => dispatch(toggleStats())}
            >
              <BarChart2 className="h-5 w-5" />
            </button>
            
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white p-4 border-r border-gray-200">
          <div className="mb-1">
            <button 
              className="w-full mb-2 bg-indigo-600 text-white p-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700"
              onClick={() => {
                setEditingTask(null);
                setShowAddTask(true);
              }}
            >
              <Plus className="h-4 w-4" />
              <span>Add New Task</span>
            </button>

            <div className="lg:block hidden">
            <TaskFilters />
          </div>
          </div>
          
          {/* Mobile-only filters - shown only on mobile */}        
        </div>
        
        {/* Task Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Desktop filters - hidden on mobile */}
          <div className="lg:hidden block">
            <TaskFilters />
          </div>
          
          {/* Task Form */}
          {showAddTask && (
            <TaskForm 
              task={editingTask}
              onClose={handleCloseForm}
            />
          )}
          
          {/* Statistics Dashboard */}
          {showStats && <TaskStats />}
          
          {/* Task List */}
<div className="space-y-2">
  {filteredTasks.length > 0 ? (
    filteredTasks.map(task => (
      <TaskCard 
        key={task.id}
        task={task}
        onEdit={handleEditTask}
      />
    ))
  ) : (
    <div className="text-center py-8">
      <p className="text-gray-500">
        {searchQuery 
          ? filter === 'completed'
            ? `No completed task matches "${searchQuery}"`
            : filter === 'active'
              ? `No active task matches "${searchQuery}"`
              : filter !== 'all'
                ? `No task found in the "${filter}" category`
                : `No task found for "${searchQuery}"`
          : filter === 'completed'
            ? "No completed tasks available"
            : filter === 'active'
              ? "No active tasks available"
              : "No tasks found"}
      </p>
      {!searchQuery && !tasks.length && (
        <button
          className="mt-3 text-indigo-600 hover:text-indigo-800"
          onClick={() => setShowAddTask(true)}
        >
          Add your first task
        </button>
      )}
    </div>
  )}
</div>


        </div>
      </div>
    </div>
  );
};

export default App;