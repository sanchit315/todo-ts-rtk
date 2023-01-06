import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todo-slice';

const store = configureStore({
  reducer: {
    todoList: todoSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
