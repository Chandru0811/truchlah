import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { Button } from "react-bootstrap";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi, userApi } from "../../config/URL";
import { Modal } from "react-bootstrap";
import VehicleOffer from "../../pages/common_pages/VehicleOffer.js";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
});

const DateAndTime = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const shiftType = localStorage.getItem("shiftType");
    const userId = localStorage.getItem("userId");
    const [vehicle, setVechicle] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(
      formData?.form2.vehicle?.vehicletypeId
        ? formData.form2?.vehicle?.vehicletypeId
        : 0
    );
    const [isModified, setIsModified] = useState(false);
    const [selectedImage, setSelectedImage] = useState(
      formData?.form2?.vehicle?.vehicletypeId
        ? vehicle.find(
          (data) =>
            data.vehicletypeId === formData?.form2.vehicle.vehicletypeId
        )
        : null
    );
    const [showModal, setShowModal] = useState(
      formData.form1.type !== "ITEM" && formData.form2.date === ""
        ? true
        : false
    );
    const handleShow = () => setShowModal(true);
    const handleClose = () => {
      setShowModal(false);
      setIsModified(false); // Reset isModified when closing the modal
    };
    // console.log("activeIndex", activeIndex);
    // console.log("from", formData);
    const formik = useFormik({
      initialValues: {
        date: formData.form2.date,
        time: formData.form2.time,
      },
      validationSchema: validationSchema,

      onSubmit: async (values) => {
        const eligibleTime = new Date();
        eligibleTime.setHours(eligibleTime.getHours());
        // if (selectedDateTime >= eligibleTime) {
        const selectedOption = vehicle.find(
          (item) => item.vehicletypeId === selectedImage.vehicletypeId
        );
        // setFormData((prv) => ({ ...prv, vehicle: selectedOption }));
        setFormData((prev) => ({
          ...prev,
          form2: { ...values, vehicle: selectedOption },
        }));
        const deliveryDate = new Date(`${values.date}T${values.time}`);
        deliveryDate.setDate(deliveryDate.getDate() + 2);

        setLoadIndicators(true);
        const payload = {
          userId: userId,
          type: formData.form1.type,
          locationDetail: formData.form1.locationDetail,
          bookingId: formData.bookingId,
          scheduledDate: `${values.date}T${values.time}.000Z`,
          vehicleType: selectedOption.type,
          actualKm: formData.form1.estKm,
        };
        try {
          const response = await bookingApi.put(`booking/update`, payload);
          if (response.status === 200) {
            toast.success("Vehicle selected successfully!");
            setFormData((prev) => ({
              ...prev,
              form2: { ...values, vehicle: selectedOption },
            }));
            handleNext();
            // navigate(`/summary/${bookingId}`);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.message);
          console.log(error);
        } finally {
          setLoadIndicators(false);
        }
        // } else {
        //   toast.warning("You must select a time at least 3 hours from now");
        // }
      },
    });

    useEffect(() => {
      const getVechicle = async () => {
        try {
          if (shiftType === "ITEM") {
            const response = await userApi.get("vehicle/vehicleType");
            if (response.status === 200) {
              setVechicle(response.data.responseBody);
              // console.log(
              //   "object",
              //   response.data.responseBody[0]?.vehicletypeId
              // );
              setActiveIndex(
                formData?.form2.vehicle?.vehicletypeId
                  ? formData.form2.vehicle.vehicletypeId
                  : response.data.responseBody[0]?.vehicletypeId
              );
            }
          } else {
            const response = await userApi.get(
              "/vehicle/getAvailableVehiclesForHouseShifting"
            );
            if (response.status === 200) {
              setVechicle(response.data.responseBody);
              // console.log(
              //   "object",
              //   response.data.responseBody[0]?.vehicletypeId
              // );
              setActiveIndex(
                formData?.form2.vehicle?.vehicletypeId
                  ? formData.form2.vehicle.vehicletypeId
                  : response.data.responseBody[0]?.vehicletypeId
              );
            }
          }
        } catch (e) {
          toast.error("Error Fetching Data : ", e);
        }
      };
      getVechicle();
      // console.log("object", vehicle);
      window.scrollTo({ top: 0, behavior: "smooth" });
      formik.setFieldValue(
        "date",
        formik.values.date
          ? formik.values.date
          :
          // ""
          new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]
      );
      formik.setFieldValue("time", formData.form2.time);
    }, []);

    useEffect(() => {
      if (
        vehicle.length > 0 &&
        (!selectedImage ||
          (typeof selectedImage === "object" &&
            Object.keys(selectedImage).length === 0))
      ) {
        const selectedVehicle = vehicle.find(
          (data) => data.vehicletypeId === activeIndex
        );
        setSelectedImage(selectedVehicle);
        // console.log("select", selectedVehicle);
      }
      // console.log("setSelectedImage", selectedImage);
      // console.log("active", activeIndex);
      console.log("form", formData);
    }, [vehicle, selectedImage]);

    const handleCarouselClick = (image, index) => {
      const overallIndex = image.vehicletypeId;
      setSelectedImage(image);
      setActiveIndex(overallIndex);
    };

    const handleNextImg = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < vehicle.length - 2 ? prevIndex + 1 : 0
      );
    };

    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : vehicle.length - 1
      );
    };

    const getVisibleData = () => {
      const visibleData = [];
      for (let i = 0; i < 3; i++) {
        visibleData.push(vehicle[(currentIndex + i) % vehicle.length]);
      }
      return visibleData;
    };

    function timeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }
    // const handleDateChange = (e) => {
    //   const selectedDate = e.target.value;
    //   formik.setFieldValue("date", selectedDate);

    //   const today = new Date().toISOString().split("T")[0];
    //   const currentTime = new Date().toTimeString().slice(0, 8);
    //   if (selectedDate === today) {
    //     // console.log("currentTime", currentTime);
    //     const timesAfterFilter = availableTimes.reduce((acc, time) => {
    //       if (timeToMinutes(time) > timeToMinutes(currentTime)) {
    //         acc.push(time);
    //       } else {
    //       }
    //       return acc;
    //     }, []);
    //     setAvailableTimes(timesAfterFilter);
    //   } else {
    //     setAvailableTimes([
    //       "08:00:00",
    //       "08:30:00",
    //       "09:00:00",
    //       "09:30:00",
    //       "10:00:00",
    //       "10:30:00",
    //       "11:00:00",
    //       "11:30:00",
    //       "12:00:00",
    //       "12:30:00",
    //       "13:00:00",
    //       "13:30:00",
    //       "14:00:00",
    //       "14:30:00",
    //       "15:00:00",
    //       "15:30:00",
    //       "16:00:00",
    //       "16:30:00",
    //       "17:00:00",
    //       "17:30:00",
    //       "18:00:00",
    //       "18:30:00",
    //       "19:00:00",
    //       "19:30:00",
    //       "20:00:00",
    //     ]);
    //   }
    // };

    const [availableTimes, setAvailableTimes] = useState([]);
    const currentTime = new Date().toTimeString().slice(0, 8);
    const today = new Date().toISOString().split("T")[0];

    const allTimes = [
      "08:00:00",
      "08:30:00",
      "09:00:00",
      "09:30:00",
      "10:00:00",
      "10:30:00",
      "11:00:00",
      "11:30:00",
      "12:00:00",
      "12:30:00",
      "13:00:00",
      "13:30:00",
      "14:00:00",
      "14:30:00",
      "15:00:00",
      "15:30:00",
      "17:00:00",
      "17:30:00",
      "18:00:00",
      "18:30:00",
      "19:00:00",
      "19:30:00",
      "20:00:00",
      "20:30:00",
      "21:00:00",
      "21:30:00",
      "22:00:00",
      "22:30:00",
      "23:00:00",
    ];

    const localTimeToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    useEffect(() => {
      // Filter available times for today's date
      const timesAfterFilter = allTimes.filter((time) =>
        localTimeToMinutes(time)
      );
      setAvailableTimes(timesAfterFilter);
    }, []); // Empty dependency array ensures this runs only on initial render.

    const handleDateChange = (e) => {
      const selectedDate = e.target.value;
      formik.setFieldValue("date", selectedDate);

      if (selectedDate === today) {
        const timesAfterFilter = allTimes.filter((time) =>
          localTimeToMinutes(time)
        );
        setAvailableTimes(timesAfterFilter);
      } else {
        setAvailableTimes(allTimes);
      }
    };

    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
      .toISOString()
      .split("T")[0];

    useImperativeHandle(ref, () => ({
      dateandtime: formik.handleSubmit,
    }));

    return (
      <div className="container py-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="row ">
            <div className="col-md-6 col-12">
              <div
                className="mt-4"
              // style={{ borderRadius: "50px", overflow: "hidden" }}
              >
                <input
                  type="date"
                  className="date-field form-control text-muted"
                  aria-label="Date"
                  aria-describedby="basic-addon1"
                  min={new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]}
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

              <div
                className="mb-3 mt-5"
              // style={{ borderRadius: "50px", overflow: "hidden" }}
              >
                <select
                  className="form-select text-muted"
                  aria-label="Default select example"
                  style={{
                    minHeight: "50px",
                  }}
                  // value={formData.form2.time || ""}
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
              <div className="text-end">
                {formData.form1.type !== "ITEM" && (
                  <p
                    onClick={handleShow}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    <u>Compare</u>
                  </p>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center my-3">
                {vehicle.length > 3 && (
                  <>
                    <Button
                      variant="link"
                      onClick={handlePrev}
                      style={{
                        color: "black",
                        backgroundColor: "rgb(172, 255, 59)",
                        paddingInline: "0px",
                        paddingBlock: "5px",
                        borderRadius: "4px",
                        border: "2px solid #acff3b",
                        opacity: ".7",
                      }}
                    >
                      <GrFormPrevious
                        style={{
                          fontSize: "1.5em",
                          color: "black",
                        }}
                        aria-hidden="true"
                      />
                    </Button>
                  </>
                )}

                <div className="d-flex justify-content-around w-75">
                  {getVisibleData().map((image, index) => {
                    const overallIndex = image?.vehicletypeId;
                    return (
                      <div
                        key={overallIndex}
                        onClick={() => handleCarouselClick(image, index)}
                        className={`card p-2 border-0 ${activeIndex === overallIndex ? "active" : ""
                          }`}
                        style={{
                          cursor: "pointer",
                          maxWidth: "30%",
                          borderRadius: "10px",
                          transition: "0.3s",
                        }}
                      >
                        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                          <img
                            src={image?.vehicleImage}
                            alt={image?.type}
                            className={`img-fluid shadow flex-grow-1 hover-card-img hover-card ${activeIndex === overallIndex ? "active" : ""
                              }`}
                            style={{
                              borderRadius: "20px",
                              transition: "border-color 0.3s",
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <h6 className="card-title text-dark">
                            {image?.type?.split("_").join("  ")}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {vehicle.length > 3 && (
                  <>
                    <Button
                      variant="link"
                      onClick={handleNextImg}
                      style={{
                        color: "black",
                        backgroundColor: "rgb(172, 255, 59)",
                        paddingInline: "0px",
                        paddingBlock: "5px",
                        borderRadius: "4px",
                        border: "2px solid #acff3b",
                        opacity: ".7",
                      }}
                    >
                      <MdNavigateNext
                        style={{
                          fontSize: "1.5em",
                          color: "black",
                        }}
                        aria-hidden="true"
                      />
                    </Button>
                  </>
                )}
              </div>

              {/* Add the More Details button here */}
              <div className="text-end">
                <div>
                  <Modal
                    show={showModal}
                    onHide={handleClose}
                    size="xl"
                    backdrop={isModified ? "static" : false}
                    keyboard={isModified ? false : true}
                    scrollable
                  >
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body
                      onClick={(e) => e.stopPropagation()}
                      style={{ maxHeight: "86vh", overflowY: "auto" }}
                    >
                      <VehicleOffer
                        setActiveIndex={setActiveIndex}
                        setIsModified={setIsModified}
                        onCardSelect={() => handleClose()}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        vehicle={vehicle}
                        centered
                      />
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 text-center">
              <img
                src={selectedImage?.vehicleImage}
                alt="Selected"
                className="w-50 img-fluid"
              />
              <div className="text-center">
                <h5 className="mt-2">
                  {selectedImage?.type?.split("_").join(" ")}
                </h5>
                <h5 className="mt-2">
                  <span className="text-muted">Capacity : </span>
                  {selectedImage?.vehicleCapacity} Kg
                </h5>
                {/* <h5 className="mt-2">
                  <span className="text-muted">Base fare : </span>
                  SGD {selectedImage?.baseFare}
                </h5> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default DateAndTime;
