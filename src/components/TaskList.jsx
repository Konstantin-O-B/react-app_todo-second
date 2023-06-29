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
        />
      ))}
    </ul>
  );
}

export default TaskList;
