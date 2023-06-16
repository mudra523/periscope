import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import styles from "./Landing.module.css";
import AuthLayout from "../../layout/AuthLayout/Index";

const Landing = () => {
  const navigate = useNavigate();

  function startRegister() {
    navigate("/authenticate");
  }

  return (
    <AuthLayout imageSource="/images/LandingPage.png">
      <div className={styles.contentWrapper}>
        <div>
          <h1>
            An audio only social <br /> media platform
          </h1>
          <p>
            With Periscope, It’s like the internet in a Box <br />
            the perfect place to connect with people and <br />
            tell your story in full 360 degrees.
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            text={"Let's get started!"}
            onClick={startRegister}
            buttonColor="bg_powder_orange"
            textColor="text_white"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Landing;
