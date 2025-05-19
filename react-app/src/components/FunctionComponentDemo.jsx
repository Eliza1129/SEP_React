import { memo, useCallback, useEffect, useRef, useState } from "react";

function FunctionComponentDemo({ handleAdd, counter }) {
  const [timer, setTimer] = useState(0);
  const [toggle, setToggle] = useState(true);

  // const timerRef = useRef(null);
  // console.log(timerRef);

  // const handleAddRef = useRef(handleAdd);
  // console.log(handleAddRef.current === handleAdd);

  // const handleStopTimer = () => {
  //   clearInterval(timerRef.current);
  // };

  // equivalent to componentDidMount
  useEffect(() => {
    console.log("useEffect");
  }, []); // dependency array

  // equivalent to componentDidUpdate
  useEffect(() => {
    console.log(" useEffect without dependency array");
  });

  // equivalent to componentDidUpdate, but it only listens to the values in dependency array
  useEffect(() => {
    console.log("useEffect with counter ");
    return () => {
      // cleanup
      console.log("clean up");
    };
  }, [counter]);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTimer((prev) => prev + 1);
  //   }, 1000);

  //   // does not trigger re-render
  //   timerRef.current = id;

  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  // initial render -> useEffect
  // update -> 1st useEffect clean up -> trigger 2nd useEffect
  // update -> 2nd useEffect clean up -> trigger 3rd useEffect
  // unmouting -> 3rd useEffect clean up

  // side effect: change anything outside of the component

  // jsx
  return (
    <>
      <div>
        {/* <h3>Timer: {timer}</h3>
        <button onClick={handleStopTimer}>Stop Timer</button> */}
        <h3>Counter: {counter}</h3>
        <button onClick={handleAdd}>Add one</button>
      </div>
      <div>
        <h3>{toggle ? "show" : "hide"}</h3>
        <button onClick={() => setToggle(!toggle)}>Toggle</button>
      </div>
    </>
  );
}

export default memo(FunctionComponentDemo);
