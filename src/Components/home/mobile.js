import React from "react";
import "../../styles/custom.css";
import mobile from "../../asset/mobile.png";
import google from "../../asset/google play.png";
import app from "../../asset/app store.png";
function mob() {
  const navigateToGooglePlayStore = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.trucklah.trucklah",
      "_blank"
    );
  };
  return (
    <div className="container-fluid me">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12" data-aos="zoom-in">
            <img id="one" src={mobile} alt="img" className="img-fluid" />
          </div>
          <div
            className="col-lg-6 col-md-6 col-12"
            id="point"
            data-aos="zoom-in"
          >
            <h4 className="py-5">MOBILE APP</h4>
            <p id="two">
              TRUCKLAH APP enhances workforce <br></br>
              engagement with real time alerts and <br></br>
              notification. Users can keep track of their <br></br>
              schedule, time-off and pay details from their <br></br>
              smartphones.
            </p>
            <p id="three">Download the App and explore.</p>
            <div className="d-flex align-item-center">
              <button
                onClick={navigateToGooglePlayStore}
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={google}
                  alt="Googleplay"
                  className="img-fluid"
                  style={{ width: "200px", height: "73px" }}
                />
              </button>
              &nbsp;&nbsp;&nbsp;
              <img
                src={app}
                alt="AppStore"
                className="img-fluid"
                style={{ width: "200px", height: "63px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default mob;
