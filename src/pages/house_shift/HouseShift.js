import React, { useEffect, useRef, useState } from "react";
import "../../styles/custom.css";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import blueMarker from "../../asset/pinBlue.png";
import RedMarker from "../../asset/pinRed.png";
import GreyMarker from "../../asset/pinGrey.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import {
  FaLocationDot,
  FaRegAddressCard,
  FaPhoneVolume,
} from "react-icons/fa6";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const center = { lat: 13.05, lng: 80.2824 };
const left = { lat: 13.0397, lng: 80.2792 };

const path = [
  { lat: 13.05, lng: 80.2824 },
  { lat: 13.0397, lng: 80.2792 },
  { lat: 13.0615, lng: 80.2614 },
  { lat: 13.0633, lng: 80.2812 },
  { lat: 13.05, lng: 80.2824 },
];

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

  const [center, setCenter] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [ModalPickUp, setModalPickUp] = useState(false);
  const [ModalDropOff, setModalDropOff] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [destinationMarkerPosition, setDestinationMarkerPosition] =
    useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  // const mapRef = useRef(null);
  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  // Test 1
  // const onPlaceChanged = (type) => {
  //   if (type === "origin") {
  //     if (origin) {
  //       const place = origin.getPlace();
  //       if (place && place.formatted_address) {
  //         setSelectedAddress(place.formatted_address);
  //         console.log("Selected origin:", place.formatted_address);
  //       }
  //       handleOpenModal("Pick Up Location");
  //     }
  //   } else if (type === "destination") {
  //     if (destination) {
  //       const place = destination.getPlace();
  //       if (place && place.formatted_address) {
  //         setSelectedAddress(place.formatted_address);
  //         console.log("Selected destination:", place.formatted_address);
  //       }
  //       handleOpenModal("Drop Location");
  //     }
  //   }
  //   if (origin !== null) {
  //     const originPlace = origin.getPlace();
  //     console.log("Origin Place:", originPlace);
  //     if (
  //       originPlace &&
  //       originPlace.geometry &&
  //       originPlace.geometry.location
  //     ) {
  //       const location = {
  //         lat: originPlace.geometry.location.lat(),
  //         lng: originPlace.geometry.location.lng(),
  //       };
  //       setMarkerPosition(location);
  //       setCenter(location);
  //     }
  //   }

  //   if (destination !== null) {
  //     const destinationPlace = destination.getPlace();
  //     console.log("Destination Place:", destinationPlace);
  //     if (
  //       destinationPlace &&
  //       destinationPlace.geometry &&
  //       destinationPlace.geometry.location
  //     ) {
  //       const dropLocation = {
  //         lat: destinationPlace.geometry.location.lat(),
  //         lng: destinationPlace.geometry.location.lng(),
  //       };
  //       setDestinationMarkerPosition(dropLocation);
  //       setCenter(dropLocation);
  //     }
  //   }

  //   if (origin && destination) {
  //     const originPlace = origin.getPlace();
  //     const destinationPlace = destination.getPlace();

  //     if (
  //       originPlace &&
  //       originPlace.geometry &&
  //       originPlace.geometry.location &&
  //       destinationPlace &&
  //       destinationPlace.geometry &&
  //       destinationPlace.geometry.location
  //     ) {
  //       const originLocation = {
  //         lat: originPlace.geometry.location.lat(),
  //         lng: originPlace.geometry.location.lng(),
  //       };
  //       const destinationLocation = {
  //         lat: destinationPlace.geometry.location.lat(),
  //         lng: destinationPlace.geometry.location.lng(),
  //       };

  //       setDirections({
  //         origin: originLocation,
  //         destination: destinationLocation,
  //         travelMode: window.google.maps.TravelMode.DRIVING,
  //       });
  //     }
  //   }
  // };


  // Test 2
  
  const onPlaceChanged = async (type) => {
    if (type === "origin") {
      if (origin) {
        const place = origin.getPlace();
        if (place && place.formatted_address) {
          setSelectedAddress(place.formatted_address);
          console.log("Selected origin:", place.formatted_address);
        }
        handleOpenModal("Pick Up Location");
      }
    } else if (type === "destination") {
      if (destination) {
        const place = destination.getPlace();
        if (place && place.formatted_address) {
          setSelectedAddress(place.formatted_address);
          console.log("Selected destination:", place.formatted_address);
        }
        handleOpenModal("Drop Location");
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


  // Test 3
  // const onPlaceChanged = async (type) => {
  //   if (type === "origin") {
  //     if (origin) {
  //       const place = origin.getPlace();
  //       if (place && place.formatted_address) {
  //         setSelectedAddress(place.formatted_address);
  //         console.log("Selected origin:", place.formatted_address);
  //       }
  //       handleOpenModal("Pick Up Location");
  //     }
  //   } else if (type === "destination") {
  //     if (destination) {
  //       const place = destination.getPlace();
  //       if (place && place.formatted_address) {
  //         setSelectedAddress(place.formatted_address);
  //         console.log("Selected destination:", place.formatted_address);
  //       }
  //       handleOpenModal("Drop Location");
  //     }
  //   }
  
  //   if (origin !== null) {
  //     const originPlace = origin.getPlace();
  //     console.log("Origin Place:", originPlace);
  //     if (originPlace && originPlace.geometry && originPlace.geometry.location) {
  //       const location = {
  //         lat: originPlace.geometry.location.lat(),
  //         lng: originPlace.geometry.location.lng(),
  //       };
  //       setMarkerPosition(location);
  //       setCenter(location);
  //     }
  //   }
  
  //   if (destination !== null) {
  //     const destinationPlace = destination.getPlace();
  //     console.log("Destination Place:", destinationPlace);
  //     if (destinationPlace && destinationPlace.geometry && destinationPlace.geometry.location) {
  //       const dropLocation = {
  //         lat: destinationPlace.geometry.location.lat(),
  //         lng: destinationPlace.geometry.location.lng(),
  //       };
  //       setDestinationMarkerPosition(dropLocation);
  //       setCenter(dropLocation);
  //     }
  //   }
  
  //   if (origin && destination) {
  //     const originPlace = origin.getPlace();
  //     const destinationPlace = destination.getPlace();
  
  //     if (
  //       originPlace &&
  //       originPlace.geometry &&
  //       originPlace.geometry.location &&
  //       destinationPlace &&
  //       destinationPlace.geometry &&
  //       destinationPlace.geometry.location
  //     ) {
  //       const originLocation = {
  //         lat: originPlace.geometry.location.lat(),
  //         lng: originPlace.geometry.location.lng(),
  //       };
  //       const destinationLocation = {
  //         lat: destinationPlace.geometry.location.lat(),
  //         lng: destinationPlace.geometry.location.lng(),
  //       };
  
  //       const directionsService = new window.google.maps.DirectionsService();
  //       directionsService.route(
  //         {
  //           origin: originLocation,
  //           destination: destinationLocation,
  //           travelMode: window.google.maps.TravelMode.DRIVING,
  //         },
  //         (result, status) => {
  //           if (status === window.google.maps.DirectionsStatus.OK) {
  //             const directionsRenderer = new window.google.maps.DirectionsRenderer({
  //               polylineOptions: {
  //                 strokeColor: 'blue',
  //                 strokeOpacity: 0.6,
  //                 strokeWeight: 5,
  //               },
  //               markerOptions: {
  //                 origin: {
  //                   icon: 'path/to/custom-origin-icon.png',
  //                 },
  //                 destination: {
  //                   icon: 'path/to/custom-destination-icon.png',
  //                 },
  //               },
  //             });
              
  //             directionsRenderer.setMap(map);
  //             directionsRenderer.setDirections(result);
  
  //             const route = result.routes[0].legs[0];
  //             setDistance(route.distance.text);
  //             setDuration(route.duration.text);
  //           } else {
  //             console.error(`Error fetching directions ${result}`);
  //           }
  //         }
  //       );
  //     }
  //   }
  // };
  
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
            {/* {destinationMarkerPosition && (
              <MarkerF
                position={(destinationMarkerPosition, left)}
                icon={{
                  url: blueMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )} */}
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
                  <p className="me-5">Distance : <b>{distance}</b></p>
                  <p>Duration : <b>{duration}</b></p>
                </div>
              )}
            </div>
          </div>
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
                        placeholder="Drop up Location"
                        style={{ borderRadius: "30px" }}
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
      <Modal show={modalShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              location: selectedAddress,
              address: "",
              contactName: "",
              contactNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form submitted:", values);
              setSubmitting(false);
              handleCloseModal();
            }}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                <div className="container">
                  <div className="row py-4">
                    <div className="col-md-12 col-12 mb-2">
                      <label className="form-label">
                        Location<span className="text-danger">*</span>
                      </label>
                      <InputGroup className="d-flex">
                        <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white ">
                          <FaLocationDot />
                        </InputGroup.Text>
                        <Field
                          type="text"
                          name="location"
                          className="form-control"
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-12 col-12 mb-2">
                      <label className="form-label">
                        Address<span className="text-danger">*</span>
                      </label>
                      <InputGroup className="d-flex">
                        <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white ">
                          <FaRegAddressCard />
                        </InputGroup.Text>
                        <Field
                          type="text"
                          name="address"
                          className="form-control"
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-12 col-12 mb-2">
                      <label className="form-label">
                        Contact Name<span className="text-danger">*</span>
                      </label>
                      <InputGroup className="d-flex">
                        <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white ">
                          <IoMdContact />
                        </InputGroup.Text>
                        <Field
                          type="text"
                          name="contactName"
                          className="form-control"
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="contactName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-12 col-12 mb-2">
                      <label className="form-label">
                        Contact Number<span className="text-danger">*</span>
                      </label>
                      <InputGroup className="d-flex">
                        <InputGroup.Text className="d-flex justify-content-center align-items-center bg-white ">
                          <FaPhoneVolume />
                        </InputGroup.Text>
                        <Field
                          type="text"
                          name="contactNumber"
                          className="form-control"
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="contactNumber"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>
                <Modal.Footer>
                  <Button id="NextMove" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Next"}
                  </Button>
                </Modal.Footer>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HouseShift;
