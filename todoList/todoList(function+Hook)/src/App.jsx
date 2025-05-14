import React, { useState, useEffect, useMemo} from 'react'
import './App.css'
import {APIs} from "./api"
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';


function App() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     input: "",
  //     todos: [],
  //     editingId: null,
  //     editingText: "",
  //   };
  // }
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  //Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    APIs.getTodos().then((data) => {
      setTodos(data);
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim()) {
      const newTodo = { title: input, completed: false };
      APIs.createTodo(newTodo).then(() => {
        setInput('');
        loadTodos();
      });
    }
  };

  const handleDelete = (id) => {
    APIs.deleteTodo(id).then(() => loadTodos());
  };

  const handleToggleComplete = (id, currentStatus) => {
    APIs.updateTodo(id, { completed: !currentStatus }).then(() =>
      loadTodos()
    );
  };

  const handleFinishEdit = (id, newText) => {
  APIs.updateTodo(id, { title: newText }).then(() => loadTodos());
  };


  // const pending = todos.filter((todo) => !todo.completed);
  // const completed = todos.filter((todo) => todo.completed);
  const pending = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  const completed = useMemo(() => {
    return todos.filter((todo) => todo.completed);
  }, [todos]);


    return (
      <div className="app-container">
        <div className="header">
          <h1>📝 Todo List</h1>
        </div>
        
        <InputBar 
          input={input} 
          onChange={handleChange} 
          onAdd={handleAdd} 
        />

        <div className="lists">
          <div className="todo-section">
            <h2 className="title pending">Pending Tasks</h2>
            <TodoList
              todos={pending}
              // editingId={this.state.editingId}
              // editingText={this.state.editingText}
              // onEditChange={this.handleEditChange}
              // onStartEdit={this.startEdit}
              onFinishEdit={handleFinishEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
        </div>

        <div className="todo-section">
            <h2 className="title completed">Completed Tasks</h2>
            <TodoList
              todos={completed}
              // editingId={this.editingId}
              // editingText={this.editingText}
              // onEditChange={this.handleEditChange}
              // onStartEdit={this.startEdit}
              onFinishEdit={handleFinishEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
      </div>
    );
}


export default App;
