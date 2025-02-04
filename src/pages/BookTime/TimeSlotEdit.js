import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

function TimeSlotEdit({ id, batchDay, batchTimes }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("tmsuserName");
  const [isModified, setIsModified] = useState(false);
  const [fields, setFields] = useState([]); // No default field

  const validationSchema = Yup.object({
    batchTimes: Yup.array()
      .of(Yup.string().required("Batch time is required"))
      .min(1, "At least one batch time is required"),
  });

  const formik = useFormik({
    initialValues: {
      batchDay: batchDay,
      batchTimes: [],
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // try {
      //   const response = await api.put(`/updateBatchDays/${id}`, values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   if (response.status === 200) {
      //     onSuccess();
      //     toast.success(response.data.message);
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   if (error?.response?.status === 409) {
      //     toast.warning(error?.response?.data?.message);
      //   } else if (error?.response?.status === 404) {
      //     toast.warning(error?.response?.data?.message);
      //   } else {
      //     toast.error(error?.response?.data?.message);
      //   }
      // } finally {
      //   handleClose();
      //   setLoadIndicator(false);
      // }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    // getData();
  };

  const addFields = () => {
    setFields([...fields, { id: null, batchTimes: "" }]);

    // Update Formik state
    formik.setFieldValue("batchTimes", [...formik.values.batchTimes, ""]);
  };

  const deleteFields = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);

    // Update Formik state
    const updatedBatchTimes = formik.values.batchTimes.filter((_, i) => i !== index);
    formik.setFieldValue("batchTimes", updatedBatchTimes);
  };



  return (
    <>
      <button className="btn btn-light btn-sm shadow-none border-none me-2"
        onClick={handleShow}>
        Edit
      </button>
      <Dialog
        open={show}
        // onClose={handleClose}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
        maxWidth="sm"
        fullWidth
        aria-labelledby="batch-time-edit-dialog"
      >
        <DialogTitle className="headColor">
          Batch Time Edit{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <IoMdCloseCircleOutline />
          </IconButton>
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12">
                  <label className="form-label">
                    Day<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control  ${formik.touched.batchDay && formik.errors.batchDay
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("batchDay")}
                    readOnly
                  />
                  {formik.touched.batchDay && formik.errors.batchDay && (
                    <div className="invalid-feedback">
                      {formik.errors.batchDay}
                    </div>
                  )}
                </div>

                <div className="col-md-12 col-12 mb-2">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between mt-3">
                        <span>
                          <label className="form-label">
                            Batch Time<span className="text-danger">*</span>
                          </label>
                        </span>
                        <span>
                          <button
                            type="button"
                            className="btn btn-sm pb-2 me-2"
                            onClick={() => deleteFields(index)}
                          >
                            <IoCloseCircleOutline
                              style={{ color: "red", fontSize: "18px" }}
                            />
                          </button>
                        </span>
                      </div>
                      <input
                        type="time"
                        className={`form-control ${formik.touched.batchTimes?.[index] && formik.errors.batchTimes?.[index] ? "is-invalid" : ""}`}
                        value={formik.values.batchTimes[index] || ""}
                        onChange={(e) => formik.setFieldValue(`batchTimes[${index}]`, e.target.value)}
                      />

                      {formik.touched.batchTimes?.[index] &&
                        formik.errors.batchTimes?.[index] && (
                          <div className="invalid-feedback">
                            {formik.errors.batchTimes[index]}
                          </div>
                        )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-button btn-sm mt-3"
                    onClick={addFields}
                  >
                    Add more
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-sm btn-light"
              style={{ fontSize: "12px" }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <Button
              type="submit"
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
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default TimeSlotEdit;
