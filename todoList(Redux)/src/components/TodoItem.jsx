import { useRef, useCallback, useEffect, useState } from 'react';
import './styles/TodoItem.css';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../todos/todosSlice';


function TodoItem({ todo }) {

  const dispatch = useDispatch();
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
    dispatch(toggleTodo({
      id: todo.id,
      completed: todo.completed
    }));
  }, [todo.id, todo.completed, dispatch]);


  //delete
  const handleDelete = useCallback(() => {
    dispatch(deleteTodo(todo.id));
  }, [todo.id, dispatch]);
  
  //click edit or save
  const handleEditToggle = useCallback(() => {
  if (isEditing) {
    const trimmed = editingText.trim();
    if (trimmed) {
      dispatch(updateTodo({
        id: todo.id,
        title: trimmed
      }));
        setIsEditing(false);
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
    <div className={`todo-item ${todo.completed ? "completed" : "pending"}`}>
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
