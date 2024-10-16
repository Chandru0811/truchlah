import React, { useRef, useState, useEffect } from "react";
import Logins from "../../asset/Login.png";
import { Button, Form } from "react-bootstrap";
// import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../config/URL";
import handleLoginMethod from "./handleLoginMethod";

function MailOTP({ handleLogin, handleAdminLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { mailId } = location.state || {};
  const [otp, setOtp] = useState(Array(6).fill(""));

  const inputRefs = useRef([]);

//   useEffect(() => {
//     if (!mobileNo) {
//       toast.warning("Mobile number is not provided");
//       navigate("/login");
//     }
//   }, [mobileNo, navigate]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const regex = /^[0-9\b]+$/;

    if (value === "" || regex.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

//   const Resendotp = async () => {
//     try {
//       const response = await userApi.post(`user/resendOTP?phone=${mobileNo}`);
//       if (response.status === 200) {
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred");
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const formData = new FormData();
    formData.append("email", mailId);
    formData.append("otpCode", otpValue);
    // navigate("/resetpassword")
    try {
      const response = await userApi.post(`user/verifyEmailOTP`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        const token=response.data.token;
        navigate("/resetpassword",{state:{mailId,token}} )
        // const responseNavigate = handleLoginMethod(response.data.responseBody,handleLogin, handleAdminLogin )
        // console.log("responseNavigate",responseNavigate)
        // navigate(responseNavigate);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log("object",error)
    }
  };

  const maskEmail = (mailId) => {
    if (!mailId) return "";
    const [localPart, domain] = mailId.split("@");
    // if (localPart.length <= 4) {
    //   return `${localPart.slice(0, 1)}****${localPart.slice(-1)}@${domain}`;
    // }
    const visibleChars = 2; 
    const maskedLength = localPart.length - visibleChars * 2;
    const maskedPart = "*".repeat(maskedLength);
    return `${localPart.slice(0, visibleChars)}${maskedPart}${localPart.slice(-visibleChars)}@${domain}`;
  };

  return (
    <div className="container-fluid">
      <div
        className="row align-items-center"
        style={{ backgroundColor: "#e6ffe4" }}
      >
        <div
          className="col-lg-4 col-md-4 col-12 py-5 text-center mx-auto"
          style={{ backgroundColor: "#e6ffe4", height: "100%" }}
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
          style={{ backgroundColor: "#fff" }}
        >
          <div className="row">
            <div className="text-center"></div>
            <h5 className="LoginTitle pb-4">OTP Verification</h5>
            <h6 className="LoginSubHead">
              Enter OTP Sent to{" "}
              {/* {mailId
                ? `${mailId.slice(0, 2)}****${mailId?.split("@")[0].slice(-2)}@${mailId?.split("@")[1]}`
                : ""} */}
                {maskEmail(mailId)}
            </h6>
            <hr />
            <div className="row">
              <div className="col-lg-3 col-md-2 col-12"></div>
              <div className="col-lg-6 col-md-8 col-12">
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      {otp.map((value, index) => (
                        <Form.Control
                          key={index}
                          type="text"
                          name={`otp-${index}`}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          value={value}
                          placeholder="*"
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleKeyPress(e, index)}
                          maxLength={1}
                          style={{ width: "50px", marginRight: "10px" }}
                          className="text-center"
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <div>
                    {" "}
                    <div className="d-flex align-items-center justify-content-center">
                      <p style={{ marginBottom: "0px" }}>Didn't Recive OTP?</p>
                      <button
                        className="btn text-primary"
                        type="button"
                        // onClick={Resendotp}
                        style={{ textDecoration: "underline" }}
                      >
                        Resend OTP
                      </button>
                    </div>
                    <Button
                      style={{ width: "100%",backgroundColor:"#333" }}
                      type="submit"
                      variant="primary"
                      className="my-4 border-0"
                    >
                      Submit
                    </Button>
                  </div>
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

export default MailOTP;
