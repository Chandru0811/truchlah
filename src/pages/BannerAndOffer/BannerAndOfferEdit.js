import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import api from "../../config/URL";
import toast from "react-hot-toast";
import { userApi } from "../../config/URL";

function BannerAndOfferEdit() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    status: Yup.string().required("*Status is required"),
    attachment: Yup.mixed().required("*Attachment is required"),
    description: Yup.string().required("*Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      status: "",
      attachment: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("status", values.status);
      formData.append("attachment", values.attachment);
      formData.append("description", values.description);
      // values.attachment="file"
      try {
        const response = await userApi.put(`updateOffer/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/bannerandoffer");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error("Error updating data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("attachment", event.currentTarget.files[0]);
  };

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await userApi.get(`/offer/byOfferId/${id}`);
        formik.setValues(response.data.responseBody);
      } catch (error) {
        toast.error(`Error fetching data: ${error?.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getItemData();
  }, [id]);

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Banner And Offer</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/bannerandoffer">
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
                      <span></span>
                    )}
                    &nbsp;<span>Save</span>
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
                  Status <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <select
                    {...formik.getFieldProps("status")}
                    className={`form-select ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option value="" label="Select status" />
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">{formik.errors.status}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Attachment <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="attachment"
                    className={`form-control ${
                      formik.touched.attachment && formik.errors.attachment
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleFileChange}
                  />
                  {formik.touched.attachment && formik.errors.attachment && (
                    <div className="invalid-feedback">
                      {formik.errors.attachment}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <textarea
                    type="text"
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default BannerAndOfferEdit;
