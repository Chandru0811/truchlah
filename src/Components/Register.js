import React, { useState } from "react";
import "../styles/custom.css";
import Logins from "../asset/Login.png";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobile] = useState("");
  const [countryCode, setCountry] = useState("+91");
  const [refCode, setRefCode] = useState(" ");
  const [role, setRole] = useState(["User"]);

  const isMobileValid = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const isPasswordValid = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  };

  const navigate = useNavigate();

  const isValidate = () => {
    let isProcess = true;
    let errorMessage = "Please Enter Value in ";

    if (firstName === null || firstName === "") {
      isProcess = false;
      errorMessage += " FirstName";
    }
    if (lastName === null || lastName === "") {
      isProcess = false;
      errorMessage += " LastName";
    }
    if (password === null || password === "") {
      isProcess = false;
      errorMessage += " Password";
    } else if (!isPasswordValid(password)) {
      isProcess = false;
      errorMessage += " Password (must have 8 characters, one uppercase, one lowercase, one number)";
    }
    if (email === null || email === "") {
      isProcess = false;
      errorMessage += " Email";
    }
    if (mobileNo === null || mobileNo === "") {
      isProcess = false;
      errorMessage += " Mobile Number";
    } else if (!isMobileValid(mobileNo)) {
      isProcess = false;
      errorMessage += " Mobile Number must be Numeric (must be 10 digits)";
    }


    const termsCheckbox = document.getElementById("termsCheckbox");
    const privacyCheckbox = document.getElementById("privacyCheckbox");
  
    if (!termsCheckbox.checked || !privacyCheckbox.checked) {
      isProcess = false;
      errorMessage += " Terms and Privacy checkboxes";
    }


    if (!isProcess) {
      toast.warning(errorMessage);
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isProcess = false;
      toast.warning("Please enter a valid email");
    }
    return isProcess;
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
      let regsub = {
        firstName,
        lastName,
        password,
        email,
        mobileNo,
        countryCode,
        refCode,
        role,
      };
      console.log(regsub);
      fetch("http://139.84.133.106:9095/trucklah/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regsub),
      })
        .then((res) => {
          toast.success("Register Successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
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
              <div className="container">
                <form onSubmit={handelsubmit}>
                  <div className="row my-3">
                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          First Name <span className="errmsg">*</span>
                        </label>
                        <input
                          value={firstName}
                          onChange={(e) => setFirstname(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Last Name <span className="errmsg">*</span>
                        </label>
                        <input
                          value={lastName}
                          onChange={(e) => setLastname(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Password <span className="errmsg">*</span>
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Email <span className="errmsg">*</span>
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Mobile <span className="errmsg">*</span>
                        </label>
                        <input
                          value={mobileNo}
                          onChange={(e) => setMobile(e.target.value)}
                          type="tel"
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Country <span className="errmsg">*</span>
                        </label>
                        <select
                          value={countryCode}
                          onChange={(e) => setCountry(e.target.value)}
                          className="form-select"
                        >
                          <option value="+91">India</option>
                          <option value="+63">Singapore</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>Referal Code</label>
                        <input
                          value={refCode}
                          onChange={(e) => setRefCode(e.target.value)}
                          className="form-control"
                          placeholder="(optional)"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-check mb-3 d-flex ">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="termsCheckbox"
                    />
                    &nbsp; &nbsp;{" "}
                    <label className="form-check-label" htmlFor="termsCheckbox">
                      I agree all statements in Terms and Conditions.
                    </label>
                  </div>
                  <div className="form-check mb-3 d-flex ">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="privacyCheckbox"
                    />
                    &nbsp; &nbsp;
                    <label
                      className="form-check-label "
                      htmlFor="privacyCheckbox"
                    >
                      I agree the use of my personal data for direct marketing
                      in accordance with the stated Privacy Policy.{" "}
                    </label>
                  </div>
                  <button
                    type="submit"
                    style={{ width: "100%" }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <p className="my-4 text-center">
                    already have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Log In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
