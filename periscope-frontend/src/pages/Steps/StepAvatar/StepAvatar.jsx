import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StepAvatar.module.css";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";
import { useEffect } from "react";
import AuthBox from "../../../components/shared/AuthBox/AuthBox";
import AuthLayout from "../../../layout/AuthLayout/Index";

// This is one of the completed page of auth-flow.
// We are doing many complex task here like uploading image, setting it to global state (c) and then seding all of this information to the server which we

const StepAvatar = ({ onNext }) => {
  const { name, avatar, userName } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/YellowShirtLadyDP.png");
  const [loading, setLoading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const dispatch = useDispatch();

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    // readAsDataURL is a function that will convert image into data URL so we can use this to display uploaded image.
    // We are not passing this image file to the image tag because we can't file as source of image tag so we pass and data URL.
    reader.readAsDataURL(file);
    // as soon as we finish reading we will set this image to global state as well as in local variable that is used for displaying the image.
    reader.onloadend = function () {
      dispatch(setAvatar(reader.result));
      setImage(reader.result);
    };
  }

  async function submit() {
    if (!avatar || !name || !userName) return;

    setLoading(true);
    try {
      const { data } = await activate({ name, avatar, userName });
      if (data.auth && !unmounted) {
        dispatch(setAuth(data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      setUnmounted(false);
    };
  }, []);

  return (
    <AuthLayout imageSource="/images/AvatarPage.png">
      {loading ? (
        <Loader message="Activating..." />
      ) : (
        <AuthBox
          title="Let's show your beautiful self!"
          buttonLabel="Continue"
          buttonFunction={submit}
        >
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrap}>
              <img className={styles.avatar} src={image} alt="avatar" />
              <label htmlFor="avatarInput">
                <div className={styles.imgUploadButton}>
                  <img
                    className={styles.uploadIcon}
                    src="/images/UploadtoCloud.png"
                    alt="uploadIcon"
                  />
                </div>
              </label>
            </div>
            <input
              onChange={captureImage}
              type="file"
              id="avatarInput"
              className={styles.avatarInput}
            />
          </div>
        </AuthBox>
      )}
    </AuthLayout>
  );
};

export default StepAvatar;
