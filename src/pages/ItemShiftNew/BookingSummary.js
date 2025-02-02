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
  date: Yup.string().required("*Date is required"),
  time: Yup.string().required("*Time is required"),
  // paymentType: Yup.string().required("Please choose a payment type"),
  isAgreed: Yup.bool().oneOf([true], "*Please agree the terms and conditions"),
});

const BookingSummary = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const shiftType = localStorage.getItem("shiftType");
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState([]);
    const handleAccordionToggle = (accordionKey) => {
      setExpandedAccordion((prev) =>
        prev.includes(accordionKey)
          ? prev.filter((key) => key !== accordionKey) // Remove key if already expanded
          : [...prev, accordionKey] // Add key to expanded list
      );
    };
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (event) => {
      const files = Array.from(event.target.files);
      formik.setFieldValue("image", files);
      previews.forEach((url) => URL.revokeObjectURL(url));
      const newPreviews = files.map((image) => URL.createObjectURL(image));
      setPreviews(newPreviews);
    };

    const formik = useFormik({
      initialValues: {
        // paymentType: formData?.form4?.paymentType,
        isAgreed: false,
        date: new Date().toISOString().split("T")[0],
        time: "",
        image: [],
      },
      validationSchema: validationSchema,

      onSubmit: async (values) => {
        console.log("Form Values:", values);
        const eligibleTime = new Date();
        eligibleTime.setHours(eligibleTime.getHours());
        const deliveryDate = new Date(`${values.date}T${values.time}`);
        deliveryDate.setDate(deliveryDate.getDate() + 2);

        // setLoadIndicators(true);
        // setLoadIndicator(true);
        // setFormData((prev) => ({
        //   ...prev,
        //   form4: { ...values },
        // }));
        // if (values.paymentType === "CASH") {
        //   try {
        //     const response = await bookingApi.post(
        //       `booking/cashPayment/${formData.bookingId}`
        //     );
        //     if (response.status === 200) {
        //       // navigate(`/successful?type=${data?.booking?.bookingType}`);
        //       navigate(
        //         `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=success`
        //       );
        //       localStorage.removeItem("shiftType");
        //     } else {
        //       navigate(
        //         `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=error`
        //       );
        //     }
        //   } catch (error) {
        //     toast.error("Error Fetching Data: " + error.message);
        //     navigate(
        //       `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=error`
        //     );
        //   } finally {
        //     setLoadIndicators(false);
        //   }
        // } else {
        //   try {
        //     const response = await bookingApi.post(
        //       `booking/generateCardTransactionPaymentLink?bookingId=${formData.bookingId}`
        //     );
        //     if (response.status === (201 || 200)) {
        //       const paymentLink = response.data.paymentLink.replace("?", "&");
        //       window.open(paymentLink, "_self");
        //       // toast.success("Payment successful!");
        //       // navigate(`/successful?type=${data?.booking?.bookingType}&bookingId=${bookingId}`);
        //       localStorage.removeItem("shiftType");
        //     } else {
        //       toast.error("Payment failed, please try again.");
        //       navigate(
        //         `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=error`
        //       );
        //     }
        //   } catch (error) {
        //     console.error("Payment error: " + error.message);
        //     navigate(
        //       `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=error`
        //     );
        //   } finally {
        //     setLoadIndicators(false);
        //     setLoadIndicator(false);
        //   }
        // }
      },
    });

    // useEffect(() => {
    //   if (formData.form4.paymentType && formData.form4.isAgreed) {
    //     formik.setFieldValue("paymentType", formData.form4.paymentType);
    //     formik.setFieldValue("isAgreed", formData.form4.isAgreed);
    //   }
    //   console.log("form4", formData);
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }, []);

    const bookingTripLocations = formData?.form1?.locationDetail || [];
    const firstLocation = bookingTripLocations[0] || {};
    const lastLocation = bookingTripLocations[1] || {};

    const fetchData = async () => {
      try {
        const response = await bookingApi.get(
          `booking/getBookingById/${formData.bookingId}`
        );
        setData(response.data.responseBody);
      } catch (error) {
        toast.error("Error Fetching Data: " + error.message);
      }
    };

    const [availableTimes, setAvailableTimes] = useState([]);
    const currentTime = new Date().toTimeString().slice(0, 8);
    const today = new Date().toISOString().split("T")[0];

    const allTimes = [
      "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00",
      "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00",
      "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00",
      "15:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00",
      "19:00:00", "19:30:00", "20:00:00",
    ];

    const localTimeToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    useEffect(() => {
      // Filter available times for today's date
      const timesAfterFilter = allTimes.filter(
        (time) => localTimeToMinutes(time) > localTimeToMinutes(currentTime)
      );
      setAvailableTimes(timesAfterFilter);
    }, []); // Empty dependency array ensures this runs only on initial render.

    const handleDateChange = (e) => {
      const selectedDate = e.target.value;
      formik.setFieldValue("date", selectedDate);

      if (selectedDate === today) {
        const timesAfterFilter = allTimes.filter(
          (time) => localTimeToMinutes(time) > localTimeToMinutes(currentTime)
        );
        setAvailableTimes(timesAfterFilter);
      } else {
        setAvailableTimes(allTimes);
      }
    };

    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
      .toISOString()
      .split("T")[0];

    // console.log("date", maxDate);

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div className="container my-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-5 col-12 mt-4">
              <div className="card">
                <div className="">
                  <div className="d-flex justify-content-between align-items-center border-bottom ms-3 me-3 p-2">
                    <h5>
                      {formData.form1.type === "ITEM"
                        ? "Item Shifting"
                        : "House Shifting"}
                    </h5>

                    {/* <span>  {new Date(`${formData?.form2?.date}T${formData?.form2?.time}.000Z`).toLocaleString(
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
                    </span> */}
                  </div>

                  <ul className="list-group-flush mt-3 ps-4 pe-3">
                    <li className="list-group-item mb-2 ">
                      <div className="d-flex align-items-center mb-2">
                        <span className="" style={{ color: "#5271ff" }}>
                          &#9679;
                        </span>
                        <strong className="ms-1">Pickup Location</strong>
                      </div>
                      <div className="accordion bg-light" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className={`accordion-button ${expandedAccordion === "Pickup"
                                ? ""
                                : "collapsed"
                                }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded={expandedAccordion === "Pickup"}
                              aria-controls="collapseOne"
                              onClick={() => handleAccordionToggle("Pickup")}
                            >
                              {firstLocation.location}
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
                                  <p>{firstLocation.address}</p>
                                </div>
                                <div className="col-6">
                                  <p>Contact Details:</p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {firstLocation.contactName} | +
                                    {firstLocation.countryCode}{" "}
                                    {firstLocation.mobile}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {bookingTripLocations.length > 1 &&
                      bookingTripLocations.slice(2).map((stop, index) => (
                        <li className="list-group-item mb-2" key={index}>
                          <div className="d-flex align-items-center mb-2">
                            <span style={{ color: "#acff3b" }}>&#9679;</span>
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
                                  className={`accordion-button ${expandedAccordion === `stop${index}`
                                    ? ""
                                    : "collapsed"
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
                                  {stop.location}
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
                                      <p>{stop.address}</p>
                                    </div>
                                    <div className="col-6">
                                      <p>Contact Details:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>
                                        {stop.contactName} | +{stop.countryCode}{" "}
                                        {stop.mobile}
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
                      <div className="d-flex align-items-center mb-2">
                        <span className="" style={{ color: "#00bf63" }}>
                          &#9679;
                        </span>
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
                              {lastLocation.location}
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
                                  <p>{lastLocation.address}</p>
                                </div>
                                <div className="col-6">
                                  <p>Contact Details:</p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {lastLocation.contactName} | +
                                    {lastLocation.countryCode}{" "}
                                    {lastLocation.mobile}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-center mt-2">
                        <strong>Total Distance:</strong>{" "}
                        {formData?.form1?.estKm} KM
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card p-4 mt-3">
                <h3>Package details</h3>
                <div className="text-center">
                  <img
                    src={formData?.form2?.vehicle?.vehicleImage}
                    alt={formData?.form2?.vehicle?.vehicleName}
                    className="img-fluid w-25"
                  />
                  <h4>
                    {formData?.form2?.vehicle?.vehicleName
                      ?.split("_")
                      .join(" ")}
                  </h4>
                  <p>
                    <b>Capacity : </b>{" "}
                    {formData?.form2?.vehicle?.vehicleCapacity} Kg
                  </p>
                </div>
                <div className="row ps-4">
                  <div className="col-6">
                    <p>Manpower</p>
                  </div>
                  <div className="col-6">
                    <p>: {formData?.form3?.driverAsManpower ? "Yes" : "No"}</p>
                  </div>
                  <div className="col-6">
                    <p>Extra ManPower</p>
                  </div>
                  <div className="col-6">
                    <p>: {formData?.form3?.extraManpower ? "Yes" : "No"}</p>
                  </div>
                  {formData?.form3?.extraManpower ? (
                    <>
                      <div className="col-6">
                        <p>Extra ManPower Quantity</p>
                      </div>

                      <div className="col-6">
                        <p>: {formData?.form3?.quantity || 0}</p>
                      </div>
                    </>
                  ) : null}

                  <div className="col-6">
                    <p>Trolley Required</p>
                  </div>
                  <div className="col-6">
                    <p>: {formData?.form3?.trollyRequired ? "Yes" : "No"}</p>
                  </div>
                  <div className="col-6">
                    <p>Round Trip</p>
                  </div>
                  <div className="col-6">
                    <p>: {formData?.form3?.roundTripRequired ? "Yes" : "No"}</p>
                  </div>

                  {formData.form1.type !== "ITEM" && (
                    <>
                      <h4>Extra Services</h4>
                      <>
                        <div className="col-6">
                          <p>Boxes</p>
                        </div>

                        <div className="col-6">
                          <p>: {formData?.extraService[1] || 0}</p>
                        </div>
                        <div className="col-6">
                          <p>Long Push</p>
                        </div>

                        <div className="col-6">
                          <p>
                            : {formData?.extraService[2] === "Y" ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="col-6">
                          <p>Assembly/Disassembly</p>
                        </div>

                        <div className="col-6">
                          <p>: {formData?.extraService[3] || 0}</p>
                        </div>
                        <div className="col-6">
                          <p>Wrapping</p>
                        </div>

                        <div className="col-6">
                          <p>: {formData?.extraService[4] || 0}</p>
                        </div>
                      </>
                    </>
                  )}
                  <div className="col-6">
                    <p>Message To Driver</p>
                  </div>
                  <div className="col-6">
                    <p>: {formData?.form3?.messageToDriver || "--"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1 col-12"></div>
            <div className="col-md-6 col-12">
              <div style={{ position: "sticky", top: "67px", zIndex: "1" }}>
                {/* <div className="card border-0">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Payment</h6>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        style={{ minHeight: "50px" }}
                        placeholder="Enter a Coupon Code"
                        disabled
                      />
                      <button
                        type="button"
                        className="btn w-25"
                        style={{ background: "rgb(172, 255, 59)" }}
                        disabled
                      >
                        Apply Coupon
                      </button>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <p>Subtotal</p>{" "}
                      <p>
                        ${" "}
                        {data.transactionDetails
                          ? `${data.transactionDetails.txnAmount.toFixed(2)}`
                          : "0.00"}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mb-1 text-success">
                      <p>Discount</p> <p>$0.00</p>
                    </div>
                    <div className="d-flex justify-content-between fw-bold mb-3">
                      <p>Total Price</p>{" "}
                      <p>
                        ${" "}
                        {data.transactionDetails
                          ? `${data.transactionDetails.txnAmount.toFixed(2)}`
                          : "0.00"}
                      </p>
                    </div>
                    <p className="mt-3">
                      Please select your preferred payment method
                    </p>
                  </div>
                </div> */}

                <div className="card-body">
                  <h4 className="mt-3 mb-3">Our Scheduled Visit for Inspection and Quote</h4>
                  <div className="mt-4" >
                    <h6 className="mb-3">Preferred Visit Date
                      <span class="text-danger">*</span>
                    </h6>
                    <input
                      type="date"
                      className="date-field form-control text-muted"
                      aria-label="Date"
                      aria-describedby="basic-addon1"
                      min={new Date().toISOString().split("T")[0]}
                      placeholder="Select date"
                      style={{ minHeight: "50px" }}
                      {...formik.getFieldProps("date")}
                      name="date"
                      onChange={handleDateChange}
                      max={maxDate}
                    />
                  </div>
                  <div className="p-1">
                    {formik.touched.date && formik.errors.date && (
                      <div className="mb-2 text-danger">{formik.errors.date}</div>
                    )}
                  </div>

                  <div className="mb-3 mt-4">
                    <h6 className="mb-3">Preferred Visit Time
                      <span class="text-danger">*</span>
                    </h6>
                    <select
                      className="form-select text-muted"
                      aria-label="Default select example"
                      style={{
                        minHeight: "50px",
                      }}
                      {...formik.getFieldProps("time")}
                    >
                      <option selected>Select Time</option>
                      {availableTimes && availableTimes.length > 0 ? (
                        availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </option>
                        ))
                      ) : (
                        <option disabled>Service Unavailable</option>
                      )}
                    </select>
                  </div>
                  <div className="p-1">
                    {formik.touched.time && formik.errors.time && (
                      <div className="mb-2 text-danger">{formik.errors.time}</div>
                    )}
                  </div>
                  <div className="mt-3 mb-3" >
                    <h6 className="mb-3">Upload images of goods / space expected for transit</h6>
                    <input
                      type="file"
                      className="date-field form-control text-muted"
                      name="image"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    // {...formik.getFieldProps("files")}
                    />
                  </div>
                  {previews?.length > 0 && (
                    <div className="mt-3">
                      <div className="d-flex flex-wrap gap-2">
                        {previews.map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              border: "1px solid #ddd",
                              padding: "5px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="card p-3 border-0">
                  {/* <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                      <div
                        className={`payment-option text-center p-4 ${formik.values.paymentType === "CASH" ? "active" : ""
                          }`}
                        onClick={() =>
                          formik.setFieldValue("paymentType", "CASH")
                        }
                        style={{
                          border:
                            formik.values.paymentType === "CASH"
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
                        className={`payment-option text-center p-4 ${formik.values.paymentType === "ONLINE" ? "active" : ""
                          }`}
                        onClick={() =>
                          formik.setFieldValue("paymentType", "ONLINE")
                        }
                        style={{
                          border:
                            formik.values.paymentType === "ONLINE"
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
                      {formik.values.paymentType === "CASH"
                        ? "Pay by Cash on Delivery"
                        : "Pay by Online Payment"}
                    </h5>
                    <p>
                      {formik.values.paymentType === "CASH"
                        ? "Pay conveniently at your doorstep with cash on delivery."
                        : "Pay securely through online payment."}
                    </p>
                  </div> */}
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
                  <button
                    type="submit"
                    style={{
                      padding: "7px 25px",
                      background: "#acff3b",
                    }}
                    className="btn btn-sm fw-bold mt-5"
                  // disabled={loadIndicator}
                  >
                    {/* {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )} */}
                    Proceed
                  </button>
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
