

import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import RedMarker from "../../asset/pinRed.png";
// import blueMarker from "../../asset/pinBlue.png";

function MapCopy() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinations, setDestinations] = useState([""]);
  const [markerPositions, setMarkerPositions] = useState({
    origin: null,
    destinations: [],
  });

  const originRef = useRef();
  const destinationRefs = useRef([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);
          setCurrentLocation({ lat: latitude, lng: longitude });

          const geocoder = new window.google.maps.Geocoder();
          const latlng = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                originRef.current.value = results[0].formatted_address;
                setMarkerPositions((prevState) => ({
                  ...prevState,
                  origin: latlng,
                }));
              } else {
                console.error("No results found");
              }
            } else {
              console.error("Geocoder failed due to: " + status);
            }
          });
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

  async function calculateRoute() {
    if (
      originRef.current.value === "" ||
      destinationRefs.current.some((ref) => ref.value === "")
    ) {
      return;
    }

    console.log("Direction is ", destinationRefs);
    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = destinationRefs.current.slice(0, -1).map((ref) => ({
      location: ref.value,
      stopover: true,
    }));

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination:
        destinationRefs.current[destinationRefs.current.length - 1].value,
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);

    const totalDistance = results.routes[0].legs.reduce(
      (acc, leg) => acc + leg.distance.value,
      0
    );
    const totalDuration = results.routes[0].legs.reduce(
      (acc, leg) => acc + leg.duration.value,
      0
    );

    setDistance((totalDistance / 1000).toFixed(2) + " km");
    setDuration(Math.floor(totalDuration / 60) + " mins");
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRefs.current = [];
    setDestinations([""]);
    setMarkerPositions({ origin: null, destinations: [] });
  }

  function addDestination() {
    setDestinations([...destinations, ""]);
  }

  function handleDestinationChange(index, event) {
    const newDestinations = [...destinations];
    newDestinations[index] = event.target.value;
    setDestinations(newDestinations);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: event.target.value }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setMarkerPositions((prevState) => {
          const newDestinations = [...prevState.destinations];
          newDestinations[index] = {
            lat: location.lat(),
            lng: location.lng(),
          };
          return { ...prevState, destinations: newDestinations };
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  }

  function handleOriginChange(event) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: event.target.value }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setMarkerPositions((prevState) => ({
          ...prevState,
          origin: { lat: location.lat(), lng: location.lng() },
        }));
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  }

  if (!isLoaded) {
    return <Spinner animation="border" />;
  }

  return (
    <Container
      fluid
      style={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <Row style={{ height: "100%" }}>
        <Col>
          <GoogleMap
            center={currentLocation || { lat: 48.8584, lng: 2.2945 }}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {/* Marker for current location */}
            {markerPositions.origin && (
              <Marker
                position={markerPositions.origin}
                icon={{
                  url: RedMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {/* Markers for destinations */}
            {markerPositions.destinations.map((destination, index) => (
              <Marker
                key={index}
                position={destination}
                icon={{
                  url: RedMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}
            {/* Directions */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Col>
        <Col
          xs={3}
          style={{ position: "absolute", top: "20px", left: "20px", zIndex: 1 }}
        >
          <div className="p-4 bg-white rounded shadow">
            <InputGroup className="mb-3">
              <Autocomplete>
                <Form.Control
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                  onChange={handleOriginChange}
                />
              </Autocomplete>
            </InputGroup>
            {destinations.map((destination, index) => (
              <InputGroup className="mb-3" key={index}>
                <Autocomplete>
                  <Form.Control
                    type="text"
                    placeholder={`Destination`}
                    value={destination}
                    onChange={(e) => handleDestinationChange(index, e)}
                    ref={(el) => (destinationRefs.current[index] = el)}
                  />
                </Autocomplete>
              </InputGroup>
            ))}
            <Button variant="success" className="mb-3" onClick={addDestination}>
              Add more
            </Button>
            <ButtonGroup className="mb-3">
              <Button variant="primary" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <Button variant="danger" onClick={clearRoute}>
                <FaTimes />
              </Button>
            </ButtonGroup>
            <Row>
              <Col>Distance: {distance}</Col>
              <Col>Duration: {duration}</Col>
              <Col>
                <Button
                  variant="info"
                  onClick={() => {
                    map.panTo(currentLocation || { lat: 48.8584, lng: 2.2945 });
                    map.setZoom(15);
                  }}
                >
                  <FaLocationArrow />
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MapCopy;
