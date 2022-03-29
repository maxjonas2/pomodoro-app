import React, { useEffect, useRef, useState } from "react";

function parseToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export default function Timer({
  elapsed,
  isRunning,
  togglePaused,
  size = 350,
  iterationDuration,
  duration
}) {
  const SIZE = size;
  const TOTAL_SECONDS = duration;
  const ITERATIONS_PER_SECOND = 1000 / iterationDuration;

  const [circleLength, setCircleLength] = useState(0);
  const [currentLength, setCurrentLength] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const circleRef = useRef();
  const leapSize = useRef(0);

  useEffect(() => {
    const _circleLength = circleRef?.current.getTotalLength();
    setCircleLength(_circleLength);
    leapSize.current = _circleLength / (duration * (1000 / iterationDuration));
  }, []);

  useEffect(() => {
    setCurrentLength(elapsed * leapSize.current);
    if (elapsed % ITERATIONS_PER_SECOND === 0) {
      setElapsedSeconds(elapsed / ITERATIONS_PER_SECOND);
    }
  }, [elapsed]);

  return (
    <div className="outer-circle" onClick={togglePaused}>
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
            strokeDashoffset={circleLength - currentLength}
          />
        </svg>
        <div className="inner-container flow-large">
          <div className="elapsed-time">
            {parseToMinutes(TOTAL_SECONDS - elapsedSeconds)}
          </div>
          <div className="action-label">{isRunning ? "Pause" : "Start"}</div>
        </div>
      </div>
    </div>
  );
}
