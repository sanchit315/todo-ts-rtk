import { Button, Layout, Tabs } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import styles from './app.module.css';
import TodoList from './features/todo/todo-list/todo-list';
import AddTodoModal from './features/todo/add-todo-modal/add-todo-modal';
import { useEffect, useState } from 'react';
import { useAppSelector } from './app/hooks';

const { Header, Content, Sider } = Layout;

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const todos = useAppSelector((state) => state.todoList.todos);

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, [todos]);

  return (
    <>
      <Layout className={styles['layout']}>
        <Header className={styles['header']}>
          <h1>Todoz</h1>

          <Button
            type='primary'
            icon={<PlusSquareOutlined />}
            onClick={() => setModalOpen(true)}
          >
            Add Todo
          </Button>
        </Header>

        <Layout>
          <Sider></Sider>

          <Content style={{ padding: '50px' }}>
            <div className={styles['site-layout-content']}>
              <TodoList />
            </div>
          </Content>
        </Layout>
      </Layout>

      <AddTodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default App;
