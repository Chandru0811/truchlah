import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import BannerAndOffer from "./BannerAndOffer";
// import api from "../../config/URL";
// import toast from "react-hot-toast";

function BannerAndOfferEdit() {
  const [isSalesChecked, setIsSalesChecked] = useState(true);
  const [isPurchaseChecked, setIsPurchaseChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    itemCode: Yup.string().required("*Code is required"),
    itemName: Yup.string().required("*Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
            lastName: "string",
            password: "string",
            email: "string",
            mobileNo: 0,
            countryCode: "string",
            refCode: "string",
            loginType: "string",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("additems:", values);
      setLoading(true);
    //   try {
    //     const response = await api.post(`createMstrItems`, values);
    //     console.log(response);
    //     if (response.status === 201) {
    //       toast.success(response.data.message);
    //       console.log("Toast : ", response.data.message);
    //       navigate("/items");
    //     } else {
    //       toast.error(response?.data?.message);
    //     }
    //   } catch (error) {
    //     toast.error("Error fetching data: ", error?.response?.data?.message);
    //   } finally {
    //     setLoading(false);
    //   }
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
                      className={`form-select  ${
                        formik.touched.status && formik.errors.status
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  {formik.touched.itemCode && formik.errors.itemCode && (
                    <div className="invalid-feedback">
                      {formik.errors.itemCode}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                 Attachement <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    name="itemName"
                    className={`form-control ${
                      formik.touched.itemName && formik.errors.itemName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("itemName")}
                  />
                  {formik.touched.itemName && formik.errors.itemName && (
                    <div className="invalid-feedback">
                      {formik.errors.itemName}
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
                    name="itemCode"
                    className={`form-control ${
                      formik.touched.itemCode && formik.errors.itemCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("itemCode")}
                  />
                  {formik.touched.itemCode && formik.errors.itemCode && (
                    <div className="invalid-feedback">
                      {formik.errors.itemCode}
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