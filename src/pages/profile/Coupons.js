import React, { useState } from "react";
import "../../styles/custom.css";

function Coupon() {
  const [showFirstSection, setShowFirstSection] = useState(true);
  const [showSecondSection, setShowSecondSection] = useState(false);

  const hideFirstSection = () => {
    setShowFirstSection(false);
    setShowSecondSection(true);
  };

  const hideSecondSection = () => {
    setShowFirstSection(true);
    setShowSecondSection(false);
  };

  return (
    <section className="rewards">
      <div className="container-fluid head ">
        <h2 className=" container py-3 my-2" id="hh2">
          {" "}
          REWARDS & COUPONS
        </h2>
        <div className="d-flex justify-content-center but">
          <button className="mx-3" id="coupenBtn" onClick={hideSecondSection}>
            Coupons
          </button>
          <button className="mx-3" id="coupenBtn" onClick={hideFirstSection}>
            Promotion
          </button>
        </div>

        <div className="container-fluid body ">
          {showFirstSection && (
            <div id="first section" className="HideSection py-5">
              <div className="card coupon my-5 container">
                <div className="row card-body container">
                  <div className="col-lg-2 col-md-4 col-12">
                    <p className="dis">Discount</p>
                  </div>
                  <div className="col-lg-8 col-md-6 col-12" id="content">
                    <p className="mb-5">50% Offer</p>
                    <span>
                      Use this code <b>“Trucklah50”</b>
                    </span>
                  </div>
                  <div className="col-lg-2 col-md-2 col-12">
                    <p id="first">For your first <br></br>booking</p>
                  </div>
                </div>
              </div>

              <div className="card coupon my-5 container">
                <div className="row card-body container">
                  <div className="col-lg-2 col-md-4 col-12">
                    <p className="dis">Discount</p>
                  </div>
                  <div className="col-lg-8 col-md-6 col-12" id="content">
                    <p className="mb-5">50% Offer</p>
                    <span>
                      Use this code <b>“Trucklah50”</b>
                    </span>
                  </div>
                  <div className="col-lg-2 col-md-2 col-12">
                    <p id="first">For your first <br></br>booking</p>
                  </div>
                </div>
              </div>
              <div className="card coupon my-5 container">
                <div className="row card-body container">
                  <div className="col-lg-2 col-md-4 col-12 ">
                    <p className="dis">Discount</p>
                  </div>
                  <div className="col-lg-8 col-md-6 col-12" id="content">
                    <p className="mb-5">50% Offer</p>
                    <span>
                      Use this code <b>“Trucklah50”</b>
                    </span>
                  </div>
                  <div className="col-lg-2 col-md-2 col-12">
                    <p id="first">For your first <br></br>booking</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="container-fluid body ">
          {showSecondSection && (
            <div id="second section" className="HideSection py-5">
            <div className="card coupon my-5 container">
              <div className="row card-body container">
                <div className="col-lg-2 col-md-4 col-12">
                  <p className="dis">Discount</p>
                </div>
                <div className="col-lg-8 col-md-6 col-12" id="content">
                  <p className="mb-5">100% Offer</p>
                  <span>
                    Use this code <b>“Trucklah50”</b>
                  </span>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p id="first">For your first <br></br>booking</p>
                </div>
              </div>
            </div>

            <div className="card coupon my-5 container">
              <div className="row card-body container">
                <div className="col-lg-2 col-md-4 col-12">
                  <p className="dis">Discount</p>
                </div>
                <div className="col-lg-8 col-md-6 col-12" id="content">
                  <p className="mb-5">50% Offer</p>
                  <span>
                    Use this code <b>“Trucklah60”</b>
                  </span>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p id="first">For your first <br></br>booking</p>
                </div>
              </div>
            </div>
            <div className="card coupon my-5 container">
              <div className="row card-body container">
                <div className="col-lg-2 col-md-4 col-12 ">
                  <p className="dis">Discount</p>
                </div>
                <div className="col-lg-8 col-md-6 col-12" id="content">
                  <p className="mb-5">50% Offer</p>
                  <span>
                    Use this code <b>“Trucklah70”</b>
                  </span>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p id="first">For your first <br></br>booking</p>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Coupon;
