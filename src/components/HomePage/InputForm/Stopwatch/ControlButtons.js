import React from "react";
import {
  PlayArrow,
  Pause,
  RestartAlt,
  Edit,
  AddTask,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function ControlButtons({
  handleStart,
  handleReset,
  handlePauseResume,
  active,
  isPaused,
  custom,
  handleCustom,
  handleConfirm,
}) {
  const StartButtons = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton onClick={handleCustom}>{<Edit />}</IconButton>
      <IconButton onClick={handleStart}>{<PlayArrow />}</IconButton>
    </div>
  );

  const ActiveButtons = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton onClick={handleReset}>{<RestartAlt />}</IconButton>
      <IconButton onClick={handlePauseResume}>
        {isPaused ? <PlayArrow /> : <Pause />}
      </IconButton>
    </div>
  );

  const ConfirmClickButton = (
    <IconButton onClick={handleConfirm}>{<AddTask />}</IconButton>
  );

  return (
    <div>
      {(() => {
        if (active && !custom) {
          return ActiveButtons;
        } else if (!active && !custom) {
          return StartButtons;
        } else if (custom && !active) {
          return ConfirmClickButton;
        }
      })()}
    </div>
  );
}
