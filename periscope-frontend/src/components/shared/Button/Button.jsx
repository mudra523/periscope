import React from "react";
import styles from "./Button.module.css";

// Button component where you have to pass method and button label as an argument.

const Button = ({ text, onClick, buttonColor, textColor }) => {
  return (
    <button onClick={onClick} className={`${buttonColor} ${styles.button} shadow-3d rouded-corner`}>
      <span className={textColor}>{text}</span>
    </button>
  );
};

export default Button;
