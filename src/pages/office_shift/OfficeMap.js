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
import Trucklah_moving from "../../asset/Trucklah_Moving.webp";
import OfficeCategoryList from "../Lists/OfficeCategoryList";

const libraries = ["places"];

const validationSchema = Yup.object().shape({
  // estKm: Yup.number().required("Estimated KM is required"),
  locationDetail: Yup.array().of(
    Yup.object().shape({
      location: Yup.string()
                .required("*Postal Code is required")
                .length(6, "*Postal Code must be exactly 6 digits")
                .test(
                  "unique-location",
                  "*Postal Code could not be same",
                  function (value) {
                    const { locationDetail } = this.options.context;
                    if (!value) return true; 
                    const occurrences = locationDetail.filter(
                      (item) => item.location === value
                    ).length;
      
                    return occurrences === 1; 
                  }
                ),
      // address: Yup.string().required("*Address is required"),
      typeOfProperty: Yup.string().required("*Type of property is required"),
      // sizeOfProperty: Yup.string().when("typeOfProperty", {
      //   is: (val) => ["Shophouse", "Officebuilding"].includes(val),
      //   then: (schema) => schema.required("*Size of Property is required"),
      //   otherwise: (schema) => schema.notRequired(),
      // }),
      // propertyFloor: Yup.string().when("typeOfProperty", {
      //   is: (val) => ["Shophouse", "Officebuilding"].includes(val),
      //   then: (schema) => schema.required("*Property floor is required"),
      //   otherwise: (schema) => schema.notRequired(),
      // }),
      // isElevator: Yup.string().when("typeOfProperty", {
      //   is: (val) => ["Shophouse", "Officebuilding"].includes(val),
      //   then: (schema) => schema.required("*Please select if there is an Elevator"),
      //   otherwise: (schema) => schema.notRequired(),
      // }),
      propertyDescription: Yup.string().when("typeOfProperty", {
        is: "Others",
        then: (schema) =>
          schema
            .max(255, "*Details cannot exceed 255 characters")
            .nullable(),
        otherwise: (schema) => schema.nullable(),
      }),
      // contactName: Yup.string().required("*Contact name is required"),
      // countryCode: Yup.string().required("*Country code is required"),
      // mobile: Yup.string()
      //   .required("*Mobile number is required")
      //   .matches(/^\d+$/, "*Mobile number must contain only digits")
      //   .test("phone-length", function (value) {
      //     const { countryCode } = this.parent;
      //     if (countryCode === "65") {
      //       return value && value.length === 8
      //         ? true
      //         : this.createError({
      //             message: "*Phone number must be 8 digits only",
      //           });
      //     }
      //     if (countryCode === "91") {
      //       return value && value.length === 10
      //         ? true
      //         : this.createError({
      //             message: "*Phone number must be 10 digits only",
      //           });
      //     }
      //     return true;
      //   }),
    })
  ),
  // .min(2, "*At least two locations are required"),
});

