import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../../styles/custom.css";
// import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function Service({ handleNext }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  function handleCardClick(index) {
    setSelectedItemId(index);
  }
  const [showQuantity, setShowQuantity] = useState(false);
  const handleCheckboxClick = () => {
    setShowQuantity(!showQuantity);
  };
  const [manpowerQuantity, setManpowerQuantity] = useState(0);
  const [trolleyQuantity, setTrolleyQuantity] = useState(0);
  // const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Get current date and time
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);

    // Set the current date and time
    setSelectedDate(formattedDate);
    setSelectedTime(formattedTime);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleGetDetails = (item) => {
    if (selectedItemId && selectedItemId.image === item.image) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(item);
    }
  };

  const increaseManpowerQuantity = () => {
    setManpowerQuantity(manpowerQuantity + 1);
  };

  const decreaseManpowerQuantity = () => {
    if (manpowerQuantity > 0) {
      setManpowerQuantity(manpowerQuantity - 1);
    }
  };

  const increaseTrolleyQuantity = () => {
    setTrolleyQuantity(trolleyQuantity + 1);
  };

  const decreaseTrolleyQuantity = () => {
    if (trolleyQuantity > 0) {
      setTrolleyQuantity(trolleyQuantity - 1);
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();

    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

    const diffInMs = selectedDateTime - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 3) {
      toast.warning("Please select a time at least 3 hours in advance.");
    } else {
      handleNext();
    }
  };

  const carouselItems = [
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

  return (
    <div
      className="container-fluid"
      id="ServicePage"
      style={{ backgroundColor: "#faf5f6" }}
    >
      <div className="container">
        <h2 className="text-center my-5 mt-5 pt-5" id="AvaHeading">
          SERVICE
        </h2>
        <div className="container">
          <div className="form-group d-flex justify-content-center pb-5">
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </div>
        </div>

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          autoPlay={false}
          centerMode={false}
          className="carousel-container"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
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
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {carouselItems.map(function (item, index) {
            return (
              <label
                className="container my-5"
                key={index}
                id={`Vehicle-${index}`}
                onClick={handleCardClick.bind(null, index)} // handle card click
                style={{ cursor: "pointer", display: "block" }} // change cursor to pointer to indicate clickability
              >
                <div className="card h-100 d-flex flex-column">
                  <img src={item.image} className="card-img-top" alt="Card" />
                  <div className="card-body">
                    <div className="card-text">
                      <div className="d-flex justify-content-between">
                        <span>{item.text1}</span>
                        <span>{item.price}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>{item.text2}</span>
                        <span>{item.weight}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>{item.text3}</span>
                        <span>{item.size}</span>
                      </div>
                      <center>
                        <div className="form-check plan">
                          <input
                            className="form-check-input border-info "
                            type="radio"
                            name="selectedItem"
                            id={`flexRadioDefault${index}`}
                            checked={selectedItemId === index} // check if the item is selected
                            readOnly // make it read-only because we are managing the state
                          />
                        </div>
                      </center>
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </Carousel>
        <div className="row d-flex mb-3">
          <div className="col-md-6 col-12">
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <span>
                <b>Driver as Manpower</b>
              </span>
              <div className="form-check">
                <input
                  className="form-check-input border-info"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 ">
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <span>
                <b>Extra Manpower</b>
              </span>
              <div className="form-check">
                <input
                  className="form-check-input border-info"
                  type="checkbox"
                  id="flexCheckChecked"
                  onClick={handleCheckboxClick}
                />
              </div>
            </div>
          </div>
        </div>

        {showQuantity && (
          <div className="row d-flex flex-column py-3 px-3">
            <div
              className="d-flex justify-content-between p-2"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <span>
                <b>Quantity</b>
              </span>
              {/* Quantity increment/decrement input field */}
              <div className="quantity-input">
                <button
                  className="quantity-btn btn "
                  style={{
                    borderRadius: "50%",
                  }}
                  onClick={decreaseManpowerQuantity}
                  // disabled={manpowerQuantity === 0}
                >
                  <FaMinus style={{ fontSize: "8px" }} />
                </button>
                <input
                  type="number"
                  className="quantity-value"
                  value={manpowerQuantity}
                  min={1}
                  max={99}
                  readOnly
                  style={{
                    width: "50px",
                    padding: "5px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
                <button
                  className="quantity-btn btn "
                  onClick={increaseManpowerQuantity}
                  disabled={manpowerQuantity === 99}
                  style={{
                    borderRadius: "50%",
                  }}
                >
                  <FaPlus style={{ fontSize: "8px" }} />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="row d-flex mb-3">
          <div className="col-md-6 col-12">
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <span>
                <b>Trolly Required</b>
              </span>
              <div class="form-check">
                <input
                  class="form-check-input border-info"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 ">
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <span>
                <b>Round Trip Required</b>
              </span>
              <div class="form-check">
                <input
                  class="form-check-input border-info"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex px-2 mb-3">
          <label htmlFor="exampleTextarea" className="form-label">
            <b>Message to Driver</b>
          </label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="write your message here............"
          ></textarea>
        </div>
        <div className="text-center pb-5">
          <button
            className="btn btn-primary px-5 py-2"
            onClick={handleNextClick}
            id="NextMove"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Service;
