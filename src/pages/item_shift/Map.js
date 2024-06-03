import React, { useEffect, useState, useCallback } from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import RedMarker from "../../asset/pinRed.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import HouseShiftModel from "../HouseShiftModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { bookingApi } from "../../config/URL";
import { FaMinus, FaPlus } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  pickupLocation: Yup.string().required("!Pickup Location is required"),
  dropLocation: Yup.string().required("!Drop Location is required"),
});

function Map() {
  const shiftType = sessionStorage.getItem("shiftType");
  console.log("Type:", shiftType);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [center, setCenter] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [destinationMarkerPosition, setDestinationMarkerPosition] =
    useState(null);
  const [directions, setDirections] = useState(null);
  const [locationDetail, setLocationDetail] = useState([]);
  console.log("Location Details", locationDetail);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      pickupLocation: "",
      dropLocation: "",
      stops: [""],
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const payload = {
        userId: userId,
        type: shiftType,
        locationDetail: locationDetail,
      };
      console.log("Form values:", payload);
      try {
        const response = await bookingApi.post(`booking/create`, payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          const bookingId = response.data.responseBody.booking.bookingId;
          const locations = encodeURIComponent(JSON.stringify(locationDetail));
          navigate(
            `/service?location=${locations}&bookingId=${bookingId}&distance=${distance}`
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const onStopLoad = (index) => (autocomplete) => {
    setStops((prevStops) => {
      const newStops = [...prevStops];
      newStops[index] = autocomplete;
      return newStops;
    });
  };

  const onPlaceChanged = async (type, index = null) => {
    let place = null;
    if (type === "origin") {
      if (origin) {
        place = origin.getPlace();
        formik.setFieldValue("pickupLocation", place.formatted_address);
        handleOpenModal("Pick Up Location");
      }
    } else if (type === "destination") {
      if (destination) {
        place = destination.getPlace();
        formik.setFieldValue("dropLocation", place.formatted_address);
        handleOpenModal("Drop Location");
      }
    } else if (type === "stops" && index !== null) {
      if (stops[index]) {
        place = stops[index].getPlace();
        if (place && place.formatted_address) {
          formik.setFieldValue(`stops[${index}]`, place.formatted_address);
          handleOpenModal(`${index + 1}`);
        }
      }
    }

    if (place && place.geometry && place.geometry.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      if (type === "origin") {
        setMarkerPosition(location);
        setCenter(location);
      } else if (type === "destination") {
        setDestinationMarkerPosition(location);
        setCenter(location);
      } else if (type === "stops" && index !== null) {
        setStops((prevStops) => {
          const newStops = [...prevStops];
          newStops[index] = location;
          return newStops;
        });
        // Call onPlaceChanged again to update directions
        recalculateDirections();
      }
    }
  };

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
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

  const handleAddStop = () => {
    setStops([...stops, ""]);
    formik.setFieldValue("stops", [...formik.values.stops, ""]);
  };

  const handleDeleteStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
    formik.setFieldValue(
      "stops",
      formik.values.stops.filter((_, i) => i !== index)
    );
    recalculateDirections();
  };

  const handleStopChange = (index, value) => {
    const updatedStops = [...formik.values.stops];
    updatedStops[index] = value;
    formik.setFieldValue("stops", updatedStops);
    recalculateDirections();
  };

  const recalculateDirections = useCallback(() => {
    if (origin && destination) {
      const originPlace = origin.getPlace();
      const destinationPlace = destination.getPlace();
      const stopLocations = stops
        .map((stop) => {
          if (stop && stop.lat && stop.lng) {
            return {
              location: { lat: stop.lat, lng: stop.lng },
              stopover: true,
            };
          }
          return null;
        })
        .filter(Boolean);

      console.log("Stop Locations", stopLocations);

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
            waypoints: stopLocations,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
              const route = result.routes[0];
              let totalDistance = 0;
              let totalDuration = 0;
              for (let i = 0; i < route.legs.length; i++) {
                totalDistance += route.legs[i].distance.value;
                totalDuration += route.legs[i].duration.value;
              }
              setDistance(`${(totalDistance / 1000).toFixed(2)} km`);
              setDuration(`${Math.floor(totalDuration / 60)} mins`);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    }
  }, [origin, destination, stops]);

  useEffect(() => {
    recalculateDirections();
  }, [recalculateDirections]);

  if (!isLoaded) {
    return (
      <div className="darksoul-layout">
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#fcf3f6" }}>
      <form onSubmit={formik.handleSubmit}>
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
              // onLoad={map => mapRef.current = map}
            >
              {markerPosition ? (
                <></>
              ) : (
                <MarkerF
                  position={center}
                  icon={{
                    url: RedMarker,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              )}

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: "blue",
                      strokeOpacity: 1,
                      strokeWeight: 3,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </div>

          <div className="col-12 py-5">
            <div className="row mb-4">
              <div className="col-12">
                {distance && duration && (
                  <div className="distance-time d-flex justify-content-center align-items-center">
                    <p className="me-5">
                      Distance : <b>{distance}</b>
                    </p>
                    {/* <p>
                      Duration : <b>{duration}</b>
                    </p> */}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex flex-column justify-content-center align-items-center mb-2">
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
                          style={{ width: "20px" }}
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
                      name="pickupLocation"
                      {...formik.getFieldProps("pickupLocation")}
                      className="form-control form-control-lg rounded-5"
                      style={{
                        width: "500px",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />
                  </FloatingLabel>
                </Autocomplete>
                {formik.touched.pickupLocation &&
                  formik.errors.pickupLocation && (
                    <div className="mb-2 text-danger">
                      {formik.errors.pickupLocation}
                    </div>
                  )}

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
                          style={{ width: "20px" }}
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
                      className="form-control form-control-lg rounded-5"
                      name="dropLocation"
                      {...formik.getFieldProps("dropLocation")}
                      style={{
                        width: "500px",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />
                  </FloatingLabel>
                </Autocomplete>
                {formik.touched.dropLocation && formik.errors.dropLocation && (
                  <div className="mb-2 text-danger">
                    {formik.errors.dropLocation}
                  </div>
                )}

                <div className="text-center mt-2">
                  {/* <Link to="/service">
                    <button type="submit" className="btn btn-primary px-5 py-2" id="NextMove">
                      Next
                    </button>
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row d-flex flex-column align-items-center justify-content-center">
                <div className="col-md-4 col-12"></div>
                <div className="col-md-5 col-12">
                  {stops.map((stop, index) => (
                    <Autocomplete
                      onLoad={onStopLoad(index)}
                      onPlaceChanged={() => onPlaceChanged("stops", index)}
                      key={index}
                      options={{
                        types: ["(regions)"],
                        componentRestrictions: { country: ["sg", "in"] },
                      }}
                    >
                      <div className="d-flex align-items-center mt-3">
                        <Form.Control
                          id="AddStop"
                          type="text"
                          placeholder="Add more stops"
                          name="stops"
                          value={formik.values.stops[index]}
                          onChange={(e) =>
                            handleStopChange(index, e.target.value)
                          }
                          className="me-2"
                        />
                        <FaMinus
                          className="text-danger"
                          onClick={() => handleDeleteStop(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </Autocomplete>
                  ))}
                  <div>
                    <button
                      type="button"
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
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-2 text-center"
                      id="NextMove"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="col-md-3 col-12"></div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <HouseShiftModel
        show={modalShow}
        title={modalTitle}
        shiftType={shiftType}
        onHide={handleCloseModal}
        pickupLocation={formik.values.pickupLocation}
        dropLocation={formik.values.dropLocation}
        stops={formik.values.stops}
        setStops={setStops}
        setLocationDetail={setLocationDetail}
      />
    </div>
  );
}

export default Map;
