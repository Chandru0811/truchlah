import React, { useState } from "react";
import Logins from "../../asset/Login.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // const PasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  // const ConfirmPasswordVisibility = () => {
  //   setConfirmPassword(!confirmPassword);
  // };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*Enter a valid email address"
      )
      .required("*Email is required"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .min(6, "Password must be at least 6 characters"),
    // confirmPassword: Yup.string()
    //   .required("Confirm Password is required")
    //   .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      // password: "",
      // confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      setLoading(true)
      // For test
      // const mailId="premvp24@gmail.com"
      // navigate("/mailotp",{state:{mailId}})
      try {
        const response = await userApi.post(`user/sendEmailOTP?email=${values.email}`);
        if (response.status === 200) {
          toast.success(response.data.message);
          const mailId=values.email
          navigate("/mailotp",{state:{mailId}});
          
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Submitting Data, ", error.response.data.message);
      }finally{
        setLoading(false)
      }
    },
  });

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
          className="col-lg-8 col-md-8 col-12 p-5 "
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="row">
            <div className="text-center"></div>
            <h5 className="LoginTitle pb-4">Forgot Password</h5>
            <h6 className="LoginSubHead">
            Enter the Email and The Reset Link is Sent to the given mail.
            </h6>

            <hr></hr>
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>
              <div className="col-lg-6 col-md-8 col-12">
                <div className="text-center">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form my-3 ">
                      <div className="form d-flex justify-content-center">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email"
                          style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                          className="mb-3"
                        >
                          <Form.Control
                            type="email"
                            className={`form-control  ${
                              formik.touched.email && formik.errors.email
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
                      {/* <div className="">
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="New Password"
                          style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                          className="mb-3"
                        >
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`form-control ${
                              formik.touched.password && formik.errors.password
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
                              <div className="text-danger">
                                {formik.errors.password}
                              </div>
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
                            type={confirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`form-control ${
                              formik.touched.confirmPassword &&
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
                              <div className="text-danger">
                                {formik.errors.confirmPassword}
                              </div>
                            )}
                        </FloatingLabel>
                      </div> */}
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary py-2 border-0"
                        style={{ width: "100%",backgroundColor:"#333" }}
                        id="registerButton"
                      >{loading && <span className="spinner-border spinner-border-sm me-2"></span>}
                        Submit
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
