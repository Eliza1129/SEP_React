import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CarsApp from "./components/CarsApp";

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <CarsApp />
    </>
  );
}

export default App;
