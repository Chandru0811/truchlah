import React from "react";
import "../../styles/custom.css";
import { Link, useSearchParams } from "react-router-dom";
import error from "../../asset/rewards.png"; 
import { GiCancel } from "react-icons/gi";
function PaymentUnsuccessful() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const bookingId = searchParams.get("bookingId");

  return (
    <section className="PaymentUnsuccessful" style={{background:"#faf5f6"}}>
      <center>
        <div className="container py-5 px-2">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="card">
                <center>
                  <div className="d-flex justify-content-center align-item-center mt-2">
                    {/* <img src={error} style={{ border: "none", width: "200px" }} alt="Payment Error"/> */}
                    <GiCancel className="text-danger my-5" size={70}/>
                  </div>
                </center>
                <span className="fw-bolder">Booking Id: {bookingId}</span>
                <h5 className="mt-4" style={{ color: "#e74c3c" }}>
                  Payment Unsuccessful
                </h5>
                <p className="mt-2 mx-3">
                  We encountered an issue processing your payment. Please check your details and try again.
                </p>
                <center>
                  <Link to={`/retry-payment?type=${type}&bookingId=${bookingId}`}>
                    <button
                      id="retry-button"
                      type="button"
                      className="btn btn-danger my-3"
                      style={{ width: "40%" }}
                    >
                      Retry Payment
                    </button>
                  </Link>
                  <Link to={`/support?type=${type}`}>
                    <button
                      id="support-button"
                      type="button"
                      className="btn btn-secondary my-3 mx-2"
                      style={{ width: "40%" }}
                    >
                      Contact Support
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

export default PaymentUnsuccessful;
