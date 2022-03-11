import React, { useEffect, useRef, useState } from "react";

function parseTime(totalMinutes, elapsed, interval) {
  if ((elapsed * interval) % 1000 === 0) {
    console.log("1 second");
  }
}

export default function Timer({ size = 300 }) {
  const SIZE = size;
  const TOTAL_TIME = 10;
  const INTERVAL = 100;

  const circleRef = useRef();
  const timerRef = useRef(null);

  const [circleLength, setCircleLength] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;
    timerRef.current = setTimeout(() => {
      setElapsedTime(elapsedTime + 1);
      //   parseTime(2, elapsedTime, INTERVAL);

      return () => clearTimeout(timerRef.current);
    }, INTERVAL);
  }, [elapsedTime, timerRunning]);

  useEffect(() => {
    setCircleLength(circleRef?.current.getTotalLength());
  }, []);

  return (
    <div
      className="outer-circle"
      onClick={() => setTimerRunning(!timerRunning)}
    >
      <div className="inner-circle">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            ref={circleRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={SIZE / 2 - 20}
            stroke="tomato"
            fill="transparent"
            strokeWidth={6}
            strokeDasharray={circleLength}
            strokeDashoffset={
              circleLength -
              (circleLength / (TOTAL_TIME * 10)) *
                (TOTAL_TIME * (1000 / INTERVAL) - elapsedTime)
            }
          />
        </svg>
        <div className="inner-container flow-large">
          <div className="elapsed-time">18:00</div>
          <div className="action-label">{timerRunning ? "Pause" : "Start"}</div>
        </div>
      </div>
    </div>
  );
}
