import React from "react";
import Ace from "../asset/Rectangle 42.png";
import "../styles/CheckDetails.css";
import { Link } from "react-router-dom";

function Summary() {
  return (
    <section className="summary">
      <div className="container-fluid pt-5" id="Ace">
        <center>
          <h3 style={{ color: "#106EEA" }}>SUMMARY</h3>
        </center>
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9">
            <p className="mt-5">
              <b>Vehicle :</b>
            </p>
          </div>
        </div>
        <center>
          <img src={Ace} alt="Ace" className="img-fluid mt-3" />
          <p>Tata Ace</p>
        </center>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <p className="mt-5">
                <b>Address :</b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-3 col-md-6 col-12 pt-3 ps-3" id="address">
              <div id="PickUp">
                <p style={{ color: "#00316B" }}>
                  <b>Pickup Address :</b>
                </p>
                <p>
                  <span style={{ color: "#00316B" }}>
                    <b>Name : </b>
                  </span>
                  <span style={{ color: "#494949" }}>M.Alavudeen</span>
                </p>
                <p>
                  <span style={{ color: "#00316B" }}>
                    <b>Address : </b>
                  </span>
                  <span style={{ color: "#494949" }}>
                    766,kennet lane, Egmore,chennai-600008.
                  </span>
                </p>
                <p>
                  <span style={{ color: "#00316B" }}>
                    <b>Contact:</b>{" "}
                  </span>
                  <span style={{ color: "#494949" }}>9360302955</span>
                </p>
                <p className="line" style={{ color: "#00316B" }}>
                  <b>Category</b>
                </p>
                <p className="line" style={{ color: "#00316B" }}>
                  <b>Date & Time</b>
                </p>
                <p className="line" style={{ color: "#00316B" }}>
                  <b>Manpower</b>
                </p>
                <p className="line" style={{ color: "#00316B" }}>
                  <b>Total amount</b>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 pt-3 ps-1" id="address">
              <p>
                <p style={{ color: "#00316B" }}>
                  <b>Drop Address :</b>
                </p>
                <p>
                  <span style={{ color: "#00316B" }}>
                    <b>Name :</b>{" "}
                  </span>
                  <span style={{ color: "#494949" }}>M.Mujjamil</span>
                </p>
                <p>
                  <span style={{ color: "#00316B" }}>
                    <b>Address :</b>{" "}
                  </span>
                  <span style={{ color: "#494949" }}>
                    702,Rito street, Maraimalainagar,chengalpattu-6000025.
                  </span>
                </p>
                <p>
                  <span style={{ color: "#00316B" }}>
                    <b>Contact: </b>
                  </span>
                  <span style={{ color: "#494949" }}>9360302955</span>
                </p>

                <p className="line" style={{ color: "#494949" }}>
                  House Shifting
                </p>
                <p className="line" style={{ color: "#494949" }}>
                  14-feb-2022 : 08:30 am
                </p>
                <p className="line" style={{ color: "#494949" }}>
                  2 persons
                </p>
                <p className="line" style={{ color: "#494949" }}>
                   750.00 Rupees
                </p>
              </p>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <div className="text-center py-5">
          <Link to="/payments">
            <button className="btn btn-primary px-5 py-2" id="NextMove">
              Next
            </button>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
