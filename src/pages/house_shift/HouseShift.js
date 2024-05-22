import React from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Modal, Button } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";

import {
  useJsApiLoader,
  GoogleMap,
  PolylineF,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import { Link } from "react-router-dom";

const center = { lat: 13.05, lng: 80.2824 };
const left = { lat: 13.0397, lng: 80.2792 };

function HouseShift() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [ModalPickUp, setModalPickUp] = useState(false);
  const [ModalDropOff, setModalDropOff] = useState(false);

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const path = [
    { lat: 13.05, lng: 80.2824 },
    { lat: 13.0397, lng: 80.2792 },
    { lat: 13.0615, lng: 80.2614 },
    { lat: 13.0633, lng: 80.2812 },
    { lat: 13.05, lng: 80.2824 },
  ];

  const onPlaceChanged = () => {
    if (origin !== null && destination !== null) {
      console.log(origin.getPlace());
      console.log(destination.getPlace());
    }
  };

  if (!isLoaded) {
    return;
  }

  const openModal = () => {
    setModalPickUp(true);
  };

  const closeModal = () => {
    setModalPickUp(false);
  };

  const openModal2 = () => {
    setModalDropOff(true);
  };

  const closeModal2 = () => {
    setModalDropOff(false);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#fcf3f6" }}>
      <div className="row">
        <div className="col-12" id="MapContainer">
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          >
            <MarkerF position={center} />
            <MarkerF position={left} />
            <PolylineF
              path={path}
              options={{
                strokeColor: "#39FF14",
                strokeOpacity: 1,
                strokeWeight: 3,
              }}
            />
          </GoogleMap>
        </div>

        <div className="col-12 py-5">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row pb-5">
                <div className=" col-12 lab " id="one">
                  <Autocomplete
                    onLoad={onOriginLoad}
                    onPlaceChanged={onPlaceChanged}
                    types={["(regions)"]}
                    placeholder="Origin"
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label={
                        <div className="rounded-pill">
                          <img
                            src={red}
                            alt="house"
                            className="icon-img me-4"
                          />
                          <span>Pick Up Location</span>
                        </div>
                      }
                      style={{ color: "rgb(0, 0, 0, 0.9)" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Drop off Location"
                        style={{ borderRadius: "30px" }}
                        onClick={openModal}
                      />
                    </FloatingLabel>
                  </Autocomplete>
                </div>
              </div>

              <div className="row ">
                <div className=" col-12 lab " id="one">
                  <Autocomplete
                    onLoad={onDestinationLoad}
                    onPlaceChanged={onPlaceChanged}
                    types={["(regions)"]}
                    placeholder="Destination"
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label={
                        <div className="rounded-pill">
                          <img
                            src={Green}
                            alt="house"
                            className="icon-img me-4"
                          />
                          <span>Drop Location</span>
                        </div>
                      }
                      style={{ color: "rgb(0, 0, 0, 0.9)" }}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Drop up Location"
                        style={{ borderRadius: "30px" }}
                        onClick={openModal2}
                      />
                    </FloatingLabel>
                  </Autocomplete>
                </div>
              </div>
              <div className="pt-4 pb-3">
                <select
                  className="form-select form-select-lg mb-3 py-2"
                  aria-label=".form-select-lg example"
                  style={{ borderRadius: "25px", color: "#6f7877" }}
                >
                  <option selected>Category</option>
                  <option value="1">Easy Shift</option>
                  <option value="2">Studio</option>
                  <option value="3">Kitchen</option>
                  <option value="3">Single room</option>
                  <option value="3">Cabin</option>
                  <option value="3">1 BHK</option>
                  <option value="3">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="3">4 BHK</option>
                </select>
              </div>
              <div className="text-center">
                <Link to="/service">
                  <button className="btn btn-primary px-5 py-2" id="NextMove">
                    Next
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12"></div>
          </div>
        </div>
      </div>
      <Modal show={ModalPickUp} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pick Up Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Location<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <FaLocationDot />
                    &nbsp;
                  </div>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <FaRegAddressCard />
                    &nbsp;
                  </div>
                  <textarea type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Name<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <IoMdContact />
                    &nbsp;
                  </div>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Number<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <FaPhoneVolume />
                    &nbsp;
                  </div>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="NextMove" onClick={closeModal}>
            next
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={ModalDropOff} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Drop Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Location<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <FaLocationDot />
                    &nbsp;
                  </div>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <FaRegAddressCard />
                    &nbsp;
                  </div>
                  <textarea type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Name<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <IoMdContact />
                    &nbsp;
                  </div>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Number<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <FaPhoneVolume />
                    &nbsp;
                  </div>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="NextMove" onClick={closeModal}>
            next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HouseShift;
