import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import { FaRupeeSign } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { toast } from "react-toastify";
import { bookingApi } from "../../config/URL";

function Order() {
  const [showInprogressSection, setShowInprogressSection] = useState(true);
  const [showCompletedSection, setShowCompletedSection] = useState(false);
  const [showCanceledSection, setShowCanceledSection] = useState(false);
  const [data, setData] = useState("");
  const userId = sessionStorage.getItem("userId");

  const inprogressSection = () => {
    setShowInprogressSection(true);
    setShowCompletedSection(false);
    setShowCanceledSection(false);
  };

  const completedSection = () => {
    setShowInprogressSection(false);
    setShowCanceledSection(false);
    setShowCompletedSection(true);
  };

  const cancelSection = () => {
    setShowInprogressSection(false);
    setShowCompletedSection(false);
    setShowCanceledSection(true);
  };
  let status = "";
  if (showInprogressSection) {
    status = "INPROGRESS";
  } else if (showCompletedSection) {
    status = "COMPLETED";
  } else if (showCanceledSection) {
    status = "CANCELLED";
  }

  const fetch = async () => {
    try {
      const response = await bookingApi.get(
        `booking/byUserId/${userId}/${status}`
      );
      if (response.status === 200) {
        // toast.success("Successfully Booking Create")
        // toast.success(response.data.message);
        // console.log("1",response.data.responseBody)
        setData(response.data.responseBody);
        console.log("object",data)
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, [status]);

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
            <button
              className={`mx-3 ${showInprogressSection ? "underline" : ""}`}
              id="shift-btn"
              onClick={inprogressSection}
            >
              INPROGRESS
            </button>
            <button
              className={`mx-3 ${showCompletedSection ? "underline" : ""}`}
              id="shift-btn"
              onClick={completedSection}
            >
              COMPLETED
            </button>
            <button
              className={`mx-3 ${showCanceledSection ? "underline" : ""}`}
              id="shift-btn"
              onClick={cancelSection}
            >
              CANCELLED
            </button>
          </div>
        </div>
      </div>
      {showInprogressSection && (
        <div id="shift-bg" className="container-fuild">
          {data &&
            data.map((item, index) => (
              <div className="container py-4" key={index}>
                <div className="row" id="on">
                  <div className="col-lg-10 col-md-6 col-12 p-3">
                    <p>Tata ace - today</p>
                    <p style={{ color: "#DFAE00" }}>On process</p>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,
                      Sakthi Tower, Anna Salai, Chennai-600008
                      <br />
                      <span className="line"></span>
                    </p>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      <span className="dot2"></span>&nbsp;&nbsp;&nbsp;123, Rich
                      Street, Mount Road, Chennai-600005
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-6 col-12 p-3">
                    <p className="ps-5 pt-2">
                      <FaRupeeSign /> {item.transactionDetails?.txnAmount}
                      <br />
                      <SiPaytm style={{ fontSize: "50px" }} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="container-fluid ">
        {showCompletedSection && (
          <div id="shift-bg" className="container-fuild">
            {data &&
            data.map((item, index) => (
              <div className="container py-4" key={index}>
                <div className="row" id="on">
                  <div className="col-lg-10 col-md-6 col-12 p-3">
                    <p>Tata ace - today</p>
                    <p style={{ color: "#DFAE00" }}>COMPLETED</p>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,
                      Sakthi Tower, Anna Salai, Chennai-600008
                      <br />
                      <span className="line"></span>
                    </p>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      <span className="dot2"></span>&nbsp;&nbsp;&nbsp;123, Rich
                      Street, Mount Road, Chennai-600005
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-6 col-12 p-3">
                    <p className="ps-5 pt-2">
                      <FaRupeeSign /> {item.txtAmount}
                      <br />
                      <SiPaytm style={{ fontSize: "50px" }} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
      <div className="container-fluid ">
        {showCanceledSection && (
          <div id="shift-bg" className="container-fuild">
            {data &&
            data.map((item, index) => (
              <div className="container py-4" key={index}>
                <div className="row" id="on">
                  <div className="col-lg-10 col-md-6 col-12 p-3">
                    <p>Tata ace - today</p>
                    <p style={{ color: "#DFAE00" }}>CANCELLED</p>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      <span className="dot1"></span>&nbsp;&nbsp;&nbsp;45/1,
                      Sakthi Tower, Anna Salai, Chennai-600008
                      <br />
                      <span className="line"></span>
                    </p>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      <span className="dot2"></span>&nbsp;&nbsp;&nbsp;123, Rich
                      Street, Mount Road, Chennai-600005
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-6 col-12 p-3">
                    <p className="ps-5 pt-2">
                      <FaRupeeSign /> 750
                      <br />
                      <SiPaytm style={{ fontSize: "50px" }} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}    
      </div>
    </section>
  );
}

export default Order;
