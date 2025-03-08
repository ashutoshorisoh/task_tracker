import { createSlice } from "@reduxjs/toolkit"; 
 
const loadTasks = () => { 
    try { 
        const savedTasks = localStorage.getItem("tasks"); 
        return savedTasks ? JSON.parse(savedTasks) : []; 
    } catch { 
        // Catch without parameter - no unused variable
        return []; 
    } 
}; 
 
const saveTasks = (tasks) => { 
    try { 
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    } catch (error) { 
        console.error("Error saving tasks to localStorage:", error); 
    } 
}; 
 
const initialState = { 
    tasks: loadTasks(), 
    filter: 'all',  
    searchQuery: '', 
    showStats: false 
}; 
 
const tasksSlice = createSlice({ 
    name: "tasks", 
    initialState, 
    reducers: { 
        createTask: (state, action) => { 
            state.tasks.unshift(action.payload); // Add new tasks at the beginning 
            saveTasks(state.tasks); 
        }, 
         
        deleteTask: (state, action) => { 
            state.tasks = state.tasks.filter(task => task.id !== action.payload); 
            saveTasks(state.tasks); 
        }, 
         
        editTask: (state, action) => { 
            const { id, updatedTask } = action.payload; 
            state.tasks = state.tasks.map(task =>  
                task.id === id ? { ...task, ...updatedTask } : task 
            ); 
            saveTasks(state.tasks); 
        }, 
         
        toggleTaskStatus: (state, action) => { 
            const taskId = action.payload; 
            state.tasks = state.tasks.map(task =>  
                task.id === taskId ? { ...task, completed: !task.completed } : task 
            ); 
            saveTasks(state.tasks); 
        }, 
         
        setFilter: (state, action) => { 
            state.filter = action.payload; 
        }, 
         
        setSearchQuery: (state, action) => { 
            state.searchQuery = action.payload; 
        }, 
         
        toggleStats: (state) => { 
            state.showStats = !state.showStats; 
        }, 
 
        categoryFilter: (state, action) => { 
            state.filter = action.payload; 
        }, 
 
        reorderTasks: (state, action) => { 
            const { startIndex, endIndex } = action.payload; 
            const [movedTask] = state.tasks.splice(startIndex, 1); 
            state.tasks.splice(endIndex, 0, movedTask); 
            saveTasks(state.tasks); 
        } 
    } 
}); 
 
export const {  
    createTask,  
    deleteTask,  
    editTask,  
    toggleTaskStatus,  
    setFilter,  
    setSearchQuery, 
    toggleStats, 
    categoryFilter, 
    reorderTasks 
} = tasksSlice.actions; 
 
export default tasksSlice.reducer;