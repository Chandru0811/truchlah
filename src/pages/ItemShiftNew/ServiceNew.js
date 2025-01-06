import { useFormik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FaPlus, FaMinus } from "react-icons/fa";
import { bookingApi } from "../../config/URL";
import { Data } from "@react-google-maps/api";
import * as Yup from "yup";

const ServiceNew = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const shiftType = localStorage.getItem("shiftType");
    const userId = localStorage.getItem("userId");

    const validationSchema = Yup.object().shape({
      messageToDriver: Yup.string().max(
        255,
        "Message to Driver cannot exceed 255 characters"
      ),
    });

    const formik = useFormik({
      initialValues: {
        driverAsManpower: false,
        extraManpower: false,
        quantity: 0,
        trollyRequired: false,
        roundTripRequired: false,
        messageToDriver: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const payload = {
          userId: userId,
          type: formData.form1.type,
          // locationDetail: JSON.parse(decodeURIComponent(formData.location)),
          bookingId: formData.bookingId,
          estKm: formData.form1.estKm,
          scheduledDate: `${formData?.form2?.date}T${formData?.form2?.time}.000Z`,
          // deliveryDate: deliveryDate,
          quantity: values.extraManpower ? values.quantity : 0,
          msgToDriver: values.messageToDriver,
          noOfPieces: values.noOfPieces,
          helper: values.driverAsManpower ? "Y" : "N",
          extraHelper: values.extraManpower ? "Y" : "N",
          trollyRequired: values.trollyRequired ? "Y" : "N",
          roundTrip: values.roundTripRequired ? "Y" : "N",
          vehicleType: formData?.form2?.vehicle?.type,
          // promoCode: "",
          actualKm: formData?.form1.estKm,
        };
        setLoadIndicators(true);
        try {
          const response = await bookingApi.put(`booking/update`, payload);
          // console.log("Response:", response);
          if (response.status === 200) {
            toast.success("Vehicle selected successfully!");
            setFormData((prev) => ({
              ...prev,
              form3: { ...values },
            }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.message);
          console.log(error);
        } finally {
          setLoadIndicators(false);
        }
        // } else {
        //   toast.warning("You must select a time at least 3 hours from now");
        // }
      },
    });

    const increaseManpowerQuantity = () => {
      if (formik.values.quantity < 99) {
        formik.setFieldValue("quantity", formik.values.quantity + 1);
      }
    };

    const decreaseManpowerQuantity = () => {
      if (formik.values.quantity > 1) {
        formik.setFieldValue("quantity", formik.values.quantity - 1);
      }
    };

    useEffect(() => {
      // console.log("form",formData.form3)
      formik.setValues(formData.form3)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useImperativeHandle(ref, () => ({
      servicenew: formik.handleSubmit,
    }));

    return (
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row py-3">
            {/* Driver as Manpower Checkbox */}
            <div className="col-md-6 col-12 mb-3 p-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                  border: "1px solid #e0dfdf",
                }}
              >
                <span>
                  <b>Driver as Manpower</b>
                </span>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="driverAsManpower"
                    checked={formik.values.driverAsManpower}
                    className="form-check-input custom-checkbox"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="flexCheckChecked"
                  />
                </div>
              </div>
            </div>

            {/* Extra Manpower Checkbox */}
            <div className="col-md-6 col-12 mb-3 p-3">
              <div className="row">
                <div
                  className={`${
                    formik.values.extraManpower ? `col-md-6 col-12` : `col-12`
                  } mb-3`}
                >
                  <div
                    className="d-flex align-items-center justify-content-between p-3"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      border: "1px solid #e0dfdf",
                      width: "100%",
                    }}
                  >
                    <span>
                      <b>Extra Manpower</b>
                    </span>
                    <input
                      className={`form-check-input custom-checkbox `}
                      style={{ cursor: "pointer" }}
                      type="checkbox"
                      id="flexCheckChecked"
                      name="extraManpower"
                      checked={formik.values.extraManpower}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        formik.setFieldValue("extraManpower", isChecked);
                        if (isChecked) {
                          formik.setFieldValue("quantity", 1);
                        }
                      }}
                      // onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                {formik.values.extraManpower && (
                  <div className="col-md-6 col-12">
                    {/* Checkbox section */}
                    <div
                      className="d-flex align-items-center justify-content-between p-3"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        border: "1px solid #e0dfdf",
                        width: "100%",
                      }}
                    >
                      <span>
                        <b>No.Of Workers</b>
                      </span>
                      <div
                        className="quantity-input d-flex align-items-center px-1"
                        style={{
                          backgroundColor: "#acff3b",
                          borderRadius: "30px",
                        }}
                      >
                        {/* Decrease button */}
                        <button
                          className="quantity-btn "
                          type="button"
                          onClick={decreaseManpowerQuantity}
                          disabled={formik.values.quantity === 1}
                          style={{
                            backgroundColor: "#acff3b",
                            color: "#333",
                            borderRadius: "50%",
                            width: "20px", // Decreased width
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                        >
                          <FaMinus style={{ fontSize: "10px" }} />
                        </button>

                        {/* Quantity display */}
                        <input
                          type="number"
                          className="quantity-value"
                          value={formik.values.quantity}
                          min={0}
                          max={99}
                          readOnly
                          style={{
                            width: "35px",
                            padding: "1px",
                            textAlign: "center",
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "#acff3b",
                            color: "#333",
                          }}
                        />

                        {/* Increase button */}
                        <button
                          className="quantity-btn"
                          onClick={increaseManpowerQuantity}
                          type="button"
                          disabled={formik.values.quantity === 99}
                          style={{
                            backgroundColor: "#acff3b",
                            color: "#333",
                            borderRadius: "50%",
                            width: "20px", // Decreased width
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            cursor: "pointer",
                            // marginLeft: "8px",
                          }}
                        >
                          <FaPlus style={{ fontSize: "10px" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trolly Required Checkbox */}
            <div className="col-md-6 col-12 mb-3 p-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #e0dfdf",
                  alignItems: "center",
                }}
              >
                <span>
                  <b>Trolley Required</b>
                </span>
                <div className="form-check">
                  <input
                    className="form-check-input custom-checkbox"
                    type="checkbox"
                    checked={formik.values.trollyRequired}
                    id="flexCheckChecked"
                    name="trollyRequired"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Round Trip Required Checkbox */}
            <div className="col-md-6 col-12 mb-3 p-3">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  alignItems: "center",
                  border: "1px solid #e0dfdf",
                }}
              >
                <span>
                  <b>Round Trip Required</b>
                </span>
                <div className="form-check">
                  <input
                    className="form-check-input custom-checkbox"
                    type="checkbox"
                    checked={formik.values.roundTripRequired}
                    id="flexCheckChecked"
                    name="roundTripRequired"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="exampleTextarea" className="form-label">
                <b>Message to Driver</b>
              </label>
              <textarea
                id="exampleTextarea"
                rows="4"
                placeholder="Please write your message here........"
                className="form-control form-control-lg "
                {...formik.getFieldProps("messageToDriver")}
              ></textarea>
              {formik.touched.messageToDriver && formik.errors.messageToDriver && (
                <div className="mb-2 text-danger">{formik.errors.messageToDriver}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default ServiceNew;
