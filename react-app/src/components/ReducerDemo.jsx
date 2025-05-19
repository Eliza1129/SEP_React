import { useContext, useReducer, useState } from "react";
import { CounterContext } from "../context/CounterContext";

// pure function: same input, same output, no side effects
const counterReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    case "MINUS":
      return {
        ...state,
        counter: state.counter - action.payload,
      };
  }
};

function ReducerDemo() {
  // const [counter, setCounter] = useState(0);
  // const [status, setStatus] = useState(false);

  // better for managing complex state logic
  // more centralized logic
  const [state, dispatch] = useReducer(counterReducer, { counter: 0 });

  const data = useContext(CounterContext);
  console.log(data);

  // const handleAdd = () => {
  //   setCounter(counter + 1);
  // };

  // const handleAdd2 = () => {
  //   setCounter(counter + 2);
  // };

  // const handleMinus = () => {
  //   if (counter === 0) return;
  //   setCounter(counter - 1);
  // };

  return (
    <div>
      <h3>Reducer Demo</h3>
      <p>Reducer counter: {state.counter}</p>
      <button onClick={() => dispatch({ type: "ADD", payload: 1 })}>
        Add 1
      </button>
      <button onClick={() => dispatch({ type: "ADD", payload: 2 })}>
        Add 2
      </button>
      <button onClick={() => dispatch({ type: "MINUS", payload: 1 })}>
        Minus 1
      </button>
    </div>
  );
}

export default ReducerDemo;
