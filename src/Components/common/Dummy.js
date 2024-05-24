function Maps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [stops, setStops] = useState([]);

  const onOriginLoad = (autocomplete) => {
    setOrigin(autocomplete);
  };

  const onDestinationLoad = (autocomplete) => {
    setDestination(autocomplete);
  };

  const handlePlaceChanged = () => {
    if (origin && destination) {
      calculateRoute();
    }
  };

  const calculateRoute = () => {
    const originPlace = origin.getPlace();
    const destinationPlace = destination.getPlace();
  
    if (originPlace && originPlace.geometry && destinationPlace && destinationPlace.geometry) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originPlace.geometry.location,
          destination: destinationPlace.geometry.location,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Directions request failed due to ", status);
          }
        }
      );
    } else {
      console.error("Origin or destination place details are undefined or invalid.");
    }
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

  if (!isLoaded) {
    return null; // Return null while loading
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#fcf3f6" }}>
      <div className="row">
        <div className="col-12" id="MapContainer">
          {/* Google Map Box */}
          {/* Your GoogleMap component code */}
        </div>

        <div className="col-12 py-5">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              {/* Your Autocomplete components code */}
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
                  className="btn btn-primary "
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
            </div>
            <div className="col-lg-3 col-md-3 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
