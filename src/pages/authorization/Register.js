import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import Logins from "../../asset/Login.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import { GoogleLoginButton } from "react-socsial-login-buttons";

const checkPasswordComplexity = (password) => {

  if (!password) return "";

  const hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(password);
  const hasLettersAndSpecialCharacter = /^(?=.*[a-zA-Z])(?=.*[^\w\s])[a-zA-Z\d\W_]+$/.test(password);
  const hasNumbersAndSpecialCharacter = /^(?=.*\d)(?=.*[^\w\s])[a-zA-Z\d\W_]+$/.test(password);
  const hasLettersNumbersAndSpecialCharacter = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s])[a-zA-Z\d\W_]+$/.test(password);
  const isOnlyNumbersOrLetters = /^[a-zA-Z]+$|^\d+$/.test(password);

  if (password.length >= 6 && isOnlyNumbersOrLetters) {
    return "Password Strength is Weak";
  }

  if (password.length >= 6 && hasLettersNumbersAndSpecialCharacter) {
    return "Password Strength is Strong";
  }

  if (
    password.length >= 6 &&
    (hasLettersAndNumbers || hasLettersAndSpecialCharacter || hasNumbersAndSpecialCharacter)
  ) {
    return "Password Strength is Medium";
  }

  return "";
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),
  // mobileNo: Yup.string()
  //   .matches(
  //     /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
  //     "*Invalid Phone Number"
  //   )
  //   .required("*Mobile Number is required"),
  countryCode: Yup.string().required("*Country Code is required"),
  mobileNo: Yup.string()
    .required("Mobile number is required")
    .test("phone-length", function (value) {
      const { countryCode } = this.parent;
      if (value && /\s/.test(value)) {
        return this.createError({
          message: "Phone number should not contain spaces",
        });
      }
      if (countryCode === "65") {
        return value && value.length === 8
          ? true
          : this.createError({ message: "Phone number must be 8 digits only" });
      }
      if (countryCode === "91") {
        return value && value.length === 10
          ? true
          : this.createError({
            message: "Phone number must be 10 digits only",
          });
      }
      return true; // Default validation for other country codes
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Please enter your password"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  // refCode: Yup.string().required("*Referral Code is required"),
  termsCondition: Yup.boolean()
    .oneOf([true], "Please accept the terms and conditions")
    .required("Please accept the terms and conditions"),
});