const OfficeMap = forwardRef(
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
        locationDetail: [
          {
            type: "pickup",
            location: "",
            address: "",
            typeOfProperty: "",
            sizeOfProperty: "",
            propertyFloor: "",
            propertyDescription: "",
            isElevator: "",
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
            sizeOfProperty: "",
            propertyFloor: "",
            propertyDescription: "",
            isElevator: "",
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
        console.log("new values", values);
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

    // const onPlaceChanged = (type) => {
    //   if (type === "pickup" && autocompletePickup) {
    //     const place = autocompletePickup.getPlace();
    //     if (place.geometry && place.formatted_address) {
    //       const latitude = place.geometry.location.lat();
    //       const longitude = place.geometry.location.lng();
    //       let pincode = "";
    //       place.address_components.forEach((component) => {
    //         if (component.types.includes("postal_code")) {
    //           pincode = component.long_name;
    //         }
    //       });
    //       formik.setFieldValue(
    //         "locationDetail[0].location",
    //         place.formatted_address
    //       );
    //       formik.setFieldValue("locationDetail[0].latitude", latitude);
    //       formik.setFieldValue("locationDetail[0].longitude", longitude);
    //       formik.setFieldValue("locationDetail[0].pincode", pincode);
    //     } else {
    //       console.error("No sufficient details available for input:", place);
    //     }
    //   } else if (type === "dropoff" && autocompleteDropoff) {
    //     const place = autocompleteDropoff.getPlace();
    //     if (place.geometry && place.formatted_address) {
    //       const latitude = place.geometry.location.lat();
    //       const longitude = place.geometry.location.lng();
    //       let pincode = "";
    //       place.address_components.forEach((component) => {
    //         if (component.types.includes("postal_code")) {
    //           pincode = component.long_name;
    //         }
    //       });
    //       formik.setFieldValue(
    //         "locationDetail[1].location",
    //         place.formatted_address
    //       );
    //       formik.setFieldValue("locationDetail[1].latitude", latitude);
    //       formik.setFieldValue("locationDetail[1].longitude", longitude);
    //       formik.setFieldValue("locationDetail[1].pincode", pincode);
    //     } else {
    //       console.error("No sufficient details available for input:", place);
    //     }
    //   }
    // };

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
        const categorys = await OfficeCategoryList();
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
              sizeOfProperty: "",
              propertyFloor: "",
              propertyDescription: "",
              isElevator: "",
              contactName: "",
              countryCode: "",
              mobile: "",
            },
            {
              type: "dropoff",
              location: "",
              address: "",
              typeOfProperty: "",
              sizeOfProperty: "",
              propertyFloor: "",
              propertyDescription: "",
              isElevator: "",
              contactName: "",
              countryCode: "",
              mobile: "",
            },
          ],
        });
      }
      fetchData();
      console.log("formik", formik.values);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCoordinates = async (postalCode, type, index) => {
      if (!postalCode) return;
    
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${API_KEY}`;
    
      try {
        const response = await fetch(geoCodeURL);
        const data = await response.json();
        const addressComponents = data?.results[0]?.address_components;
        const country = addressComponents?.find((comp) => comp.types.includes("country"))?.short_name;
        if(country && ["SG", "IN"].includes(country)){
          if (data.status !== "OK") {
            console.log("Invalid postal code or no results found.");
            return;
          }
          const { lat, lng } = data.results[0].geometry.location;
          if (!lat || !lng) return;
          const reverseGeoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
          const reverseResponse = await fetch(reverseGeoCodeURL);
          const reverseData = await reverseResponse.json();
      
          if (reverseData.status !== "OK") {
            console.log("No address found.");
            return;
          }
          // const formattedAddress = reverseData.results[0].formatted_address?.split(" ").slice(0, -1).join(" ");
          let formattedAddress = reverseData.results[0].formatted_address;
          formattedAddress = [...new Set(formattedAddress.split(", "))].join(", ")?.split(" ").slice(0, -1).join(" ");
          const locationDetailIndex = type === "pickup" ? 0 : type === "dropoff" ? 1 : index;
          formik.setFieldValue(`locationDetail[${locationDetailIndex}].location`, postalCode);
          formik.setFieldValue(`locationDetail[${locationDetailIndex}].address`, formattedAddress);
          formik.setFieldValue(`locationDetail[${locationDetailIndex}].latitude`, lat);
          formik.setFieldValue(`locationDetail[${locationDetailIndex}].longitude`, lng);
        }else {
          const locationDetailIndex = type === "pickup" ? 0 : type === "dropoff" ? 1 : index;
          toast("Enter the valid code",{icon:"⚠️"})
          formik.setFieldValue(`locationDetail[${locationDetailIndex}].address`, "");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      officemap: formik.handleSubmit,
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
      <div className="container pb-3">
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
                      </span><span className="text-danger">*</span>
                    </div>

                    {/* Location Input */}
                    <div className="col-md-10 col-12 mb-3">
                      {/* <Autocomplete
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
                          types: ["establishment", "geocode"],
                          componentRestrictions: { country: "SG" },
                          fields: ["formatted_address", "geometry", "address_components"],
                        }}
                      > */}
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
                          <input onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                            type="text"
                            name={`locationDetail[${index}].location`}
                            placeholder="Enter Postal Code"
                            className="form-control"
                            value={
                              formik.values.locationDetail?.[index]?.location ||
                              ""
                            }
                            onChange={(e) => {
                              formik.handleChange(e);
                              if (e.target.value.length === 6) {
                                fetchCoordinates(e.target.value,location.type,index);
                              }
                            }}
                            onBlur={formik.handleBlur}
                            style={{
                              borderLeft: "none",
                              borderRadius: "0 10px 10px 0",
                            }}
                          />
                        </div>
                      {/* </Autocomplete> */}
                      {formik.touched.locationDetail?.[index]?.location &&
                        formik.errors.locationDetail?.[index]?.location ? (
                        <small className="text-danger">
                          {formik.errors.locationDetail[index].location}
                        </small>
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
                          type="text" readOnly
                          name={`locationDetail[${index}].address`}
                          value={
                            formik.values.locationDetail?.[index]?.address || ""
                          }
                         placeholder="Enter Address"
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
                        <small className="text-danger">
                          {formik.errors.locationDetail[index].address}
                        </small>
                      ) : null}
                    </div>

                    {/* Contact Name and Mobile */}
                    <div className="col-md-10 col-12 mt-3">
                      <div className="row">
                        <div className="col-md-6 col-12 p-2">
                          <div
                            className="input-group"
                            style={{
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
                              placeholder="Contact Name"
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
                            <small className="text-danger">
                              {formik.errors.locationDetail[index].contactName}
                            </small>
                          ) : null}
                        </div>

                        <div className="col-md-6 col-12 p-2">
                          <div
                            className="input-group"
                            style={{
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
                              placeholder="Contact Number"
                              className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.touched.locationDetail?.[index]?.mobile &&
                            formik.errors.locationDetail?.[index]?.mobile ? (
                            <small className="text-danger">
                              {formik.errors.locationDetail[index].mobile}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Property Selection */}
                    <div className="col-md-10 col-12">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="rounded-pill">
                            <span className="fw-medium">Type of property</span><span className="text-danger">*</span>
                          </div>
                          <div
                            className="input-group mt-1"
                            style={{ overflow: "hidden", height: "50px" }}
                          >
                            <select
                              name={`locationDetail[${index}].typeOfProperty`}
                              className="form-select"
                              value={
                                formik.values.locationDetail?.[index]
                                  ?.typeOfProperty || ""
                              }
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                formik.setValues({
                                  ...formik.values,
                                  locationDetail:
                                    formik.values.locationDetail.map(
                                      (item, i) =>
                                        i === index
                                          ? {
                                            ...item,
                                            typeOfProperty: selectedValue,
                                            sizeOfProperty: "",
                                            propertyFloor: "",
                                            isElevator: null,
                                            propertyDescription: "",
                                          }
                                          : item
                                    ),
                                });
                              }}
                              onBlur={formik.handleBlur}
                            >
                              <option value="" className="text-muted">
                                Select
                              </option>
                              {categorys &&
                                categorys.map((category) => (
                                  <option
                                    key={category.id}
                                    value={category.commercialCategoryName}
                                  >
                                    {(
                                      category.commercialCategoryName
                                        ?.charAt(0)
                                        .toUpperCase() +
                                      category.commercialCategoryName?.slice(1)
                                    ).replace("_", " ")}
                                  </option>
                                ))}
                              <option value="Others">Others</option>
                            </select>
                          </div>
                          {formik.touched.locationDetail?.[index]
                            ?.typeOfProperty &&
                            formik.errors.locationDetail?.[index]
                              ?.typeOfProperty ? (
                            <small className="text-danger">
                              {
                                formik.errors.locationDetail[index]
                                  .typeOfProperty
                              }
                            </small>
                          ) : null}
                        </div>
                        {formik.values.locationDetail?.[index]
                          ?.typeOfProperty &&
                          formik.values.locationDetail[index].typeOfProperty !==
                          "Others" && (
                            <div className="col-md-6 col-12">
                              <div className="rounded-pill">
                                <span className="fw-medium">
                                  Size of property
                                </span>
                              </div>
                              <div
                                className="input-group mt-1"
                                style={{ overflow: "hidden", height: "50px" }}
                              >
                                <select
                                  name={`locationDetail[${index}].sizeOfProperty`}
                                  className="form-select"
                                  value={
                                    formik.values.locationDetail?.[index]
                                      ?.sizeOfProperty || ""
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="">Select</option>
                                  <option value="500 - 700 sqft">
                                    500 - 700 sqft
                                  </option>
                                  <option value="700 - 800 sqft">
                                    700 - 800 sqft
                                  </option>
                                  <option value="800 - 1000 sqft">
                                    800 - 1000 sqft
                                  </option>
                                  <option value="1000 - 1200 sqft">
                                    1000 - 1200 sqft
                                  </option>
                                  <option value="1200 - 1400 sqft">
                                    1200 - 1400 sqft
                                  </option>
                                  <option value="1400 - 1600 sqft">
                                    1400 - 1600 sqft
                                  </option>
                                  <option value="1600 - 1800 sqft">
                                    1600 - 1800 sqft
                                  </option>
                                  <option value="1800 - 2000 sqft">
                                    1800 - 2000 sqft
                                  </option>
                                </select>
                              </div>
                              {formik.touched.locationDetail?.[index]
                                ?.sizeOfProperty &&
                                formik.errors.locationDetail?.[index]
                                  ?.sizeOfProperty ? (
                                <small className="text-danger">
                                  {
                                    formik.errors.locationDetail[index]
                                      .sizeOfProperty
                                  }
                                </small>
                              ) : null}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Show additional fields only if Type of Property is selected */}
                    {formik.values.locationDetail?.[index]?.typeOfProperty &&
                      formik.values.locationDetail[index].typeOfProperty !==
                      "Others" && (
                        <div className="col-md-10 col-12">
                          <div className="row">
                            {/* Property Floor */}
                            <div className="col-md-6 col-12">
                              <div className="rounded-pill pt-1">
                                <span className="fw-medium">
                                  Property floor
                                </span>
                              </div>
                              <div
                                className="input-group mt-1"
                                style={{ overflow: "hidden", height: "50px" }}
                              >
                                <select
                                  name={`locationDetail[${index}].propertyFloor`}
                                  className="form-select"
                                  value={
                                    formik.values.locationDetail?.[index]
                                      ?.propertyFloor || ""
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
                              {formik.touched.locationDetail?.[index]
                                ?.propertyFloor &&
                                formik.errors.locationDetail?.[index]
                                  ?.propertyFloor ? (
                                <small className="text-danger">
                                  {
                                    formik.errors.locationDetail[index]
                                      .propertyFloor
                                  }
                                </small>
                              ) : null}
                            </div>
                            {/* Is there an Elevator? */}
                            <div className="col-md-6 col-12">
                              <div className="rounded-pill pt-1">
                                <span className="fw-medium">
                                  Is there is an Elevator?
                                </span>
                              </div>
                              <div
                                className="mt-1 d-flex justify-content-between"
                                style={{ height: "50px" }}
                              >
                                <button
                                  type="button"
                                  className="btn"
                                  style={{
                                    backgroundColor:
                                      formik.values.locationDetail?.[index]
                                        ?.isElevator === true
                                        ? "#acff3b"
                                        : "transparent",
                                    border: "1px solid #acff3b",
                                    color: "#000",
                                    fontWeight: "bold",
                                    padding: "8px 20px",
                                    borderRadius: "5px",
                                    width: "95px",
                                  }}
                                  onClick={() =>
                                    formik.setFieldValue(
                                      `locationDetail[${index}].isElevator`,
                                      true
                                    )
                                  }
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  className="btn"
                                  style={{
                                    backgroundColor:
                                      formik.values.locationDetail?.[index]
                                        ?.isElevator === false
                                        ? "#acff3b"
                                        : "transparent",
                                    border: "1px solid #acff3b",
                                    color: "#000",
                                    fontWeight: "bold",
                                    padding: "8px 20px",
                                    borderRadius: "5px",
                                    width: "95px",
                                  }}
                                  onClick={() =>
                                    formik.setFieldValue(
                                      `locationDetail[${index}].isElevator`,
                                      false
                                    )
                                  }
                                >
                                  No
                                </button>
                              </div>
                              {formik.touched.locationDetail?.[index]
                                ?.isElevator &&
                                formik.errors.locationDetail?.[index]
                                  ?.isElevator && (
                                  <small className="text-danger">
                                    {
                                      formik.errors.locationDetail[index]
                                        .isElevator
                                    }
                                  </small>
                                )}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Others"*/}
                    {formik.values.locationDetail?.[index]?.typeOfProperty === "Others" && (
                      <div className="col-md-10 col-12">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <div className="rounded-pill pt-1">
                              <span className="fw-medium">Tell us your property details</span>
                            </div>
                            <textarea
                              type="text"
                              name={`locationDetail[${index}].propertyDescription`}
                              className="form-control mt-1"
                              value={formik.values.locationDetail?.[index]?.propertyDescription || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.locationDetail?.[index]?.propertyDescription &&
                              formik.errors.locationDetail?.[index]?.propertyDescription && (
                                <small className="text-danger">
                                  {formik.errors.locationDetail[index].propertyDescription}
                                </small>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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

export default OfficeMap;
