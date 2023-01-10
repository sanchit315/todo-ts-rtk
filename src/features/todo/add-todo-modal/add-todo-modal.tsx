import { Button, Form, Input, Modal } from 'antd';
import { nanoid } from 'nanoid';

import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { todoActions } from '../todo-slice';

interface AddTodoModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { todos, todoToUpdateId } = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();

  const resetState = useCallback(() => {
    setTitle('');
    setDescription('');
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (todoToUpdateId) {
      const todoToUpdate = todos.find((todo) => todo.id === todoToUpdateId);
      if (todoToUpdate) {
        setTitle(todoToUpdate.title);
        setDescription(todoToUpdate.description ?? '');
        setModalOpen(true);
      }
    } else {
      resetState();
    }
  }, [todoToUpdateId]);

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

    resetState();
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

      resetState();
    }
  };

  return (
    <Modal
      title={todoToUpdateId ? 'Update Todo' : 'Add Todo'}
      centered
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
        dispatch(todoActions.setTodoToUpdateId(null));
      }}
      footer={[
        todoToUpdateId ? (
          <Button
            key='update_todo'
            type='primary'
            onClick={handleUpdateTodo}
            block
          >
            Update Todo
          </Button>
        ) : (
          <Button key='add_todo' type='primary' onClick={handleAddTodo} block>
            Add Todo
          </Button>
        ),
      ]}
    >
      <Form style={{ marginTop: 16 }}>
        <Form.Item>
          <Input
            type='text'
            id='title'
            placeholder='enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            name='description'
            id='description'
            placeholder='enter description'
            cols={30}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;
