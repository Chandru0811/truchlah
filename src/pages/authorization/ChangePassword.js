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

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [oldPassword, setConfirmOldPassword] = useState(false);
  const userName = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const PasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const ConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setConfirmPassword(!confirmPassword);
  };

  const ConfirmOldPasswordVisibility = (e) => {
    e.preventDefault();
    setConfirmOldPassword(!oldPassword);
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .matches(
    //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //     "*Enter a valid email address"
    //   )
    //   .required("*Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/^\S*$/, "Password must not contain spaces")
      .required("Please enter your password"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    // oldPassword: Yup.string()
    //   .min(8, "Password must be at least 8 characters long")
    //   .matches(/^\S*$/, "Password must not contain spaces")
    //   .required("Please enter your Current password"),
  });
  console.log("userName", userName)

  const formik = useFormik({
    initialValues: {
      email: userName,
      password: "",
      confirmPassword: "",
      // oldPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const response = await userApi.post(`user/newPassword`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/shift");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.warning("Password Mismatch, ", error);
      }
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
            height: "100%", // Set height to 100% to fill the container
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
            <h5 className="LoginTitle pb-4">Change Password</h5>
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
                            type="text"
                            value={userName}
                            readOnly
                            className="form-control"
                            style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
                          />
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
                            placeholder="Enter your new password"
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
                                top: "calc(35% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <RiEyeLine
                              onClick={PasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(35% - 8px)",
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
                                top: "calc(35% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <RiEyeLine
                              onClick={ConfirmPasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(35% - 8px)",
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
                      </div>
                      {/* <div className="">
                        <FloatingLabel
                          controlId="floatingOldPassword"
                          label="Old Password"
                          style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                          className="mb-3"
                        >
                          <Form.Control
                            type={oldPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            className={`form-control ${formik.touched.oldPassword &&
                              formik.errors.oldPassword
                              ? ""
                              : ""
                              }`}
                            {...formik.getFieldProps("oldPassword")}
                          />
                          {oldPassword ? (
                            <RiEyeOffLine
                              onClick={ConfirmOldPasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(35% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <RiEyeLine
                              onClick={ConfirmOldPasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "calc(35% - 8px)",
                                cursor: "pointer",
                              }}
                            />
                          )}
                          {formik.touched.oldPassword &&
                            formik.errors.oldPassword && (
                              <div className="text-danger">
                                {formik.errors.oldPassword}
                              </div>
                            )}
                        </FloatingLabel>
                      </div> */}
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary py-2"
                        style={{ width: "100%" }}
                        id="registerButton"
                        type="submit"
                      >
                        Save
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
export default ChangePassword;
