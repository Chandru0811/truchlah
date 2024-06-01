import React, { useState } from "react";
import Invoice from "../../Components/common/Invoice";
import "../../styles/custom.css";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { bookingApi } from "../../config/URL";
import { toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';

function Invoices() {
  const [show, setShow] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [customReason, setCustomReason] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setCheckedValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      bookingId: "568",
      cancelledBy: "user",
      comments: "",
    },
    onSubmit: async (values) => {
      let commentsArray = checkedValues.filter(value => value !== "Others");
      if (checkedValues.includes("Others") && customReason.trim() !== "") {
        commentsArray.push(`Others: ${customReason}`);
      }
      values.comments = commentsArray.join(", ");
      try {
        const response = await bookingApi.post(
          "booking/cancelByUser/568",
          values
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/cancelorder");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Submitting Data: " + error.message);
      }
    },
  });

  return (
    <div className="container-fluid py-5" style={{ background: "#faf5f6" }}>
      <div className="container">
        <Invoice />
      </div>
      
      <div className="container-fluid py-4" style={{ background: "#faf5f6" }}>
                    <div className="container">
                        <div
                            className="d-flex justify-content-between p-3 mt-5"
                            style={{ backgroundColor: "#D6E6FA" }}
                        >
                            <span className="d-flex align-item-center">
                                <p>
                                    <b>Want to cancel your order?</b>
                                </p>
                            </span>
                            <span>
                                <button
                                    className="btn btn-danger px-5"
                                    onClick={handleShow}
                                    style={{ borderRadius: "20px" }}
                                >
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Want to cancel your order?</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={formik.handleSubmit}>
                        <Modal.Body>
                            <div className="container">
                                <div >
                                    <div
                                        className=""
                                        style={{ backgroundColor: "#FFF", borderRadius: "5px" }}
                                    >
                                        <p className=''>
                                            Before canceling, let us know why you’re leaving. Your response
                                            may be shared with the subscription provider.
                                        </p>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="reason1"
                                                value="Driver is not allocated"
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" id="closeBefore" htmlFor="reason1">
                                                Driver is not allocated
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="reason2"
                                                value="Driver says he will be late"
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" id="closeBefore" htmlFor="reason2">
                                                Driver says he will be late
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="reason3"
                                                value="Vehicle cannot meet my requirement"
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" id="closeBefore" htmlFor="reason3">
                                                Vehicle cannot meet my requirement
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="reason4"
                                                value="I need to change my address & location"
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" id="closeBefore" htmlFor="reason4">
                                                I need to change my address & location
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="reason5"
                                                value="Driver is too far away and I need a shorter arrival time"
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" id="closeBefore" htmlFor="reason5">
                                                Driver is too far away and I need a shorter arrival time
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="reason6"
                                                value="Others"
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" id="closeBefore" htmlFor="reason6">
                                                Others
                                            </label>
                                        </div>
                                        <textarea
                                            className="form-control"
                                            placeholder="write your reason here..."
                                            id="floatingTextarea"
                                            value={formik.values.reviewComments}
                                            onChange={handleCustomReasonChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <span>
                                <div className="my-2">
                                    <button type="submit" className="btn btn-danger">
                                        Confirm
                                    </button>
                                </div>
                            </span>

                        </Modal.Footer>
                    </form>
                </Modal>
    </div>
  );
}

export default Invoices;
