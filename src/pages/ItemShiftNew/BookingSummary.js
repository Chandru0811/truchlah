import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FaTruck, FaWeightHanging } from "react-icons/fa";
import Image1 from "../../asset/24FT_LORRY.png";
import Cash from "../../asset/Cash.png";
import OnlinePayment from "../../asset/OnlinePayment.png";
import { bookingApi } from "../../config/URL";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  paymentType: Yup.string().required("!Payment Type is required"),
  isAgreed: Yup.bool().oneOf([true], "!Agreement is required"),
});

const BookingSummary = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const shiftType = sessionStorage.getItem("shiftType");
    const [data, setData] = useState({});
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const navigate=useNavigate();
    const handleAccordionToggle = (accordionKey) => {
      setExpandedAccordion((prev) => (prev === accordionKey ? null : accordionKey));
    };
    
    console.log("object", data);
    const formik = useFormik({
      initialValues: {
        paymentType: "",
        isAgreed: false,
      },
      validationSchema: validationSchema,

      onSubmit: async (values) => {
        console.log("values", values);
        setLoadIndicators(true);
        setFormData((prv) => ({
          ...prv,
          paymentType: values.paymentType,
          isAgreed: values.isAgreed,
        }));
        if (values.paymentType === "cash") {
          try {
            const response = await bookingApi.post(
              `booking/cashPayment/${formData.bookingId}`
            );
            if (response.status === 200) {
              // navigate(`/successful?type=${data?.booking?.bookingType}`);
              navigate(
                `/paymentstatus?type=${formData.data?.booking?.bookingType}&bookingId=${formData.bookingId}?result=success`
              );
              sessionStorage.removeItem("shiftType");
            } else {
              navigate(
                `/paymentstatus?type=${formData.data?.booking?.bookingType}&bookingId=${formData.bookingId}?result=error`
              );
            }
          } catch (error) {
            toast.error("Error Fetching Data: " + error.message);
            navigate(
              `/paymentstatus?type=${formData.data?.booking?.bookingType}&bookingId=${formData.bookingId}?result=error`
            );
          } finally {
            setLoadIndicators(false);
          }
        } else {
          try {
            const response = await bookingApi.post(
              `booking/generateCardTransactionPaymentLink?bookingId=${formData.bookingId}`
            );
            if (response.status === (201 || 200)) {
              const paymentLink = response.data.paymentLink.replace("?", "&");
              window.open(paymentLink, "_self");
              // toast.success("Payment successful!");
              // navigate(`/successful?type=${data?.booking?.bookingType}&bookingId=${bookingId}`);
              sessionStorage.removeItem("shiftType");
            } else {
              toast.error("Payment failed, please try again.");
              navigate(
                `/paymentstatus?type=${formData.data?.booking?.bookingType}&bookingId=${formData.bookingId}?result=error`
              );
            }
          } catch (error) {
            console.error("Payment error: " + error.message);
            navigate(
              `/paymentstatus?type=${formData.data?.booking?.bookingType}&bookingId=${formData.bookingId}?result=error`
            );
          } finally {
            setLoadIndicators(false);
          }
        }
      },
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await bookingApi.get(
            `booking/getBookingById/${formData.bookingId}`
          );
          if (response.status === 200) {
            setData(response.data.responseBody);
          }
        } catch (error) {
          toast.error("Error Fetching Data: " + error.message);
        } finally {
          // setIsLoading(false);
        }
      };

      if (formData.paymentType && formData.isAgreed) {
        formik.setFieldValue("paymentType", formData.paymentType);
        formik.setFieldValue("isAgreed", formData.isAgreed);
      }

      fetchData();
    }, []);

    const bookingTripLocations = data.bookingTripLocations || [];
    const firstLocation = bookingTripLocations[0] || {};
    const lastLocation =
      bookingTripLocations[bookingTripLocations.length - 1] || {};

    // console.log("booking", firstLocation);
    // console.log("form", lastLocation);
    // console.log("bookingTripLocations", bookingTripLocations);

    useImperativeHandle(ref, () => ({
      summary: formik.handleSubmit,
    }));

    return (
      <div className="container my-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-5 col-12 mt-4">
              <div className="card">
                <div className="">
                  <div className="d-flex justify-content-between align-items-center border-bottom ms-3 me-3 p-2">
                    <h5>Item Shifting</h5>
                    <span>
                      {new Date(data?.booking?.scheduledDate).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>

                  <ul className="list-group-flush mt-3 ps-4 pe-3">
                    <li className="list-group-item mb-2 ">
                      <div className="d-flex align-items-center ">
                        <span className=""
                          style={{ color: "#F32323" }}>&#9679;</span>
                        <strong className="ms-1">Pickup Location</strong>
                      </div>
                      <div className="accordion bg-light" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className={`accordion-button ${expandedAccordion === "Pickup" ? "" : "collapsed"
                                }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded={expandedAccordion === "Pickup"}
                              aria-controls="collapseOne"
                              onClick={() => handleAccordionToggle("Pickup")}
                            >
                              {firstLocation.pickup}
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${expandedAccordion === "Pickup" ? "show" : ""
                              }`}
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-6">
                                  <p>Address Info:</p>
                                </div>
                                <div className="col-6">
                                  <p>{firstLocation.pickupAddress}</p>
                                </div>
                                <div className="col-6">
                                  <p>Contact Details:</p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {firstLocation.pickupContactName} | +
                                    {firstLocation.pickupCountryCode}{" "}
                                    {firstLocation.pickupMobile}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {bookingTripLocations.length > 1 &&
                      bookingTripLocations.slice(0, -1).map((stop, index) => (
                        <li className="list-group-item mb-2" key={index}>
                          <div className="d-flex align-items-center ">
                            <span className="text-warning">&#9679;</span>
                            <strong className="ms-1">
                              Intermediate Location - {index + 1}
                            </strong>
                          </div>
                          <div
                            className="accordion bg-light"
                            id={`accordionExample${index}`}
                          >
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id={`heading${index}`}
                              >
                                <button
                                  className={`accordion-button ${expandedAccordion === `stop${index}` ? "" : "collapsed"
                                    }`}
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${index}`}
                                  aria-expanded={
                                    expandedAccordion === `stop${index}`
                                  }
                                  aria-controls={`collapse${index}`}
                                  onClick={() =>
                                    handleAccordionToggle(`stop${index}`)
                                  }
                                >
                                  {stop.dropoff}
                                </button>
                              </h2>
                              <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${expandedAccordion === `stop${index}`
                                  ? "show"
                                  : ""
                                  }`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent={`#accordionExample${index}`}
                              >
                                <div className="accordion-body">
                                  <div className="row">
                                    <div className="col-6">
                                      <p>Address Info:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>{stop.dropoffAddress}</p>
                                    </div>
                                    <div className="col-6">
                                      <p>Contact Details:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>
                                        {stop.dropoffContactName} | +
                                        {stop.dropoffCountryCode}{" "}
                                        {stop.dropoffMobile}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    <li className="list-group-item mb-2">
                      <div className="d-flex align-items-center ">
                        <span className=""
                          style={{ color: "#64E329" }}>&#9679;</span>
                        <strong className="ms-1">Dropoff Location</strong>
                      </div>
                      <div
                        className="accordion bg-light"
                        id="accordionExample1"
                      >
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className={`accordion-button ${expandedAccordion === "Drop" ? "" : "collapsed"
                                }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded={expandedAccordion === "Drop"}
                              aria-controls="collapseTwo"
                              onClick={() => handleAccordionToggle("Drop")}
                            >
                              {lastLocation.dropoff}
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className={`accordion-collapse collapse ${expandedAccordion === "Drop" ? "show" : ""
                              }`}
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample1"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-6">
                                  <p>Address Info:</p>
                                </div>
                                <div className="col-6">
                                  <p>{lastLocation.dropoffAddress}</p>
                                </div>
                                <div className="col-6">
                                  <p>Contact Details:</p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {lastLocation.dropoffContactName} | +
                                    {lastLocation.dropoffCountryCode}{" "}
                                    {lastLocation.dropoffMobile}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-center mt-2">
                        <strong>Total Distance:</strong> {data?.booking?.estKm}{" "}
                        KM
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card p-4 mt-3">
                <h3>Package details</h3>
                <div className="text-center">
                  <img
                    src={data?.booking?.vehicleImage}
                    alt={data?.booking?.vehicleName}
                    className="img-fluid w-25"
                  />
                  <h4>{data?.booking?.vehicleName?.split("_").join(" ")}</h4>
                  <p>
                    <FaWeightHanging /> {formData?.vehicle?.vehicleCapacity} Kg
                  </p>
                </div>
                <div className="row ps-4">
                  <div className="col-6">
                    <p>Manpower</p>
                  </div>
                  <div className="col-6">
                    <p>: {data?.booking?.helper === "Y" ? "Yes" : "No"}</p>
                  </div>
                  <div className="col-6">
                    <p>Extra ManPower</p>
                  </div>
                  <div className="col-6">
                    <p>: {data?.booking?.extraHelper === "Y" ? "Yes" : "No"}</p>
                  </div>
                  {data?.booking?.extraHelper === "Y" ? (
                    <>
                      <div className="col-6">
                        <p>Extra ManPower Quantity</p>
                      </div>

                      <div className="col-6">
                        <p>: {data?.booking?.quantity || 0}</p>
                      </div>
                    </>
                  ) : null}

                  <div className="col-6">
                    <p>Trolley Required</p>
                  </div>
                  <div className="col-6">
                    <p>
                      : {data?.booking?.trollyRequired === "Y" ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="col-6">
                    <p>Round Trip</p>
                  </div>
                  <div className="col-6">
                    <p>: {data?.booking?.roundTrip === "Y" ? "Yes" : "No"}</p>
                  </div>

                  {shiftType !== "ITEM" && (
                    <>
                      <h4>Extra Services</h4>
                      <>
                        <div className="col-6">
                          <p>Boxes</p>
                        </div>

                        <div className="col-6">
                          <p>: {data?.booking?.boxesCharge || 0}</p>
                        </div>
                        <div className="col-6">
                          <p>Long Push</p>
                        </div>

                        <div className="col-6">
                          <p>
                            : {data?.booking?.longPushCharge === "Y"
                              ? "Yes"
                              : "NO"}
                          </p>
                        </div>
                        <div className="col-6">
                          <p>Assembly/Disassembly</p>
                        </div>

                        <div className="col-6">
                          <p>
                            : {data?.booking?.assemblyDisassemblyCharge || 0}
                          </p>
                        </div>
                        <div className="col-6">
                          <p>Wrapping</p>
                        </div>

                        <div className="col-6">
                          <p>: {data?.booking?.bubbleWrappingCharge || 0}</p>
                        </div>
                      </>
                    </>
                  )}
                  <div className="col-6">
                    <p>Message To Driver</p>
                  </div>
                  <div className="col-6">
                    <p>: {data?.booking?.msgToDriver || "--"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1 col-12"></div>
            <div className="col-md-6 col-12">
              <div style={{ position: "sticky", top: "67px", zIndex: "1" }}>
                <div className="card border-0">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Payment</h6>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        style={{ minHeight: "50px" }}
                        placeholder="Enter a Coupon Code"
                      />
                      <button
                        className="btn w-25"
                        style={{ background: "rgb(172, 255, 59)" }}
                      >
                        Apply Coupon
                      </button>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <p>Subtotal</p> <p>$66.09</p>
                    </div>
                    <div className="d-flex justify-content-between mb-1 text-danger">
                      <p>Discount</p> <p>$0.00</p>
                    </div>
                    <div className="d-flex justify-content-between fw-bold mb-3">
                      <p>Total Price</p> <p>$66.09</p>
                    </div>
                    <p className="mt-3">
                      Please select your preferred payment method
                    </p>
                  </div>
                </div>
                <div className="card p-3 border-0">
                  <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                      <div
                        className={`payment-option text-center p-4 ${formik.values.paymentType === "cash" ? "active" : ""
                          }`}
                        onClick={() =>
                          formik.setFieldValue("paymentType", "cash")
                        }
                        style={{
                          border:
                            formik.values.paymentType === "cash"
                              ? "2px solid #28a745"
                              : "1px solid #e0e0e0",
                          cursor: "pointer",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={Cash}
                          alt="Cash on Delivery"
                          style={{ width: "30px", marginBottom: "5px" }}
                        />
                        <p>Cash on Delivery</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div
                        className={`payment-option text-center p-4 ${formik.values.paymentType === "online" ? "active" : ""
                          }`}
                        onClick={() =>
                          formik.setFieldValue("paymentType", "online")
                        }
                        style={{
                          border:
                            formik.values.paymentType === "online"
                              ? "2px solid #28a745"
                              : "1px solid #e0e0e0",
                          cursor: "pointer",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={OnlinePayment}
                          alt="Online Payment"
                          style={{ width: "30px", marginBottom: "5px" }}
                        />
                        <p>Online Payment</p>
                      </div>
                    </div>
                    {formik.errors.paymentType &&
                      formik.touched.paymentType && (
                        <div>
                          <small className="text-danger">
                            {formik.errors.paymentType}
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="mt-3">
                    <h5>
                      {formik.values.paymentType === "cash"
                        ? "Pay by Cash on Delivery"
                        : "Pay by Online Payment"}
                    </h5>
                    <p>
                      {formik.values.paymentType === "cash"
                        ? "Pay conveniently at your doorstep with cash on delivery."
                        : "Pay securely through online payment."}
                    </p>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      checked={formik.values.isAgreed}
                      className="form-check-input custom-checkbox"
                      id="isAgreed"
                      {...formik.getFieldProps("isAgreed")}
                    />
                    <label className="form-check-label" htmlFor="isAgreed">
                      I agree to the terms and conditions
                    </label>
                    {formik.errors.isAgreed && formik.touched.isAgreed && (
                      <div>
                        <small className="text-danger">
                          {formik.errors.isAgreed}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default BookingSummary;
