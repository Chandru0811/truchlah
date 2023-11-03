import React from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  useJsApiLoader,
  GoogleMap,
  PolylineF,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";

const center = { lat: 13.05, lng: 80.2824 };
const left = { lat: 13.0397, lng: 80.2792 };

function Maps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // add the libraries prop here
  });

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    setStops([...stops, ""]);
  };

  const handleDeleteStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
  };

  const handleStopChange = (index, value) => {
    const updatedStops = [...stops];
    updatedStops[index] = value;
    setStops(updatedStops);
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
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
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
                      />
                    </FloatingLabel>
                  </Autocomplete>
                </div>
              </div>

              {stops.map((stop, index) => (
                <div key={index} className="d-flex align-items-center mt-3">
                  <Form.Control
                    id="AddStop"
                    type="text"
                    placeholder="Add more stops"
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)}
                    className="me-2"
                  />
                  <FaMinus
                    className="text-danger"
                    onClick={() => handleDeleteStop(index)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}

              <div className="pt-4">
                <button
                  className="btn btn-primary "
                  style={{
                    backgroundColor: "transparent",
                    color: "red",
                    border: "none",
                  }}
                  onClick={handleAddStop}
                >
                  Add Stop <FaPlus />
                </button>
              </div>
              <div className="text-center">
                <Link to="/confirmlocation">
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
    </div>
  );
}

export default Maps;

/* <Modal
                isOpen={selectedVehicle !== null}
                onRequestClose={() => setSelectedVehicle(null)}
                className="Modal"
                overlayClassName="Overlay"
            >
                {selectedVehicle && (
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={selectedVehicle.image} alt="Vehicle" />
                            </div>
                            <div className="col-md-6">
                                <h3>{selectedVehicle.text1}</h3>
                                <p>Weight: {selectedVehicle.weight}</p>
                                <p>Description: {selectedVehicle.description}</p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <h4>Basic Fare Estimation</h4>
                               
                            </div>
                        </div>
                    </div>
                )}
            </Modal> */
