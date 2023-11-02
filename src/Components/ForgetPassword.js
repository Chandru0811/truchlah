import React, { useState } from "react";
import Logins from "../asset/Login.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function ForgotPassword() {
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
            height: "100%", // Set height to 100% to fill the container
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
            <div className="text-center"></div>
            <h5 className="LoginTitle pb-4">Forget Password</h5>
            <h6 className="LoginSubHead">
              Your new password must be different from previously used Password
            </h6>

            <hr></hr>
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>

              <div className="col-lg-6 col-md-8 col-12">
                <div className="text-center">
                  <form>
                    <div className="form mb-3 ">
                      <div className="">
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="New Password"
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
                      <div className="">
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
                    <div className="text-center">
                      <button
                        className="btn btn-primary py-2"
                        style={{ width: "100%" }}
                        id="registerButton"
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-3 col-md-2 col-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
