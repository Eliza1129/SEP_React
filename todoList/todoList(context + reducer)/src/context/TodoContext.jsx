import React, { createContext, useReducer, useEffect } from 'react';
import { todoReducer, initialState } from '../reducers/todoReducer';
import { APIs } from '../api';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    //from server load todos
    useEffect(() => {
        APIs.getTodos().then((data) => {
            dispatch({ type: 'SET_TODOS', payload: data});
        });
    }, []);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};



export default TodoProvider;