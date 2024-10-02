import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userApi } from "../../config/URL";
import toast from "react-hot-toast";

function SupportTeamManagementEdit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    email: Yup.string().email("*Invalid email").required("*Email is required"),
    // password: Yup.string().required("*Password is required"),
    countryCode: Yup.string().required("*Country code is required"),
    mobileNo: Yup.number()
      .required("*Phone number is required")
      .test("mobileNo-length", function (value) {
        const { countryCode } = this.parent;
        if (countryCode === "65") {
          return value?.toString().length === 8
            ? true
            : this.createError({
                message: "Phone number must be 8 digits only",
              });
        }
        if (countryCode === "91") {
          return value?.toString().length === 10
            ? true
            : this.createError({
                message: "Phone number must be 10 digits only",
              });
        }
        return false;
      }),
    staffActiveStatus: Yup.string().required("*Active status is required"),
    // loginType: Yup.string().required("*Login Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      mobileNo: "",
      countryCode: "",
      staffActiveStatus: true,
      // loginType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { staffActiveStatus,...value } = values;
      setLoading(true);
      try {
        const response = await userApi.put(`user/UserDetails/${id}`, value);
        if (response.status === 200) {
          try {
            const responses = await userApi.put(`staff/staffStatusUpdate/${id}?status=${staffActiveStatus}`);
            if (responses.status === 200) {
              toast.success(response.data.message);
              navigate("/supportteammanagement");
            } else {
              toast.error(responses?.data?.message);
            }
          } catch (error) {
            toast.error("Error: ", error?.response?.data?.message);
          }
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error("Error: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await userApi.get(`user/byId/${id}`);
        if (response.status === 200) {
          formik.setValues({
            ...formik.values,
            firstName: response.data.responseBody.firstName,
            lastName: response.data.responseBody.lastName,
            email: response.data.responseBody.email,
            mobileNo: response.data.responseBody.mobileNo,
            countryCode: response.data.responseBody.countryCode,
            staffActiveStatus:response.data.responseBody.staffActiveStatus
          });
        }
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
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
                  <h1 className="h4 ls-tight headingColor">
                    Edit Support Team
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/supportteammanagement">
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
              {/* First Name */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="email"
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

              {/* Password */}
              {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div> */}

              {/* Mobile Number */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <div className="input-group">
                    <select
                      name="countryCode"
                      className={`form-select form-select-sm ${
                        formik.touched.countryCode && formik.errors.countryCode
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ maxWidth: "80px" }}
                      {...formik.getFieldProps("countryCode")}
                    >
                      <option value=""></option>
                      <option value="91">+91</option>
                      <option value="65">+65</option>
                    </select>
                    <input
                      type="text"
                      name="mobileNo"
                      placeholder="Mobile Number"
                      className={`form-control ${
                        formik.touched.mobileNo && formik.errors.mobileNo
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("mobileNo")}
                    />
                    {formik.touched.mobileNo && formik.errors.mobileNo && (
                      <div className="invalid-feedback">
                        {formik.errors.mobileNo}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Code */}
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Active Status</label><span className="text-danger">*</span>
                <div className="mb-3">
                  <select
                    type="text"
                    name="staffActiveStatus"
                    className={`form-select ${
                      formik.touched.staffActiveStatus && formik.errors.staffActiveStatus
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("staffActiveStatus")}
                  >
                    <option value={""}>Select the Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>InActive</option>
                  </select>
                  {formik.touched.staffActiveStatus && formik.errors.staffActiveStatus && (
                    <div className="invalid-feedback">
                      {formik.errors.staffActiveStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* Login Type */}
              {/* <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Login Type <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="loginType"
                    className={`form-control ${
                      formik.touched.loginType && formik.errors.loginType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("loginType")}
                  />
                  {formik.touched.loginType && formik.errors.loginType && (
                    <div className="invalid-feedback">
                      {formik.errors.loginType}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SupportTeamManagementEdit;
