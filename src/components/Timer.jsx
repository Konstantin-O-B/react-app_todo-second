import React, { useEffect, useState } from 'react';

import useNow from '../hooks/useNow';

function Timer({ itemtask, setUpdateTime }) {
  const [startAt, setStartAt] = useState();
  const [initialTimer, setInitialTimer] = useState(0);
  const [startedTimer, setStartedTimer] = useState(false);

  const now = useNow(1000, startedTimer);
  const timeFromStart = now - (startAt ?? now);
  const timeInputValue = itemtask.minutes * 60000 + itemtask.seconds * 1000;
  const timer = timeFromStart + initialTimer;
  const countDown = timeInputValue - timer;

  const isCountEnd = countDown < 0 && itemtask.minutes !== 0 && itemtask.seconds !== 0;
  useEffect(() => {
    if (isCountEnd && timeInputValue) {
      alert(`${itemtask.task} completed`);
    }
  }, [isCountEnd]);

  const toggleTimer = () => {
    if (startedTimer) {
      setStartedTimer(false);
      setUpdateTime(itemtask.id, countDown);
      setInitialTimer((prev) => prev);
      setStartAt(null);
    } else {
      setStartedTimer(true);
      setStartAt(Date.now());
    }
  };

  function msToTime(duration) {
    if (duration < 0) {
      return 'Times up';
    }

    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  /* ----------------------Таймер конец--------------------------------*/

  return (
    <div className="timer">
      {itemtask.isTimer && (
        <button
          className="playPauseButton"
          type="button"
          onClick={() => {
            toggleTimer();
          }}
        />
      )}
      <span>{itemtask.minutes || itemtask.seconds ? msToTime(countDown) : null}</span>
    </div>
  );
}

export default Timer;
