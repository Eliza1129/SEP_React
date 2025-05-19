import {
  useState,
  createElement,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ClassDemo from "./components/ClassComponents/ClassDemo";
import CarApp from "./components/ClassComponents/CarApp/CarApp";
import FunctionComponentDemo from "./components/FunctionComponentDemo";
import ReducerDemo from "./components/ReducerDemo";
import ContextDemo from "./components/ContextDemo";
import CounterProvider, { CounterContext } from "./context/CounterContext";
import withCounter from "./hoc/withCounter";
import useCounter from "./hooks/useCounter";
import withTimestamp from "./hoc/withTimestamp";
import useToggle from "./hooks/useToggle";
import useLoading from "./hooks/useLoading";
import useTimestamp from "./hooks/useTimestamp";

const arr = [1, 2, 3, 4, 5];

const TimestampedFunctionDemo = withTimestamp(FunctionComponentDemo);

//App vs <App />
// console.log(<App />);
// App vs App()

function App() {
  const [show, setShow] = useState(true);
  const { counter, handleAdd } = useCounter(10);

  
  const [isToggled, toggle] = useToggle();
  const [isLoading, setIsLoading] = useLoading(true);
  const timestamp = useTimestamp();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);


  // const { counter } = useContext(CounterContext);

  // cache/memorize a function between renders
  // const handleAdd = useCallback(() => {
  //   setCounter((prev) => {
  //     return prev + 1;
  //   });
  // }, []);

  // const handleAdd = () => {
  //   setCounter((prev) => {
  //     return prev + 1;
  //   });
  // };

  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    // onclick, onClick -> camal case

    // <>
    //   <button
    //     onClick={() => {
    //       setShow(!show);
    //     }}
    //   >
    //     Toggle Class Demo
    //   </button>
    //   {/* conditional rendering */}
    //   {show && (
    //     <ClassDemo name="alice">
    //       <p>this is a child of class demo component</p>
    //     </ClassDemo>
    //   )}
    //   <ul>
    //     {arr.map((num, index) => (
    //       <li key={index}>number: {num}</li> // not the best practice tp use index as key
    //     ))}
    //   </ul>
    // </>
    <div>
      <h3>App Counter: {counter}</h3>
      <p>App Rendered At: {timestamp}</p>
      <button onClick={handleAdd}>Add One to App Counter</button>
      
      <button onClick={toggle}>Toggle Class Demo</button>
      {isToggled && (
        <ClassDemo name="Happy" timestamp={timestamp}>
          <p>This is a child of ClassDemo component</p>
        </ClassDemo>
      )}

      {isLoading ? <p>Loading CarApp...</p> : <CarApp timestamp={timestamp} />}

      <TimestampedFunctionDemo handleAdd={handleAdd} counter={counter} />

      <ContextDemo />

      <ReducerDemo />
      <CarApp />
      {/* <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Toggle Counter
      </button> */}
      {/* <button onClick={() => setCount(count + 1)}>increase count</button>
      <h4>Count: {count}</h4>
      {show && (
        <FunctionComponentDemo handleAdd={handleAdd} counter={counter} />
      )} */}
    </div>
    // JSX (Javascript XML) HTML-like syntax sugar
    // createElement() -> react elements -> react DOM/virtual DOM
    // createElement(), transpiler: Babel
    // createElement("h1", { className: "greeting" }, "Hello")
    // <h1 className="greeting">Hello</h1>
  );
}

export default App;
