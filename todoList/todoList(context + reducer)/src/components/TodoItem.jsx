import React, { useRef, useCallback, useEffect, useState, useContext} from 'react';
import './styles/TodoItem.css';
import { TodoContext } from '../context/TodoContext';
import { APIs } from '../api';


function TodoItem({ todo }) {

  const { dispatch} = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false); 
  const [editingText, setEditingText] = useState(todo.title);
  
  //input DOM
  const inputRef= useRef(null);
  
  useEffect(() => {
    if(isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditingText(todo.title);
  }, [todo.title]);


  //switch to complete state
  const handleToggleComplete = useCallback(() => {
    // onToggleComplete(todo.id, todo.completed);
    const updated = { completed: !todo.completed };

    APIs.updateTodo(todo.id, updated).then(() => {
      dispatch({ 
      type: 'TOGGLE_TODO', 
      payload: { id:todo.id, completed: !todo.completed } 
      });
    });
  }, [todo.id, todo.completed, dispatch]);


  //delete
  const handleDelete = useCallback(() => {
    // onDelete(todo.id);
    APIs.deleteTodo(todo.id).then(() => {
      dispatch({ 
        type: 'DELETE_TODO', 
        payload: todo.id
    });
  });
}, [todo.id, dispatch]);
  
  //click edit or save
  const handleEditToggle = useCallback(() => {
  if (isEditing) {
    const trimmed = editingText.trim();
    if (trimmed) {
      APIs.updateTodo(todo.id, { title: trimmed }).then(() => {
        APIs.getTodos().then((data) => {
          dispatch({ type: 'SET_TODOS', payload: Array.isArray(data) ? data : [] });
        });
        setIsEditing(false);
      });
    }
  } else {
    setEditingText(todo.title);
    setIsEditing(true);
  }
}, [isEditing, editingText, todo.id, todo.title, dispatch]);


  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };


  return (
    <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : "pending"}`}>
      {todo.completed ? (
        <>
          <div className="button-left">
            <button className="btn-complete" onClick={handleToggleComplete}>
              <i className="fas fa-undo"></i>
            </button>
          </div>

          {isEditing ? (
            <input
            ref={inputRef} 
            type="text" 
            value={editingText} 
            onChange={handleEditChange} />
          ) : (
            <span>{todo.title}</span>
          )}

          <div className="button-right">
            <button className="btn-edit" onClick={handleEditToggle}>
              <i className={isEditing ? "fas fa-save" : "fas fa-pen"}></i>
            </button>
            <button className="btn-delete" onClick={handleDelete}>
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
            onChange={handleEditChange} />
          ) : (
            <span>{todo.title}</span>
          )}
          <div className="button-right">
            <button className="btn-edit" onClick={handleEditToggle}>
              <i className={isEditing ? "fas fa-save" : "fas fa-pen"}></i>
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="btn-complete" onClick={handleToggleComplete}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
