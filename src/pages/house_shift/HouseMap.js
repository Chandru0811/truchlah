import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaAddressCard, FaPlusCircle, FaTrash } from "react-icons/fa";
import { IoMdContact, IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";
import fetchAllCategorysWithIds from "../Lists/CategoryList";

const center = { lat: 50.0755, lng: 14.4378 };
const libraries = ["places"];

const validationSchema = Yup.object().shape({
  type: Yup.string().required("!Type is required"),
  pickupLocation: Yup.string().required("!Pickup location is required"),
  pickupAddress: Yup.string().required("!Pickup address is required"),
  pickupContactName: Yup.string().required("!Contact name is required"),
  pickupCountryCode: Yup.string().required("!Contact number is required"),
  pickupContactNumber: Yup.string()
    .required("!Mobile number is required")
    .matches(/^\d+$/, "!Mobile number must contain only digits")
    .test("phone-length", function (value) {
      const { pickupCountryCode } = this.parent;
      if (pickupCountryCode === "65") {
        return value && value.length === 8
          ? true
          : this.createError({
              message: "!Phone number must be 8 digits only",
            });
      }
      if (pickupCountryCode === "91") {
        return value && value.length === 10
          ? true
          : this.createError({
              message: "!Phone number must be 10 digits only",
            });
      }
      return true;
    }),
  dropoffLocation: Yup.string().required("!Drop-off location is required"),
  dropoffAddress: Yup.string().required("!Drop-off address is required"),
  dropoffContactName: Yup.string().required("!Contact name is required"),
  // dropoffCountryCode: Yup.string().required("!Contact number is required"),
  dropoffContactNumber: Yup.string()
    .required("!Mobile number is required")
    .matches(/^\d+$/, "!Mobile number must contain only digits")
    .test("phone-length", function (value) {
      const { dropoffCountryCode } = this.parent;
      if (dropoffCountryCode === "65") {
        return value && value.length === 8
          ? true
          : this.createError({
              message: "!Phone number must be 8 digits only",
            });
      }
      if (dropoffCountryCode === "91") {
        return value && value.length === 10
          ? true
          : this.createError({
              message: "!Phone number must be 10 digits only",
            });
      }
      return true;
    }),
});

const HouseMap = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
    const userId = sessionStorage.getItem("userId");
    const [categorys, setCategoryData] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [totalDistance, setTotalDistance] = useState(null);
    const pickupRef = useRef(null);
    const dropoffRef = useRef(null);

    const formik = useFormik({
      initialValues: {
        type: "",
        estKm: "",
        pickupLocation: "",
        pickupAddress: "",
        pickupContactName: "",
        pickupCountryCode: "",
        pickupContactNumber: "",
        dropoffLocation: "",
        dropoffAddress: "",
        dropoffContactName: "",
        dropoffContactNumber: "",
        dropoffCountryCode: "",
      },
      validationSchema:validationSchema,
      onSubmit: async (values) => {
        console.log("Form Values:", values);
        const payload = {
          userId: userId,
          type: values.type,
          estKm: 10,
          locationDetail: [
            {
              location: "Chengalpattu, Tamil Nadu, India",
              address: "Chengalpattu main street",
              contactName: "Bala",
              countryCode: 91,
              mobile: 6757979079,
            },
            {
              location: "Chennai, Tamil Nadu, India",
              address: "anna nagar, foot court",
              contactName: "guru",
              countryCode: 91,
              mobile: 6757979079,
            },
          ],
        };
        console.log("payload:", payload);
        setLoadIndicators(true);
        try {
          const response = await bookingApi.post(`booking/create`, payload);
          if (response.status === 200) {
            toast.success("Location has been successfully added!");
            const bookingId = response.data.responseBody.booking.bookingId;
            const locations = encodeURIComponent(
              JSON.stringify(payload.locationDetail)
            );
            setFormData({
              bookingId: bookingId,
              location: locations,
              distance: 10,
              type: values.type,
            });
            handleNext();
            // navigate(
            //   `/service?location=${locations}&bookingId=${bookingId}&distance=${distance}`
            // );
          } else {
            toast.error(response.data.message);
            // toast.warning("Pleas Enter the Locations");
          }
        } catch (error) {
          toast.error("Please Enter the Locations");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const handlePlaceChanged = () => {
      if (pickupRef.current && dropoffRef.current) {
        const pickupPlace = pickupRef.current.getPlace();
        const dropoffPlace = dropoffRef.current.getPlace();

        if (pickupPlace && dropoffPlace) {
          formik.setFieldValue("pickupLocation", pickupPlace.formatted_address);
          formik.setFieldValue(
            "dropoffLocation",
            dropoffPlace.formatted_address
          );

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
                const distance = result.routes[0].legs.reduce(
                  (total, leg) => total + leg.distance.value,
                  0
                );
                setTotalDistance((distance / 1000).toFixed(2) + " km");
              } else {
                console.error("Error fetching directions:", status);
              }
            }
          );
        }
      }
    };
    const fetchData = async () => {
      try {
        const categorys = await fetchAllCategorysWithIds();
        setCategoryData(categorys);
      } catch (error) {
        toast.error(error);
      }
    };
    useEffect(() => {
      if (formData.type) {
        formik.setFieldValue("type", formData.type);
      }
      formik.setFieldValue("pickupCountryCode", 65);
      formik.setFieldValue("dropoffCountryCode", 65);
      fetchData();
    }, []);

    useImperativeHandle(ref, () => ({
      housemap: formik.handleSubmit,
    }));

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
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
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

                <div className="col-md-10 col-12 mb-3">
                  <Autocomplete
                    onLoad={(ref) => (pickupRef.current = ref)}
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <div
                      className="input-group "
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        height: "50px",
                      }}
                    >
                      <span
                        className="input-group-text"
                        style={{
                          borderRight: "none",
                          backgroundColor: "#fff",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <IoLocationSharp />
                      </span>
                      <input
                        type="text"
                        name="pickupLocation"
                        className="form-control"
                        placeholder="Enter a pickup location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          borderLeft: "none",
                          borderRadius: "0 10px 10px 0",
                        }}
                      />
                    </div>
                  </Autocomplete>
                  {formik.touched.pickupLocation &&
                  formik.errors.pickupLocation ? (
                    <div className="text-danger">
                      {formik.errors.pickupLocation}
                    </div>
                  ) : null}
                </div>

                <div className="col-md-10 col-12 mt-3 mb-3">
                  <div
                    className="input-group"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "50px",
                    }}
                  >
                    <span
                      className="input-group-text"
                      style={{
                        borderRight: "none",
                        backgroundColor: "#fff",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <FaAddressCard />
                    </span>
                    <input
                      type="text"
                      name="pickupAddress"
                      className="form-control"
                      placeholder="Enter a pickup address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={{
                        borderLeft: "none",
                        borderRadius: "0 10px 10px 0",
                      }}
                    />
                  </div>
                  {formik.touched.pickupAddress &&
                  formik.errors.pickupAddress ? (
                    <div className="text-danger">
                      {formik.errors.pickupAddress}
                    </div>
                  ) : null}
                </div>

                <div className="col-md-10 col-12 mt-3">
                  <div className="row">
                    <div className="col-md-6 col-12 p-2 mb-4">
                      <div
                        className="input-group "
                        style={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: "50px",
                        }}
                      >
                        <span
                          className="input-group-text"
                          style={{
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderRadius: "10px 0 0 10px",
                          }}
                        >
                          <IoMdContact />
                        </span>
                        <input
                          type="text"
                          name="pickupContactName"
                          className="form-control"
                          placeholder="Enter a contact name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.pickupContactName &&
                      formik.errors.pickupContactName ? (
                        <div className="text-danger">
                          {formik.errors.pickupContactName}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-6 col-12 p-2 mb-4">
                      <div
                        className="input-group  "
                        style={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: "50px",
                        }}
                      >
                        <span
                          className="input-group-text"
                          style={{
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderRadius: "10px 0 0 10px",
                          }}
                        >
                          <select
                            name="pickupCountryCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className=""
                          >
                            <option value="65" selected>+65</option>
                            <option value="91">+91</option>
                          </select>
                        </span>
                        <input
                          type="text"
                          name="pickupContactNumber"
                          className="form-control"
                          placeholder="Enter a contact number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.pickupContactNumber &&
                      formik.errors.pickupContactNumber ? (
                        <div className="text-danger">
                          {formik.errors.pickupContactNumber}
                        </div>
                      ) : null}
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
                  <Autocomplete
                    onLoad={(ref) => (dropoffRef.current = ref)}
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <div
                      className="input-group"
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        height: "50px",
                      }}
                    >
                      <span className="input-group-text">
                        <IoLocationSharp />
                      </span>
                      <input
                        type="text"
                        name="dropoffLocation"
                        className="form-control"
                        placeholder="Enter a drop-off location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </Autocomplete>
                  {formik.touched.dropoffLocation &&
                  formik.errors.dropoffLocation ? (
                    <div className="text-danger">
                      {formik.errors.dropoffLocation}
                    </div>
                  ) : null}
                </div>

                <div className="col-md-10 col-12 mb-3">
                  <div
                    className="input-group mt-3 "
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "50px",
                    }}
                  >
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      style={{
                        borderRight: "none",
                        backgroundColor: "#fff",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <FaAddressCard />
                    </span>
                    <input
                      type="text"
                      name="dropoffAddress"
                      className="form-control"
                      placeholder="Enter a drop-off address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.dropoffAddress &&
                  formik.errors.dropoffAddress ? (
                    <div className="text-danger">
                      {formik.errors.dropoffAddress}
                    </div>
                  ) : null}
                </div>

                <div className="col-md-10 col-12 mt-3">
                  <div className="row">
                    <div className="col-md-6 col-12 p-2 mb-4">
                      <div
                        className="input-group "
                        style={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: "50px",
                        }}
                      >
                        <span
                          className="input-group-text"
                          id="basic-addon1"
                          style={{
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderRadius: "10px 0 0 10px",
                          }}
                        >
                          <IoMdContact />
                        </span>
                        <input
                          type="text"
                          name="dropoffContactName"
                          className="form-control"
                          placeholder="Enter a contact name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.dropoffContactName &&
                      formik.errors.dropoffContactName ? (
                        <div className="text-danger">
                          {formik.errors.dropoffContactName}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-6 col-12 p-2 mb-4">
                      <div
                        className="input-group "
                        style={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: "50px",
                        }}
                      >
                        <span
                          className="input-group-text"
                          id="basic-addon1"
                          style={{
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderRadius: "10px 0 0 10px",
                          }}
                        >
                          <select
                            name="dropoffCountryCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className=""
                          >
                            <option value="+65">+65</option>
                            <option value="+91">+91</option>
                          </select>
                        </span>
                        <input
                          type="text"
                          name="dropoffContactNumber"
                          className="form-control"
                          placeholder="Enter a contact number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.dropoffContactNumber &&
                      formik.errors.dropoffContactNumber ? (
                        <div className="text-danger">
                          {formik.errors.dropoffContactNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="rounded-pill pt-3">
                  {/* <img
                    src={Green}
                    style={{ width: "20px" }}
                    alt="house"
                    className="icon-img me-4"
                  /> */}
                  <span className="fw-bold">Select Category</span>
                </div>
                <div className="col-md-10 col-12 mb-3">
                  <div
                    className="input-group mt-3 "
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "50px",
                    }}
                  >
                    {/* <span
                      className="input-group-text"
                      id="basic-addon1"
                      style={{
                        borderRight: "none",
                        backgroundColor: "#fff",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <FaAddressCard />
                    </span> */}
                    <select
                      type="text"
                      name="type"
                      className="form-select"
                      placeholder="Enter a drop-off address"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value={""} className="text-muted">
                        Select
                      </option>
                      {categorys &&
                        categorys.map((category) => (
                          <option
                            key={category.id}
                            value={category.houseCategoryName}
                          >
                            {category.houseCategoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="text-danger">{formik.errors.type}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <span className="d-flex justify-content-center align-items-center py-3">
                {totalDistance && (
                  <span className="fw-bold">
                    Total Distance: {totalDistance}
                  </span>
                )}
              </span>
              <div
                className=" d-flex justify-content-center align-items-center"
                style={{ position: "sticky", top: "67px", zIndex: "1" }}
              >
                <GoogleMap
                  center={center}
                  zoom={12}
                  mapContainerStyle={{
                    width: "100%",
                    height: "400px",
                    height: "90vh",
                    borderRadius: "20px",
                  }}
                >
                  {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                  )}
                </GoogleMap>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default HouseMap;
