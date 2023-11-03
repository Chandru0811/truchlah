import React, { useState } from "react";
import "../../styles/custom.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaWeightHanging } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const MultiCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // Number of slides to slide when using arrows
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleGetDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

 

  const renderPopup = () => {
    if (selectedVehicle) {
      return (
        <div className="popup-menu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7 col-md-7 col-12 text-center">
                <img
                  src={selectedVehicle.image}
                  alt="Vehicle"
                  className="img-fluid"
                />
                <hr></hr>
                <div className="py-5">
                  <h5>
                    <FaWeightHanging /> {selectedVehicle.weight}
                  </h5>
                  <h5>
                    <FaRupeeSign /> {selectedVehicle.price}
                  </h5>
                  <p>{selectedVehicle.description}</p>
                  {/* Add other vehicle details as needed */}
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-12 py-3 PX-5" id="vehicleForm">
                <div className="d-flex justify-content-between">
                  <span>
                    <h2 style={{ color: "white" }}>Get an Estimate</h2>{" "}
                  </span>
                  <span>
                    <h2>
                      <button
                        className="close-button btn btn-danger "
                        onClick={handleClosePopup}
                      >
                        X
                      </button>
                    </h2>
                  </span>
                </div>

                <form >
                  <div class="form mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name*"
                      style={{ color: "rgb(0,0,0,0.9)" }}
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Enter your name" />
                    </FloatingLabel>
                  </div>
                  <div class="form mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Pick up Location*"
                      style={{ color: "rgb(0,0,0,0.9)" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Pick up Location"
                      />
                    </FloatingLabel>
                  </div>
                  <div class="form mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Drop up Location*"
                      style={{ color: "rgb(0,0,0,0.9)" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Drop up Location"
                      />
                    </FloatingLabel>
                  </div>
                  <div class="form mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Phone number*"
                      style={{ color: "rgb(0,0,0,0.9)" }}
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Phone number" />
                    </FloatingLabel>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-primary  py-3"
                      id="VehicleButton"
                    >
                      Get an estimation{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCarouselItems = () => {
    const cardData = [
      {
        image: "asset/Vechicle1.png",
        text1: "Base fare 1",
        price: " 250",
        text2: " Loading capacity ",
        weight: "100kg",
        text3: "Load body size  ",
        size: " 50x50 ",
        description:
          "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
      },
      {
        image: "asset/Vechicle2.png",
        text1: "Base fare 2",
        price: " 250",
        text2: " Loading capacity ",
        weight: "100kg",
        text3: "Load body size  ",
        size: " 50x50 ",
        description:
          "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
      },
      {
        image: "asset/Vechicle3.png",
        text1: "Base fare 3",
        price: " 250",
        text2: " Loading capacity ",
        weight: "100kg",
        text3: "Load body size  ",
        size: " 50x50 ",
        description:
          "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
      },
      {
        image: "asset/Vechicle4.png",
        text1: "Base fare 4",
        price: " 250",
        text2: " Loading capacity ",
        weight: "100kg",
        text3: "Load body size  ",
        size: " 50x50 ",
        description:
          "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
      },
      {
        image: "asset/Vechicle3.png",
        text1: "Base fare 5",
        price: " 250",
        text2: " Loading capacity ",
        weight: "100kg",
        text3: "Load body size  ",
        size: " 50x50 ",
        description:
          "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
      },
      {
        image: "asset/Vechicle3.png",
        text1: "Base fare 5",
        price: " 10000000",
        text2: " Loading capacity ",
        weight: "500000000kg",
        text3: "Load body size  ",
        size: " 500x500 ",
        description:
          "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
      },
      // Add more card data as needed
    ];

    return cardData.map((card, index) => (
      <div className="container my-5" id="Vechicle" data-aos="fade-right">
        <div key={index} className="card h-100 d-flex flex-column">
          <img src={card.image} className="card-img-top" alt="Card" />
          <div className="card-body">
            <div className="card-text">
              <div className="d-flex justify-content-between">
                <span>{card.text1}</span>
                <span>{card.price}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>{card.text2}</span>
                <span>{card.weight}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>{card.text3}</span>
                <span>{card.size}</span>
              </div>
              <center>
                <button
                  className="btn btn-primary btn-block mt-3"
                  onClick={() => handleGetDetails(card)}
                >
                  Get Details <FaArrowRight />
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section>
      <div className="container-fluid " id="VehCaroMain">
        <h2 className="text-center py-5" id="AvaHeading" data-aos="zoom-in">
          AVAILABLE VEHICLES
        </h2>
        <div className="container-fluid " id="VehCaro">
          <div className="container">
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {renderCarouselItems()}
            </Carousel>
            {showPopup && <div className="popup-overlay">{renderPopup()}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiCarousel;
