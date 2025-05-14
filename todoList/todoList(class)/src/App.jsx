import React, { Component } from 'react'
import './App.css'
import {APIs} from "./api"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      todos: [],
      editingId: null,
      editingText: "",
    };
  }
  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    APIs.getTodos().then((data) => {
      this.setState({ todos: data });
    });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleAdd = () => {
    const { input } = this.state;
    if (input.trim()) {
      const newTodo = { title: input, completed: false };
      APIs.createTodo(newTodo).then(() => {
        this.setState({ input: "" });
        this.loadTodos();
      });
    }
  };

  handleDelete = (id) => {
    APIs.deleteTodo(id).then(() => this.loadTodos());
  };

  toggleComplete = (id, currentStatus) => {
    APIs.updateTodo(id, { completed: !currentStatus }).then(() =>
      this.loadTodos()
    );
  };

  startEdit = (id, currentText) => {
    this.setState({ editingId: id, editingText: currentText });
  };

  finishEdit = (id) => {
    APIs.updateTodo(id, { title: this.state.editingText }).then(() => {
      this.setState({ editingId: null, editingText: "" });
      this.loadTodos();
    });
  };

  handleEditChange = (e) => {
    this.setState({ editingText: e.target.value });
  };

  renderTodoItem = (todo) => {
    const { editingId, editingText } = this.state;
    const isEditing = editingId === todo.id;
  
    return (
      <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : "pending"}`}>
        {todo.completed ? (
          <>
            <div className="button-left">
              <button className="btn-complete" onClick={() => this.toggleComplete(todo.id, todo.completed)}>
                <i className="fas fa-undo"></i>
              </button>
            </div>
  
            {isEditing ? (
              <input
                type="text"
                value={editingText}
                onChange={this.handleEditChange}
              />
            ) : (
              <span>{todo.title}</span>
            )}
  
            <div className="button-right">
              <button
                className="btn-edit"
                onClick={() =>
                  isEditing
                    ? this.finishEdit(todo.id)
                    : this.startEdit(todo.id, todo.title)
                }
              >
                <i className={isEditing ? "fas fa-save" : "fas fa-pen"}></i>
              </button>
              <button className="btn-delete" onClick={() => this.handleDelete(todo.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </>
        ) : (
          <>
            {isEditing ? (
              <input
                type="text"
                value={editingText}
                onChange={this.handleEditChange}
              />
            ) : (
              <span>{todo.title}</span>
            )}
            <div className="button-right">
              <button
                className="btn-edit"
                onClick={() =>
                  isEditing
                    ? this.finishEdit(todo.id)
                    : this.startEdit(todo.id, todo.title)
                }
              >
                <i className={isEditing ? "fas fa-save" : "fas fa-pen"}></i>
              </button>
              <button className="btn-delete" onClick={() => this.handleDelete(todo.id)}>
                <i className="fas fa-trash"></i>
              </button>
              <button className="btn-complete" onClick={() => this.toggleComplete(todo.id, todo.completed)}>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  
  render() {
    const { input, todos } = this.state;
    const pending = todos.filter((todo) => !todo.completed);
    const completed = todos.filter((todo) => todo.completed);

    return (
      <div className="app-container">
        <div className="header">
          <h1>📝 Todo List</h1>
        </div>
        
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter a task"
          />
          <button onClick={this.handleAdd}>Submit</button>
        </div>

        <div className="lists">
          <div className="todo-section">
            <h2 className="title pending">Pending Tasks</h2>
            {pending.map(this.renderTodoItem)}
          </div>

          <div className="todo-section">
            <h2 className="title completed">Completed Tasks</h2>
            {completed.map(this.renderTodoItem)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
