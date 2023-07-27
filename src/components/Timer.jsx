import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';

function Timer({ itemtask /* , setUpdateTime  , setMinutes, setSeconds */ }) {
  const [startAt, setStartAt] = useState();
  const [initialTimer, setInitialTimer] = useState(0);

  function useNow(updateInterval, enabled, cb) {
    const cbRef = useRef(cb);
    cbRef.current = cb;
    const [now, setNow] = useState(Date.now());

    useLayoutEffect(() => {
      if (!enabled) {
        return;
      }

      setNow(Date.now());

      const interval = setInterval(() => {
        setNow(Date.now());
      }, updateInterval);

      // eslint-disable-next-line consistent-return
      return () => {
        clearInterval(interval);
      };
    }, [updateInterval, enabled]);
    return now;
  }

  const now = useNow(100, startAt);
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
    if (startAt) {
      setInitialTimer(timer);
      setStartAt();
    } else {
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
    /* localStorage.setItem('savedTime', String(duration));
    console.log(localStorage.getItem('seconds')); */
    return `${minutes}:${seconds}`;
  }

  /* ----------------------Таймер конец--------------------------------*/

  return (
    <div className="timer">
      <PlayCircleTwoTone
        onClick={() => {
          toggleTimer();
        }}
        twoToneColor="#cc9a9a"
        style={{ fontSize: '32px' }}
      />
      <PauseCircleTwoTone onClick={toggleTimer} twoToneColor="#cc9a9a" style={{ fontSize: '32px' }} />
      <span>{itemtask.minutes || itemtask.seconds ? msToTime(countDown) : msToTime(timer)}</span>
    </div>
  );
}

export default Timer;
