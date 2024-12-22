import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FaChevronRight } from "react-icons/fa";
import MapNew from "../ItemShiftNew/MapNew";
import DateandTime from "../ItemShiftNew/dateandtime";
import ServiceNew from "../ItemShiftNew/ServiceNew";
import BookingSummary from "../ItemShiftNew/BookingSummary";
import SuccessfullNew from "../ItemShiftNew/SuccessFulNew";
import { bookingApi } from "../../config/URL";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const steps = [
  "Pickup / Dropoff",
  "Vechicle Selection",
  "Service",
  "Booking Summary",
];

const ItemShift = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const form = {
    bookingId: null,
    form1: {
      type: "ITEM",
      estKm: "",
      locationDetail: [
        {
          type: "pickup",
          location: "",
          address: "",
          contactName: "",
          countryCode: 65,
          mobile: "",
        },
        {
          type: "dropoff",
          location: "",
          address: "",
          contactName: "",
          countryCode: 65,
          mobile: "",
        },
      ],
    },
    form2: {
      date: "",
      time: "",
      vehicle: {},
    },
    form3: {
      driverAsManpower: false,
      extraManpower: false,
      quantity: 0,
      trollyRequired: false,
      roundTripRequired: false,
      messageToDriver: "",
    },
    form4: {
      paymentType: "",
      isAgreed: false,
    },
  };
  const [activeStep, setActiveStep] = useState(0);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState(form);
  const childRef = React.useRef();
  const bookingId = id;
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    const fetchData = async (id) => {
      setLoader(true);
      try {
        const response = await bookingApi.get(`booking/getBookingById/${id}`);
        if (response.status === 200) {
          const data = response.data.responseBody;

          const transformBookingLocations = (locations) => {
            const result = [];

            const firstLocation = locations[0];
            result.push({
              address: firstLocation.pickupAddress || "",
              contactName: firstLocation.pickupContactName || "",
              countryCode: firstLocation.pickupCountryCode || "",
              location: firstLocation.pickup || "",
              mobile: firstLocation.pickupMobile
                ? firstLocation.pickupMobile.toString()
                : "",
              type: "pickup",
            });

            const lastLocation = locations[locations.length - 1];
            result.push({
              address: lastLocation.dropoffAddress || "",
              contactName: lastLocation.dropoffContactName || "",
              countryCode: lastLocation.dropoffCountryCode || "",
              location: lastLocation.dropoff || "",
              mobile: lastLocation.dropoffMobile
                ? lastLocation.dropoffMobile.toString()
                : "",
              type: "dropoff",
            });

            for (let i = 0; i < locations.length - 1; i++) {
              const location = locations[i];
              result.push({
                address: location.dropoffAddress || "",
                contactName: location.dropoffContactName || "",
                countryCode: location.dropoffCountryCode || "",
                location: location.dropoff || "",
                mobile: location.dropoffMobile
                  ? location.dropoffMobile.toString()
                  : "",
                type: "Stop",
              });
            }

            return result;
          };

          const locationDetail = transformBookingLocations(
            data.bookingTripLocations
          );
          // console.log("object", data);
          setFormData((prev) => ({
            ...prev,
            bookingId: data?.booking?.bookingId,
            form1: {
              type: "ITEM",
              estKm: data?.booking?.estKm || "",
              locationDetail: locationDetail,
            },
            form2: {
              date: data?.booking?.scheduledDate
                ? data.booking.scheduledDate.split("T")[0]
                : "",
              time: data?.booking?.scheduledDate
                ? data.booking.scheduledDate.substring(11, 19)
                : "",
              vehicle: data.booking?.vehicletypeId
                ? {
                    vehicletypeId: data.booking?.vehicletypeId || "",
                    type: data.booking?.vehicleName || "",
                    vehicleImage: data.booking?.vehicleImage || "",
                  }
                : null,
            },
            form3: {
              driverAsManpower: data.booking?.helper === "Y",
              extraManpower: data.booking?.extraHelper === "Y",
              quantity: data.booking?.quantity || 0,
              trollyRequired: data.booking?.trollyRequired === "Y",
              roundTripRequired: data.booking?.roundTrip === "Y",
              messageToDriver: data.booking?.msgToDriver || "",
            },
            form4: {
              paymentType: data.transactionDetails?.paymentMode || "",
              isAgreed: false,
            },
          }));
          // console.log("form", formData);
        } else {
          toast.error(`Error: ${response.data.message}`);
        }
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
      } finally {
        setLoader(false);
      }
    };

    if (bookingId) {
      fetchData(bookingId);
    }
  }, []);

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.map();
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
          childRef.current.summary();
        }
        break;
      case "4":
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
        <p style={{ fontSize: "20px" }}>
          Booking Type <FaChevronRight size={"15"} />
        </p>
        <p style={{ fontSize: "20px", color: "#acff3b" }}>
          Item Shifting
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
        {loader ? (
          <p>loding...</p>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <MapNew
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
            {/* {activeStep === 3 && (
            <ExtraService
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )} */}
            {activeStep === 3 && (
              <BookingSummary
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {/* {activeStep === 4 && (
            <SuccessfullNew
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )} */}
            {/* {activeStep === 1 && (
              <Form3
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )} */}

            <div className="container-fluid p-5 py-3">
              <div className="row">
                <div className="col-md-6 col-12 d-flex align-items-center justify-content-between pt-4">
                  {activeStep !== 0 ? (
                    <button
                      className="btn btn-secondary btn-sm border-0 fw-bold"
                      style={{
                        padding: "7px 25px",
                        color: "black",
                        background: "#f4f4f4",
                      }}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  ) : (
                    <span></span>
                  )}
                  {activeStep !== 3 && (
                    <button
                      type="submit"
                      onClick={handleButtonClick}
                      style={{
                        padding: "7px 25px",
                        background: "#acff3b",
                      }}
                      className="btn btn-sm fw-bold"
                      disabled={loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      {activeStep !== steps.length - 1 ? "Next" : "Proceed"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default ItemShift;
