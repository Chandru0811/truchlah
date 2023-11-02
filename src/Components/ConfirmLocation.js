import React from "react";
import "../styles/ConfirmLocation.css";
import { BsSearch } from "react-icons/bs";

import {
  useJsApiLoader,
  GoogleMap,
  PolylineF,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const center = { lat: 13.05, lng: 80.2824 };
const left = { lat: 13.0397, lng: 80.2792 };

function ConfirmLocation() {
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
          <div className="container">
            <div className="row lg-mx-5 lg-px-5 row md-mx-5 md-px-5">
              <div className="input-group mb-3" style={{ width: "100%" }}>
                <span
                  className="input-group-text mb-3 py-2"
                  style={{
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    backgroundColor: "white",
                  }}
                >
                  <BsSearch />
                </span>
                <Autocomplete
                  onLoad={onDestinationLoad}
                  onPlaceChanged={onPlaceChanged}
                  types={["(regions)"]}
                  placeholder="Destination"
                  style={{ width: "100%" }}
                >
                  <input
                    type="text"
                    className="form-control mb-3 py-2"
                    placeholder="Confirm Location"
                    style={{
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      width: "100%",
                    }}
                  />
                </Autocomplete>
              </div>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputFirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstName"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputContact" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputContact"
                    placeholder="Enter your Contact number"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputAddress2" className="form-label">
                    Address 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input type="text" className="form-control" id="inputCity" placeholder="Eg. Chennai" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="inputZip" placeholder="Eg. 600 012" />
                </div>
               
                <div className="col-12 text-center mt-5">
                <Link to="/service">
                  <button type="submit" className="btn btn-primary px-5 py-2" id="NextMove">
                    Next
                  </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLocation;
