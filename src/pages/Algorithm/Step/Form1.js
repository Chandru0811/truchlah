import React from "react";
import "../../../styles/custom.css";
import home from "../../../asset/Rectangle 19 (1).png";
import item from "../../../asset/icons8-open-box-48 1.png";
import truck from "../../../asset/delivery-service.png";
import { Link } from "react-router-dom";

function Shift({ handleNext }, ref) {
  return (
    <div className="container-fluid" id="heros">
      <div className="row">
        <img
          src={truck}
          alt="truck"
          className="img-fluid"
          style={{ height: "80vh" }}
        />
      </div>

      <div className="col container-fluid container py-5 ">
        <div className=" text-center row ">
          <div className="col-lg-3 col-md-3 col-12"></div>
          <div className="col-lg-6 col-md-6 col-12">
            <button
              type="button"
              id="ShiftBtn"
              style={{ width: "100%" }}
              className="btn btn-outline-secondary btn-lg p-3 "
              data-mdb-ripple-color="dark"
              onClick={handleNext}
            >
              {" "}
              <img src={home} alt="house " className=" icon-img me-4"></img>
              House Shifting
            </button>
          </div>
          <div className="col-lg-3 col-md-3 col-12"></div>
        </div>
      </div>

      <div className=" container-fluid container py-2">
        <div className="text-center row pb-5">
          <div className="col-lg-3 col-md-3 col-12"></div>
          <div className="col-lg-6 col-md-6 col-12">
            <button
              type="button"
              style={{ width: "100%" }}
              className="btn btn-outline-secondary btn-lg p-3 "
              data-mdb-ripple-color="dark"
              id="ShiftBtn"
            >
              {" "}
              <img src={item} alt="house " className=" icon-img me-4"></img>
              Item Shifting
            </button>
          </div>
          <div className="col-lg-3 col-md-3 col-12"></div>
        </div>
      </div>
    </div>
  );
}
export default Shift;
