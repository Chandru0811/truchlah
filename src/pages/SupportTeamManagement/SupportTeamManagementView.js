import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userApi } from "../../config/URL";
// import api from "../../config/URL";
import toast from "react-hot-toast";

function SupportTeamManagementView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await userApi.get(
          `user/byId/${id}`
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

  return (
    <div>
    {loading ? (
        <div className="darksoul-layout">
      <div className="darksoul-grid">
        <div className="item1"></div>
        <div className="item2"></div>
        <div className="item3"></div>
        <div className="item4"></div>
      </div>
      <h3 className="darksoul-loader-h">Trucklah</h3>
    </div>
      ) : (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Support Team </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/supportteammanagement">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-2 minHeight">
        <div className="container">
          <div className="row mt-2 p-3">
          <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {`${data.firstName} ${data.lastName}` || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Email</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.email || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Mobile Number</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {`${data.countryCode} ${data.mobileNo}` || ""}</p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Country Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.countryCode || ""} </p>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Reference Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.refCode || ""} </p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Login Type</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.unit || ""} </p>
                </div>
              </div>
            </div> */}

         
          </div>
        </div>
      </div>
    </div>
   )} 
  </div>
  );
}

export default SupportTeamManagementView;
