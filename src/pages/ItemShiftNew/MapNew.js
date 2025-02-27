import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Green from "../../asset/Ellipse 2.png";
import red from "../../asset/Ellipse 3.png";
import yellow from "../../asset/Ellipse 1.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaAddressCard, FaPlusCircle } from "react-icons/fa";
import { IoMdContact, IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";
import Trucklah_moving from "../../asset/Trucklah_Moving.webp";

const libraries = ["places"];

const MapNew = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
    // const toastShownRef = useRef(false);
    const [codeErrors, setCodeErrors] = useState([]);
    const [autocompleteDropoff, setAutocompleteDropoff] = useState(null);
    const [autocompleteStop, setAutocompleteStop] = useState(null);
    const validationSchema = Yup.object().shape({
      type: Yup.string().required("Type is required"),
      locationDetail: Yup.array().of(
        Yup.object().shape({
          location: Yup.string()
            .required("*Postal Code is required")
            .length(6, "*Postal Code must be exactly 6 digits")
            .matches(/^\d+$/, "*Postal Code must be exactly 6 digits"),
          // .test(
          //   "unique-location",
          //   "*Postal Code could not be the same",
          //   function (value) {
          //     const { locationDetail } = this.options.context;
          //     if (!value) return true;

          //     if (!locationDetail || locationDetail.length === 0) {
          //       return true; // No locations to validate
          //     }

          //     // Extract locations
          //     const pickup = locationDetail.find((item) => item.type === "pickup");
          //     const dropoff = locationDetail.find((item) => item.type === "dropoff");
          //     const stops = locationDetail.filter((item) => item.type === "stop");

          //     const pickupLocation = pickup?.location;
          //     const dropoffLocation = dropoff?.location;
          //     const stopLocations = stops.map((stop) => stop.location).filter(Boolean); // Remove any undefined
          //     // console.log("codeErrors", formik.errors);
          //     // Ensure pickup and dropoff exist
          //     if (!pickupLocation || !dropoffLocation) {
          //       return true;
          //     }

          //     // Case 1: Pickup and Dropoff must be different
          //     if (stops.length === 0 && pickupLocation === dropoffLocation) {
          //       return this.createError({ message: "*Pickup and Dropoff must be different" });
          //     }

          //     // Case 2: Stops must be unique
          //     const uniqueStops = new Set(stopLocations);
          //     if (uniqueStops.size !== stopLocations.length) {
          //       return this.createError({ message: "*Each Stop must be unique" });

          //     }
          //     //  console.log("object",uniqueStops)
          //     // Case 3: Stops should not match pickup or dropoff
          //     if (stopLocations.includes(pickupLocation) || stopLocations.includes(dropoffLocation)) {
          //       return this.createError({ message: "*Stops cannot match Pickup or Dropoff locations" });
          //     }

          //     return true; // Validation passed
          //   }
          // ),
          // .test(
          //   "valid-location",
          //   "postal code is invalid",
          //   function (value) {
          //     const { locationDetail } = this.options.context;
          //     if (!value) return true;
          //     console.log("locationDetail",locationDetail)
          //     const isValid = isValidLocation(this.options.index, locationDetail);
          //     console.log("isValid",isValid)
          //     return isValid;
          //   }
          // ),
          address: Yup.string().required(""),
          contactName: Yup.string().notRequired().max(30, "*Contact Name cannot exceed 30 characters"),
          countryCode: Yup.string().notRequired(),
          mobile: Yup.string()
            .notRequired()
            .matches(/^\d+$/, "*Mobile number must contain only digits")
            .test("phone-length", function (value) {
              const { countryCode } = this.parent;
              if (countryCode === "65") {
                return value && value.length === 8
                  ? true
                  : this.createError({
                      message: "*Phone number must be 8 digits only",
                    });
              }
              if (countryCode === "91") {
                return value && value.length === 10
                  ? true
                  : this.createError({
                      message: "*Phone number must be 10 digits only",
                    });
              }
              return true;
            }),
        })
      ),
      // .min(2, "*At least two locations are required"),
    });
    const userId = localStorage.getItem("userId");
    const shiftingType = localStorage.getItem("shiftType");
    const formik = useFormik({
      initialValues: {
        userId: userId,
        type: "ITEM",
        estKm: "",
        locationDetail: [
          {
            type: "pickup",
            location: "",
            address: "",
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
        const { locationDetail } = values;
        const pickup = locationDetail.find((item) => item.type === "pickup");
        const dropoff = locationDetail.find((item) => item.type === "dropoff");
        const stops = locationDetail.filter((item) => item.type === "stop");

        const pickupLocation = pickup?.location;
        const dropoffLocation = dropoff?.location;
        const stopLocations = stops
          .map((stop) => stop.location)
          .filter(Boolean);

        if (!pickupLocation || !dropoffLocation) {
          toast.error("Pickup and Dropoff locations are required!", {
            icon: "⚠️",
          });
          return;
        }

        if (stops.length === 0 && pickupLocation === dropoffLocation) {
          toast.error("Pickup and Dropoff must be different", { icon: "⚠️" });
          return;
        }

        const uniqueStops = new Set(stopLocations);
        if (uniqueStops.size !== stopLocations.length) {
          toast.error("Stop postal code could not be the same", {
            icon: "⚠️",
          });
          return;
        }

        if (
          stopLocations.includes(pickupLocation) ||
          stopLocations.includes(dropoffLocation)
        ) {
          toast.error("Stops cannot match Pickup or Dropoff locations", {
            icon: "⚠️",
          });
          return;
        }
        setLoadIndicators(true);
        console.log("Formik values is ", values);
        try {
          const reformattedLocationDetail = [
            values.locationDetail[0],
            ...values.locationDetail.slice(2).map((item) => ({
              ...item,
            })),
            values.locationDetail[1],
          ];
          const payload = {
            ...values,
            estKm: 0,
            locationDetail: reformattedLocationDetail,
          };
          let response;
          if (formData.bookingId) {
            payload.bookingId = formData.bookingId;
            response = await bookingApi.post(`/booking/resume`, payload);
          } else {
            response = await bookingApi.post(`booking/create`, payload);
          }
          if (response.status === 200) {
            toast.success("Location has been successfully added!");
            const bookingId = response.data.responseBody.booking.bookingId;
            setFormData((prv) => ({
              ...prv,
              form1: { ...values, estKm: 0 },
              bookingId: bookingId,
            }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Please Enter the Locations");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    // const onPlaceChanged = (type, index) => {
    //   if (type === "pickup" && autocompletePickup) {
    //     const place = autocompletePickup.getPlace();
    //     if (place.geometry && place.formatted_address) {
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
    //       formik.setFieldValue(
    //         "locationDetail[0].latitude",
    //         place.geometry.location.lat()
    //       );
    //       formik.setFieldValue(
    //         "locationDetail[0].longitude",
    //         place.geometry.location.lng()
    //       );
    //       formik.setFieldValue("locationDetail[0].pincode", pincode);
    //     } else {
    //       console.error("No sufficient details available for input:", place);
    //     }
    //   } else if (type === "dropoff" && autocompleteDropoff) {
    //     const place = autocompleteDropoff.getPlace();
    //     if (place.geometry && place.formatted_address) {
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
    //       formik.setFieldValue(
    //         "locationDetail[1].latitude",
    //         place.geometry.location.lat()
    //       );
    //       formik.setFieldValue(
    //         "locationDetail[1].longitude",
    //         place.geometry.location.lng()
    //       );
    //       formik.setFieldValue("locationDetail[1].pincode", pincode);
    //     } else {
    //       console.error("No sufficient details available for input:", place);
    //     }
    //   } else if (type === "stop" && autocompleteStop) {
    //     const place = autocompleteStop.getPlace();
    //     if (place.geometry && place.formatted_address) {
    //       let pincode = "";
    //       place.address_components.forEach((component) => {
    //         if (component.types.includes("postal_code")) {
    //           pincode = component.long_name;
    //         }
    //       });
    //       formik.setFieldValue(
    //         `locationDetail[${index}].location`,
    //         place.formatted_address
    //       );
    //       formik.setFieldValue(
    //         `locationDetail[${index}].latitude`,
    //         place.geometry.location.lat()
    //       );
    //       formik.setFieldValue(
    //         `locationDetail[${index}].longitude`,
    //         place.geometry.location.lng()
    //       );
    //       formik.setFieldValue(`locationDetail[${index}].pincode`, pincode);
    //     } else {
    //       console.error("No sufficient details available for input:", place);
    //     }
    //   }
    // };

    // const calculateDistance = () => {
    //   return new Promise((resolve, reject) => {
    //     const pickup = formik.values.locationDetail[0];
    //     const dropoff = formik.values.locationDetail[1];

    //     if (
    //       pickup.latitude &&
    //       pickup.longitude &&
    //       dropoff.latitude &&
    //       dropoff.longitude
    //     ) {
    //       const service = new window.google.maps.DistanceMatrixService();

    //       const stopLocations = formik.values.locationDetail
    //         .slice(2)
    //         .filter((stop) => stop.latitude && stop.longitude)
    //         .map(
    //           (stop) =>
    //             new window.google.maps.LatLng(stop.latitude, stop.longitude)
    //         );

    //       const locations = [
    //         new window.google.maps.LatLng(pickup.latitude, pickup.longitude),
    //         ...stopLocations,
    //         new window.google.maps.LatLng(dropoff.latitude, dropoff.longitude),
    //       ];

    //       const totalDistance = { value: 0, text: "" };

    //       const promises = locations.slice(0, -1).map((origin, index) => {
    //         const destination = locations[index + 1];
    //         return new Promise((resolveSegment, rejectSegment) => {
    //           service.getDistanceMatrix(
    //             {
    //               origins: [origin],
    //               destinations: [destination],
    //               travelMode: window.google.maps.TravelMode.DRIVING,
    //             },
    //             (response, status) => {
    //               if (status === "OK") {
    //                 const distanceResult = response.rows[0].elements[0];
    //                 if (distanceResult.status === "OK") {
    //                   totalDistance.value += distanceResult.distance.value;
    //                   resolveSegment();
    //                 } else {
    //                   rejectSegment(
    //                     `Error fetching distance for segment: ${distanceResult.status}`
    //                   );
    //                 }
    //               } else {
    //                 rejectSegment(`Distance Matrix request failed: ${status}`);
    //               }
    //             }
    //           );
    //         });
    //       });

    //       // Resolve all distance calculations
    //       Promise.all(promises)
    //         .then(() => {
    //           totalDistance.text = `${(totalDistance.value / 1000).toFixed(
    //             2
    //           )} km`;
    //           const totalNumericKm = (totalDistance.value / 1000).toFixed(1);

    //           // Update state and formik
    //           setDistance(totalNumericKm);
    //           formik.setFieldValue("estKm", totalNumericKm);

    //           console.log("Total Estimated Distance (km):", totalNumericKm);
    //           resolve(totalNumericKm);
    //         })
    //         .catch((error) => {
    //           console.error("Error calculating distance:", error);
    //           reject(error);
    //         });
    //     } else {
    //       reject("Pickup or dropoff place latitude/longitude is missing.");
    //     }
    //   });
    // };

    // useEffect(() => {
    //   console.log("autocompletePickup",autocompletePickup)
    //   if (pickupPlace && dropoffPlace) {
    //     calculateDistance();
    //   }
    // }, [pickupPlace, dropoffPlace, formik.values.locationDetail]);

    useEffect(() => {
      setTimeout(() => {
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
            type: shiftingType,
            locationDetail: [
              {
                type: "pickup",
                location: "",
                address: "",
                contactName: "",
                countryCode: "",
                mobile: "",
              },
              {
                type: "dropoff",
                location: "",
                address: "",
                contactName: "",
                countryCode: "",
                mobile: "",
              },
            ],
          });
        }
        console.log("FormData", formData);
      }, 0); // Ensures `formik` is ready before setting values
    }, [formData]); 
    
    useEffect(() => {
      const updatedLocationDetail = formik.values.locationDetail.map((loc) => {
        if (loc.mobile.length > 0 && !loc.countryCode) {
          return { ...loc, countryCode: "65" };
        } else if (loc.mobile.length === 0 && loc.countryCode !== "") {
          return { ...loc, countryCode: "" };
        }
        return loc;
      });
    
      formik.setFieldValue("locationDetail", updatedLocationDetail);
    },[formik.values.locationDetail.map((loc) => loc.mobile).join("")]
  );

    const handleAddDropoff = () => {
      formik.setFieldValue("locationDetail", [
        ...formik.values.locationDetail,
        {
          type: "stop",
          location: "",
          address: "",
          contactName: "",
          countryCode: "",
          mobile: "",
        },
      ]);
    };

    const handleDeleteDropoff = (index) => {
      const newDropoffSections = [...formik.values.locationDetail];
      newDropoffSections.splice(index, 1);
      formik.setFieldValue("locationDetail", newDropoffSections);
    };
    const isValidLocation = (index, locationDetail) => {
      const currentDetail = locationDetail[index];
      // console.log("currentDetail", currentDetail);
      return (
        currentDetail?.address !== undefined || currentDetail?.address !== ""
      );
    };
    const fetchCoordinates = async (postalCode, type, index) => {
      if (!postalCode) return;

      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${API_KEY}`;

      try {
        const response = await fetch(geoCodeURL);
        const data = await response.json();
        const addressComponents = data?.results[0]?.address_components;
        const country = addressComponents?.find((comp) =>
          comp.types.includes("country")
        )?.short_name;
        if (country && ["SG", "IN"].includes(country)) {
          if (data.status !== "OK") {
            console.log("Invalid postal code or no results found.");
            return;
          }
          const { lat, lng } = data.results[0].geometry.location;
          if (!lat || !lng) return;
          // console.log("object", { lat, lng });
          const reverseGeoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

          const reverseResponse = await fetch(reverseGeoCodeURL);
          const reverseData = await reverseResponse.json();

          if (reverseData.status !== "OK") {
            console.log("No address found.");
            return;
          }
          // const formattedAddress = reverseData.results[0].formatted_address?.split(" ").slice(0, -1).join(" ");
          let formattedAddress = reverseData.results[0].formatted_address;
          formattedAddress = [...new Set(formattedAddress.split(", "))]
            .join(", ")
            ?.split(" ")
            .slice(0, -1)
            .join(" ");
          const locationDetailIndex =
            type === "pickup" ? 0 : type === "dropoff" ? 1 : index;
          formik.setFieldValue(
            `locationDetail[${locationDetailIndex}].address`,
            formattedAddress
          );
          formik.setFieldValue(
            `locationDetail[${locationDetailIndex}].location`,
            postalCode
          );
          formik.setFieldValue(
            `locationDetail[${locationDetailIndex}].latitude`,
            lat
          );
          formik.setFieldValue(
            `locationDetail[${locationDetailIndex}].longitude`,
            lng
          );
        } else {
          const locationDetailIndex =
            type === "pickup" ? 0 : type === "dropoff" ? 1 : index;
          formik.setFieldValue(
            `locationDetail[${locationDetailIndex}].address`,
            ""
          );
          const locationDetail = formik.values.locationDetail;
          const isValid = isValidLocation(index, locationDetail);
          setCodeErrors((prv) => {
            const newErrors = [...prv];
            const existingIndex = newErrors.findIndex(
              (item) => item.i === index
            );
            if (existingIndex !== -1) {
              newErrors[existingIndex] = { i: index, valid: isValid };
            } else {
              newErrors.push({ i: index, valid: isValid });
            }
            return newErrors;
          });
          // toast("Enter the valid postal code", { icon: "⚠️" });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      map: formik.handleSubmit,
    }));

    if (!isLoaded) {
      return (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      );
    }
    // console.log("codeErrors", codeErrors);
    return (
      <div className="container ">
        <form onSubmit={formik.handleSubmit}>
          <div className="row mt-3">
            <div className=" col-md-6 col-12">
              <div className="row">
                {/* Loop through pickup and dropoff locations */}
                {formik?.values?.locationDetail?.map((location, index) => (
                  <div key={index}>
                    <div className="col-md-10 d-flex justify-content-between">
                      <div className="rounded-pill py-3">
                        <img
                          src={
                            location.type === "pickup"
                              ? red
                              : location.type === "dropoff"
                              ? Green
                              : yellow
                          }
                          style={{ width: "20px" }}
                          alt="house"
                          className="icon-img me-4"
                        />
                        <span className="fw-bold">
                          {location.type === "pickup"
                            ? "Pick Up Location"
                            : location.type === "dropoff"
                            ? "Dropoff Location"
                            : `Intermediate Location ${index - 1}`}
                        </span>
                        <span className="text-danger">*</span>
                      </div>
                      {location.type !== "pickup" &&
                        location.type !== "dropoff" && (
                          <button
                            type="button"
                            className="btn btn-danger shadow-none"
                            style={{
                              backgroundColor: "transparent",
                              color: "red",
                              border: "none",
                              fontSize: "1.3rem",
                            }}
                            onClick={() => handleDeleteDropoff(index)}
                          >
                            <IoMdCloseCircle />
                          </button>
                        )}
                    </div>
                    {/* Location Input */}
                    <div className="col-md-10 col-12 mb-3">
                      {/* <Autocomplete
                        onLoad={(autoC) => {
                          location.type === "pickup"
                            ? setAutocompletePickup(autoC)
                            : location.type === "dropoff"
                              ? setAutocompleteDropoff(autoC)
                              : setAutocompleteStop(autoC);
                        }}
                        onPlaceChanged={() =>
                          onPlaceChanged(
                            location.type === "pickup"
                              ? "pickup"
                              : location.type === "dropoff"
                                ? "dropoff"
                                : `stop`,
                            index
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
                        <input
                          // onInput={(e) =>
                          //   (e.target.value = e.target.value.replace(/\D/g, ""))
                          // }
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
                            setCodeErrors((prv) => {
                              const newErrors = [...prv];
                              const existingIndex = newErrors.findIndex(
                                (item) => item.i === index
                              );
                              if (existingIndex !== -1) {
                                newErrors[existingIndex] = {
                                  i: index,
                                  valid: false,
                                };
                              } else {
                                newErrors.push({ i: index, valid: false });
                              }
                              return newErrors;
                            });
                            if (
                              e.target.value.length === 6 &&
                              !isNaN(e.target.value) &&
                              !e.target.value.includes(" ")
                            ) {
                              fetchCoordinates(
                                e.target.value,
                                location.type,
                                index
                              );
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
                      ) : codeErrors.find((error) => error.i === index)?.valid ? (
                        <small className="text-danger">*Enter the valid postal code</small>
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
                          readOnly
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
                      {/* {formik.touched.locationDetail?.[index]?.address &&
                      formik.errors.locationDetail?.[index]?.address ? (
                        <small className="text-danger">
                          {formik.errors.locationDetail[index].address}
                        </small>
                      ) : null} */}
                    </div>

                    {/* Contact Name and Mobile */}
                    <div className="col-md-10 col-12 mt-3">
                      <div className="row">
                        <div className="col-md-6 col-12 p-2 mb-4">
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

                        <div className="col-md-6 col-12 p-2 mb-4">
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
                              onInput={(e) =>
                                (e.target.value = e.target.value.replace(
                                  /\D/g,
                                  ""
                                ))
                              }
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
                  </div>
                ))}
                <div className="rounded-pill py-3 d-flex align-items-center">
                  {/* Add Intermediate Stop Button */}
                  <button
                    type="button"
                    className="btn btn-primary shadow-none d-flex align-items-center"
                    style={{
                      backgroundColor: "transparent",
                      color: "red",
                      border: "none",
                    }}
                    onClick={handleAddDropoff}
                  >
                    <FaPlusCircle />
                    <span className="fw-bold text-black mx-2">
                      Add an Intermediate Stop
                    </span>
                  </button>
                </div>
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

export default MapNew;
