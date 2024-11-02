import React, { useEffect, useState, useCallback } from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import RedMarker from "../../asset/pinRed.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Modal } from "react-bootstrap";
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
import { useLocation, useNavigate } from "react-router-dom";
import { bookingApi } from "../../config/URL";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";

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
  // const [destinationMarkerPosition, setDestinationMarkerPosition] =
  //   useState(null);
  const [directions, setDirections] = useState(null);
  const [locationDetail, setLocationDetail] = useState([]);
  console.log("Location Details", locationDetail);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState({
    pickupLocation: false,
    dropLocation: false,
    stops: [],
  });
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => { setShow(false) };
  const currentPath = location.pathname;
  console.log("Current path:", currentPath);
  console.log("stops:", stops);

  const formik = useFormik({
    initialValues: {
      pickupLocation: "",
      dropLocation: "",
      stops: [],
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // Find the index of the drop location
      // const dropIndex = locationDetail.findIndex(location => location.state === "drop");

      // if (dropIndex !== -1) {
      //   // Remove the drop location from its current position
      //   const dropLocation = locationDetail.splice(dropIndex, 1)[0];

      //   // Add the drop location to the end of the array
      //   locationDetail.push(dropLocation);
      // }

      // const payload = {
      //   userId: userId,
      //   type: shiftType,
      //   locationDetail: locationDetail,
      // };

      // console.log("Form values:", payload);

      // try {
      //   const response = await bookingApi.post(`booking/create`, payload);
      //   if (response.status === 200) {
      //     toast.success("Location has been successfully added!");
      //     const bookingId = response.data.responseBody.booking.bookingId;
      //     const locations = encodeURIComponent(JSON.stringify(locationDetail));
      //     navigate(
      //       `/service?location=${locations}&bookingId=${bookingId}&distance=${distance}`
      //     );
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error(error.message || "An error occurred while submitting the form.");
      // }
      SubmitLocation();
    },
  });

  const SubmitLocation = async () => {
    const dropIndex = locationDetail.findIndex(
      (location) => location.state === "drop"
    );

    if (dropIndex !== -1) {
      // Remove the drop location from its current position
      const dropLocation = locationDetail.splice(dropIndex, 1)[0];

      // Add the drop location to the end of the array
      locationDetail.push(dropLocation);
    }

    const payload = {
      userId: userId,
      type: shiftType,
      estKm:distance,
      locationDetail: locationDetail,
    };

    console.log("Form values:", payload);
    setLoadIndicator(true);
    setIsNextButtonDisabled(true);
    try {
      const response = await bookingApi.post(`booking/create`, payload);
      if (response.status === 200) {
        toast.success("Location has been successfully added!");
        const bookingId = response.data.responseBody.booking.bookingId;
        const locations = encodeURIComponent(JSON.stringify(locationDetail));
        navigate(
          `/service?location=${locations}&bookingId=${bookingId}&distance=${distance}`
        );
      } else {
        toast.error(response.data.message);
        // toast.warning("Pleas Enter the Locations");
      }
    } catch (error) {
      // toast.error(
      //   error.message || "An error occurred while submitting the form."
      // );
      toast.warning("Please Enter the Locations");
    } finally {
      setLoadIndicator(false);
      setIsNextButtonDisabled(false);
    }
  };

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
        if (place && place.formatted_address) {
          formik.setFieldValue("pickupLocation", place.formatted_address);
          setShowEditIcon((prevState) => ({
            ...prevState,
            pickupLocation: true,
          }));
          handleOpenModal("Pick Up Location");
        } else {
          toast.warning("Please select a valid pickup location.");
        }
      }
    } else if (type === "destination") {
      if (destination) {
        place = destination.getPlace();
        if (place && place.formatted_address) {
          formik.setFieldValue("dropLocation", place.formatted_address);
          setShowEditIcon((prevState) => ({
            ...prevState,
            dropLocation: true,
          }));
          handleOpenModal("Drop Location");
        } else {
          toast.warning("Please select a valid drop location.");
        }
      }
    } else if (type === "stops" && index !== null) {
      if (stops[index] && typeof stops[index].getPlace === "function") {
        place = stops[index].getPlace();
        if (place && place.formatted_address) {
          const updatedStops = [...formik.values.stops];
          updatedStops[index] = place.formatted_address;
          formik.setFieldValue("stops", updatedStops);
          const updatedEditIconStops = [...showEditIcon.stops];
          updatedEditIconStops[index] = true;
          setShowEditIcon((prevState) => ({
            ...prevState,
            stops: updatedEditIconStops,
          }));
          handleOpenModal(`${index + 1}`);
        } else {
          toast.warning("Please select a valid stop location.");
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
        setCenter(location);
        recalculateDirections();
      } else if (type === "stops" && index !== null) {
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

  const handleAddStop = (title) => {
    //  setModalTitle(title);
    if (
      formik.values.stops.length > 0 &&
      formik.values.stops[formik.values.stops.length - 1] === ""
    ) {
      toast.warning(
        "Please fill in the previous stop before adding a new one."
      );
      return;
    }

    setStops([...stops, ""]);
    formik.setFieldValue("stops", [...formik.values.stops, ""]);
    setShowEditIcon((prevState) => ({
      ...prevState,
      stops: [...prevState.stops, false],
    }));
    // setModalShow(true);
  };
  
  const handleDeleteStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
    recalculateDirections();
    // Update locationDetail based on the actual stop's state value
    setLocationDetail((prevDetails) => {
      const locationDetail = prevDetails.filter(
        (item) => item.state !== `stop${index + 1}`
      );
      console.log("object",locationDetail)
      return [...locationDetail];
    });
  
    // Update Formik's stops
    const updatedFormikStops = [...formik.values.stops];
    updatedFormikStops.splice(index, 1);
    formik.setFieldValue("stops", updatedFormikStops);
  
    // Update edit icon state for stops
    const updatedEditIconStops = [...showEditIcon.stops];
    updatedEditIconStops.splice(index, 1);
    setShowEditIcon((prevState) => ({
      ...prevState,
      stops: updatedEditIconStops,
    }));
  
   
    // setModalShow(false); Uncomment if you want to close the modal
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
          if (stop) {
            const stopPlace = stop.getPlace();
            return {
              location: {
                lat: stopPlace?.geometry?.location.lat(),
                lng: stopPlace?.geometry?.location.lng(),
              },
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
              setDirections(null);
              const route = result.routes[0];
              let totalDistance = 0;
              let totalDuration = 0;
              for (let i = 0; i < route.legs.length; i++) {
                totalDistance += route.legs[i].distance.value;
                totalDuration += route.legs[i].duration.value;
              }
              setDirections(result);
              const distanceInKm = (totalDistance / 1000).toFixed(2);
              setDistance(`${distanceInKm}`);
              setDuration(`${Math.floor(totalDuration / 60)} mins`);
              if (distanceInKm === "0.00") {
                setIsNextButtonDisabled(true);
              } else {
                setIsNextButtonDisabled(false);
              }
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    }
  }, [center, stops, formik.values.stops,directions]);

  useEffect(() => {
    recalculateDirections();
  }, [recalculateDirections]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position?.coords?.latitude;
          const lng = position?.coords?.longitude;
          setUserLocation({ lat, lng });
          console.log("lat", lat)
          console.log("lng", lng)
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Optional: You can also set a default location or handle errors appropriately
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel the order?</Modal.Body>
        <Modal.Footer className="p-1">
          <button className="btn btn-danger btn-sm px-3" onClick={handleClose}>No</button>
          <button className="btn btn-info btn-sm px-3" onClick={() => { handleClose(); navigate("/shift") }}>Yes</button>
        </Modal.Footer>
      </Modal>
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
            </GoogleMap>
          </div>

          <div className="col-12 py-5">
            <div className="row mb-4">
              <div className="col-12">
                {distance && duration && (
                  <div className="distance-time d-flex justify-content-center align-items-center">
                    <p className="me-5">
                      Distance : <b>{distance} KM</b>
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
                    bounds: new window.google.maps.LatLngBounds(
                      new window.google.maps.LatLng(userLocation?.lat - 0.1, userLocation?.lng - 0.1),
                      new window.google.maps.LatLng(userLocation?.lat + 0.1, userLocation?.lng + 0.1)
                    ),
                    types: ["geocode"], // Use geocode for all locations
                    componentRestrictions: { country: ["sg", "in"] }, // Restrict to Singapore and India
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
                      className="form-control form-control-lg rounded-5 select-location"
                    />
                    {/* {showEditIcon.pickupLocation && (
                      <FaEdit
                        className="edit-icon ms-2"
                        onClick={() => handleOpenModal("Pick Up Location")}
                        style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
                      />
                    )} */}
                  </FloatingLabel>

                </Autocomplete>
                {formik.touched.pickupLocation &&
                  formik.errors.pickupLocation && (
                    <div className="mb-2 text-danger">
                      {formik.errors.pickupLocation}
                    </div>
                  )}

                {stops.map((stop, index) => (
                  <Autocomplete
                    onLoad={onStopLoad(index)}
                    onPlaceChanged={() => onPlaceChanged("stops", index)}
                    key={index}
                    options={{
                      // types: ["(regions)"],
                      bounds: new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(userLocation?.lat - 0.1, userLocation?.lng - 0.1),
                        new window.google.maps.LatLng(userLocation?.lat + 0.1, userLocation?.lng + 0.1)
                      ),
                      types: ["geocode"],
                      componentRestrictions: { country: ["sg", "in"] },
                    }}
                  >
                    <div className="d-flex align-items-center mt-3">
                      {/* {showEditIcon.stops[index] && (
                        <FaEdit
                          className="edit-icon"
                          onClick={() => handleOpenModal(`Stops ${index + 1}`)}
                        />
                      )} */}
                      <Form.Control
                        id="AddStop"
                        type="text"
                        placeholder="Add more stops"
                        name="stops"
                        value={formik.values.stops[index]}
                        onChange={(e) =>
                          handleStopChange(index, e.target.value)
                        }
                        className="form-control rounded-5 mx-2 select-location"
                        disabled={!formik.values.pickupLocation}
                      />
                      <FaMinus
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Remove Stop"
                        className="text-danger"
                        onClick={() => handleDeleteStop(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </Autocomplete>
                ))}

                {stops.length < 10 && (
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary mb-3 shadow-none"
                      style={{
                        backgroundColor: "transparent",
                        color: "red",
                        border: "none",
                      }}
                      onClick={handleAddStop}
                      disabled={!formik.values.pickupLocation}
                    >
                      Add Stop <FaPlus />
                    </button>
                  </div>
                )}
                <Autocomplete
                  onLoad={onDestinationLoad}
                  onPlaceChanged={() => onPlaceChanged("destination")}
                  options={{
                    // types: ["(regions)"],
                    bounds: new window.google.maps.LatLngBounds(
                      new window.google.maps.LatLng(userLocation?.lat - 0.1, userLocation?.lng - 0.1),
                      new window.google.maps.LatLng(userLocation?.lat + 0.1, userLocation?.lng + 0.1)
                    ),
                    types: ["geocode"],
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
                      className="form-control form-control-lg rounded-5 select-location"
                      name="dropLocation"
                      {...formik.getFieldProps("dropLocation")}
                    />
                    {/* {showEditIcon.dropLocation && (
                          <FaEdit
                            className="edit-icon"
                            onClick={() => handleOpenModal("Drop Location")}
                          />
                        )} */}
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
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={SubmitLocation}
                      className="btn btn-primary px-5 py-2 text-center"
                      id="NextMove"
                      disabled={isNextButtonDisabled || loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
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
