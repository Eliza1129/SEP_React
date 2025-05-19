import { createContext, useState } from "react";

/**
 * why use context
 * avoid prop drilling
 * centrialized state management
 * easier to maintain, easier to trace bugs
 * when not to use it
 * frequent update
 */

export const CounterContext = createContext();

function CounterProvider({ children }) {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterProvider;
