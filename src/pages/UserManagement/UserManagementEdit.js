import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function UserManagementEdit() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    password: Yup.string().required("*Password is required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),

    countryCode: Yup.string().required("Country code is required"),
    mobileNo: Yup.string()
      .required("Phone number is required")
      .test("mobileNo-length", function (value) {
        const { countryCode } = this.parent;
        if (value && /\s/.test(value)) {
          return this.createError({
            message: "Phone number should not contain spaces",
          });
        }
        if (countryCode === "65") {
          return value && value.length === 8
            ? true
            : this.createError({
              message: "Phone number must be 8 digits only",
            });
        }
        if (countryCode === "91") {
          return value && value.length === 10
            ? true
            : this.createError({
              message: "Phone number must be 10 digits only",
            });
        }
        return false;
      }),
    refCode: Yup.string().required("*Reference Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "Rajangam",
      lastName: "D",
      password: "Raja@123",
      cPassword: "",
      email: "raj@gmail.com",
      countryCode: "+91",
      mobileNo: "6385988984",
      refCode: "HA123",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("additems:", values);
      setLoading(true);
      //   try {
      //     const response = await api.post(`createMstrItems`, values);
      //     console.log(response);
      //     if (response.status === 201) {
      //       toast.success(response.data.message);
      //       console.log("Toast : ", response.data.message);
      //       navigate("/items");
      //     } else {
      //       toast.error(response?.data?.message);
      //     }
      //   } catch (error) {
      //     toast.error("Error fetching data: ", error?.response?.data?.message);
      //   } finally {
      //     setLoading(false);
      //   }
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
                    Edit User Management
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/usermanagement">
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
        <div className="card shadow  border-0 my-2" >
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${formik.touched.firstName && formik.errors.firstName
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
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName
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
                    className={`form-control ${formik.touched.email && formik.errors.email
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
                      className={`form-select form-select-sm ${formik.touched.countryCode && formik.errors.countryCode
                        ? "is-invalid"
                        : ""
                        }`}
                      style={{ maxWidth: "80px" }} // Adjust width as needed
                      {...formik.getFieldProps("countryCode")}
                    >
                      {/* <option value=""></option> */}
                      <option value="91">+91</option>
                      <option value="65">+65</option>
                    </select>
                    <input
                      type="text"
                      name="mobileNo"
                      placeholder="Mobile Number"
                      className={`form-control ${formik.touched.mobileNo && formik.errors.mobileNo
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
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className={`form-control ${formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("password")}
                  />
                  <span className="input-group-text" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
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
                    className={`form-control ${formik.touched.cPassword && formik.errors.cPassword
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("cPassword")}
                  />
                  <span className="input-group-text" onClick={toggleCPasswordVisibility}>
                    {cPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {formik.touched.cPassword && formik.errors.cPassword && (
                    <div className="invalid-feedback">
                      {formik.errors.cPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Reference Code <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="refCode"
                    className={`form-control ${formik.touched.refCode && formik.errors.refCode
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
            <div className="col-md-6 col-12 mb-2">
              <label className="form-label">
                Terms Condition
              </label>
              <div className="form-check mb-3 d-flex ">
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  name="termsCondition"
                  className={`form-check-input ${formik.touched.termsCondition &&
                    formik.errors.termsCondition
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("termsCondition")}
                  checked
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
            </div>
            <div className="col-md-6 col-12 mb-2">
              <div className="form-check mb-3 d-flex ">
                <input
                  type="checkbox"
                  id="privacyCheckbox"
                  className={`form-check-input  ${formik.touched.agree && formik.errors.agree
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("agree")}
                  checked
                />
                &nbsp; &nbsp;
                <label
                  className="form-check-label "
                  htmlFor="privacyCheckbox"
                >
                  I agree the use of my personal data for direct marketing
                  in accordance with the stated Privacy Policy.{" "}
                </label>
                {formik.touched.agree && formik.errors.agree && (
                  <div className="invalid-feedback">
                    {formik.errors.agree}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserManagementEdit;