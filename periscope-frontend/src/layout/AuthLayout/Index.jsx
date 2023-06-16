import React from "react";
import styles from "./AuthLayout.module.css";

const Index = ({ children, imageSource, overlayText }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img className={styles.logo} src="/images/FullLogo.png" />
        {children}
      </div>
      <div className={styles.illustration}>
        <div className={styles.gradientOverlay} />
        <div className={styles.imageWrap}>
          {overlayText && (
            <div className={styles.textOverlay}>{overlayText}</div>
          )}
          <img className={styles.image} src={imageSource} />
        </div>
      </div>
    </div>
  );
};

export default Index;
