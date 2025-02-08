import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";

function HouseCategoryManagementEdit() {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const validationSchema = Yup.object({
    houseCategoryName: Yup.string().required("*Name is required"),
    houseStatus: Yup.string().required("*Status is required"),
    price: Yup.number()
      .typeError("*must be a digit")
      .required("*Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      houseCategoryName: "",
      houseStatus: "",
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
      formdata.append("status", values.houseStatus);
      if (values.houseImage) formdata.append("houseImage", values.houseImage);

      try {
        const response = await bookingApi.put(
          `updateHouseShifting/${id}`,
          formdata
        );
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log("Toast : ", response.data.message);
          navigate("/housecategorymanagement");
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
          `getAllHouseShifting/${id}?id=${id}`
        );
        setData(response.data);

        if (response.status === 200) {
          formik.setFieldValue(
            "houseCategoryName",
            response.data.houseCategoryName
          );
          formik.setFieldValue("houseStatus", response.data.houseStatus);
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
                      Edit House Category Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/housecategorymanagement">
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
                    House Category Name <span className="text-danger">*</span>
                  </label>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="houseCategoryName"
                      className={`form-control ${
                        formik.touched.houseCategoryName &&
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
                      type="text"
                      name="price"
                      className={`form-control ${
                        formik.touched.price && formik.errors.price
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
                      name="houseStatus"
                      className={`form-select ${
                        formik.touched.houseStatus && formik.errors.houseStatus
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("houseStatus")}
                    >
                      <option value={""}></option>
                      <option value={"ACTIVE"}>Active</option>
                      <option value={"INACTIVE"}>InActive</option>
                    </select>
                    {formik.touched.houseStatus &&
                      formik.errors.houseStatus && (
                        <div className="invalid-feedback">
                          {formik.errors.houseStatus}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">House Category Image</label>
                  <div className="mb-3">
                    <input
                      type="file"
                      name="houseImage"
                      className={`form-control ${
                        formik.touched.houseImage && formik.errors.houseImage
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
                  {(data?.houseImage || formik.values.houseImage) && (
                    <div>
                      <img
                        src={
                          formik.values.houseImage
                            ? URL.createObjectURL(formik.values.houseImage)
                            : data.houseImage
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

export default HouseCategoryManagementEdit;
