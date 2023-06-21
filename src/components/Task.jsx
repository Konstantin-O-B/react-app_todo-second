import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function Task({ itemtask, editTask, changeComplete, showEdit, value, setValue }) {
  const result = formatDistanceToNow(new Date(itemtask.id), { includeSeconds: true });

  return (
    <li
      className={itemtask.status ? 'active' : 'completed'}
      onClick={(e) => {
        changeComplete(e, itemtask.id, itemtask);
      }}
    >
      <div className="view">
        <input className="toggle" type="checkbox" checked={!!itemtask.status} />
        <label>
          <span className="description">{itemtask.task}</span>
          <span className="created">created {result} ago</span>
        </label>
        <button className="icon icon-edit" type="button" />
        <button className="icon icon-destroy" type="button" />
      </div>
      {showEdit === itemtask.id && (
        <input
          type="text"
          className="edit"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              editTask(itemtask.id);
              e.target.closest('li').classList.remove('editing');
              e.target.closest('li').classList.add('active');
            }
          }}
        />
      )}
    </li>
  );
}

export default Task;
