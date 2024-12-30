import React, { useEffect, useState } from "react";
import Ace from "../../../asset/Rectangle 42.png";
import "../../../styles/custom.css";
import { toast } from "react-toastify";
import { bookingApi } from "../../../config/URL";

function Summary({ handleNext }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingApi.get(`booking/getBookingById/340`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
      }
    };
    fetchData();
  }, []);

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
                          {data.pickupContactName}
                        </span>
                      </p>
                      <p>
                        <span style={{ color: "#00316B" }}>
                          <b>Address : </b>
                        </span>
                        <span style={{ color: "#494949" }}>
                          {data.pickupAddress}
                        </span>
                      </p>
                      <p>
                        <span style={{ color: "#00316B" }}>
                          <b>Contact:</b>{" "}
                        </span>
                        <span style={{ color: "#494949" }}>
                          {data.pickupMobile}
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
                        {data.dropoffContactName}
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Address :</b>{" "}
                      </span>
                      <span style={{ color: "#494949" }}>
                        {data.dropoffAddress}
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Contact: </b>
                      </span>
                      <span style={{ color: "#494949" }}>
                        {data.dropoffMobile}
                      </span>
                    </p>
                  </div>
                </div>
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
                      <span style={{ color: "#494949" }}>S. Sathish</span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Address :</b>{" "}
                      </span>
                      <span style={{ color: "#494949" }}>
                        7, Shenstone Park, # 13, 1, Harrington Rd, Chetpet,
                        Chennai, Tamil Nadu 600031
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Contact: </b>
                      </span>
                      <span style={{ color: "#494949" }}>9123678907</span>
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
                      <span style={{ color: "#494949" }}>M. Vishal</span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Address :</b>{" "}
                      </span>
                      <span style={{ color: "#494949" }}>
                        Old No. 1/144 & New, 41, Poonamallee High Rd,
                        Nerkundram, Chennai, Tamil Nadu 600107
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#00316B" }}>
                        <b>Contact: </b>
                      </span>
                      <span style={{ color: "#494949" }}>9345623710</span>
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
                      House Moving
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
                      14-feb-2022 : 08:30 am
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
                      2 persons
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
                      750.00 Rupees
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-5">
          <button
            className="btn btn-primary px-5 py-2"
            id="NextMove"
            onClick={handleNext}
          >
            Confirm Booking With Cash Payment
          </button>
        </div>
      </div>
    </section>
  );
}

export default Summary;
