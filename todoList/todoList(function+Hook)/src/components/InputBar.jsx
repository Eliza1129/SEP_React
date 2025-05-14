// import React, { Component } from 'react';
import React, {useRef, useEffect} from 'react';
import './InputBar.css';

function InputBar({ input, onChange, onAdd }) {
  // const { input, onChange, onAdd } = this.props;
  const inputRef = useRef(null);
  const changeCount = useRef(0);

  //auto foucs the input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //
  const handleChange = (e) => {
    changeCount.current += 1;
    console.log("Input changed:", changeCount.current, "times");
    onChange(e);
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
        <button onClick={onAdd}>Submit</button>
      </div>
    );
}

export default React.memo(InputBar);
