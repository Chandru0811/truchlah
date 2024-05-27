import React, { useEffect, useState } from "react";
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

function Map() {
  const [center, setCenter] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [destinationMarkerPosition, setDestinationMarkerPosition] =
    useState(null);
  const [directions, setDirections] = useState(null);
  const [locationDetail, setLocationDetail] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState([]);
  const navigate = useNavigate();
  const shiftType = sessionStorage.getItem("shiftType");
  console.log("Type:", shiftType);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const validationSchema = Yup.object().shape({
    pickupLocation: Yup.string().required("!Pickup Location is required"),
    dropLocation: Yup.string().required("!Drop Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      pickupLocation: "",
      dropLocation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        userId: 1,
        type: shiftType,
        locationDetail: locationDetail,
      };
      console.log("Form values:", payload);
      try {
        const response = await bookingApi.post(`booking/create`, payload);
        if (response.status === 200) {
          // toast.success("Successfully Booking Create")
          toast.success(response.data.message);
          navigate("/service");
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

  const onPlaceChanged = async (type) => {
    if (type === "origin") {
      if (origin) {
        const place = origin.getPlace();
        if (place && place.formatted_address) {
          setSelectedAddress(place.formatted_address);
          console.log("Selected origin:", place.formatted_address);
        }
        handleOpenModal("Pick Up Location");
        formik.setFieldValue("pickupLocation", place.formatted_address);
      }
    } else if (type === "destination") {
      if (destination) {
        const place = destination.getPlace();
        if (place && place.formatted_address) {
          setSelectedAddress(place.formatted_address);
          console.log("Selected destination:", place.formatted_address);
        }
        handleOpenModal("Drop Location");
        formik.setFieldValue("dropLocation", place.formatted_address);
      }
    }

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
    return <div>Loading...</div>;
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
                    <p>
                      Duration : <b>{duration}</b>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex flex-column justify-content-center align-items-center mb-2">
                <Autocomplete
                  onLoad={onOriginLoad}
                  onPlaceChanged={() => onPlaceChanged("origin")}
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
                    <Autocomplete key={index}>
                      <div className="d-flex align-items-center mt-3">
                        <Form.Control
                          id="AddStop"
                          type="text"
                          placeholder="Add more stops"
                          value={stop}
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
        setLocationDetail={setLocationDetail}
      />
    </div>
  );
}

export default Map;
