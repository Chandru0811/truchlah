import React, { useEffect, useState,useRef } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { driverApi } from "../../config/URL";
import Tick from"../../asset/Tick.png"
import DriverInfoEdit from "./DriverInfoEdit";
import VehicleInfoEdit from "./VehicleInfoEdit";
// import api from "../../config/URL";
// import toast from "react-hot-toast";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Vehicle Information" },
];
function DriverManagementEdit() {
  const { DriverId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const childRef = useRef();
  const [formData, setFormData] = useState({ DriverId });
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();

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
          childRef.current.driverPersonalEdit();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.driverVehicleEdit();
        }
        break;

      default:
        break;
    }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoader(true);
  //     try {
  //       const response = await driverApi.get(`/driver/byId/${id}`);
  //       formik.setValues(response.data.responseBody);
  //       setData(response.data.responseBody);
  //     } catch (error) {
  //       toast.error("Error Fetch Data ", error);
  //     } finally {
  //       setLoader(false);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <>
      {loading ? (
        <div className="darksoul-layout">
          <div className="darksoul-grid">
            <div className="item1"></div>
            <div className="item2"></div>
            <div className="item3"></div>
            <div className="item4"></div>
          </div>
          <h3 className="darksoul-loader-h">Trucklah</h3>
        </div>
      ) : (
        <div className="container-fluid px-2  minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">
                  Edit Driver Management
                </h1>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div class="container-fluid  card shadow border-0 ">
      <Stepper className="mt-5 mb-2" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
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
      {/* <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5"> */}
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 1, mb: 1 }}>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "60vh" }}
              >
                <img
                  src={Tick}
                  width={100}
                  alt="success"
                  className="img-fluid"
                />
                <h3 className="text-muted">
                  All steps completed - you&apos;re finished
                </h3>
              </div>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Link to="/staff">
                <button className="btn bg-primary bg-gradient text-white px-2 py-1 my-2 border-primary rounded">
                  OK
                </button>
              </Link>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <DriverInfoEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            {activeStep === 1 && (
              <VehicleInfoEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            <div className="container-fluid p-1 d-flex align-items-center justify-content-center mb-2">
            {activeStep > 0 && (
              <button
                className="btn btn-secondary btn-sm"
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
        )}
      {/* </div> */}
      </div>
    </div>
      )}
    </>
  );
}

export default DriverManagementEdit;
