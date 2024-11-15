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
import { GiShoppingBag } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi, userApi } from "../../config/URL";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("!Date is required"),
  time: Yup.string().required("!Time is required"),
});

const DateAndTime = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const [availableTimes, setAvailableTimes] = useState([
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
      "16:00:00",
      "16:30:00",
      "17:00:00",
      "17:30:00",
      "18:00:00",
      "18:30:00",
      "19:00:00",
    ]);
    const shiftType = sessionStorage.getItem("shiftType");
    const userId = sessionStorage.getItem("userId");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(
      formData?.vehicle?.vehicletypeId ? formData.vehicle.vehicletypeId : 1
    );
    const [vehicle, setVechicle] = useState([]);
    const [selectedImage, setSelectedImage] = useState(
      formData?.vehicle ? formData.vehicle : null
    );
    console.log("activeIndex", activeIndex);
    console.log("currentIndex", currentIndex);
    const formik = useFormik({
      initialValues: {
        date: formData.date,
        time: formData.time,
      },
      validationSchema: validationSchema,

      onSubmit: async (values) => {
        console.log("val", values);
        const selectedDateTime = new Date(`${values.date}T${values.time}`);
        const eligibleTime = new Date();
        eligibleTime.setHours(eligibleTime.getHours());

        // if (selectedDateTime >= eligibleTime) {
        const selectedOption = vehicle.find(
          (item) => item.vehicletypeId === selectedImage.vehicletypeId
        );
        setFormData((prv) => ({ ...prv, vehicle: selectedOption }));
        const totalKilometer = parseInt(formData.distance);
        const km_charge = 0.75 * totalKilometer;
        const total = selectedOption.baseFare + km_charge;

        let driverAmount = 0;
        let extraHelper = 0;

        if (values.driverAsManpower) {
          driverAmount = selectedOption.driverHelper;
        }

        if (values.extraManpower) {
          extraHelper = selectedOption.helper * values.quantity;
        }

        const totalCharges = total + driverAmount + extraHelper;
        // console.log(totalCharges);

        const deliveryDate = new Date(`${values.date}T${values.time}`);
        deliveryDate.setDate(deliveryDate.getDate() + 2);

        setLoadIndicators(true);
        const payload = {
          userId: userId,
          type: shiftType === "HOUSE" ? formData.type : shiftType,
          locationDetail: JSON.parse(decodeURIComponent(formData.location)),
          bookingId: formData.bookingId,
          estKm: parseFloat(formData.distance),
          scheduledDate: `${values.date}T${values.time}.000Z`,
          deliveryDate: deliveryDate,
          quantity: formData?.data?.booking?.quantity,
          msgToDriver: formData?.msgToDriver,
          noOfPieces: formData?.data?.booking?.noOfPieces,
          helper: formData?.data?.booking?.helper === "Y" ? "Y" : "N",
          extraHelper: formData?.data?.booking?.extraHelper === "Y" ? "Y" : "N",
          trollyRequired:
            formData?.data?.booking?.trollyRequired === "Y" ? "Y" : "N",
          roundTrip: formData?.data?.booking?.roundTrip === "Y" ? "Y" : "N",
          vehicleType: selectedOption.type,
          promoCode: "",
          actualKm: parseFloat(formData.distance),
        };
        try {
          const response = await bookingApi.put(`booking/update`, payload);
          if (response.status === 200) {
            toast.success("Vehicle selected successfully!");
            setFormData((prv) => ({
              ...prv,
              date: values.date,
              time: values.time,
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
          const response = await userApi.get("vehicle/vehicleType");
          if (response.status === 200) {
            setVechicle(response.data.responseBody);
          }
        } catch (e) {
          toast.error("Error Fetching Data : ", e);
        }
      };
      getVechicle();
    }, []);

    useEffect(() => {
      if (vehicle.length > 0 && selectedImage === null) {
        setSelectedImage(vehicle[0]);
      }
      // console.log("setSelectedImage",selectedImage);
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

    function timeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }
    const handleDateChange = (e) => {
      const selectedDate = e.target.value;
      formik.setFieldValue("date", selectedDate);

      const today = new Date().toISOString().split("T")[0];
      const currentTime = new Date().toTimeString().slice(0, 8);
      if (selectedDate === today) {
        console.log("currentTime", currentTime);
        const timesAfterFilter = availableTimes.reduce((acc, time) => {
          if (timeToMinutes(time) > timeToMinutes(currentTime)) {
            acc.push(time);
          } else {
          }
          return acc;
        }, []);
        setAvailableTimes(timesAfterFilter);
      } else {
        setAvailableTimes([
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
          "16:00:00",
          "16:30:00",
          "17:00:00",
          "17:30:00",
          "18:00:00",
          "18:30:00",
          "19:00:00",
        ]);
      }
    };

    useImperativeHandle(ref, () => ({
      dateandtime: formik.handleSubmit,
    }));

    return (
      <div className="container py-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="row ">
            <div className="col-md-6 col-12">
              <div
                className="input-group mt-4"
                // style={{ borderRadius: "50px", overflow: "hidden" }}
              >
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    borderRight: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <FaCalendarDays />
                </span>
                <input
                  type="date"
                  className="date-field form-control"
                  aria-label="Date"
                  aria-describedby="basic-addon1"
                  min={new Date().toISOString().split("T")[0]}
                  placeholder="Select date"
                  style={{ borderLeft: "none", minHeight: "50px" }}
                  {...formik.getFieldProps("date")}
                  name="date"
                  onChange={handleDateChange}
                />
              </div>
              <div className="p-1">
                {formik.touched.date && formik.errors.date && (
                  <div className="mb-2 text-danger">{formik.errors.date}</div>
                )}
              </div>

              <div
                className="input-group mb-3 mt-5"
                // style={{ borderRadius: "50px", overflow: "hidden" }}
              >
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    borderRight: "none",
                    backgroundColor: "#fff",
                    // borderRadius: "50px 0 0 50px",
                  }}
                >
                  <IoIosTime />
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    borderLeft: "none",
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

              <div className="d-flex justify-content-between align-items-center my-3">
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
                <div className="d-flex justify-content-around w-75">
                  {vehicle
                    .slice(currentIndex, currentIndex + 3)
                    .map((image, index) => {
                      const overallIndex = image.vehicletypeId;
                      return (
                        <div
                          key={overallIndex}
                          onClick={() => handleCarouselClick(image, index)}
                          className={`card p-2 border-0 ${
                            activeIndex === overallIndex ? "active" : ""
                          }`}
                          style={{
                            cursor: "pointer",
                            maxWidth: "30%",
                            borderRadius: "10px",
                            transition: "0.3s",
                          }}
                        >
                          <img
                            src={image.vehicleImage}
                            alt={image.type}
                            className={`img-fluid shadow hover-card-img hover-card ${
                              activeIndex === overallIndex ? "active" : ""
                            }`}
                            style={{
                              maxHeight: "150px",
                              borderRadius: "20px",
                              transition: "border-color 0.3s",
                            }}
                          />
                          <div className="text-center mt-2">
                            <h6 className="card-title text-dark">
                              {image.type?.split("_").join("  ")}
                            </h6>
                          </div>
                        </div>
                      );
                    })}
                </div>

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
                  <GiShoppingBag style={{ padding: "1px" }} />
                  {selectedImage?.vehicleCapacity}kg
                </h5>
                <h5 className="mt-2">
                  <span className="text-muted">Base fare </span>
                  <PiCurrencyDollarBold size={15} className="mb-1" />
                  {selectedImage?.baseFare}
                </h5>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default DateAndTime;
