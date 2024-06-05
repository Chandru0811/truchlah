import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import { FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookingApi } from "../../config/URL";
import { Link } from "react-router-dom";

function Order() {
  const [showInprogressSection, setShowInprogressSection] = useState(true);
  const [showCompletedSection, setShowCompletedSection] = useState(false);
  const [showCanceledSection, setShowCanceledSection] = useState(false);
  const [showHouseShift, setShowHouseShift] = useState(true);
  const [showItemShift, setShowItemShift] = useState(false);
  const [data, setData] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const houseSection = () => {
    setShowHouseShift(true);
    setShowItemShift(false);
  };

  const itemSection = () => {
    setShowItemShift(true);
    setShowHouseShift(false);
  };

  const inprogressSection = () => {
    setShowInprogressSection(true);
    setShowCompletedSection(false);
    setShowCanceledSection(false);
  };

  const completedSection = () => {
    setShowInprogressSection(false);
    setShowCanceledSection(false);
    setShowCompletedSection(true);
  };

  const cancelSection = () => {
    setShowInprogressSection(false);
    setShowCompletedSection(false);
    setShowCanceledSection(true);
  };

  useEffect(() => {
    const status = showInprogressSection
      ? "INPROGRESS"
      : showCompletedSection
      ? "COMPLETED"
      : "CANCELLED";

    const shiftType = showHouseShift ? "HOUSE" : "ITEM";

    const fetchData = async () => {
      try {
        const response = await bookingApi.get(
          `fetchBookingDetailsByUser/${userId}?bookingType=${shiftType}`
        );
        if (response.status === 200) {
          const responseData = response.data.responseBody[status];
          setData(responseData);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [
    showInprogressSection,
    showCompletedSection,
    showCanceledSection,
    showHouseShift,
    showItemShift,
    userId,
  ]);

  const vehicleNameMap = {
    1: "1.7M_VAN",
    2: "2.4M_VAN",
    3: "10FT_LORRY",
    4: "14FT_LORRY",
    5: "24FT_LORRY",
    default: "Unknown Vehicle",
  };

  return (
    <section className="order">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col ms-5 mt-5">
            <h2 style={{ color: "#106EEA" }}>ORDERS</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center">
            <button
              className={`mx-3 ${showHouseShift ? "underline" : ""}`}
              id="shift-btn"
              onClick={houseSection}
            >
              HOUSE SHIFT
            </button>
            <button
              className={`mx-3 ${showItemShift ? "underline" : ""}`}
              id="shift-btn"
              onClick={itemSection}
            >
              ITEM SHIFT
            </button>
          </div>
          <div
            className="col-12 d-flex justify-content-center mt-5 py-3"
            style={{ backgroundColor: "rgba(246, 222, 222, 0.58)" }}
          >
            <button
              className={`mx-3 ${showInprogressSection ? "underline" : ""}`}
              id="shift-btn"
              onClick={inprogressSection}
            >
              INPROGRESS
            </button>
            <button
              className={`mx-3 ${showCompletedSection ? "underline" : ""}`}
              id="shift-btn"
              onClick={completedSection}
            >
              COMPLETED
            </button>
            <button
              className={`mx-3 ${showCanceledSection ? "underline" : ""}`}
              id="shift-btn"
              onClick={cancelSection}
            >
              CANCELLED
            </button>
          </div>
        </div>
      </div>
      <div id="shift-bg" className="container-fluid">
        {data.map((item, index) => (
          <Link
            to={`/ridedetailsview/${item.booking.bookingId}`}
            style={{ textDecoration: "none", color: "black" }}
            key={index}
          >
            <div className="container py-4">
              <div className="row" id="on">
                <div className="col-lg-10 col-md-6 col-12 p-3">
                  <p>{vehicleNameMap[item.booking.vehicletypeId]}</p>
                  <p style={{ color: "#DFAE00" }}>
                    {showInprogressSection
                      ? "INPROGRESS"
                      : showCompletedSection
                      ? "COMPLETED"
                      : "CANCELLED"}
                  </p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot1"></span>
                    &nbsp;&nbsp;&nbsp;
                    {item.bookingTripLocations?.[0]?.pickupAddress}
                    <br />
                    <span className="line"></span>
                  </p>
                  {item.bookingTripLocations?.map((location, index) => (
                    <div key={index}>
                      {index > 0 && (
                        <div className="line-container">
                          <span className="line"></span>
                        </div>
                      )}
                      <p
                        key={index}
                        style={{ marginTop: "0", marginBottom: "0" }}
                      >
                        <span className="dot2"></span>
                        &nbsp;&nbsp;&nbsp;{location.dropoffAddress}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="col-lg-2 col-md-6 col-12 p-3">
                  <p className="ps-5 pt-2">
                    <FaDollarSign />{" "}
                    {item.transactionDetails?.txnAmount.toFixed(2)}
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Order;
