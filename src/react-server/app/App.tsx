import { Suspense } from "react";
import AutoCounter from "./AutoCounter.js";
import Counter from "./Counter.js";
import DelayedHello from "./DelayedHello.js";

export const App = () => {
  return (
    <div>
      <p>I am App</p>
      <Counter titleText={<p>I am Counter</p>} />
      <AutoCounter />
      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-ignore */}
        <DelayedHello />
      </Suspense>
    </div>
  );
};
