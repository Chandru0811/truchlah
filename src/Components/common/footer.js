import React from "react";
import "../../styles/custom.css";
import google from "../../asset/google play.png";
import app from "../../asset/app store.png";
import { FaTwitter, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

function foot() {
  const navigateToGooglePlayStore = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.ecscloudinfotech.trucklah",
      "_blank"
    );
  };
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="">Trucklah Pte Ltd</h5>
            <p className="py-2">
              <span>
                The Alexcier,<br></br>
                237 Alexandra Road, #04-10,<br></br>
                Singapore-159929.
              </span>
              <br></br>
              <br></br>
              <b>Phone </b> +65 8894 1306<br></br>
              <br />
              <b> Email </b>: raaj@ecscloudinfotech.com
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0 help">Help</h5>
            <ul className="list-unstyled mb-0 py-3">
              <li>
                <a href="/" className="h text-dark  text-decoration-none">
                  Sign up
                </a>
              </li>
              <li>
                <a href="/" className="h text-dark  text-decoration-none">
                  Log in
                </a>
              </li>
              <li>
                <a href="/" className="h text-dark  text-decoration-none">
                  Career
                </a>
              </li>
              <li>
                <a href="/" className="h text-dark  text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">OUR&nbsp;SERVICES</h5>
            <ul className="list-unstyled mb-0 py-2">
              <li>
                <a href="#!" className="b text-dark text-decoration-none">
                  Online Truck
                </a>
              </li>
              <li>
                <a href="#!" className="b text-dark text-decoration-none">
                  Booking
                </a>
              </li>
              <li>
                <a href="#!" className="b text-dark text-decoration-none">
                  Packers & Movers
                </a>
              </li>
              <li>
                <a href="#!" className="b text-dark text-decoration-none">
                  Logistics services
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0 ">FOLLOW&nbsp;US</h5>
            <br></br>

            <FaTwitter className="me-3 " size="35px"></FaTwitter>
            <RiInstagramFill className="me-3" size="35px"></RiInstagramFill>
            <FaFacebookF className="me-3" size="35px"></FaFacebookF>
            <FaLinkedin className="me-3" size="35px"></FaLinkedin>
          </div>
          <div className="col-lg-2 col-md-6 py-5 mb-4 mb-md-0 a">
            <button
              onClick={navigateToGooglePlayStore}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              {" "}
              <img src={google} alt="google" />
            </button>
            <br></br>
            <br></br>
            <a href="/">
              <img src={app} alt="app" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center p-3 f">
        <hr></hr>
        <a className="text-dark text-decoration-none" href="/">
          2023 © Copyright Trucklah Pte Ltd. All Rights Reserved.
        </a>
      </div>
    </footer>
  );
}
export default foot;
