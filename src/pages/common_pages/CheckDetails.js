import React, {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
// import Ace from "../../asset/Rectangle 42.png";
import "../../styles/custom.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bookingApi, userApi } from "../../config/URL";
import VAN1 from "../../asset/1.7M_VAN.png";
import VAN2 from "../../asset/2.4M_VAN.png";
import Lorry10 from "../../asset/10FT_LORRY.png";
import Lorry14 from "../../asset/14FT_LORRY.png";
import Lorry24 from "../../asset/24FT_LORRY.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Summary = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const [data, setData] = useState({});
    const [loadIndicator1, setLoadIndicator1] = useState(false);
    const [loadIndicator2, setLoadIndicator2] = useState(false);

    const { bookingId } = formData;
    console.log("bookingId", bookingId);
    const [vechicle, setVechicle] = useState([]);
    // console.log("Api Data", data.booking);
    const [isLoading, setIsLoading] = useState(true);
    // console.log("Type:", shiftType);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await bookingApi.get(
            `booking/getBookingByIdAdmin/${bookingId}`
          );
          if (response.status === 200) {
            setData(response.data.responseBody);
          }
        } catch (error) {
          toast.error("Error Fetching Data: " + error.message);
        } finally {
          setIsLoading(false); // Set loading to false once data is fetched
        }
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const bookingTripLocations = data.bookingTripLocations || [];
    const firstLocation = bookingTripLocations[0] || {};
    const lastLocation =
      bookingTripLocations[bookingTripLocations.length - 1] || {};

    console.log("First Location:", firstLocation);

    const vehicleImages = {
      1: <img src={VAN1} alt="Ace" className="img-fluid mt-3" />,
      2: <img src={VAN2} alt="Ace" className="img-fluid mt-3" />,
      3: <img src={Lorry10} alt="SomeOther" className="img-fluid mt-3" />,
      4: <img src={Lorry14} alt="Ace" className="img-fluid mt-3" />,
      5: <img src={Lorry24} alt="Ace" className="img-fluid mt-3" />,
      6: <img src={Lorry24} alt="Ace" className="img-fluid mt-3" />,
    };

    const confirmCashPayment = async () => {
      setLoadIndicator1(true);
      try {
        const response = await bookingApi.post(
          `booking/cashPayment/${bookingId}`
        );
        if (response.status === 200) {
          // navigate(`/successful?type=${data?.booking?.bookingType}`);
          navigate(
            `/paymentstatus?type=${data?.booking?.bookingType}&bookingId=${bookingId}?result=success`
          );
          localStorage.removeItem("shiftType");
        } else {
          navigate(
            `/paymentstatus?type=${data?.booking?.bookingType}&bookingId=${bookingId}?result=error`
          );
        }
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
        navigate(
          `/paymentstatus?type=${data?.booking?.bookingType}&bookingId=${bookingId}?result=error`
        );
      } finally {
        setLoadIndicator1(false);
      }
    };

    const handlePayment = async () => {
      setLoadIndicator2(true);

      try {
        const response = await bookingApi.post(
          `booking/generateCardTransactionPaymentLink?bookingId=${bookingId}`
        );
        if (response.status === (201 || 200)) {
          const paymentLink = response.data.paymentLink.replace("?", "&");
          window.open(paymentLink, "_self");
          // toast.success("Payment successful!");
          // navigate(`/successful?type=${data?.booking?.bookingType}&bookingId=${bookingId}`);
          localStorage.removeItem("shiftType");
        } else {
          toast.error("Payment failed, please try again.");
          navigate(
            `/paymentstatus?type=${data?.booking?.bookingType}&bookingId=${bookingId}?result=error`
          );
        }
      } catch (error) {
        console.error("Payment error: " + error.message);
        navigate(
          `/paymentstatus?type=${data?.booking?.bookingType}&bookingId=${bookingId}?result=error`
        );
      } finally {
        setLoadIndicator2(false);
      }
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
        {/* <div className="containers pt-2">
            <Link to="/map"
              data-toggle="tooltip" data-placement="bottom" title="Back">
              <IoArrowBackCircleOutline size={24} />
            </Link>
          </div> */}
        {isLoading ? (
          <div className="loader-container d-flex align-items-center justify-content-center">
            <div class="loader"></div>
          </div>
        ) : (
          <div className="container-fluid pt-5" id="Ace">
            <div
              onClick={() => navigate(-1, { state: { bookingId } })}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Back"
              className="me-3"
              style={{ cursor: "pointer", color: "rgb(16, 110, 234)" }}
            >
              <IoArrowBackCircleOutline size={30} />
            </div>
            <center>
              <h3 style={{ color: "#1e1e1e" }}>SUMMARY</h3>
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
              <div className="vehicleImages-card">
                <img
                  src={data?.booking?.vehicleImage}
                  alt="vechicle"
                  className="img-fluid mt-3"
                  // style={{ maxWidth: "50%" }}
                />
                <p className="mt-3">
                  {vehicleNameMap[data.booking?.vehicletypeId]}
                </p>
                {vechicle &&
                  vechicle.map((vechicles) =>
                    parseInt(data.centerId) === vechicles.vehicletypeId
                      ? vechicles.types || "--"
                      : ""
                  )}
                <p>{data?.transactionDetails?.txnRef}</p>
              </div>
            </center>

            <div className="row">
              <div className="col-lg-3 col-md-3 col-12"></div>
              <div className="col-lg-6 col-md-6 col-12">
                <p className="mt-5 ps-2">
                  <b>Shifting Informations :</b>
                </p>
                <div className="card mx-1">
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
                              {/* {data.pickupAddress} */}
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
                            <b>Drop Address : </b>
                          </span>
                          <span className="col-6" style={{ color: "#494949" }}>
                            {lastLocation.dropoff || "-"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Name :</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>
                            {lastLocation.dropoffContactName || "--"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Address :</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>
                            {lastLocation.dropoffAddress || "--"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Contact: </b>
                          </span>
                          <span style={{ color: "#494949" }}>
                            {lastLocation.dropoffMobile || "--"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <>
                      {/* Other Stops */}
                      {bookingTripLocations.length > 1 &&
                        bookingTripLocations
                          .slice(0, -1) // Exclude the first and last index
                          .map((stop, index) => (
                            <div className="row" key={stop.btLocId}>
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
                                    {stop.dropoff || "N/A"}
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
                                    {stop.dropoffAddress || "N/A"}
                                  </span>
                                </p>
                                <p>
                                  <span style={{ color: "#00316B" }}>
                                    <b>Contact: </b>
                                  </span>
                                  <span style={{ color: "#494949" }}>
                                    {stop.dropoffMobile || "N/A"}
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
              <div className="col-lg-3 col-md-3 col-12"></div>
            </div>
            <div className="text-center py-5 cash-pay">
              <button
                onClick={confirmCashPayment}
                className="btn btn-primary px-5 py-2"
                id="NextMove"
              >
                {loadIndicator1 && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Cash On Delivery
              </button>

              <button
                onClick={handlePayment}
                className="btn btn-primary px-5 py-2"
                id="NextMove"
              >
                {loadIndicator2 && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Pay Now
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
);

export default Summary;
