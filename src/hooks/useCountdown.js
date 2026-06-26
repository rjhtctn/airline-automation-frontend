import { useState, useEffect, useCallback } from "react";

const useCountdown = (initialSeconds = 60) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const start = useCallback(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    setTimeLeft(0);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isFinished: timeLeft === 0,
    start,
    reset,
  };
};

export default useCountdown;
