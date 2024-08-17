import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaLocationDot, FaRegAddressCard } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  location: Yup.string().required("*Location is required"),
  address: Yup.string().required("*Address is required"),
  contactName: Yup.string().required("*Contact Name is required"),
  countryCode: Yup.string().required("*Country Code is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .test("phone-length", function (value) {
      const { countryCode } = this.parent;
      if (countryCode === "65") {
        return value && value.length === 8
          ? true
          : this.createError({ message: "Phone number must be 8 digits only" });
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
});


function HouseShiftModel({
  show,
  onHide,
  title,
  pickupLocation,
  dropLocation,
  stops,
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
      let titles =
        title === "Pick Up Location"
          ? "pickUp"
          : title === "Drop Location"
          ? "drop"
          : `stop${title}`;
      values.state = titles;
      console.log("Location Details:", values);
      setLocationDetail((prevDetails) => {
        const locationDetail = prevDetails.filter(
          (item) => item.state !== titles
        );
        return [...locationDetail, values];
      });
      onHide();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (show && title) {
      formik.setFieldValue("countryCode", 65);
      if (title === "Pick Up Location") {
        formik.setFieldValue("location", pickupLocation);
      } else if (title === "Drop Location") {
        formik.setFieldValue("location", dropLocation);
      } else {
        const titleId = parseInt(title) - 1;
        formik.setFieldValue("location", stops[titleId]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, title]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title !== "Pick Up Location" && title !== "Drop Location"
            ? `Stop ${title}`
            : title}
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-12 col-12 mb-2">
                <label className="form-label">
                  Location<span className="text-danger">*</span>
                </label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
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
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
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
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
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
                  <div className="input-group-prepend" id="basic-addon1">
                    <select
                      name="countryCode"
                      className="form-control border-end-none bg-light"
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
