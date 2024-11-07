import React, { useState, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import { Form, InputGroup } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { FaAddressCard, FaPlusCircle, FaTrash } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";

const center = { lat: 50.0755, lng: 14.4378 };

const MapNew = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [dropoffSections, setDropoffSections] = useState([]);
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);
  const addDropOffRef = useRef([]);

  const handleAddDropoff = () => {
    setDropoffSections([...dropoffSections, dropoffSections.length]);
  };

  const handleDeleteDropoff = (index) => {
    setDropoffSections(dropoffSections.filter((_, i) => i !== index));
  };

  const handlePlaceChanged = () => {
    if (pickupRef.current && dropoffRef.current) {
      const pickupPlace = pickupRef.current.getPlace();
      const dropoffPlace = dropoffRef.current.getPlace();

      if (pickupPlace && dropoffPlace) {
        setPickupLocation(pickupPlace.formatted_address);
        setDropoffLocation(dropoffPlace.formatted_address);

        // Request directions
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: pickupPlace.geometry.location,
            destination: dropoffPlace.geometry.location,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK" && result) {
              setDirectionsResponse(result);
              const distance = result.routes[0].legs[0].distance.text;
              setTotalDistance(distance);
            } else {
              console.error("Error fetching directions:", status);
            }
          }
        );
      }
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className=" col-md-6 col-12">
          <div className="row">

            {/* Pickup location */}
            <div className="rounded-pill py-3">
              <img
                src={red}
                style={{ width: "20px" }}
                alt="house"
                className="icon-img me-4"
              />
              <span className="fw-bold">Pick Up Location</span>
            </div>

            <div className="col-md-10 col-12">
              <Autocomplete onLoad={(ref) => (pickupRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
                <div className="input-group mb-5"
                  style={{ borderRadius: "50px", overflow: "hidden" }}>
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{
                      borderRight: "none",
                      backgroundColor: "#fff",
                      borderRadius: "50px 0 0 50px",
                    }}
                  >
                    <IoLocationSharp />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon1"
                    min="2024-11-07"
                    placeholder="Enter a pickup location"
                    style={{
                      borderLeft: "none",
                      borderRadius: "0 50px 50px 0",
                    }}
                  />
                </div>
              </Autocomplete>
            </div>

            <div className="col-md-10 col-12">
              <div className="input-group mb-5"
                style={{ borderRadius: "50px", overflow: "hidden" }}>
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    borderRight: "none",
                    backgroundColor: "#fff",
                    borderRadius: "50px 0 0 50px",
                  }}
                >
                  <FaAddressCard />
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  min="2024-11-07"
                  placeholder="Enter a pickup address"
                  style={{
                    borderLeft: "none",
                    borderRadius: "0 50px 50px 0",
                  }}
                />
              </div>
            </div>

            <div className="col-md-10 col-12">
              <div className="row">
                <div className="col-md-6 col-12 p-2">
                  <div className="input-group mb-5"
                    style={{ borderRadius: "50px", overflow: "hidden" }}>
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      style={{
                        borderRight: "none",
                        backgroundColor: "#fff",
                        borderRadius: "50px 0 0 50px",
                      }}
                    >
                      <IoMdContact />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      min="2024-11-07"
                      placeholder="Enter a contact name"
                      style={{
                        borderLeft: "none",
                        borderRadius: "0 50px 50px 0",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 p-2">
                  <div className="input-group mb-5"
                    style={{ borderRadius: "50px", overflow: "hidden" }}>
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      style={{
                        borderRight: "none",
                        backgroundColor: "#fff",
                        borderRadius: "50px 0 0 50px",
                      }}
                    >
                      <select className="">
                        <option value="+65">+65</option>
                        <option value="+91">+91</option>
                      </select>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      min="2024-11-07"
                      placeholder="Enter a contact number"
                      style={{
                        borderLeft: "none",
                        borderRadius: "0 50px 50px 0",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dropoff location */}
            <div className="rounded-pill py-3">
              <img
                src={Green}
                style={{ width: "20px" }}
                alt="house"
                className="icon-img me-4"
              />
              <span className="fw-bold">Dropoff Location</span>
            </div>

            <div className="col-md-10 col-12">
              <Autocomplete onLoad={(ref) => (dropoffRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
                <div className="input-group mb-5"
                  style={{ borderRadius: "50px", overflow: "hidden" }}>
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{
                      borderRight: "none",
                      backgroundColor: "#fff",
                      borderRadius: "50px 0 0 50px",
                    }}
                  >
                    <IoLocationSharp />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon1"
                    min="2024-11-07"
                    placeholder="Enter a pickup location"
                    style={{
                      borderLeft: "none",
                      borderRadius: "0 50px 50px 0",
                    }}
                  />
                </div>
              </Autocomplete>
            </div>

            <div className="col-md-10 col-12">
              <div className="input-group mb-5"
                style={{ borderRadius: "50px", overflow: "hidden" }}>
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{
                    borderRight: "none",
                    backgroundColor: "#fff",
                    borderRadius: "50px 0 0 50px",
                  }}
                >
                  <FaAddressCard />
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  min="2024-11-07"
                  placeholder="Enter a pickup address"
                  style={{
                    borderLeft: "none",
                    borderRadius: "0 50px 50px 0",
                  }}
                />
              </div>
            </div>

            {/*Add Another Dropoff location */}
            <div className="rounded-pill py-3">
              <button
                type="button"
                className="btn btn-primary mb-3 shadow-none"
                style={{
                  backgroundColor: "transparent",
                  color: "red",
                  border: "none",
                }}
                onClick={handleAddDropoff}
              >
                <FaPlusCircle />
                <span className="fw-bold text-black mx-2">Add another dropoff</span>
              </button>
            </div>

            {dropoffSections.map((_, index) => (
              <div key={index}>
                <div className="col-md-10 col-12">
                  <Autocomplete onLoad={(ref) => (addDropOffRef.current[index] = ref)} onPlaceChanged={handlePlaceChanged}>
                    <div className="input-group mb-5" style={{ borderRadius: "50px", overflow: "hidden" }}>
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                        style={{
                          borderRight: "none",
                          backgroundColor: "#fff",
                          borderRadius: "50px 0 0 50px",
                        }}
                      >
                        <IoLocationSharp />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a pickup location"
                        style={{
                          borderLeft: "none",
                          borderRadius: "0 50px 50px 0",
                        }}
                      />
                    </div>
                  </Autocomplete>
                </div>

                <div className="col-md-10 col-12">
                  <div className="input-group mb-5" style={{ borderRadius: "50px", overflow: "hidden" }}>
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      style={{
                        borderRight: "none",
                        backgroundColor: "#fff",
                        borderRadius: "50px 0 0 50px",
                      }}
                    >
                      <FaAddressCard />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter a pickup address"
                      style={{
                        borderLeft: "none",
                        borderRadius: "0 50px 50px 0",
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-10 col-12">
                  <div className="row">
                    <div className="col-md-6 col-12 p-2">
                      <div className="input-group" style={{ borderRadius: "50px", overflow: "hidden" }}>
                        <span
                          className="input-group-text"
                          id="basic-addon1"
                          style={{
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderRadius: "50px 0 0 50px",
                          }}
                        >
                          <IoMdContact />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a contact name"
                          style={{
                            borderLeft: "none",
                            borderRadius: "0 50px 50px 0",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12 p-2">
                      <div className="input-group" style={{ borderRadius: "50px", overflow: "hidden" }}>
                        <span
                          className="input-group-text"
                          id="basic-addon1"
                          style={{
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderRadius: "50px 0 0 50px",
                          }}
                        >
                          <select className="">
                            <option value="+65">+65</option>
                            <option value="+91">+91</option>
                          </select>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a contact number"
                          style={{
                            borderLeft: "none",
                            borderRadius: "0 50px 50px 0",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger mt-2 shadow-none mb-3"
                  onClick={() => handleDeleteDropoff(index)}
                  style={{
                    backgroundColor: "transparent",
                    color: "red",
                    border: "none",
                  }}
                >
                  <FaTrash />
                  <span className="fw-bold text-black mx-2">Delete dropoff</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6 col-12">
          <span className="d-flex justify-content-center align-items-center py-3">
            {totalDistance && <span className="fw-bold">Total Distance: {totalDistance}</span>}
          </span>
          <div className="card shadow-none mb-2 map_section">
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={{ width: "100%", height: "400px", minHeight: "90vh" }}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>

          </div>
        </div>
      </div >
    </div >
  );
};

export default MapNew;
