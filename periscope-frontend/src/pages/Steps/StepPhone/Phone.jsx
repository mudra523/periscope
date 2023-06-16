import React, { useState } from "react";
import { sendOtp } from "../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../store/authSlice";
import AuthBox from "../../../components/shared/AuthBox/AuthBox";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const re = new RegExp(`[0-9]{10}`);

  async function submit() {
    if (
      !phoneNumber ||
      !re.test(phoneNumber.replaceAll(" ", "").replaceAll("-", ""))
    ) {
      return;
    }
    let { data } = await sendOtp({ phone: phoneNumber });
    console.log(data.otp);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <AuthBox
      title={`Enter your phone number`}
      placeHolder="+91 xxxxx xxxxx"
      buttonLabel="Next"
      inputChange={setPhoneNumber}
      buttonFunction={submit}
    />
  );
};

export default Phone;
