import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/custom.css";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaWeightHanging, FaCheckCircle } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';

function Service() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleShowModal =(item, index) => {
    setCurrentItem(item);
    setSelectedItemId(index);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentItem();
  };
  function handleCardClick(index) {
    setSelectedItemId(index);
  }
  const [showQuantity, setShowQuantity] = useState(false);
  const handleCheckboxClick = () => {
    setShowQuantity(!showQuantity);
  };
  const navigate = useNavigate();
  const [manpowerQuantity, setManpowerQuantity] = useState(0);
  const [trolleyQuantity, setTrolleyQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Get current date and time
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5);

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
      toast.warning("Please Select time at least 3 hours in advance.");
    } else {
      setErrorMessage("");
      navigate("/summary");
    }
  };

  const carouselItems = [
    {
      image: "asset/Vechicle1.png",
      text1: "Base fare $250",
      price: "$250",
      name: "3 Wheeler",
      weight: "750kg",
      text3: "Load body size  ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: "asset/TataAce.png",
      text1: "Base fare $250",
      price: "$250",
      name: "Tata Ace",
      weight: "100kg",
      text3: "Load body size  ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: "asset/Vechicle3.png",
      text1: "Base fare $250",
      price: "$250",
      weight: "100kg",
      name: "Bolero",
      text3: "Load body size  ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: "asset/Vechicle4.png",
      text1: "Base fare $250",
      price: "$450",
      name: "10 Footer",
      weight: "100kg",
      text3: "Load body size  ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: "asset/Vechicle3.png",
      text1: "Base fare $250",
      price: "$550",
      name: "Bolero",
      weight: "100kg",
      text3: "Load body size ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: "asset/Vechicle2.png",
      text1: "Base fare $250",
      price: "$1000",
      name: "Tata Ace",
      weight: "500kg",
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
            <label
              className="container my-5"
              key={index}
              id={`Vehicle-${index}`}
              onClick={() => handleCardClick(index)}
              style={{
                cursor: 'pointer',
                display: 'block',
                borderRadius: '8px'
              }}
            >
              <div className="card d-flex flex-column" 
              style={{ borderRadius: "6px", position: "relative", border: selectedItemId === index ? '2px solid #1C6DD0' : '1px solid #B2C8BA' }}>
                {selectedItemId === index && (
                  <FaCheckCircle
                    style={{
                      position: 'absolute',
                      top: "-10px",
                      right: "-8px",
                      color: '#00A9FF',
                      fontSize: '24px',
                      zIndex: 5,
                    }}
                  />
                )}
                <img src={item.image} className="card-img-top" alt="Card" />
                <div className="card-body h-100">
                  <div className="card-text">
                    <div className="d-flex justify-content-center">
                      <span className="p-1" style={{ background: "#D2E0FB", borderRadius: "5px" }}>
                        <FaWeightHanging />  {item.weight}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                      <span style={{ fontSize: "20px" }}><b>{item.name}</b></span>
                    </div>
                    <div className="d-flex justify-content-center">
                      <span>Starting from <b style={{ fontSize: "18px" }}>{item.price}</b></span>
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                      <span>
                        <a href="#knowmore" onClick={(e) => { e.preventDefault(); handleShowModal(item); }}
                        class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Know More</a>
                      </span>
                    </div>

                    <center>
                      <div className="form-check">
                        <input
                          className="form-check-input border-info"
                          type="radio"
                          name="selectedItem"
                          id={`flexRadioDefault${index}`}
                          checked={selectedItemId === index}
                          readOnly
                        />
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </label>
          ))}
          {currentItem && (
            <Modal show={modalShow} onHide={handleCloseModal} backdropClassName="custom-backdrop">
              <Modal.Header closeButton>
                {/* <Modal.Title>{currentItem.name}</Modal.Title> */}
              </Modal.Header>
              <Modal.Body>
                <img className="card-img-top mx-auto d-block" src={currentItem.image} alt={currentItem.name} style={{ width: '70%' }} />
                <div className="d-flex justify-content-center pt-3">
                  <span className="p-1" style={{ background: "#D2E0FB", borderRadius: "5px" }}>
                    <FaWeightHanging />  {currentItem.weight}
                  </span>
                </div>
                <div className="d-flex justify-content-center pt-2">
                  <span style={{ fontSize: "20px" }}><b>{currentItem.name}</b></span>
                </div>
                <div className="d-flex justify-content-center">
                  <span>Starting from <b style={{ fontSize: "18px" }}>{currentItem.price}</b></span>
                </div>
                <hr/>
                <p>Base fair price : <b>{currentItem.text1}</b></p>
                <p>{currentItem.text3}: <b>{currentItem.size}</b></p>
                <p><b>Description:</b> {currentItem.description}</p>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button className="btn btn-primary btn-sm" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer> */}
            </Modal>
          )}
        </Carousel>
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
              <b>Driver as Manpower</b>
            </span>
            <div class="form-check">
              <input class="form-check-input border-info " type="checkbox" value="" id="flexCheckChecked" />
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
        {showQuantity && (
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
        )}
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
              <b>Trolly Required</b>
            </span>
            <div class="form-check">
              <input class="form-check-input border-info" type="checkbox" value="" id="flexCheckChecked" />
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
              <b>Round Trip Required</b>
            </span>
            <div class="form-check">
              <input class="form-check-input border-info" type="checkbox" value="" id="flexCheckChecked" />
            </div>
          </div>
        </div>
        <div className="row d-flex flex-column py-3">
          <label htmlFor="exampleTextarea" className="form-label"><b>Message to Driver</b></label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="write your message here............"
          ></textarea>
        </div>
        <div className="text-center pb-5">
          <Link to="/summary">
            <button className="btn btn-primary px-5 py-2" onClick={handleNextClick} id="NextMove">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Service;
