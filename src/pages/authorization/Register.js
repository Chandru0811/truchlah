import React, { useState } from "react";
import "../../styles/custom.css";
import Logins from "../../asset/Login.png";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import axios from "axios";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),
  mobile: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Mobile Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  country: Yup.string().required("*Country is required"),
  referalCode: Yup.string().required("*Referal Code is required"),
});

function Register() {
  const [role, setRole] = useState(["User"]);
  const navigate = useNavigate();
  const [Password, setShowPassword] = useState(false);
  const [cPassword, setCShowPassword] = useState(false);

  const showPassword = () => {
    setShowPassword(!Password);
  };
  const confirmShowPassword = () => {
    setCShowPassword(!cPassword);
  };

  // const handelsubmit = (e) => {
  //   e.preventDefault();
  //   // if (isValidate())
  //   {
  //     let regsub = {
  //       firstName,
  //       lastName,
  //       password,
  //       email,
  //       mobileNo,
  //       countryCode,
  //       refCode,
  //       role,
  //     };
  //     console.log(regsub);
  //     fetch("http://139.84.133.106:9095/trucklah/api/auth/signup", {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(regsub),
  //     })
  //       .then((res) => {
  //         toast.success("Register Successfully.");
  //         // navigate("/login");
  //       })
  //       .catch((err) => {
  //         toast.error("Failed :" + err.message);
  //       });
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      country: "",
      referalCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      navigate("/otp")

      // fetch("http://139.84.133.106:9095/trucklah/api/auth/signup", {
      //         method: "POST",
      //         headers: { "content-type": "application/json" },
      //         body: JSON.stringify(values),
      //       })
      //         .then((res) => {
      //           toast.success("Register Successfully.");
      //           navigate("/otp");
      //         })
      //         .catch((err) => {
      //           toast.error("Failed :" + err.message);
      //         });
        // try {
        //   const response = await axios.post("/http://139.84.133.106:9095/trucklah/api/auth/signup", values, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        //   if (response.status === 201) {
        //     toast.success("Register successfully");
        //     navigate("/otp");
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // } catch (error) {
        //   toast.error(error);
        // } finally {

        // }
    },
  });
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="row my-3">
                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          First Name <span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className={`form-control  ${
                            formik.touched.firstName && formik.errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("firstName")}
                        />
                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <div className="invalid-feedback">
                              {formik.errors.firstName}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Last Name <span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className={`form-control  ${
                            formik.touched.lastName && formik.errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("lastName")}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                          <div className="invalid-feedback">
                            {formik.errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Email<span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          className={`form-control  ${
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="invalid-feedback">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          MobilNo<span className="errmsg">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <select
                              name="countryCode"
                              className="form-control"
                              {...formik.getFieldProps("countryCode")}
                            >
                              <option value="+65">+65</option>
                              <option value="+91">+91</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            name="mobile"
                            className={`form-control ${
                              formik.touched.mobile && formik.errors.mobile
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("mobile")}
                          />
                        </div>
                        {formik.touched.mobile && formik.errors.mobile && (
                          <div className="invalid-feedback">
                            {formik.errors.mobile}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Password<span className="errmsg">*</span>
                        </label>
                        <div className="password-wrapper">
                          <input
                            type={Password ? "text" : "password"}
                            name="password"
                            className={`form-control ${
                              formik.touched.password && formik.errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("password")}
                            style={{backgroundImage:"none"}}
                          />
                          <span
                            className="password-toggle-icon"
                            onClick={showPassword}
                            style={{ cursor: "pointer" }}
                          >
                            {Password ? <RiEyeOffLine /> : <RiEyeLine />}
                          </span>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Confirm Password<span className="errmsg">*</span>
                        </label>
                        <div className="password-wrapper">
                          <input
                            type={cPassword ? "text" : "password"}
                            name="confirmPassword"
                            className={`form-control ${
                              formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("confirmPassword")}
                          />
                          <div className="input-group-append">
                            <span
                              className="password-toggle-icon"
                              onClick={confirmShowPassword}
                              style={{ cursor: "pointer" }}
                            >
                              {cPassword ?<RiEyeOffLine /> : <RiEyeLine />}
                            </span>
                          </div>
                        </div>
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <div className="invalid-feedback">
                              {formik.errors.confirmPassword}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Country<span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          className={`form-control  ${
                            formik.touched.country && formik.errors.country
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("country")}
                        />
                        {formik.touched.country && formik.errors.country && (
                          <div className="invalid-feedback">
                            {formik.errors.country}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          Referal Code<span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="referalCode"
                          className={`form-control  ${
                            formik.touched.referalCode &&
                            formik.errors.referalCode
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("referalCode")}
                        />
                        {formik.touched.referalCode &&
                          formik.errors.referalCode && (
                            <div className="invalid-feedback">
                              {formik.errors.referalCode}
                            </div>
                          )}
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
