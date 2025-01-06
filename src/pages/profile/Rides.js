import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import { FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookingApi } from "../../config/URL";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function Order() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const [showDraftSection, setShowDraftSection] = useState(true);
  const [showInprogressSection, setShowInprogressSection] = useState(false);
  const [showCompletedSection, setShowCompletedSection] = useState(false);
  const [showCanceledSection, setShowCanceledSection] = useState(false);
  const [draftCount, setDraftCount] = useState(0);
  const [inprogressCount, setInprogressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [showHouseShift, setShowHouseShift] = useState(true);
  const [showItemShift, setShowItemShift] = useState(false);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  console.log("Data is ", data);
  const userId = localStorage.getItem("userId");
  const shiftType = localStorage.getItem("shiftType");
  console.log("Type:", shiftType);

  const houseSection = () => {
    // setIsLoaded(true);
    setShowHouseShift(true);
    setShowItemShift(false);
    // setIsLoaded(false)
  };

  const itemSection = () => {
    // setIsLoaded(true);
    setShowItemShift(true);
    setShowHouseShift(false);
    // setIsLoaded(false)
  };

  const draftSection = () => {
    // setIsLoaded(true);
    setShowDraftSection(true);
    setShowInprogressSection(false);
    setShowCompletedSection(false);
    setShowCanceledSection(false);
    // setIsLoaded(false)
  };

  const inprogressSection = () => {
    // setIsLoaded(true);
    setShowDraftSection(false);
    setShowInprogressSection(true);
    setShowCompletedSection(false);
    setShowCanceledSection(false);
    // setIsLoaded(false)
  };

  const completedSection = () => {
    // setIsLoaded(true);
    setShowDraftSection(false);
    setShowInprogressSection(false);
    setShowCanceledSection(false);
    setShowCompletedSection(true);
    // setIsLoaded(false)
  };

  const cancelSection = () => {
    // setIsLoaded(true);
    setShowDraftSection(false);
    setShowInprogressSection(false);
    setShowCompletedSection(false);
    setShowCanceledSection(true);
    // setIsLoaded(false)
  };

  useEffect(() => {
    const status = showDraftSection
      ? "DRAFT_BOOKING"
      : showInprogressSection
        ? "INPROGRESS"
        : showCompletedSection
          ? "COMPLETED"
          : "CANCELLED";

    const shiftType = showHouseShift ? "HOUSE" : "ITEM";

    // const fetchData = async () => {
    //   try {
    //     const response = await bookingApi.get(
    //       `fetchBookingDetailsByUser/${userId}?bookingType=${shiftType}`
    //     );
    //     if (response.status === 200) {
    //       const responseData = response.data.responseBody[status];
    //       setData(responseData);
    //     }
    //   } catch (error) {
    //     toast.error(error.message);
    //   } finally {
    //     setIsLoaded(false); // Disable loader after data fetching
    //   }
    // };

    const fetchData = async () => {
      setIsLoaded(true);
      try {
        const response = await bookingApi.get(
          `fetchBookingDetailsByUser/${userId}?bookingType=${shiftType}`
        );
        if (response.status === 200) {
          const responseData = response.data.responseBody;
          setData(responseData[status]);
          // Update badge counts
          setDraftCount(responseData["DRAFT_BOOKING"]?.length || 0);
          setInprogressCount(responseData["INPROGRESS"]?.length || 0);
          setCompletedCount(responseData["COMPLETED"]?.length || 0);
          setCanceledCount(responseData["CANCELLED"]?.length || 0);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoaded(false);
      }
    };

    fetchData();
  }, [
    showInprogressSection,
    showDraftSection,
    showCompletedSection,
    showCanceledSection,
    showHouseShift,
    showItemShift,
    userId,
  ]);

  const colors = ["red", "orange", "blue", "purple", "grey"];

  // const vehicleNameMap = {
  //   1: "1.7M_VAN",
  //   2: "2.4M_VAN",
  //   3: "10FT_LORRY",
  //   4: "14FT_LORRY",
  //   5: "24FT_LORRY",
  // };
  useEffect(() => {
    if (type === "ITEM") {
      setShowItemShift(true);
      inprogressSection();
      setShowHouseShift(false);
    } else {
      setShowItemShift(false);
      inprogressSection();
      setShowHouseShift(true);
    }
  }, [type]);

  return (
    <section className="order">
      <div className="container-fluid mt-3">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center orderMargin">
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
            <h2 style={{ color: "#1e1e1e", marginBottom: "0" }}>ORDERS</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center">
            <button
              className={`mx-3 ${showHouseShift ? "underline" : ""}`}
              id="shift-btn"
              onClick={houseSection}
              type="button"
            >
              HOUSE MOVING
            </button>
            <button
              className={`mx-3 ${showItemShift ? "underline" : ""}`}
              id="shift-btn"
              onClick={itemSection}
            >
              ITEM SHIFT
            </button>
          </div>
        </div>
      </div>

      <div id="shift-bg">
        {isLoaded ? (
          <div className="loader-container d-flex align-items-center justify-content-center">
            <div class="loader"></div>
          </div>
        ) : (
          <>
            <div className="col-12 d-flex justify-content-center mt-5 py-3 flex-wrap">
              <button
                className={`mx-3 my-1 ${showDraftSection ? "underline" : ""}`}
                id="shift-btn"
                onClick={draftSection}
                style={{ position: "relative" }}
              >
                DRAFT BOOKING
                <span
                  className="position-absolute start-100 translate-middle badge rag rounded-pill"
                  style={{
                    transform: "translate(-50%, -50%)",
                    fontSize: "0.75em",
                    padding: "0.3em 0.6em",
                  }}
                >
                  {draftCount}
                </span>
              </button>

              <button
                className={`mx-3 ${showInprogressSection ? "underline" : ""}`}
                id="shift-btn"
                onClick={inprogressSection}
                style={{ position: "relative" }}
              >
                INPROGRESS
                <span
                  className="position-absolute start-100 translate-middle badge rag rounded-pill"
                  style={{
                    transform: "translate(-50%, -50%)",
                    fontSize: "0.75em",
                    padding: "0.3em 0.6em",
                  }}
                >
                  {inprogressCount}
                </span>
              </button>

              <button
                className={`mx-3 ${showCompletedSection ? "underline" : ""}`}
                id="shift-btn"
                onClick={completedSection}
                style={{ position: "relative" }}
              >
                COMPLETED
                <span
                  className="position-absolute start-100 translate-middle badge rag rounded-pill"
                  style={{
                    transform: "translate(-50%, -50%)",
                    fontSize: "0.75em",
                    padding: "0.3em 0.6em",
                  }}
                >
                  {completedCount}
                </span>
              </button>

              <button
                className={`mx-3 ${showCanceledSection ? "underline" : ""}`}
                id="shift-btn"
                onClick={cancelSection}
                style={{ position: "relative" }}
              >
                CANCELLED
                <span
                  className="position-absolute start-100 translate-middle badge rag rounded-pill"
                  style={{
                    transform: "translate(-50%, -50%)",
                    fontSize: "0.75em",
                    padding: "0.3em 0.6em",
                  }}
                >
                  {canceledCount}
                </span>
              </button>
            </div>

            <div className="container-fluid">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <>
                    <div className="container py-4">
                      <div className="row" id="on">
                        <div className="col-lg-10 col-md-6 col-12 p-3">
                          <p className="fw-medium">
                            Booking Id : {item.booking.bookingId || ""}
                          </p>
                          {/* <p className="fw-medium">
                              Amount :
                              $ {item.transactionDetails?.txnAmount.toFixed(2) ||
                                "0.00"}
                              <br />
                            </p> */}
                          <p>{item.booking.type || "Unknown Vehicle"}</p>
                          <p
                            className="fw-bold"
                            style={{
                              letterSpacing: "1px",
                              color: showDraftSection
                                ? "orange"
                                : showInprogressSection
                                  ? "orange"
                                  : showCompletedSection
                                    ? "green"
                                    : showCanceledSection
                                      ? "red"
                                      : "#28d8b7",
                            }}
                          >
                            {/* {showDraftSection
                                ? "DRAFT_BOOKING"
                                : showInprogressSection
                                  ? "BOOKED"
                                  : showCompletedSection
                                    ? "COMPLETED"
                                    : "CANCELLED"} */}
                            {item.bookingStatus.status}
                          </p>

                          {/* <p style={{ marginTop: "0", marginBottom: "0" }}>
                            <span className="dot1"></span>
                            &nbsp;&nbsp;&nbsp;
                            {item.bookingTripLocations?.[0]?.pickup}
                            <br />
                            <span className="line"></span>
                          </p> */}
                          {item.bookingTripLocations?.map((location, index) => (
                            <div key={index}>
                              {index === 0 && (
                                <p style={{ marginTop: "0", marginBottom: "0" }}>
                                  <span className="dot1"></span>
                                  &nbsp;&nbsp;&nbsp;{location.pickup}
                                  <br />
                                  <span className="line"></span>
                                </p>
                              )}
                              <div className="line-container">
                                {index > 0 && <span className="line"></span>}
                                <p
                                  style={{
                                    marginTop: "0",
                                    marginBottom: "0",
                                  }}
                                >
                                  <span
                                    className="dot2"
                                    style={{
                                      backgroundColor:
                                        index === item.bookingTripLocations.length - 1 ? "#048c4c" : "#acff3b",
                                    }}
                                  ></span>
                                  &nbsp;&nbsp;&nbsp;{location.dropoff}
                                </p>
                              </div>
                            </div>
                          ))}

                        </div>

                        <div className="col-lg-2 col-md-6 col-12 p-3 d-flex flex-column justify-content-between">
                          <p className="pt-2 mb-0">
                            <FaDollarSign />{" "}
                            {item.transactionDetails?.txnAmount.toFixed(2) || "0.00"}
                          </p>
                          <Link
                            to={`/ridedetailsview/${item.booking.bookingId}`}
                            style={{ textDecoration: "none", color: "black" }}
                            key={index}
                          >
                            <button
                              type="button"
                              className="btn btn-outline-dark py-2 px-3 mt-auto"
                            >
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div className="container py-4">
                  <div className="row">
                    <div className="col text-center">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ verticalAlign: "center", minHeight: "60vh" }}
                      >
                        <h6 className="text-secondary">No Data Found</h6>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Order;
