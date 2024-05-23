/* global google  New test-1*/ 

import React, { useRef, useState, useEffect } from 'react';
import { Button, ButtonGroup, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import ClocationLogo from "../../asset/locateTruckla.png";

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const originRef = useRef();
  const destinationRef = useRef();

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
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService =  new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  if (!isLoaded) {
    return <Spinner animation="border" />;
  }

  return (
    <Container fluid style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Row style={{ height: '100%' }}>
        <Col>
          <GoogleMap
            center={currentLocation || { lat: 48.8584, lng: 2.2945 }}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            {currentLocation && (
              <Marker 
                position={currentLocation} 
                icon={{
                  // url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                  url: ClocationLogo, // Use your custom logo
                  scaledSize: new window.google.maps.Size(60, 70), // Scale the logo to an appropriate size
                }}
              />
            )}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Col>
        <Col xs={3} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
          <div className="p-4 bg-white rounded shadow">
            <InputGroup className="mb-3">
              <Autocomplete>
                <Form.Control type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </InputGroup>
            <InputGroup className="mb-3">
              <Autocomplete>
                <Form.Control type="text" placeholder="Destination" ref={destinationRef} />
              </Autocomplete>
            </InputGroup>
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
                <Button variant="info" onClick={() => {
                  map.panTo(currentLocation || { lat: 48.8584, lng: 2.2945 });
                  map.setZoom(15);
                }}>
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

export default Map;
