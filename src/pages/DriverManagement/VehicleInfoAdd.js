import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { driverApi, userApi } from "../../config/URL";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  vehicleType: Yup.string().required("Vehicle type is required"),
  vehicleBrand: Yup.string().required("Vehicle brand is required"),
  registrationNo: Yup.string().required("Registration number is required"),
  // .matches(/^[A-Z0-9-]+$/, "Registration number must be valid"),
  registrationYear: Yup.number()
    .required("Registration year is required")
    .min(1900, "Enter a valid year")
    .max(new Date().getFullYear(), "Enter a valid year"),
  vehicleModel: Yup.string().required("Vehicle model is required"),
  vehicleName: Yup.string().required("Vehicle name is required"),
  //   description: Yup.string().required("Description is required"),
  vehicleSize: Yup.string().required("Vehicle size is required"),
  vehicleWeight: Yup.number()
    .required("Vehicle weight is required")
    .min(1, "Weight must be greater than zero"),
  ownedBy: Yup.string().required("Owner is required"),
  vehicleBackImg: Yup.mixed().required("ID Back is required"),
  vehicleFrontImg: Yup.mixed().required("License Front is required"),
});
const VehicleInfoAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const[vehicle,setVehicle]=useState()
    const formik = useFormik({
      initialValues: {
        vehicleType: "",
        vehicleBrand: "",
        registrationNo: "",
        registrationYear: "",
        vehicleModel: "",
        vehicleName: "",
        description: "",
        vehicleSize: "",
        vehicleWeight: "",
        ownedBy: "",
        vehicleBackImg: "",
        vehicleFrontImg: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("drivermanagement:", values);

        const formDatas = new FormData();
        // formData.append(
        //   "vehicleRequest",
        //   JSON.stringify({
        //     driverId: formData.driverId,
        //     vehicleType: values.vehicleType,
        //     vehicleBrand: values.vehicleBrand,
        //     registrationNo: values.registrationNo,
        //     registrationYear: values.registrationYear,
        //     vehicleModel: values.vehicleModel,
        //     vehicleName: values.vehicleName,
        //     description: values.description,
        //     vehicleSize: values.vehicleSize,
        //     vehicleWeight: values.vehicleWeight,
        //     ownedBy: values.ownedBy,
        //   })
        // );
        formDatas.append("driverId", formData.driverId);
        formDatas.append("vehicleType", values.vehicleType);
        formDatas.append("vehicleBrand", values.vehicleBrand);
        formDatas.append("registrationNo", values.registrationNo);
        formDatas.append("registrationYear", values.registrationYear);
        formDatas.append("vehicleModel", values.vehicleModel);
        formDatas.append("vehicleName", values.vehicleName);
        formDatas.append("description", values.description);
        formDatas.append("vehicleSize", values.vehicleSize);
        formDatas.append("vehicleWeight", values.vehicleWeight);
        formDatas.append("ownedBy", values.ownedBy);
        if (values.vehicleBackImg) {
          formDatas.append("vehicleBackImg", values.vehicleBackImg);
        }
        if (values.vehicleFrontImg) {
          formDatas.append("vehicleFrontImg", values.vehicleFrontImg);
        }

        setLoadIndicators(true);
        try {
          const response = await driverApi.post(
            `vehicle/createVehicleDetailsByAdmin`,
            formDatas
          );
          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message);
            handleNext();
            navigate("/drivermanagement");
          }
        } catch (error) {
          console.log(error?.response?.data?.serviceErrorList[0]?.errorMessage);
          toast.error("Driver Created Successfully!");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      driverVehicleAdd: formik.handleSubmit,
    }));

    useEffect(() => {
      const getVechicle = async () => {
        try {
          const response = await userApi.get("vehicle/vehicleType");
          setVehicle(response.data.responseBody);
        } catch (e) {
          toast.error("Error Fetching Data : ", e);
        }
      };
      getVechicle();
    }, []);
    return (
      <div className="container-fluid px-2 pb-2  m-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="container mb-2">
            <div className="row py-4">
              {/* Vehicle Type */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Type</label>
                <span className="text-danger">*</span>
                <select
                  type="text"
                  name="vehicleType"
                  className={`form-select ${
                    formik.touched.vehicleType && formik.errors.vehicleType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vehicleType")}
                >
                  <option value={""}>Select the vechicle</option>
                  {vehicle&&
                  vehicle.map((data,i)=>(
                    <option value={data.type}>{data.type}</option>
                  ))}
                </select>
                {formik.touched.vehicleType && formik.errors.vehicleType && (
                  <div className="invalid-feedback">
                    {formik.errors.vehicleType}
                  </div>
                )}
              </div>

              {/* Vehicle Brand */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Brand</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="vehicleBrand"
                  className={`form-control ${
                    formik.touched.vehicleBrand && formik.errors.vehicleBrand
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vehicleBrand")}
                />
                {formik.touched.vehicleBrand && formik.errors.vehicleBrand && (
                  <div className="invalid-feedback">
                    {formik.errors.vehicleBrand}
                  </div>
                )}
              </div>

              {/* Registration Number */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Registration Number</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="registrationNo"
                  className={`form-control ${
                    formik.touched.registrationNo &&
                    formik.errors.registrationNo
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("registrationNo")}
                />
                {formik.touched.registrationNo &&
                  formik.errors.registrationNo && (
                    <div className="invalid-feedback">
                      {formik.errors.registrationNo}
                    </div>
                  )}
              </div>

              {/* Registration Year */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Registration Year</label>
                <span className="text-danger">*</span>
                <input
                  type="text" onInput={(event)=>{ event.target.value = event.target.value.replace(/[^0-9]/g, '');}}
                  name="registrationYear"
                  className={`form-control ${
                    formik.touched.registrationYear &&
                    formik.errors.registrationYear
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("registrationYear")}
                />
                {formik.touched.registrationYear &&
                  formik.errors.registrationYear && (
                    <div className="invalid-feedback">
                      {formik.errors.registrationYear}
                    </div>
                  )}
              </div>

              {/* Vehicle Model */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Model</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="vehicleModel"
                  className={`form-control ${
                    formik.touched.vehicleModel && formik.errors.vehicleModel
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vehicleModel")}
                />
                {formik.touched.vehicleModel && formik.errors.vehicleModel && (
                  <div className="invalid-feedback">
                    {formik.errors.vehicleModel}
                  </div>
                )}
              </div>

              {/* Vehicle Name */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Name</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="vehicleName"
                  className={`form-control ${
                    formik.touched.vehicleName && formik.errors.vehicleName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vehicleName")}
                />
                {formik.touched.vehicleName && formik.errors.vehicleName && (
                  <div className="invalid-feedback">
                    {formik.errors.vehicleName}
                  </div>
                )}
              </div>

              {/* Vehicle Size */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Size</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="vehicleSize"
                  className={`form-control ${
                    formik.touched.vehicleSize && formik.errors.vehicleSize
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vehicleSize")}
                />
                {formik.touched.vehicleSize && formik.errors.vehicleSize && (
                  <div className="invalid-feedback">
                    {formik.errors.vehicleSize}
                  </div>
                )}
              </div>

              {/* Vehicle Weight */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Weight</label>
                <span className="text-danger">*</span>
                <input
                  type="number"
                  name="vehicleWeight"
                  className={`form-control ${
                    formik.touched.vehicleWeight && formik.errors.vehicleWeight
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vehicleWeight")}
                />
                {formik.touched.vehicleWeight &&
                  formik.errors.vehicleWeight && (
                    <div className="invalid-feedback">
                      {formik.errors.vehicleWeight}
                    </div>
                  )}
              </div>

              {/* Owned By */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Owned By</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="ownedBy"
                  className={`form-control ${
                    formik.touched.ownedBy && formik.errors.ownedBy
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("ownedBy")}
                />
                {formik.touched.ownedBy && formik.errors.ownedBy && (
                  <div className="invalid-feedback">
                    {formik.errors.ownedBy}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2"></div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Front Img</label>
                <span className="text-danger">*</span>
                <input
                  type="file" accept="image/jpeg, image/png"
                  name="vehicleFrontImg"
                  className={`form-control ${
                    formik.touched.vehicleFrontImg &&
                    formik.errors.vehicleFrontImg
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    formik.setFieldValue("vehicleFrontImg", e.target.files[0])
                  }
                />
                {formik.touched.vehicleFrontImg &&
                  formik.errors.vehicleFrontImg && (
                    <div className="invalid-feedback">
                      {formik.errors.vehicleFrontImg}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Vehicle Back Img</label>
                <span className="text-danger">*</span>
                <input
                  type="file" accept="image/jpeg, image/png"
                  name="vehicleBackImg"
                  className={`form-control ${
                    formik.touched.vehicleBackImg &&
                    formik.errors.vehicleBackImg
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    formik.setFieldValue("vehicleBackImg", e.target.files[0])
                  }
                />
                {formik.touched.vehicleBackImg &&
                  formik.errors.vehicleBackImg && (
                    <div className="invalid-feedback">
                      {formik.errors.vehicleBackImg}
                    </div>
                  )}
              </div>

              {/* Description */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label mb-1">Description</label>
                <textarea
                  name="description"
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default VehicleInfoAdd;
