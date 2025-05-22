import React from "react";
import store from "../store/store";
// import { useDispatch, useSelector } from "react-redux";
import useDispatch from "../Context/useDispatch.js";
import useSelector from "../Context/useSelector.js";

const CarsApp = () => {
  // const { cars } = store.getState();
  console.log(store);
  const cars = useSelector((state) => state.cars); // retrieving state, subscribing
  const dispatch = useDispatch();
  return (
    <div>
      {cars.map(({ make, quantity, id }) => (
        <div
          key={id}
          style={{
            width: "150px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            border: "1px solid black",
            padding: "15px",
          }}
        >
          <div>{make}</div>
          <div>{quantity}</div>
          <button onClick={() => dispatch({ type: "SELL", payload: id })}>
            Sell
          </button>
        </div>
      ))}
    </div>
  );
};

export default CarsApp;
