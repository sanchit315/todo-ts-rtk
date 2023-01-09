import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../app/models/todo.model';

const initialState: {
  todos: ITodo[];
  todoToUpdateId: ITodo['id'] | null;
} = {
  todos: localStorage.getItem('todos')
    ? (JSON.parse(localStorage.getItem('todos')!) as ITodo[])
    : [],
  todoToUpdateId: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    setTodoToUpdateId: (state, action: PayloadAction<ITodo['id']>) => {
      state.todoToUpdateId = action.payload;
    },
    updateTodo: (
      state,
      action: PayloadAction<
        { id: ITodo['id'] } & Omit<Partial<ITodo>, 'id' | 'isCompleted'>
      >
    ) => {
      const todoToUpdate = state.todos.find(
        (item) => item.id === action.payload.id
      );
      if (todoToUpdate) {
        Object.assign(todoToUpdate, { ...todoToUpdate, ...action.payload });
      }
      state.todoToUpdateId = null;
    },
    toggleIsCompleted: (state, action: PayloadAction<ITodo['id']>) => {
      const todoToUpdate = state.todos.find(
        (item) => item.id === action.payload
      );
      if (todoToUpdate) {
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
      }
    },
    removeTodo: (state, action: PayloadAction<ITodo['id']>) => {
      state.todos.splice(
        state.todos.findIndex((item) => item.id === action.payload),
        1
      );
    },
  },
});

export default todoSlice.reducer;
export const todoActions = todoSlice.actions;
