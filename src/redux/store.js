import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import modeReducer from './toggleMode';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    mode: modeReducer,

  }
});