/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/custom.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaWeightHanging, FaCheckCircle } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { bookingApi, userApi } from "../../config/URL";
import VAN1 from "../../asset/1.7M_VAN.png";
import VAN2 from "../../asset/2.4M_VAN.png";
import Lorry10 from "../../asset/10FT_LORRY.png";
import Lorry14 from "../../asset/14FT_LORRY.png";
import Lorry24 from "../../asset/24FT_LORRY.png";
import Unknown from "../../asset/Unknown Vehicle.png";

import { IoArrowBackCircleOutline } from "react-icons/io5";

function Service() {
  // const {location , bookingId} = useParams();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const distanceValue = params.get("distance");
  console.log("est km", distanceValue);
  const locationValueString = params.get("location");
  const estKm = params.get("estKm");

  console.log("locationValueString:", locationValueString);
  console.log("EST KM:", estKm);

  const bookingId = params.get("bookingId");
  console.log("bookingId", bookingId);
  const [loadIndicator, setLoadIndicator] = useState(false);

  let locationValue = [];
  try {
    locationValue = JSON.parse(decodeURIComponent(locationValueString));
  } catch (error) {
    console.error("Failed to parse location value rrrrr:", error);
  }

  const [vechicle, setVechicle] = useState([]);
  console.log("Vechicle Response", vechicle);

  const [showQuantity, setShowQuantity] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const shiftType = sessionStorage.getItem("shiftType");
  const [manpowerQuantity, setManpowerQuantity] = useState(0);
  const [noOfPiecess, setNoOfPiecess] = useState(0);
  const currentDate = new Date();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState("");
  console.log("bookingIddata", data);

  // eligible date based on time

  // const getEligibleDateBasedOnTime = () => {
  //   const now = new Date();
  //   now.setHours(now.getHours() + 3);
  //   now.setMinutes(now.getMinutes() + 7);

  //   if (now.getHours() < 3 || (now.getHours() === 3 && now.getMinutes() < 7)) {
  //     now.setDate(now.getDate() + 1);
  //   }
  //   return now.toISOString().split("T")[0];
  // };

  // const getEligibleTime = () => {
  //   const now = new Date();
  //   now.setHours(now.getHours() + 3);
  //   now.setMinutes(now.getMinutes() + 7);
  //   return now.toTimeString().split(":").slice(0, 2).join(":");
  // };

  // const currentData = new Date().toISOString().split("T")[0];
  const formattedDate = currentDate.toISOString().slice(0, 10);
  // const currentTime = new Date().toISOString().split("T")[1].slice(0, 5);
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const startOfToday = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const now = () => new Date();
  const isPastDateTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    return selectedDateTime < now();
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .min(startOfToday(), "Date cannot be in the past")
      .required("Date is required"),
    time: Yup.string()
      .required("Time is required")
      .test("not-in-past", "Time cannot be in the past", function (value) {
        const { date } = this.parent; // Access other field values
        return date && value ? !isPastDateTime(date, value) : true;
      }),
    vechicleTypeId: Yup.string().required("*Vechicle Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      date: formattedDate,
      time: "",
      vechicleTypeId: "",
      driverAsManpower: false,
      extraManpower: false,
      quantity: 0,
      noOfPieces: 0,
      trollyRequired: false,
      roundTripRequired: false,
      messageToDriver: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedDateTime = new Date(`${values.date}T${values.time}`);
      const eligibleTime = new Date();
      eligibleTime.setHours(eligibleTime.getHours());

      if (selectedDateTime >= eligibleTime) {
        const selectedOption = vechicle.find(
          (item) => item.vehicletypeId === values.vechicleTypeId
        );

        const totalKilometer = parseInt(distanceValue);
        const km_charge = 0.75 * totalKilometer;
        const total = selectedOption.baseFare + km_charge;

        let driverAmount = 0;
        let extraHelper = 0;

        if (values.driverAsManpower) {
          driverAmount = selectedOption.driverHelper;
        }

        if (values.extraManpower) {
          extraHelper = selectedOption.helper * values.quantity;
        }

        const totalCharges = total + driverAmount + extraHelper;
        console.log(totalCharges);

        const deliveryDate = new Date(`${values.date}T${values.time}`);
        deliveryDate.setDate(deliveryDate.getDate() + 2);

        const payload = {
          userId: userId,
          type: shiftType,
          locationDetail: locationValue,
          bookingId: bookingId,
          estKm: parseFloat(distanceValue) || estKm,
          scheduledDate: `${values.date}T${values.time}:00.000Z`,
          deliveryDate: deliveryDate,
          quantity: values.extraManpower ? values.quantity : 0,
          msgToDriver: values.messageToDriver,
          noOfPieces: values.noOfPieces,
          helper: values.driverAsManpower ? "Y" : "N",
          extraHelper: values.extraManpower ? "Y" : "N",
          trollyRequired: values.trollyRequired ? "Y" : "N",
          roundTrip: values.roundTripRequired ? "Y" : "N",
          vehicleType: selectedOption.type,
          promoCode: "",
          actualKm: parseFloat(distanceValue) || estKm,
        };
        setLoadIndicator(true);
        try {
          const response = await bookingApi.post(`booking/update`, payload);
          console.log("Response:", response);
          if (response.status === 200) {
            toast.success("Vehicle selected successfully!");
            navigate(`/summary/${bookingId}`);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicator(false);
        }
      } else {
        toast.warning("You must select a time at least 3 hours from now");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingApi.get(
          `booking/getBookingById/${bookingId}`
        );
        if (response.status === 200) {
          setData(response.data.responseBody);
          if (data) {
            const booking = data?.booking;
            if (booking) {
              const [scheduledDate, scheduledTime] = booking?.scheduledDate
                ? booking.scheduledDate.split("T")
                : [null, null];
              formik.setFieldValue("date", scheduledDate || formattedDate);
              formik.setFieldValue(
                "time",
                scheduledTime ? scheduledTime.slice(0, 5) : ""
              );
              formik.setFieldValue(
                "vechicleTypeId",
                booking.vehicletypeId || ""
              );
              formik.setFieldValue(
                "driverAsManpower",
                booking.helper === "Y" ? true : false
              );
              formik.setFieldValue(
                "extraManpower",
                booking.extraHelper === "Y" ? true : false
              );
              formik.setFieldValue("quantity", booking.quantity || 0);
              formik.setFieldValue("noOfPieces", booking.noOfPieces || 0);
            }
          }
        }
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    formik.setFieldValue("quantity", manpowerQuantity);
    formik.setFieldValue("noOfPieces", noOfPiecess);
  }, [manpowerQuantity, noOfPiecess]);

  const increaseManpowerQuantity = () => {
    setManpowerQuantity((prevQuantity) =>
      prevQuantity < 99 ? prevQuantity + 1 : prevQuantity
    );
  };

  // const increasePiecesQuantity = () => {
  //   setNoOfPiecess((prevQuantity) =>
  //     prevQuantity < 99 ? prevQuantity + 1 : prevQuantity
  //   );
  // };

  const decreaseManpowerQuantity = () => {
    setManpowerQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  // const decreasePiecesQuantity = () => {
  //   setNoOfPiecess((prevQuantity) =>
  //     prevQuantity > 0 ? prevQuantity - 1 : prevQuantity
  //   );
  // };

  useEffect(() => {
    const getVechicle = async () => {
      try {
        const response = await userApi.get("vehicle/vehicleType");
        if (response.status === 200) {
          setVechicle(response.data.responseBody);
        }
      } catch (e) {
        toast.error("Error Fetching Data : ", e);
      }
    };
    getVechicle();
  }, []);

  // Update the date and time
  useEffect(() => {
    const currentDateTime = new Date();
    // currentDateTime.setHours(currentDateTime.getHours() + 3);
    // currentDateTime.setMinutes(currentDateTime.getMinutes() + 5);

    const formattedDate = currentDateTime.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    const formattedTime = currentDateTime.toTimeString().slice(0, 5); // Format time as HH:MM

    setDate(formattedDate);
    setTime(formattedTime);

    formik.setFieldValue("date", formattedDate);
    // formik.setFieldValue("time", formattedTime);
  }, []);

  // const imageMapping = {
  //   1: VAN1,
  //   2: VAN2,
  //   3: Lorry10,
  //   4: Lorry14,
  //   24: vechicle.vehicleImage
  // };

  // const weightMaping = {
  //   1: 200,
  //   2: 400,
  //   3: 600,
  //   4: 800,
  //   7: 1000,
  // };

  return (
    <div
      className="container-fluid"
      id="ServicePage"
      style={{ backgroundColor: "#faf5f6" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="container-fluid pt-3 ">
          <div
            onClick={() => navigate(-1)}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Back"
            className="me-3"
            style={{ cursor: "pointer", color: "rgb(16, 110, 234)" }}
          >
            <IoArrowBackCircleOutline size={30} />
          </div>
        </div>
        <div className="container">
          <h2 className="text-center my-3" id="AvaHeading">
            SERVICE
          </h2>

          <div className="form-group d-flex justify-content-center flex-wrap">
            <div className="mr-3 mx-3">
              <input
                type="date"
                id="date"
                name="date"
                // min={currentData}
                className={`form-control form-control-lg ${
                  formik.touched.date && formik.errors.date ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("date")}
                onChange={(e) => formik.setFieldValue("date", e.target.value)}
              />
              {formik.touched.date && formik.errors.date && (
                <div className="invalid-feedback text-center">
                  {formik.errors.date}
                </div>
              )}
            </div>
            <div>
              <input
                type="time"
                id="time"
                name="time"
                // min={currentTime}
                className={`form-control form-control-lg ${
                  formik.touched.time && formik.errors.time ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("time")}
                onChange={(e) => formik.setFieldValue("time", e.target.value)}
              />
              {formik.touched.time && formik.errors.time && (
                <div className="invalid-feedback text-center">
                  {formik.errors.time}
                </div>
              )}
            </div>
          </div>

          {/* <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            autoPlay={false}
            centerMode={false}
            className="carousel-container"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 1, // Number of slides to slide when using arrows
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {vechicle &&
              vechicle.map((item, index) => (
                <label
                  className="container my-5"
                  key={index}
                  id={`Vehicle-${item.vechicleTypeId}`}
                  onClick={() =>
                    formik.setFieldValue("vechicleTypeId", item.vehicletypeId)
                  }
                  style={{
                    cursor: "pointer",
                    display: "block",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="card d-flex flex-column"
                    style={{
                      borderRadius: "6px",
                      position: "relative",
                      border:
                        formik.values.vechicleTypeId === item.vehicletypeId
                          ? "2px solid #1C6DD0"
                          : "1px solid #B2C8BA",
                    }}
                  >
                    {formik.values.vechicleTypeId === item.vehicletypeId && (
                      <FaCheckCircle
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-8px",
                          color: "#00A9FF",
                          fontSize: "24px",
                          zIndex: 5,
                        }}
                      />
                    )}
                    <img
                      src={item.vehicleImage || Unknown }
                      className="img-fluid card-img-top w-100 min-vh-50"
                      alt="Card"
                    />
                    <div className="card-body h-100">
                      <div className="card-text">
                        <div className="d-flex justify-content-center">
                          <span
                            className="p-1"
                            style={{
                              background: "#D2E0FB",
                              borderRadius: "5px",
                            }}
                          >
                            <FaWeightHanging />{" "}
                            {`${item.baseFare} kg`}
                          </span>
                        </div>
                        <div className="d-flex justify-content-center pt-3">
                          <span style={{ fontSize: "20px" }}>
                            <b>{item.type}</b>
                          </span>
                        </div>
                        <div className="d-flex justify-content-center">
                          <span>
                            Base Fare{" "}
                            <b style={{ fontSize: "18px" }}>
                              $ {item.baseFare}
                            </b>
                          </span>
                        </div>
                        <center>
                          <div className="form-check">
                            <input
                              className={`form-check-input border-info ${formik.touched.vechicleTypeId &&
                                formik.errors.vechicleTypeId
                                ? "is-invalid"
                                : ""
                                }`}
                              type="radio"
                              name="vechicleTypeId"
                              value={item.vechicleTypeId}
                              id={`flexRadioDefault${index}`}
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
          </Carousel> */}
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            autoPlay={false}
            centerMode={false}
            className="carousel-container"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 1, // Number of slides to slide when using arrows
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {vechicle &&
              vechicle.map((item, index) => (
                <label
                  className="container my-5"
                  key={index}
                  id={`Vehicle-${item.vechicleTypeId}`}
                  onClick={() =>
                    formik.setFieldValue("vechicleTypeId", item.vehicletypeId)
                  }
                  style={{
                    cursor: "pointer",
                    display: "block",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="card d-flex flex-column"
                    style={{
                      borderRadius: "6px",
                      position: "relative",
                      width: "250px", // Fixed width for the card
                      height: "350px", // Fixed height for the card
                      border:
                        formik.values.vechicleTypeId === item.vehicletypeId
                          ? "2px solid #1C6DD0"
                          : "1px solid #B2C8BA",
                    }}
                  >
                    {formik.values.vechicleTypeId === item.vehicletypeId && (
                      <FaCheckCircle
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-8px",
                          color: "#00A9FF",
                          fontSize: "24px",
                          zIndex: 5,
                        }}
                      />
                    )}
                    <img
                      src={item.vehicleImage || Unknown}
                      className="card-img-top w-100"
                      alt="Card"
                      style={{
                        height: "150px", // Set fixed height for the image
                        objectFit: "cover", // Ensure the image covers the set area without distortion
                      }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-center">
                        <span
                          className="p-1"
                          style={{
                            background: "#D2E0FB",
                            borderRadius: "5px",
                          }}
                        >
                          <FaWeightHanging /> {`${item.baseFare} kg`}
                        </span>
                      </div>
                      <div className="d-flex justify-content-center pt-3">
                        <span style={{ fontSize: "20px" }}>
                          <b>{item.type}</b>
                        </span>
                      </div>
                      <div className="d-flex justify-content-center">
                        <span>
                          Base Fare{" "}
                          <b style={{ fontSize: "18px" }}>$ {item.baseFare}</b>
                        </span>
                      </div>
                      <center>
                        <div className="form-check">
                          <input
                            className={`form-check-input border-info ${
                              formik.touched.vechicleTypeId &&
                              formik.errors.vechicleTypeId
                                ? "is-invalid"
                                : ""
                            }`}
                            type="radio"
                            name="vechicleTypeId"
                            value={item.vechicletypeId}
                            id={`flexRadioDefault${index}`}
                          />
                        </div>
                      </center>
                    </div>
                  </div>
                </label>
              ))}
          </Carousel>

          {formik.touched.vechicleTypeId && formik.errors.vechicleTypeId && (
            <div className="text-danger text-center mb-3">
              {formik.errors.vechicleTypeId}
            </div>
          )}
          <div className="row py-3">
            <div className="col-md-6 col-12 mb-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <span>
                  <b>Driver as Manpower</b>
                </span>
                <div class="form-check">
                  <input
                    type="checkbox"
                    name="driverAsManpower"
                    className="form-check-input border-info"
                    value={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="flexCheckChecked"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <span>
                  <b>Extra Manpower</b>
                </span>
                <div className="form-check">
                  <input
                    className="form-check-input border-info"
                    type="checkbox"
                    id="flexCheckChecked"
                    value={true}
                    onClick={() => {
                      setShowQuantity(!showQuantity);
                      setManpowerQuantity(1);
                    }}
                    name="extraManpower"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-12 mb-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <span>
                  <b>No of pieces</b>
                </span>

                <div className="noOfPieces-input">
                  <button
                    className="quantity-btn btn border-white"
                    type="button"
                    style={{
                      borderRadius: "50%",
                    }}
                    onClick={decreasePiecesQuantity}
                    disabled={noOfPiecess === 0}
                  >
                    <FaMinus style={{ fontSize: "8px" }} />
                  </button>
                  <input
                    type="number"
                    className="quantity-value"
                    value={noOfPiecess}
                    min={1}
                    max={99}
                    readOnly
                    style={{
                      width: "50px",
                      padding: "5px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                  <button
                    className="quantity-btn btn border-white"
                    onClick={increasePiecesQuantity}
                    type="button"
                    disabled={noOfPiecess === 99}
                    style={{
                      borderRadius: "50%",
                    }}
                  >
                    <FaPlus style={{ fontSize: "8px" }} />
                  </button>
                </div>
              </div>
            </div> */}

            <div className=" col-md-12 col-12 mb-3">
              {showQuantity && (
                <div
                  className="d-flex justify-content-between p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <b>Quantity</b>
                  </span>
                  {/* Quantity increment/decrement input field */}
                  <div className="quantity-input">
                    <button
                      className="quantity-btn btn border-white shadow-none"
                      type="button"
                      style={{
                        borderRadius: "50%",
                      }}
                      onClick={decreaseManpowerQuantity}
                      disabled={manpowerQuantity === 1}
                    >
                      <FaMinus style={{ fontSize: "8px" }} />
                    </button>
                    <input
                      type="number"
                      className="quantity-value"
                      value={manpowerQuantity}
                      min={1}
                      max={99}
                      readOnly
                      style={{
                        width: "50px",
                        padding: "5px",
                        textAlign: "center",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    />
                    <button
                      className="quantity-btn btn border-white shadow-none"
                      onClick={increaseManpowerQuantity}
                      type="button"
                      disabled={manpowerQuantity === 99}
                      style={{
                        borderRadius: "50%",
                      }}
                    >
                      <FaPlus style={{ fontSize: "8px" }} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <span>
                  <b>Trolly Required</b>
                </span>
                <div class="form-check">
                  <input
                    class="form-check-input border-info"
                    type="checkbox"
                    value={true}
                    id="flexCheckChecked"
                    name="trollyRequired"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <span>
                  <b>Round Trip Required</b>
                </span>
                <div class="form-check">
                  <input
                    class="form-check-input border-info"
                    type="checkbox"
                    value={true}
                    id="flexCheckChecked"
                    name="roundTripRequired"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label htmlFor="exampleTextarea" className="form-label">
                <b>Message to Driver</b>
              </label>
              <textarea
                id="exampleTextarea"
                rows="3"
                placeholder="write your message here............"
                className="form-control form-control-lg "
                {...formik.getFieldProps("messageToDriver")}
              ></textarea>
            </div>
          </div>
          <div className="text-center py-5">
            <button
              className="btn btn-primary px-5 py-2"
              type="submit"
              id="NextMove"
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Service;
