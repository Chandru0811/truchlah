import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function BookingManagmentView() {
  // const { id } = useParams();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemData = async () => {
      //   setLoading(true);
      //   try {
      //     const response = await api.get(
      //       `getMstrItemsById/${id}`
      //     );
      //     setData(response.data);
      //   } catch (error) {
      //     toast.error("Error fetching data: ", error?.response?.data?.message);
      //   }finally{
      //     setLoading(false);
      //   }
    };
    getItemData();
  }, [id]);

  return (
    <div>
      {/* {loading ? (
      <div className="loader-container">
       <div class="Loader-Div">
        <svg id="triangle" width="50px" height="50px" viewBox="-3 -4 39 39">
            <polygon fill="transparent" stroke="blue" stroke-width="1.3" points="16,0 32,32 0,32"></polygon>
        </svg>
    </div>
      </div>
    ) : ( */}

      <div className="container-fluid px-2 minHeight">
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">
                      View Booking Management
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 mb-2 minHeight">
          <div className="container">
            <div className="row mt-2 p-3">
              <div className="col-md-12 col-12 text-end">
                <div className="d-flex justify-content-end align-items-center">
                  <select className="form-select w-25 me-3">
                    <option value="Select Driver" selected disabled>
                      Select Driver
                    </option>
                    <option value="list 1">List 1</option>
                    <option value="list 2">List 2</option>
                    <option value="list 3">List 3</option>
                  </select>
                  <button className="btn btn btn-sm bg-gradient bg-primary py-1 text-white">
                    Assign
                  </button>
                </div>
              </div>
            </div>
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
                      Booking
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    class="accordion-collapse collapse show"
                  >
                    <div class="accordion-body row mt-2 p-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Booking ID</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.bookingId || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Booking Type</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.bookingType || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Delivery Date</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.deliveryDate || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Estimate Kilometer</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.estKm || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Booking Refrence</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.bookingRef || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Helper</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.helper || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Message To Driver</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.msgToDriver || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Quantity</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.quantity || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Refrence Count</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.deliveryDate || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Round Trip</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.estKm || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Scheduled Date</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.bookingRef || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Total KM</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.totalKm || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Trolly Required</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.trollyRequired || ""}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Vehicle Type ID</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.vehicletypeId || ""}{" "}
                            </p>
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
                      Booking Status
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body row mt-2 p-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Last Modified Date</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.lastModifiedDate || ""}
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
                              : {data.status || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>User Notified</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.userNotified || ""}
                            </p>
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
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Booking Trip Locations
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body row mt-2 p-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Pickup Location</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.pickup || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Pickup Address</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.pickupAddress || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Pickup Contact Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.pickupContactName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Mobile</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.pickupCountryCode || " "}{" "}
                              {data.pickupMobile || " "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row my-3"></div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Drop Location</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.dropoff || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Drop Address</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.dropoffAddress || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Drop Contact Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.dropoffContactName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Mobile</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.dropoffCountryCode || " "}
                              {data.dropoffMobile || " "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row my-2"></div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Stopping Point</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.stoppingPoint || ""}
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
                              : {data.subStatus || ""}
                            </p>
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
                      data-bs-target="#panelsStayOpen-collapseFour"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFour"
                    >
                      Transaction Details
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseFour"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body row mt-2 p-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Payment Status</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.paymentStatus || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Resp Code</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.respCode || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Tax Amount</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.txnAmount || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Tax ID</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.txnId || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Tax Refrence</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.txnRef || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Tax Refrence</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.txnRef || ""}
                            </p>
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
                      data-bs-target="#panelsStayOpen-collapseFive"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFive"
                    >
                      User Details
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseFive"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body row mt-2 p-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.firstName || ""} {data.lastName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Created Date</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.createdDate || " "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Mobile</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.mobileNo || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Mobile Verified</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.mobileVerified || ""}
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
                            <p className="text-muted text-sm">
                              : {data.email || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Email Verified</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.emailVerified || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Tax ID</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.txnId || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Tax Refrence</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {data.txnRef || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingManagmentView;
