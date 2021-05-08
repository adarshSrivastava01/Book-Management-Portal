import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <fieldset className="fs">
      <label htmlFor={props.htmlFor} id={props.id}>
        {props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => {
          props.setFunction(e.target.value);
        }}
      ></input>
    </fieldset>
  );
};

export default Input;
