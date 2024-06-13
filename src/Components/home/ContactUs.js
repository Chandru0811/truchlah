import React from "react";
import ContactImg from "../../asset/contact image.png";
import "../../styles/custom.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
  mobile: Yup.string()
    .matches(
      /^[0-9]{8,10}$/,
      "*Phone number must be 8 to 10 digits and numeric"
    )
    .required("*Phone number is required"),
  enquiry: Yup.string().optional(),
});

function Section3() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      enquiry: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("Form submission data:", data);

      try {
        const response = await userApi.post(`createContactPageDetails`, data);
        console.log(response.data);
        if (response.status === 201) {
          toast.success(
            "Thank you for contacting us, we will connect with you shortly!"
          );
          formik.resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error submitting data", error);
      }
    },
  });

  return (
    <section className="Contact py-4" id="Contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center justify-content-center">
            <img
              className="img-fluid"
              src={ContactImg}
              alt="logo"
              data-aos="flip-up"
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12 py-3" id="ContactForm">
            <form onSubmit={formik.handleSubmit} className="px-5 pt-4">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control  ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className={`form-control  ${
                    formik.touched.mobile && formik.errors.mobile
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="invalid-feedback">{formik.errors.mobile}</div>
                )}
              </div>
              <div className="form-group">
                <label>Enquiry</label>
                <textarea
                  className="form-control"
                  {...formik.getFieldProps("enquiry")}
                ></textarea>
                {formik.touched.enquiry && formik.errors.enquiry && (
                  <div className="invalid-feedback">
                    {formik.errors.enquiry}
                  </div>
                )}
              </div>
              <div className="text-center my-4">
                <button
                  className="btn btn-primary py-2"
                  id="Contactbtt"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section3;
