import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchQuery, categoryFilter } from "../redux/taskSlice";
import { Calendar, Check, Star, Tag, Search, Filter } from "lucide-react";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);
  const [filterClicked, setFilterClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
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
    dispatch(categoryFilter(category));
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption((prev) =>
      prev.includes(value) ? prev.filter((opt) => opt !== value) : [...prev, value]
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
      <div className="mb-2 relative" id="search-bar">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={handleSearchChange}
          id="search-input"
        />

        {/* Mobile Filter Button */}
        {isMobile && (
          <button
            className="absolute inset-y-0 gap-2 right-0 pr-3 flex items-center"
            onClick={() => setFilterClicked(!filterClicked)}
            id="mobile-filter-btn"
          >
            <p className="text-sm">Filter</p>
            <Filter className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Mobile Filter Dropdown */}
      {filterClicked && isMobile && (
        <div className="flex gap-2 justify-end pr-1" id="mobile-filter-dropdown">
          <select
            className="border p-2 rounded-md"
            multiple
            onChange={handleOptionChange}
            id="filter-options"
          >
            <option value="category" className={selectedOption.includes("category") ? "bg-indigo-200" : ""}>Category</option>
            <option value="status" className={selectedOption.includes("status") ? "bg-indigo-200" : ""}>Status</option>
          </select>
        </div>
      )}

      {/* Status Buttons */}
      {(!isMobile || selectedOption.includes("status")) && (
        <div className="space-y-1 mb-4" id="status-filters">
          <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            <button
              id="filter-all"
              className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                filter === "all" ? "bg-indigo-50 text-indigo-600" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              <Calendar className="h-4 w-4" />
              <span>All</span>
              <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{tasks.length}</span>
            </button>
            <button
              id="filter-active"
              className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                filter === "active" ? "bg-indigo-50 text-indigo-600" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleFilterChange("active")}
            >
              <Star className="h-4 w-4" />
              <span>Active</span>
              <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{tasks.filter((t) => !t.completed).length}</span>
            </button>
            <button
              id="filter-completed"
              className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                filter === "completed" ? "bg-indigo-50 text-indigo-600" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleFilterChange("completed")}
            >
              <Check className="h-4 w-4" />
              <span>Completed</span>
              <span className="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{tasks.filter((t) => t.completed).length}</span>
            </button>
          </div>
        </div>
      )}

      {/* Categories */}
      {(!isMobile || selectedOption.includes("category")) && Object.keys(categoryCounts).length > 0 && (
        <div className="mb-4" id="category-filters">
          <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <button
                key={category}
                id={`category-${category}`}
                className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                  filter === category ? "bg-indigo-50 text-indigo-600" : "bg-white hover:bg-gray-50"
                }`}
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
