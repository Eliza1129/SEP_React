const carsInitialValue = [
  {
    make: "Toyota",
    quantity: 10,
    id: 1,
  },
  {
    make: "Honda",
    quantity: 10,
    id: 2,
  },
  {
    make: "Nissan",
    quantity: 7,
    id: 3,
  },
];

const carsReducer = (state = carsInitialValue, { type, payload }) => {
  console.log("in car reducer");
  switch (type) {
    case "SELL":
      const newState = state.map((car) => {
        if (car.id === payload) {
          return {
            ...car,
            quantity: car.quantity - 1,
          };
        } else {
          return car;
        }
      });
      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export { carsReducer };
