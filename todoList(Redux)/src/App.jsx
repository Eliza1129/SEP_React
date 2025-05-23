import './App.css';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './todos/todosSlice';


function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div className="app-container">
      <InputBar />
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="error">Error: {error}</p>}

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

