import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FaChevronRight } from "react-icons/fa";
import DateandTime from "../ItemShiftNew/dateandtime";
import HouseMap from "./HouseMap";
import ServiceNew from "../ItemShiftNew/ServiceNew";
import ExtraService from "../ItemShiftNew/ExtraService";
import BookingSummary from "../ItemShiftNew/BookingSummary";
import { useLocation } from "react-router-dom";
import { bookingApi } from "../../config/URL";
import { toast } from "react-toastify";

const steps = [
  "Pickup / Dropoff",
  "Vechicle Selection",
  "Service",
  "Extra Service",
  "Booking Summary",
];

const HouseShiftSteps = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const form = {
    bookingId: null,
    form1: {
      estKm: "",
      locationDetail: [
        {
          type: "pickup",
          location: "",
          address: "",
          typeOfProperty: "",
          noOfBedrooms: "",
          PropertyFloor: "",
          elevator: "",
          PropertyDetails: "",
          contactName: "",
          countryCode: 65,
          mobile: "",
        },
        {
          type: "dropoff",
          location: "",
          address: "",
          typeOfProperty: "",
          noOfBedrooms: "",
          PropertyFloor: "",
          elevator: "",
          PropertyDetails: "",
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
    extraService: { 1: 0, 2: "N", 3: 0, 4: 0 },
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
          console.log("Data is ", data);
          const transformBookingLocations = (locations) => {
            const result = [];

            const firstLocation = locations[0];
            result.push({
              address: firstLocation.pickupAddress || "",
              typeOfProperty: firstLocation.typeOfProperty,
              noOfBedrooms: firstLocation.noOfBedrooms,
              PropertyFloor: firstLocation.PropertyFloor,
              PropertyDetails: firstLocation.PropertyDetails,
              elevator: firstLocation.elevator,
              contactName: firstLocation.pickupContactName || "",
              countryCode: firstLocation.pickupCountryCode || "",
              location: firstLocation.pickup || "",
              latitude: firstLocation.pickupLatitude || "",
              longitude: firstLocation.pickupLongitude || "",
              mobile: firstLocation.pickupMobile
                ? firstLocation.pickupMobile.toString()
                : "",
              type: "pickup",
            });

            const lastLocation = locations[locations.length - 1];
            result.push({
              address: lastLocation.dropoffAddress || "",
              typeOfProperty: lastLocation.typeOfProperty,
              noOfBedrooms: lastLocation.noOfBedrooms,
              PropertyFloor: lastLocation.PropertyFloor,
              PropertyDetails: lastLocation.PropertyDetails,
              elevator: lastLocation.elevator,
              contactName: lastLocation.dropoffContactName || "",
              countryCode: lastLocation.dropoffCountryCode || "",
              location: lastLocation.dropoff || "",
              latitude: lastLocation.dropoffLatitude || "",
              longitude: lastLocation.dropoffLongitude || "",
              mobile: lastLocation.dropoffMobile
                ? lastLocation.dropoffMobile.toString()
                : "",
              type: "dropoff",
            });

            for (let i = 0; i < locations.length - 1; i++) {
              const location = locations[i];
              result.push({
                address: location.dropoffAddress || "",
                typeOfProperty: location.typeOfProperty,
                noOfBedrooms: location.noOfBedrooms,
                PropertyFloor: location.PropertyFloor,
                PropertyDetails: location.PropertyDetails,
                elevator: location.elevator,
                contactName: location.dropoffContactName || "",
                countryCode: location.dropoffCountryCode || "",
                location: location.dropoff || "",
                latitude: location.dropoffLatitude || "",
                longitude: location.dropoffLongitude || "",
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
            extraService: {
              1: data?.booking?.boxesCharge,
              2: data.booking?.extraHelper === "Y" ? "Y" : "N",
              3: data?.booking?.assemblyDisassemblyCharge,
              4: data?.booking?.bubbleWrappingCharge,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <p style={{ fontSize: "20px" }}>
          Booking Type <FaChevronRight size={"15"} />
        </p>
        <p style={{ fontSize: "20px", color: "#acff3b" }}>
          &nbsp;&nbsp;House Moving
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
            {/* {activeStep === 5 && (
            <SuccessfullNew
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
                  {activeStep !== 4 && (
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

export default HouseShiftSteps;
