import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function ServiceNew() {
  const [showQuantity, setShowQuantity] = useState(false);
  const [manpowerQuantity, setManpowerQuantity] = useState(0);
  const [manpower, setManpower] = useState(false);

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
        <div className='col-md-6 col-12 mb-3 p-3'>
          <div className='row'>
            <div className='col-md-6 col-12 mb-3'>
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

            <div className="col-md-6 col-12">
              {/* Checkbox section */}
              {showQuantity && (
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
                    <b>No.Of Workers</b>
                  </span>
                  <div className="quantity-input d-flex align-items-center"
                    style={{ backgroundColor: "#84cd1f", borderRadius: "30px" }}
                  >
                    {/* Decrease button */}
                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={decreaseManpowerQuantity}
                      disabled={manpowerQuantity === 1}
                      style={{
                        backgroundColor: "#84cd1f",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "20px", // Decreased width
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      <FaMinus style={{ fontSize: "10px" }} />
                    </button>

                    {/* Quantity display */}
                    <input
                      type="number"
                      className="quantity-value"
                      value={manpowerQuantity}
                      min={0}
                      max={99}
                      readOnly
                      style={{
                        width: "25px", // Adjusted width for better alignment
                        padding: "1px",
                        textAlign: "center",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#84cd1f",
                        color: "#fff",
                      }}
                    />

                    {/* Increase button */}
                    <button
                      className="quantity-btn"
                      onClick={increaseManpowerQuantity}
                      type="button"
                      disabled={manpowerQuantity === 99}
                      style={{
                        backgroundColor: "#84cd1f",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "20px", // Decreased width
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        cursor: "pointer",
                        // marginLeft: "8px",
                      }}
                    >
                      <FaPlus style={{ fontSize: "10px" }} />
                    </button>
                  </div>
                </div>
              )}
            </div>
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