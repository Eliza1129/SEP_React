import { useEffect, useState } from "react";

function useCounter(initCounterValue = 0) {
  const [counter, setCounter] = useState(initCounterValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    console.log("in custom hook");
  }, []);

  return { counter, handleAdd };
}

export default useCounter;
