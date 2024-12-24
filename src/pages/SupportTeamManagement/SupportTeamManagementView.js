import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userApi } from "../../config/URL";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";

function SupportTeamManagementView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLoader, setActiveLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
  useEffect(() => {
    getItemData();
  }, [id]);

  const handleActivate = async () => {
    setActiveLoader(true);
    const newStatus = !data.staffActiveStatus;
    try {
      const response = await userApi.put(`staff/staffStatusUpdate/${id}?status=${newStatus}`);
      if (response.status === 200) {
        getItemData();
      handleClose()
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while activating the product.");
      console.error("Activation Error:", error);
    } finally {
      setActiveLoader(false);
    }
  };
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
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor">
                        View Support Team{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-start">
                      <Link to="/supportteammanagement">
                        <button type="submit" className="btn btn-sm btn-light">
                          <span>Back</span>
                        </button>
                      </Link>
                      {data.staffActiveStatus ? (
                        <button
                          onClick={handleOpenModal}
                          className="btn btn-danger btn-sm me-2"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleActivate}
                          className="btn btn-success btn-sm me-2"
                          disabled={activeLoader}
                        >
                          {activeLoader && (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            ></span>
                          )}
                          Activate
                        </button>
                      )}
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
                      <p className="text-muted text-sm">
                        : {`${data.firstName} ${data.lastName}` || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {`${data.countryCode} ${data.mobileNo}` || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {data.refCode || ""}{" "}
                      </p>
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
      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deactivate User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to deactivate this User?</Modal.Body>
        <Modal.Footer className="py-1">
          <button className="btn btn-sm btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn btn-sm btn-danger"
            type="submit"
            onClick={handleActivate}
            disabled={activeLoader}
          >
            {activeLoader && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Deactivate
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SupportTeamManagementView;
