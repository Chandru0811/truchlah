import React, { useState } from "react";
import Invoice from "../../Components/common/Invoice";
import "../../styles/custom.css";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
function Invoices() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="container-fluid py-5" style={{ background: "#faf5f6" }}>
      <div className="container">
        <Invoice />
        <div
          className=" d-flex justify-content-between p-3 mt-5"
          style={{ backgroundColor: "#D6E6FA" }}
        >
          <span className="d-flex align-item-center">
            <p>
              <b>Want to cancel your order ?</b>
            </p>
          </span>
          <span>
            <button
              className="btn btn-danger px-5"
              onClick={handleShow}
              style={{ borderRadius: "20px" }}
            >
              Cancel
            </button>
          </span>
        </div>
        {show && (
          <div className="popup-overlay">
            <div
              className="popup-content p-3"
              style={{ backgroundColor: "#FFF", borderRadius: "5px" }}
            >
              <div className="text-end">
                <button className="btn " onClick={handleClose}>
                  <MdCancel style={{ fontSize: "20px", color: "red" }} />
                </button>
              </div>
              <h5 id="closeWhat">What’s making you cancel ?</h5>
              <p id="closeBefore">
                Before canceling,let us know why you’re leaving.Your response
                may be shared with the subscription provider
              </p>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  id="closeBefore"
                >
                  Driver is not allocated
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  id="closeBefore"
                >
                  Driver says he will be late
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  id="closeBefore"
                >
                  Vehicle cannot meet my requirement
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  id="closeBefore"
                >
                  I need to change my address & location{" "}
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  id="closeBefore"
                >
                  Driver is too far away and i need a shorter arrival time{" "}
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  id="closeBefore"
                >
                  Others{" "}
                </label>
              </div>
              <textarea
                class="form-control"
                placeholder="write your reason here............"
                id="floatingTextarea"
              ></textarea>
              <div className="my-2">
                <Link to="/cancelorder">
                  <button className="btn btn-danger">Confirm</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Invoices;
