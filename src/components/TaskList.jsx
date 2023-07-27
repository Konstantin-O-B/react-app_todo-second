import React from 'react';

import Task from './Task';

function TaskList({
  filtered,
  editTask,
  changeComplete,
  value,
  setValue,
  deleteTask,
  setEditing,
  setUpdateTime,
  setMinutes,
  setSeconds,
}) {
  return (
    <ul className="todo-list">
      {filtered.map((itemTask) => (
        <Task
          itemtask={itemTask}
          key={itemTask.id}
          editTask={editTask}
          changeComplete={changeComplete}
          value={value}
          setValue={setValue}
          deleteTask={deleteTask}
          setEditing={setEditing}
          setUpdateTime={setUpdateTime}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
      ))}
    </ul>
  );
}

export default TaskList;
