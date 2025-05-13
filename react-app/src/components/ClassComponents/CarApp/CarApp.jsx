import React from "react";
import { v4 as uuidv4 } from "uuid";
import InfoCard from "./InfoCard";

/**
 * CarApp
 * InfoCard
 * SellButton
 *
 *
 * {
 *  make: toyota, honda, nissan
 *  id:
 *  quantity: 10
 * }
 */

const mockCarData = [
  {
    make: "Toyota",
    quantity: 10,
    id: uuidv4(),
  },
  {
    make: "Honda",
    quantity: 10,
    id: uuidv4(),
  },
  {
    make: "Nissan",
    quantity: 10,
    id: uuidv4(),
  },
];

console.log(uuidv4());

// shallow comparison: comparing the objects by checking the top-level properties

class CarApp extends React.Component {
  state = {
    cars: [...mockCarData],
  };

  handleSell = (id) => {
    // const car = this.state.cars.find((car) => car.id === id);
    // console.log(car);
    // // car.quantity--;
    // const newCar = { ...car, quantity: car.quantity-- };
    // this.setState((prev) => {
    //   prev.cars[id] = newCar;
    //   return prev.cars;
    // });

    this.setState((prev) => {
      const newCars = prev.cars.map((car) => {
        if (car.id === id) {
          // car.quantity--;
          // return car;
          return { ...car, quantity: car.quantity - 1 }; // immutable
        } else {
          return car;
        }
      });
      return { ...prev, cars: newCars };
    });
  };

  render() {
    return (
      // fragment
      <>
        <h3>Car App</h3>
        <ul style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          {this.state.cars.map((car) => (
            <InfoCard key={car.id} car={car} handleSell={this.handleSell} />
          ))}
        </ul>
      </>
    );
  }
}

export default CarApp;
