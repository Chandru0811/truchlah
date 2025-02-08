import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookingApi } from "../../config/URL";
import { toast } from "react-toastify";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function OfficeCategoryManagementView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      try {
        const response = await bookingApi.get(`getCommercialShiftingById/${id}`);
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
          <div className="loader-container d-flex align-items-center justify-content-center">
            <div class="loader"></div>
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
                          View Office Category Management
                        </h1>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="hstack gap-2 justify-content-start">
                        <Link to="/officecategorymanagement">
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
                          <b>Office Category Name</b>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.commercialCategoryName || ""}
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
                          : {data.commercialStatus || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-3">
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <p className="text-sm">
                          <b>Office Category Image</b>
                        </p>
                      </div>
                      <div className="col-6 text-muted">
                        {data.commercialImage ? (
                          <img
                            src={data.commercialImage}
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

export default OfficeCategoryManagementView;
