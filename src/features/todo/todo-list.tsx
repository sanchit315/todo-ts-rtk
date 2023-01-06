import { nanoid } from 'nanoid';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { todoActions } from './todo-slice';
import './todo-list.css';
import React, { useEffect, useState } from 'react';
import Todo from './todo';

const TodoList = () => {
  const { todos, todoToUpdateId } = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();

  // States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Effect

  useEffect(() => {
    if (todoToUpdateId) {
      const todoToUpdate = todos.find((todo) => todo.id === todoToUpdateId);
      if (todoToUpdate) {
        setTitle(todoToUpdate.title);
        setDescription(todoToUpdate.description || '');
      }
    }
  }, [todoToUpdateId]);

  // Handlers
  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      return alert('Please enter a title');
    }

    dispatch(
      todoActions.addTodo({
        id: nanoid(),
        title,
        description,
        isCompleted: false,
      })
    );

    setTitle('');
    setDescription('');
  };

  const handleUpdateTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoToUpdateId) {
      dispatch(
        todoActions.updateTodo({
          id: todoToUpdateId,
          title,
          description,
        })
      );

      setTitle('');
      setDescription('');
    }
  };

  return (
    <>
      <h1>List of Todo</h1>
      <form className='form'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          cols={30}
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {todoToUpdateId ? (
          <button onClick={handleUpdateTodo}>Update</button>
        ) : (
          <button onClick={handleAddTodo}>Add Todo</button>
        )}
      </form>

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </>
  );
};

export default TodoList;
