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
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  /* const [isTimer, setIsTimer] = useState(false); */

  const statuses = {
    active: 'active',
    completed: 'completed',
    editing: 'editing',
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('mainArray'));
    if (savedTasks) {
      setArrayTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    setFiltered([...arrayTasks]);
    localStorage.setItem('mainArray', JSON.stringify(arrayTasks));
  }, [arrayTasks]);

  /*              фильтр таски             */

  const todoFilter = (name) => {
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

  // eslint-disable-next-line consistent-return
  const addNewTask = () => {
    /*     if (!minutes && !seconds) {
      setIsTimer(false);
    } */
    if (/\S/.test(task)) {
      const newTask = {
        id: Date.now(),
        task,
        status: statuses.active,
        minutes,
        seconds,
        isTimer: !!(minutes || seconds),
      };
      setArrayTasks([...arrayTasks, newTask]);
      setTask('');
      setMinutes('');
      setSeconds('');
      /* setIsTimer(true); */
      console.log(Boolean(seconds));
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

  const setUpdateTime = (id, time) => {
    console.log(`ID: ${id}`, `TIME: ${time}`);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const newArr = arrayTasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          minutes,
          seconds,
        };
      }
      return item;
    });
    setArrayTasks(newArr);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          value={task}
          setTask={setTask}
          addNewTask={addNewTask}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          minutes={minutes}
          seconds={seconds}
          setArrayTasks={setArrayTasks}
          arrayTasks={arrayTasks}
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
          seconds={seconds}
          minutes={minutes}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setArrayTasks={setArrayTasks}
          arrayTasks={arrayTasks}
          setUpdateTime={setUpdateTime}
        />

        <Footer arrayTasks={arrayTasks} todoFilter={todoFilter} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
}

export default App;
