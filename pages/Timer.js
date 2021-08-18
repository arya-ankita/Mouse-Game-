import React, { useState, useRef, useEffect } from "react";

export default function Timer({ time, interval = 1000, onEnd }) {
   const [internalTime, setInternalTime] = useState(time);
   const timerRef = useRef(time);
 useEffect(() => {
   if (internalTime === 0 && onEnd) onEnd();
 }, [internalTime, onEnd]);
useEffect(() => {
  timerRef.current = setInterval(
    () => setInternalTime(internalTime - interval),
    interval
  );
  return () => {
    clearInterval(timerRef.current);
  };
}, [internalTime, interval]);
  return (
    <>
      <span>{`Time: ${internalTime / 1000}s`}</span>
    </>
  );
}
