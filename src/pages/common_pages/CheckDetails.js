import React, { useEffect, useState } from "react";
import Ace from "../../asset/Rectangle 42.png";
import "../../styles/custom.css";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bookingApi } from "../../config/URL";

function Summary() {
  const [data, setData] = useState({});
  const {bookingId} = useParams();
  console.log("bookingId",bookingId);
  const shiftType = sessionStorage.getItem("shiftType");
  // console.log("Type:", shiftType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingApi.get(`booking/getBookingById/${bookingId}`);
        setData(response.data.responseBody);
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
      }
    };
    fetchData();
  }, []);

  const bookingTripLocations = data.bookingTripLocations || [];
  const firstLocation = bookingTripLocations[0] || {};

  return (
    <section className="summary">
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
          <img src={Ace} alt="Ace" className="img-fluid mt-3" />
          <p>Tata Ace</p>
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
                        <b>Pickup Address :</b>
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
                          {firstLocation.pickupAddress || "N/A"}
                        </span>
                      </p>
                      <p>
                        <span style={{ color: "#00316B" }}>
                          <b>Contact:</b>{" "}
                        </span>
                        <span style={{ color: "#494949" }}>
                          {firstLocation.pickupMobile || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 ps-1" id="drop">
                    <p style={{ color: "#00316B" }}>
                      <b>Drop Address :</b>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Name :</b>{" "}
                      </span>
                      <span style={{ color: "#494949" }}>
                        {firstLocation.dropoffContactName || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Address :</b>{" "}
                      </span>
                      <span style={{ color: "#494949" }}>
                        {firstLocation.dropoffAddress || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Contact: </b>
                      </span>
                      <span style={{ color: "#494949" }}>
                        {firstLocation.dropoffMobile || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                {shiftType === "Item Shift" && (
                  <>
                    <div className="row">
                      <div className="col-md-6 col-12 ps-1">
                        <div>
                          <p className="line" style={{ color: "#00316B" }}>
                            <b>1. Drop Address</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 ps-1" id="drop">
                        <p className="line">
                          <span style={{ color: "#00316B" }}>
                            <b>Name :</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>{firstLocation.dropoffName1 || "N/A"}</span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Address :</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>
                          {firstLocation.dropoffAddress1 || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Contact: </b>
                          </span>
                          <span style={{ color: "#494949" }}>{firstLocation.dropoffMobile1 || "N/A"}</span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12 ps-1">
                        <div>
                          <p className="line" style={{ color: "#00316B" }}>
                            <b>2. Drop Address</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 ps-1" id="drop">
                        <p className="line">
                          <span style={{ color: "#00316B" }}>
                            <b>Name :</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>{firstLocation.dropName2 || "N/A"}</span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Address :</b>{" "}
                          </span>
                          <span style={{ color: "#494949" }}>
                          {firstLocation.dropoffAddress2 || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span style={{ color: "#00316B" }}>
                            <b>Contact: </b>
                          </span>
                          <span style={{ color: "#494949" }}>{firstLocation.dropoffMobile2 || "N/A"}</span>
                        </p>
                      </div>
                    </div>
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
                          Item Shifting
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
                        {firstLocation.dateTime || "N/A"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <div className="row">
                  <div className="col-md-6 col-12 ps-1">
                    <p className="line" style={{ color: "#00316B" }}>
                      <b>Manpower</b>
                    </p>
                  </div>
                  <div className="col-md-6 col-12 ps-1" id="drop">
                    {" "}
                    <p className="line" style={{ color: "#494949" }}>
                      {data.manPower ? "2 persons" : "N/A"}
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
                      {data.transactionDetails
                        ? `${data.transactionDetails.txnAmount} Rupees`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-5">
          <Link to="/payments">
            <button className="btn btn-primary px-5 py-2" id="NextMove">
              Next
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Summary;
