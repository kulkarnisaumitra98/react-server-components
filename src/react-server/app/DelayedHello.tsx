import { wait } from "../utils.js";

const DelayedHello = async () => {
  await wait();

  return (
    <div>
      <p>I am DelayedHello</p>
    </div>
  );
};

export default DelayedHello;
