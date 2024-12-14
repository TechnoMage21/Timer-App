import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Typewriter } from "react-simple-typewriter";

export default function Timer() {
  const [timer, setTimer] = useState({
    hour: 0,
    minute: 0,
    seconds: 0,
  });

  const [currentTime, setCurrentTime] = useState({
    hour: 0,
    minute: 0,
    seconds: 0,
  });

  const [isTimerRunning, setRunning] = useState(false);

  // Handles input changes for hours, minutes, and seconds
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimer((prev) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  // Starts the timer
  const handleStart = () => {
    const { hour, minute, seconds } = timer;
    if (hour === 0 && minute === 0 && seconds === 0) {
      alert("Please set a valid timer duration.");
      return;
    }
    setCurrentTime(timer);
    setRunning(true);
    setTimer({ hour: 0, minute: 0, seconds: 0 });
  };

  // Stops the timer
  const handleStop = () => {
    setRunning(false);
    setCurrentTime({ hour: 0, minute: 0, seconds: 0 });
  };

  // Timer countdown logic
  useEffect(() => {
    let timerInterval;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setCurrentTime(({ hour, minute, seconds }) => {
          if (hour === 0 && minute === 0 && seconds === 0) {
            clearInterval(timerInterval);
            setRunning(false);
            alert("Time's up!");
            return { hour: 0, minute: 0, seconds: 0 };
          }

          if (seconds > 0) {
            return { hour, minute, seconds: seconds - 1 };
          } else if (minute > 0) {
            return { hour, minute: minute - 1, seconds: 59 };
          } else if (hour > 0) {
            return { hour: hour - 1, minute: 59, seconds: 59 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  // Helper to format time values with leading zeroes
  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <>
      <div className="tick">
        <h2>
          {isTimerRunning ? (
            <Typewriter
              words={["Timer is Running"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={60}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          ) : (
            "Set Timer"
          )}
        </h2>
      </div>

      <div className="timer">
        {/* Time Selection */}
        <div className="select-time">
          <select name="hour" onChange={handleChange} value={timer.hour}>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {formatTime(i)}
              </option>
            ))}
          </select>
          <select name="minute" onChange={handleChange} value={timer.minute}>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {formatTime(i)}
              </option>
            ))}
          </select>
          <select name="seconds" onChange={handleChange} value={timer.seconds}>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {formatTime(i)}
              </option>
            ))}
          </select>
        </div>

        {/* Timer Display */}
        <div className="timer-show">
          <h2>
            {formatTime(currentTime.hour)}:{formatTime(currentTime.minute)}:
            {formatTime(currentTime.seconds)}
          </h2>
        </div>

        {/* Control Buttons */}
        <div className="button-div">
          <button className="btn btn-success" onClick={handleStart}>
            <PlayArrowIcon />
          </button>
          {isTimerRunning && (
            <button className="btn btn-danger" onClick={handleStop}>
              <StopIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
