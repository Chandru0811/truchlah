import React from "react";
import "../../styles/custom.css";
import google from "../../asset/googleLogo.png";
import app from "../../asset/appleLogo.png";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


function foot({ isAuthenticate }) {
  return (
    <footer
      className="text-center text-lg-start"
      style={{ background: "#333", color: "#acff3b" }}
    >
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="">Trucklah Pte Ltd</h5>
            <p className="py-2" style={{ color: "#acff3b" }}>
              <a
                href="https://www.google.com/maps/place/The+Alexcier/@1.2916847,103.8111868,17z/data=!3m2!4b1!5s0x31da1a2cf1b2be13:0x7b0f9d88a36fdfbb!4m6!3m5!1s0x31da1bb95520771b:0xf2b9dfa378aa9a6e!8m2!3d1.2916793!4d103.8137617!16s%2Fg%2F11gyxjfkjk?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
                class="text-decoration-none d-flex justify-content-md-start align-items-center"
                style={{ fontSize: "16px", color: "#acff3b" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ color: "#acff3b" }}>
                  The Alexcier,<br></br>
                  237 Alexandra Road, #04-10,<br></br>
                  Singapore-159929.
                </span>
              </a>
              <br></br>
              <br></br>
              <a
                href="tel:+6588941306"
                class="text-decoration-none d-flex justify-content-md-start align-items-center"
                style={{ fontSize: "16px", color: "#acff3b" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Phone </b> +65 8894 1306<br></br>
              </a>
              <br />
              <a
                href="mailto:info@trucklah.com"
                class="text-decoration-none d-flex justify-content-md-start align-items-center"
                style={{ fontSize: "16px", color: "#acff3b" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b> Email </b>: info@trucklah.com
              </a>
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0 help">Help</h5>
            <ul
              className="list-unstyled mb-0 py-3"
              style={{ color: "#acff3b" }}
            >
              {isAuthenticate ? (
                <></>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="h  text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="h  text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://uat.trucklah.com/contact_us.html"
                      className="h text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Contact Us
                    </Link>
                  </li>
                </>
              )}
              <li>
                <a
                  href="https://trucklah.com/termsandconditions/index.html"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#acff3b" }}
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="https://trucklah.com/privacypolicy/index.html"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#acff3b" }}
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">OUR&nbsp;SERVICES</h5>
            <ul
              className="list-unstyled mb-0 py-2"
              style={{ color: "#acff3b" }}
            >
              {isAuthenticate ? (
                <>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Online Truck Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Packers & Movers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shift"
                      className="b text-decoration-none"
                      style={{ color: "#acff3b" }}
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
                      className="b text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Online Truck Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="b text-decoration-none"
                      style={{ color: "#acff3b" }}
                    >
                      Packers & Movers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="b text-decoration-none"
                      style={{ color: "#acff3b" }}
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
              style={{ textDecoration: "none", color: "#acff3b" }}
              rel="noreferrer"
            >
              <FaXTwitter className="me-3 " size="25px"></FaXTwitter>
            </a>
            <a
              href="https://www.instagram.com/ecscloudinfotech/"
              target="_blank"
              style={{ textDecoration: "none", color: "#acff3b" }}
              rel="noreferrer"
            >
              <RiInstagramFill className="me-3" size="25px"></RiInstagramFill>
            </a>
            <a
              href="https://www.facebook.com/ecscloudinfotechpvtltd"
              target="_blank"
              style={{ textDecoration: "none", color: "#acff3b" }}
              rel="noreferrer"
            >
              <FaFacebookF className="me-3" size="25px"></FaFacebookF>
            </a>
            <a
              href="https://www.linkedin.com/company/ecs-cloud-infotech/"
              target="_blank"
              style={{ textDecoration: "none", color: "#acff3b" }}
              rel="noreferrer"
            >
              <FaLinkedin className="me-3" size="25px"></FaLinkedin>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=6588941306text=welcome%20to%20my%20whatsapp"
              target="_blank"
              style={{ textDecoration: "none", color: "#acff3b" }}
              rel="noreferrer"
            >
              <IoLogoWhatsapp className="me-3" size="25px"></IoLogoWhatsapp>
            </a>
            <a
              href="https://www.tiktok.com/@ecsaio"
              target="_blank"
              style={{ textDecoration: "none", color: "#acff3b" }}
              rel="noreferrer"
            >
              <FaTiktok className="me-3" size="25px"></FaTiktok>
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
                <img
                  src={google}
                  alt="google"
                  className="img-fluid p-0"
                  style={{ border: "2px solid #acff3b", borderRadius: "8px" }}
                />
              </a>
            </button>
            <br></br>
            <br></br>

            <img
              src={app}
              alt="app"
              className="img-fluid p-0"
              style={{ border: "2px solid #acff3b", borderRadius: "8px" }}
            />
          </div>
        </div>
      </div>

      <div className="text-center p-3 f">
        <hr style={{ color: "#acff3b" }}></hr>
        <p
          className="text-decoration-none"
          href="/"
          style={{ color: "#acff3b" }}
        >
          2024 © Copyright Trucklah Pte Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
export default foot;
