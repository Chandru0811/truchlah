import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Modal,
  Button,
} from "react-bootstrap";
import logo from "../../asset/logo.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../styles/custom.css";
import React, { useEffect, useState } from "react";
import User from "../../pages/profile/Profile";

function OffcanvasExample({ isAuthenticate, handleLogout }) {
  const [showMain, setShowMain] = useState(false);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  console.log("Current path:", currentPath);

  // Handle for the first modal
  const handleCloseMain = () => setShowMain(false);
  const handleShowMain = () => setShowMain(true);
  const handleShow = () => setShow(true);
  const handleClose = () => {setShow(false)};

  return (
    <section className="header">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel the order?</Modal.Body>
        <Modal.Footer className="p-1">
          <button className="btn btn-danger btn-sm px-3" onClick={handleClose}>No</button>
          <button className="btn btn-info btn-sm px-3" onClick={()=>{handleClose(); navigate("/shift")}}>Yes</button>
        </Modal.Footer>
      </Modal>
      <>
        {["lg"].map((expand) => (
          <>
            <Navbar
              key={expand}
              bg="light"
              expand={expand}
              className="fixed-top"
              id="img"
            >
              <Container fluid>
                <Navbar.Brand>
                  <Link to="/">
                    <img src={logo} alt="Trucklah" className="img-fluid" />
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  onClick={handleShowMain}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                  show={showMain}
                  onHide={handleCloseMain}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Trucklah
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="container-fluid">
                      <div className="row">
                        <Nav className="flex-grow-1 pe-3">
                          <div className="col-1"></div>
                          <div className="col-lg-8">
                            <ul className=" navbar-nav">
                              <li className="nav-item px-2">
                                <Link className="Links" to="/">
                                  HOME
                                </Link>
                              </li>
                              <li className="nav-item px-2">
                                <Link className="Links" to="/ShiftPack">
                                  OUR SERVICES
                                </Link>
                              </li>
                              <li className="nav-item px-2">
                                <Link className="Links" to="/about">
                                  ABOUT US
                                </Link>
                              </li>
                              <li className="nav-item px-2">
                                <Link className="Links" to="/contact">
                                  CONTACT US
                                </Link>
                              </li>
                              {/* <li className="nav-item px-2">
                                <Link className="Links" to="/pricing">
                                  PRICING
                                </Link>
                              </li> */}
                              {isAuthenticate ? (
                                <></>
                              ) : (
                                <>
                                  <li className="nav-item px-2">
                                    <Link className="Links" to="/register">
                                      REGISTER
                                    </Link>
                                  </li>
                                  <li className="nav-item px-2">
                                    <Link className="Links" to="/login">
                                      LOGIN
                                    </Link>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="col-3">
                            <div className="d-lg-flex justify-content-end">
                              <div className="me-2">
                                {isAuthenticate && (
                                  <User handleLogout={handleLogout} />
                                )}
                              </div>
                              <div className="ride ">
                                {isAuthenticate ? (
                                  currentPath === "/map" ||
                                  currentPath === "/service" ? (
                                    <li className="nav-item">
                                      <button
                                        onClick={handleShow}
                                        style={{ minWidth: "max-content" }}
                                        type="button"
                                        className="py-2 px-3"
                                        id="NextMove"
                                      >
                                        Book Rides
                                      </button>
                                    </li>
                                  ) : (
                                    <Link to="/shift">
                                      <li className="nav-item">
                                        <button
                                          style={{ minWidth: "max-content" }}
                                          type="button"
                                          className="py-2 px-3"
                                          id="NextMove"
                                        >
                                          Book Rides
                                        </button>
                                      </li>
                                    </Link>
                                  )
                                ) : (
                                  <Link to="/login">
                                    <li className="nav-item">
                                      <button
                                        style={{ minWidth: "max-content" }}
                                        type="button"
                                        className="py-2 px-3"
                                        id="NextMove"
                                      >
                                        Book Rides
                                      </button>
                                    </li>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </Nav>
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          </>
        ))}
      </>
      
    </section>
  );
}

export default OffcanvasExample;
