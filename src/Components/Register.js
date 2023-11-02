import React, { useState } from "react";
import "../styles/custom.css";
import Logins from "../asset/Login.png";
import { AiOutlineGoogle } from "react-icons/ai";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid">
      <div
        className="row align-items-center"
        style={{
          backgroundColor: "#9AB8DD",
        }}
      >
        <div
          className="col-lg-4 col-md-4 col-12 py-5 text-center mx-auto"
          style={{
            backgroundColor: "#9AB8DD",
            height: "100%",
          }}
        >
          <div className="d-flex flex-column align-items-center h-100">
            <h2 className="LoginHeader">
              Experience lightning-fast truck delivery for your every need.
            </h2>
            <img src={Logins} alt="Trucklah" className="img-fluid" />
          </div>
        </div>
        <div
          className="col-lg-8 col-md-8 col-12 p-5"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="row">
            <h5 className="LoginTitle pb-4">
              Create Your Account for Fast Truck Delivery
            </h5>
            <p className="LoginContent">
              Sign up now to experience efficient and swift truck delivery
              services. Fill out the form below to get started.
            </p>
            <hr></hr>
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>

              <div className="col-lg-6 col-md-8 col-12">
                <div className="text-center">
                  <p className="LoginContent">
                    <b>Get started with your free account</b>
                  </p>
                  <button className="btn btn-danger" style={{ width: "100%" }}>
                    <AiOutlineGoogle style={{ fontSize: "30px" }} /> Sign in
                    with Google
                  </button>
                  <div className="or-line-container py-3">
                    <div className="or-line"></div>
                    <span className="or-line-text">
                      <b>OR</b>
                    </span>
                    <div className="or-line"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-2 col-12"></div>
              <div className="row  g-3">
                <div className="form mb-3 d-flex justify-content-center">
                  <div className="d-flex w-100">
                    <div className="w-50 pe-2">
                      <FloatingLabel
                        controlId="floatingFirstName"
                        label="Full Name"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-50 ps-2">
                      <FloatingLabel
                        controlId="floatingLastName"
                        label="Referal Code"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter referal code"
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                </div>
                <div className="form mb-3 d-flex justify-content-center">
                  <div className="w-50 pe-2">
                    <FloatingLabel
                      controlId="floatingPhone"
                      label="Phone Number"
                      style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                      />
                    </FloatingLabel>
                  </div>
                  <div className="w-50 ps-2">
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Email"
                      style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="form mb-3 d-flex justify-content-center">
                  <div className="w-50 pe-2">
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      {showPassword ? (
                        <RiEyeOffLine
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "calc(50% - 8px)",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <RiEyeLine
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "calc(50% - 8px)",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </FloatingLabel>
                  </div>
                  <div className="w-50 ps-2">
                    <FloatingLabel
                      controlId="floatingConfirmPassword"
                      label="Confirm Password"
                      style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                      />
                      {showPassword ? (
                        <RiEyeOffLine
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "calc(50% - 8px)",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <RiEyeLine
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "calc(50% - 8px)",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </FloatingLabel>
                  </div>
                </div>
                <div className="form-check mb-3 d-flex ">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheckbox"
                  />

                  <label className="form-check-label" htmlFor="termsCheckbox">
                    I agree all statements in Terms and Conditions.
                  </label>
                </div>
                <div className="form-check mb-3 d-flex ">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheckbox"
                  />

                  <label className="form-check-label " htmlFor="termsCheckbox">
                    I agree the use of my personal data for direct marketing in
                    accordance with the stated Privacy Policy.{" "}
                  </label>
                </div>
                <div className="text-center">
                  <Link to="/otp">
                    <button
                      className="btn btn-primary py-2"
                      style={{ width: "100%" }}
                      id="registerButton"
                    >
                      Register
                    </button>
                  </Link>
                  <p className="my-4">
                    already have an account? <Link to="/login">Log In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
