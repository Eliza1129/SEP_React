import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import './styles/TodoList.css';

function TodoList({ filter = 'all' }) {
  const { state } = useContext(TodoContext); // get todos
  const { todos } = state;

  // based on different states to do render
  const filtered = filter === 'completed'
    ? todos.filter(todo => todo.completed)
    : filter === 'pending'
    ? todos.filter(todo => !todo.completed)
    : todos;

  return (
    <div className="todo-list">
      {filtered.map((todo) => (
        <TodoItem key={`${todo.id}-${todo.title}`} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;

