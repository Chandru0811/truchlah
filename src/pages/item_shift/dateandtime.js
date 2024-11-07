import React from "react";
import { FaCalendarDays } from "react-icons/fa6";
import MovingImage from "../../asset/dateandtime.png";
import { IoIosTime } from "react-icons/io";

function dateandtime() {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-6 col-12">
          <div
            className="input-group mb-5"
            style={{ borderRadius: "50px", overflow: "hidden" }}
          >
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                borderRight: "none",
                backgroundColor: "#fff",
                borderRadius: "50px 0 0 50px",
              }}
            >
              <FaCalendarDays />
            </span>
            <input
              type="date"
              className="date-field form-control"
              aria-label="Date"
              aria-describedby="basic-addon1"
              min="2024-11-07"
              placeholder="Select date"
              style={{
                borderLeft: "none",
                borderRadius: "0 50px 50px 0", 
              }}
            />
          </div>

          <div
            className="input-group mb-3"
            style={{ borderRadius: "50px !important",overflow: "hidden" }}
          >
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                borderRight: "none",
                backgroundColor: "#fff",
                borderRadius: "50px 0 0 50px",
              }}
            >
              <IoIosTime />
            </span>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{
                borderLeft: "none",
                borderRadius: "0 50px 50px 0", 
                color: "#00000040"}}
            >
              <option selected>Select Time</option>
              <option value="8.00 AM">8.00 AM</option>
              <option value="8.30 AM">8.30 AM</option>
              <option value="9.00 AM">9.00 AM</option>
              <option value="9.30 AM">9.30 AM</option>
              <option value="10.00 AM">10.00 AM</option>
              <option value="10.30 AM">10.30 AM</option>
              <option value="11.00 AM">11.00 AM</option>
              <option value="11.30 AM">11.30 AM</option>
              <option value="12.00 PM">12.00 PM</option>
              <option value="12.30 PM">12.30 PM</option>
              <option value="1.00 PM">1.00 PM</option>
              <option value="1.30 AM">1.30 AM</option>
              <option value="2.00 PM">2.00 PM</option>
              <option value="2.30 PM">2.30 PM</option>
              <option value="3.00 PM">3.00 PM</option>
              <option value="3.30 PM">3.30 PM</option>
              <option value="4.00 PM">4.00 PM</option>
              <option value="4.30 PM">4.30 PM</option>
              <option value="5.00 PM">5.00 PM</option>
              <option value="5.30 PM">5.30 PM</option>
              <option value="6.00 PM">6.00 PM</option>
              <option value="6.30 PM">6.30 PM</option>
              <option value="7.00 PM">7.00 PM</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <img src={MovingImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default dateandtime;
