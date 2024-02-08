import React from "react";
import "../../styles/custom.css";
import HeroImg from "../../asset/TrucklahHeroImage.png";
// import HeroVideoImg from "../../asset/HeroVideoImage-removebg-preview.png";
// import { Link } from "react-router-dom";

function Section1() {
  const navigateToGooglePlayStore = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.ecscloudinfotech.trucklah",
      "_blank"
    );
  };
  return (
    <section id="Hero">
      <div className="container-fluid">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-lg-1 col-md-1 col-12" data-aos="fade-up"></div>
          <div className="col-lg-5 col-md-5 col-12 ">
            <div data-aos="fade-right">
              <h2 className="py-4" id="HeroHed">
                You Move On, While We Move Out
              </h2>
              <p className="px-4 py-2" id="HeroTex">
                Trucklah Online Truck Booking platform with affordable rental
                services together with great discount offers and transparent
                pricings.
              </p>
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-5 col-6 py-2 text-center">
                  <button
                    className="btn btn-primary"
                    id="HeroBtn"
                    onClick={navigateToGooglePlayStore}
                  >
                    Dowload App
                  </button>
                </div>
                {/* <div className="col-lg-4 col-6 py-2 text-center">
                  <Link to="/shift">
                    <button className="btn btn-primary" id="HeroBtn">
                      Get Started !
                    </button>
                  </Link>
                </div>
                <div className="col-lg-3 col-12 py-2 text-center">
                  <img
                    src={HeroVideoImg}
                    alt="HeroImg"
                    className="img-fluid"
                  ></img>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div data-aos="fade-down">
              <img src={HeroImg} alt="HeroImg" className="img-fluid"></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Section1;
