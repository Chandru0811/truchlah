import React, { useEffect, useState } from "react";
import Logins from "../../asset/Login.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { mailId, token } = location.state || {};
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const ConfirmPasswordVisibility = () => {
    setConfirmPassword(!confirmPassword);
  };
  const checkPasswordComplexity = (password) => {

    if (!password) return "";

    const isOnlyNumbersOrLetters = /^[a-zA-Z]+$|^\d+$/.test(password);
    if (password.length < 6 || isOnlyNumbersOrLetters) {
      return "Password Strength is Weak";
    }

    const hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(password);
    const hasLettersAndSpecialCharacter = /^(?=.*[a-zA-Z])(?=.*[^\w\s])[a-zA-Z\d\W_]+$/.test(password);
    const hasNumbersAndSpecialCharacter = /^(?=.*\d)(?=.*[^\w\s])[a-zA-Z\d\W_]+$/.test(password);
    const hasLettersNumbersAndSpecialCharacter = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s])[a-zA-Z\d\W_]+$/.test(password);

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
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*Enter a valid email address"
      )
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/^\S*$/, "Password must not contain spaces")
      .required("Please enter your password"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      setLoading(true);
      const formData = new FormData();
      formData.append("token", token);
      formData.append("email", mailId);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      try {
        const response = await userApi.post(
          `user/forgotPasswordForEmailOTP`,
          formData
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Submitting Data, ", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const passwordFeedback = checkPasswordComplexity(formik.values.password);

  useEffect(() => {
    formik.setFieldValue("email", mailId);
  }, []);
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
            <div className="text-center"></div>
            <h5 className="LoginTitle pb-4">Forgot Password</h5>
            <h6 className="LoginSubHead">
              Your new password must be different from previously used Password
            </h6>

            <hr></hr>
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>
              <div className="col-lg-6 col-md-8 col-12">
                <div className="text-center">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form mb-3 ">
                      <div className="form d-flex justify-content-center">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email"
                          style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                          className="mb-3"
                        >
                          <Form.Control
                            type="email"
                            readOnly
                            className={`form-control  ${formik.touched.email && formik.errors.email
                              ? ""
                              : ""
                              }`}
                            {...formik.getFieldProps("email")}
                            placeholder="Enter your name"
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div className="text-danger text-start">
                              {formik.errors.email}
                            </div>
                          )}
                        </FloatingLabel>
                      </div>
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
                            className={`form-control ${formik.touched.password && formik.errors.password
                              ? ""
                              : ""
                              }`}
                            {...formik.getFieldProps("password")}
                          />
                          {showPassword ? (
                            <RiEyeOffLine
                              onClick={PasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(50% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <RiEyeLine
                              onClick={PasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(50% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          )}
                          {formik.touched.password &&
                            formik.errors.password && (
                              <div className="text-danger text-start">
                                {formik.errors.password}
                              </div>
                            )}
                        </FloatingLabel>
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
                      <div className="">
                        <FloatingLabel
                          controlId="floatingConfirmPassword"
                          label="Confirm Password"
                          style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                          className="mb-3"
                        >
                          <Form.Control
                            type={confirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`form-control ${formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                              ? ""
                              : ""
                              }`}
                            {...formik.getFieldProps("confirmPassword")}
                          />
                          {confirmPassword ? (
                            <RiEyeOffLine
                              onClick={ConfirmPasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(50% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <RiEyeLine
                              onClick={ConfirmPasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(50% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          )}
                          {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                              <div className="text-danger text-start">
                                {formik.errors.confirmPassword}
                              </div>
                            )}
                        </FloatingLabel>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary py-2 border-0"
                        style={{ width: "100%", backgroundColor: "#333" }}
                        id="registerButton"
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        )}
                        Reset Password
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
};

export default ResetPassword;
