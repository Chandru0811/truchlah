import React, { useEffect } from "react";
import "../../styles/custom.css";
import { Link, useSearchParams } from "react-router-dom";
import success from "../../asset/tick-unscreen.gif";
import toast from "react-hot-toast";

function Successfull() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const bookingId = searchParams.get("bookingId");

  const bookingIdString = window.location.href.split("bookingId=")[1];
  const secondQueryPart = bookingIdString?.split("?")[1]; 
  const secondParams = new URLSearchParams(secondQueryPart);

  const result = secondParams.get("result");
  const refNo = secondParams.get("refNo");

console.log("result",secondParams)
  useEffect(() => {
    if (result === "success") {
      toast.success("Payment successful!");
    }
  }, []);

  return (
    <section className="Success d-flex justify-content-center align-items-center " style={{minHeight:"80vh"}}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-12">
          <div className="card p-4 text-center cardStyle position-relative" >
            <div className="d-flex justify-content-center align-items-center mb-3 icon-container" >
              <img src={success} className="img-fluid " alt="Success" style={{maxWidth:"250%"}}/>
            </div>
            <h4 className="titleStyle mt-5">Congratulations</h4>
            <span className="smallTextStyle">Booking Id: {bookingId.split("?")[0]}</span>
            <h5 className="mt-4" style={{color:"#1bc24a"}}>
              Order {result === "success" ? "Successful" : "Failed"}
            </h5>
            <p className="mt-2">Thank you so much for your order</p>
            <p>Reference No: {refNo}</p>
            <center>
              <Link to={`/rides?type=${type}`}>
                <button
                  id="button"
                  type="button"
                  className="btn btn-success my-3 successBtn"
                >
                  Done
                </button>
              </Link>
            </center>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

// Styles

const iconContainerStyle = {
width: "70px",
height: "70px",
backgroundColor: "#1bc24a",
borderRadius: "50%",
display: "flex",
justifyContent: "center",
alignItems: "center",
marginBottom: "1rem",
};

export default Successfull;
