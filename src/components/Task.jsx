import { formatDistanceToNow } from 'date-fns';

function Task({ itemtask, editTask, changeComplete, value, setValue, deleteTask, setEditing }) {
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
        <label
          onClick={() => {
            changeComplete(itemtask.id);
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
