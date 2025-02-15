import React from "react";
import "../../styles/custom.css";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <section className="Cancel">
      <center>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="card">
                <center>
                  <div className="circle d-flex justify-content-centre align-item-center mt-3">
                    <p className="text">
                      <i className="checkmark">✓</i>
                    </p>
                  </div>
                </center>
                <h5 className="mt-5" style={{ color: "#FF6D6D" }}>
                  Order Cancelled
                </h5>
                <p className="mt-2">Sorry to see you go , But we can fix it.</p>
                <br></br>
                <h6 className="text-muted">Talk to our support team</h6>
                <h3 className="fw-bold">+65 8894 1306</h3>
                <center>
                  <Link to="/shift">
                    <button
                      id="NextMove"
                      type="button"
                      className="btn my-3"
                      style={{ width: "40%" }}
                    >
                      Return to home
                    </button>
                  </Link>
                </center>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12"></div>
          </div>
        </div>
      </center>
    </section>
  );
}

export default Cancel;
