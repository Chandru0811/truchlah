import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Vehicle1 from "./../asset/Vechicle1.png";
import Vehicle2 from "./../asset/Vechicle2.png";
import Vehicle3 from "./../asset/Vechicle3.png";
import Vehicle4 from "./../asset/Vechicle4.png";

const Price = () => {
  const headings = [
    { id: 1, heading: "Price" },
    { id: 2, heading: "Weight" },
    { id: 3, heading: "Size Limit (L x W x H)" },
    { id: 4, heading: "Additional Service" },
    { id: 5, heading: "Additional stop Charge" },
    { id: 6, heading: "Remarks" },
    { id: 7, heading: "More Details" },
  ];

  const productList = [
    {
      id: 1,
      img: Vehicle1,
      name: "5ft Van",
      weight: "500 kg",
      base_fare: "$42+0.75/Km",
      sizeLimit: "290 x 140 x 170 cm",
      additionalService: "Door-to-door Delivery.",
      additionalStopCharge: "+$11",
      remarks: "test the data values",
    },
    {
      id: 2,
      img: Vehicle2,
      name: "10ft Lorry",
      weight: "700 kg",
      base_fare: "$50+0.75/Km",
      sizeLimit: "290 x 250 x 170 cm",
      additionalService: "Door-to-door Delivery products.",
      additionalStopCharge: "+$15",
      remarks: "test  values",
    },
    {
      id: 3,
      img: Vehicle3,
      name: "14ft Lorry",
      weight: "900 kg",
      base_fare: "$52+0.75/Km",
      sizeLimit: "290 x 140 x 170 cm",
      additionalService: "Door-to-door Delivery.",
      additionalStopCharge: "+$11",
      remarks: "test the data values",
    },
    {
      id: 4,
      img: Vehicle4,
      name: "18ft Lorry",
      weight: "1000 kg",
      base_fare: "$55+0.75/Km",
      sizeLimit: "390 x 240 x 390 cm",
      additionalService: "Delivery.",
      additionalStopCharge: "+$11",
      remarks: "test the data values",
    },
    {
      id: 5,
      img: Vehicle2,
      name: "20ft Lorry",
      weight: "1500 kg",
      base_fare: "$57+0.75/Km",
      sizeLimit: "290 x 250 x 170 cm",
      additionalService: "Door-to-door.",
      additionalStopCharge: "+$19",
      remarks: "test the data",
    },
  ];

  const productResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 576 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container">
      <div className="d-flex py-5">
        <div style={{ minWidth: "30%" }}>
          <div className="h-100 pt-5 d-flex align-items-end">
            <table className="table m-2">
              <tbody>
                <tr>
                  <td className="ps-4">
                    <b>Price</b>
                  </td>
                </tr>
                <tr>
                  <td className="ps-4">
                    <b>Weight</b>
                  </td>
                </tr>
                <tr>
                  <td className="ps-4">
                    <b>Size Limit (L x W x H)</b>
                  </td>
                </tr>
                <tr>
                  <td className="ps-4">
                    <b>Additional Service</b>
                  </td>
                </tr>
                <tr>
                  <td className="ps-4">
                    <b>Additional stop Charge</b>
                  </td>
                </tr>
                <tr>
                  <td className="ps-4">
                    <b>Remarks</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className="btn">
                      <b>More Details</b>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ minWidth: "70%" }}>
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
              <div key={product.id} className="">
                <div className="card h-100 mx-1 image-card">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "150px" }}
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
                </div>
                <table className="table m-2">
                  <tbody>
                    <tr>
                      <th>{product.name}</th>
                    </tr>
                    <tr>
                      <td>{product.base_fare}</td>
                    </tr>
                    <tr>
                      <td>{product.weight}</td>
                    </tr>
                    <tr>
                      <td>{product.sizeLimit}</td>
                    </tr>
                    <tr>
                      <td>{product.additionalService}</td>
                    </tr>
                    <tr>
                      <td>{product.additionalStopCharge}</td>
                    </tr>
                    <tr>
                      <td>{product.remarks}</td>
                    </tr>
                    <tr>
                      <td>
                        <button className="btn">More Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Price;
