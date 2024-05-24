import React, { useState } from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

const center = { lat: 13.05, lng: 80.2824 };
const left = { lat: 13.0397, lng: 80.2792 };

function Maps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [stops, setStops] = useState([]);

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const handlePlaceChanged = () => {
    if (origin && destination) {
      calculateRoute();
    }
  };

  const calculateRoute = () => {
    const originPlace = origin.getPlace();
    const destinationPlace = destination.getPlace();

    if (
      originPlace &&
      originPlace.geometry &&
      destinationPlace &&
      destinationPlace.geometry
    ) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originPlace.geometry.location,
          destination: destinationPlace.geometry.location,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Directions request failed due to ", status);
          }
        }
      );
    } else {
      console.error(
        "Origin or destination place details are undefined or invalid."
      );
    }
  };

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

  if (!isLoaded) {
    return null; // Return null while loading
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
            {origin && origin.getPlace() && (
              <Marker position={origin.getPlace().geometry.location} />
            )}
            {destination && destination.getPlace() && (
              <Marker position={destination.getPlace().geometry.location} />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
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
                    onPlaceChanged={handlePlaceChanged}
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
                    onPlaceChanged={handlePlaceChanged}
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
              </div>
              <div className="text-center mt-4">
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
