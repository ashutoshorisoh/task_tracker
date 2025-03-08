import React from 'react';
import { useSelector } from 'react-redux';

const TaskStats = () => {
  const { tasks } = useSelector(state => state.tasks);
  
  // Calculate completed task percentage
  const completedPercentage = tasks.length > 0 
    ? (tasks.filter(t => t.completed).length / tasks.length) * 100 
    : 0;
    
  // Calculate high priority completion
  const highPriorityTasks = tasks.filter(t => t.priority?.toUpperCase() === 'HIGH');
  const highPriorityCompletedPercentage = highPriorityTasks.length > 0
    ? (highPriorityTasks.filter(t => t.completed).length / highPriorityTasks.length) * 100
    : 0;
    
  // Get tasks due this week
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  
  const tasksThisWeek = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= endOfWeek;
  });
  
  const weeklyCompletionPercentage = tasksThisWeek.length > 0
    ? (tasksThisWeek.filter(t => t.completed).length / tasksThisWeek.length) * 100
    : 0;
    
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-4" id="task-stats">
      <h2 className="text-lg font-semibold mb-4">Task Completion Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-md" id="tasks-completed">
          <p className="text-sm text-gray-500">Tasks Completed</p>
          <p className="text-2xl font-bold" id="completed-tasks-count">
            {tasks.filter(t => t.completed).length} / {tasks.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${completedPercentage}%` }} 
              id="completed-tasks-bar"
            />
          </div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-md" id="high-priority-tasks">
          <p className="text-sm text-gray-500">High Priority</p>
          <p className="text-2xl font-bold" id="high-priority-tasks-count">
            {highPriorityTasks.filter(t => t.completed).length} / {highPriorityTasks.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${highPriorityCompletedPercentage}%` }} 
              id="high-priority-tasks-bar"
            />
          </div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-md" id="weekly-progress">
          <p className="text-sm text-gray-500">Weekly Progress</p>
          <p className="text-2xl font-bold" id="weekly-progress-count">
            {tasksThisWeek.filter(t => t.completed).length} / {tasksThisWeek.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${weeklyCompletionPercentage}%` }} 
              id="weekly-progress-bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
