"use client";

import { useEffect, useState } from "react";

const AutoCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>
        I am an auto counter <b>{count}</b>
      </p>
    </div>
  );
};

export default AutoCounter;
