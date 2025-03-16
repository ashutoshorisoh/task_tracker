import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, BarChart2, Plus } from 'lucide-react';
import { toggleStats, reorderTasks } from './redux/taskSlice';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskStats from './components/TaskStats';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toggleMode } from './redux/toggleMode';
import { ToggleRight } from 'lucide-react';
import { ToggleLeft } from 'lucide-react';

const App = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery, showStats } = useSelector(state => state.tasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const mode = useSelector(state=>state.mode.mode)
  const[modeLoad, setNewModeLoad]=useState(mode)

  const filteredTasks = tasks.filter(task => {
    const statusMatch =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'active' && !task.completed) ||
      task.category === filter;

    const searchLower = searchQuery.toLowerCase();
    const searchMatch = !searchQuery ||
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(reorderTasks({ startIndex: result.source.index, endIndex: result.destination.index }));
  };

  return (
    <div className={`flex flex-col h-screen ${mode==='light'? "bg-black": "bg-white"}`}>
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <h1 className="text-xl font-bold">Task Tracker</h1>
          </div>

          <div className='flex gap-2'>

          <button onClick={() => dispatch(toggleStats())} className="flex items-center space-x-2">
            <p>View Stats</p>
            <BarChart2 className="h-5 w-5" />
          </button>

          <button 
          onClick={()=>dispatch(toggleMode())}
          className={`${mode==="light"? "text-white": "text-black"}`}
            
          >
            
          {mode === "light" ? <ToggleLeft /> : <ToggleRight />}
            
          </button>

          </div>
          
          
        </div>
      </header>

      <div className={`flex-1 flex flex-col md:flex-row overflow-hidden ${mode==="light"? "bg-white text-black" : "bg-black text-white"}`}>
        <div className="w-full md:w-64 p-4 border-r border-gray-200">
          <button 
            className="w-full mb-2 bg-indigo-600  p-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700"
            onClick={() => {
              setEditingTask(null);
              setShowAddTask(true);
            }}
          >
            <Plus className="h-4 w-4 text-white" />
            <span className='text-white'>Add New Task</span>
          </button>
          <div className="lg:block hidden">
            <TaskFilters />
          </div>
        </div>

        <div className={`flex-1 overflow-auto p-4 `}>
        <div className="lg:hidden block">
            <TaskFilters />
          </div>

          {showAddTask && <TaskForm task={editingTask} onClose={handleCloseForm} />}
          {showStats && <TaskStats />}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="taskList">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} onEdit={handleEditTask} />
                          </div>
                        )}
                      </Draggable>
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default App;
