import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";

export default function Stopwatch({ times, setTimes }) {
  const [isActive, setIsActive] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [time, setTime] = useState(0);

  const [custom, setCustom] = useState(false);

  const [hours, setHours] = useState(0);

  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        setTimes((times) => times + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, setTimes, custom]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setTimes(0);
    setMinutes(0);
    setHours(0);
  };

  const handleCustom = () => {
    setCustom(true);
    setIsPaused(true);
  };

  const handleConfirm = () => {
    let milHours = hours * 3600000;
    let milMins = minutes * 60000;
    let milTime = milHours + milMins;
    setCustom(false);
    setIsActive(true);
    setTime(milTime);
    setTimes(milTime);
  };

  const handleHourChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinutes(e.target.value);
  };

  const timeInputBox = (
    <div>
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">Hours</InputLabel>
        <Select
          labelid="demo-simple-select-label"
          id="demo-simple-select"
          value={hours}
          label="Hours"
          onChange={handleHourChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
        <Select
          labelid="demo-simple-select-label"
          id="demo-simple-select"
          value={minutes}
          label="Hours"
          onChange={handleMinuteChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
        >
          {[...Array(60).keys()].map((min) => (
            <MenuItem value={min} key={min}>
              {min}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  return (
    <div className="stop-watch">
      {!custom ? <Timer time={time} /> : timeInputBox}

      <ControlButtons
        custom={custom}
        handleCustom={handleCustom}
        handleConfirm={handleConfirm}
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}
