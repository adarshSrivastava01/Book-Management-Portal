import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`submit__button ` + props.color}
      onClick={props.click}
    >
      {props.text}
    </button>
  );
};

export default Button;
