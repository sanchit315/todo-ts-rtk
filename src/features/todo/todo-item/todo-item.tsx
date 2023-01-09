import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { ITodo } from '../../../app/models/todo.model';
import { todoActions } from '../todo-slice';
import './todo-item.css';

const TodoItem: React.FC<ITodo> = (todo) => {
  const dispatch = useAppDispatch();

  const handleToggleIsCompleted = () => {
    dispatch(todoActions.toggleIsCompleted(todo.id));
  };

  const handleRemoveTodo = () => {
    dispatch(todoActions.removeTodo(todo.id));
  };

  const handleTodoToUpdate = () => {
    dispatch(todoActions.setTodoToUpdateId(todo.id));
  };

  return (
    <div className='todo'>
      <h3 className={todo.isCompleted ? 'isCompleted' : ''}>{todo.title}</h3>
      {todo.description && (
        <p className={todo.isCompleted ? 'isCompleted' : ''}>
          {todo.description.substring(0, 20)}
        </p>
      )}

      <div className='todo_buttons'>
        <button className='todo_button' onClick={handleToggleIsCompleted}>
          {todo.isCompleted ? 'Undo' : 'Done'}
        </button>
        <button className='todo_button' onClick={handleTodoToUpdate}>
          Update
        </button>
        <button className='todo_button' onClick={handleRemoveTodo}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
