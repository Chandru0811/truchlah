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
import UnknownVehicle from "../../asset/Unknown Vehicle.png";
import Popup from "./Popup";
// import { MdCancel } from "react-icons/md";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { Badge, Card, Space } from "antd";
import * as Yup from "yup";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";

function RideDetailsView() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [locationDetail, setLocationDetail] = useState([]);
  const bookingId = useParams();
  // console.log("bookingId", bookingId);
  const [vechicle, setVechicle] = useState([]);
  // console.log("Api Data", data.booking);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("Type:", shiftType);
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [checkedValues, setCheckedValues] = useState([]);
  const navigate = useNavigate();
  console.log("Booking Data:", data);
  console.log("Location Details Data:", locationDetail);
  const shiftType = sessionStorage.getItem("shiftType");

  const fetchData = async () => {
    try {
      const response = await bookingApi.get(
        `booking/getBookingById/${bookingId.id}`
      );
      setData(response.data.responseBody);
      setLocationDetail(response?.data?.responseBody?.bookingTripLocations);
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    const estKm = data.booking.estKm;
    const locations = encodeURIComponent(JSON.stringify(locationDetail));
    console.log("scheduledDate:", data?.booking?.scheduledDate);

    if (!data?.booking?.scheduledDate) {
      navigate(
        `/service?bookingId=${bookingId.id}&location=${locations}&estKm=${estKm}&type=${shiftType}`
      );
    } else {
      navigate(`/summary/${bookingId.id}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    cancelReason: Yup.string().required("*Please select a reason"),
    comments: Yup.string().test(
      "is-required-if-others",
      "*Message is required",
      function (value) {
        const { cancelReason } = this.parent;
        if (cancelReason === "Others") {
          return !!value;
        }
        return true;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      cancelReason: "",
      bookingId: "",
      cancelledBy: "",
      comments: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let selectedReason =
        values.cancelReason === "Others"
          ? values.comments
          : values.cancelReason;

      const payload = {
        bookingId: bookingId.id,
        cancelledBy: "User",
        comments: selectedReason,
      };

      console.log("Payload Cancel:", payload);
      try {
        const response = await bookingApi.post(
          `booking/cancelByUser/${bookingId.id}`,
          payload
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/cancelorder");
          formik.resetForm();
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
    default: <img src={UnknownVehicle} alt="Ace" className="img-fluid mt-3" />,
  };

  useEffect(() => {
    const getVechicle = async () => {
      try {
        const response = await userApi.get("vehicle/vehicleType");
        setVechicle(response.data.responseBody);
      } catch (e) {
        toast.error("Error Fetching Data : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    getVechicle();
  }, []);

  const handleRadioChange = (e) => {
    formik.handleChange(e);
    formik.setFieldValue("cancelReason", e.target.value);
    formik.validateField("cancelReason");
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

  const vehicleNameMap = {
    1: "1.7M_VAN",
    2: "2.4M_VAN",
    3: "10FT_LORRY",
    4: "14FT_LORRY",
    5: "24FT_LORRY",
    default: "Unknown Vehicle",
  };

  // Function to format the booking status text and return related background color
  const formatBookingStatus = (status) => {
    switch (status) {
      case "DRAFT_BOOKING":
        return {
          text: "Draft Booking",
          backgroundColor: "#fcd162", // Warning color (example)
        };
      case "CANCELLED":
        return {
          text: "Cancelled",
          backgroundColor: "#f04545", // Danger color (example)
        };
      case "BOOKED":
        return {
          text: "Booked",
          backgroundColor: "#2593fb", // Info color (example)
        };
      case "COMPLETED":
        return {
          text: "Completed",
          backgroundColor: "#17e540", // Success color (example)
        };
        case "ASSIGNED":
        return {
          text: "Assigned",
          backgroundColor: "#28d8b7", // Success color (example)
        };
      default:
        return {
          text: "Unknown",
          backgroundColor: "#6d736e", // Default color (example)
        };
    }
  };

  // Get the formatted status and background color
  const { text: bookingStatus, backgroundColor } = formatBookingStatus(
    data?.bookingStatus?.status || "Unknown"
  );

  return (
    <section className="summary container-fluid">
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
        <div className="container-fluid pt-3" id="Ace">
          <div
            onClick={() => navigate(-1)}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Back"
            className="me-3 orderMargin"
            style={{ cursor: "pointer", color: "rgb(16, 110, 234)" }}
          >
            <IoArrowBackCircleOutline size={30} />
          </div>
          <center>
            <h3 style={{ color: "#106EEA" }}>SUMMARY</h3>
          </center>

          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <p className="mt-5 ps-2">
                <div className="d-flex justify-content-between">
                  <b>Vehicle :</b>
                </div>
              </p>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <center>
            <div className="vehicleImages-card">
              <Badge.Ribbon
                text={bookingStatus}
                style={{
                  backgroundColor: backgroundColor,
                  color: "#fff", // Text color for better contrast
                }}
              />
              <img src={data?.booking?.vehicleImage || UnknownVehicle} alt="Ace" className="img-fluid mt-3" />
              {/* { ||
                vehicleImages.default} */}
            </div>

            <p className="mt-3">
              {data.booking?.vehicleName}
            </p>
            {vechicle &&
              vechicle.map((vechicles) =>
                parseInt(data.centerId) === vechicles.vehicletypeId
                  ? vechicles.types || "--"
                  : ""
              )}
            <p>{data.transactionDetails?.txnRef}</p>
          </center>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <p className="mt-5 ps-2">
                <b>Shifting Informations :</b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">

           
            <div className="d-flex justify-content-center">
              <div className="card w-md-100">
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
                                  <b>Location: </b>
                                </span>
                                <span style={{ color: "#494949" }}>
                                  {stop.dropoff || "--"}
                                </span>
                              </p>
                              <p>
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
                            </div>
                          </div>
                        ))}

                    <div className="row">
                      <div className="col-md-6 col-12 ps-1">
                        <div>
                          <p className="lineh" style={{ color: "#00316B" }}>
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
                          <p className="lineh" style={{ color: "#00316B" }}>
                            <b>Date & Time</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 ps-1" id="drop">
                        <p className="line" style={{ color: "#494949" }}>
                          {data?.booking?.scheduledDate ? (
                            <>
                              {data.booking.scheduledDate.substring(0, 10)}{" "}
                              <b>&</b>{" "}
                              {new Date(
                                data.booking.scheduledDate
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </>
                          ) : (
                            " "
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="lineh" style={{ color: "#00316B" }}>
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
                      <p className="lineh" style={{ color: "#00316B" }}>
                        <b>Manpower</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.helper === "Y" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="lineh" style={{ color: "#00316B" }}>
                        <b>Extra ManPower</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.extraHelper === "Y" ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="lineh" style={{ color: "#00316B" }}>
                        <b>Extra ManPower Quantity</b>
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
                      <p className="lineh" style={{ color: "#00316B" }}>
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
                      <p className="lineh" style={{ color: "#00316B" }}>
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
                  {/* <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="line" style={{ color: "#00316B" }}>
                        <b>No of Pieces</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.noOfPieces || 0}
                      </p>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="lineh" style={{ color: "#00316B" }}>
                        <b>Estimate km</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking?.estKm || 0}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="lineh" style={{ color: "#00316B" }}>
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
                  <div className="row">
                    <div className="col-md-6 col-12 ps-1">
                      <p className="lineh" style={{ color: "#00316B" }}>
                        <b>Message To Driver</b>
                      </p>
                    </div>
                    <div className="col-md-6 col-12 ps-1" id="drop">
                      {" "}
                      <p className="line" style={{ color: "#494949" }}>
                        {data.booking
                          ? ` ${data.booking.msgToDriver || " "}`
                          : " "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {data.bookingStatus?.status === "DRAFT_BOOKING" ? (
              <></>
            ) : (
              <>
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-9">
                    <p className="mt-5 ps-2">
                      <b>Payment Detail:</b>
                    </p>
                  </div>
                </div>
                <div className=" my-2 ">
                  <div className="card  ">
                    <div className="card-body py-0">
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>Transaction Amount</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 ps-1" id="drop">
                          <p className="line" style={{ color: "#494949" }}>
                            $ {data?.transactionDetails?.txnAmount || "0.0"}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>Payment Mode</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 ps-1" id="drop">
                          <p className="line" style={{ color: "#494949" }}>
                            {data?.transactionDetails?.paymentMode || "--"}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>Payment Status</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 ps-1" id="drop">
                          <p className="line" style={{ color: "#494949" }}>
                            {data?.transactionDetails?.paymentStatus || "--"}
                          </p>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="line" style={{ color: "#00316B" }}>
                              <b>Resp Code</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 ps-1" id="drop">
                          <p className="line" style={{ color: "#494949" }}>
                            {data?.transactionDetails?.respCode || "0"}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </>
            )}

            {data.bookingStatus?.status === "CANCELLED" && (
              <>
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-9">
                    <p className="mt-5 ps-2">
                      <b>Cancelled Detail:</b>
                    </p>
                  </div>
                </div>
                <div className=" my-2 ">
                  <div className="card">
                    <div className="card-body py-0">
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>Cancelled By</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 ps-1" id="drop">
                          <p className="line" style={{ color: "#494949" }}>
                            {data?.bookingStatus?.cancelledBy || "--"}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>User Name</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 ps-1" id="drop">
                          <p className="line" style={{ color: "#494949" }}>
                            {data?.user?.firstName || "--"}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>Cancelled Date & Time</b>
                            </p>
                          </div>
                        </div>
                        <div
                          className="col-md-6 col-12 ps-1 line"
                          id="drop"
                          style={{ borderBottom: "1px solid #e4e2e2" }}
                        >
                          <p className="line" style={{ color: "#494949" }}>
                            {data?.bookingStatus?.cancelledDate.substring(
                              0,
                              10
                            )}{" "}
                            <b>&</b>{" "}
                            {new Date(
                              data.bookingStatus?.cancelledDate
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="lineh" style={{ color: "#00316B" }}>
                              <b>Comments</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12 col-12 ps-1">
                          <p style={{ color: "#494949" }}>
                            {data?.bookingStatus?.comments
                              ? data.bookingStatus.comments.includes("Others")
                                ? "No Comments"
                                : data.bookingStatus.comments.replace(
                                    "UserCancellation-",
                                    ""
                                  )
                              : " "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(data?.bookingStatus?.reviewByUser ||
              data?.bookingStatus?.ratingByUser) && (
              <>
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-9">
                    <p className="mt-5 ps-2">
                      <b>Review By User:</b>
                    </p>
                  </div>
                </div>
                <div className=" my-2 ">
                  <div className="card">
                    <div className="card-body py-0">
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div>
                            <p className="mt-2" style={{ color: "#00316B" }}>
                              <b>Rating By User</b>
                            </p>
                          </div>
                        </div>
                        <div
                          className="col-md-6 col-12 ps-1"
                          id="drop"
                          style={{ borderBottom: "1px solid #e4e2e2" }}
                        >
                          <p className="mt-2" style={{ color: "#494949" }}>
                            {data?.bookingStatus?.ratingByUser !== undefined
                              ? Array.from({ length: 5 }).map((_, index) =>
                                  index < data.bookingStatus.ratingByUser ? (
                                    <GoStarFill
                                      key={index}
                                      className="text-warning"
                                    />
                                  ) : (
                                    <FaRegStar
                                      key={index}
                                      className="text-warning"
                                    />
                                  )
                                )
                              : "--"}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 ps-1">
                          <div style={{ borderTop: "1px solid #e4e2e2" }}>
                            <p className="mt-2" style={{ color: "#00316B" }}>
                              <b>Comments</b>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12 col-12 ps-1">
                          <p style={{ color: "#4949491" }}>
                            {data?.bookingStatus?.reviewByUser
                              ? data.bookingStatus.reviewByUser
                              : " "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {data.bookingStatus?.reviewByDriver &&
              data.bookingStatus?.ratingByDriver && (
                <>
                  <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-9">
                      <p className="mt-5 ps-2">
                        <b>Review By Driver:</b>
                      </p>
                    </div>
                  </div>
                  <div className=" my-2 ">
                    <div className="card">
                      <div className="card-body py-0">
                        <div className="row">
                          <div className="col-md-6 col-12 ps-1">
                            <div>
                              <p className="mt-2" style={{ color: "#00316B" }}>
                                <b>Rating By Driver</b>
                              </p>
                            </div>
                          </div>
                          <div
                            className="col-md-6 col-12 ps-1"
                            id="drop"
                            style={{ borderBottom: "1px solid #e4e2e2" }}
                          >
                            <p className="mt-2" style={{ color: "#494949" }}>
                              {data?.bookingStatus?.ratingByDriver !== undefined
                                ? Array.from({ length: 5 }).map((_, index) =>
                                    index <
                                    data.bookingStatus.ratingByDriver ? (
                                      <GoStarFill
                                        key={index}
                                        className="text-warning"
                                      />
                                    ) : (
                                      <FaRegStar
                                        key={index}
                                        className="text-warning"
                                      />
                                    )
                                  )
                                : "--"}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-12 ps-1">
                            <div style={{ borderTop: "1px solid #e4e2e2" }}>
                              <p className="mt-2" style={{ color: "#00316B" }}>
                                <b>Comments</b>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12 col-12 ps-1">
                            <p style={{ color: "#4949491" }}>
                              {data?.bookingStatus?.reviewByDriver
                                ? data.bookingStatus.reviewByDriver
                                : " "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

            {data.bookingStatus?.status === "DRAFT_BOOKING" && (
              <div className="text-center py-3">
                <button
                  onClick={handleClick}
                  className="btn btn-primary px-5 py-2"
                  id="NextMove"
                >
                  Resume Booking
                </button>
              </div>
            )}

            <div className="my-3 d-flex justify-content-center">
              {(data.bookingStatus?.status === "COMPLETED" ||
                data.bookingStatus?.status === "CANCELLED") &&
                isPopupVisible &&
                !data?.bookingStatus?.reviewByUser &&
                !data?.bookingStatus?.rattingByUser && (
                  <Popup
                    togglePopup={togglePopup}
                    onSuccess={fetchData}
                    bookingId={data?.booking?.bookingId}
                  />
                )}
            </div>
          </div>

          {data.transactionDetails?.paymentMode === "CASH" &&
            data.bookingStatus?.status !== "COMPLETED" &&
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

          <Modal show={show} onHide={handleClose} size="lg" dialogClassName="modal-dialog-centered">
            <Modal.Header closeButton>
              <Modal.Title>Want to cancel your order?</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit}>
              <Modal.Body>
                <div className="container">
                  <p>
                    Before canceling, let us know why you’re leaving. Your
                    response may be shared with the provider.
                  </p>

                  {[
                    "Driver is not allocated",
                    "Driver says he will be late",
                    "Vehicle cannot meet my requirement",
                    "I need to change my address & location",
                    "Driver is too far away and I need a shorter arrival time",
                    "Others",
                  ].map((reason, index) => (
                    <>
                      <div className="form-check" key={index}>
                        <input
                          type="radio"
                          className="form-check-input"
                          id={`reason${index}`}
                          name="cancelReason"
                          value={reason}
                          onChange={handleRadioChange}
                          checked={formik.values.cancelReason === reason}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`reason${index}`}
                        >
                          {reason}
                        </label>
                      </div>
                    </>
                  ))}

                  {/* Validation message for cancelReason */}
                  {formik.touched.cancelReason &&
                    formik.errors.cancelReason && (
                      <div className="text-danger">
                        {formik.errors.cancelReason}
                      </div>
                    )}

                  {formik.values.cancelReason === "Others" && (
                    <>
                      <textarea
                        className={`form-control mt-3 ${
                          formik.touched.comments && formik.errors.comments
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Write your reason here..."
                        {...formik.getFieldProps("comments")}
                      ></textarea>
                      {formik.touched.comments && formik.errors.comments && (
                        <div className="text-danger">
                          {formik.errors.comments}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-danger">
                  Confirm
                </button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
        </div>
      )}
    </section>
  );
}

export default RideDetailsView;
