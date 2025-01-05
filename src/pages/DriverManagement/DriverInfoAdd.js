import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";

const DriverInfoAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [cPasswordVisible, setCPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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
      email: Yup.string()
        .email("*Invalid email format")
        .required("*Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .matches(/^\S*$/, "Password must not contain spaces")
        .required("Please enter your password"),

      cPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      // refCode: Yup.string().required("*Referral code is required"),
      // termsCondition: Yup.string().required(
      //   "*Terms and conditions must be accepted"
      // ),
      driverPhoto: Yup.mixed().required("Driver Photo is required"),
      idFront: Yup.mixed().required("ID Front is required"),
      idBack: Yup.mixed().required("ID Back is required"),
      licenseFront: Yup.mixed().required("License Front is required"),
      licenseBack: Yup.mixed().required("License Back is required"),
      demeritPoint: Yup.number()
        .typeError("*Demerit point must be a number")
        .notRequired(),
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
        driverPhoto: null,
        idFront: null,
        idBack: null,
        licenseFront: null,
        // licenseBack: null,
        // demeritPoint: "",
        // loginType: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("drivermanagement:", values);

        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("countryCode", values.countryCode);
        formData.append("mobileNo", values.mobileNo);
        formData.append("email", values.email);
        formData.append("password", values.password);
        // formData.append("refCode", values.refCode);
        // formData.append("termsCondition", values.termsCondition ? 'true' : 'false');
        // formData.append("demeritPoint", values.demeritPoint);
        // formData.append("loginType", values.loginType);

        if (values.driverPhoto) {
          formData.append("driverPhoto", values.driverPhoto);
        }
        if (values.idFront) {
          formData.append("idFront", values.idFront);
        }
        if (values.idBack) {
          formData.append("idBack", values.idBack);
        }
        if (values.licenseFront) {
          formData.append("licenseFront", values.licenseFront);
        }
        if (values.licenseBack) {
          formData.append("licenseBack", values.licenseBack);
        }

        setLoadIndicators(true);
        try {
          const response = await driverApi.post(
            `driver/createDriverByAdmin`,
            formData
          );
          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({
              ...prv,
              driverId: response.data.responseBody.driverId,
            }));
            handleNext();
            //   navigate("/drivermanagement");
          }
        } catch (error) {
          console.log(error?.response?.data?.serviceErrorList[0]?.errorMessage);
          toast.error(error?.response?.data?.serviceErrorList[0]?.errorMessage);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const toggleCPasswordVisibility = () => {
      setCPasswordVisible(!cPasswordVisible);
    };

    useImperativeHandle(ref, () => ({
      driverPersonalAdd: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid px-2 pb-2  m-0">
        <form onSubmit={formik.handleSubmit}>
          {/* <div className="card shadow border-0 my-2"> */}
          <div className="container mb-2">
            <div className="row py-4">
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
                      style={{ maxWidth: "80px" }} // Adjust width as needed
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
                  Password <span className="text-danger">*</span>
                </label>
                <div className="mb-3 input-group">
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
                    style={{ border: "1px solid #dee2e6" }}
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
                <div className="mb-3 input-group">
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
                    style={{ border: "1px solid #dee2e6" }}
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
              {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Reference Code 
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
              </div> */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Driver Photo <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="driverPhoto"
                    accept="image/jpeg, image/png, application/pdf"
                    className={`form-control ${
                      formik.touched.driverPhoto && formik.errors.driverPhoto
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) =>
                      formik.setFieldValue("driverPhoto", e.target.files[0])
                    }
                  />
                  {formik.touched.driverPhoto && formik.errors.driverPhoto && (
                    <div className="invalid-feedback">
                      {formik.errors.driverPhoto}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2"></div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  ID Front <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file" accept="image/jpeg, image/png, application/pdf"
                    name="idFront"
                    className={`form-control ${
                      formik.touched.idFront && formik.errors.idFront
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) =>
                      formik.setFieldValue("idFront", e.target.files[0])
                    }
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
                  ID Back <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file" accept="image/jpeg, image/png, application/pdf"
                    name="idBack"
                    className={`form-control ${
                      formik.touched.idBack && formik.errors.idBack
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) =>
                      formik.setFieldValue("idBack", e.target.files[0])
                    }
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
                    type="file" accept="image/jpeg, image/png, application/pdf"
                    name="licenseFront"
                    className={`form-control ${
                      formik.touched.licenseFront && formik.errors.licenseFront
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) =>
                      formik.setFieldValue("licenseFront", e.target.files[0])
                    }
                  />
                  {formik.touched.licenseFront &&
                    formik.errors.licenseFront && (
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
                    type="file" accept="image/jpeg, image/png, application/pdf"
                    name="licenseBack"
                    className={`form-control ${
                      formik.touched.licenseBack && formik.errors.licenseBack
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) =>
                      formik.setFieldValue("licenseBack", e.target.files[0])
                    }
                  />
                  {formik.touched.licenseBack && formik.errors.licenseBack && (
                    <div className="invalid-feedback">
                      {formik.errors.licenseBack}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Demerit Points <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="number"
                    name="demeritPoint"
                    className={`form-control ${
                      formik.touched.demeritPoint && formik.errors.demeritPoint
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("demeritPoint")}
                  />
                  {formik.touched.demeritPoint &&
                    formik.errors.demeritPoint && (
                      <div className="invalid-feedback">
                        {formik.errors.demeritPoint}
                      </div>
                    )}
                </div>
              </div> */}
              {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Login Type <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <select
                    name="loginType"
                    className={`form-select ${
                      formik.touched.loginType && formik.errors.loginType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("loginType")}
                  >
                    <option value=""></option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                  {formik.touched.loginType && formik.errors.loginType && (
                    <div className="invalid-feedback">
                      {formik.errors.loginType}
                    </div>
                  )}
                </div>
              </div> */}
              {/* <div className="col-md-12 col-12 mb-2">
                <label className="form-label">Terms Condition</label>
                <div className="form-check  d-flex ">
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
                </div>
                  {formik.touched.termsCondition &&
                    formik.errors.termsCondition && (
                      <small className="text-danger">
                        {formik.errors.termsCondition}
                      </small>
                    )}
              </div> */}
            </div>
          </div>
          {/* </div> */}
        </form>
      </div>
    );
  }
);

export default DriverInfoAdd;
