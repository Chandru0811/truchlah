import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaLocationDot, FaRegAddressCard } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  address: Yup.string().required("Address is required"),
  contactName: Yup.string().required("Contact Name is required"),
  mobile: Yup.string().required("Mobile is required"),
});

function HouseShiftModel({
  show,
  onHide,
  title,
  location,
  setLocationDetail,
}) {
  const formik = useFormik({
    initialValues: {
      location: "",
      address: "",
      countryCode: "",
      contactName: "",
      mobile: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLocationDetail((prevDetails) => [...prevDetails, { ...values }]);
      onHide();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (show && title) {
      formik.setFieldValue("countryCode", 65);
      formik.setFieldValue("location", location);
    }
  }, [show, title, location]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Location<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <FaLocationDot />
                  </span>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.location && formik.errors.location
                        ? "is-invalid"
                        : ""
                    }`}
                    name="location"
                    readOnly
                    {...formik.getFieldProps("location")}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="invalid-feedback">
                      {formik.errors.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <FaRegAddressCard />
                  </span>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : ""
                    }`}
                    name="address"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Contact Name<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <IoMdContact />
                  </span>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.contactName && formik.errors.contactName
                        ? "is-invalid"
                        : ""
                    }`}
                    name="contactName"
                    {...formik.getFieldProps("contactName")}
                  />
                  {formik.touched.contactName && formik.errors.contactName && (
                    <div className="invalid-feedback">
                      {formik.errors.contactName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Mobile<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <select
                      name="countryCode"
                      className="form-control border-end-none"
                      {...formik.getFieldProps("countryCode")}
                    >
                      <option value="65" selected>
                        +65
                      </option>
                      <option value="91">+91</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="mobile"
                    className={`form-control ${
                      formik.touched.mobile && formik.errors.mobile
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("mobile")}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="invalid-feedback">
                      {formik.errors.mobile}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Modal.Footer>
            <button id="NextMove" className="btn text-white" type="submit">
              Next
            </button>
          </Modal.Footer>
        </Modal.Body>
      </form>
    </Modal>
  );
}

export default HouseShiftModel;
