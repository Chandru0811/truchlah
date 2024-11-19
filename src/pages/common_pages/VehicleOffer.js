import React, { useState } from "react";
import Image from "../../asset/Truck open 5 colour green light.png";
import Image2 from "../../asset/TruckRedheavy.png";
import Image3 from "../../asset/Truck open 5 colour yellow.png";
import Image4 from "../../asset/Truck open 5 colour green.png";
import boxes from "../../asset/box1.webp";
import ManPower from "../../asset/manpower1.png";
import { Button } from "react-bootstrap";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const VehicleOffer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const datas = [
    {
      bookingType: "house_1BHK",
      amount: 133,
      gst: 9,
      vehicleImage: Image,
      vehicleType: "10FT_LORRY",
      description:
        "Max Size(ft):8'x3'x4 |Max Weight (Kg):500 Suitable for all furnitures and items in a room ",
      packageIncludes: [
        { icon: boxes, offer: "2x Free Boxes" },
        { icon: ManPower, offer: "2x Manpower" },
      ],
    },
    {
      bookingType: "house_2BHK",
      amount: 150,
      gst: 9,
      vehicleImage: Image2,
      vehicleType: "14FT_LORRY",
      description:
        "Max Size(ft):9'x5'x5' |Max Weight (Kg):1,000 Suitable for all furnitures and items in a 1 Bed Room Home",
      packageIncludes: [
        { icon: boxes, offer: "5x Free Boxes" },
        { icon: ManPower, offer: "2x Manpower" },
      ],
    },
    {
      bookingType: "house_3BHK",
      amount: 210,
      gst: 9,
      vehicleImage: Image3,
      vehicleType: "20FT_LORRY",
      description:
        "Max Size(ft):9'x5'x5' |Max Weight (Kg):1,500 Suitable for all furnitures and items in a 1 Bed Room Home",
      packageIncludes: [
        { icon: boxes, offer: "5x Free Boxes" },
        { icon: ManPower, offer: "3x Manpower" },
      ],
    },
    {
      bookingType: "2BHK_Apartment",
      amount: 320,
      gst: 9,
      vehicleImage: Image4,
      vehicleType: "24FT_LORRY",
      description:
        "Max Size(ft):9'x5'x5' |Max Weight (Kg):2,000 Suitable for all furnitures and items in a 1 Bed Room Home",
      packageIncludes: [
        { icon: boxes, offer: "5x Free Boxes" },
        { icon: ManPower, offer: "4x Manpower" },
      ],
    },
  ];

  const handleNextImg = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % datas.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + datas.length) % datas.length
    );
  };

  // Generate the current set of items to display
  const getVisibleData = () => {
    const visibleData = [];
    for (let i = 0; i < 4; i++) {
      visibleData.push(datas[(currentIndex + i) % datas.length]);
    }
    return visibleData;
  };

  return (
    <div className="container-fluid" style={{ minHeight: "90vh" }}>
      <div className="row py-2 position-relative">
        <div
          className="position-absolute d-flex justify-content-between"
          style={{
            top: "50%",
            right: "10px",
            zIndex: "1",
            paddingLeft: "2rem",
          }}
        >
          <Button
            variant="link"
            onClick={handlePrev}
            style={{
              color: "black",
              backgroundColor: "rgb(172, 255, 59)",
              paddingInline: "2px",
              paddingBlock: "7px",
              borderRadius: "4px",
              border: "2px solid #acff3b",
            }}
            className="shadow"
          >
            <GrFormPrevious
              style={{
                fontSize: "1.5em",
                color: "black",
              }}
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="link"
            onClick={handleNextImg}
            style={{
              color: "black",
              backgroundColor: "rgb(172, 255, 59)",
              paddingInline: "2px",
              paddingBlock: "7px",
              borderRadius: "4px",
              border: "2px solid #acff3b",
            }}
            className="shadow"
          >
            <MdNavigateNext
              style={{
                fontSize: "1.5em",
                color: "black",
              }}
              aria-hidden="true"
            />
          </Button>
        </div>
        {getVisibleData().map((data, i) => (
          <div key={i} className="col-3">
            <div
              className="card text-center h-100"
              style={{ backgroundColor: "#e6ffe4" }}
            >
              <div className="card border-0 mt-2 mx-2 pt-3 text-center d-block">
                <img
                  style={{ width: "13rem" }}
                  className="card-img-top img-fluid"
                  src={data.vehicleImage}
                  alt={data.vehicleType}
                />
                <div className="card-body pt-5">
                  <h5 className="card-title">
                    {data.bookingType.split("_").join(" ")}
                  </h5>
                  <h4 className="text-danger mb-0">SGD {data.amount}.00</h4>
                  <p className="card-text text-muted">
                    *inclusive {data.gst}% GST
                  </p>
                </div>
              </div>
              <div className="mt-3 px-3">
                <h5 className="card-title my-1">
                  {data.vehicleType.split("_").join(" ")}
                </h5>
                <p className="card-text text-muted my-3">{data.description}</p>
                <h5 className="card-title text-start">Package Includes :</h5>
                <div className="row justify-content-around">
                  {data.packageIncludes.map((item, i) => (
                    <div key={i} className="col-auto mt-3 ms-3">
                      <img
                        style={{ width: "3rem" }}
                        className="card-img-top img-fluid"
                        src={item.icon}
                        alt="..."
                      />
                      <p className="text-muted">{item.offer}</p>
                    </div>
                  ))}
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
