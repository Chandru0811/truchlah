import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const DeleteModel = ({ onSuccess, onDelete }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDelete = async () => {
    try {
      const response = await onDelete();
      if (response.status === 201 || response.status === 200) {
        onSuccess();
        toast.success(response.data.message);
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting data:", error.message);
    }
  };

  return (
    <>
      <button
        className="btn btn-light btn-sm shadow-none border-none"
        onClick={handleShow}
      >
        <MdDelete />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm p-3 btn-secondary text-danger-hover linkPadding"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn btn-sm p-3 btn-danger text-danger-hover linkPadding"
            onClick={handelDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModel;
