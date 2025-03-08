import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery, categoryFilter } from '../redux/taskSlice';
import { Calendar, Check, Star, Tag, Search, Filter } from 'lucide-react';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector(state => state.tasks);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryFilter = (category) => {
    dispatch(categoryFilter(category)); // Use categoryFilter action
  };

  const categoryCounts = tasks.reduce((acc, task) => {
    if (task.category) {
      acc[task.category] = (acc[task.category] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <>
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
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Filter className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="space-y-1 mb-4">
        <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Filters</p>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1 rounded-md flex items-center space-x-1 ${filter === 'all' ? 'bg-indigo-50 text-indigo-600' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => handleFilterChange('all')}
          >
            <Calendar className="h-4 w-4" />
            <span>All</span>
            <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{tasks.length}</span>
          </button>
          <button 
            className={`px-3 py-1 rounded-md flex items-center space-x-1 ${filter === 'active' ? 'bg-indigo-50 text-indigo-600' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => handleFilterChange('active')}
          >
            <Star className="h-4 w-4" />
            <span>Active</span>
            <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{tasks.filter(t => !t.completed).length}</span>
          </button>
          <button 
            className={`px-3 py-1 rounded-md flex items-center space-x-1 ${filter === 'completed' ? 'bg-indigo-50 text-indigo-600' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => handleFilterChange('completed')}
          >
            <Check className="h-4 w-4" />
            <span>Completed</span>
            <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{tasks.filter(t => t.completed).length}</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      {Object.keys(categoryCounts).length > 0 && (
        <div className="mb-4">
          <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <button 
                key={category}
                className={`px-3 py-1 rounded-md flex items-center space-x-1 ${filter === category ? 'bg-indigo-50 text-indigo-600' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => handleCategoryFilter(category)}
              >
                <Tag className="h-4 w-4" />
                <span>{category}</span>
                <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskFilters;
