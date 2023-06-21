import React from 'react';

function TaskFilter({ todoFilter }) {
  return (
    <ul
      className="filters"
      onClick={(e) => {
        todoFilter(e.target.value);
      }}
    >
      <li>
        <button value="all" type="button">
          All
        </button>
      </li>
      <li>
        <button value="active" type="button">
          Active
        </button>
      </li>
      <li>
        <button value="completed" type="button">
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;
