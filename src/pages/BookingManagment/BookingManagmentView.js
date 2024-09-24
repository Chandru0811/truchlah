import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { bookingApi, driverApi } from "../../config/URL";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  driverId: Yup.string().required("*Driver is required"),
});

function BookingManagmentView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [driversListData, setDriversListData] = useState([]);
  console.log("Driver List Data:", driversListData);

  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  const vehicleTypeId = data?.booking?.vehicletypeId;

  const getBookingById = async () => {
    setLoading(true);
    try {
      const response = await bookingApi.get(`/booking/getBookingById/${id}`);
      setData(response.data.responseBody);
      console.log("Booking By ID :", response.data.responseBody);
    } catch (error) {
      toast.error("Error fetching data: ", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      bookingId: id,
      driverId: "",
      acceptedBy: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedDriver = driversListData.find(
        (driver) => driver.id === parseInt(values.driverId)
      );

      // Store the driverName if the selectedDriver exists
      const acceptedBy = selectedDriver ? selectedDriver.driverName : "";

      // Create the payload with the acceptedBy value
      const payload = {
        driverId: values.driverId,
        acceptedBy: acceptedBy, // driverName stored here
        bookingId: values.bookingId,
      };

      console.log("Selected Driver Id:", selectedDriver); // Debugging
      console.log("Accepted By (Driver Name):", acceptedBy); // Debugging
      setSpinner(true);
      try {
        const response = await driverApi.post(
          "/driver/acceptBooking",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          getBookingById();

        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setSpinner(false);
      }
    },
  });

 

  useEffect(() => {
    const getDriversBasedOnVehicleTypeId = async () => {
      if (vehicleTypeId) {
        setLoading(true);
        try {
          const response = await driverApi.get(
            `/getDriversBasedOnVehicleTypeId/${vehicleTypeId}`
          );
          setDriversListData(response.data.responseBody);
          console.log("Driver Based On Vehicle Type ID:", response.data);
        } catch (error) {
          toast.error("Error fetching data: ", error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getBookingById();
    getDriversBasedOnVehicleTypeId();
  }, [id, vehicleTypeId]);

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
                      <h1 className="h4 ls-tight headingColor">
                        View Booking Management
                      </h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-start">
                      <Link to="/bookingManagement">
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="col-md-12 col-12 text-end">
                    <div className="d-flex justify-content-end align-items-center">
                     <div className="w-25 me-3">
                     <select
                        className={`form-select ${
                          formik.touched.status && formik.errors.status
                            ? "is-invalid"
                            : ""
                        }`}
                        name="driverId"
                        value={formik.values.driverId}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedDriver = driversListData.find(
                            (driver) => driver.id === selectedId
                          );
                          formik.setFieldValue("driverId", selectedId);
                          formik.setFieldValue(
                            "acceptedBy",
                            selectedDriver ? selectedDriver.driverName : ""
                          );
                        }}
                      >
                        <option value="" disabled>
                          Select Driver
                        </option>
                        {Array.isArray(driversListData) &&
                        driversListData.length > 0 ? (
                          driversListData.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                              {driver.driverName}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No drivers available
                          </option>
                        )}
                      </select>
                      {formik.touched.driverId && formik.errors.driverId && (
                    <div className="invalid-feedback">
                      {formik.errors.driverId}
                    </div>
                  )}
                     </div>
                      <button
                        type="submit"
                        className="btn btn-sm btn-button"
                        disabled={
                          spinner ||
                          !driversListData ||
                          driversListData.length === 0 ||
                          data?.bookingStatus?.status === "ASSIGNED"
                        } // Combined conditions for disabling the button
                      >
                        {spinner ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span>Assign</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
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
                                : {data?.booking?.bookingId || "--"}
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
                                : {data?.booking?.bookingType || ""}
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
                                :{" "}
                                {data?.booking?.deliveryDate.substring(0, 10) ||
                                  ""}
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
                                : {data?.booking?.estKm || ""}{" "}
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
                                :{data?.booking?.bookingRef || ""}{" "}
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
                                : {data?.booking?.helper || ""}{" "}
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
                                : {data?.booking?.msgToDriver || ""}
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
                                : {data?.booking?.quantity || ""}
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
                                : {data?.booking?.refCount || "0"}
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
                                : {data?.booking?.roundTrip || ""}{" "}
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
                                :{" "}
                                {data?.booking?.scheduledDate.substring(
                                  0,
                                  10
                                ) || ""}{" "}
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
                                :{" "}
                                {data?.booking?.deliveryDate.substring(
                                  0,
                                  10
                                ) || ""}{" "}
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
                                : {data?.booking?.totalKm || ""}{" "}
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
                                : {data?.booking?.trollyRequired || ""}{" "}
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
                                : {data?.booking?.vehicletypeId || ""}{" "}
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
                                :{" "}
                                {data?.bookingStatus?.lastModifiedDate.substring(
                                  0,
                                  10
                                ) || ""}
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
                                : {data?.bookingStatus?.status || ""}
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
                                :{data?.bookingStatus?.userNotified || ""}
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
                      {data?.bookingTripLocations?.length > 0 ? (
                        data.bookingTripLocations.map((location, index) => (
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
                                    : {location.pickup || ""}
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
                                    : {location.pickupAddress || ""}
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
                                    : {location.pickupContactName || ""}
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
                                    : +{location.pickupCountryCode || " "}{" "}
                                    {location.pickupMobile || " "}
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
                                    :{location.dropoff || ""}
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
                                    : {location.dropoffAddress || ""}
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
                                    : {location.dropoffContactName || ""}
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
                                    : +{location.dropoffCountryCode || " "}{" "}
                                    {location.dropoffMobile || " "}
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
                                    : {location.stoppingPoint || ""}
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
                                    : {location.subStatus || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center fs-6 my-3">
                          No booking trip locations available.
                        </p>
                      )}
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
                                :{" "}
                                {data?.transactionDetails?.paymentStatus || ""}
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
                                : {data?.transactionDetails?.respCode || "0"}
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
                                : {data?.transactionDetails?.txnAmount || ""}
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
                                : {data?.transactionDetails?.txnId || ""}
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
                                : {data?.transactionDetails?.txnRef || ""}
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
                                : {data?.user?.firstName || ""}{" "}
                                {data?.user?.lastName || ""}
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
                                :{" "}
                                {data?.user?.createdDate.substring(0, 10) ||
                                  " "}
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
                                :{data?.user?.mobileNo || ""}
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
                                : {data?.user?.mobileVerified || ""}
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
                                : {data?.user?.email || ""}
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
                                : {data?.user?.emailVerified || ""}
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
      )}
    </div>
  );
}

export default BookingManagmentView;
