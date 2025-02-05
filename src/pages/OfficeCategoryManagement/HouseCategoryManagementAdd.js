import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";

function OfficeCategoryManagementAdd() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    houseCategoryName: Yup.string().required("*Name is required"),
    status: Yup.string().required("*Status is required"),
    price: Yup.number()
      .typeError("*must be a digit")
      .required("*Price is required"),
    houseImage: Yup.mixed().required("*Office Category Image is required"),
    // .test(
    //   "fileSize",
    //   "File size must not exceed 2MB",
    //   (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    // )
    // .test(
    //   "fileType",
    //   "Only image files are allowed",
    //   (value) =>
    //     !value ||
    //     (value &&
    //       ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
    // ),
  });

  const formik = useFormik({
    initialValues: {
      houseCategoryName: "",
      status: "",
      price: "",
      houseImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("additems:", values);
      setLoading(true);
      const formdata = new FormData();
      formdata.append("houseCategoryName", values.houseCategoryName);
      formdata.append("price", values.price);
      formdata.append("status", values.status);
      if (values.houseImage) formdata.append("houseImage", values.houseImage);
      try {
        const response = await bookingApi.post(`createHouseShifting`, formdata);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log("Toast : ", response.data.message);
          navigate("/officecategorymanagement");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.errorList[0].errorMessage);
        } else {
          toast.error(
            `Error fetching data: ${error?.response?.data?.message || error.message
            }`
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Add Office Category Management
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
                  Office Category Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="houseCategoryName"
                    className={`form-control ${formik.touched.houseCategoryName &&
                        formik.errors.houseCategoryName
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("houseCategoryName")}
                  />
                  {formik.touched.houseCategoryName &&
                    formik.errors.houseCategoryName && (
                      <div className="invalid-feedback">
                        {formik.errors.houseCategoryName}
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
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    }}
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
                <label className="form-label">
                  Status<span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <select
                    type="text"
                    name="status"
                    className={`form-select ${formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("status")}
                  >
                    <option value={""}></option>
                    <option value={"ACTIVE"}>Active</option>
                    <option value={"INACTIVE"}>InActive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Office Category Image <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="houseImage"
                    className={`form-control ${formik.touched.houseImage && formik.errors.houseImage
                        ? "is-invalid"
                        : ""
                      }`}
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      formik.setFieldValue("houseImage", file);
                    }}
                  />
                  {formik.touched.houseImage && formik.errors.houseImage && (
                    <div className="invalid-feedback">
                      {formik.errors.houseImage}
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

export default OfficeCategoryManagementAdd;
