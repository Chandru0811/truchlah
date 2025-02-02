import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";

function UpdateBokking({ id, onSuccess, handleMenuClose }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const handleClose = () => {
        formik.resetForm();
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
        setIsModified(false);
    };
    const validationSchema = yup.object().shape({
        bookingStatus: yup.string().required("*Booking Status is required"),
        quotedAmount: yup
            .number()
            .typeError("*Quoted Amount must be a number")
            .required("*Quoted Amount is required"),
        remarks: yup.string()
            .required("*Remarks is required")
            .max(255, "Remarks cannot exceed 255 characters"),
    });
    const formik = useFormik({
        initialValues: {
            bookingStatus: "",
            quotedAmount: "",
            remarks: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // setLoadIndicator(true);
            console.log("booking values:", values);
            // try {
            //     const response = await api.post(`/createCenterBreaks/${id}`, values, {
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     });
            //     if (response.status === 201) {
            //         toast.success(response.data.message);
            //         onSuccess();
            //         handleClose();
            //     } else {
            //         toast.error(response.data.message);
            //     }
            // } catch (error) {
            //     if (error.response.status === 409) {
            //         toast.warning(error?.response?.data?.message);
            //     } else {
            //         toast.error(error.response.data.message);
            //     }
            // } finally {
            //     setLoadIndicator(false);
            // }
        },
        enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true,
        validate: (values) => {
            if (Object.values(values).some((value) => (value && typeof value === 'string' ? value.trim() !== "" : value))) {
                setIsModified(true);
            } else {
                setIsModified(false);
            }
        },

    });
    return (
        <>
            <button
                type="submit"
                className="btn btn-sm text-white"
                style={{ backgroundColor: "#22cb00" }}
                onClick={handleShow}
            >
                <span>Update Booking</span>
            </button>

            <Modal
                show={show}
                size="medium"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
                backdrop={isModified ? "static" : true}
                keyboard={isModified ? false : true}
            >
                <form
                    onSubmit={formik.handleSubmit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !formik.isSubmitting) {
                            e.preventDefault(); // Prevent default form submission
                        }
                    }}
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div class="col-12 mb-2">
                                <lable className="form-lable">
                                    Booking Status<span class="text-danger">*</span>
                                </lable>
                                <div class="input-group mb-3">
                                    <select
                                        className={`form-select   ${formik.touched.bookingStatus &&
                                            formik.errors.bookingStatus
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("bookingStatus")}
                                    >
                                        <option></option>
                                        <option value="Pending">Pending</option>
                                        <option value="Assign">Assign</option>
                                        <option value="Negotiation">Negotiation</option>
                                    </select>
                                    {formik.touched.bookingStatus &&
                                        formik.errors.bookingStatus && (
                                            <div className="invalid-feedback">
                                                {formik.errors.bookingStatus}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div class="col-md-12 col-12 mb-2">
                                <lable>
                                    Quoted Amount<span class="text-danger">*</span>
                                </lable>
                                <input
                                    type="text"
                                    className={`form-control   ${formik.touched.quotedAmount && formik.errors.quotedAmount
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("quotedAmount")}
                                />
                                {formik.touched.quotedAmount && formik.errors.quotedAmount && (
                                    <div className="invalid-feedback">
                                        {formik.errors.quotedAmount}
                                    </div>
                                )}
                            </div>
                            <div class="col-md-12 col-12">
                                <lable className="form-lable">
                                    Remarks<span class="text-danger">*</span>
                                </lable>
                                <div class="input-group mb-3">
                                    <textarea
                                        type="text"
                                        className={`form-control   ${formik.touched.remarks && formik.errors.remarks
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("remarks")}
                                    />
                                    {formik.touched.remarks && formik.errors.remarks && (
                                        <div className="invalid-feedback">
                                            {formik.errors.remarks}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="mt-0">
                        <Button
                            className="btn btn-sm btn-border bg-light text-dark"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={formik.handleSubmit}
                            className="btn btn-button btn-sm"
                        // disabled={loadIndicator}
                        >
                            {/* {loadIndicator && (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    aria-hidden="true"
                                ></span>
                            )} */}
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default UpdateBokking;
