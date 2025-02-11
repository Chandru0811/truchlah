import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import boxes from "../../asset/1.png";
import ManPower from "../../asset/2.png";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const VehicleOffer = ({
  setActiveIndex,
  setIsModified,
  setSelectedImage,
  vehicle,
  onCardSelect,
  selectedImage,
}) => {
  const [isCarouselVisible, setIsCarouselVisible] = useState(true);
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  useEffect(() => {
    setIsArrowVisible(vehicle.length > 3);
  }, [vehicle]);

  useEffect(() => {
    // Hide the carousel when the component re-renders (returning to the form)
    setIsCarouselVisible(false);

    // Show it after a short delay to simulate unmounting/remounting
    const timer = setTimeout(() => setIsCarouselVisible(true), 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (image) => {
    setSelectedImage(image);
    onCardSelect();
    setActiveIndex(image.vehicletypeId);
    setIsModified(true);
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 3 },
    desktop: { breakpoint: { max: 1200, min: 992 }, items: 3 },
    tablet: { breakpoint: { max: 992, min: 576 }, items: 2 },
    mobile: { breakpoint: { max: 576, min: 0 }, items: 1 },
  };

  return (
    <div className="container-fluid top-0" style={{ maxHeight: "80vh" }}>
      {isCarouselVisible && (
        <Carousel
          responsive={responsive}
          infinite={true}
          showDots={false}
          arrows={isArrowVisible}
          autoPlay={false}
          className=""
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          customLeftArrow={
            <button className="custom-arrow">
              <FiArrowLeft size={24} />
            </button>
          }
          customRightArrow={
            <button className="custom-arrow">
              <FiArrowRight size={24} />
            </button>
          }
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
                  {/* <h5 className="card-title">{data?.suitableHouseType}</h5> */}
                  <img
                    style={{ width: "13rem" }}
                    className="card-img-top img-fluid"
                    src={data?.vehicleImage}
                    alt={data?.vehicleType}
                  />
                </div>
                <div className="mt-3 px-3 flex-grow-1">
                  <h5 className="card-title my-1">
                    {data?.type?.split("_").join(" ")}
                  </h5>
                  <p className="card-text text-muted my-3">
                    {data?.description}
                  </p>
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
                className={`choose-vehicle py-2 px-3 mt-3 mb-3 ${
                  selectedImage?.vehicletypeId === data.vehicletypeId
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCardClick(data)}
              >
                Choose Vehicle
              </button>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default VehicleOffer;
