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
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
// import { GoogleLoginButton } from "react-social-login-buttons";
import { FaSquareFacebook } from "react-icons/fa6";
// import { LoginSocialGoogle } from "reactjs-social-login";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("*Email is required"),

  password: Yup.string()
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one Special Case Character"
    // )
    .required("*Please Enter your password"),
});

function Login({ handleLogin, handleAdminLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  // const [profile, setProfile] = useState(null);
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
      // if (data.username === "admin@gmail.com" && data.password === "12345678") {
      //   toast.success("Login Successful!");
      //   navigate("/");
      //   resetForm();
      //   handleAdminLogin();
      // } else {
      try {
        const response = await userApi.post(`user/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          if (response.data.responseBody.roles[0] === "ROLE_ADMIN") {
            toast.success("Login Successful!");
            navigate("/");
            resetForm();
            handleAdminLogin();
          } else {
            toast.success("Login Successful!");
            navigate("/shift");
            resetForm();
            handleLogin();
          }
          sessionStorage.setItem("userId", response.data.responseBody.userId);
          sessionStorage.setItem("roles", response.data.responseBody.roles[0]);
          sessionStorage.setItem("token", response.data.responseBody.token);
          sessionStorage.setItem(
            "username",
            response.data.responseBody.username
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data.errorList[0].errorMessage)
          if(error.response.data.errorList[0].countryCode){  
          const mobileNos = error.response.data.errorList[0].mobileNo;
          const mobileNo = `${error.response.data.errorList[0].countryCode}${mobileNos}`;
          try {
            const otpResponse = await userApi.post(
              `user/sendOTP?phone=${mobileNo}`
            );
            if (otpResponse.status === 200) {
              navigate("/otp", { state: { mobileNo } });
            }
          } catch (error) {
            console.log(error);
          }
          }
        } else {
          toast.error(error.response.data.errorList[0].errorMessage);
        }
      }
      // }
    },
  });

  // const handleLoginSuccess = async (credentialResponse) => {
  //   // console.log(credentialResponse);
  //   try {
  //     const data = {
  //       token: credentialResponse.credential,
  //     };
  //     const response = await userApi.post("/user/signWithGoogle", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(response.data.responseBody);
  //     if (response.status === 200) {
  //       toast.success("Login Successful!");
  //       navigate("/shift");
  //       handleLogin();
  //       sessionStorage.setItem("userId", response.data.responseBody.userId);
  //       sessionStorage.setItem("roles", response.data.responseBody.roles[0]);
  //       sessionStorage.setItem("token", response.data.responseBody.token);
  //       sessionStorage.setItem("username", response.data.responseBody.username);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response?.status === 400) {
  //       toast.warning(error.response.data.errorList[0].errorMessage);
  //     } else {
  //       toast.error(error.message);
  //     }
  //   }
  // };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    // console.log("Google Login Response:", decodedToken);

    const payload = {
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      email: decodedToken.email,
      profileImage: decodedToken.picture,
      loginType: "google",
    };
    // console.log("Payload :", payload);

    try {
      const response = await userApi.post("/user/signWithGoogle", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        sessionStorage.setItem("userId", response.data.responseBody.userId);
        sessionStorage.setItem("roles", response.data.responseBody.roles[0]);
        sessionStorage.setItem("token", response.data.responseBody.token);
        sessionStorage.setItem("username", response.data.responseBody.username);
        if (response.data.responseBody.mobileVerified==="N"){
          navigate(`/mobile/verify`)
        }else{
          toast.success("Login Successful!");
          navigate("/shift");
          handleLogin();
        }
        
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
      loginType: "google",
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
    //     sessionStorage.setItem("userId", response.data.responseBody.userId);
    //     sessionStorage.setItem("roles", response.data.responseBody.roles[0]);
    //     sessionStorage.setItem("token", response.data.responseBody.token);
    //     sessionStorage.setItem("username", response.data.responseBody.username);
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
              <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12 d-flex flex-column align-items-center">
                <p className="LoginContent">
                  <b>Get started with your free account</b>
                </p>

                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  className="googleLogin"
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
                  <form onSubmit={formik.handleSubmit} className="pt-2">
                    <div className="form mb-3 d-flex justify-content-center">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email / Mobile No"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          className={`form-control  ${
                            formik.touched.username && formik.errors.username
                              ? ""
                              : ""
                          }`}
                          {...formik.getFieldProps("username")}
                          placeholder="Enter your email"
                        />
                        {formik.touched.username && formik.errors.username && (
                          <div className="text-danger">
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
                              ? ""
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
                              top: "calc(45% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <RiEyeLine
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(45% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">
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
