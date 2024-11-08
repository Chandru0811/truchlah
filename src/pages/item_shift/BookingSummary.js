import React, { useState } from "react";
import { FaTruck, FaWeightHanging } from "react-icons/fa";
import Image1 from "../../asset/24FT_LORRY.png";

const BookingSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [isAgreed, setIsAgreed] = useState(false);

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <h5>Item Shifting</h5>
                <span>09 November 2024 @ 7:30 AM</span>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-danger">&#9679;</span>
                    <strong className="ms-2">Pickup Location</strong>
                  </div>
                  <p>
                    Holiday Inn, PTK nagar, Thiruvanmiyur, Chennai, TamilNadu
                    600096
                  </p>
                  <div className="bg-light p-2 rounded">
                    <p>
                      <strong>Address Info:</strong> Holiday Inn, PTK nagar,
                      Thiruvanmiyur, Chennai, TamilNadu 600096
                    </p>
                    <p>
                      <strong>Contact Details:</strong> Manoj | +91 9876543210
                    </p>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-success">&#9679;</span>
                    <strong className="ms-2">Dropoff Location</strong>
                  </div>
                  <p>
                    <strong>Total Distance:</strong> 25.45 KM
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body">
              <h5>Payment</h5>
              <form>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn"
                    type="button"
                    id="button-addon2"
                    style={{ background: "rgb(172, 255, 59)", color: "#fff" }}
                  >
                    Apply Coupon
                  </button>
                </div>
              </form>
              <ul className="list-group list-group-flush">
                <li className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>$66.09</strong>
                </li>
                <li className="d-flex justify-content-between">
                  <span>Discount</span>
                  <strong className="text-danger">$0.00</strong>
                </li>
                <li className="d-flex justify-content-between">
                  <span>Total price</span>
                  <strong>$66.09</strong>
                </li>
              </ul>
              <p className="mt-3">
                Please select your preferred payment method
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card p-2">
            <h3>Package details</h3>
            <div className="text-center">
              {/* <FaTruck size={80} className="my-2" /> */}
              <img src={Image1} alt="" className="img-fluid w-25" />
              <h4>1.7M_VAN</h4>
              <p>
                <FaWeightHanging /> 50 Kg
              </p>
            </div>
            <div className="row">
              <div className="col-md-6 col-12 ps-2">
                <p>Manpower</p>
              </div>
              <div className="col-md-6 col-12">
                <p>:Yes</p>
              </div>
              <div className="col-md-6 col-12 ps-2">
                <p>Extra ManPower</p>
              </div>
              <div className="col-md-6 col-12">
                <p>:No</p>
              </div>
              <div className="col-md-6 col-12 ps-2">
                <p>Extra ManPower Quantity</p>
              </div>
              <div className="col-md-6 col-12">
                <p>:0</p>
              </div>
              <div className="col-md-6 col-12 ps-2">
                <p>Trolley Required</p>
              </div>
              <div className="col-md-6 col-12">
                <p>:Yes</p>
              </div>
              <div className="col-md-6 col-12 ps-2">
                <p>Round Trip</p>
              </div>
              <div className="col-md-6 col-12">
                <p>:No</p>
              </div>
              <div className="col-md-6 col-12 ps-2">
                <p>Message To Driver</p>
              </div>
              <div className="col-md-6 col-12">
                <p>:No</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 border-0">
            <div className="row mb-3">
              <div className="col-6">
                <div
                  className={`payment-option text-center p-3 ${
                    selectedPayment === "cash" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentSelection("cash")}
                  style={{
                    border:
                      selectedPayment === "cash"
                        ? "2px solid #28a745"
                        : "1px solid #e0e0e0",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="path/to/cash_icon.png"
                    alt="Cash on Delivery"
                    style={{ width: "30px", marginBottom: "5px" }}
                  />
                  <p>Cash on Delivery</p>
                </div>
              </div>
              <div className="col-6">
                <div
                  className={`payment-option text-center p-3 ${
                    selectedPayment === "online" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentSelection("online")}
                  style={{
                    border:
                      selectedPayment === "online"
                        ? "2px solid #28a745"
                        : "1px solid #e0e0e0",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="path/to/online_icon.png"
                    alt="Online Payment"
                    style={{ width: "30px", marginBottom: "5px" }}
                  />
                  <p>Online Payment</p>
                </div>
              </div>
            </div>
            <div>
              <h5>
                {selectedPayment === "cash"
                  ? "Pay by Cash on Delivery"
                  : "Pay by Online Payment"}
              </h5>
              <p>
                {selectedPayment === "cash"
                  ? "Pay conveniently at your doorstep with cash on delivery."
                  : "Pay securely through online payment."}
              </p>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheckbox"
                checked={isAgreed}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="termsCheckbox">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-light">Back</button>
              <button className="btn btn-success" disabled={!isAgreed}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
