import { Button, Form, Input, Modal } from 'antd';
import { nanoid } from 'nanoid';

import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (todoToUpdateId) {
      const todoToUpdate = todos.find((todo) => todo.id === todoToUpdateId);
      if (todoToUpdate) {
        setTitle(todoToUpdate.title);
        setDescription(todoToUpdate.description ?? '');
        setModalOpen(true);
      }
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

    setTitle('');
    setDescription('');
    setModalOpen(false);
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
      setModalOpen(false);
    }
  };

  return (
    <Modal
      title={todoToUpdateId ? 'Update Todo' : 'Add Todo'}
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[
        todoToUpdateId ? (
          <Button type='primary' onClick={handleUpdateTodo} block>
            Update Todo
          </Button>
        ) : (
          <Button type='primary' onClick={handleAddTodo} block>
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