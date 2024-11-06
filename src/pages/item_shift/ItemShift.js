import React, { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import Map from "./Map";
import Service from "../common_pages/Service";
import Summary from "../common_pages/CheckDetails";

const steps = ["Map", "Service","Details"];

const ItemShift = () => {
const [activeStep, setActiveStep] = useState(0);
const [loadIndicator, setLoadIndicator] = useState(false);
const [formData, setFormData] = useState({});
const childRef = React.useRef();

const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.map();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.service();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.checkDetails();
        }
        break;
      default:
        break;
    }
  };
  
  return (
    <section className="summary">
        <Stepper className="mt-5" activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div
          className="container-fluid card shadow-lg border-0 mb-4 d-flex justify-content-center align-items-center"
        //   style={{ minHeight: "70vh", }}
        >
          <React.Fragment>
            {activeStep === 0 && (
              <Map
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {activeStep === 1 && (
              <Service
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {activeStep === 2 && (
              <Summary
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {/* {activeStep === 1 && (
              <Form3
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )} */}
            <div className="container-fluid p-1 d-flex align-items-center justify-content-center gap-2">
              {activeStep !== 0 && activeStep !== 1 && (
                <button
                  className="btn btn-secondary mb-3" style={{width:"100%"}}
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {activeStep !== steps.length - 1 && (
                <>
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className="btn btn-primary mb-3 px-5"
                    id="NextMove"
                    disabled={loadIndicator}
                  >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </button>
                </>
              )}
            </div>
          </React.Fragment>
        </div>
      </section>
  )
}

export default ItemShift
