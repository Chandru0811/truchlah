import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import blueMarker from "../../asset/pinBlue.png"; // Add a blue marker image in your assets
import RedMarker from "../../asset/pinRed.png"; // Add a blue marker image in your assets
import GreyMarker from "../../asset/pinGrey.png"; // Add a blue marker image in your assets
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { FaRegAddressCard, FaPhoneVolume } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

function HouseShift() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [center, setCenter] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [ModalPickUp, setModalPickUp] = useState(false);
  const [ModalDropOff, setModalDropOff] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [destinationMarkerPosition, setDestinationMarkerPosition] =
    useState(null);
  const [directions, setDirections] = useState(null);

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const onPlaceChanged = () => {
    if (origin !== null) {
      const originPlace = origin.getPlace();
      console.log("Origin Place:", originPlace);
      if (
        originPlace &&
        originPlace.geometry &&
        originPlace.geometry.location
      ) {
        const location = {
          lat: originPlace.geometry.location.lat(),
          lng: originPlace.geometry.location.lng(),
        };
        setMarkerPosition(location);
        setCenter(location);
      }
    }

    if (destination !== null) {
      const destinationPlace = destination.getPlace();
      console.log("Destination Place:", destinationPlace);
      if (
        destinationPlace &&
        destinationPlace.geometry &&
        destinationPlace.geometry.location
      ) {
        const dropLocation = {
          lat: destinationPlace.geometry.location.lat(),
          lng: destinationPlace.geometry.location.lng(),
        };
        setDestinationMarkerPosition(dropLocation);
        setCenter(dropLocation);
      }
    }

    if (origin && destination) {
      const originPlace = origin.getPlace();
      const destinationPlace = destination.getPlace();

      if (
        originPlace &&
        originPlace.geometry &&
        originPlace.geometry.location &&
        destinationPlace &&
        destinationPlace.geometry &&
        destinationPlace.geometry.location
      ) {
        const originLocation = {
          lat: originPlace.geometry.location.lat(),
          lng: originPlace.geometry.location.lng(),
        };
        const destinationLocation = {
          lat: destinationPlace.geometry.location.lat(),
          lng: destinationPlace.geometry.location.lng(),
        };

        setDirections({
          origin: originLocation,
          destination: destinationLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
            {markerPosition ? (
              <MarkerF
                position={markerPosition}
                icon={{
                  url: RedMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ) : (
              <MarkerF
                position={center}
                icon={{
                  url: RedMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {destinationMarkerPosition && (
              <MarkerF
                position={destinationMarkerPosition}
                icon={{
                  url: blueMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#39FF14",
                    strokeOpacity: 1,
                    strokeWeight: 3,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>

        <div className="col-12 py-5">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row pb-5">
                <div className="col-12 lab" id="one">
                  <Autocomplete
                    onLoad={onOriginLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                      types: ["(regions)"],
                      componentRestrictions: { country: ["sg", "in"] },
                    }}
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
                      />
                    </FloatingLabel>
                  </Autocomplete>
                </div>
              </div>

              <div className="row">
                <div className="col-12 lab" id="one">
                  <Autocomplete
                    onLoad={onDestinationLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                      types: ["(regions)"],
                      componentRestrictions: { country: ["sg", "in"] },
                    }}
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
                        // onClick={openModal2}
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
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <IoLocationSharp />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <FaRegAddressCard />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Name<span className="text-danger">*</span>
                </label>
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <IoMdContact />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Number<span className="text-danger">*</span>
                </label>
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <FaPhoneVolume />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
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
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <IoLocationSharp />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <FaRegAddressCard />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Name<span className="text-danger">*</span>
                </label>
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <IoMdContact />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Number<span className="text-danger">*</span>
                </label>
                <InputGroup className="d-flex">
                  <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white">
                    <FaPhoneVolume />
                  </InputGroup.Text>
                  <Form.Control type="text" className="form-control" />
                </InputGroup>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="NextMove" onClick={closeModal2}>
            next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HouseShift;
