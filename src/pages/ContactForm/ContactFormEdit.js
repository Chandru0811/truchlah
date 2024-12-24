import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userApi } from "../../config/URL";

function ContactFormEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("*First name is required"),
    email: Yup.string().email("Invalid email format").required("*Email is required"),
    mobile: Yup.number().required("*Mobile number is required"),
    enquiry: Yup.string().required("*Enquiry is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      enquiry: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await userApi.put(
          `/updateContactPageDetails/${id}`,
          values,
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/contactform");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(`Error updating data: ${error?.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    },
  });

  // Fetching existing data
  useEffect(() => {
    const getItemData = async () => {
      setLoader(true);
      try {
        const response = await userApi.get(`/userContactPage/byContactId/${id}`);
        formik.setValues({
          name: response.data.responseBody.name || "",
          email: response.data.responseBody.email || "",
          mobile: response.data.responseBody.mobile || "",
          enquiry: response.data.responseBody.enquiry || "",
        });
      } catch (error) {
        toast.error(`Error fetching data: ${error?.response?.data?.message || error.message}`);
      } finally {
        setLoader(false);
      }
    };
    getItemData();
  }, [id]);

  return (
    <div>
      {loader ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="container-fluid p-2 minHeight m-0">
          <form onSubmit={formik.handleSubmit}>
            <div className="card shadow border-0 mb-2 top-header">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor">
                        Edit Contact Form
                      </h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                      <Link to="/contactform">
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

            <div className="card shadow border-0 my-2">
              <div className="container mb-5">
                <div className="row py-4">
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Name<span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${
                          formik.touched.name && formik.errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
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
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
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

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Enquiry <span className="text-danger">*</span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="enquiry"
                        className={`form-control ${
                          formik.touched.enquiry && formik.errors.enquiry
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("enquiry")}
                      />
                      {formik.touched.enquiry && formik.errors.enquiry && (
                        <div className="invalid-feedback">
                          {formik.errors.enquiry}
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

export default ContactFormEdit;
