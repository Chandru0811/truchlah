import React, { useState } from "react";
import "../../styles/custom.css";
import { FaRupeeSign } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";

function Order() {
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
    <section className="order">
      <div className="container-fluid mt-3 mb-3">
        <div className="row">
          <div className="col ms-5 mt-5">
            <h2 style={{ color: "#106EEA" }}>ORDERS</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <button className="mx-3" id="shift-btn" onClick={hideSecondSection}>
              House Shifting
            </button>
            <button className="mx-3" id="shift-btn" onClick={hideFirstSection}>
              Item Shifting
            </button>
          </div>
        </div>
      </div>
      {showFirstSection && (
        <div id="shift-bg" className="container-fuild">
          <div className="container py-4">
            <div className="row" id="on">
              <div className="col-lg-10 col-md-6 col-12 p-3">
                <p>Tata ace - today</p>
                <p style={{ color: "#DFAE00" }}>On process</p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,sakthi
                  tower,anna salai,chennai-600008<br></br>
                  <span className="line"></span>
                </p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot2"></span>
                  &nbsp;&nbsp;&nbsp;123,rich street,mount road,chennai-600005
                </p>
              </div>
              <div className="col-lg-2 col-md-6 col-12 p-3">
                <p className="ps-5 pt-2">
                  <FaRupeeSign />
                  750<br></br>
                  <SiPaytm style={{ fontSize: "50px" }} />
                </p>
              </div>
            </div>
          </div>

          <div className="container py-5">
            <div className="row" id="on">
              <div className="col-lg-10 col-md-6 col-12 p-3">
                <p>Truck - 1 month ago</p>
                <p style={{ color: "#DF0000" }}>Cancelled</p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,sakthi
                  tower,anna salai,chennai-600008<br></br>
                  <span className="line"></span>
                </p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot2"></span>
                  &nbsp;&nbsp;&nbsp;123,rich street,mount road,chennai-600005
                </p>
              </div>
              <div className="col-lg-2 col-md-6 col-12 p-3">
                <p className="ps-5 pt-2">
                  <FaRupeeSign />
                  1500<br></br>
                  <SiPaytm style={{ fontSize: "50px" }} />
                </p>
              </div>
            </div>
          </div>

          <div className="container py-5">
            <div className="row" id="on">
              <div className="col-lg-10 col-md-6 col-12 p-3">
                <p>Tata ace - today</p>
                <p style={{ color: "#0D64CD" }}>Dropped</p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,sakthi
                  tower,anna salai,chennai-600008<br></br>
                  <span className="line"></span>
                </p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot2"></span>
                  &nbsp;&nbsp;&nbsp;123,rich street,mount road,chennai-600005
                </p>
              </div>
              <div className="col-lg-2 col-md-6 col-12 p-3">
                <p className="ps-5 pt-2">
                  <FaRupeeSign />
                  750<br></br>
                  <SiPaytm style={{ fontSize: "50px" }} />
                </p>
              </div>
            </div>
          </div>

          <div className="container py-5">
            <div className="row" id="on">
              <div className="col-lg-10 col-md-6 col-12 p-3">
                <p>Tata ace - today</p>
                <p style={{ color: "#DFAE00" }}>On process</p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,sakthi
                  tower,anna salai,chennai-600008<br></br>
                  <span className="line"></span>
                </p>
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  <span className="dot2"></span>
                  &nbsp;&nbsp;&nbsp;123,rich street,mount road,chennai-600005
                </p>
              </div>
              <div className="col-lg-2 col-md-6 col-12 p-3">
                <p className="ps-5 pt-2">
                  <FaRupeeSign />
                  750<br></br>
                  <SiPaytm style={{ fontSize: "50px" }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container-fluid ">
        {showSecondSection && (
          <div id="shift-bg" className="container-fuild">
            <div className="container py-4">
              <div className="row" id="on">
                <div className="col-lg-10 col-md-6 col-12 p-3">
                  <p>Tata ace - today</p>
                  <p style={{ color: "#DFAE00" }}>On process</p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot1"></span>&nbsp;&nbsp;&nbsp; 123,rich
                    street,mount road,chennai-600005<br></br>
                    <span className="line"></span>
                  </p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot2"></span>
                    &nbsp;&nbsp;&nbsp;45/1,sakthi tower,anna
                    salai,chennai-600008
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 col-12 p-3">
                  <p className="ps-5 pt-2">
                    <FaRupeeSign />
                    750<br></br>
                    <SiPaytm style={{ fontSize: "50px" }} />
                  </p>
                </div>
              </div>
            </div>

            <div className="container py-5">
              <div className="row" id="on">
                <div className="col-lg-10 col-md-6 col-12 p-3">
                  <p>Tata ace - today</p>
                  <p style={{ color: "#DF0000" }}>Cancelled</p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot1"></span>&nbsp;&nbsp;&nbsp; 123,rich
                    street,mount road,chennai-600005<br></br>
                    <span className="line"></span>
                  </p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot2"></span>
                    &nbsp;&nbsp;&nbsp;45/1,sakthi tower,anna
                    salai,chennai-600008
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 col-12 p-3">
                  <p className="ps-5 pt-2">
                    <FaRupeeSign />
                    1500<br></br>
                    <SiPaytm style={{ fontSize: "50px" }} />
                  </p>
                </div>
              </div>
            </div>

            <div className="container py-5">
              <div className="row" id="on">
                <div className="col-lg-10 col-md-6 col-12 p-3">
                  <p>Tata ace - today</p>
                  <p style={{ color: "#0D64CD" }}>Dropped</p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot1"></span>&nbsp;&nbsp;&nbsp; 123,rich
                    street,mount road,chennai-600005<br></br>
                    <span className="line"></span>
                  </p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot2"></span>
                    &nbsp;&nbsp;&nbsp;45/1,sakthi tower,anna
                    salai,chennai-600008
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 col-12 p-3">
                  <p className="ps-5 pt-2">
                    <FaRupeeSign />
                    750<br></br>
                    <SiPaytm style={{ fontSize: "50px" }} />
                  </p>
                </div>
              </div>
            </div>

            <div className="container py-5">
              <div className="row" id="on">
                <div className="col-lg-10 col-md-6 col-12">
                  <p>Tata ace - today</p>
                  <p style={{ color: "#DFAE00" }}>On process</p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot1"></span>&nbsp;&nbsp;&nbsp; 123,rich
                    street,mount road,chennai-600005<br></br>
                    <span className="line"></span>
                  </p>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    <span className="dot2"></span>
                    &nbsp;&nbsp;&nbsp;45/1,sakthi tower,anna
                    salai,chennai-600008
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 col-12">
                  <p className="ps-5 pt-2">
                    <FaRupeeSign />
                    750<br></br>
                    <SiPaytm style={{ fontSize: "50px" }} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Order;
