import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HouseCategoryManagement from "./HouseCategoryManagement";
import { bookingApi } from "../../config/URL";
import { toast } from "react-toastify";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function HouseCategoryManagementView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      try {
        const response = await bookingApi.get(`getAllHouseShifting/${id}?id=${id}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      <div className="container-fluid px-2 minHeight">
        {loader ? (
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
          <>
            <div className="card shadow border-0 mb-2 top-header">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="d-flex align-items-center gap-4">
                        <h1 className="h4 ls-tight headingColor">
                          View House Category Management
                        </h1>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="hstack gap-2 justify-content-start">
                        <Link to="/housecategorymanagement">
                          <button
                            type="submit"
                            className="btn btn-sm btn-light"
                          >
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
                          <b>House Category Name</b>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.houseCategoryName || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-3">
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <p className="text-sm">
                          <b>Price</b>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.price || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-3">
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <p className="text-sm">
                          <b>Status</b>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.houseStatus || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      <b>House Category Image</b>
                    </div>
                    <div className="col-6 text-muted">
                      {data.houseImage ? (
                        <img
                          src={data.houseImage}
                          alt="Driver"
                          style={{ width: "100px" }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HouseCategoryManagementView;
