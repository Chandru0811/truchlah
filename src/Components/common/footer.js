import React from "react";
import "../../styles/custom.css";
import google from "../../asset/google play.png";
import app from "../../asset/app store.png";
import { FaTwitter, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";

function foot({ isAdmin }) {
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
              {isAdmin ? (
                <></>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="h text-dark  text-decoration-none"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="h text-dark  text-decoration-none"
                    >
                      Log in
                    </Link>
                  </li>
                </>
              )}

              {/* <li>
                <a href="/" className="h text-dark  text-decoration-none">
                  Career
                </a>
              </li> */}
              <li>
                <a
                  href="https://trucklah.com/termsandconditions/index.html"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="https://trucklah.com/privacypolicy/index.html"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">OUR&nbsp;SERVICES</h5>
            <ul className="list-unstyled mb-0 py-2">
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-dark text-decoration-none"
                    >
                      Online Truck
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-dark text-decoration-none"
                    >
                      Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-dark text-decoration-none"
                    >
                      Packers & Movers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-dark text-decoration-none"
                    >
                      Logistics services
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li>
                    <Link
                      to="/login"
                      className="b text-dark text-decoration-none"
                    >
                      Online Truck
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="b text-dark text-decoration-none"
                    >
                      Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="b text-dark text-decoration-none"
                    >
                      Packers & Movers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="b text-dark text-decoration-none"
                    >
                      Logistics services
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0 ">FOLLOW&nbsp;US</h5>
            <br></br>
            <a
              href="https://twitter.com/ecscloudinfote2"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
              rel="noreferrer"
            >
              <FaTwitter className="me-3 " size="25px"></FaTwitter>
            </a>
            <a
              href="https://www.instagram.com/ecscloudinfotech/"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
              rel="noreferrer"
            >
              <RiInstagramFill className="me-3" size="25px"></RiInstagramFill>
            </a>
            <a
              href="https://www.facebook.com/ecscloudinfotechpvtltd"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
              rel="noreferrer"
            >
              <FaFacebookF className="me-3" size="25px"></FaFacebookF>
            </a>
            <a
              href="https://www.linkedin.com/company/ecs-cloud-infotech/"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
              rel="noreferrer"
            >
              <FaLinkedin className="me-3" size="25px"></FaLinkedin>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=6588941306text=welcome%20to%20my%20whatsapp"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
              rel="noreferrer"
            >
              <IoLogoWhatsapp className="me-3" size="25px"></IoLogoWhatsapp>
            </a>
          </div>
          <div className="col-lg-2 col-md-6 py-5 mb-4 mb-md-0 a">
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              {" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.trucklah.trucklah"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
                rel="noreferrer"
              >
                <img src={google} alt="google" className="img-fluid" />
              </a>
            </button>
            <br></br>
            <br></br>

            <img src={app} alt="app" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="text-center p-3 f">
        <hr></hr>
        <p className="text-dark text-decoration-none" href="/">
          2023 © Copyright Trucklah Pte Ltd. All Rights Reserved.&nbsp;
          <a
            href="https://trucklah.com/termsandconditions/index.html"
            target="_blank"
            style={{ textDecoration: "none" }}
            rel="noreferrer"
          >
            Terms & Conditions
          </a>{" "}
          &nbsp;
          <a
            href="https://trucklah.com/privacypolicy/index.html"
            target="_blank"
            style={{ textDecoration: "none" }}
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}
export default foot;
