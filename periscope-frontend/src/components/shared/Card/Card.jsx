import React from "react";
import styles from "./Card.module.css";

const Card = ({ children }) => {
  return (
    <div className={`${styles.card} shadow-3d bg_secondary`}>
      {children}
    </div>
  );
};

export default Card;
