import React, { useState } from "react";
import "../styles/custom.css";
import Logins from "../asset/Login.png";
import { AiOutlineGoogle } from "react-icons/ai";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handelLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successfull !");
      } else {
        setMessage("wrong User Name or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again");
    }
  }

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
                  <form>
                    <div className="form mb-3 d-flex justify-content-center">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your name"
                        />
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                      </FloatingLabel>
                    </div>
                    <div className="text-end">
                      <p>
                       <Link to="/forgetpassword">Forget Password</Link>
                      </p>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary py-2"
                        style={{ width: "100%" }}
                        id="VehicleButton"
                        onClick={handelLogin}
                      >
                        Login{" "}
                      </button>
                      {message && <p>{message}</p>}
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
