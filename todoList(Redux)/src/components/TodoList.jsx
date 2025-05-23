import {useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import './styles/TodoList.css';

function TodoList({ filter = 'all' }) {
  const todos = useSelector((state) => state.todos.list) 
  // debugger;


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

