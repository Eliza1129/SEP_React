import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../todos/todosSlice"

// configure store will connect thunks automatically
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;