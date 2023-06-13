import React, { useEffect, useState } from 'react'



import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';
import './style.css'




function App() {
  const [arrayTasks, setArrayTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filtered, setFiltered] = useState([...arrayTasks]);

  useEffect(()=>{setFiltered(arrayTasks)}, [arrayTasks])
  
              /* удаление/добавление таски */

    const addNewTask = () => {
      if (!task) {return}
        const newTask = {
          id: Date.now(),
          task,
          status: 'active'
        }
        setArrayTasks([...arrayTasks, newTask])
        setTask('')
    }
    const deleteTask = (task) => {
      setArrayTasks(arrayTasks.filter(itemTask => itemTask.id !== task.id))
    }

              /* изменение таски */
    const editTask = (task, newValue) => {
      /* console.log(task, newValue); */
      arrayTasks.map(currentItem => {
        if (currentItem.id=== task.id)
         {currentItem.task = newValue}
      })
    }

    const todoFilter = (value) => {
      console.log(value);
      if (value === 'all') {setFiltered(arrayTasks)}
      else if (value === 'active') {
        let activeArray = [...arrayTasks].filter((item) => item.status === 'active');
        setFiltered(activeArray);
      } else if (value === 'completed') {
        let completeArray = [...arrayTasks].filter((item) => item.status === 'complete');
        setFiltered(completeArray);
      }

    }


  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
         onChange={e => setTask(e.target.value)}
         onKeyUp={
          (e) => {if (e.keyCode === 13) {addNewTask()}}
          }
         value={task}
        />
      </header>
      <section className="main">
        {/* {console.log(arrayTasks)} */}
        
        
          <TaskList
            arrayTasks = {arrayTasks}
            remove = {deleteTask}
            edit = {editTask}
            filtered = {filtered}
            
          />
          
        

        <Footer
        arrayTasks = {arrayTasks}
        todoFilter = {todoFilter}
        />
        
      </section>
    </section>

  );
}

export default App;
