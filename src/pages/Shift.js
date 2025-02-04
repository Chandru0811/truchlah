import React from "react";
import "../styles/custom.css";
import house from "../asset/house.png";
import item from "../asset/item.png";
import truck from "../asset/Trucklah.png";
import { Link } from "react-router-dom";

function Shift() {
  const logType = (selectedType) => {
    localStorage.removeItem("shiftType");
    localStorage.setItem("shiftType", selectedType);
  };

  return (
    <div className="container-fluid" id="heros">
      <div className="row">
        {/* Left Column - Service Selection */}
        <div className="col-md-6 col-12">
          <div className="row justify-content-center mb-3">
            <div className="col-10 mt-4 mb-4">
              <h1 className="LoginSubHead text-muted" style={{ fontSize: "23px" }}>
                Trucklah Booking - Move Easy with Trucklah
              </h1>
            </div>

            {/* Services Cards */}
            <div className="col-10">
              <div className="row g-4">
                {/* Item Shifting Card */}
                <div className="col-md-6">
                  <div className="card shadow-sm card-hover1 h-100" onClick={() => logType("ITEM")}>
                    <Link
                      to="/itemshift"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-7 p-3">
                          <span className="fw-medium text-muted">PACKERS & MOVERS</span>
                          <h5 style={{ color: "#525252" }}>Item Shifting</h5>
                          <span className="fw-medium text-muted">Secure Item Shifting</span>
                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                          <img src={item} alt="Item shifting" className="img-fluid p-2" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Office Moving Card */}
                <div className="col-md-6">
                  <div className="card shadow-sm card-hover1 h-100" onClick={() => logType("HOUSE")}>
                    <Link
                      to="/officemoving"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-7 p-3">
                          <span className="fw-medium text-muted">PACKERS & MOVERS</span>
                          <h5 style={{ color: "#525252" }}>Office Moving</h5>
                          <span className="fw-medium text-muted"> House or commercial</span>
                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                          <img src={house} alt="House shifting" className="img-fluid p-2" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* House Moving Card */}
                <div className="col-md-6">
                  <div className="card shadow-sm card-hover1 h-100" onClick={() => logType("HOUSE")}>
                    <Link
                      to="/housemoving"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-7 p-3">
                          <span className="fw-medium text-muted">PACKERS & MOVERS</span>
                          <h5 style={{ color: "#525252" }}>House Moving</h5>
                          <span className="fw-medium text-muted">Safe House Relocation</span>
                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                          <img src={house} alt="House shifting" className="img-fluid p-2" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Truck Image */}
        <div className="col-md-6 col-12 d-flex align-items-center">
          <img src={truck} alt="Trucklah truck" className="img-fluid responsive-image" />
        </div>
      </div>
    </div>
  );
}

export default Shift;