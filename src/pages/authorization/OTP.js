import React, { useRef, useState } from "react";
import Logins from "../../asset/Login.png";
import { Button, Form } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../config/URL";
// import OTPIMG from '../asset/OTP.png';

function OTP() {
  const location = useLocation();
  const { mobileNo } = location.state || {};
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showOtp, setShowOtp] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const regex = /^[0-9\b]+$/; // Accepts only numbers

    if (value === "" || regex.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // Move to next input box
      }
    }
  };

  const handleKeyPress = (e, index) => {
    const key = e.key;
    if (key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus(); // Move to previous input box
    }
  };

  const handleToggleShowOtp = () => {
    setShowOtp(!showOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    // Perform validation or submit logic here
    console.log("Submitted OTP:", otp.join(""));
    const formData = new FormData();
    formData.append("phone", mobileNo);
    formData.append("otp", otpValue);
    try {
      const response = await userApi.post(`user/verifyotp}`);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  console.log("object", mobileNo);
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
            <div className="text-center">
              {/* <img src={OTPIMG} alt="Trucklah" className="img-fluid" style={{width: '20%', height: '100'}}/> */}
            </div>
            <h5 className="LoginTitle pb-4">OTP Verification</h5>
            <h6 className="LoginSubHead">
              Enter OTP Sent to{" "}
              {`+${mobileNo.slice(0, 6)}****${mobileNo.slice(10, 12)}`}
            </h6>

            <hr></hr>
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>

              <div className="col-lg-6 col-md-8 col-12">
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      {otp.map((value, index) => (
                        <Form.Control
                          key={index}
                          type={showOtp ? "text" : "password"}
                          name={`otp-${index}`}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          value={value}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleKeyPress(e, index)}
                          maxLength={1}
                          style={{ width: "50px", marginRight: "10px" }}
                          className="text-center"
                        />
                      ))}
                      <Button variant="light" onClick={handleToggleShowOtp}>
                        {showOtp ? <BsEyeSlash /> : <BsEye />}
                      </Button>
                    </div>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-4">
                    Submit
                  </Button>
                </Form>
              </div>

              <div className="col-lg-3 col-md-2 col-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
