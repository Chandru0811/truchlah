import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { userApi } from "../../config/URL";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function SupportTeamManagementAdd() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    password: Yup.string()
  .required('*Password is required')
  .min(8, '*Password must be at least 8 characters long')
  .matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
    'Password must contain at least one uppercase, one number, and one special character'
  ),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    countryCode: Yup.string().required("*Country code is required"),
    mobileNo: Yup.number()
      .required("*Phone number is required")
      .test("mobileNo-length", function (value) {
        const { countryCode } = this.parent;
        if (countryCode === "65") {
          return value?.toString().length === 8
            ? true
            : this.createError({
                message: "Phone number must be 8 digits only",
              });
        }
        if (countryCode === "91") {
          return value?.toString().length === 10
            ? true
            : this.createError({
                message: "Phone number must be 10 digits only",
              });
        }
        return false;
      }),
    // refCode: Yup.string().required("*Reference Code is required"),
    loginType: Yup.string().required("*Login Type is required"),
    agreeConditionOne: Yup.boolean().oneOf([true], "*This condition must be accepted").required(),
    // agreeConditionTwo: Yup.boolean().oneOf([true], "*This condition must be accepted").required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      cPassword: "",
      email: "",
      mobileNo: "",
      countryCode: "",
      refCode: "",
      loginType: "",
      agreeConditionOne: false,
      agreeConditionTwo: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.agreeConditionTwo = true
      setLoading(true);
      try {
        const response = await userApi.post(`staff/signup`, values);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/supportteammanagement");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        if (error.response.status ===409){
          toast.error(error?.response?.data?.message);
        }else{
          toast.error(error?.response?.data?.errorList[0]?.errorMessage);
        }
        
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cPasswordVisible);
  };

  return (
    <div className="container-fluid px-2 pb-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Add Support Team Management
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/supportteammanagement">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 my-2">
          <div className="container mb-5">
            <div className="row py-4">
              {/* Input Fields */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${
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

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
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

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <div className="input-group">
                    <select
                      name="countryCode"
                      className={`form-select form-select-sm ${
                        formik.touched.countryCode && formik.errors.countryCode
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ maxWidth: "80px" }}
                      {...formik.getFieldProps("countryCode")}
                    >
                      <option value=""></option>
                      <option value="91">+91</option>
                      <option value="65">+65</option>
                    </select>
                    <input
                      type="text"
                      name="mobileNo"
                      placeholder="Mobile Number"
                      className={`form-control ${
                        formik.touched.mobileNo && formik.errors.mobileNo
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("mobileNo")}
                    />
                    {formik.touched.mobileNo && formik.errors.mobileNo && (
                      <div className="invalid-feedback">
                        {formik.errors.mobileNo}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("password")}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    type={cPasswordVisible ? "text" : "password"}
                    name="cPassword"
                    className={`form-control ${
                      formik.touched.cPassword && formik.errors.cPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("cPassword")}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleCPasswordVisibility}
                  >
                    {cPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formik.touched.cPassword && formik.errors.cPassword && (
                    <div className="invalid-feedback">
                      {formik.errors.cPassword}
                    </div>
                  )}
                </div>
              </div>

              {/* Ref Code */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Reference Code <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="refCode"
                    className={`form-control ${
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

              {/* Login Type */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Login Type <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <select
                    name="loginType"
                    className={`form-control ${
                      formik.touched.loginType && formik.errors.loginType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("loginType")}
                  >
                    <option value=""></option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPPORT">Support</option>
                  </select>
                  {formik.touched.loginType && formik.errors.loginType && (
                    <div className="invalid-feedback">
                      {formik.errors.loginType}
                    </div>
                  )}
                </div>
              </div>

              {/* Agreement Checkboxes */}
              {/* <div className="col-md-6 col-12 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="agreeConditionOne"
                    className={`form-check-input ${
                      formik.touched.agreeConditionOne &&
                      formik.errors.agreeConditionOne
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("agreeConditionOne")}
                  />
                  <label className="form-check-label">
                    I agree to the first condition.
                  </label>
                  {formik.touched.agreeConditionOne &&
                    formik.errors.agreeConditionOne && (
                      <div className="invalid-feedback">
                        {formik.errors.agreeConditionOne}
                      </div>
                    )}
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="agreeConditionTwo"
                    className={`form-check-input ${
                      formik.touched.agreeConditionTwo &&
                      formik.errors.agreeConditionTwo
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("agreeConditionTwo")}
                  />
                  <label className="form-check-label">
                    I agree to the second condition.
                  </label>
                  {formik.touched.agreeConditionTwo &&
                    formik.errors.agreeConditionTwo && (
                      <div className="invalid-feedback">
                        {formik.errors.agreeConditionTwo}
                      </div>
                    )}
                </div>
              </div> */}
              <div className=" col-12 mb-2">
                <label className="form-label">Terms Condition</label>
                <div className="form-check  d-flex ">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    name="agreeConditionOne"
                    className={`form-check-input ${
                      formik.touched.agreeConditionOne &&
                      formik.errors.agreeConditionOne
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("agreeConditionOne")}
                  />
                  &nbsp; &nbsp;{" "}
                  <label className="form-check-label" htmlFor="termsCheckbox">
                    I agree all statements in Terms and Conditions.
                  </label>
                </div>
                  {formik.touched.agreeConditionOne &&
                    formik.errors.agreeConditionOne && (
                      <small className="text-danger ">
                        {formik.errors.agreeConditionOne}
                      </small>
                    )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SupportTeamManagementAdd;
