import React, { useState } from "react";
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

function DateAndTime() {
  const images = [
    { src: Image1, name: "24FT LORRY", kg: "50", baseFare: "$26" },
    { src: Image2, name: "24FT LORRY", kg: "60", baseFare: "$36" },
    { src: Image3, name: "10FT LORRY", kg: "70", baseFare: "$46" },
    { src: Image4, name: "14FT LORRY", kg: "40", baseFare: "$36" },
    { src: Image5, name: "2.4M VAN", kg: "80", baseFare: "$66" },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCarouselClick = (image) => {
    setSelectedImage(image);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < images.length - 2 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6 col-12">
          <div
            className="input-group mb-4"
            style={{ borderRadius: "10px", overflow: "hidden", height: "50px" }}>
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                borderRight: "none",
                backgroundColor: "#fff",
                borderRadius: "10px 0 0 10px",
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
                borderRadius: "0 10px 10px 0",
              }}
            />
          </div>

          <div
            className="input-group mb-3"
            style={{ borderRadius: "10px", overflow: "hidden", height: "50px" }}>
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                borderRight: "none",
                backgroundColor: "#fff",
                borderRadius: "10px 0 0 10px",
              }}
            >
              <IoIosTime />
            </span>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{
                borderLeft: "none",
                borderRadius: "0 10px 10px 0",
                color: "black",
              }}
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

          <div className="d-flex justify-content-between align-items-center mt-5">
            <Button
              variant="link"
              onClick={handlePrev}
              style={{
                color: "black",
                backgroundColor: "rgb(172, 255, 59)",
                padding: "5px",
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
                    onClick={() => handleCarouselClick(image)}
                    className="card p-2 border-0 hover-card"
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
                      className="img-fluid shadow hover-card"
                      style={{
                        maxHeight: "150px",
                        borderRadius: "20px",
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
              onClick={handleNext}
              style={{
                color: "black",
                backgroundColor: "rgb(172, 255, 59)",
                padding: "5px",
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
    </div>
  );
}

export default DateAndTime;
