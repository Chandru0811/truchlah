import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import Logins from "../../asset/Login.png";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),
  mobileNo: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Mobile Number is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one Special Case Character"
    )
    .required("Please Enter your password"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  countryCode: Yup.string().required("*Country Code is required"),
  refCode: Yup.string().required("*Referral Code is required"),
  termsCondition: Yup.boolean().oneOf(
    [true],
    "Please accept the terms and conditions"
  ),
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
  //       mobileNoNo,
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
      mobileNo: "",
      password: "",
      confirmPassword: "",
      countryCode: "",
      refCode: "",
      termsCondition: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNo: values.mobileNo,
        password: values.password,
        countryCode: values.countryCode,
        refCode: values.refCode,
        termsCondition: values.termsCondition ? "y" : "N",
      };
      console.log("values", values);
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
      // values.termsCondition=values.termsCondition?"y":"N";
      try {
        const response = await userApi.post(
          `user/signup`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          const mobileNo = `${values.countryCode}${values.mobileNo}`;
          try {
            const response = await userApi.post(
              `user/sendOTP?phone=${mobileNo}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            navigate("/otp", { state: { mobileNo } });
          } catch (error) {
            toast.error(error);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("countryCode", 65);
  }, []);
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
                        <label htmlFor="mobileNo">
                          Mobile Number<span className="errmsg">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <select
                              name="countryCode"
                              id="countryCode"
                              className={`form-control ${
                                formik.touched.countryCode &&
                                formik.errors.countryCode
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("countryCode")}
                            >
                              <option value="65">+65</option>
                              <option value="91">+91</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            className={`form-control ${
                              formik.touched.mobileNo && formik.errors.mobileNo
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("mobileNo")}
                          />
                        </div>
                        {formik.touched.countryCode &&
                          formik.errors.countryCode && (
                            <div className="invalid-feedback d-block">
                              {formik.errors.countryCode}
                            </div>
                          )}
                        {formik.touched.mobileNo && formik.errors.mobileNo && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.mobileNo}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <div className="col-lg-6 col-12 pb-2">
                      <div className="form-group">
                        <label>
                          MobilNo<span className="errmsg">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <select
                              name="countryCode"
                              className={`form-control ${
                                formik.touched.countryCode &&
                                formik.errors.countryCode
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("countryCode")}
                            >
                              <option value="65">+65</option>
                              <option value="91">+91</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            name="mobileNo"
                            className={`form-control ${
                              formik.touched.mobileNo && formik.errors.mobileNo
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("mobileNo")}
                          />
                        </div>
                        {formik.touched.countryCode &&
                          formik.errors.countryCode && (
                            <div className="invalid-feedback d-block">
                              {formik.errors.countryCode}
                            </div>
                          )}
                        {formik.touched.mobileNo && formik.errors.mobileNo && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.mobileNo}
                          </div>
                        )}
                      </div>
                    </div> */}

                    <div className="col-lg-6 col-12 pb-2">
                      <label className="form-label">Password</label>
                      <div className={`input-group mb-3`}>
                        <input
                          type={Password ? "text" : "password"}
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{
                            borderRadius: "3px",
                            borderRight: "none",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }}
                          name="password"
                          {...formik.getFieldProps("password")}
                        />
                        <span
                          className={`input-group-text iconInputBackground bg-white`}
                          id="basic-addon1"
                          onClick={showPassword}
                          style={{ cursor: "pointer" }}
                        >
                          {Password ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </span>
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 pb-2">
                      <label className="form-label">Conform Password</label>
                      <div className={`input-group mb-3`}>
                        <input
                          type={cPassword ? "text" : "password"}
                          className={`form-control ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{
                            borderRadius: "3px",
                            borderRight: "none",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }}
                          name="confirmPassword"
                          {...formik.getFieldProps("confirmPassword")}
                        />
                        <span
                          className={`input-group-text iconInputBackground bg-white `}
                          id="basic-addon1"
                          onClick={confirmShowPassword}
                          style={{ cursor: "pointer", borderRadius: "3px" }}
                        >
                          {cPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </span>
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
                          Referal Code<span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="refCode"
                          className={`form-control  ${
                            formik.touched.refCode && formik.errors.refCode
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("refCode")}
                        />
                        {formik.touched.refCode && formik.errors.refCode && (
                          <div className="invalid-feedback">
                            {formik.errors.refCode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-check mb-3 d-flex ">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      name="termsCondition"
                      className={`form-check-input ${
                        formik.touched.termsCondition &&
                        formik.errors.termsCondition
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("termsCondition")}
                    />
                    &nbsp; &nbsp;{" "}
                    <label className="form-check-label" htmlFor="termsCheckbox">
                      I agree all statements in Terms and Conditions.
                    </label>
                    {formik.touched.termsCondition &&
                      formik.errors.termsCondition && (
                        <div className="invalid-feedback">
                          {formik.errors.termsCondition}
                        </div>
                      )}
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
