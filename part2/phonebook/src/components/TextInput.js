import React from "react";

const TextInput = ({ labelText, value, handleInput }) => {
    return (
      <div>
          {labelText} <input onChange={handleInput} value={value} />
      </div>
    );
};

export default TextInput;