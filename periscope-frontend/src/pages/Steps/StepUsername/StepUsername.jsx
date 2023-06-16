import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../../store/activateSlice";
import AuthBox from "../../../components/shared/AuthBox/AuthBox";
import AuthLayout from "../../../layout/AuthLayout/Index";

const StepUsername = ({ onNext }) => {
  const { userName } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [userNameInput, setUserNameInput] = useState(userName);

  function nextStep() {
    if (!userNameInput) {
      return;
    }
    dispatch(setUserName(userNameInput));
    onNext();
  }

  return (
    <AuthLayout
      imageSource="/images/UserNamePage.png"
      overlayText={userNameInput}
    >
      <AuthBox
        title="Let’s get a username that's all yours"
        placeHolder="JamesBond007"
        buttonLabel="Continue"
        inputChange={setUserNameInput}
        buttonFunction={nextStep}
      />
    </AuthLayout>
  );
};

export default StepUsername;
