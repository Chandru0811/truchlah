import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";

function OfficeCategoryManagementEdit() {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const validationSchema = Yup.object({
    commercialCategoryName: Yup.string().required("*Name is required"),
    commercialStatus: Yup.string().required("*Status is required"),
    price: Yup.number()
      .typeError("*must be a digit")
      .required("*Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      commercialCategoryName: "",
      commercialStatus: "",
      price: "",
      commercialImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("additems:", values);
      setLoading(true);
      const formdata = new FormData();
      formdata.append("commercialCategoryName", values.commercialCategoryName);
      formdata.append("price", values.price);
      formdata.append("commercialStatus", values.commercialStatus);
      if (values.commercialImage) formdata.append("commercialImage", values.commercialImage);

      try {
        const response = await bookingApi.put(
          `updateCommercialShifting/${id}`,
          formdata
        );
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log("Toast : ", response.data.message);
          navigate("/officecategorymanagement");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      try {
        const response = await bookingApi.get(
          `getCommercialShiftingById/${id}?id=${id}`
        );
        setData(response.data);

        if (response.status === 200) {
          formik.setFieldValue(
            "commercialCategoryName",
            response.data.commercialCategoryName
          );
          formik.setFieldValue("commercialStatus", response.data.commercialStatus);
          formik.setFieldValue("price", response.data.price);
        }
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="container-fluid p-2 minHeight m-0">
      {loader ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <div class="loader"></div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">
                      Edit Office Category Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/officecategorymanagement">
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
                      &nbsp;<span>Update</span>
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
                    Office Category Name <span className="text-danger">*</span>
                  </label>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="commercialCategoryName"
                      className={`form-control ${formik.touched.commercialCategoryName &&
                        formik.errors.commercialCategoryName
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("commercialCategoryName")}
                    />
                    {formik.touched.commercialCategoryName &&
                      formik.errors.commercialCategoryName && (
                        <div className="invalid-feedback">
                          {formik.errors.commercialCategoryName}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Price<span className="text-danger">*</span>
                  </label>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="price"
                      className={`form-control ${formik.touched.price && formik.errors.price
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("price")}
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="invalid-feedback">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-0">
                    Status<span className="text-danger">*</span>
                  </label>
                  <div className="mt-2 mb-3">
                    <select
                      type="text"
                      name="commercialStatus"
                      className={`form-select ${formik.touched.commercialStatus && formik.errors.commercialStatus
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("commercialStatus")}
                    >
                      <option value={""}></option>
                      <option value={"ACTIVE"}>Active</option>
                      <option value={"INACTIVE"}>InActive</option>
                    </select>
                    {formik.touched.status &&
                      formik.errors.status && (
                        <div className="invalid-feedback">
                          {formik.errors.status}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Office Category Image</label>
                  <div className="mb-3">
                    <input
                      type="file"
                      name="commercialImage"
                      className={`form-control ${formik.touched.commercialImage && formik.errors.commercialImage
                        ? "is-invalid"
                        : ""
                        }`}
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        formik.setFieldValue("commercialImage", file);
                      }}
                    />
                    {formik.touched.commercialImage && formik.errors.commercialImage && (
                      <div className="invalid-feedback">
                        {formik.errors.commercialImage}
                      </div>
                    )}
                  </div>
                  {(data?.commercialImage || formik.values.commercialImage) && (
                    <div>
                      <img
                        src={
                          formik.values.commercialImage
                            ? URL.createObjectURL(formik.values.commercialImage)
                            : data.commercialImage
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
          </div>
        </form>
      )}
    </div>
  );
}

export default OfficeCategoryManagementEdit;
