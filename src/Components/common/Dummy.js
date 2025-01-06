import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/custom.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  vechicleTypeId: Yup.string().required("*Vechicle Type is required"),
});

function Service() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const distanceValue = params.get("distance");
  const locationValueString = params.get("location");
  const bookingIdValue = params.get("bookingId");

  let locationValue = [];
  try {
    locationValue = JSON.parse(decodeURIComponent(locationValueString));
  } catch (error) {
    console.error("Failed to parse location value:", error);
  }

  const [vechicle, setVechicle] = useState([]);
  const [showQuantity, setShowQuantity] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const shiftType = localStorage.getItem("shiftType");
  const [manpowerQuantity, setManpowerQuantity] = useState(0);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    now.setHours(now.getHours());
    return now.toTimeString().split(":").slice(0, 2).join(":");
  };

  const formik = useFormik({
    initialValues: {
      date: getCurrentDate(),
      time: getCurrentTime(),
      vechicleTypeId: "",
      driverAsManpower: false,
      extraManpower: false,
      quantity: 0,
      trollyRequired: false,
      roundTripRequired: false,
      messageToDriver: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedDateTime = new Date(`${values.date}T${values.time}`);
      console.log("Selected Date & Time:", selectedDateTime);

      const eligibleTime = new Date();
      eligibleTime.setHours(eligibleTime.getHours() + 3);
      console.log("Current Date & Time plus 3 hours:", eligibleTime);

      if (selectedDateTime >= eligibleTime) {
        const selectedValue = formik.values.vechicleTypeId;
        let selectedOptionName = "";

        vechicle.forEach((vechicles) => {
          if (parseInt(selectedValue) === vechicles.vehicletypeId) {
            selectedOptionName = vechicles.type;
          }
        });

        values.vechicleTypeId = selectedOptionName;

        console.log("vechicleTypeId", values.vechicleTypeId);

        const deliveryDate = new Date(`${values.date}T${values.time}`);
        deliveryDate.setDate(deliveryDate.getDate() + 2);

        const payload = {
          userId: userId,
          type: shiftType,
          locationDetail: locationValue,
          bookingId: bookingIdValue,
          estKm: parseInt(distanceValue),
          scheduledDate: `${values.date}T${values.time}`,
          deliveryDate: deliveryDate,
          quantity: values.extraManpower ? values.quantity : 0,
          msgToDriver: values.messageToDriver,
          manpower: values.driverAsManpower ? "Y" : "N",
          extraManpower: values.extraManpower ? "Y" : "N",
          trollyRequired: values.trollyRequired ? "Y" : "N",
          roundTrip: values.roundTripRequired ? "Y" : "N",
          vehicleType: selectedOptionName,
          promoCode: "",
        };

        try {
          const response = await bookingApi.post(`booking/update`, payload);
          console.log(response);
          if (response.status === 200) {
            toast.success(response.data.message);
            navigate(`/summary/${bookingIdValue}`);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.warning("You must select a time at least 3 hours from now");
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("quantity", manpowerQuantity);
  }, [manpowerQuantity]);

  const increaseManpowerQuantity = () => {
    setManpowerQuantity((prevQuantity) =>
      prevQuantity < 99 ? prevQuantity + 1 : prevQuantity
    );
  };

  const decreaseManpowerQuantity = () => {
    setManpowerQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  useEffect(() => {
    const getVechicle = async () => {
      try {
        const response = await userApi.get("vehicle/vehicleType");
        setVechicle(response.data.responseBody);
      } catch (e) {
        toast.error("Error Fetching Data : ", e);
      }
    };
    getVechicle();
  }, []);

  const imageMapping = {
    1: VAN1,
    2: VAN2,
    3: Lorry10,
    4: Lorry14,
    5: Lorry24,
  };

  const weightMaping = {
    1: 200,
    2: 400,
    3: 600,
    4: 800,
    5: 1000,
  };

  return (
    <div
      className="container-fluid"
      id="ServicePage"
      style={{ backgroundColor: "#faf5f6" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <h2 className="text-center my-5 mt-5 pt-5" id="AvaHeading">
            SERVICE fsdf
          </h2>

          <div className="form-group d-flex justify-content-center">
            <div className="mr-3 mx-3">
              <input
                type="date"
                id="date"
                name="date"
                className={`form-control form-control-lg ${
                  formik.touched.date && formik.errors.date ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("date")}
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
                className={`form-control form-control-lg ${
                  formik.touched.time && formik.errors.time ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("time")}
              />
              {formik.touched.time && formik.errors.time && (
                <div className="invalid-feedback text-center">
                  {formik.errors.time}
                </div>
              )}
            </div>
          </div>

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
                    padding: "10px",
                    backgroundColor:
                      formik.values.vechicleTypeId == item.vehicletypeId
                        ? "rgba(0, 128, 0, 0.5)" // Light green background when selected
                        : "white", // Default background
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Box shadow for slight elevation
                    transform:
                      formik.values.vechicleTypeId == item.vehicletypeId
                        ? "scale(1.02)" // Slightly larger when selected
                        : "scale(1)", // Default scale
                    transition: "all 0.2s ease", // Smooth transition for scale and background color
                  }}
                >
                  <div
                    className="img-fluid text-center vehicle-image"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <img
                      src={imageMapping[item.vehicletypeId]}
                      alt={`Vehicle-${item.vehicletypeId}`}
                      className="img-fluid mb-3"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="text-center vehicle-weight">
                    <FaWeightHanging
                      style={{
                        marginBottom: "5px",
                        marginRight: "5px",
                        color: "#3e4444",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#3e4444",
                      }}
                    >
                      {weightMaping[item.vehicletypeId]}kg
                    </span>
                  </div>
                  <div
                    className="text-center vehicle-type"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#3e4444",
                    }}
                  >
                    {item.type}
                  </div>
                  {formik.values.vechicleTypeId == item.vehicletypeId && (
                    <FaCheckCircle
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "green",
                        fontSize: "20px",
                      }}
                    />
                  )}
                </label>
              ))}
          </Carousel>

          {formik.touched.vechicleTypeId && formik.errors.vechicleTypeId && (
            <div className="invalid-feedback text-center mb-4">
              {formik.errors.vechicleTypeId}
            </div>
          )}

          <div className="form-group d-flex align-items-center mt-5 mx-3">
            <label
              htmlFor="driverAsManpower"
              className="mr-3"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#3e4444" }}
            >
              Driver as Manpower:
            </label>
            <input
              type="checkbox"
              id="driverAsManpower"
              name="driverAsManpower"
              className="form-control form-control-lg"
              style={{ width: "30px", height: "30px" }}
              {...formik.getFieldProps("driverAsManpower")}
            />
          </div>

          <div className="form-group d-flex align-items-center mx-3">
            <label
              htmlFor="extraManpower"
              className="mr-3"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#3e4444" }}
            >
              Extra Manpower:
            </label>
            <input
              type="checkbox"
              id="extraManpower"
              name="extraManpower"
              className="form-control form-control-lg"
              style={{ width: "30px", height: "30px" }}
              {...formik.getFieldProps("extraManpower")}
            />
          </div>

          {formik.values.extraManpower && (
            <div className="form-group d-flex align-items-center my-3 mx-3">
              <label
                htmlFor="quantity"
                className="mr-3"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#3e4444",
                }}
              >
                Quantity:
              </label>
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={decreaseManpowerQuantity}
                >
                  <FaMinus />
                </button>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#3e4444",
                  }}
                >
                  {manpowerQuantity}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-primary ml-2"
                  onClick={increaseManpowerQuantity}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}

          <div className="form-group d-flex align-items-center mx-3">
            <label
              htmlFor="trollyRequired"
              className="mr-3"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#3e4444" }}
            >
              Trolly Required:
            </label>
            <input
              type="checkbox"
              id="trollyRequired"
              name="trollyRequired"
              className="form-control form-control-lg"
              style={{ width: "30px", height: "30px" }}
              {...formik.getFieldProps("trollyRequired")}
            />
          </div>

          <div className="form-group d-flex align-items-center mx-3">
            <label
              htmlFor="roundTripRequired"
              className="mr-3"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#3e4444" }}
            >
              Round Trip Required:
            </label>
            <input
              type="checkbox"
              id="roundTripRequired"
              name="roundTripRequired"
              className="form-control form-control-lg"
              style={{ width: "30px", height: "30px" }}
              {...formik.getFieldProps("roundTripRequired")}
            />
          </div>

          <div className="form-group mx-3">
            <label
              htmlFor="messageToDriver"
              className="mr-3"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#3e4444" }}
            >
              Message to Driver:
            </label>
            <textarea
              id="messageToDriver"
              name="messageToDriver"
              className={`form-control form-control-lg ${
                formik.touched.messageToDriver &&
                formik.errors.messageToDriver
                  ? "is-invalid"
                  : ""
              }`}
              style={{ fontSize: "16px", color: "#3e4444" }}
              {...formik.getFieldProps("messageToDriver")}
            />
            {formik.touched.messageToDriver &&
              formik.errors.messageToDriver && (
                <div className="invalid-feedback text-center">
                  {formik.errors.messageToDriver}
                </div>
              )}
          </div>

          <div className="form-group d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Service;
