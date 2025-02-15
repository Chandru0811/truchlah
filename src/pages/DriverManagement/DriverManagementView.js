import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DriverManagement from "./DriverManagement";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function DriverManagementView() {
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
      const response = await driverApi.get(
        `driver/getVehicleDetailsByDriverId/${id}`
      );
      setData(response.data.responseBody);
    } catch (error) {
      toast.error("Error fetching data: ", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItemData();
    console.log("data?.vehicleDetails?.vehicleType?.type", data);
  }, [id]);

  const handleActivate = async () => {
    setActiveLoader(true);
    const newStatus = !data.driverStatus;
    try {
      const response = await driverApi.put(
        `driver/driverUpdateStatus/${id}?status=${newStatus}`
      );
      if (response.status === 200) {
        getItemData();
        handleClose();
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
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">
                      View Driver Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <Link to="/drivermanagement">
                    <button type="submit" className="btn btn-sm btn-light me-2">
                      <span>Back</span>
                    </button>
                  </Link>
                  {data.driverStatus ? (
                    <button
                      onClick={handleOpenModal}
                      className="btn btn-danger btn-sm me-2"
                    >
                      {activeLoader && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
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
          <div className="card shadow border-0 mb-2 minHeight">
            <div className="container">
              <div className="row mt-2 p-3">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Driver Details
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      class="accordion-collapse collapse show"
                    >
                      <div class="accordion-body row mt-2 p-3">
                        {/* Driver Details */}
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6">
                              <b>First Name</b>
                            </div>
                            <div className="col-6 text-muted">
                              : {data.firstName || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6">
                              <b>Last Name</b>
                            </div>
                            <div className="col-6 text-muted">
                              : {data.lastName || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6">
                              <b>Mobile Number</b>
                            </div>
                            <div className="col-6 text-muted">
                              :{" "}
                              {`+${data.countryCode} ${data.mobileNo}` || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6">
                              <b>Email</b>
                            </div>
                            <div className="col-6 text-muted">
                              : {data.email || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6">
                              <b>Driver Photo</b>
                            </div>
                            <div className="col-6 text-muted">
                              {data.driverPhotoUrl ? (
                                <img
                                  src={data.driverPhotoUrl}
                                  alt="Driver"
                                  style={{ width: "100px" }}
                                />
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
                                <img
                                  src={data.licenseFrontUrl}
                                  alt="License Front"
                                  style={{ width: "100px" }}
                                />
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
                                <img
                                  src={data.licenseBackUrl}
                                  alt="License Front"
                                  style={{ width: "100px" }}
                                />
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
                                <img
                                  src={data.idFrontUrl}
                                  alt="License Front"
                                  style={{ width: "100px" }}
                                />
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
                                <img
                                  src={data.idBackUrl}
                                  alt="License Front"
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
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Vehicle Details
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      class="accordion-collapse collapse"
                    >
                      {data?.vehicleDetails ? (
                        <div class="accordion-body row mt-2 p-3">
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Type</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.vehicleType?.type}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Brand</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.vehicleBrand}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Registration Number</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.registrationNo}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Registration Year</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.registrationYear}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Model</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.vehicleModel}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Name</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.vehicleName}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Size</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.vehicleSize}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Weight</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.vehicleWeight}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Owned By</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {data?.vehicleDetails?.ownedBy}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Front Img</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  {data?.vehicleDetails?.vehicleFrontImgUrl ? (
                                    <img
                                      src={
                                        data?.vehicleDetails?.vehicleFrontImgUrl
                                      }
                                      alt="License Front"
                                      style={{ width: "100px" }}
                                    />
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Vehicle Back Img</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  {data?.vehicleDetails?.vehicleBackImgUrl ? (
                                    <img
                                      src={
                                        data?.vehicleDetails?.vehicleBackImgUrl
                                      }
                                      alt="License Front"
                                      style={{ width: "100px" }}
                                    />
                                  ) : (
                                    "N/A"
                                  )}
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
                                  : {data?.vehicleDetails?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center fs-6 my-3">
                          No Vehicle Details available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
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

export default DriverManagementView;
