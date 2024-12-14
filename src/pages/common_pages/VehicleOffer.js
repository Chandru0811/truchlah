import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import boxes from "../../asset/1.png";
import ManPower from "../../asset/2.png";

const VehicleOffer = ({
  setActiveIndex,
  setIsModified,
  setSelectedImage,
  vehicle,
  onCardSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  // Determine the number of items per slide based on screen size
  const getVisibleSlides = () => {
    const width = window.innerWidth;
    if (width >= 992) return 3; // Large screens
    if (width >= 576) return 2; // Medium screens
    return 1; // Small screens
  };

  // Chunk the vehicle data into slides
  const createSlides = () => {
    if (!vehicle.length) return; // Avoid creating slides if no data exists
    const visibleSlides = getVisibleSlides();
    const chunked = [];
    for (let i = 0; i < vehicle.length; i += visibleSlides) {
      const chunk = vehicle.slice(i, i + visibleSlides);

      // Add the first data at the end if screen size is medium and the chunk is incomplete
      if (chunk.length < visibleSlides && visibleSlides === 2) {
        chunk.push(vehicle[0]); // Append the first item
      }

      chunked.push(chunk);
    }
    setSlides(chunked);
  };

  useEffect(() => {
    createSlides(); // Ensure slides are created on mount
    window.addEventListener("resize", createSlides); // Recalculate slides on window resize

    return () => window.removeEventListener("resize", createSlides); // Clean up event listener
  }, [vehicle]); // Re-run on vehicle data change

  useEffect(() => {
    // Make sure currentIndex is updated on first render to prevent empty display
    if (slides.length > 0) {
      setCurrentIndex(0); // Set the first index to display the first item
    }
  }, [slides]);

  const handleNextImg = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < slides.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : slides.length - 1
    );
  };

  const handleCardClick = (image) => {
    setSelectedImage(image);
    onCardSelect();
    setActiveIndex(image.vehicletypeId);
    setIsModified(true);
  };

  return (
    <div className="container-fluid" style={{ minHeight: "90vh" }}>
      <div className="row py-2 position-relative">
        {/* Carousel Navigation */}
        <div
          className="position-absolute d-flex justify-content-between w-100"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <Button
            variant="link"
            onClick={handlePrev}
            style={{
              color: "black",
              backgroundColor: "rgb(172, 255, 59)",
              borderRadius: "50%",
              padding: "8px",
              border: "2px solid #acff3b",
            }}
            className="shadow"
          >
            <GrFormPrevious style={{ fontSize: "1.5em" }} />
          </Button>
          <Button
            variant="link"
            onClick={handleNextImg}
            style={{
              color: "black",
              backgroundColor: "rgb(172, 255, 59)",
              borderRadius: "50%",
              padding: "8px",
              border: "2px solid #acff3b",
            }}
            className="shadow"
          >
            <MdNavigateNext style={{ fontSize: "1.5em" }} />
          </Button>
        </div>

        {/* Vehicle Cards */}
        {slides?.length > 0 &&
          slides[currentIndex]?.map((data, i) => (
            <div
              key={i}
              className={`col-${12 / getVisibleSlides()} text-center`}
            >
              <div
                className="card text-center h-100"
                style={{ backgroundColor: "#e6ffe4", cursor: "pointer" }}
                onClick={() => handleCardClick(data)}
              >
                <div className="card border-0 mt-2 mx-2 pt-3 text-center d-block">
                  <h5 className="card-title">{data?.suitableHouseType}</h5>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default VehicleOffer;
