import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
// import "react-simple-typewriter/dist/index.css";
import { Typewriter } from "react-simple-typewriter";

export default function Timer() {
  const [timer, setTimer] = useState({
    hour: 0,
    minute: 0,
    seconds: 0,
  });
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isTimerRunning, setRunning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name + value);
    setTimer({ ...timer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHour(timer.hour);
    setMinute(timer.minute);
    setSecond(timer.seconds);
    setRunning(true);
    setTimer({ hour: 0, minute: 0, seconds: 0 });
    console.log(timer.hour + timer.minute + timer.seconds);
  };
const handleStop = (e)=>{
  e.preventDefault();
  setRunning(false);
  setHour(0);
  setMinute(0);
  setSecond(0);
}
  useEffect(() => {
    let timerInterval;
    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        if (hour === 0 && minute === 0 && second === 0) {
          clearInterval(timerInterval);
          alert("Time's up!");
          setRunning(false);
        } else if (second > 0) {
          setSecond((prevSecond) => prevSecond - 1);
        } else if (minute > 0) {
          setMinute((prevMinute) => prevMinute - 1);
          setSecond(59);
        } else if (hour > 0) {
          setHour((prevHour) => prevHour - 1);
          setMinute(59);
          setSecond(59);
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval); // Clear interval on component unmount or when dependencies change
  }, [isTimerRunning, hour, minute, second]);

  const displayHour = String(hour).padStart(2, "0");
  const displayMinute = String(minute).padStart(2, "0");
  const displaySecond = String(second).padStart(2, "0");
  return (
    <>
      <div className="tick">
        <h2>{isTimerRunning ?(
            <Typewriter
              words={["Timer is Going"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={60}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          ) : (
              "Start Timer"
          )}</h2>
      </div>
      <div className="timer">
        <div className="select-time">
          <select name="hour" id="" onChange={handleChange} value={timer.hour}>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {i >= 10 ? i : "0" + i}
              </option>
            ))}
          </select>
          <select
            name="minute"
            id=""
            onChange={handleChange}
            value={timer.minute}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {i >= 10 ? i : "0" + i}
              </option>
            ))}
          </select>
          <select
            name="seconds"
            id=""
            onChange={handleChange}
            value={timer.seconds}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {i >= 10 ? i : "0" + i}
              </option>
            ))}
          </select>
        </div>
        <div className="timer-show">
          <h2>
            {displayHour}:{displayMinute}:{displaySecond}
          </h2>
        </div>
      
      <div className="button-div">
        <button className="btn btn-success" onClick={handleSubmit}>
          <PlayArrowIcon />
        </button>
        {isTimerRunning ? <button className="btn btn-success" onClick={handleStop}>
          <StopIcon />
        </button>:''}
      </div>
      </div>
    </>
  );
}
