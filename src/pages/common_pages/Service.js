import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/custom.css";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaWeightHanging, FaCheckCircle } from "react-icons/fa";
import { Modal } from "react-bootstrap";
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
});

function Service() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [vechicle, setVechicle] = useState([]);

  // console.log("Vechicle List", vechicle);
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      vechicleTypeId: "",
      driverAsManpower: "N",
      extraManpower: "N",
      quantity: 0,
      trollyRequired: "N",
      roundTripRequired: "N",
      messageToDriver: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("Form values:", payload);
      try {
        const response = await bookingApi.post(`booking/create`, values);
        if (response.status === 200) {
          // toast.success("Successfully Booking Create")
          toast.success(response.data.message);
          navigate("/service");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  console.log("Formik Values", formik.values);

  const handleShowModal = (item, index) => {
    setCurrentItem(item);
    setSelectedItemId(index);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentItem();
  };
  function handleCardClick(index) {
    setSelectedItemId(index);
  }
  const [showQuantity, setShowQuantity] = useState(false);
  const handleCheckboxClick = () => {
    setShowQuantity(!showQuantity);
  };
  const navigate = useNavigate();
  const [manpowerQuantity, setManpowerQuantity] = useState(0);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const increaseManpowerQuantity = () => {
    setManpowerQuantity(manpowerQuantity + 1);
  };

  const decreaseManpowerQuantity = () => {
    if (manpowerQuantity > 0) {
      setManpowerQuantity(manpowerQuantity - 1);
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();

    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

    const diffInMs = selectedDateTime - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 3) {
      toast.warning("Please Select time at least 3 hours in advance.");
    } else {
      navigate("/summary");
    }
  };

  useEffect(() => {
    const getVechicle = async () => {
      try {
        const response = await userApi.get("vehicle/vehicleType");
        // console.log(response.data.responseBody);
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
            SERVICE
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
                  onClick={() => handleCardClick(index)}
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
                        selectedItemId === index
                          ? "2px solid #1C6DD0"
                          : "1px solid #B2C8BA",
                    }}
                  >
                    {selectedItemId === index && (
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
                      src={imageMapping[item.vehicletypeId]}
                      className="card-img-top"
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
                            {weightMaping[item.vehicletypeId]}
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
                        {/* <div className="d-flex justify-content-center pt-2">
                          <span>
                            <a
                              href="#knowmore"
                              onClick={(e) => {
                                e.preventDefault();
                                handleShowModal(item);
                              }}
                              class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            >
                              Know More
                            </a>
                          </span>
                        </div> */}

                        <center>
                          <div className="form-check">
                            <input
                              className={`form-check-input border-info ${
                                formik.touched.time && formik.errors.time
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("time")}
                              type="radio"
                              name="vechicleTypeId"
                              value={item.vechicleTypeId}
                              id={`flexRadioDefault${index}`}
                              readOnly
                            />
                            {formik.touched.time && formik.errors.time && (
                              <div className="invalid-feedback text-center">
                                {formik.errors.time}
                              </div>
                            )}
                          </div>
                        </center>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            {currentItem && (
              <Modal
                show={modalShow}
                onHide={handleCloseModal}
                backdropClassName="custom-backdrop"
              >
                <Modal.Header closeButton>
                  {/* <Modal.Title>{currentItem.name}</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                  <img
                    className="card-img-top mx-auto d-block"
                    src={currentItem.image}
                    alt={currentItem.name}
                    style={{ width: "70%" }}
                  />
                  <div className="d-flex justify-content-center pt-3">
                    <span
                      className="p-1"
                      style={{ background: "#D2E0FB", borderRadius: "5px" }}
                    >
                      <FaWeightHanging /> {currentItem.weight}
                    </span>
                  </div>
                  <div className="d-flex justify-content-center pt-2">
                    <span style={{ fontSize: "20px" }}>
                      <b>{currentItem.name}</b>
                    </span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <span>
                      Starting from{" "}
                      <b style={{ fontSize: "18px" }}>{currentItem.price}</b>
                    </span>
                  </div>
                  <hr />
                  <p>
                    Base fair price : <b>{currentItem.text1}</b>
                  </p>
                  <p>
                    {currentItem.text3}: <b>{currentItem.size}</b>
                  </p>
                  <p>
                    <b>Description:</b> {currentItem.description}
                  </p>
                </Modal.Body>
                {/* <Modal.Footer>
                <Button className="btn btn-primary btn-sm" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer> */}
              </Modal>
            )}
          </Carousel>
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
                    className={`form-check-input border-info ${
                      formik.touched.driverAsManpower &&
                      formik.errors.driverAsManpower
                        ? "is-invalid"
                        : ""
                    }`}
                    value="Y"
                    checked={
                      formik.values.driverAsManpower &&
                      formik.values.driverAsManpower.includes("NIL")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="flexCheckChecked"
                  />
                  {formik.touched.driverAsManpower &&
                    formik.errors.driverAsManpower && (
                      <div className="invalid-feedback text-center">
                        {formik.errors.driverAsManpower}
                      </div>
                    )}
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
                    onClick={handleCheckboxClick}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mb-3">
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
                      className="quantity-btn btn "
                      style={{
                        borderRadius: "50%",
                      }}
                      onClick={decreaseManpowerQuantity}
                      // disabled={manpowerQuantity === 0}
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
                      className="quantity-btn btn "
                      onClick={increaseManpowerQuantity}
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
                    value=""
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
                  <b>Round Trip Required</b>
                </span>
                <div class="form-check">
                  <input
                    class="form-check-input border-info"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
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
                className="form-control"
                id="exampleTextarea"
                rows="3"
                placeholder="write your message here............"
              ></textarea>
            </div>
          </div>
          <div className="text-center py-5">
            <button
              className="btn btn-primary px-5 py-2"
              type="submit"
              // onClick={handleNextClick}
              id="NextMove"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Service;
