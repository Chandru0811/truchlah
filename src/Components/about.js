import React from "react";
import "../styles/custom.css";
import packers from "../asset/packers.png";
import icon from "../asset/icon.svg";
function Lead() {
  return (
    <div className="container-fluid what" id="About">
      <div className="container">
        <h4 className="text-center" data-aos="fade-up">
          {" "}
          What Are Agency
        </h4>
        <h2 className="text-center" data-aos="fade-down">
          ABOUT US
        </h2>
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-12 go"
          >
            <h4 className="text-center"> We Are Experienced Movers</h4>
            <h2 className="text-center">Focused On Quality</h2>
            <br></br>
            <img id="icons" src={packers} alt="img" data-aos="zoom-out-up" className="img-fluid" />
          </div>

          <div className="col-lg-6 col-md-6 col-12 commit py-5">
            <p id="one">
              Trucklah is strongly committed towards improving the quality of
              life of our partner drivers.
            </p>
            <p id="two">
              Our partners enjoy flexible working hours, increased earnings and{" "}
              <br></br>an effective work life balance along with additional
              benefits like <br></br>discounted insurance and fuel costs.
            </p>
            <li>
              <img src={icon} />
              &nbsp;&nbsp;&nbsp;Full Load Services
            </li>
            <li>
              <img src={icon} />
              &nbsp;&nbsp;&nbsp;Transparent Pricing
            </li>
            <li>
              <img src={icon} />
              &nbsp;&nbsp;&nbsp;Quick & Easy portal
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Lead;
