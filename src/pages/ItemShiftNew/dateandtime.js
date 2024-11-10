import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { Button } from "react-bootstrap";
import Image1 from "../../asset/24FT_LORRY.png";
import Image2 from "../../asset/24FT_LORRY.png";
import Image3 from "../../asset/10FT_LORRY.png";
import Image4 from "../../asset/14FT_LORRY.png";
import Image5 from "../../asset/2.4M_VAN.png";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GiShoppingBag } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  date: Yup.string().required("!Date is required"),
  time: Yup.string().required("!Time is required"),
});

const DateAndTime = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const shiftType = sessionStorage.getItem("shiftType");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState({
      src: Image1,
      name: "24FT LORRY",
      kg: "50",
      baseFare: "$26",
    });
    const images = [
      { src: Image1, name: "24FT LORRY", kg: "50", baseFare: "$26" },
      { src: Image2, name: "24FT LORRY", kg: "60", baseFare: "$36" },
      { src: Image3, name: "10FT LORRY", kg: "70", baseFare: "$46" },
      { src: Image4, name: "14FT LORRY", kg: "40", baseFare: "$36" },
      { src: Image5, name: "2.4M VAN", kg: "80", baseFare: "$66" },
    ];

    const formik = useFormik({
      initialValues: {
        date: "",
        time: "",
      },
      validationSchema: validationSchema,

      onSubmit: async (values) => {
        console.log("Form Submitted", values);
        handleNext();
      },
    });

    const handleCarouselClick = (image, index) => {
      setSelectedImage(image);
      setActiveIndex(index);
    };

    const handleNextImg = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < images.length - 2 ? prevIndex + 1 : 0
      );
    };

    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1
      );
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
                    // borderRadius: "50px 0 0 50px",
                  }}
                >
                  <FaCalendarDays />
                </span>
                <input
                  type="date"
                  className="date-field form-control"
                  aria-label="Date"
                  aria-describedby="basic-addon1"
                  min="2024-11-07"
                  placeholder="Select date"
                  style={{
                    borderLeft: "none",
                    minHeight: "50px"
                  }}
                  name="date"
                  {...formik.getFieldProps("date")}
                />
              </div>
              <div className="p-1">
                {formik.touched.date &&
                  formik.errors.date && (
                    <div className="mb-2 text-danger">
                      {formik.errors.date}
                    </div>
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
                  class="form-select"
                  aria-label="Default select example"
                  style={{
                    borderLeft: "none",
                    minHeight: "50px",
                  }}
                  {...formik.getFieldProps("time")}
                >
                  <option selected>Select Time</option>
                  <option value="8.00 AM">8.00 AM</option>
                  <option value="8.30 AM">8.30 AM</option>
                  <option value="9.00 AM">9.00 AM</option>
                  <option value="9.30 AM">9.30 AM</option>
                  <option value="10.00 AM">10.00 AM</option>
                  <option value="10.30 AM">10.30 AM</option>
                  <option value="11.00 AM">11.00 AM</option>
                  <option value="11.30 AM">11.30 AM</option>
                  <option value="12.00 PM">12.00 PM</option>
                  <option value="12.30 PM">12.30 PM</option>
                  <option value="1.00 PM">1.00 PM</option>
                  <option value="1.30 AM">1.30 AM</option>
                  <option value="2.00 PM">2.00 PM</option>
                  <option value="2.30 PM">2.30 PM</option>
                  <option value="3.00 PM">3.00 PM</option>
                  <option value="3.30 PM">3.30 PM</option>
                  <option value="4.00 PM">4.00 PM</option>
                  <option value="4.30 PM">4.30 PM</option>
                  <option value="5.00 PM">5.00 PM</option>
                  <option value="5.30 PM">5.30 PM</option>
                  <option value="6.00 PM">6.00 PM</option>
                  <option value="6.30 PM">6.30 PM</option>
                  <option value="7.00 PM">7.00 PM</option>
                </select>
              </div>
              <div className="p-1">
                {formik.touched.time &&
                  formik.errors.time && (
                    <div className="mb-2 text-danger">
                      {formik.errors.time}
                    </div>
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
                    borderRadius: "0px",
                    border: "2px solid #acff3b",
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
                  {images
                    .slice(currentIndex, currentIndex + 3)
                    .map((image, index) => (
                      <div
                        key={index}
                        onClick={() => handleCarouselClick(image, index)}
                        className={`card p-2 border-0  ${activeIndex === index ? "active" : ""
                          }`}
                        style={{
                          cursor: "pointer",
                          maxWidth: "30%",
                          borderRadius: "10px",
                          transition: "0.3s",
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.name}
                          className={`img-fluid shadow hover-card-img hover-card ${activeIndex === index ? "active" : ""
                            }`}
                          style={{
                            maxHeight: "150px",
                            borderRadius: "20px",
                            transition: "border-color 0.3s",
                          }}
                        />
                        <div className="text-center mt-2">
                          <h6 className="card-title text-dark">{image.name}</h6>
                        </div>
                      </div>
                    ))}
                </div>

                <Button
                  variant="link"
                  onClick={handleNextImg}
                  style={{
                    color: "black",
                    backgroundColor: "rgb(172, 255, 59)",
                    paddingInline: "0px",
                    paddingBlock: "5px",
                    borderRadius: "0px",
                    border: "2px solid #acff3b",
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
                src={selectedImage.src}
                alt="Selected"
                className="w-50 img-fluid"
              />
              <div className="text-center">
                <h5 className="mt-2">
                  <GiShoppingBag style={{ padding: "1px" }} />
                  {selectedImage.kg}kg
                </h5>
                <h5 className="mt-2">Base fare{selectedImage.baseFare}</h5>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  })

export default DateAndTime;