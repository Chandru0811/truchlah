import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import boxes from "../../asset/1.png";
import ManPower from "../../asset/2.png";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const VehicleOffer = ({
  setActiveIndex,
  setIsModified,
  setSelectedImage,
  vehicle,
  onCardSelect,
  selectedImage,
}) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  useEffect(() => {
    // Check if there are more than 3 items to show the arrows
    setIsArrowVisible(vehicle.length > 3);
  }, [vehicle]);

  const handleCardClick = (image) => {
    setSelectedImage(image);
    onCardSelect();
    setActiveIndex(image.vehicletypeId);
    setIsModified(true);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };
  console.log("active img",)

  return (
    <div className="container-fluid top-0" style={{ minHeight: "86vh" }}>
      <Carousel
        responsive={responsive}
        infinite={true}
        showDots={false}
        arrows={isArrowVisible}
        customLeftArrow={
          <button
            className="custom-arrow react-multi-carousel-arrow--left"
            aria-label="Previous"
          >
            <FiArrowLeft size={24} />
          </button>
        }
        customRightArrow={
          <button
            className="custom-arrow react-multi-carousel-arrow--right"
            aria-label="Next"
          >
            <FiArrowRight size={24} />
          </button>
        }
        autoPlay={false}
        className="py-4"
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {vehicle.map((data, i) => (
          <div
            key={i}
            className="text-center h-100 d-flex flex-column"
            style={{ padding: "0 10px" }}
          >
            <div
              className="card text-center h-100 d-flex flex-column"
              style={{ backgroundColor: "#e6ffe4" }}

            >
              <div className="card border-0 mt-2 mx-2 pt-3 text-center d-block flex-grow-1">
                <h5 className="card-title">{data?.suitableHouseType}</h5>
                <img
                  style={{ width: "13rem" }}
                  className="card-img-top img-fluid"
                  src={data?.vehicleImage}
                  alt={data?.vehicleType}
                />
                <div className="card-body pt-0">
                  <h4 className="text-danger mb-0">SGD {data?.baseFare}.00</h4>
                  <p className="card-text text-muted">
                    *inclusive SGD {data?.gst} GST
                  </p>
                </div>
              </div>
              <div className="mt-3 px-3 flex-grow-1">
                <h5 className="card-title my-1">
                  {data?.type?.split("_").join(" ")}
                </h5>
                <p className="card-text text-muted my-3">{data?.description}</p>
                <h5 className="card-title text-start">Package Includes:</h5>
                <div className="row justify-content-around">
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
                  <div className="col-auto col align-self-end mt-3 ms-3">
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
            <button
              type="button"
              className={`choose-vehicle py-2 px-3 mt-3 ${selectedImage?.vehicletypeId === data.vehicletypeId ? "active" : ""}`}
              onClick={() => handleCardClick(data)}
            >
              Choose Vehicle
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VehicleOffer;
