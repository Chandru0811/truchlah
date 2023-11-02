import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Service.css";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

function Service() {
  const [selectedDate, setSelectedDate] = useState("2023-05-26");
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [selectedItem, setSelectedItem] = useState("");
  const [manpowerQuantity, setManpowerQuantity] = useState(0);
  const [trolleyQuantity, setTrolleyQuantity] = useState(0);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleGetDetails = (item) => {
    if (selectedItem && selectedItem.image === item.image) {
      setSelectedItem(null); // Uncheck the selected item
    } else {
      setSelectedItem(item); // Set the clicked item as the selected item
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

        <div className="form-group d-flex justify-content-center pb-5">
          <div className="mr-3 mx-3">
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div>
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
          {carouselItems.map((item, index) => (
            <div
              className="container my-5"
              key={index}
              id={`Vechicle-${index}`}
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
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="selectedItem"
                          id="flexRadioDefault1"
                          // checked={selectedItem === item}
                          // onChange={() => handleGetDetails(item)}
                        />
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div
          className="row p-3 my-3"
          style={{
            backgroundColor: "#9AB8DD",
            borderRadius: "5px",
          }}
        >
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="flexRadioDefault1">
                <b> Driver as a helper</b>
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="flexRadioDefault1">
                <b> Driver as man power</b>
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
            </div>
          </div>
        </div>
        <div className="row d-flex flex-column py-3">
          <div
            className="d-flex justify-content-between p-3"
            style={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              alignItems: "center",
            }}
          >
            <span>
              <b>ManPower Required</b>
            </span>
            {/* Manpower increment/decrement input field */}
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
                  width: '50px',
                  padding: '5px',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
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

        <div className="row d-flex flex-column  py-3">
          <div
            className="d-flex justify-content-between p-3"
            style={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              alignItems: "center",
            }}
          >
            <span>
              <b>Trolley Required</b>
            </span>
            {/* Trolley increment/decrement input field */}
            <div className="quantity-input">
              <button
                className="quantity-btn btn "
                onClick={decreaseTrolleyQuantity}
                // disabled={trolleyQuantity === 0}
                style={{
                  borderRadius: "50%",
                }}
              >
                <FaMinus style={{ fontSize: "8px" }} />
              </button>
              <input
                type="number"
                className="quantity-value"
                value={trolleyQuantity}
                min={0}
                max={99}
                readOnly
                style={{
                  width: '50px',
                  padding: '5px',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />
              <button
                className="quantity-btn btn"
                onClick={increaseTrolleyQuantity}
                disabled={trolleyQuantity === 99}
                style={{
                  borderRadius: "50%",
                }}
              >
                <FaPlus style={{ fontSize: "8px" }} />
              </button>
            </div>
          </div>
        </div>
        <div className="form-group py-3">
          <label htmlFor="exampleTextarea" className="pb-3"><b>Driver message Required</b></label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="write your message here............"
          ></textarea>
        </div>
        <div className="text-center pb-5">
          <Link to="/summary">
            <button className="btn btn-primary px-5 py-2" id="NextMove">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Service;
