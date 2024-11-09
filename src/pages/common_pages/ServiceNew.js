import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function ServiceNew() {
  const [showQuantity, setShowQuantity] = useState(false);
  const [manpowerQuantity, setManpowerQuantity] = useState(1);

  const increaseManpowerQuantity = () => {
    if (manpowerQuantity < 99) {
      setManpowerQuantity(manpowerQuantity + 1);
    }
  };

  const decreaseManpowerQuantity = () => {
    if (manpowerQuantity > 1) {
      setManpowerQuantity(manpowerQuantity - 1);
    }
  };

  return (
    <div className="container">
      <div className="row py-3">
        {/* Driver as Manpower Checkbox */}
        <div className="col-md-6 col-12 mb-3 p-3">
          <div
            className="d-flex justify-content-between p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              alignItems: 'center',
              border: '1px solid #e0dfdf'
            }}
          >
            <span>
              <b>Driver as Manpower</b>
            </span>
            <div className="form-check">
              <input
                type="checkbox"
                name="driverAsManpower"
                className="form-check-input custom-checkbox"
                value={true}
                id="driverAsManpower"
              />
            </div>
          </div>
        </div>

        {/* Extra Manpower Checkbox */}

        {showQuantity ?
          (
            <>
            </>
          ) : (
            <>
              <div className='col-md-6 col-12 mb-3 p-3'>
                <div
                  className="d-flex align-items-center justify-content-between p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    border: "1px solid #e0dfdf",
                    width: "100%",
                  }}
                >
                  <span>
                    <b>Extra Manpower</b>
                  </span>
                  <input
                    className="form-check-input custom-checkbox"
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    id="extraManpower"
                    value={true}
                    name="extraManpower"
                    onClick={() => setShowQuantity(!showQuantity)}
                  />
                </div>
              </div>
            </>
          )}

        <div
          className={`${showQuantity ? "col-md-6" : "col-md-6"
            } col-12 mb-3 p-3`}
        >
          <div className="d-flex justify-content-between">
            {/* Checkbox section */}
            {showQuantity && (
            <div
              className="d-flex align-items-center justify-content-between p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                border: "1px solid #e0dfdf",
                width: "40%",
              }}
            >
              <span>
                <b>Extra Manpower</b>
              </span>
              <input
                className="form-check-input custom-checkbox"
                style={{ cursor: "pointer" }}
                type="checkbox"
                id="extraManpower"
                value={true}
                name="extraManpower"
                onClick={() => setShowQuantity(!showQuantity)}
              />
            </div>
            )}
            {/* Quantity input section */}
            {showQuantity && (
              <div
                className="d-flex align-items-center justify-content-between p-2 ms-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #e0dfdf",
                  width: "50%",
                }}
              >
                <span>
                  <b>Quantity</b>
                </span>
                <div className="quantity-input d-flex align-items-center ms-2">
                  <button
                    className="quantity-btn btn border-white shadow-none"
                    type="button"
                    style={{ borderRadius: "50%", cursor: "pointer" }}
                    onClick={decreaseManpowerQuantity}
                    disabled={manpowerQuantity === 1}
                  >
                    <FaMinus style={{ fontSize: "8px" }} />
                  </button>
                  <input
                    type="number"
                    className="quantity-value"
                    value={manpowerQuantity}
                    min={1}
                    max={99}
                    readOnly
                    style={{
                      width: "50px",
                      padding: "5px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      margin: "0 10px",
                    }}
                  />
                  <button
                    className="quantity-btn btn border-white shadow-none"
                    onClick={increaseManpowerQuantity}
                    type="button"
                    disabled={manpowerQuantity === 99}
                    style={{ borderRadius: "50%", cursor: "pointer" }}
                  >
                    <FaPlus style={{ fontSize: "8px" }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Trolly Required Checkbox */}
        <div className="col-md-6 col-12 mb-3 p-3">
          <div
            className="d-flex justify-content-between p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              border: "1px solid #e0dfdf",
              alignItems: 'center'
            }}
          >
            <span>
              <b>Trolly Required</b>
            </span>
            <div className="form-check">
              <input
                className="form-check-input custom-checkbox"
                type="checkbox"
                value={true}
                id="trollyRequired"
                name="trollyRequired"
              />
            </div>
          </div>
        </div>

        {/* Round Trip Required Checkbox */}
        <div className="col-md-6 col-12 mb-3 p-3">
          <div
            className="d-flex justify-content-between p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '5px', alignItems: 'center',
              border: "1px solid #e0dfdf"
            }}
          >
            <span>
              <b>Round Trip Required</b>
            </span>
            <div className="form-check">
              <input
                className="form-check-input custom-checkbox"
                type="checkbox"
                value={true}
                id="roundTripRequired"
                name="roundTripRequired"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <label htmlFor="exampleTextarea" className="form-label">
            <b>Message to Driver</b>
          </label>
          <textarea
            id="exampleTextarea"
            rows="4"
            placeholder="write your message here........"
            className="form-control form-control-lg "
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ServiceNew;