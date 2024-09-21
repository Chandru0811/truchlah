import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import HouseCategoryManagement from "./HouseCategoryManagement";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";

function HouseCategoryManagementAdd() {
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        houseCategoryName: Yup.string().required("*Name is required"),
        price: Yup.number().typeError("*must be a digit").required("*Price is required"),
    });

    const formik = useFormik({
        initialValues: {
            houseCategoryName: "",
            price: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // console.log("additems:", values);
            setLoading(true);
              try {
                const response = await bookingApi.post(`createHouseShifting`, values);
                console.log(response);
                if (response.status === 200) {
                  toast.success(response.data.message);
                  console.log("Toast : ", response.data.message);
                  navigate("/housecategorymanagement");
                } else {
                  toast.error(response?.data?.message);
                }
              } catch (error) {
                toast.error("Error fetching data: ", error?.response?.data?.message);
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
                                    <h1 className="h4 ls-tight headingColor">Add House Category Management</h1>
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
                                    House Category Name <span className="text-danger">*</span>
                                </label>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="houseCategoryName"
                                        className={`form-control ${formik.touched.houseCategoryName && formik.errors.houseCategoryName
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        {...formik.getFieldProps("houseCategoryName")}
                                    />
                                    {formik.touched.houseCategoryName && formik.errors.houseCategoryName && (
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
                           
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default HouseCategoryManagementAdd;