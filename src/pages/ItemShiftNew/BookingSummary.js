import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { bookingApi } from "../../config/URL";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { Modal, Button } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import { FaChevronDown } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  // visitingDate: Yup.string().required("*Date is required"),
  // visitingTime: Yup.string().required("*Time is required"),
  // paymentType: Yup.string().required("Please choose a payment type"),
  isAgreed: Yup.bool().oneOf([true], "*Please agree the terms and conditions"),
  timeDate: Yup.array()
    .of(
      Yup.object().shape({
        sdate: Yup.string().required("*Date is required"),
        sTime: Yup.string().when("sdate", {
          is: (val) => !!val,
          then: (schema) => schema.required("*Time is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    )
    .min(1, "*Select the Date"),
  about: Yup.string()
    .max(255, "*About cannot exceed 255 characters.")
    .notRequired(),
});

const BookingSummary = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const shiftType = localStorage.getItem("shiftType");
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState([]);
    const today = new Date().toISOString().split("T")[0];
    const bookingId = formData.bookingId;
    const [show, setShow] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);

    const handleAccordionToggle = (accordionKey) => {
      setExpandedAccordion(
        (prev) =>
          prev.includes(accordionKey)
            ? prev.filter((key) => key !== accordionKey) // Remove key if already expanded
            : [...prev, accordionKey] // Add key to expanded list
      );
    };

    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      console.log("Newly selected images:", selectedFiles);

      // Merge new files with existing ones
      const mergedFiles = [...files, ...selectedFiles];
      formik.setFieldValue("files", mergedFiles);

      // Revoke previous object URLs to prevent memory leaks
      previews.forEach((url) => URL.revokeObjectURL(url));

      // Generate new preview URLs
      const newPreviews = mergedFiles.map((file) => URL.createObjectURL(file));

      setFiles(mergedFiles);
      setPreviews(newPreviews);

      // Update file input manually
      const dataTransfer = new DataTransfer();
      mergedFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    };

    const removeImage = (index) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      const updatedPreviews = previews.filter((_, i) => i !== index);

      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      formik.setFieldValue("files", updatedFiles);

      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    };

    const formik = useFormik({
      initialValues: {
        bookingId: bookingId,
        isAgreed: false,
        files: [],
        timeDate: [],
        about: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        setLoadIndicator(true);
        const visitingDate = values.timeDate.map((data) => data.sdate);
        const visitingTime = values.timeDate.map((data) => data.sTime);
        const formDatas = new FormData();
        formDatas.append("bookingId", values.bookingId);
        formDatas.append("visitingDate", visitingDate);
        formDatas.append("visitingTime", visitingTime);
        formDatas.append("visitingDescription", values.about);
        values.files.forEach((file) => {
          formDatas.append("files", file);
        });
        try {
          const response = await bookingApi.put(
            `booking/verification`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            // toast.success(response.data.message);
            // navigate(`/successful?type=${data?.booking?.bookingType}`);
            navigate(
              `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=success`
            );
            localStorage.removeItem("shiftType");
          } else {
            navigate(
              `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=error`
            );
          }
        } catch (error) {
          toast.error("Error Fetching Data: " + error.message);
          navigate(
            `/paymentstatus?type=${formData?.form1?.type}&bookingId=${formData.bookingId}?result=error`
          );
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useEffect(() => {
      if (formData.form4.paymentType && formData.form4.isAgreed) {
        formik.setFieldValue("paymentType", formData.form4.paymentType);
        formik.setFieldValue("isAgreed", formData.form4.isAgreed);
      }
      console.log("form4", formData);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

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

    // const [availableTimes, setAvailableTimes] = useState([]);

    const TimeData = async (selectedDate) => {
      if (!selectedDate) return;
    };

    // const handleDateChange = (e) => {
    //   const selectedDate = e.target.value;
    //   formik.setFieldValue("visitingDate", selectedDate);
    //   TimeData(selectedDate); // Fetch times for the selected date
    // };

    // const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
    //   .toISOString()
    //   .split("T")[0];

    // console.log("date", maxDate);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchData();
      TimeData(today);
    }, []);
    function timeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }
    const handleDateModelChange = async (date, event) => {
      if (typeof date === "string") {
        const dateString = date;
        const time = event.target.value || "";
        let updatedDates = [...formik.values.timeDate];

        const dateIndex = updatedDates.findIndex((d) => d.sdate === dateString);
        if (dateIndex !== -1) {
          if (updatedDates[dateIndex].sTime === "" || time) {
            updatedDates[dateIndex].sTime = time;
          }
        } else {
          updatedDates.push({ sdate: dateString, sTime: time });
        }
        // setSelectedDates(updatedDates);
        formik.setFieldValue("timeDate", updatedDates);
      } else {
        const dateString = date.toDateString();
        // let updatedDates = [...selectedDates];
        let updatedDates = [...formik.values.timeDate];
        let response;
        let availableSlot = [];
        const yyyy = new Date(date).getFullYear();
        const mm = String(new Date(date).getMonth() + 1).padStart(2, "0");
        const dd = String(new Date(date).getDate()).padStart(2, "0");

        const formattedDate = `${yyyy}-${mm}-${dd}`;
        try {
          response = await bookingApi.get(
            `booking/getAvailableVisitingTime?visitingDate=${formattedDate}`
          );
          availableSlot = response.data.responseBody;
          if (updatedDates.some((d) => d.sdate === dateString)) {
            updatedDates = updatedDates.filter((d) => d.sdate !== dateString);
          } else {
            const today = new Date().toISOString().split("T")[0];
            const currentTime = new Date().toTimeString().slice(0, 8);
            // console.log("object", formattedDate === today);
            if (formattedDate === today) {
              const timesAfterFilter = availableSlot.reduce((acc, time) => {
                if (timeToMinutes(time) > timeToMinutes(currentTime)) {
                  acc.push(time);
                } else {
                }
                return acc;
              }, []);
              availableSlot = timesAfterFilter;
            } else {
              availableSlot = availableSlot;
            }
            updatedDates.push({
              sdate: dateString,
              sTime: "",
              option: availableSlot ? availableSlot : [],
            });
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }

        // setSelectedDates(updatedDates);
        formik.setFieldValue("timeDate", updatedDates);
      }
    };

    useEffect(() => {
      const label = document.querySelector(
        ".react-calendar__navigation__label"
      );
      if (label) {
        label.setAttribute("disabled", "true");
      }
    }, [show]);

    useEffect(() => {}, [formik.values.timeDate]);

    const handleDateDelete = (sdate) => {
      const updatedDates = formik.values.timeDate.filter(
        (date) => date.sdate !== sdate
      );
      formik.setFieldValue("timeDate", updatedDates);
    };

    const handleValidateClick = async () => {
      const errors = await formik.validateForm();
      // console.log("object", errors);
      if (!errors.timeDate) {
        // if (Object.keys(errors.timeDate).length === 0) {
        setShow(false);
        // } else {
        //   console.log("Form is invalid, cannot proceed.");
        // }
      }
    };
    useEffect(() => {
      if (Array.isArray(formik.errors.timeDate) || formik.errors.timeDate) {
        setIsError(true);
        // setShow(true);
      } else {
        setIsError(false);
      }
      // console.log(formik.errors.timeDate);
    }, [formik.errors.timeDate]);
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
                              className={`accordion-button ${
                                expandedAccordion === "Pickup"
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
                              {firstLocation.address}
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${
                              expandedAccordion === "Pickup" ? "show" : ""
                            }`}
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-6">
                                  <p>Postal Code:</p>
                                </div>
                                <div className="col-6">
                                  <p>{firstLocation.location}</p>
                                </div>
                                <div className="col-6">
                                  <p>Contact Details:</p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {firstLocation.contactName
                                      ? `${firstLocation.contactName} |`
                                      : ""}
                                    {firstLocation.countryCode
                                      ? `+${firstLocation.countryCode}`
                                      : ""}
                                    {firstLocation.mobile
                                      ? ` ${firstLocation.mobile}`
                                      : ""}
                                    {!firstLocation.contactName &&
                                    !firstLocation.countryCode &&
                                    !firstLocation.mobile
                                      ? "--"
                                      : ""}
                                  </p>
                                </div>
                                {firstLocation.typeOfProperty ? (
                                  <>
                                    <div className="col-6">
                                      <p>Type of Property:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>{firstLocation.typeOfProperty}</p>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {firstLocation.typeOfProperty !== "Others" &&
                                  firstLocation.noOfBedrooms && (
                                    <>
                                      <div className="col-6">
                                        <p>No of Bedrooms:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{firstLocation.noOfBedrooms}</p>
                                      </div>
                                    </>
                                  )}
                                {firstLocation.typeOfProperty !== "Others" &&
                                  firstLocation.sizeOfProperty && (
                                    <>
                                      <div className="col-6">
                                        <p>Size of property:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{firstLocation.sizeOfProperty}</p>
                                      </div>
                                    </>
                                  )}
                                {firstLocation.typeOfProperty !== "Others" &&
                                  firstLocation.propertyFloor && (
                                    <>
                                      <div className="col-6">
                                        <p>Property Floor:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{firstLocation.propertyFloor}</p>
                                      </div>
                                    </>
                                  )}
                                {firstLocation.typeOfProperty !== "Others" &&
                                  firstLocation.propertyFloor && (
                                    <>
                                      <div className="col-6">
                                        <p>Elevator:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>
                                          {firstLocation.isElevator
                                            ? "Yes"
                                            : "No"}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                {firstLocation.typeOfProperty === "Others" ? (
                                  <>
                                    <div className="col-6">
                                      <p>Property Description:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>{firstLocation.propertyDescription}</p>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
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
                                  className={`accordion-button ${
                                    expandedAccordion === `stop${index}`
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
                                  {stop.address}
                                </button>
                              </h2>
                              <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${
                                  expandedAccordion === `stop${index}`
                                    ? "show"
                                    : ""
                                }`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent={`#accordionExample${index}`}
                              >
                                <div className="accordion-body">
                                  <div className="row">
                                    <div className="col-6">
                                      <p>Postal Code:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>{stop.location}</p>
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
                              className={`accordion-button ${
                                expandedAccordion === "Drop" ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded={expandedAccordion === "Drop"}
                              aria-controls="collapseTwo"
                              onClick={() => handleAccordionToggle("Drop")}
                            >
                              {lastLocation.address}
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className={`accordion-collapse collapse ${
                              expandedAccordion === "Drop" ? "show" : ""
                            }`}
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample1"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-6">
                                  <p>Postal Code:</p>
                                </div>
                                <div className="col-6">
                                  <p>{lastLocation.location}</p>
                                </div>
                                <div className="col-6">
                                  <p>Contact Details:</p>
                                </div>
                                <div className="col-6">
                                  <p>
                                    {lastLocation.contactName
                                      ? `${lastLocation.contactName} |`
                                      : ""}
                                    {lastLocation.countryCode
                                      ? `+${lastLocation.countryCode}`
                                      : ""}
                                    {lastLocation.mobile
                                      ? ` ${lastLocation.mobile}`
                                      : ""}
                                    {!lastLocation.contactName &&
                                    !lastLocation.countryCode &&
                                    !lastLocation.mobile
                                      ? "--"
                                      : ""}
                                  </p>
                                </div>
                                {lastLocation.typeOfProperty ? (
                                  <>
                                    <div className="col-6">
                                      <p>Type of Property:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>{lastLocation.typeOfProperty}</p>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {lastLocation.typeOfProperty !== "Others" &&
                                  lastLocation.noOfBedrooms && (
                                    <>
                                      <div className="col-6">
                                        <p>No of Bedrooms:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{lastLocation.noOfBedrooms}</p>
                                      </div>
                                    </>
                                  )}
                                {lastLocation.typeOfProperty !== "Others" &&
                                  lastLocation.sizeOfProperty && (
                                    <>
                                      <div className="col-6">
                                        <p>Size of property:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{lastLocation.sizeOfProperty}</p>
                                      </div>
                                    </>
                                  )}
                                {lastLocation.typeOfProperty !== "Others" &&
                                  lastLocation.propertyFloor && (
                                    <>
                                      <div className="col-6">
                                        <p>Property Floor:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{lastLocation.propertyFloor}</p>
                                      </div>
                                    </>
                                  )}
                                {lastLocation.typeOfProperty !== "Others" &&
                                  typeof firstLocation.isElevator ===
                                    "boolean" && (
                                    <>
                                      <div className="col-6">
                                        <p>Elevator:</p>
                                      </div>
                                      <div className="col-6">
                                        <p>
                                          {lastLocation.isElevator
                                            ? "Yes"
                                            : "No"}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                {lastLocation.typeOfProperty === "Others" ? (
                                  <>
                                    <div className="col-6">
                                      <p>Property Description:</p>
                                    </div>
                                    <div className="col-6">
                                      <p>{lastLocation.propertyDescription}</p>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <p className="text-center mt-2">
                        <strong>Total Distance:</strong>{" "}
                        {formData?.form1?.estKm} KM
                      </p> */}
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
                  <h5 className="mt-3 mb-3 fw-semibol">
                    Pick a time for On-Site / Virtual Inspection
                  </h5>
                  <p className="mb-4">
                    {formData?.form1?.type === "ITEM"
                      ? "To avoid inaccurate quotes, our team of experts will either manually visit or do a virtual inspection of your site/goods."
                      : `To avoid inaccurate quotes, our team of experts will
                    manually visit and inspect your site / goods.`}{" "}
                    Once completed, you will be offered the best and lowest
                    price in the market for moving your goods and items in the
                    safest way possible without any damage.
                  </p>
                  <div className="">
                    <h6 className="mb-3">
                      Preferred Visit Date
                      <span class="text-danger">*</span>
                    </h6>
                    <div
                      className="card d-flex flex-row justify-content-between py-2 ps-2 pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShow(true)}
                    >
                      <div className="d-flex flex-row justify-content-start">
                        {formik.values.timeDate.length > 0 ? (
                          formik.values.timeDate.map((data, i) => (
                            <span key={i} className="ps-2">
                              {`${new Date(data.sdate).getDate()} ${new Date(
                                data.sdate
                              ).toLocaleString("default", {
                                month: "short",
                              })}${
                                i < formik.values.timeDate.length - 1 ? "," : ""
                              }`}
                            </span>
                          ))
                        ) : (
                          <span className="ps-2">Select the Date</span>
                        )}
                      </div>
                      <div className="text-muted">
                        <FaChevronDown />
                      </div>
                    </div>
                    {Array.isArray(formik.errors.timeDate)
                      ? null
                      : formik.errors.timeDate &&
                        formik.touched.timeDate && (
                          <small className="text-danger">
                            {formik.errors.timeDate}
                          </small>
                        )}
                  </div>

                  {/* <div className="mb-3 mt-4">
                    <h6 className="mb-3">
                      Preferred Visit Time
                      <span class="text-danger">*</span>
                    </h6>
                    <select
                      className="form-select text-muted"
                      style={{ minHeight: "50px" }}
                      {...formik.getFieldProps("visitingTime")}
                    >
                      <option value="">Select Time</option>
                      {availableTimes.length > 0 ? (
                        availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {new Date(`1970-01-01T${time}`).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </option>
                        ))
                      ) : (
                        <option disabled>Service Unavailable</option>
                      )}
                    </select>
                  </div>
                  <div className="p-1">
                    {formik.touched.visitingTime &&
                      formik.errors.visitingTime && (
                        <div className="mb-2 text-danger">
                          {formik.errors.visitingTime}
                        </div>
                      )}
                  </div> */}
                  <div className="mt-4">
                    <h6 className="mb-2">
                      Upload images of goods / space expected for transit
                    </h6>
                    <p className="text-muted">
                      This will help us evaluate the moving process
                    </p>
                    <input
                      type="file"
                      className="date-field form-control text-muted"
                      name="files"
                      accept="image/*"
                      multiple={true}
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </div>
                  {previews.length > 0 && (
                    <div className="mt-3">
                      <div className="d-flex flex-wrap gap-2">
                        {previews.map((src, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "15px",
                                height: "15px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                            >
                              <FaTimes size={12} />
                            </button>

                            {/* Image preview */}
                            <img
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mb-3 mt-4">
                    <h6 className="mb-3">
                      Additional Info{" "}
                      <span className="text-muted ms-1">(Optional)</span>
                    </h6>
                    <textarea
                      style={{ resize: "none" }}
                      rows={5}
                      className="form-control text-muted"
                      {...formik.getFieldProps("about")}
                    ></textarea>
                    {formik.touched.about && formik.errors.about && (
                      <small className="mb-2 text-danger">
                        {formik.errors.about}
                      </small>
                    )}
                  </div>
                </div>

                <div className="card py-3 border-0">
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
                      I agree to the{" "}
                      <a
                        href="https://trucklah.com/termsandconditions"
                        target="_blank"
                      >
                        Terms and Conditions
                      </a>
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
                    type="button"
                    onClick={() =>
                      isError ? setShow(true) : formik.handleSubmit()
                    }
                    style={{
                      padding: "7px 25px",
                      background: "#acff3b",
                    }}
                    className="btn btn-sm fw-bold mt-5 "
                    disabled={loadIndicator}
                  >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          size="lg"
          backdrop={"static"}
          // style={{ overflow: "hidden" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Inspection Date & Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                // overflow: "auto",
                // maxWidth: "400px",
                margin: "auto",
                padding: "10px ",
              }}
            >
              <div className="row">
                <div className="col-md-6 col-12 mt-4">
                  <Calendar
                    onClickDay={handleDateModelChange}
                    tileClassName={({ date }) =>
                      formik.values.timeDate.some(
                        (d) => d.sdate === date.toDateString()
                      )
                        ? "selected-date"
                        : ""
                    }
                    tileDisabled={({ date }) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const tomorrow = new Date(today);
                      tomorrow.setDate(today.getDate()); // Tomorrow
                      let maxDate = new Date(formData.form2.date);
                      maxDate.setDate(maxDate.getDate() - 1); // Set max date to one day before form2.date
                      return date < tomorrow || date > maxDate;
                    }}
                  />
                  {Array.isArray(formik.errors.timeDate)
                    ? null
                    : formik.errors.timeDate &&
                      formik.touched.timeDate && (
                        <small className="text-danger">
                          {formik.errors.timeDate}
                        </small>
                      )}
                </div>
                <div className="col-md-6 col-12">
                  <h5 className="mb-4 text-center">
                    You can select multiple preferred dates.
                  </h5>
                  <p>Selected Slots:</p>
                  <div
                    className="pt-2 custom-scrollbar"
                    style={{ height: "280px", overflow: "auto" }}
                  >
                    {formik.values.timeDate
                      .slice()
                      .sort((a, b) => new Date(a.sdate) - new Date(b.sdate))
                      .map((date, index) => {
                        // No need to use index
                        const parsedDate = new Date(date.sdate);
                        return (
                          <div key={date.sdate}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <p className="mb-0">
                                {`${parsedDate.getDate()} ${parsedDate.toLocaleString(
                                  "default",
                                  { month: "short" }
                                )}`}
                              </p>
                              <div className="d-flex justify-content-between gap-2 align-items-center">
                                <select
                                  className="form-select"
                                  value={date.sTime || ""}
                                  onChange={(event) =>
                                    handleDateModelChange(date.sdate, event)
                                  }
                                >
                                  {date?.option.length > 0 ? (
                                    <>
                                      <option value="">Select slots</option>
                                      {date?.option.map((t, i) => (
                                        <option key={i} value={t}>
                                          {new Date(
                                            `1970-01-01T${t}`
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                          })}
                                        </option>
                                      ))}
                                    </>
                                  ) : (
                                    <option value="" disabled>
                                      Unavailable
                                    </option>
                                  )}
                                </select>
                                <button
                                  className="btn btn-sm"
                                  onClick={() => handleDateDelete(date.sdate)}
                                >
                                  <FaRegTrashAlt />
                                </button>
                              </div>
                            </div>
                            {formik.errors.timeDate?.[index]?.sTime && (
                              <small className="text-danger">
                                {formik.errors.timeDate[index].sTime}
                              </small>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="pe-4">
            <button
              type="submit"
              style={{
                padding: "7px 25px",
                background: "#acff3b",
              }}
              onClick={handleValidateClick}
              className="btn btn-sm fw-bold "
            >
              Submit
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);

export default BookingSummary;
