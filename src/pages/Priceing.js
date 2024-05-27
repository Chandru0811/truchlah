import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaWeightHanging, FaCheckCircle } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import VAN1 from "../../src/asset/1.7M_VAN.png";
import VAN2 from "../../src/asset/2.4M_VAN.png";
import Lorry10 from "../../src/asset/10FT_LORRY.png";
import Lorry14 from "../../src/asset/14FT_LORRY.png";
import Lorry24 from "../../src/asset/24FT_LORRY.png";


const Pricing = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const handleShowModal = (item, index) => {
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
  const carouselItems = [
    {
      image: VAN1,
      text1: "Base fare $20",
      price: "$200",
      name: "1.7M_VAN",
      weight: "200kg",
      text3: "Load body size",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: VAN2,
      text1: "Base fare $30",
      price: "$400",
      name: "2.4M_VAN",
      weight: "400kg",
      text3: "Load body size",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: Lorry10,
      text1: "Base fare $40",
      price: "$600",
      weight: "600kg",
      name: "10FT_LORRY",
      text3: "Load body size  ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: Lorry14,
      text1: "Base fare $25",
      price: "$450",
      name: "14FT_LORRY",
      weight: "800kg",
      text3: "Load body size  ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: Lorry24,
      text1: "Base fare $250",
      price: "$550",
      name: "24FT_LORRY",
      weight: "100kg",
      text3: "Load body size ",
      size: " 50x50 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    {
      image: VAN1,
      text1: "Base fare $250",
      price: "$1000",
      name: "1.7M_VAN",
      weight: "200kg",
      text3: "Load body size  ",
      size: " 500x500 ",
      description:
        "Base fare includes 1.0 km distance and 25 minutes of time. Pricing may vary based on your locality. Road tax, parking etc as applicable over and above ride fare.",
    },
    // Add more card data as needed
  ];

  const productResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 5,
      slidesToSlide: 1,
    },
    lap: {
      breakpoint: { max: 1224, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet1: {
      breakpoint: { max: 768, min: 576 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 300 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile1: {
      breakpoint: { max: 300, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="pricing-container pt-4">
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
            className="container"
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
             style={{ borderRadius: "8px", border: selectedItemId === index ? '3px solid #2A0944' : '1px solid #787A91' }}>
              {selectedItemId === index && (
                <FaCheckCircle
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    color: '#5BBCFF',
                    fontSize: '24px',
                    zIndex : 5,
                  }}
                />
              )}
              <img src={item.image}  alt="Card" />
              <div className="card-body">
                <div className="card-text">
                  <div className="d-flex justify-content-center">
                    <span className="p-1" style={{ background: "#D2E0FB", borderRadius: "5px" }}>
                      <FaWeightHanging />  {item.weight}
                    </span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <span style={{ fontSize: "20px" }}><b>{item.name}</b></span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <span>Starting from <b style={{ fontSize: "18px" }}>{item.price}</b></span>
                  </div>
                  <div className="d-flex justify-content-center pt-2">
                    <span>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleShowModal(item); }}
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
              <Modal.Title>{currentItem.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={currentItem.image} style={{ width: '70%' }} />
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
              <hr />
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
      <div className="card pt-5 pb-3 " style={{ backgroundColor: "#EEF7FF" }}>
        <h3 className="">
          Additional Service Charges (applicable to Van & Lorry only)
        </h3>
        <div className="px-5 pt-4">
          <h6>Vans</h6>
          <p>Driver's Help : $10 Additional Charge</p>
          <p>Additional Help : +$30</p>
        </div>
        <div className="px-5 pt-3">
          <h6>Lorries</h6>
          <p>(Door to door moving service)</p>
          <p>Driver's help : +$30 (10ft and 14ft Lorry)</p>
          <p>Driver's help : +$40 (24ft Lorry)</p>
          <p>Additional help : +$40</p>
        </div>
        <div className="px-5 pt-3">
          <h6>moving Service</h6>
          <p>Limited to 2 hours service</p>
          <p>
            Additional over time Charges - $5 per Driver/helper for 10 minutes
            block (capped at $200)
          </p>
        </div>
        <div className="px-5 pt-3">
          <h6>Non-lift service</h6>
          <p>
            Each flight of stairs is charged $10.oo per driver/helper.For
            example:moving services with 2 helpers going down flight of
            stairs(not per floor level) would cast $20.00
          </p>
        </div>
        <div className="px-5 pt-3">
          <h6>Refrigerated service</h6>
          <p>Free of Charge</p>
        </div>
        <div className="px-5 pt-3">
          <h6>Tailgate service</h6>
          <h6>(For lorries only)</h6>
          <p>$20.00 Charge</p>
        </div>
        <div className="px-5 pt-3">
          <h6>Wrapping service</h6>
          <p>Each piece of furniture wrapped is charged at $20.00.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
