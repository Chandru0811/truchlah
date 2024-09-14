import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DriverManagement from "./DriverManagement";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function DriverManagementView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemData = async () => {
        setLoading(true);
        try {
          const response = await driverApi.get(
            `/driver/byId/${id}`
          );
          setData(response.data.responseBody);
        } catch (error) {
          toast.error("Error fetching data: ", error?.response?.data?.message);
        }finally{
          setLoading(false);
        }
    };
    getItemData();
  }, [id]);

  return  (
    <div>
      {/* {loading ? (
        <div className="loader-container">
          <div className="Loader-Div">
            <svg id="triangle" width="50px" height="50px" viewBox="-3 -4 39 39">
              <polygon
                fill="transparent"
                stroke="blue"
                strokeWidth="1.3"
                points="16,0 32,32 0,32"
              ></polygon>
            </svg>
          </div>
        </div>
      ) : ( */}
        <div className="container-fluid px-2 minHeight">
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">View Driver Management</h1>
                  </div>
                </div>
                <div className="col-auto">
                  <Link to="/drivermanagement">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 mb-2 minHeight">
            <div className="container">
              <div className="row mt-2 p-3">
                {/* Driver Details */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>First Name</b>
                    </div>
                    <div className="col-6 text-muted">: {data.firstName || "N/A"}</div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Last Name</b>
                    </div>
                    <div className="col-6 text-muted">: {data.lastName || "N/A"}</div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Mobile Number</b>
                    </div>
                    <div className="col-6 text-muted">: {data.mobileNo || "N/A"}</div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Email</b>
                    </div>
                    <div className="col-6 text-muted">: {data.email || "N/A"}</div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Driver ID</b>
                    </div>
                    <div className="col-6 text-muted">: {data.driverId || "N/A"}</div>
                  </div>
                </div> */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Demerit Points</b>
                    </div>
                    <div className="col-6 text-muted">: {data.demeritPoint || "N/A"}</div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Login Type</b>
                    </div>
                    <div className="col-6 text-muted">: {data.loginType || "N/A"}</div>
                  </div>
                </div>
                {/* Add more fields as needed */}
                {/* Image Fields */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Driver Photo</b>
                    </div>
                    <div className="col-6 text-muted">
                      {data.driverPhotoUrl ? (
                        <img src={data.driverPhotoUrl} alt="Driver" style={{ width: "100px" }} />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>License Front:</b>
                    </div>
                    <div className="col-6 text-muted">
                      {data.licenseFrontUrl ? (
                        <img src={data.licenseFrontUrl} alt="License Front" style={{ width: "100px" }} />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>License Back:</b>
                    </div>
                    <div className="col-6 text-muted">
                      {data.licenseBackUrl ? (
                        <img src={data.licenseBackUrl} alt="License Front" style={{ width: "100px" }} />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Id Front:</b>
                    </div>
                    <div className="col-6 text-muted">
                      {data.idFrontUrl ? (
                        <img src={data.idFrontUrl} alt="License Front" style={{ width: "100px" }} />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>Id Back:</b>
                    </div>
                    <div className="col-6 text-muted">
                      {data.idBackUrl ? (
                        <img src={data.idBackUrl} alt="License Front" style={{ width: "100px" }} />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default DriverManagementView;
