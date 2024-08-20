"use client";
import type { Dispatch } from "react";

interface Props {
  setCount?: Dispatch<React.SetStateAction<number>>;
}

const Button = ({ setCount }: Props) => {
  return (
    <button onClick={() => setCount?.((prev) => prev + 1)}>Increment</button>
  );
};

export default Button;
