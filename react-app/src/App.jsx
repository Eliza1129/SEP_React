import { useState, createElement, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ClassDemo from "./components/ClassComponents/ClassDemo";
import CarApp from "./components/ClassComponents/CarApp/CarApp";

const arr = [1, 2, 3, 4, 5];

//App vs <App />
// console.log(<App />);
// App vs App()

function App() {
  const [count, setCount] = useState(0); // hook
  const [show, setShow] = useState(true);

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
      <CarApp />
    </div>
    // JSX (Javascript XML) HTML-like syntax sugar
    // createElement() -> react elements -> react DOM/virtual DOM
    // createElement(), transpiler: Babel
    // createElement("h1", { className: "greeting" }, "Hello")
    // <h1 className="greeting">Hello</h1>
  );
}

export default App;
