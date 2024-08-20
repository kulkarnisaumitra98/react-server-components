"use client";

import { useState } from "react";
import Button from "./Button.js";

const Counter = ({ titleText }: any) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {titleText}
      <p>
        I am Counter currently at <b>{count}</b>
      </p>
      <Button setCount={setCount} />
    </div>
  );
};

export default Counter;
