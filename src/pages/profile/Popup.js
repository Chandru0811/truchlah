import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../styles/custom.css";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { bookingApi, userApi } from "../../config/URL";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  reviewComments: Yup.string().max(
    255,
    "*Comments Message cannot exceed 255 characters"
  ).required("*Comments are required"),
  rating: Yup.number().required("*Rating is required"),
});

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Popup({ bookingId, onSuccess }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState();
  const [show, setShow] = useState(false);
  const [reviewType, setReviewType] = useState("General");
  const handleShow = () => setShow(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookingIdValue = params.get("bookingId");
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setRating(null)
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      reviewComments: "",
      rating: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        reviewComments: values.reviewComments,
        rating: values.rating,
        bookingId: bookingId,
      };

      try {
        const response = await bookingApi.post(
          "booking/reviewToDriver",
          payload
        );
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          // navigate(`/summary/${bookingIdValue}`);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while submitting your review."
        );
      }
    },
  });

  return (
    <>
      <button
        className="btn btn-primary px-5 py-2"
        id="NextMove"
        onClick={handleShow}
      >
        Review
      </button>

      <Modal show={show} onHide={handleClose} size="lg" dialogClassName="modal-dialog-centered">
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="containers" id="General">
              <div className="col-md-12 col-12 mb-2">Rating: {rating}</div>
              <div className="col-md-12 col-12 mb-2">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;

                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => {
                          setRating(ratingValue);
                          formik.setFieldValue("rating", ratingValue);
                        }}
                        // {...formik.getFieldProps('rating')}
                        style={{ visibility: "hidden" }}
                      />
                      <FaStar
                        className="star"
                        color={
                          ratingValue <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        size={25}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
                {formik.touched.rating && formik.errors.rating ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.rating}
                  </div>
                ) : null}
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label className="form-lable">Comments</label>
                <div className="mb-3">
                  <textarea
                    type="text"
                    rows={6}
                    className="form-control"
                    name="reviewComments"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reviewComments}
                    // {...formik.getFieldProps('reviewComments')}
                  />
                {formik.touched.reviewComments &&
                formik.errors.reviewComments ? (
                  <small className="text-danger">
                    {formik.errors.reviewComments}
                  </small>
                ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <span>
              <button
                className="btn btn-danger px-5"
                onClick={handleClose}
                // style={{ borderRadius: "20px" }}
                type="button"
              >
                Cancel
              </button>
            </span>
            <button
              type="submit"
              className="btn btn-primary px-5 py-2"
              id="NextMove"
              // disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default Popup;
