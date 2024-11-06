import React from "react";
import "../styles/custom.css";
import house from "../asset/house.png";
import item from "../asset/item.png";
import truck from "../asset/Trucklah.png";
import { Link } from "react-router-dom";

function Shift() {
  // const [type , setType] = useState({});

  const logType = (selectedType) => {
    console.log("Selected Shift Type:", selectedType);
    sessionStorage.removeItem("shiftType");
    sessionStorage.setItem("shiftType", selectedType);
  };
  return (
    <div className="container-fluid" id="heros">
      <div className="row">
        <div className="col-md-6 col-12">

          <div className="row justify-content-center mb-3">
            <div
              className="col-6 justify-content-center card shadow-sm mb-5 mt-5 card-hover1"
              style={{ width: '70%' }}
              onClick={()=>logType("ITEM")}
            >
              <Link
                to={{
                  pathname: "/itemshift",
                  // state: { logType: logType("ITEM") },
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="row">
                  <div className="col-md-6 col-12 d-flex flex-column p-3 justify-content-center">
                    <span className="fw-medium text-muted">
                      PACKERS & MOVERS
                    </span>
                    <h3 style={{ color: "#525252" }}>
                      ITEM SHIFTING
                    </h3>
                    <span className="fw-medium text-muted">
                      Secure Item Shifting
                    </span>
                  </div>
                  <div className="col-md-6 col-12 pe-0">
                    <img
                      src={item}
                      alt="truck"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-6 justify-content-center card shadow-sm card-hover2"
              style={{ width: '70%' }}
              onClick={()=>logType("HOUSE")}
            >
              <Link
                to={{
                  pathname: "/houseshift",
                  // state: { logType: logType("HOUSE") },
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
              <div className="row">
                <div className="col-md-6 col-12 d-flex flex-column p-3 justify-content-center">
                  <span className="fw-medium text-muted">
                    PACKERS & MOVERS
                  </span>
                  <h3 style={{ color: "#525252" }}>
                    HOUSE SHIFTING
                  </h3>
                  {/* <div>
                    <button type="button" class="px-2 btn-custom">
                      Coming Soon
                    </button>
                  </div> */}
                  <span className="fw-medium text-muted">
                    House Move Made Easy
                  </span>
                </div>
                <div className="col-md-6 col-12 pe-0">
                  <img
                    src={house}
                    alt="truck"
                    className="img-fluid"
                  />
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <img
            src={truck}
            alt="truck"
            className="img-fluid responsive-image"
          />
        </div>

      </div>

      {/* <div className="col container-fluid container py-5 ">
        <div className=" text-center row ">
          <div className="col-lg-3 col-md-3 col-12"></div>
          <div className="col-lg-6 col-md-6 col-12">
            <Link
              to={{ pathname: "/houseshift", state: { type: "houseShift" } }}
            >
              <button
                type="button"
                id="ShiftBtn"
                style={{ width: "100%" }}
                className="btn btn-outline-secondary btn-lg p-3 "
                data-mdb-ripple-color="dark"
                onClick={() => {
                  logType("houseShift");
                }}
                // onClick={()=>{
                //   logType("HOUSE");
                // }}
              >
                {" "}
                <img src={home} alt="house " className=" icon-img me-4"></img>
                House Shifting
              </button>
            </Link>
          </div>
          <div className="col-lg-3 col-md-3 col-12"></div>
        </div>
      </div> */}

      {/* <div className=" container-fluid container py-2">
        <div className="text-center row pb-5">
          <div className="col-lg-3 col-md-3 col-12"></div>
          <div className="col-lg-6 col-md-6 col-12">
            <Link
              to={{
                pathname: "/map",
                state: { logType: logType("itemShift") },
              }}
            >
              <button
                type="button"
                style={{ width: "100%" }}
                className="btn btn-outline-secondary btn-lg p-3 "
                data-mdb-ripple-color="dark"
                id="ShiftBtn"
                // onClick={() => {
                //   logType("Item Shift");
                // }}
                onClick={() => {
                  logType("ITEM");
                }}
              >
                {" "}
                <img src={item} alt="house " className=" icon-img me-4"></img>
                Item Shifting
              </button>
            </Link>
          </div>
          <div className="col-lg-3 col-md-3 col-12"></div>
        </div>
      </div> */}
    </div >
  );
}
export default Shift;
