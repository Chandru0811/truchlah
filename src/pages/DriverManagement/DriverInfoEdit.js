import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { driverApi } from "../../config/URL";

const DriverInfoEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {

    const validationSchema = Yup.object({
      firstName: Yup.string().required("*First name is required"),
      lastName: Yup.string().required("*Last name is required"),
      countryCode: Yup.string().required("*Country code is required"),
      mobileNo: Yup.string()
        .required("Phone number is required")
        .test("mobileNo-length", function (value) {
          const { countryCode } = this.parent;
          if (value && /\s/.test(value)) {
            return this.createError({
              message: "Phone number should not contain spaces",
            });
          }
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
          return false;
        }),
      email: Yup.string()
        .email("*Invalid email format")
        .required("*Email is required"),
    });

    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        countryCode: "",
        mobileNo: "",
        email: "",
        password: "",
        driverId: "",
        driverPhoto: "",
        idFront: "",
        idBack: "",
        licenseFront: "",
        licenseBack: "",
        demeritPoint: "",
        // loginType: ""
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("drivermanagement:", values);

        const formDatas = new FormData();
        formDatas.append("demeritPoint", 0);
        formDatas.append("firstName", values.firstName);
        formDatas.append("lastName", values.lastName);
        formDatas.append("email", values.email);
        formDatas.append("mobileNo", values.mobileNo);
        formDatas.append("countryCode", values.countryCode);
        formDatas.append("password", values.password);
        if (values.driverPhoto)formDatas.append("driverPhoto", values.driverPhoto);
        if (values.idFront) formDatas.append("idFront", values.idFront);
        if (values.idBack) formDatas.append("idBack", values.idBack);
        if (values.licenseFront)formDatas.append("licenseFront", values.licenseFront);
        if (values.licenseBack)formDatas.append("licenseBack", values.licenseBack);

          setLoadIndicators(true);
          try {
            const response = await driverApi.put(
              `driver/updateDriver/${formData.driverId}`,
              formDatas
            );
            if (response.status === 200) {
              setFormData(response.data.responseBody)
              toast.success(response.data.message);
              handleNext();
              
            } else {
              toast.error(response?.data?.message);
            }
          } catch (error) {
            toast.error("Error fetching data: ", error?.response?.data?.message);
          } finally {
            setLoadIndicators(false);
          }
      },
    });

    useImperativeHandle(ref, () => ({
      driverPersonalEdit: formik.handleSubmit,
    }));

    useEffect(()=>{
      formik.setValues(formData)
    },[])

    return (
      <div className="container-fluid minHeight m-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="container ">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <div className="input-group">
                    <select
                      name="countryCode"
                      className={`form-select form-select-sm ${
                        formik.touched.countryCode && formik.errors.countryCode
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ maxWidth: "80px" }}
                      {...formik.getFieldProps("countryCode")}
                    >
                      {/* <option value=""></option> */}
                      <option value="91">+91</option>
                      <option value="65">+65</option>
                    </select>
                    <input
                      type="text"
                      name="mobileNo"
                      placeholder="Mobile Number"
                      className={`form-control ${
                        formik.touched.mobileNo && formik.errors.mobileNo
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("mobileNo")}
                    />
                    {formik.touched.mobileNo && formik.errors.mobileNo && (
                      <div className="invalid-feedback">
                        {formik.errors.mobileNo}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Driver Photo <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    name="driverPhoto"
                    className={`form-control ${
                      formik.touched.driverPhoto && formik.errors.driverPhoto
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("driverPhoto")}
                  />
                  {formik.touched.driverPhoto && formik.errors.driverPhoto && (
                    <div className="invalid-feedback">
                      {formik.errors.driverPhoto}
                    </div>
                  )}
                </div>
                {(formData?.driverPhotoUrl || formik.values.driverPhoto) && (
                  <div>
                    <img
                      src={
                        formik.values.imageUrl
                          ? URL.createObjectURL(formik.values.imageUrl)
                          : formData.driverPhotoUrl
                      }
                      alt="Vehicle"
                      className="img-fluid"
                      style={{ maxWidth: "20%" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2"></div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Id Front <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    name="idFront"
                    className={`form-control ${
                      formik.touched.idFront && formik.errors.idFront
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("idFront")}
                  />
                  {formik.touched.idFront && formik.errors.idFront && (
                    <div className="invalid-feedback">
                      {formik.errors.idFront}
                    </div>
                  )}
                </div>
                {(formData?.idFrontUrl || formik.values.idFront) && (
                  <div>
                    <img
                      src={
                        formik.values.idFront
                          ? URL.createObjectURL(formik.values.idFront)
                          : formData.idFrontUrl
                      }
                      alt="Vehicle"
                      className="img-fluid"
                      style={{ maxWidth: "20%" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Id Back <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    name="idBack"
                    className={`form-control ${
                      formik.touched.idBack && formik.errors.idBack
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("idBack")}
                  />
                  {formik.touched.idBack && formik.errors.idBack && (
                    <div className="invalid-feedback">
                      {formik.errors.idBack}
                    </div>
                  )}
                </div>
                {(formData?.idBackUrl || formik.values.idBack) && (
                  <div>
                    <img
                      src={
                        formik.values.idBack
                          ? URL.createObjectURL(formik.values.idBack)
                          : formData.idBackUrl
                      }
                      alt="Vehicle"
                      className="img-fluid"
                      style={{ maxWidth: "20%" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  License Front <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    name="licenseFront"
                    className={`form-control ${
                      formik.touched.licenseFront && formik.errors.licenseFront
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("licenseFront")}
                  />
                  {formik.touched.licenseFront &&
                    formik.errors.licenseFront && (
                      <div className="invalid-feedback">
                        {formik.errors.licenseFront}
                      </div>
                    )}
                </div>
                {(formData?.licenseFrontUrl || formik.values.licenseFront) && (
                  <div>
                    <img
                      src={
                        formik.values.licenseFront
                          ? URL.createObjectURL(formik.values.licenseFront)
                          : formData.licenseFrontUrl
                      }
                      alt="Vehicle"
                      className="img-fluid"
                      style={{ maxWidth: "20%" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  License Back <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    name="licenseBack"
                    className={`form-control ${
                      formik.touched.licenseBack && formik.errors.licenseBack
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("licenseBack")}
                  />
                  {formik.touched.licenseBack && formik.errors.licenseBack && (
                    <div className="invalid-feedback">
                      {formik.errors.licenseBack}
                    </div>
                  )}
                </div>
                {(formData?.licenseBackUrl || formik.values.licenseBack) && (
                  <div>
                    <img
                      src={
                        formik.values.licenseBack
                          ? URL.createObjectURL(formik.values.licenseBack)
                          : formData.licenseBackUrl
                      }
                      alt="Vehicle"
                      className="img-fluid"
                      style={{ maxWidth: "20%" }}
                    />
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

export default DriverInfoEdit;
