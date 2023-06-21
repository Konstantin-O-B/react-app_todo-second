import React from 'react';

function NewTaskForm(props) {
  /* eslint-disable react/jsx-props-no-spreading */
  return <input className="new-todo" placeholder="What needs to be done?" autoFocus {...props} />;
}

export default NewTaskForm;
