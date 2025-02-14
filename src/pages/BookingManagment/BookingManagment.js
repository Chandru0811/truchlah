import React, { useState } from "react";
import ItemManagement from "./ItemManagement";
import OfficeManagement from "./OfficeManagement";
import HouseManagement from "./HouseManagement";

const BookingManagment = () => {
  const [activeTab, setActiveTab] = useState("ITEM");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log("first", tab);
  };

  return (
    <div>
      <div className="container-fluid px-2 minHeight">
        <div className="card shadow border-0 my-2">
          <div className="container-fluid pt-4 pb-3">
            <div className="row align-items-center justify-content-between ">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor ">
                    Booking Management
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <hr className="removeHrMargin mt-0"></hr>
          <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
            <li className="nav-item ms-0 px-2" role="presentation">
              <button
                className={`nav-link tabNav px-4 py-2 fw-bold ${activeTab === "ITEM" ? "active" : ""
                  }`}
                id="profile-tab"
                onClick={() => handleTabClick("ITEM")}
                type="button"
                role="tab"
              >
                ITEM
              </button>
            </li>
            <li className="nav-item ms-0" role="presentation">
              <button
                className={`nav-link tabNav px-4 py-2 fw-bold ${activeTab === "HOUSE" ? "active" : ""
                  }`}
                id="home-tab"
                onClick={() => handleTabClick("HOUSE")}
                type="button"
                role="tab"
              >
                HOUSE
              </button>
            </li>
            <li className="nav-item ms-0" role="presentation">
              <button
                className={`nav-link tabNav px-4 py-2 fw-bold ${activeTab === "OFFICE" ? "active" : ""
                  }`}
                id="profile-tab"
                onClick={() => handleTabClick("OFFICE")}
                type="button"
                role="tab"
              >
                OFFFICE
              </button>
            </li>
          </ul>
          {activeTab === "ITEM" ? (
            <ItemManagement />
          ) : activeTab === "OFFICE" ? (
            <OfficeManagement />
          ) : (
            <HouseManagement />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagment;
