import { useEffect, useState, useRef } from "react";

function useCountdown(initialTime) {
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);
    const initialTimeRef = useRef(initialTime); 

    
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

    const start =(newTime) => {
        initialTimeRef.current = newTime; 
        setRemainingTime(newTime);
        setIsRunning(true);
    }

    const pause = () => {
        setIsRunning(false);
        };

    const resume = () => {
        if (remainingTime > 0) setIsRunning(true);
    };

    const reset = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setRemainingTime(initialTimeRef.current);
        setIsRunning(false);
    };

    return {
        remainingTime,
        isRunning,
        start,
        pause,
        resume,
        reset
    };


}

export default useCountdown;