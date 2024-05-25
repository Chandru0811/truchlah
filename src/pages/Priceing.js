import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Vehicle1 from "../asset/Vechicle1.png";
import Vehicle2 from "../asset/Vechicle2.png";
import Vehicle3 from "../asset/Vechicle3.png";
import Vehicle4 from "../asset/Vechicle4.png";



const Pricing = () => {
  const productList = [
    {
      id: 1,
      img: Vehicle1,
      name: "5ft Van",
      weight: `500 kg`,
      base_fare: `42+0.75/Km`,
    },
    {
      id: 2,
      img: Vehicle2,
      name: "10ft Lorry",
      weight: `700 kg`,
      base_fare: `50+0.75/Km`,
    },
    {
      id: 3,
      img: Vehicle3,
      name: "14ft Lorry",
      weight: `900 kg`,
      base_fare: `52+0.75/Km`,
    },
    {
      id: 4,
      img: Vehicle4,
      name: "18ft Lorry",
      weight: `1000 kg`,
      base_fare: `55+0.75/Km`,
    },
    {
      id: 5,
      img: Vehicle2,
      name: "20ft Lorry",
      weight: `1500 kg`,
      base_fare: `57+0.75/Km`,
    },
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
    <div className="pricing-container">
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={productResponsive}
        ssr
        infinite
        autoPlay={false}
        autoPlaySpeed={2000}
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        dotListClass=""
      >
        {productList.map((product) => (
          <div key={product.id} className="product-item card h-100 mx-1">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center image-container"
                style={{ maxHeight: "100%", maxWidth: "93%" }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="img-fluid"
                  style={{ maxHeight: "90%", maxWidth: "83%" }}
                />
              </div>
            </div>

            <div className="card-body pt-0">
              <h5 className="price-title">{product.name}</h5>
              <p className="price-text">Base Fare: ${product.base_fare}</p>
              <p className="price-text">Weight Limit: {product.weight}</p>
              <button className="btn mt-2">More Details</button>
            </div>
          </div>
        ))}
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
