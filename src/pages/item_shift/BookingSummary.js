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
        <div className="col-md-5 col-12">
          <div className="card">
            <div className="">
              <div className="d-flex justify-content-between align-items-center border-bottom ms-3 me-3 p-2">
                <h5>Item Shifting</h5>
                <span>09 November 2024 @ 7:30 AM</span>
              </div>

              <ul className="list-group-flush mt-3">
                <li className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-danger">&#9679;</span>
                    <strong className="ms-2">Pickup Location</strong>
                  </div>
                  <p>
                    Holiday Inn, PTK nagar, Thiruvanmiyur, Chennai, TamilNadu
                    600096
                  </p>
                  <div className="bg-light p-3 rounded">
                    <div className="row">
                      <div className="col-6">
                        <p>Address Info:</p>
                      </div>
                      <div className="col-6">
                        <p>
                          Holiday Inn, PTK nagar, Thiruvanmiyur, Chennai,
                          TamilNadu 600096
                        </p>
                      </div>
                      <div className="col-6">
                        <p>Contact Details:</p>
                      </div>
                      <div className="col-6">
                        <p>Manoj | +91 9876543210</p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-success">&#9679;</span>
                    <strong className="ms-2">Dropoff Location</strong>
                  </div>
                  <p className="text-center">
                    <strong>Total Distance:</strong> 25.45 KM
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-1 col-12"></div>
        <div className="col-md-6 col-12">
          <div className="card border-0">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Payment</h6>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a Coupon Code"
                />
                <button
                  className="btn"
                  style={{ background: "rgb(172, 255, 59)" }}
                >
                  Apply Coupon
                </button>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <p>Subtotal</p> <p>$66.09</p>
              </div>
              <div className="d-flex justify-content-between mb-1 text-danger">
                <p>Discount</p> <p>$0.00</p>
              </div>
              <div className="d-flex justify-content-between fw-bold mb-3">
                <p>Total Price</p> <p>$66.09</p>
              </div>
              <p className="mt-3">
                Please select your preferred payment method
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-5 col-12">
          <div className="card p-4">
            <h3>Package details</h3>
            <div className="text-center">
              {/* <FaTruck size={80} className="my-2" /> */}
              <img src={Image1} alt="" className="img-fluid w-25" />
              <h4>1.7M_VAN</h4>
              <p>
                <FaWeightHanging /> 50 Kg
              </p>
            </div>
            <div className="row ps-4">
              <div className="col-6">
                <p>Manpower</p>
              </div>
              <div className="col-6">
                <p>:Yes</p>
              </div>
              <div className="col-6">
                <p>Extra ManPower</p>
              </div>
              <div className="col-6">
                <p>:No</p>
              </div>
              <div className="col-6">
                <p>Extra ManPower Quantity</p>
              </div>
              <div className="col-6">
                <p>:0</p>
              </div>
              <div className="col-6">
                <p>Trolley Required</p>
              </div>
              <div className="col-6">
                <p>:Yes</p>
              </div>
              <div className="col-6">
                <p>Round Trip</p>
              </div>
              <div className="col-6">
                <p>:No</p>
              </div>
              <div className="col-6">
                <p>Message To Driver</p>
              </div>
              <div className="col-6">
                <p>:No</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1 col-12"></div>
        <div className="col-md-6 col-12">
          <div className="card p-3 border-0">
            <div className="d-flex justify-content-between">
              <div className="">
                <div
                  className={`payment-option text-center p-4 ${
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
              <div className="">
                <div
                  className={`payment-option text-center p-4 ${
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
            <div className="mt-3">
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
              <label
                className="form-check-label text-muted"
                htmlFor="termsCheckbox"
              >
                I agree to the terms and conditions
              </label>
            </div>
            {/* <div className="d-flex justify-content-between">
              <button className="btn btn-light">Back</button>
              <button
                className="btn fw-bold border-0"
                style={{ background: "rgb(172, 255, 59)" }}
                disabled={!isAgreed}
              >
                Proceed
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
