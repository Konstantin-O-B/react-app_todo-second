import React from 'react';

import Task from './Task';

function TaskList({ filtered, remove, editTask, changeComplete, showEdit, value, setValue }) {
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
        />
      ))}
    </ul>
  );
}

export default TaskList;
