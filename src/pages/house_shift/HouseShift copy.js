import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import * as Yup from "yup";

const initialCenter = { lat: 13.05, lng: 80.2824 };

const validationSchema = Yup.object().shape({
  location: Yup.string().required("!Location is required"),
  address: Yup.string().required("!Address is required"),
  contactName: Yup.string().required("!Contact Name is required"),
  contactNumber: Yup.string().required("!Contact Number is required"),
});

function HouseShift() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [center, setCenter] = useState(initialCenter);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const onPlaceChanged = async (type) => {
    if (type === "origin") {
      if (origin) {
        const place = origin.getPlace();
        if (place && place.formatted_address) {
          console.log("Selected origin:", place.formatted_address);
        }
      }
    } else if (type === "destination") {
      if (destination) {
        const place = destination.getPlace();
        if (place && place.formatted_address) {
          console.log("Selected destination:", place.formatted_address);
        }
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

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: originLocation,
            destination: destinationLocation,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);

              // Extract distance and duration
              const route = result.routes[0].legs[0];
              setDistance(route.distance.text);
              setDuration(route.duration.text);
            } else {
              console.error(`Error fetching directions ${result}`);
            }
          }
        );
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#0000FF", // Blue color for the route
                    strokeOpacity: 0.8,
                    strokeWeight: 6,
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
                    onPlaceChanged={() => onPlaceChanged("origin")}
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
                    onPlaceChanged={() => onPlaceChanged("destination")}
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
                        placeholder="Drop Location"
                        style={{ borderRadius: "30px" }}
                      />
                    </FloatingLabel>
                  </Autocomplete>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {distance && duration && (
                    <div className="distance-time">
                      <p>Distance: {distance}</p>
                      <p>Duration: {duration}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseShift;
