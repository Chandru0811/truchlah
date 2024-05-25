import React, { useState } from "react";
import "../../styles/custom.css";
import Logins from "../../asset/Login.png";
import { AiOutlineGoogle } from "react-icons/ai";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Login({ handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      appCode: "TRUCK_USER",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { resetForm }) => {
      console.log("Form submission data:", data);
      data.appCode = "TRUCK_USER";
      try {
        const response = await userApi.post(
          `user/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.responseBody.roles[0]);
        if (response.status === 200) {
          toast.success("Login Successful!");
          navigate("/shift");
          resetForm();
          handleLogin();
          sessionStorage.setItem("userId", response.data.responseBody.userId);
          sessionStorage.setItem("roles", response.data.responseBody.roles[0]);
          sessionStorage.setItem(
            "username",
            response.data.responseBody.username
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed: " + error.message);
      }

      // Pass email and password to onLogin
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
            <h5 className="LoginTitle pb-4">Login</h5>
            <h6 className="LoginSubHead">
              Explore Our Lightning-Fast Truck Delivery Services
            </h6>
            <p className="LoginContent">
              Welcome to our fast and reliable truck delivery platform. Please
              log in to access your account and experience seamless delivery
              services.
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
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form mb-3 d-flex justify-content-center">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          className={`form-control  ${
                            formik.touched.username && formik.errors.username
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("username")}
                          placeholder="Enter your email"
                        />
                        {formik.touched.username && formik.errors.username && (
                          <div className="invalid-feedback">
                            {formik.errors.username}
                          </div>
                        )}
                      </FloatingLabel>
                    </div>
                    <div className="form mb-3 d-flex justify-content-center">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("password")}
                          placeholder="Enter your password"
                        />
                        {showPassword ? (
                          <RiEyeOffLine
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(50% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <RiEyeLine
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(50% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        )}
                      </FloatingLabel>
                    </div>
                    <div className="text-end">
                      <p>
                        <Link to="/forgetpassword">Forget Password</Link>
                      </p>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary py-2"
                        style={{ width: "100%" }}
                        id="VehicleButton"
                      >
                        Login{" "}
                      </button>
                    </div>
                  </form>
                  <p className="mt-4">
                    Create a new account <Link to="/register">Register</Link>
                  </p>
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

export default Login;
