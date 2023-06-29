/* eslint-disable jsx-a11y/no-static-element-interactions */
import { formatDistanceToNow } from 'date-fns';

function Task({
  itemtask,
  editTask,
  changeComplete,
  /* showEdit, */
  value,
  setValue,
  deleteTask,
  /* clickEdit,
  /* status, 
  changeStatus, */
  setEditing,
}) {
  const result = formatDistanceToNow(new Date(itemtask.id), { includeSeconds: true });
  /*   const statuses = {
    active: 'active',
    completed: 'completed',
    editing: 'editing',
  }; */

  // eslint-disable-next-line consistent-return

  return (
    <li
      className={/* `${itemtask.status ? 'active' : 'completed'} ${showEdit ? 'editing' : 'active'}` */ itemtask.status}
      /* onClick={(e) => {
        changeComplete(e, itemtask.id, itemtask);
      }} */
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          // eslint-disable-next-line no-unneeded-ternary
          checked={itemtask.status === 'completed' ? true : false}
          readOnly
          onClick={(e) => {
            changeComplete(itemtask.id);
            console.log(e);
          }}
        />
        <label
          onClick={() => {
            changeComplete(itemtask.id);
            /* changeStatus(status); */
          }}
        >
          <span className="description">{itemtask.task}</span>
          <span className="created">created {result} ago</span>
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
