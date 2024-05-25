import * as React from "react";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Form1 from "../Algorithm/Step/Form1";
import Form2 from "../Algorithm/Step/Form2";
import Form3 from "../Algorithm/Step/Form3";
import Form4 from "../Algorithm/Step/Form4";
import Form5 from "../Algorithm/Step/Form5";
import { TiArrowBack } from "react-icons/ti";

const steps = [
  { tooltip: "Booking Type" },
  { tooltip: "PickUp/DropOff" },
  { tooltip: "Vehicle Selection" },
  { tooltip: "Booking Review" },
  { tooltip: "Complete" },
];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);

  const childRef = React.useRef();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    console.log("setactivestep", activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleButtonClick = () => {
    // console.log("1",childRef);
    // Call the child function using the ref
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.Form1();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.Form2();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.Form3();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.Form4();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.Form5();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.TermsAndCondition();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div class="container-fluid pt-2">
      <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.tooltip}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div class="container-fluid py-3 mb-5  border-0 mb-7">
        <React.Fragment>
          {activeStep === 0 && <Form1 ref={childRef} handleNext={handleNext} />}
          {activeStep === 1 && <Form2 ref={childRef} handleNext={handleNext} />}
          {activeStep === 2 && <Form3 ref={childRef} handleNext={handleNext} />}
          {activeStep === 3 && <Form4 ref={childRef} handleNext={handleNext} />}
          {activeStep === 4 && <Form5 ref={childRef} handleNext={handleNext} />}

          <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
            <button
              className="btn btn-sm"
              style={{ padding: "7px" }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              <TiArrowBack />
              Back
            </button>

            <div style={{ flex: "1 1 auto" }}></div>

            {/* <button
              type="submit"
              onClick={handleNext}
              style={{ padding: "7px" }}
              className="btn btn-outline-primary btn-sm"
            >
              {activeStep === steps.length - 1 ? "Submit" : " Save And Next"}
            </button> */}
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
