import React from 'react';
import App from './App';
import { TodoProvider } from './context/TodoContext';

function AppWrapper() {
    return (
        <TodoProvider>
            <App />
        </TodoProvider>
    );
}

export default AppWrapper;