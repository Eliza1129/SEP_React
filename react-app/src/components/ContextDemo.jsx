import { createContext, useContext } from "react";
import { CounterContext } from "../context/CounterContext";

function ContextDemo() {
  const data = useContext(CounterContext);
  console.log(data);
}

export default ContextDemo;

// 1. create context
// 2. provide context
// 3. use in components