function Register({ handleLogin }) {
  // const [role, setRole] = useState(["User"]);
  const navigate = useNavigate();
  const [Password, setShowPassword] = useState(false);
  const [cPassword, setCShowPassword] = useState(false);

  const showPassword = () => {
    setShowPassword(!Password);
  };
  const confirmShowPassword = () => {
    setCShowPassword(!cPassword);
  };

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
      termsCondition: false,
      agree: "",
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
        termsCondition: values.termsCondition ? "Y" : "N",
      };
      // console.log("values", values);
      try {
        const response = await userApi.post(`user/signup`, payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          const mobileNo = `${values.countryCode}${values.mobileNo}`;
          try {
            const otpResponse = await userApi.post(
              `user/sendOTP?phone=${mobileNo}`
            );
            if (otpResponse.status === 200) {
              navigate("/otp", { state: { mobileNo } });
            }
          } catch (error) {
            toast.error(error);
          }
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.warning(error.response.data.message);
          console.log("object", error);
          const mobileNo = `${values.countryCode}${values.mobileNo}`;
          try {
            const otpResponse = await userApi.post(
              `user/sendOTP?phone=${mobileNo}`
            );
            if (otpResponse.status === 200) {
              navigate("/otp", { state: { mobileNo } });
            }
          } catch (error) {
            toast.error(error);
          }
        } else if (error.response.status === 400) {
          toast.warning(error.response.data.errorList[0].errorMessage);
          console.log("object", error.response.data.errorList[0].errorMessage);
        } else {
          toast.error(error);
        }
      }
    },
  });

  const passwordFeedback = checkPasswordComplexity(formik.values.password);

  useEffect(() => {
    formik.setFieldValue("countryCode", 65);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log("Credential Response:", decodedToken);

    const payload = {
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      email: decodedToken.email,
      profileImage: decodedToken.picture,
    };
    console.log("Payload :", payload);

    try {
      const response = await userApi.post("/user/signWithGoogle", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Login Successful!");
        navigate("/shift");
        handleLogin();
        localStorage.setItem("userId", response.data.responseBody.userId);
        localStorage.setItem("roles", response.data.responseBody.roles[0]);
        localStorage.setItem("token", response.data.responseBody.token);
        localStorage.setItem("username", response.data.responseBody.username);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warning(error.response.data.errorList[0].errorMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleFaceBookLoginSuccess = async (response) => {
    console.log("FaceBook Login Response:", response);
    const payload = {
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      profileImage: response.data.picture.data.url,
    };
    console.log("Payload :", payload);
    // try {
    //   const response = await userApi.post("/user/signWithGoogle", payload, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (response.status === 200) {
    //     toast.success("Login Successful!");
    //     navigate("/shift");
    //     handleLogin();
    //     localStorage.setItem("userId", response.data.responseBody.userId);
    //     localStorage.setItem("roles", response.data.responseBody.roles[0]);
    //     localStorage.setItem("token", response.data.responseBody.token);
    //     localStorage.setItem("username", response.data.responseBody.username);
    //   } else {
    //     toast.error(response.data.message);
    //   }
    // } catch (error) {
    //   if (error.response?.status === 400) {
    //     toast.warning(error.response.data.errorList[0].errorMessage);
    //   } else {
    //     toast.error(error.message);
    //   }
    // }
  };

  return (
    <div className="container-fluid">
      <div
        className="row align-items-center"
        style={{
          backgroundColor: "#e6ffe4",
        }}
      >
        <div
          className="col-lg-4 col-md-4 col-12 py-5 text-center mx-auto"
          style={{
            backgroundColor: "#e6ffe4",
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
              <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12 d-flex flex-column align-items-center">
                <p className="LoginContent">
                  <b>Get started with your free account</b>
                </p>

                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                ></GoogleLogin>

                {/* <LoginSocialFacebook
                  appId="386027390559424"
                  onResolve = {handleFaceBookLoginSuccess}
                  onReject={(error) => {
                    console.log(error);
                  }}
                >
                  <button
                    className="btn text-white px-2 py-1 my-2"
                    style={{ background: "#3b5998", width:"100%"}}
                  >
                    <FaSquareFacebook className="text-white me-2 fs-3" />
                    Log in with Facebook
                  </button>
                </LoginSocialFacebook> */}
              </div>
            </div>
            <div className="row">
              <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12">
                <div className="or-line-container py-3">
                  <div className="or-line"></div>
                  <span className="or-line-text">
                    <b>OR</b>
                  </span>
                  <div className="or-line"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>

              <div className="col-lg-6 col-md-8 col-12">
                <div className="text-center">
                  {/* <p className="LoginContent">
                    <b>Get started with your free account</b>
                  </p> */}
                  {/* <button className="btn btn-danger" style={{ width: "100%" }}>
                    <AiOutlineGoogle style={{ fontSize: "30px" }} /> Sign in
                    with Google
                  </button> */}
                  {/* <div className="or-line-container py-3">
                    <div className="or-line"></div>
                    <span className="or-line-text">
                      <b>OR</b>
                    </span>
                    <div className="or-line"></div>
                  </div> */}
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
                          className={`form-control  ${formik.touched.firstName && formik.errors.firstName
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
                          className={`form-control  ${formik.touched.lastName && formik.errors.lastName
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
                          Email <span className="errmsg">*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          className={`form-control  ${formik.touched.email && formik.errors.email
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
                          Mobile Number <span className="errmsg">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <select
                              name="countryCode"
                              id="countryCode"
                              className={`form-control ${formik.touched.countryCode &&
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
                            className={`form-control ${formik.touched.mobileNo && formik.errors.mobileNo
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
                      <label className="form-label">
                        Password <span className="errmsg">*</span>
                      </label>
                      <div className={`input-group mb-3`}
                        id="password">
                        <input
                          type={Password ? "text" : "password"}
                          className={`form-control ${formik.touched.password && formik.errors.password
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
                      {passwordFeedback && (
                        <div>
                          {/* Progress Bar */}
                          <div className="progress" style={{ height: "5px", marginTop: "8px" }}>
                            <div
                              className={`progress-bar ${passwordFeedback === "Password Strength is Weak"
                                ? "bg-danger"
                                : passwordFeedback === "Password Strength is Medium"
                                  ? "bg-warning"
                                  : passwordFeedback === "Password Strength is Strong"
                                    ? "bg-success"
                                    : ""
                                }`}
                              role="progressbar"
                              style={{
                                width:
                                  passwordFeedback === "Password Strength is Weak"
                                    ? "30%"
                                    : passwordFeedback === "Password Strength is Medium"
                                      ? "60%"
                                      : passwordFeedback === "Password Strength is Strong"
                                        ? "100%"
                                        : "0%",
                              }}
                              aria-valuenow={
                                passwordFeedback === "Password Strength is Weak"
                                  ? "30"
                                  : passwordFeedback === "Password Strength is Medium"
                                    ? "60"
                                    : passwordFeedback === "Password Strength is Strong"
                                      ? "100"
                                      : "0"
                              }
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {passwordFeedback === "Password Strength is Weak"
                                ? ""
                                : passwordFeedback === "Password Strength is Medium"
                                  ? ""
                                  : passwordFeedback === "Password Strength is Strong"
                                    ? ""
                                    : ""}
                            </div>
                          </div>
                          {/* Feedback Message */}
                          <div
                            style={{
                              marginTop: "8px",
                              color:
                                passwordFeedback === "Password Strength is Weak"
                                  ? "red"
                                  : passwordFeedback === "Password Strength is Medium"
                                    ? "orange"
                                    : passwordFeedback === "Password Strength is Strong"
                                      ? "green"
                                      : "black",
                            }}
                          >
                            {passwordFeedback}
                          </div>
                        </div>
                      )}

                    </div>
                    <div className="col-lg-6 col-12 pb-2">
                      <label className="form-label">
                        Confirm Password <span className="errmsg">*</span>
                      </label>
                      <div className={`input-group mb-3`}
                      id="password">
                        <input
                          type={cPassword ? "text" : "password"}
                          className={`form-control ${formik.touched.confirmPassword &&
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
                        <label>Referal Code</label>
                        <input
                          type="text"
                          name="refCode"
                          className={`form-control  ${formik.touched.refCode && formik.errors.refCode
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
                  <div className="form-check mb-3">
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
                      checked={formik.values.termsCondition}
                    />
                    &nbsp;
                    <label className="" htmlFor="termsCheckbox">
                      I agree to Terms and Conditions
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
                      id="privacyCheckbox"
                      className={`form-check-input  ${formik.touched.agree && formik.errors.agree
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("agree")}
                    />
                    &nbsp; &nbsp;
                    <label
                      className="form-check-label "
                      htmlFor="privacyCheckbox"
                    >
                      I consent to the use of data entered for promotional
                      purpose by Trucklah.com in accordance with the Privacy
                      Policy
                    </label>
                    {formik.touched.agree && formik.errors.agree && (
                      <div className="invalid-feedback">
                        {formik.errors.agree}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="login-btn-2 w-100 rounded-3"
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
