import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userApi } from "../../config/URL";
import toast from "react-hot-toast";

function BannerAndOfferView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await userApi.get(`/offer/byOfferId/${id}`);
        setData(response.data.responseBody);
      } catch (error) {
        toast.error(`Error fetching data: ${error?.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getItemData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="container-fluid px-2 minHeight">
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">
                      View Banner And Offer
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/bannerandoffer">
                      <button type="button" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
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
                        <b>Status</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.offerStatus || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Description</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.description || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Attachment</b>
                      </p>
                    </div>
                    <div className="col-6">
                      {data.attachment ? (
                        <img
                          src={data.attachment}
                          alt="Attachment"
                          className="img-fluid"
                          style={{ maxWidth: "50%", height: "auto" }}
                        />
                      ) : (
                        <p className="text-muted text-sm">No attachment</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerAndOfferView;
