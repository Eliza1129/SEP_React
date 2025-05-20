import React, { useEffect, useState, useRef } from "react";

function Countdown() {
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const paddedMinutes = minutes.toString().padStart(2, "0");
        const paddedSeconds = seconds.toString().padStart(2, "0");

        return `${paddedMinutes}:${paddedSeconds}`
    }
    
    const timerRef = useRef(null);

    useEffect(() => {
        if(isRunning && remainingTime > 0) {
            timerRef.current = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if(prevTime <= 1) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                        setIsRunning(false);
                        return 0
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isRunning, remainingTime]);

    const handleStart = () => {
        const totalSeconds = inputMinutes * 60 + inputSeconds;
        setRemainingTime(totalSeconds);
        setInitialTime(totalSeconds);
        setIsRunning(true);
    }

    const handlePause = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsRunning(false);
        } else{
            setIsRunning(true);
        }
    };

    const handleReset = () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setRemainingTime(initialTime);
            // setRemainingTime(0);
            // setInitialTime(0);
            setIsRunning(false);
            
            // setInputMinutes("");
            // setInputSeconds("");
    }

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

            <button onClick={handleStart}>STRAT</button>
        </div>
        
        <div className="button-row">
            <button onClick={handlePause}>PAUSE/RESUME</button>
            <button onClick={handleReset}>RESET</button>
        </div>
        

        <p className="time-display">{formatTime(remainingTime)}</p>

        
       </div> 
    );
};

export default Countdown;