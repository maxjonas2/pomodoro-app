import React, { useCallback, useEffect, useRef, useState } from "react";
import Timer from "./components/Timer";

export default function App() {
  const ITERATION_DURATION = 500;
  const POMODORO_MINUTES = 2;

  const [elapsed, setElapsed] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const timerRef = useRef(0);

  const timer = useRef();
  timer.current = () =>
    getTimer(
      (seconds, timer) => {
        setElapsed(seconds);
        timerRef.current = timer;
      },
      ITERATION_DURATION,
      elapsed
    );

  useEffect(() => {
    if (running) {
      timer.current();
    } else {
      clearTimeout(timerRef.current + 1);
    }
  }, [running]);

  function toggleHandler() {
    setRunning(!running);
  }

  return (
    <div className="app-container flow-large">
      <h1>pomodoro</h1>
      <div className="selector"></div>
      <Timer
        elapsed={elapsed}
        unit={1000}
        duration={POMODORO_MINUTES * 60}
        iterationDuration={ITERATION_DURATION}
        toggleHandler={toggleHandler}
        running={running}
      />
      <p>{elapsedSeconds}</p>
      <button
        style={{ display: "none" }}
        onClick={() => {
          clearTimeout(timerRef.current + 1);
        }}
      >
        Stop
      </button>
    </div>
  );
}

function getTimer(callback, period = 1000, initial = 0) {
  const startTime = document.timeline.currentTime;
  let timerRef = 0;

  function frame(elapsed) {
    const time = elapsed - startTime;
    const seconds = Math.round(time / period);
    callback(seconds + initial, timerRef);
    const targetNext = (seconds + 1) * period + startTime;

    timerRef = setTimeout(() => {
      requestAnimationFrame(frame);
    }, targetNext - performance.now());
  }

  requestAnimationFrame(frame);
}
