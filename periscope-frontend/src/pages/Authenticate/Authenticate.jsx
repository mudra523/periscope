import React, { useState } from "react";
import StepPhone from "../Steps/StepPhone/Phone";
import StepOtp from "../Steps/StepOtp/StepOtp";
import AuthLayout from "../../layout/AuthLayout/Index";

const steps = {
  1: StepPhone,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <AuthLayout imageSource="/images/AuthenticationPage.png">
      <Step onNext={onNext} />
    </AuthLayout>
  );
};

export default Authenticate;
