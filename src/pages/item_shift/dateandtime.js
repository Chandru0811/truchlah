import React, { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { Button } from "react-bootstrap";
import Image1 from "../../asset/24FT_LORRY.png";
import Image2 from "../../asset/24FT_LORRY.png";
import Image3 from "../../asset/10FT_LORRY.png";
import Image4 from "../../asset/14FT_LORRY.png";
import Image5 from "../../asset/2.4M_VAN.png";

function DateAndTime() {
  const images = [
    { src: Image1, name: "24FT LORRY" },
    { src: Image2, name: "24FT LORRY" },
    { src: Image3, name: "10FT LORRY" },
    { src: Image4, name: "14FT LORRY" },
    { src: Image5, name: "2.4M VAN" },
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
            className="input-group mb-5"
            style={{ borderRadius: "50px", overflow: "hidden" }}
          >
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                borderRight: "none",
                backgroundColor: "#fff",
                borderRadius: "50px 0 0 50px",
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
                borderRadius: "0 50px 50px 0",
              }}
            />
          </div>

          <div
            className="input-group mb-3"
            style={{ borderRadius: "50px", overflow: "hidden" }}
          >
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                borderRight: "none",
                backgroundColor: "#fff",
                borderRadius: "50px 0 0 50px",
              }}
            >
              <IoIosTime />
            </span>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{
                borderLeft: "none",
                borderRadius: "0 50px 50px 0",
                color: "#00000040",
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

          <div className="d-flex justify-content-between align-items-center my-3">
            <Button
              variant="link"
              onClick={handlePrev}
              style={{ color: "black" }}
            >
              <span
                aria-hidden="true"
                className="carousel-control-prev-icon"
                style={{ filter: "invert(100%)" }}
              />
            </Button>
            <div className="d-flex justify-content-around w-75">
              {images
                .slice(currentIndex, currentIndex + 3)
                .map((image, index) => (
                  <div
                    key={index}
                    onClick={() => handleCarouselClick(image)}
                    className="card p-2 border-0"
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
                      className="img-fluid shadow "
                      style={{ maxHeight: "150px", borderRadius: "20px" }}
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
              style={{ color: "black" }}
            >
              <span
                aria-hidden="true"
                className="carousel-control-next-icon"
                style={{ filter: "invert(100%)" }}
              />
            </Button>
          </div>
        </div>

        <div className="col-md-6 col-12 align-items-center">
          <img
            src={selectedImage.src}
            alt="Selected"
            className="w-75 img-fluid"
          />
          <div className="d-flex justify-content-center">
            <h5 className="mt-2">{selectedImage.name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateAndTime;
