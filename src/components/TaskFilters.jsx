import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchQuery, categoryFilter } from "../redux/taskSlice";
import { Calendar, Check, Star, Tag, Search, Filter } from "lucide-react";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);
  const [filterClicked, setFilterClicked] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    dispatch(categoryFilter(category));
  };

  const toggleFilter = (filterType) => {
    setSelectedFilters((prev) =>
      prev.includes(filterType) ? prev.filter((f) => f !== filterType) : [...prev, filterType]
    );
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
      <div className="mb-2 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Mobile Filter Button */}
        {isMobile && (
          <button
            className="absolute inset-y-0 gap-2 right-0 pr-3 flex items-center"
            onClick={() => setFilterClicked(!filterClicked)}
          >
            <p className="text-sm dark:text-gray-300">Filter</p>
            <Filter className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Mobile Filter Options */}
      {filterClicked && isMobile && (
        <div className="flex gap-2 justify-end pr-1 mb-2">
          <button
            onClick={() => toggleFilter("category")}
            className={`px-3 py-1 rounded-md ${selectedFilters.includes("category") ? "bg-indigo-200 dark:bg-indigo-900" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"}`}
          >
            Category
          </button>
          <button
            onClick={() => toggleFilter("status")}
            className={`px-3 py-1 rounded-md ${selectedFilters.includes("status") ? "bg-indigo-200 dark:bg-indigo-900" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"}`}
          >
            Status
          </button>
        </div>
      )}

      {/* Status Filters */}
      {(!isMobile || selectedFilters.includes("status")) && (
        <div className="space-y-1 mb-4">
          <p className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", icon: Calendar, value: "all", count: tasks.length },
              { label: "Active", icon: Star, value: "active", count: tasks.filter((t) => !t.completed).length },
              { label: "Completed", icon: Check, value: "completed", count: tasks.filter((t) => t.completed).length },
            ].map(({ label, icon: Icon, value, count }) => (
              <button
                key={value}
                className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                  filter === value ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleFilterChange(value)}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                <span className="ml-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Filters */}
      {(!isMobile || selectedFilters.includes("category")) && Object.keys(categoryCounts).length > 0 && (
        <div className="mb-4">
          <p className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                  activeCategory === category ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                <Tag className="h-4 w-4" />
                <span>{category}</span>
                <span className="ml-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskFilters;
