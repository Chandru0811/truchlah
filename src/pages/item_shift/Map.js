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
  PolylineF,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import ItemShiftModel from "../ItemShiftModal";

const center = { lat: 13.05, lng: 80.2824 };
const left = { lat: 13.0397, lng: 80.2792 };

function Maps() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [locationDetail, setLocationDetail] = useState({
    pickupLocation: "",
    dropLocation: "",
  });
  const [stops, setStops] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
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

  const path = [
    { lat: 13.05, lng: 80.2824 },
    { lat: 13.0397, lng: 80.2792 },
    { lat: 13.0615, lng: 80.2614 },
    { lat: 13.0633, lng: 80.2812 },
    { lat: 13.05, lng: 80.2824 },
  ];

  const onPlaceChanged = () => {
    if (origin !== null) {
      const place = origin.getPlace();
      if (place && place.formatted_address) {
        setLocationDetail((prev) => ({
          ...prev,
          pickupLocation: place.formatted_address,
        }));
        setModalTitle("Pickup Location Set");
        setModalShow(true);
      }
    }
    if (destination !== null) {
      const place = destination.getPlace();
      if (place && place.formatted_address) {
        setLocationDetail((prev) => ({
          ...prev,
          dropLocation: place.formatted_address,
        }));
      }
    }
  };
  

  const handleCloseModal = () => setModalShow(false);

  if (!isLoaded) {
    return null; // Handle the loading state properly
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
                <div className="col-12 lab" id="one">
                  <Autocomplete
                    onLoad={onOriginLoad}
                    onPlaceChanged={onPlaceChanged}
                    types={["(regions)"]}
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
                        placeholder="Pick Up Location"
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
                    types={["(regions)"]}
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
                        placeholder="Drop Location"
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
                  className="btn btn-primary"
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

              {/* <ItemShiftModel
                show={modalShow}
                title={modalTitle}
                onHide={handleCloseModal}
                pickupLocation={locationDetail.pickupLocation}
                dropLocation={locationDetail.dropLocation}
                setLocationDetail={setLocationDetail}
              /> */}
            </div>
            <div className="col-lg-3 col-md-3 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maps;
