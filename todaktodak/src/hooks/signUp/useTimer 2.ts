import { useState, useEffect } from "react";

export function useTimer(initialTime: number, onTimeEnd: () => void) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeEnd]);

  const resetTimer = () => setTime(initialTime);

  return { time, resetTimer };
}
