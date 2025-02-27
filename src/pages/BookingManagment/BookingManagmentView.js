import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { bookingApi, driverApi } from "../../config/URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Badge } from "antd";
import { FaLink } from "react-icons/fa";
import UpdateBokking from "./UpdateBokking";
import { Modal, Button } from "react-bootstrap";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const validationSchema = Yup.object({
  driverId: Yup.string().required("*Driver is required"),
});

function BookingManagmentView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [driversListData, setDriversListData] = useState([]);
  console.log("Get datas", data);

  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  const vehicleTypeId = data?.booking?.vehicletypeId;

  const [selectedImage, setSelectedImage] = useState(null); // For storing selected image URL
  const [showModal, setShowModal] = useState(false); // To show or hide the modal

  // Function to handle image click and open modal
  const handleImageClick = (image) => {
    setSelectedImage(image); // Store selected image
    setShowModal(true); // Open modal
  };

  // Function to handle image download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage; // Set the link to the selected image
    link.download = selectedImage.split("/").pop(); // Extract filename from URL
    link.click(); // Trigger download
  };

  // Function to handle modal close
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const getBookingById = async () => {
    setLoading(true);
    try {
      const response = await bookingApi.get(
        `/booking/getBookingByIdAdmin/${id}`
      );
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
      console.log("Accepted By (Driver Name):", acceptedBy);
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
          toast.success("Driver Assigned Successfully");
          getBookingById();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setSpinner(false);
      }
    },
  });

  // Function to format the booking status text and return related background color
  const formatBookingStatus = (status) => {
    switch (status) {
      case "DRAFT_BOOKING":
        return {
          text: "Draft Booking",
          backgroundColor: "#fcd162", // Warning color (example)
        };
      case "CANCELLED":
        return {
          text: "Cancelled",
          backgroundColor: "#f04545", // Danger color (example)
        };
      case "BOOKED":
        return {
          text: "Booked",
          backgroundColor: "#2593fb", // Info color (example)
        };
      case "COMPLETED":
        return {
          text: "Completed",
          backgroundColor: "#17e540", // Success color (example)
        };
      case "VISIT_CONFIRMED":
        return {
          text: "Visit Confirmed",
          backgroundColor: "#28d8b7", // Success color (example)
        };
      default:
        return {
          text: "Unknown",
          backgroundColor: "#6d736e", // Default color (example)
        };
    }
  };

  // Get the formatted status and background color
  const { text: bookingStatus, backgroundColor } = formatBookingStatus(
    data?.bookingStatus?.status || "Unknown"
  );

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
          <Badge.Ribbon
            className="px-4 py-1 fs-6"
            text={bookingStatus}
            placement="start"
            style={{
              backgroundColor: backgroundColor,
              color: "#fff", // Text color for better contrast
              zIndex: "100",
              fontSize: "15px", // Increase font size
              left: "-9px",
              top: "20px",
            }}
          />
          <div className="card shadow border-0 mb-2 minHeight">
            <div className="container">
              <div className="row mt-2 p-3">
                {bookingStatus === "Cancelled" ? (
                  <div></div>
                ) : (
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
                          {formik.touched.driverId &&
                            formik.errors.driverId && (
                              <div className="invalid-feedback">
                                {formik.errors.driverId}
                              </div>
                            )}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-sm btn-button me-3"
                          disabled={
                            spinner ||
                            !driversListData ||
                            driversListData.length === 0 ||
                            data?.bookingStatus?.status === "CANCELLED"
                          }
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
                        {/* <UpdateBokking /> */}
                      </div>
                    </div>
                  </form>
                )}
              </div>
              <div className="row mt-2 p-3">
                {/* <Badge.Ribbon
                  className="px-4 py-1 fs-6"
                  text={bookingStatus}
                  placement="start"
                  style={{
                    backgroundColor: backgroundColor,
                    color: "#fff", // Text color for better contrast
                    zIndex: "100",
                    fontSize: "15px", // Increase font size
                    left: "4px",
                  }}
                /> */}
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
                                <b>Booking Date</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                :{" "}
                                {data.user?.createdDate ? (
                                  <>
                                    {data.user?.createdDate.substring(0, 10)}{" "}
                                    <b>at</b>{" "}
                                    {new Date(
                                      data.user?.createdDate
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </>
                                ) : (
                                  " "
                                )}
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
                                :{data?.booking?.bookingRef.replace(/_/g, " ")}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                              <p className="text-sm">
                                <b>Manpower</b>
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
                                <b>Extra Manpower</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data?.booking?.extraHelper || ""}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        {data?.booking?.bookingType !== "ITEM" && (
                          <>
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Boxes Charge</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    : {data?.booking?.boxesCharge || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Bubble Wrapping Charge</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    :{" "}
                                    {data?.booking?.bubbleWrappingCharge || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Assembly Disassembly Charge</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    :{" "}
                                    {data?.booking?.assemblyDisassemblyCharge ||
                                      ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Long Push Charge</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    :{" "}
                                    {data?.booking?.longPushCharge === "Y"
                                      ? "yes"
                                      : "No" || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

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
                                {data.booking?.scheduledDate ? (
                                  <>
                                    {data.booking?.scheduledDate.substring(
                                      0,
                                      10
                                    )}{" "}
                                    <b>&</b>{" "}
                                    {new Date(
                                      data.booking?.scheduledDate
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </>
                                ) : (
                                  " "
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                              <p className="text-sm">
                                <b>Delivery Date</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                :{" "}
                                {data.booking?.deliveryDate ? (
                                  <>
                                    {data.booking?.deliveryDate.substring(
                                      0,
                                      10
                                    )}{" "}
                                    <b>&</b>{" "}
                                    {new Date(
                                      data.booking?.deliveryDate
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </>
                                ) : (
                                  " "
                                )}
                              </p>
                            </div>
                          </div>
                        </div> */}
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
                                <b>Vehicle Type Name</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data?.booking?.vehicleName || ""}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                              <p className="text-sm">
                                <b>Preferred Visit Date & Time</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                {data?.booking?.visitingDate?.length > 0 &&
                                data?.booking?.visitingTime?.length > 0 ? (
                                  <ul
                                    className="mb-0"
                                    style={{
                                      color: "#494949",
                                      paddingLeft: "15px",
                                    }}
                                  >
                                    {data.booking.visitingDate.map(
                                      (date, index) => (
                                        <li className="mb-0" key={index}>
                                          {date.replace(/\[|\]/g, "")} -{" "}
                                          {data.booking.visitingTime[
                                            index
                                          ]?.replace(/\[|\]/g, "") || "N/A"}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  "N/A"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-12">
                          <div className="row mb-3">
                            <div className="col-3 d-flex justify-content-start align-items-center">
                              <p className="text-sm">
                                <b>Upload Image</b>
                              </p>
                            </div>
                            <div className="col-9 text-muted">
                              {data?.booking?.fileAttachments?.length > 0
                                ? data.booking.fileAttachments.map(
                                    (image, index) => (
                                      <img
                                        key={index}
                                        src={image}
                                        className="me-3 mb-3"
                                        alt={`Uploaded ${index + 1}`}
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                          borderRadius: "8px",
                                          objectFit: "cover",
                                          border: "1px solid #ddd",
                                          padding: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => handleImageClick(image)}
                                      />
                                    )
                                  )
                                : "N/A"}
                            </div>
                          </div>
                        </div>

                        {/* Modal for image preview */}
                        <Modal
                          centered
                          show={showModal}
                          onHide={handleClose}
                          size="md"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Image</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <img
                              src={selectedImage}
                              alt="Selected"
                              style={{
                                width: "100%",
                                height: "80vh",
                                borderRadius: "8px",
                                objectFit: "cover",
                                padding: "5px",
                              }}
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn btn-sm btn-light"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-sm btn-button"
                              onClick={handleDownload}
                            >
                              {/* <MdOutlineDownloadForOffline /> */}
                              Download
                            </button>
                          </Modal.Footer>
                        </Modal>

                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                              <p className="text-sm">
                                <b>About Moving</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data?.booking?.visitingDescription || ""}{" "}
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
                        Booking Trip Locations
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      class="accordion-collapse collapse"
                    >
                      {data?.bookingTripLocations?.length > 0 ? (
                        data.bookingTripLocations.map((location, index) => (
                          <div class="accordion-body row mt-2 p-3">
                            {/* {location.stoppingPoint === 1 &&(<h4>Pickup Location</h4>)} */}
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
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Type of Property</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    : {location.pickupTypeOfProperty || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {location.pickupNoOfBedrooms ? (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>No of Bedrooms</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        : {location.pickupNoOfBedrooms || ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {location.pickupSizeOfProperty ? (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Size of Property</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        : {location.pickupSizeOfProperty || ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {location.pickupTypeOfProperty === "Others" ? (
                              <></>
                            ) : (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Property Floor</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        : {location.pickupPropertyFloor || ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {location.pickupTypeOfProperty === "Others" ? (
                              <></>
                            ) : (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Elevator</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        :{" "}
                                        {location.pickupIsElevator
                                          ? "Yes"
                                          : "No"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {location.pickupTypeOfProperty === "Others" ? (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Description</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        :{" "}
                                        {location.pickupPropertyDescription ||
                                          "--"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
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
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Type of Property</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    : {location.dropoffTypeOfProperty || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {location.dropoffNoOfBedrooms ? (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>No of Bedrooms</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        : {location.dropoffNoOfBedrooms || ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {location.dropoffSizeOfProperty ? (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Size of Property</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        : {location.dropoffSizeOfProperty || ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {location.dropoffTypeOfProperty === "Others" ? (
                              <></>
                            ) : (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Property Floor</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        : {location.dropoffPropertyFloor || ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {location.dropoffTypeOfProperty === "Others" ? (
                              <></>
                            ) : (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Elevator</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        :{" "}
                                        {location.dropoffIsElevator
                                          ? "Yes"
                                          : "No"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {location.dropoffTypeOfProperty === "Others" ? (
                              <>
                                <div className="col-md-6 col-12">
                                  <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                      <p className="text-sm">
                                        <b>Description</b>
                                      </p>
                                    </div>
                                    <div className="col-6">
                                      <p className="text-muted text-sm">
                                        :{" "}
                                        {location.dropoffPropertyDescription ||
                                          "--"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
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
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        Transaction Details
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
                                <b>Payment Mode</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data?.transactionDetails?.paymentMode || "0"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                              <p className="text-sm">
                                <b>Transaction Amount</b>
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
                                <b>Transaction ID</b>
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
                                <b>Transaction Refrence</b>
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                :{" "}
                                {data?.transactionDetails?.txnRef.replace(
                                  /_/g,
                                  " "
                                )}
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
                        data-bs-target="#panelsStayOpen-collapseFoure"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFoure"
                      >
                        User Details
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFoure"
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
                                {data.user?.createdDate ? (
                                  <>
                                    {data.user?.createdDate.substring(0, 10)}{" "}
                                    <b>&</b>{" "}
                                    {new Date(
                                      data.user?.createdDate
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </>
                                ) : (
                                  " "
                                )}
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
                  {data.bookingStatus?.accepetedBy && (
                    <>
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
                            Driver Details
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
                                    <b>Driver Name</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    : {data?.bookingStatus?.accepetedBy || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12 position-relative">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Assigned Date</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    :{" "}
                                    {data?.bookingStatus?.acceptedDate.substring(
                                      0,
                                      10
                                    ) || ""}
                                  </p>
                                </div>
                              </div>
                              <Link
                                to={`/drivermanagement/view/${data?.bookingStatus?.driverId}`}
                                title="View Driver Details"
                              >
                                <span
                                  className="position-absolute"
                                  style={{ top: "0", right: "18px" }}
                                >
                                  <FaLink />
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {data?.bookingStatus?.status === "CANCELLED" && (
                    <>
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseSix"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseSix"
                          >
                            Cancel Details
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseSix"
                          class="accordion-collapse collapse"
                        >
                          <div class="accordion-body row mt-2 p-3">
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Cancel By</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <Link
                                    to={`/usermanagement/view/${data?.user?.userId}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <p className="text-muted text-sm">
                                      :{" "}
                                      {`${data?.user?.firstName} ${data?.user?.lastName}` ||
                                        ""}
                                    </p>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12 position-relative"></div>
                            <div className="col-md-6 col-12 position-relative">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Cancel Date</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    :{" "}
                                    {data?.review?.cancelledDate ? (
                                      <>
                                        {data?.review?.cancelledDate?.substring(
                                          0,
                                          10
                                        )}{" "}
                                        <b>&</b>{" "}
                                        {new Date(
                                          data?.review?.cancelledDate
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </>
                                    ) : (
                                      " "
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {data.review.ratingByUser !==
                    "User rating not yet available." && (
                    <>
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseSeven"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseSeven"
                          >
                            Review
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseSeven"
                          class="accordion-collapse collapse"
                        >
                          <div class="accordion-body row mt-2 p-3">
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Rating By User</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    : {data?.review?.ratingByUser || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12 position-relative">
                              {data.review.ratingByDriver !==
                                "Driver rating not yet available." && (
                                <div className="row mb-3">
                                  <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                      <b>Rating By Driver</b>
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <p className="text-muted text-sm">
                                      : {data?.review.ratingByDriver}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                  <p className="text-sm">
                                    <b>Review By User</b>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="text-muted text-sm">
                                    :{data?.review?.reviewByUser || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              {data.review.ratingByDriver !==
                                "Driver rating not yet available." && (
                                <div className="row mb-3">
                                  <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                      <b>Review By Driver</b>
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <p className="text-muted text-sm">
                                      :{data?.review?.reviewByDriver || ""}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
