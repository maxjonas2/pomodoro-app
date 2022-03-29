import React from "react";

function ModeSelector({ modes, selected, handleClick }) {
  return (
    <div className="selector">
      {modes.map(mode => {
        return (
          <div
            key={mode}
            className={"mode".concat(selected === mode ? " selected" : "")}
            onClick={() => handleClick(mode)}
          >
            {mode}
          </div>
        );
      })}
    </div>
  );
}

export default ModeSelector;
