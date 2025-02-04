import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";
import fetchAllCategorysWithIds from "../Lists/CategoryList";
import Trucklah_moving from "../../asset/Trucklah_Moving.webp";

const libraries = ["places"];

const validationSchema = Yup.object().shape({
  // type: Yup.string().required("Type is required"),
  // estKm: Yup.number().required("Estimated KM is required"),
  locationDetail: Yup.array()
    .of(
      Yup.object().shape({
        location: Yup.string().required("Location is required"),
        address: Yup.string().required("Address is required"),
        typeOfProperty: Yup.string().required("Type of property is required"),
        noOfBedrooms: Yup.string().required("No Of Bedrooms is required"),
        PropertyFloor: Yup.string().required("Property Floor is required"),
        elevator: Yup.string().required("Please select if there is an elevator"),
        contactName: Yup.string().required("Contact name is required"),
        countryCode: Yup.string().required("Country code is required"),
        mobile: Yup.string()
          .required("Mobile number is required")
          .matches(/^\d+$/, "Mobile number must contain only digits")
          .test("phone-length", function (value) {
            const { countryCode } = this.parent;
            if (countryCode === "65") {
              return value && value.length === 8
                ? true
                : this.createError({
                  message: "Phone number must be 8 digits only",
                });
            }
            if (countryCode === "91") {
              return value && value.length === 10
                ? true
                : this.createError({
                  message: "Phone number must be 10 digits only",
                });
            }
            return true;
          }),
      })
    )
    .min(2, "At least two locations are required"),
});

