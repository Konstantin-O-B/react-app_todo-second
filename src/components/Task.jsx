import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from './Timer';

/*   return (
    <div>
      <button onClick={toggleTimer}>{!startAt ? 'Start' : 'Pause'}</button>
      <div>timer {Math.floor(timer / 1000)}</div>
      <div>countDown {Math.ceil(countDown / 1000)}</div>
    </div>
  ); */

function Task({
  itemtask,
  editTask,
  changeComplete,
  value,
  setValue,
  deleteTask,
  setEditing,
  setMinutes,
  setSeconds,
  setArrayTasks,
  arrayTasks,
  minutes,
  seconds,
}) {
  const result = formatDistanceToNow(new Date(itemtask.id), { includeSeconds: true });

  return (
    <li className={itemtask.status}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          // eslint-disable-next-line no-unneeded-ternary
          checked={itemtask.status === 'completed' ? true : false}
          readOnly
          onClick={() => {
            changeComplete(itemtask.id);
          }}
        />
        <label>
          <span
            className="title"
            role="cell"
            onClick={() => {
              changeComplete(itemtask.id);
            }}
          >
            {itemtask.task}
          </span>
          <span className="description">
            <Timer
              itemtask={itemtask}
              setMinutes={setMinutes}
              setSeconds={setSeconds}
              setArrayTasks={setArrayTasks}
              arrayTasks={arrayTasks}
              minutes={minutes}
              seconds={seconds}
            />
          </span>
          <span className="description">created {result} ago</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          onClick={() => {
            setEditing(itemtask.id);
            setValue(itemtask.task);
          }}
        />
        <button className="icon icon-destroy" type="button" onClick={() => deleteTask(itemtask)} />
      </div>
      {itemtask.status === 'editing' && (
        <input
          type="text"
          className="edit"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              editTask(e.target.value, itemtask.id);
              setEditing(itemtask.id);
            }
          }}
        />
      )}
    </li>
  );
}

export default Task;
