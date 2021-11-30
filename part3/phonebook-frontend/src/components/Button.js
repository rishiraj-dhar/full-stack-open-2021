import React from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick} type="submit">{text}</button>
    </div>
  );
};

export default Button;