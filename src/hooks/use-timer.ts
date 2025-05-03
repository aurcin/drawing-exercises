import { useState, useEffect } from 'react';

function useTimer(initialTime: number = 0) {
  const [time, setTimer] = useState(initialTime);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (time === 0) return;

    const interval = setInterval(() => {
      if (!paused) {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, paused]);

  function get() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  }

  function set(time: number = initialTime) {
    setTimer(time);
    setPaused(false);
  }

  function pause() {
    setPaused(true);
  }

  function unpause() {
    setPaused(false);
  }

  function toggle() {
    setPaused(prev => !prev);
  }

  function reset(time: number = initialTime) {
    setTimer(time);
    setPaused(false);
  }

  return { get, set, reset, pause, unpause, toggle };
}

export default useTimer;
