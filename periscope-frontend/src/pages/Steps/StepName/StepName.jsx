import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import AuthBox from "../../../components/shared/AuthBox/AuthBox";
import AuthLayout from "../../../layout/AuthLayout/Index";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  function nextStep() {
    if (!fullname) {
      return;
    }
    dispatch(setName(fullname));
    onNext();
  }

  return (
    <AuthLayout
      imageSource="/images/NamePage.png"
      overlayText={`Hi! ${fullname}`}
    >
      <AuthBox
        title="What should we call you?"
        placeHolder="James Bond"
        buttonLabel="Continue"
        inputChange={setFullname}
        buttonFunction={nextStep}
      />
    </AuthLayout>
  );
};

export default StepName;
