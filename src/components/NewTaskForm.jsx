import React from 'react';

function NewTaskForm({
  setTask,
  addNewTask,
  setMinutes,
  setSeconds,
  value,
  minutes,
  seconds,
  /* setArrayTasks, */
  /* arrayTasks, */
}) {
  /* eslint-disable react/jsx-props-no-spreading */

  /*   function setMin(val) {
    if (Number.isNaN(val)) {
      return alert('Минуты должны быть числами');
    }
    console.log(Number.isNaN(val));
    return setMinutes(val);
  }

  function setSec(val) {
    if (Number.isNaN(val)) {
      return alert('Cекунды должны быть числами');
    }
    return setSeconds(val);
  } */

  // eslint-disable-next-line consistent-return
  function setTimer(timeValue, typeOfTime) {
    if (Number.isNaN(timeValue)) {
      return alert(`${typeOfTime} должны быть числами`);
    }
    if (typeOfTime === 'Minutes') {
      return setMinutes(timeValue);
    }
    if (typeOfTime === 'Seconds') {
      return setSeconds(timeValue);
    }
  }

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => {
          setTask(e.target.value.trimStart());
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            addNewTask();
          }
        }}
        value={value}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => {
          setTimer(+e.target.value, 'Minutes');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addNewTask();
          }
        }}
        value={minutes}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => {
          setTimer(+e.target.value, 'Seconds');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addNewTask();
          }
        }}
        value={seconds}
      />
    </form>
  );
}

export default NewTaskForm;
