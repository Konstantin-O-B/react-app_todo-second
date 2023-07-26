import React from 'react';

import Task from './Task';

function TaskList({
  filtered,
  remove,
  editTask,
  changeComplete,
  showEdit,
  value,
  setValue,
  deleteTask,
  clickEdit,
  status,
  changeStatus,
  setEditing,
  timer,
  toggleTimer,
  minutes,
  seconds,
  setMinutes,
  setSeconds,
  setArrayTasks,
  arrayTasks,
}) {
  return (
    <ul className="todo-list">
      {filtered.map((itemTask) => (
        <Task
          itemtask={itemTask}
          remove={remove}
          key={itemTask.id}
          editTask={editTask}
          changeComplete={changeComplete}
          showEdit={showEdit}
          value={value}
          setValue={setValue}
          deleteTask={deleteTask}
          clickEdit={clickEdit}
          status={status}
          changeStatus={changeStatus}
          setEditing={setEditing}
          timer={timer}
          toggleTimer={toggleTimer}
          minutes={minutes}
          seconds={seconds}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setArrayTasks={setArrayTasks}
          arrayTasks={arrayTasks}
        />
      ))}
    </ul>
  );
}

export default TaskList;
