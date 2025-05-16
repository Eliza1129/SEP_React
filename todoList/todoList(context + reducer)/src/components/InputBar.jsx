import React, {useRef, useEffect, useContext} from 'react';
import './styles/InputBar.css';
import { APIs } from '../api';
import { TodoContext } from '../context/TodoContext'

function InputBar() {
  // const { input, onChange, onAdd } = this.props;
  const inputRef = useRef(null);
  const changeCount = useRef(0);

  const { state, dispatch } = useContext(TodoContext);
  const { input } = state; 

  //auto foucs the input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //
  const handleChange = (e) => {
    changeCount.current += 1;
    console.log("Input changed:", changeCount.current, "times");
    
    dispatch({
      type: 'SET_INPUT',
      payload: e.target.value,
    });
  };

  const handleAdd = () => {
    if (input.trim()) {
      const newTodo = {
        title: input,
        completed: false,
      };

      APIs.createTodo(newTodo).then((createdTodo) => {
        console.log("createdTodo from server:", createdTodo);
        dispatch({ type: 'ADD_TODO', payload: createdTodo });
        dispatch({ type: 'SET_INPUT', payload: '' });
      });
    };
  }

    return (
      <div className="input-area">
        <input 
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter a task"
        />
        <button onClick={handleAdd}>Submit</button>
      </div>
    );
}

export default InputBar;
