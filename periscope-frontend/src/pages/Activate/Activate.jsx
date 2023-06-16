import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepUsername from "../Steps/StepUsername/StepUsername";

const steps = {
  1: StepUsername,
  2: StepName,
  3: StepAvatar,
};

// If user is not activated then they will be redirected to this page after authentication.
// Here we collect fullname, avatar then send this data with tokens that we recieved earlier, server verifies then stores the image and finally send the json with acivate set to true. So now we can finally access the rooms page.

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }
  return (
      <Step onNext={onNext}></Step>
  );
};

export default Activate;
