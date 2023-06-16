import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../http/index";
import { setAvatar, setName } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";

// Normal Navigation component

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
      dispatch(setAvatar(""));
      dispatch(setName(""));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // Here container class is defined in app.css
    <nav className={`${styles.navbar} container`}>
      <Link className={styles.brandStyle} to="/">
        <img
          className={styles.logoSizing}
          src="/images/wavingHand.png"
          alt="log"
        />
        <span className={styles.logoText}>Codershouse</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : "/images/monkeyAvatar.png"}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
