import React from 'react';
import './App.css';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="app-container">
      <InputBar />

      <div className="lists">
        <div className="todo-section">
          <h2 className="title pending">Pending Tasks</h2>
          <TodoList filter="pending" />
        </div>

        <div className="todo-section">
          <h2 className="title completed">Completed Tasks</h2>
          <TodoList filter="completed" />
        </div>
      </div>
    </div>
  );
}

export default App;

