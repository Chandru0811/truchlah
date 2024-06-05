import React, { useEffect, useState } from "react";
// import Ace from "../../asset/Rectangle 42.png";
import "../../styles/custom.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bookingApi, userApi } from "../../config/URL";
import VAN1 from "../../asset/1.7M_VAN.png";
import VAN2 from "../../asset/2.4M_VAN.png";
import Lorry10 from "../../asset/10FT_LORRY.png";
import Lorry14 from "../../asset/14FT_LORRY.png";
import Lorry24 from "../../asset/24FT_LORRY.png";
import Popup from "./Popup";
// import { MdCancel } from "react-icons/md";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";

function RideDetailsView() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const bookingId = useParams();
  // console.log("bookingId", bookingId);
  const [vechicle, setVechicle] = useState([]);
  // console.log("Api Data", data.booking);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("Type:", shiftType);
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [checkedValues, setCheckedValues] = useState([]);
  const [customReason, setCustomReason] = useState("");
  const navigate = useNavigate();
  console.log("object", data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingApi.get(
          `booking/getBookingById/${bookingId.id}`
        );
        setData(response.data.responseBody);
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      bookingId: "",
      cancelledBy: "",
      comments: "",
    },
    onSubmit: async (values) => {
      let commentsArray = checkedValues.filter((value) => value !== "Others");
      if (checkedValues.includes("Others") && customReason.trim() !== "") {
        commentsArray.push(`Others: ${customReason}`);
      }
      values.comments = commentsArray.join(", ");

      const payload = {
        bookingId: bookingId.id,
        cancelledBy: "User",
        comments: values.comments,
      };

      try {
        const response = await bookingApi.post(
          `booking/cancelByUser/${bookingId.id}`,
          payload
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/cancelorder");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Submitting Data: " + error.message);
      }
    },
  });

  const bookingTripLocations = data.bookingTripLocations || [];
  const firstLocation = bookingTripLocations[0] || {};

  const vehicleImages = {
    1: <img src={VAN1} alt="Ace" className="img-fluid mt-3" />,
    2: <img src={VAN2} alt="Ace" className="img-fluid mt-3" />,
    3: <img src={Lorry10} alt="SomeOther" className="img-fluid mt-3" />,
    4: <img src={Lorry14} alt="Ace" className="img-fluid mt-3" />,
    5: <img src={Lorry24} alt="Ace" className="img-fluid mt-3" />,
  };

  useEffect(() => {
    const getVechicle = async () => {
      try {
        const response = await userApi.get("vehicle/vehicleType");
        setVechicle(response.data.responseBody);
      } catch (e) {
        toast.error("Error Fetching Data : ", e);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    getVechicle();
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setCheckedValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  const vehicleNameMap = {
    1: "1.7M_VAN",
    2: "2.4M_VAN",
    3: "10FT_LORRY",
    4: "14FT_LORRY",
    5: "24FT_LORRY",
    default: "Unknown Vehicle",
  };

  return (
    <section className="summary">
      {isLoading ? (
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
        <div className="container-fluid pt-5" id="Ace">
          <center>
            <h3 style={{ color: "#106EEA" }}>SUMMARY</h3>
          </center>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <p className="mt-5 ps-2">
                <b>Vehicle :</b>
              </p>
            </div>
          </div>
          <center>
            {vehicleImages[data.booking?.vehicletypeId] || null}
            <p className="mt-3">
              {vehicleNameMap[data.booking?.vehicletypeId]}
            </p>
            {vechicle &&
              vechicle.map((vechicles) =>
                parseInt(data.centerId) === vechicles.vehicletypeId
                  ? vechicles.types || "--"
                  : ""
              )}
          </center>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <p className="mt-5 ps-2">
                <b>Address :</b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="card w-50">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <div>
                        <p style={{ color: "#00316B" }}>
                          <span style={{ color: "#00316B" }}>
                            <b>Pickup Address : </b>
                          </span>
                          <span style={{ color: "#494949" }}>
                            {firstLocation.pickup || "-"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Name : </b>
                          </span>
                          <span style={{ color: "#494949" }}>
                            {firstLocation.pickupContactName || "-"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Address : </b>
                          </span>
                          <span style={{ color: "#494949" }}>
                            {firstLocation.pickupAddress || "--"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Contact:</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>
                            {firstLocation.pickupMobile || "--"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      <p style={{ color: "#00316B" }}>
                        <span className="col-6" style={{ color: "#00316B" }}>
                          <b>Drop Address :</b>
                        </span>
                        <span className="col-6" style={{ color: "#494949" }}>
                          {firstLocation.dropoff || "-"}
                        </span>
                      </p>
                      <p>
                        <span style={{ color: "#00316B" }}>
                          <b>Name :</b>{" "}
                        </span>
                        <span style={{ color: "#494949" }}>
                          {firstLocation.dropoffContactName || "--"}
                        </span>
                      </p>
                      <p>
                        <span style={{ color: "#00316B" }}>
                          <b>Address :</b>{" "}
                        </span>
                        <span style={{ color: "#494949" }}>
                          {firstLocation.dropoffAddress || "--"}
                        </span>
                      </p>
                      <p>
                        <span style={{ color: "#00316B" }}>
                          <b>Contact: </b>
                        </span>
                        <span style={{ color: "#494949" }}>
                          {firstLocation.dropoffMobile || "--"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <>
                    {data?.bookingTripLocations &&
                      data?.bookingTripLocations.length > 1 &&
                      data.bookingTripLocations
                        .filter((_, index) => index !== 0) // Exclude the first index
                        .map((stop, index) => (
                          <div className="row" key={index}>
                            <div className="col-md-6 col-12 ps-1">
                              <div>
                                <p
                                  className="line"
                                  style={{ color: "#00316B" }}
                                >
                                  <b>Stop {index + 1}</b>
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 col-12 ps-1" id="drop">
                              <p className="line">
                                <span style={{ color: "#00316B" }}>
                                  <b>Name :</b>{" "}
                                </span>
                                <span style={{ color: "#494949" }}>
                                  {stop.dropoffContactName || "--"}
                                </span>
                              </p>
                              <p>
                                <span style={{ color: "#00316B" }}>
                                  <b>Address :</b>{" "}
                                </span>
                                <span style={{ color: "#494949" }}>
                                  {stop.dropoffAddress || "--"}
                                </span>
                              </p>
                              <p>
                                <span style={{ color: "#00316B" }}>
                                  <b>Contact: </b>
                                </span>
                                <span style={{ color: "#494949" }}>
                                  {stop.dropoffMobile || "--"}
                                </span>
                              </p>
                              <p>
                                <span style={{ color: "#00316B" }}>
                                  <b>Location: </b>
                                </span>
                                <span style={{ color: "#494949" }}>
                                  {stop.dropoff || "--"}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}

                    <div className="row">
                      <div className="col-md-6 col-12 ps-1">
                        <div>
                          <p className="line" style={{ color: "#00316B" }}>
                            <b>Category</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 ps-1" id="drop">
                        {" "}
                        <p className="line" style={{ color: "#494949" }}>
                          {data?.booking?.bookingType || "--"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12 ps-1">
                        <div>
                          <p className="line" style={{ color: "#00316B" }}>
                            <b>Date & Time</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 ps-1" id="drop">
                        {" "}
                        <p className="line" style={{ color: "#494949" }}>
                          {data?.booking?.scheduledDate
                            ? data.booking.scheduledDate.substring(0, 10)
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Status</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p
                        className="line"
                        style={{
                          color:
                            data.bookingStatus?.status === "CANCELLED"
                              ? "red" // Red color for CANCELLED
                              : data.bookingStatus?.status === "COMPLETED"
                              ? "green" // Green color for COMPLETED
                              : "orange", // Orange color for other statuses
                        }}
                      >
                        {data.bookingStatus?.status || "--"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Manpower</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.manPower === "Y" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Extra ManPower</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.extraManPower === "Y" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Trolly Required</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.trollyRequired === "Y" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Round Trip</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.roundTrip === "Y" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Quantity</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.quantity || 0}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>Total amount</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        <b>$</b>
                        {data.transactionDetails
                          ? `${data.transactionDetails.txnAmount.toFixed(2)}`
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 d-flex justify-content-center">
              {data.bookingStatus?.status === "COMPLETED" ||
                (data.bookingStatus?.status === "CANCELLED" &&
                  isPopupVisible && <Popup togglePopup={togglePopup} />)}
            </div>
          </div>

          {data.bookingStatus?.status !== "COMPLETED" &&
            data.bookingStatus?.status !== "CANCELLED" && (
              <div
                className="container-fluid py-4"
                style={{ background: "#faf5f6" }}
              >
                <div className="container">
                  <div
                    className="d-flex justify-content-between p-3 mt-5"
                    style={{ backgroundColor: "#D6E6FA" }}
                  >
                    <span className="d-flex align-item-center">
                      <p>
                        <b>Want to cancel your order?</b>
                      </p>
                    </span>
                    <span>
                      <button
                        className="btn btn-danger px-5"
                        onClick={handleShow}
                        style={{ borderRadius: "20px" }}
                      >
                        Cancel
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            )}

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Want to cancel your order?</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit}>
              <Modal.Body>
                <div className="container">
                  <div>
                    <div
                      className=""
                      style={{ backgroundColor: "#FFF", borderRadius: "5px" }}
                    >
                      <p className="">
                        Before canceling, let us know why you’re leaving. Your
                        response may be shared with the subscription provider.
                      </p>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="reason1"
                          value="Driver is not allocated"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          id="closeBefore"
                          htmlFor="reason1"
                        >
                          Driver is not allocated
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="reason2"
                          value="Driver says he will be late"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          id="closeBefore"
                          htmlFor="reason2"
                        >
                          Driver says he will be late
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="reason3"
                          value="Vehicle cannot meet my requirement"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          id="closeBefore"
                          htmlFor="reason3"
                        >
                          Vehicle cannot meet my requirement
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="reason4"
                          value="I need to change my address & location"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          id="closeBefore"
                          htmlFor="reason4"
                        >
                          I need to change my address & location
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="reason5"
                          value="Driver is too far away and I need a shorter arrival time"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          id="closeBefore"
                          htmlFor="reason5"
                        >
                          Driver is too far away and I need a shorter arrival
                          time
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="reason6"
                          value="Others"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          id="closeBefore"
                          htmlFor="reason6"
                        >
                          Others
                        </label>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="write your reason here..."
                        id="floatingTextarea"
                        value={formik.values.reviewComments}
                        onChange={handleCustomReasonChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <span>
                  <div className="my-2">
                    <button type="submit" className="btn btn-danger">
                      Confirm
                    </button>
                  </div>
                </span>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}
    </section>
  );
}

export default RideDetailsView;
