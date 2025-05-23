import { useRef, useEffect } from 'react';
import './styles/InputBar.css'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { setInput, addTodo } from "../todos/todosSlice";

function InputBar() {
  // const { input, onChange, onAdd } = this.props;
  const inputRef = useRef(null);
  const changeCount = useRef(0);

  const dispatch = useDispatch(); 
  const input = useSelector(state => state.todos.input);
  
  //auto foucs the input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //
  const handleChange = (e) => {
    changeCount.current += 1;
    // console.log("Input changed:", changeCount.current, "times");
    dispatch(setInput(e.target.value));
  };

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo({ 
        title: input, 
        completed: false}));
      dispatch(setInput(''));
    };
  };

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
