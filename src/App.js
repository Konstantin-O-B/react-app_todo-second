import React, { useEffect, useState } from 'react';

import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';
import './style.css';

function App() {
  const [arrayTasks, setArrayTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filtered, setFiltered] = useState([...arrayTasks]);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('active');

  const statuses = {
    active: 'active',
    completed: 'completed',
    editing: 'editing',
  };

  useEffect(() => {
    setFiltered([...arrayTasks]);
  }, [arrayTasks]);

  /*              фильтр таски             */

  const todoFilter = (name) => {
    /* console.log(value); */
    if (name === 'all') {
      setFiltered(arrayTasks);
    } else if (name === 'active') {
      const activeArray = [...arrayTasks].filter((item) => item.status === 'active');
      setFiltered(activeArray);
    } else if (name === 'completed') {
      const completeArray = [...arrayTasks].filter((item) => item.status === 'completed');
      setFiltered(completeArray);
    }
  };

  /*           изменение класса таски               */

  const changeComplete = (id) => {
    const newArr = arrayTasks.map((item) => {
      if (item.id === id) {
        return { ...item, status: item.status === statuses.active ? statuses.completed : statuses.active };
      }
      return item;
    });
    setArrayTasks(newArr);
  };

  const setEditing = (id) => {
    const newArr = arrayTasks.map((item) => {
      if (item.id === id) {
        return { ...item, status: item.status === statuses.active ? statuses.editing : statuses.active };
      }
      return item;
    });
    setArrayTasks(newArr);
  };

  const changeStatus = (status) => {
    if (status === 'active' && status !== 'editing') {
      return setStatus('completed');
    }
    if (status === 'completed') {
      return setStatus('active');
    }
    return status;
  };

  /* удаление/добавление таски */

  const addNewTask = () => {
    if (/\S/.test(task)) {
      const newTask = {
        id: Date.now(),
        task,
        status: statuses.active,
      };
      setArrayTasks([...arrayTasks, newTask]);
      setTask('');
    }
  };

  const deleteTask = (task) => {
    setArrayTasks(arrayTasks.filter((itemTask) => itemTask.id !== task.id));
  };

  /* изменение таски */
  const editTask = (value, id) => {
    const newArr = arrayTasks.map((currentItem) => {
      if (currentItem.id === id && /\S/.test(value)) {
        currentItem.task = value;
      }
      return currentItem;
    });
    setArrayTasks(newArr);
  };

  const clearCompleted = () => {
    const clearTasks = [...arrayTasks].filter((item) => item.status === 'active');
    setArrayTasks(clearTasks);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          onChange={(e) => {
            setTask(e.target.value.trimStart());
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              addNewTask();
            }
          }}
          value={task}
        />
      </header>
      <section className="main">
        <TaskList
          remove={deleteTask}
          editTask={editTask}
          filtered={filtered}
          changeComplete={changeComplete}
          value={value}
          setValue={setValue}
          deleteTask={deleteTask}
          status={status}
          changeStatus={changeStatus}
          setEditing={setEditing}
        />

        <Footer arrayTasks={arrayTasks} todoFilter={todoFilter} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
}

export default App;
