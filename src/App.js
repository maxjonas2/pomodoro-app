import React from "react";
import Timer from "./components/Timer";

export default function App() {
  return (
    <div className="app-container flow-large">
      <h1>pomodoro</h1>
      <div className="selector"></div>
      <Timer />
    </div>
  );
}
