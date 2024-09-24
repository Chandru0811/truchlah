import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { driverApi } from "../../config/URL";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function DriverManagementEdit() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();
  const {id}=useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First name is required"),
    lastName: Yup.string().required("*Last name is required"),
    countryCode: Yup.string().required("*Country code is required"),
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
    email: Yup.string().email("*Invalid email format").required("*Email is required"),
    demeritPoint: Yup.number().typeError("*Demerit Point Must Be a Digit").notRequired(),
    // password: Yup.string().required("*Password is required"),
    // refCode: Yup.string().required("*Referral code is required"),
    // termsCondition: Yup.string().required("*Terms and conditions must be accepted"),
    // loginType: Yup.string().required("*Login type is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      countryCode: "",
      mobileNo: "",
      email: "",
      password: "",
      // refCode: "",
      // termsCondition: "",
      driverId: "",
      driverPhoto: "",
      idFront: "",
      idBack: "",
      licenseFront: "",
      licenseBack: "",
      demeritPoint: "",
      // loginType: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("drivermanagement:", values);
      const { driverPhoto, idFront, idBack, licenseFront, licenseBack,cPassword,loginType,termsCondition,refCode, ...value } = values;

      const formData = new FormData();
      if (driverPhoto) formData.append('driverPhoto', driverPhoto);
      if (idFront) formData.append('idFront', idFront);
      if (idBack) formData.append('idBack', idBack);
      if (licenseFront) formData.append('licenseFront', licenseFront);
      if (licenseBack) formData.append('licenseBack', licenseBack);
      if (value.demeritPoint) formData.append('demeritPoint', value.demeritPoint);

      setLoading(true);
        try {
          const response = await driverApi.put(`driver/updateDriverDetails/${id}`, value);
          if (response.status === 200) {
            formData.append("driverId",id)
            try {
              const response = await driverApi.post(`driver/update`, formData);
              if (response.status === 200||response.status === 201) {
                toast.success(response.data.message);
                navigate("/drivermanagement")
              }
            } catch (error) {
              toast.error("Error fetching data: ", error?.response?.data?.message);
            }
          } else {
            toast.error(response?.data?.message);
          }
        } catch (error) {
          toast.error("Error fetching data: ", error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoader(true)
      try {
        const response = await driverApi.get(`/driver/byId/${id}`);
        formik.setValues(response.data.responseBody);
        setData(response.data.responseBody)
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }finally{
        setLoader(false)
      }
    };
    getData();
  }, []);

  return (
    <>
     {loading ? (
        <div className="darksoul-layout">
      <div className="darksoul-grid">
        <div className="item1"></div>
        <div className="item2"></div>
        <div className="item3"></div>
        <div className="item4"></div>
      </div>
      <h3 className="darksoul-loader-h">Trucklah</h3>
    </div>
      ) : (
    <div className="container-fluid px-2 pb-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Edit Driver Management
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/drivermanagement">
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
                      style={{ maxWidth: "80px" }}
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
              {/* <div className="col-md-6 col-12 mb-2">
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
              </div> */}
              {/* <div className="col-md-6 col-12 mb-2">
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
              </div> */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Driver Id <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="driverId"
                    className={`form-control ${formik.touched.driverId && formik.errors.driverId
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("driverId")}
                  />
                  {formik.touched.driverId && formik.errors.driverId && (
                    <div className="invalid-feedback">
                      {formik.errors.driverId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Driver Photo <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="driverPhoto"
                    className={`form-control ${formik.touched.driverPhoto && formik.errors.driverPhoto
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("driverPhoto")}
                  />
                  {formik.touched.driverPhoto && formik.errors.driverPhoto && (
                    <div className="invalid-feedback">
                      {formik.errors.driverPhoto}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Id Front <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="idFront"
                    className={`form-control ${formik.touched.idFront && formik.errors.idFront
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("idFront")}
                  />
                  {formik.touched.idFront && formik.errors.idFront && (
                    <div className="invalid-feedback">
                      {formik.errors.idFront}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Id Back <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="idBack"
                    className={`form-control ${formik.touched.idBack && formik.errors.idBack
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("idBack")}
                  />
                  {formik.touched.idBack && formik.errors.idBack && (
                    <div className="invalid-feedback">
                      {formik.errors.idBack}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  License Front <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="licenseFront"
                    className={`form-control ${formik.touched.licenseFront && formik.errors.licenseFront
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("licenseFront")}
                  />
                  {formik.touched.licenseFront && formik.errors.licenseFront && (
                    <div className="invalid-feedback">
                      {formik.errors.licenseFront}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  License Back <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="licenseBack"
                    className={`form-control ${formik.touched.licenseBack && formik.errors.licenseBack
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("licenseBack")}
                  />
                  {formik.touched.licenseBack && formik.errors.licenseBack && (
                    <div className="invalid-feedback">
                      {formik.errors.licenseBack}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  DemeritPoint <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="demeritPoint"
                    className={`form-control ${formik.touched.demeritPoint && formik.errors.demeritPoint
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("demeritPoint")}
                  />
                  {formik.touched.demeritPoint && formik.errors.demeritPoint && (
                    <div className="invalid-feedback">
                      {formik.errors.demeritPoint}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Login Type <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="loginType"
                    className={`form-control ${formik.touched.loginType && formik.errors.loginType
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("loginType")}
                  />
                  {formik.touched.loginType && formik.errors.loginType && (
                    <div className="invalid-feedback">
                      {formik.errors.loginType}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            {/* <div className="col-md-6 col-12 mb-2">
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
            </div> */}
          </div>
        </div>
      </form>
    </div>
      )}
    </>
  );
}

export default DriverManagementEdit;