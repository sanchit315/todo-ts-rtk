import { Button, Table, Typography, Dropdown, MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

import { ITodo } from '../../../app/models/todo.model';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { todoActions } from '../todo-slice';
import './todo-list.css';

type itemsFn = (val: {
  id: ITodo['id'];
  handleToggleIsCompleted: (id: ITodo['id']) => void;
  handleRemoveTodo: (id: ITodo['id']) => void;
  handleTodoToUpdate: (id: ITodo['id']) => void;
}) => MenuProps['items'];

const items: itemsFn = ({
  id,
  handleRemoveTodo,
  handleTodoToUpdate,
  handleToggleIsCompleted,
}) => {
  return [
    {
      key: '1',
      label: 'Toggle status',
      onClick: () => {
        handleToggleIsCompleted(id);
      },
    },
    {
      key: '2',
      label: 'Edit',
      onClick: () => {
        handleTodoToUpdate(id);
      },
    },
    {
      key: '3',
      danger: true,
      label: 'Delete',
      onClick: () => {
        handleRemoveTodo(id);
      },
    },
  ];
};

const DropdownMenu: React.FC<{
  id: ITodo['id'];
  handleToggleIsCompleted: (id: ITodo['id']) => void;
  handleRemoveTodo: (id: ITodo['id']) => void;
  handleTodoToUpdate: (id: ITodo['id']) => void;
}> = ({
  id,
  handleRemoveTodo,
  handleToggleIsCompleted,
  handleTodoToUpdate,
}) => (
  <Dropdown
    menu={{
      items: items({
        id,
        handleToggleIsCompleted,
        handleRemoveTodo,
        handleTodoToUpdate,
      }),
    }}
  >
    <Button icon={<EllipsisOutlined />} />
  </Dropdown>
);

const TodoList = () => {
  const { todos } = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();

  const handleToggleIsCompleted = (id: ITodo['id']) => {
    dispatch(todoActions.toggleIsCompleted(id));
  };

  const handleRemoveTodo = (id: ITodo['id']) => {
    dispatch(todoActions.removeTodo(id));
  };

  const handleTodoToUpdate = (id: ITodo['id']) => {
    dispatch(todoActions.setTodoToUpdateId(id));
  };

  const columns: ColumnsType<ITodo> = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'isCompleted',
      render(value) {
        return value ? 'Completed' : 'Todo';
      },
    },
    {
      render({ id }) {
        return (
          <DropdownMenu
            id={id}
            handleToggleIsCompleted={handleToggleIsCompleted}
            handleRemoveTodo={handleRemoveTodo}
            handleTodoToUpdate={handleTodoToUpdate}
          />
        );
      },
    },
  ];

  return todos.length > 0 ? (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={todos}
      pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      scroll={{ y: 240 }}
    />
  ) : (
    <>
      <Typography.Title level={2}>No Todo To Show</Typography.Title>
      <Typography.Paragraph italic style={{ fontSize: 16 }}>
        Please add one by clicking the add todo button
      </Typography.Paragraph>
    </>
  );
};

export default TodoList;
