import React, { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FaChevronRight } from "react-icons/fa";
import DateandTime from "../ItemShiftNew/dateandtime";
import HouseMap from "./HouseMap";
import ServiceNew from "../ItemShiftNew/ServiceNew";
import ExtraService from "../ItemShiftNew/ExtraService";
import BookingSummary from "../ItemShiftNew/BookingSummary";
import SuccessfullNew from "../ItemShiftNew/SuccessFulNew";

const steps = ["Pickup / Dropoff", "Vechicle Selection", "Service","Extra Service", "Booking Summary", "Complete"];

const HouseShiftSteps = () => {
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
          childRef.current.housemap();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.dateandtime();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.servicenew();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.extraservice();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.summary();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.complete();
        }
        break;
      default:
        break;
    }
  };
  
  return (
    <section className="container">
      <span className="d-flex fw-bold py-4">
        <p style={{ fontSize: "20px" }}>Booking Type <FaChevronRight size={"15"} /></p>
        <p style={{ fontSize: "20px", color: "#acff3b" }}>
          House Shifting
          {/* {shiftType} Sfifting */}
        </p>
      </span>

      <Stepper className="" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
            {/* <StepLabel
              sx={{
                "& .MuiStepIcon-root": {
                  color: index === activeStep ? "#ADFF3B" : "rgba(0, 0, 0, 0.38)",
                  "&:hover": {
                    color: "#ADFF3B",
                  },
                },

                "& .Mui-completed .MuiStepIcon-root": {
                  color: "#ADFF3B",
                },

                "& .MuiStepLabel-label": {
                  color: index === activeStep ? "black" : "#333",
                },
              }}
            >
              {step}
            </StepLabel> */}
          </Step>
        ))}
      </Stepper>
      <div
        className="text-centerborder-0 mb-4"
      //   style={{ minHeight: "70vh", }}
      >
        <React.Fragment>
          {activeStep === 0 && (
            <HouseMap
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 1 && (
            <DateandTime
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 2 && (
            <ServiceNew
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 3 && (
            <ExtraService
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
         {activeStep === 4 && (
            <BookingSummary
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
           {activeStep === 5 && (
            <SuccessfullNew
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          <div className="container-fluid p-5 d-flex align-items-center justify-content-center gap-2 py-3">
            {activeStep !== 0 &&  (
              <button
                className="btn btn-secondary btn-sm border-0"
                style={{ padding: "7px", color: "black", background:"#f4f4f4", width: "7%" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <div style={{ flex: "1 1 auto" }}></div>
            {activeStep !== 5 &&  (
            <button
              type="submit"
              onClick={handleButtonClick}
              style={{ padding: "7px", background: "#acff3b", minWidth: "7%" }}
              className="btn btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              {activeStep !== steps.length - 2 ? "Next" : "Proceed"}
            </button>)}
          </div>
        </React.Fragment>
      </div>
    </section>
  )
}

export default HouseShiftSteps
