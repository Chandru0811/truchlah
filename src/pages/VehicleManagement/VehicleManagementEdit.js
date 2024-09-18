import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { driverApi } from "../../config/URL";
import toast from "react-hot-toast";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function VehicleManagementEdit() {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    // vehicletypeId: Yup.number().required("*Vehicle type ID is required"),
    type: Yup.string().required("*Type is required"),
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
      description: "",
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
      wrappingCharge: "",
      addStopCharge: "",
      tenToTwelveCharge: "",
      twelveToSevenCharge: "",
      peakHourCharge: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      try {
        const response = await driverApi.put(
          `/vehicle/vehicleType/Update/${id}`,
          values
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/vehiclemanagement");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoader(true)
      try {
        const response = await driverApi.get(`/vehicle/vehicleTypeById/${id}`);
        formik.setValues(response.data.responseBody);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }finally{
        setLoader(false)
      }
    };
    getData();
  }, []);

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
                        className="btn btn-sm btn-button "
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
                    className={`form-control ${formik.touched.vehicletypeId && formik.errors.vehicletypeId
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("vehicletypeId")}
                  />
                  {formik.touched.vehicletypeId && formik.errors.vehicletypeId && (
                    <div className="invalid-feedback">
                      {formik.errors.vehicletypeId}
                    </div>
                  )}
                </div>
              </div> */}
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label mb-0">
                      Vehicle Name<span className="text-danger">*</span>
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
                      Base charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                      Wrapping Charge <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
