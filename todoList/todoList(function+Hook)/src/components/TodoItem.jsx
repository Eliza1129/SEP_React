import React, { useRef, useCallback, useEffect, useState} from 'react';
import './TodoItem.css';

function TodoItem({ 
  todo, 
  // isEditing, 
  // editingText, 
  // onEditChange, 
  // onStartEdit, 
  onFinishEdit, 
  onDelete, 
  onToggleComplete }) {

  const [isEditing, setIsEditing] = useState(false); 
  const [editingText, setEditingText] = useState(todo.title); 
  //input DOM
  const inputRef= useRef(null);
  
  useEffect(() => {
    if(isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  //switch to complete state
  const handleToggleComplete = useCallback(() => {
    onToggleComplete(todo.id, todo.completed);
  }, [todo.id, todo.completed, onToggleComplete]);

  //delete
  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);
  
  //click edit or save
  const handleEditToggle = useCallback(() => {
    if (isEditing) {
      onFinishEdit(todo.id, editingText.trim());
      setIsEditing(false);
    } else {
      setEditingText(todo.title);
      setIsEditing(true);
    }
  }, [isEditing, todo.id, todo.title, onFinishEdit, editingText]); 

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
            <button className="btn-delete" onClick={() => onDelete(todo.id)}>
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
