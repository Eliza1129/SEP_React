import { combineReducers, createStore } from "redux";
import { carsReducer } from "../slice/CarsSlice";

const rootReducer = combineReducers({
  cars: carsReducer,
});

const store = createStore(rootReducer);

const createMyStore = (reducer, preloadedState = {}, enhancer = undefined) => {
  if (enhancer) {
    // ...
  }

  const store = {
    state: preloadedState,
  };

  store.state = undefined;
  store.callbackFns = [];

  store.getState = () => {
    return store.state;
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);

    store.callbackFns.forEach((callbackFn) => callbackFn());
  };

  store.subscribe = (callbackFn) => {
    store.callbackFns.push(callbackFn);

    // unsubscribe
    return () => {
      store.callbackFns.filter((fn) => fn !== callbackFn); // comparing the function reference
    };
  };

  store.dispatch({ type: "@INIT" });

  return store;
};

export default store;
