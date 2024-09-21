import React from "react";
import "../../styles/custom.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userApi } from "../../config/URL";
import img from"../../asset/e-commerce_verification-512.webp"

const validationSchema = Yup.object().shape({
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
});

const MobileNumVerify = () => {
  const navigate = useNavigate();
  const id =sessionStorage.getItem("userId")
console.log("id",id)
  const formik = useFormik({
    initialValues: {
      countryCode: "",
      mobileNo: "", 
    },
    validationSchema,
    onSubmit: async (data, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const payload ={
        newMobileNumber:data.mobileNo,
        countryCode:data.countryCode
      }
      const mobileNo = `${data.countryCode}${data.mobileNo}`;
      try {
        const otpResponse = await userApi.put(
          `user/updateMobile/${id}`,payload
        );
        if (otpResponse.status === 200) {
          try {
            const otpResponse = await userApi.post(
              `user/sendOTP?phone=${mobileNo}`
            );
            if (otpResponse.status === 200) {
              navigate("/otp", { state: { mobileNo } });
            }
          } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
          }
        }
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.");
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  return (
    <section className="PaymentUnsuccessful" style={{ background: "#faf5f6" }}>
      <center>
        <form onSubmit={formik.handleSubmit}>
          <div className="container py-5 px-2">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12"></div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="card">
                  <center>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <img src={img} className="img-fluid" alt="..." style={{width:"100px"}} />
                      {/* <GiCancel className="text-danger my-5" size={70} /> */}
                    </div>
                  </center>
                  <h2 className="mt-4 fw-bold">Verification</h2>
                  <p className="mt-2 mx-3">
                    We Will Send You a One Time Password On Your Phone Number
                  </p>
                  <div>
                    <div className="mb-3">
                      <div className="input-group w-75">
                        <select
                          name="countryCode"
                          className={`form-select form-select-sm ${
                            formik.touched.countryCode &&
                            formik.errors.countryCode
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

                    <button
                      id="support-button"
                      type="submit"
                      className="btn btn-secondary my-3 mx-2"
                      style={{ width: "40%" }}
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "Sending..." : "GET OTP"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-12"></div>
            </div>
          </div>
        </form>
      </center>
    </section>
  );
};

export default MobileNumVerify;
