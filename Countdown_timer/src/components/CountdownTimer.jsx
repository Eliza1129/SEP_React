import React, { useEffect, useState, useRef } from "react";
import useCountdown from "../hooks/useCountdown";
function Countdown() {
    const { 
        remainingTime, 
        isRunning, 
        start, 
        pause, 
        resume, 
        reset 
    } = useCountdown(0);

    const [inputMinutes, setInputMinutes] = useState("");
    const [inputSeconds, setInputSeconds] = useState("");
 

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const paddedMinutes = minutes.toString().padStart(2, "0");
        const paddedSeconds = seconds.toString().padStart(2, "0");

        return `${paddedMinutes}:${paddedSeconds}`
    }
    


    // const handleStart = () => {
    //     const totalSeconds = inputMinutes * 60 + inputSeconds;
    //     setRemainingTime(totalSeconds);
    //     setInitialTime(totalSeconds);
    //     setIsRunning(true);
    // }

    // const handlePause = () => {
    //     if (isRunning) {
    //         clearInterval(timerRef.current);
    //         timerRef.current = null;
    //         setIsRunning(false);
    //     } else{
    //         setIsRunning(true);
    //     }
    // };

    // const handleReset = () => {
    //         clearInterval(timerRef.current);
    //         timerRef.current = null;
    //         setRemainingTime(initialTime);
    //         // setRemainingTime(0);
    //         // setInitialTime(0);
    //         setIsRunning(false);
            
    //         // setInputMinutes("");
    //         // setInputSeconds("");
    // }

    return (
       <div className="timer-container">
        <h1>Timer</h1>

        <div>
            <label>
                <input
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}    
                />
            Minutes
            </label>

            <label>
                <input
                type="number"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                />
            Seconds
            </label>

            <button onClick={() => {
                const totalSeconds = Number(inputMinutes) * 60 + Number(inputSeconds);
                start(totalSeconds);
            }}
            >
                STRAT
            </button>
        </div>
        
        <div className="button-row">
            <button onClick={isRunning ? pause : resume}>PAUSE/RESUME</button>
            <button onClick={reset}>RESET</button>
        </div>
        

        <p className="time-display">{formatTime(remainingTime)}</p>

        
       </div> 
    );
};

export default Countdown;