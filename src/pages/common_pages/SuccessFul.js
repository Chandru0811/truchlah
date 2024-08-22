import React from "react";
import "../../styles/custom.css";
import { Link, useSearchParams } from "react-router-dom";

function Successfull() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const bookingId = searchParams.get("bookingId");

  return (
    <section className="Success">
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
                <span className="mt-3 fw-bolder">Booking Id: {bookingId}</span>
                <h5 className="mt-4" style={{ color: "#4D96ED" }}>
                  Order Successful
                </h5>
                <p className="mt-2">Thank you so much for your order</p>
                <center>
                  <Link to={`/rides?type=${type}`}>
                    <button
                      id="button"
                      type="button"
                      className="btn btn-success my-3"
                      style={{ width: "40%" }}
                    >
                      Check Status
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

export default Successfull;