const HouseMap = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
    const [autocompletePickup, setAutocompletePickup] = useState(null);
    const [autocompleteDropoff, setAutocompleteDropoff] = useState(null);

    const [distance, setDistance] = useState(null);

    const userId = localStorage.getItem("userId");
    const [categorys, setCategoryData] = useState(null);

    const formik = useFormik({
      initialValues: {
        userId: userId,
        type: "",
        estKm: "",
        locationDetail: [
          {
            type: "pickup",
            location: "",
            address: "",
            typeOfProperty: "",
            noOfBedrooms: "",
            PropertyFloor: "",
            elevator: "",
            PropertyDetails: "",
            contactName: "",
            countryCode: "",
            mobile: "",
            latitude: "",
            longitude: "",
          },
          {
            type: "dropoff",
            location: "",
            address: "",
            typeOfProperty: "",
            noOfBedrooms: "",
            PropertyFloor: "",
            elevator: "",
            PropertyDetails: "",
            contactName: "",
            countryCode: "",
            mobile: "",
            latitude: "",
            longitude: "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("new values", values)
        setLoadIndicators(true);
        // if (values.estKm < 1 || !values.estKm) {
        //   toast.error("Invalid locations or distance too short for a ride.");
        //   setLoadIndicators(false);
        //   return;
        // }
        try {
          let response;
          if (formData.bookingId) {
            values.bookingId = formData.bookingId;
            response = await bookingApi.post(`/booking/resume`, values);
          } else {
            response = await bookingApi.post(`booking/create`, values);
          }
          if (response.status === 200) {
            toast.success("Location has been successfully added!");
            const bookingId = response.data.responseBody.booking.bookingId;
            setFormData((prv) => ({
              ...prv,
              form1: { ...values },
              bookingId: bookingId,
            }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log("error", error);
          toast.error("Please Enter the Locations");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const onPlaceChanged = (type) => {
      if (type === "pickup" && autocompletePickup) {
        const place = autocompletePickup.getPlace();
        if (place.geometry && place.formatted_address) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();

          formik.setFieldValue(
            "locationDetail[0].location",
            place.formatted_address
          );
          formik.setFieldValue("locationDetail[0].latitude", latitude);
          formik.setFieldValue("locationDetail[0].longitude", longitude);
        } else {
          console.error("No sufficient details available for input:", place);
        }
      } else if (type === "dropoff" && autocompleteDropoff) {
        const place = autocompleteDropoff.getPlace();
        if (place.geometry && place.formatted_address) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();

          formik.setFieldValue(
            "locationDetail[1].location",
            place.formatted_address
          );
          formik.setFieldValue("locationDetail[1].latitude", latitude);
          formik.setFieldValue("locationDetail[1].longitude", longitude);
        } else {
          console.error("No sufficient details available for input:", place);
        }
      }
    };

    // const calculateDistance = () => {
    //   return new Promise((resolve, reject) => {
    //     const pickupLat = formik.values.locationDetail[0].latitude;
    //     const pickupLng = formik.values.locationDetail[0].longitude;
    //     const dropoffLat = formik.values.locationDetail[1].latitude;
    //     const dropoffLng = formik.values.locationDetail[1].longitude;

    //     if (pickupLat && pickupLng && dropoffLat && dropoffLng) {
    //       const service = new window.google.maps.DistanceMatrixService();

    //       const origins = [
    //         { lat: parseFloat(pickupLat), lng: parseFloat(pickupLng) },
    //       ];
    //       const destinations = [
    //         { lat: parseFloat(dropoffLat), lng: parseFloat(dropoffLng) },
    //       ];

    //       service.getDistanceMatrix(
    //         {
    //           origins: origins,
    //           destinations: destinations,
    //           travelMode: window.google.maps.TravelMode.DRIVING,
    //         },
    //         (response, status) => {
    //           if (status === "OK") {
    //             const distanceResult = response.rows[0].elements[0];
    //             if (distanceResult.status === "OK") {
    //               const totalDistanceInMeters = distanceResult.distance.value; // Distance in meters
    //               const totalDistanceInKm = (
    //                 totalDistanceInMeters / 1000
    //               ).toFixed(2); // Convert to km

    //               // Update Formik and state
    //               setDistance(`${totalDistanceInKm} km`);
    //               formik.setFieldValue("estKm", totalDistanceInKm);

    //               resolve(totalDistanceInKm);
    //             } else {
    //               console.error(
    //                 `Error fetching distance: ${distanceResult.status}`
    //               );
    //               reject(`Error fetching distance: ${distanceResult.status}`);
    //             }
    //           } else {
    //             console.error(`Distance Matrix request failed: ${status}`);
    //             reject(`Distance Matrix request failed: ${status}`);
    //           }
    //         }
    //       );
    //     } else {
    //       reject(
    //         "Latitude or longitude is missing for pickup or dropoff location."
    //       );
    //       setLoadIndicators(false);
    //     }
    //   });
    // };

    // useEffect(() => {
    //   const pickupLat = formik.values.locationDetail[0].latitude;
    //   const pickupLng = formik.values.locationDetail[0].longitude;
    //   const dropoffLat = formik.values.locationDetail[1].latitude;
    //   const dropoffLng = formik.values.locationDetail[1].longitude;

    //   // Check if latitude and longitude for both pickup and dropoff are present
    //   if (pickupLat && pickupLng && dropoffLat && dropoffLng) {
    //     calculateDistance();
    //   }

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [
    //   formik.values.locationDetail[0].latitude,
    //   formik.values.locationDetail[0].longitude,
    //   formik.values.locationDetail[1].latitude,
    //   formik.values.locationDetail[1].longitude,
    // ]);

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
      if (formData && Object.keys(formData).length > 0) {
        formik.setValues({
          ...formik.initialValues,
          ...formData.form1,
        });
      } else {
        formik.setValues({
          ...formik.initialValues,
          locationDetail: [
            {
              type: "pickup",
              location: "",
              address: "",
              typeOfProperty: "",
              noOfBedrooms: "",
              PropertyFloor: "",
              elevator: "",
              PropertyDetails: "",
              contactName: "",
              countryCode: 65,
              mobile: "",
            },
            {
              type: "dropoff",
              location: "",
              address: "",
              typeOfProperty: "",
              noOfBedrooms: "",
              PropertyFloor: "",
              elevator: "",
              PropertyDetails: "",
              contactName: "",
              countryCode: 65,
              mobile: "",
            },
          ],
        });
      }
      fetchData();
      console.log("formik", formik.values);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      housemap: formik.handleSubmit,
    }));

    // useEffect(() => {
    //   if (formData) {
    //     Object.keys(formData).forEach((key) => {
    //       formik.setFieldValue(key, formData[key]);
    //     });
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formData]);

    if (!isLoaded) {
      return (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      );
    }

    return (
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row mt-5">
            <div className=" col-md-6 col-12">
              <div className="row">
                {/* Loop through pickup and dropoff locations */}
                {formik?.values?.locationDetail?.map((location, index) => (
                  <div key={index}>
                    <div className="rounded-pill py-3">
                      <img
                        src={location.type === "pickup" ? red : Green}
                        style={{ width: "20px" }}
                        alt="house"
                        className="icon-img me-4"
                      />
                      <span className="fw-bold">
                        {location.type === "pickup"
                          ? "Pick Up Location"
                          : "Dropoff Location"}
                      </span>
                    </div>

                    {/* Location Input */}
                    <div className="col-md-10 col-12 mb-3">
                      <Autocomplete
                        onLoad={(autoC) => {
                          location.type === "pickup"
                            ? setAutocompletePickup(autoC)
                            : setAutocompleteDropoff(autoC);
                        }}
                        onPlaceChanged={() =>
                          onPlaceChanged(
                            location.type === "pickup" ? "pickup" : "dropoff"
                          )
                        }
                        options={{
                          types: ["establishment"],
                          componentRestrictions: { country: "SG" },
                          fields: ["formatted_address", "geometry"],
                        }}
                      >
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
                            <IoLocationSharp />
                          </span>
                          <input
                            type="text"
                            name={`locationDetail[${index}].location`}
                            placeholder={`Enter ${location.type === "pickup" ? "Pickup" : "Dropoff"
                              } Location`}
                            className="form-control"
                            value={
                              formik.values.locationDetail?.[index]?.location ||
                              ""
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              borderLeft: "none",
                              borderRadius: "0 10px 10px 0",
                            }}
                          />
                        </div>
                      </Autocomplete>
                      {formik.touched.locationDetail?.[index]?.location &&
                        formik.errors.locationDetail?.[index]?.location ? (
                        <div className="text-danger">
                          {formik.errors.locationDetail[index].location}
                        </div>
                      ) : null}
                    </div>

                    {/* Address Input */}
                    <div className="col-md-10 col-12 mb-3">
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
                          name={`locationDetail[${index}].address`}
                          value={
                            formik.values.locationDetail?.[index]?.address || ""
                          }
                          placeholder={`Enter ${location.type === "pickup" ? "Pickup" : "Dropoff"
                            } Address`}
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            borderLeft: "none",
                            borderRadius: "0 10px 10px 0",
                          }}
                        />
                      </div>
                      {formik.touched.locationDetail?.[index]?.address &&
                        formik.errors.locationDetail?.[index]?.address ? (
                        <div className="text-danger">
                          {formik.errors.locationDetail[index].address}
                        </div>
                      ) : null}
                    </div>

                    {/* Contact Name and Mobile */}
                    <div className="col-md-10 col-12 mt-3">
                      <div className="row">
                        <div className="col-md-6 col-12 p-2">
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
                              <IoMdContact />
                            </span>
                            <input
                              type="text"
                              name={`locationDetail[${index}].contactName`}
                              placeholder={`Enter ${location.type === "pickup"
                                ? "Pickup"
                                : "Dropoff"
                                } Contact Name`}
                              className="form-control"
                              value={
                                formik.values.locationDetail?.[index]
                                  ?.contactName || ""
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.touched.locationDetail?.[index]
                            ?.contactName &&
                            formik.errors.locationDetail?.[index]?.contactName ? (
                            <div className="text-danger">
                              {formik.errors.locationDetail[index].contactName}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-md-6 col-12 p-2">
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
                              <select
                                name={`locationDetail[${index}].countryCode`}
                                onChange={formik.handleChange}
                                value={
                                  formik.values.locationDetail?.[index]
                                    ?.countryCode || ""
                                }
                                onBlur={formik.handleBlur}
                                className=""
                              >
                                <option value="65">+65</option>
                                <option value="91">+91</option>
                              </select>
                            </span>
                            <input
                              type="text"
                              name={`locationDetail[${index}].mobile`}
                              value={
                                formik.values.locationDetail?.[index]?.mobile ||
                                ""
                              }
                              placeholder={`Enter ${location.type === "pickup"
                                ? "Pickup"
                                : "Dropoff"
                                } Contact Number`}
                              className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.touched.locationDetail?.[index]?.mobile &&
                            formik.errors.locationDetail?.[index]?.mobile ? (
                            <div className="text-danger">
                              {formik.errors.locationDetail[index].mobile}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Property Selection */}
                    <div className="col-md-10 col-12">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="rounded-pill">
                            <span className="fw-medium">Type of property</span>
                          </div>
                          <div className="input-group mt-1" style={{ overflow: "hidden", height: "50px" }}>
                            <select
                              name={`locationDetail[${index}].typeOfProperty`}
                              className="form-select"
                              value={
                                formik.values.locationDetail?.[index]?.typeOfProperty || ""
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="" className="text-muted">Select</option>
                              {categorys &&
                                categorys.map((category) => (
                                  <option
                                    key={category.id}
                                    value={category.houseCategoryName}
                                  >
                                    {(
                                      category.houseCategoryName
                                        .charAt(0)
                                        .toUpperCase() +
                                      category.houseCategoryName.slice(1)
                                    ).replace("_", " ")}
                                  </option>
                                ))}
                            </select>
                          </div>
                          {formik.touched.locationDetail?.[index]?.typeOfProperty &&
                            formik.errors.locationDetail?.[index]?.typeOfProperty ? (
                            <div className="text-danger">
                              {formik.errors.locationDetail[index].typeOfProperty}
                            </div>
                          ) : null}
                        </div>
                        {(formik.values.locationDetail?.[index]?.typeOfProperty === "Condominium" ||
                          formik.values.locationDetail?.[index]?.typeOfProperty === "HBK" ||
                          formik.values.locationDetail?.[index]?.typeOfProperty === "Landed Property") && (
                            <div className="col-md-6 col-12">
                              <div className="rounded-pill">
                                <span className="fw-medium">No. of bedrooms</span>
                              </div>
                              <div className="input-group mt-1" style={{ overflow: "hidden", height: "50px" }}>
                                <select
                                  name={`locationDetail[${index}].noOfBedrooms`}
                                  className="form-select"
                                  value={
                                    formik.values.locationDetail?.[index]?.noOfBedrooms || ""
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="">Select</option>
                                  {[...Array(12)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {formik.touched.locationDetail?.[index]?.noOfBedrooms &&
                                formik.errors.locationDetail?.[index]?.noOfBedrooms ? (
                                <div className="text-danger">
                                  {formik.errors.locationDetail[index].noOfBedrooms}
                                </div>
                              ) : null}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Show additional fields only if Type of Property is selected */}
                    {(formik.values.locationDetail?.[index]?.typeOfProperty === "Condominium" ||
                      formik.values.locationDetail?.[index]?.typeOfProperty === "HBK" ||
                      formik.values.locationDetail?.[index]?.typeOfProperty === "Landed Property") && (
                        <div className="col-md-10 col-12">
                          <div className="row">
                            {/* Property Floor */}
                            <div className="col-md-6 col-12">
                              <div className="rounded-pill pt-1">
                                <span className="fw-medium">Property floor</span>
                              </div>
                              <div className="input-group mt-1" style={{ overflow: "hidden", height: "50px" }}>
                                <select
                                  name={`locationDetail[${index}].PropertyFloor`}
                                  className="form-select"
                                  value={
                                    formik.values.locationDetail?.[index]?.PropertyFloor || ""
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="">Select</option>
                                  {[...Array(31)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {formik.touched.locationDetail?.[index]?.PropertyFloor &&
                                formik.errors.locationDetail?.[index]?.PropertyFloor ? (
                                <div className="text-danger">
                                  {formik.errors.locationDetail[index].PropertyFloor}
                                </div>
                              ) : null}
                            </div>
                            {/* Is there an elevator? */}
                            <div className="col-md-6 col-12">
                              <div className="rounded-pill pt-1">
                                <span className="fw-medium">Is there an elevator?</span>
                              </div>
                              <div className="mt-1 d-flex justify-content-between" style={{ height: "50px" }}>
                                <button
                                  type="button"
                                  className="btn"
                                  style={{
                                    backgroundColor: formik.values.locationDetail?.[index]?.elevator === "yes" ? "#acff3b" : "transparent",
                                    border: "1px solid #acff3b",
                                    color: formik.values.locationDetail?.[index]?.elevator === "yes" ? "#fff" : "#000",
                                    fontWeight: "bold",
                                    padding: "8px 20px",
                                    borderRadius: "5px",
                                    width: "95px"
                                  }}
                                  onClick={() => formik.setFieldValue(`locationDetail[${index}].elevator`, "yes")}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  className="btn"
                                  style={{
                                    backgroundColor: formik.values.locationDetail?.[index]?.elevator === "no" ? "#acff3b" : "transparent",
                                    border: "1px solid #acff3b",
                                    color: formik.values.locationDetail?.[index]?.elevator === "no" ? "#fff" : "#000",
                                    fontWeight: "bold",
                                    padding: "8px 20px",
                                    borderRadius: "5px",
                                    width: "95px"
                                  }}
                                  onClick={() => formik.setFieldValue(`locationDetail[${index}].elevator`, "no")}
                                >
                                  No
                                </button>
                              </div>
                              {formik.touched.locationDetail?.[index]?.elevator &&
                                formik.errors.locationDetail?.[index]?.elevator && (
                                  <div className="text-danger">{formik.errors.locationDetail[index].elevator}</div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Others"*/}
                    {formik.values.locationDetail?.[index]?.typeOfProperty === "Other" && (
                      <div className="col-md-10 col-12">
                        <div className="row">
                          {/* Property details */}
                          <div className="col-md-12 col-12">
                            <div className="rounded-pill pt-1">
                              <span className="fw-medium">Tell us your property details</span>
                            </div>
                            <textarea
                              type="text"
                              name={`locationDetail[${index}].PropertyDetails`}
                              className="form-control mt-1"
                              value={formik.values.locationDetail?.[index]?.PropertyDetails || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.locationDetail?.[index]?.PropertyDetails &&
                              formik.errors.locationDetail?.[index]?.PropertyDetails && (
                                <div className="text-danger">
                                  {formik.errors.locationDetail[index].PropertyDetails}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Category Selection */}
                {/* <div className="rounded-pill pt-3">
                  <span className="fw-bold">Select Category</span>
                </div>
                <div className="col-md-10 col-12 mb-3">
                  <div
                    className="input-group mt-3"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "50px",
                    }}
                  >
                    <select
                      type="text"
                      name="type"
                      className="form-select"
                      placeholder="Enter a drop-off address"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" className="text-muted">
                        Select
                      </option>
                      {categorys &&
                        categorys.map((category) => (
                          <option
                            key={category.id}
                            value={category.houseCategoryName}
                          >
                            {(
                              category.houseCategoryName
                                .charAt(0)
                                .toUpperCase() +
                              category.houseCategoryName.slice(1)
                            ).replace("_", " ")}
                          </option>
                        ))}
                    </select>
                  </div>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="text-danger">{formik.errors.type}</div>
                  ) : null}
                </div> */}
              </div>
            </div>

            <div className="col-md-6 col-12">
              {/* <span className="d-flex justify-content-center align-items-center py-3">
                {distance && (
                  <div>
                    <strong>Estimated Distance: </strong> {distance}
                  </div>
                )}
              </span> */}
              <div
                className=" d-flex justify-content-center align-items-center"
                style={{ position: "sticky", top: "67px", zIndex: "1" }}
              >
                <img
                  src={Trucklah_moving}
                  className="img-fluid"
                  alt="Trucklah Moving Singapore"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default HouseMap;
