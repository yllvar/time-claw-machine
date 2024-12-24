import { useState, useEffect } from 'react';

export const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    console.log('Timer started');
    setIsRunning(true);
  };

  const pauseTimer = () => {
    console.log('Timer paused');
    setIsRunning(false);
  };

  const resetTimer = () => {
    console.log('Timer reset');
    setTimeLeft(initialTime);
    setIsGameOver(false);
    setIsRunning(false);
  };

  return { timeLeft, startTimer, pauseTimer, resetTimer, isGameOver };
};

