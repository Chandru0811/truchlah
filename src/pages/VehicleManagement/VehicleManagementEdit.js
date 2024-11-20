import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";
// import api from "../../config/URL";
// import toast from "react-hot-toast";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../common_pages/cropImageHelper";

function VehicleManagementEdit() {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const validationSchema = Yup.object({
    // vehicletypeId: Yup.number().required("*Vehicle type ID is required"),
    type: Yup.string()
      .matches(
        /^\S*$/,
        "*No spaces are allowed. You can use underscores instead."
      )
      .required("*Vehicle Type is required"),
    vehicleCapacity: Yup.string().required("*Capacity is required"),
    vehicleStatus: Yup.string().required("*Status is required"),
    description: Yup.string().required("*Description is required"),
    baseFare: Yup.number().required("*Base fare is required"),
    perKm: Yup.number().required("*Per KM charge is required"),
    helper: Yup.number().required("*Helper charge is required"),
    extraHelper: Yup.number().required("*Extra helper charge is required"),
    tailGateCharge: Yup.number().required("*Tail gate charge is required"),
    overtimeCharge: Yup.number().required("*Overtime charge is required"),
    nonLiftAccess: Yup.number().required("*Non-lift access charge is required"),
    erpCharge: Yup.number().required("*ERP charge is required"),
    cbdCharge: Yup.number().required("*CBD charge is required"),
    securedZoneCharge: Yup.number().required(
      "*Secured zone charge is required"
    ),
    gst: Yup.number().required("*GST is required"),
    roundTrip: Yup.number().required("*Round trip charge is required"),
    wrappingCharge: Yup.number().required("*Wrapping charge is required"),
    addStopCharge: Yup.number().required("*Add stop charge is required"),
    tenToTwelveCharge: Yup.number().required("*10 to 12 charge is required"),
    twelveToSevenCharge: Yup.number().required("*12 to 7 charge is required"),
    peakHourCharge: Yup.number().required("*Peak hour charge is required"),
  });

  const formik = useFormik({
    initialValues: {
      vehicletypeId: "",
      type: "",
      vehicleCapacity: "",
      vehicleStatus: "",
      baseFare: "",
      perKm: "",
      helper: "",
      extraHelper: "",
      tailGateCharge: "",
      overtimeCharge: "",
      nonLiftAccess: "",
      erpCharge: "",
      cbdCharge: "",
      securedZoneCharge: "",
      gst: "",
      roundTrip: "",
      boxesCharge: "",
      longPushCharge: "",
      assemblyDisassemblyCharge: "",
      wrappingCharge: "",
      addStopCharge: "",
      tenToTwelveCharge: "",
      twelveToSevenCharge: "",
      peakHourCharge: "",
      description: "",
      imageUrl: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      const formData = new FormData();
      const { vehicleImage, ...valuess } = values;
      Object.entries(valuess).forEach(([key, value]) => {
        if (key === "imageUrl" && value) {
          formData.append(key, value);
        } else if (key !== "imageUrl") {
          formData.append(key, value);
        }
      });
      try {
        const response = await driverApi.post(
          `/vehicle/updateVehicleType/${id}`,
          formData
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/vehiclemanagement");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data.detail);
        } else {
          toast.error(`${error?.response?.data?.message || error.message}`);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      try {
        const response = await driverApi.get(`/vehicle/vehicleTypeById/${id}`);
        formik.setValues((prevValues) => ({
          ...prevValues,
          ...response.data.responseBody,
        }));
        setData(response.data.responseBody);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    console.log("object", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });
  };

  const handleCrop = useCallback(async () => {
    try {
      const croppedImageData = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedImageFile = blobToFile(
        croppedImageData,
        `${formik.values.type}_IMAGE.${croppedImageData.type?.split("/")[1]}`
      );

      setCroppedImage(croppedImageFile);
      formik.setFieldValue("imageUrl", croppedImageFile);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc]);

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    formik.setFieldValue("imageUrl", "");
    document.querySelector("input[type='file']").value = "";
  };

  return (
    <div>
      {loader ? (
        <div className="darksoul-layout">
          <div className="darksoul-grid">
            <div className="item1"></div>
            <div className="item2"></div>
            <div className="item3"></div>
            <div className="item4"></div>
          </div>
          <h3 className="darksoul-loader-h">Trucklah</h3>
        </div>
      ) : (
        <div className="container-fluid px-2 pb-2 minHeight m-0">
          <form onSubmit={formik.handleSubmit}>
            <div className="card shadow border-0 mb-2 top-header">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor">Edit Vehicle</h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                      <Link to="/vehiclemanagement">
                        <button type="button" className="btn btn-sm btn-light">
                          <span>Back</span>
                        </button>
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-sm btn-button"
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span>Save</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow minHeight border-0 my-2">
              <div className="container mb-5">
                <div className="row py-4">
                  {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-0">
                  Vehicle Type ID <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="number"
                    name="vehicletypeId"
                    className={`form-control ${formik.touched.vehicletypeId &&
                      formik.errors.vehicletypeId
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("vehicletypeId")}
                  />
                  {formik.touched.vehicletypeId &&
                    formik.errors.vehicletypeId && (
                      <div className="invalid-feedback">
                        {formik.errors.vehicletypeId}
                      </div>
                    )}
                </div>
              </div> */}
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Vehicle Name <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="type"
                        className={`form-control ${
                          formik.touched.type && formik.errors.type
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("type")}
                      />
                      {formik.touched.type && formik.errors.type && (
                        <div className="invalid-feedback">
                          {formik.errors.type}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Vehicle Capacity<span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="vehicleCapacity"
                        className={`form-control ${
                          formik.touched.vehicleCapacity &&
                          formik.errors.vehicleCapacity
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("vehicleCapacity")}
                      />
                      {formik.touched.vehicleCapacity &&
                        formik.errors.vehicleCapacity && (
                          <div className="invalid-feedback">
                            {formik.errors.vehicleCapacity}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Vehicle Status<span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <select
                        type="text"
                        name="vehicleStatus"
                        className={`form-select ${
                          formik.touched.vehicleStatus &&
                          formik.errors.vehicleStatus
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("vehicleStatus")}
                      >
                        <option value={""}></option>
                        <option value={"ACTIVE"}>Active</option>
                        <option value={"INACTIVE"}>InActive</option>
                      </select>
                      {formik.touched.vehicleStatus &&
                        formik.errors.vehicleStatus && (
                          <div className="invalid-feedback">
                            {formik.errors.vehicleStatus}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Vehicle Image<span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="file"
                        name="imageUrl"
                        className={`form-control ${
                          formik.touched.imageUrl && formik.errors.imageUrl
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={handleFileChange}
                      />
                      {formik.touched.imageUrl && formik.errors.imageUrl && (
                        <div className="invalid-feedback">
                          {formik.errors.imageUrl}
                        </div>
                      )}
                    </div>
                    {(data.vehicleImage || formik.values.imageUrl) && (
                      <div>
                        <img
                          src={
                            formik.values.imageUrl
                              ? URL.createObjectURL(formik.values.imageUrl)
                              : data.vehicleImage
                          }
                          alt="Vehicle"
                          className="img-fluid"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    )}
                    {showCropper && (
                      <div
                        className="crop-container"
                        style={{
                          width: "300px",
                          height: "200px",
                          position: "relative",
                        }}
                      >
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={4 / 2} // Adjust the aspect ratio if needed
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={onCropComplete}
                          cropShape="box" // You can also use 'round' for circular cropping
                          showGrid={false}
                          style={{
                            containerStyle: { width: "100%", height: "100%" },
                          }} // Make it responsive within the container
                        />
                      </div>
                    )}

                    {showCropper && (
                      <div className="d-flex justify-content-start mt-3 gap-2 ">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mt-3"
                          onClick={handleCrop}
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-secondary mt-3"
                          onClick={handleCropCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Base Charge<span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="baseFare"
                        className={`form-control ${
                          formik.touched.baseFare && formik.errors.baseFare
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("baseFare")}
                      />
                      {formik.touched.baseFare && formik.errors.baseFare && (
                        <div className="invalid-feedback">
                          {formik.errors.baseFare}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Per KM Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="perKm"
                        className={`form-control ${
                          formik.touched.perKm && formik.errors.perKm
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("perKm")}
                      />
                      {formik.touched.perKm && formik.errors.perKm && (
                        <div className="invalid-feedback">
                          {formik.errors.perKm}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Helper Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="helper"
                        className={`form-control ${
                          formik.touched.helper && formik.errors.helper
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("helper")}
                      />
                      {formik.touched.helper && formik.errors.helper && (
                        <div className="invalid-feedback">
                          {formik.errors.helper}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Extra Helper Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="extraHelper"
                        className={`form-control ${
                          formik.touched.extraHelper &&
                          formik.errors.extraHelper
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("extraHelper")}
                      />
                      {formik.touched.extraHelper &&
                        formik.errors.extraHelper && (
                          <div className="invalid-feedback">
                            {formik.errors.extraHelper}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Tail Gate Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="tailGateCharge"
                        className={`form-control ${
                          formik.touched.tailGateCharge &&
                          formik.errors.tailGateCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("tailGateCharge")}
                      />
                      {formik.touched.tailGateCharge &&
                        formik.errors.tailGateCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.tailGateCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Overtime Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="overtimeCharge"
                        className={`form-control ${
                          formik.touched.overtimeCharge &&
                          formik.errors.overtimeCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("overtimeCharge")}
                      />
                      {formik.touched.overtimeCharge &&
                        formik.errors.overtimeCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.overtimeCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Non-lift Access Charge{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="nonLiftAccess"
                        className={`form-control ${
                          formik.touched.nonLiftAccess &&
                          formik.errors.nonLiftAccess
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("nonLiftAccess")}
                      />
                      {formik.touched.nonLiftAccess &&
                        formik.errors.nonLiftAccess && (
                          <div className="invalid-feedback">
                            {formik.errors.nonLiftAccess}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      ERP Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="erpCharge"
                        className={`form-control ${
                          formik.touched.erpCharge && formik.errors.erpCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("erpCharge")}
                      />
                      {formik.touched.erpCharge && formik.errors.erpCharge && (
                        <div className="invalid-feedback">
                          {formik.errors.erpCharge}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      CBD Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="cbdCharge"
                        className={`form-control ${
                          formik.touched.cbdCharge && formik.errors.cbdCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("cbdCharge")}
                      />
                      {formik.touched.cbdCharge && formik.errors.cbdCharge && (
                        <div className="invalid-feedback">
                          {formik.errors.cbdCharge}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Secured Zone Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="securedZoneCharge"
                        className={`form-control ${
                          formik.touched.securedZoneCharge &&
                          formik.errors.securedZoneCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("securedZoneCharge")}
                      />
                      {formik.touched.securedZoneCharge &&
                        formik.errors.securedZoneCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.securedZoneCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      GST <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="gst"
                        className={`form-control ${
                          formik.touched.gst && formik.errors.gst
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("gst")}
                      />
                      {formik.touched.gst && formik.errors.gst && (
                        <div className="invalid-feedback">
                          {formik.errors.gst}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Round Trip Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="roundTrip"
                        className={`form-control ${
                          formik.touched.roundTrip && formik.errors.roundTrip
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("roundTrip")}
                      />
                      {formik.touched.roundTrip && formik.errors.roundTrip && (
                        <div className="invalid-feedback">
                          {formik.errors.roundTrip}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Boxes <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="boxesCharge"
                        className={`form-control ${
                          formik.touched.boxesCharge &&
                          formik.errors.boxesCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("boxesCharge")}
                      />
                      {formik.touched.boxesCharge &&
                        formik.errors.boxesCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.boxesCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Long Push <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="longPushCharge"
                        className={`form-control ${
                          formik.touched.longPushCharge &&
                          formik.errors.longPushCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("longPushCharge")}
                      />
                      {formik.touched.longPushCharge &&
                        formik.errors.longPushCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.longPushCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Assembly/Disassembly{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="assemblyDisassemblyCharge"
                        className={`form-control ${
                          formik.touched.assemblyDisassemblyCharge &&
                          formik.errors.assemblyDisassemblyCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("assemblyDisassemblyCharge")}
                      />
                      {formik.touched.assemblyDisassemblyCharge &&
                        formik.errors.assemblyDisassemblyCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.assemblyDisassemblyCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Wrapping Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="wrappingCharge"
                        className={`form-control ${
                          formik.touched.wrappingCharge &&
                          formik.errors.wrappingCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("wrappingCharge")}
                      />
                      {formik.touched.wrappingCharge &&
                        formik.errors.wrappingCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.wrappingCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Add Stop Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="addStopCharge"
                        className={`form-control ${
                          formik.touched.addStopCharge &&
                          formik.errors.addStopCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("addStopCharge")}
                      />
                      {formik.touched.addStopCharge &&
                        formik.errors.addStopCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.addStopCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      10 to 12 Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="tenToTwelveCharge"
                        className={`form-control ${
                          formik.touched.tenToTwelveCharge &&
                          formik.errors.tenToTwelveCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("tenToTwelveCharge")}
                      />
                      {formik.touched.tenToTwelveCharge &&
                        formik.errors.tenToTwelveCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.tenToTwelveCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      12 to 7 Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="twelveToSevenCharge"
                        className={`form-control ${
                          formik.touched.twelveToSevenCharge &&
                          formik.errors.twelveToSevenCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("twelveToSevenCharge")}
                      />
                      {formik.touched.twelveToSevenCharge &&
                        formik.errors.twelveToSevenCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.twelveToSevenCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Peak Hour Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        type="text"
                        name="peakHourCharge"
                        className={`form-control ${
                          formik.touched.peakHourCharge &&
                          formik.errors.peakHourCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("peakHourCharge")}
                      />
                      {formik.touched.peakHourCharge &&
                        formik.errors.peakHourCharge && (
                          <div className="invalid-feedback">
                            {formik.errors.peakHourCharge}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <textarea
                        name="description"
                        className={`form-control ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("description")}
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default VehicleManagementEdit;
