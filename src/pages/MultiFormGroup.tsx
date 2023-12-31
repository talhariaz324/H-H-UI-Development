/* eslint-disable prettier/prettier */
import React, { useState } from "react";

import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
  SidebarGroup,
  Step9,
} from "../components/MultiFormComponents/GroupFormSteps";
import { ThankYou } from "../components/MultiFormComponents/ThankYou";

function MultiFormGroup() {
  const [step, setStep] = useState(1);

  const nextStep = (onGoingStep?: number) => {
    setStep((step) => {
      if (onGoingStep != null) return onGoingStep;
      return step + 1;
    });
  };

  return (
    <main className="h-screen flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:max-w-[58.75rem] lg:mt-20 lg:flex-row grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[33.75rem] lg:shadow">
      <SidebarGroup currentStep={step} handleNextStep={nextStep} />
      <div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
        <div className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
          {step === 1 && <Step1 currentStep={step} handleNextStep={nextStep} />}
          {step === 2 && <Step2 currentStep={step} handleNextStep={nextStep} />}
          {step === 3 && <Step3 currentStep={step} handleNextStep={nextStep} />}
          {step === 4 && <Step4 currentStep={step} handleNextStep={nextStep} />}
          {step === 5 && <Step5 currentStep={step} handleNextStep={nextStep} />}
          {step === 6 && <Step6 currentStep={step} handleNextStep={nextStep} />}
          {step === 7 && <Step7 currentStep={step} handleNextStep={nextStep} />}
          {step === 8 && <Step8 currentStep={step} handleNextStep={nextStep} />}
          {step === 9 && <Step9 currentStep={step} handleNextStep={nextStep} />}
          {step === 10 && <ThankYou />}
        </div>
      </div>
    </main>
  );
}

export default MultiFormGroup;
