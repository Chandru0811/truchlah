import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { userApi } from "../../config/URL";
import toast from "react-hot-toast";
import boxes from "../../asset/1.png";
import ManPower from "../../asset/2.png";

const VehicleOffer = (
  {
    formData,
    setActiveIndex,
    setIsModified,
    setSelectedImage,
    setFormData,
    handleNext,
    vehicle,
    onCardSelect,
  },
  ref
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImg = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < vehicle.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : vehicle.length - 1
    );
  };


  const handleCardClick = (image, index) => {
    // This will select the clicked card and update the carousel
    setSelectedImage(image);
    onCardSelect();
    setActiveIndex(image.vehicletypeId);
    setIsModified(true); // Set the active index to match the clicked card
  };

  return (
    <div className="container-fluid" style={{ minHeight: "90vh" }}>
      <div className="row py-2 position-relative">
        {/* Carousel Navigation */}
        <div
          className="position-absolute d-flex justify-content-between"
          style={{
            top: "50%",
            right: "10px",
            zIndex: "1",
            paddingLeft: "2rem",
          }}
        >
          <Button
            variant="link"
            onClick={handlePrev}
            style={{
              color: "black",
              backgroundColor: "rgb(172, 255, 59)",
              paddingInline: "2px",
              paddingBlock: "7px",
              borderRadius: "4px",
              border: "2px solid #acff3b",
            }}
            className="shadow"
          >
            <GrFormPrevious
              style={{
                fontSize: "1.5em",
                color: "black",
              }}
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="link"
            onClick={handleNextImg}
            style={{
              color: "black",
              backgroundColor: "rgb(172, 255, 59)",
              paddingInline: "2px",
              paddingBlock: "7px",
              borderRadius: "4px",
              border: "2px solid #acff3b",
            }}
            className="shadow"
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

        {/* Vehicle Cards */}
        {vehicle &&
          vehicle.map((data, i) => (
            <div key={i} className="col-4">
              <div
                className="card text-center h-100"
                style={{ backgroundColor: "#e6ffe4", cursor: "pointer" }}
                onClick={() => handleCardClick(data, i)} // Make the card clickable
              >
                <div className="card border-0 mt-2 mx-2 pt-3 text-center d-block">
                  <h5 className="card-title">
                    {data?.suitableHouseType}{" "}
                    {/* {data?.bookingType?.split("_").join(" ")} */}
                  </h5>
                  <img
                    style={{ width: "13rem" }}
                    className="card-img-top img-fluid"
                    src={data?.vehicleImage}
                    alt={data?.vehicleType}
                  />
                  <div className="card-body pt-0">
                    <h4 className="text-danger mb-0">
                      SGD {data?.baseFare}.00
                    </h4>
                    <p className="card-text text-muted">
                      *inclusive {data?.gst}% GST
                    </p>
                  </div>
                </div>
                <div className="mt-3 px-3">
                  <h5 className="card-title my-1">
                    {data?.type?.split("_").join(" ")}
                  </h5>
                  <p className="card-text text-muted my-3">
                    {data?.description}
                  </p>
                  <h5 className="card-title text-start">Package Includes :</h5>
                  <div className="row  justify-content-around">
                    <div className="col-auto col align-self-end mt-3 ms-3">
                      <img
                        style={{ width: "3rem" }}
                        className="card-img-top img-fluid"
                        src={boxes}
                        alt="Free Boxes"
                      />
                      <p className="text-muted">
                        {`${data?.packageBoxes}x Free Boxes` ?? "--"}
                      </p>
                    </div>
                    <div className="col-auto col align-self-end  mt-3 ms-3">
                      <img
                        style={{ width: "3rem" }}
                        className="card-img-top img-fluid"
                        src={ManPower}
                        alt="Package with Free Manpower"
                      />
                      <p className="text-muted">
                        {`${data?.packageManpower}x Manpower` ?? "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VehicleOffer;
