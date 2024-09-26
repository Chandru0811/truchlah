import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";
import { Step, StepLabel, Stepper } from "@mui/material";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";
import DriverInfoAdd from "./DriverInfoAdd";
import VehicleInfoAdd from "./VehicleInfoAdd";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Vehicle Information" },
];

function DriverManagementAdd() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const childRef = React.useRef();
  const [formData, setFormData] = useState({});

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.driverPersonalAdd();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.driverVehicleAdd();
        }
        break;

      default:
        break;
    }
  };
  return (
    <div className="container-fluid px-2 pb-2 minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">
                  Add Driver Management
                </h1>
              </div>
            </div>
            {/* <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/drivermanagement">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div> */}
          </div>
        </div>
      </div>
      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-2">
        <Stepper className="my-3" activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-${index}`}>{step.tooltip}</Tooltip>
                }
              >
                <StepLabel></StepLabel>
              </OverlayTrigger>
            </Step>
          ))}
        </Stepper>

        <React.Fragment>
          {activeStep === 0 && (
            <DriverInfoAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 1 && (
            <VehicleInfoAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
            {activeStep > 1 && (
              <button
                className="btn btn-border btn-sm"
                style={{ padding: "7px" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>
            )}

            <div style={{ flex: "1 1 auto" }}></div>
            <button
              type="submit"
              onClick={handleButtonClick}
              style={{ padding: "7px" }}
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              {activeStep === steps.length - 1 ? "Submit" : " Save And Next"}
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default DriverManagementAdd;
