import React from 'react';

import TaskFilter from './TaskFilter';

function Footer({ arrayTasks, todoFilter, clearCompleted }) {
  const activeTasks = arrayTasks.filter((item) => item.status);
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks.length} items left</span>
      <TaskFilter todoFilter={todoFilter} />
      <button className="clear-completed" onClick={clearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
