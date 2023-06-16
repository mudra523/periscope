import React, { Children } from "react";
import Button from "../Button/Button";
import styles from "./AuthBox.module.css";

const AuthBox = ({
  title,
  placeHolder = "",
  buttonLabel,
  buttonFunction,
  inputChange,
  children,
}) => {
  return (
    <div className="card shadow-3d rouded-corner bg_secondary">
      <p className={`${styles.title} text_primary`}>{title}</p>
      {placeHolder === "" ? (
        children
      ) : (
        <input
          type="text"
          onChange={(e) => inputChange(e.target.value)}
          placeholder={placeHolder}
          className={`bg_primary_mid rouded-corner shadow-3d-inverse ${styles.input}`}
        ></input>
      )}
      <div className={styles.buttonWrapper}>
        <Button
          text={buttonLabel}
          onClick={buttonFunction}
          buttonColor="bg_primary"
          textColor="text_white"
        />
      </div>
    </div>
  );
};

export default AuthBox;
