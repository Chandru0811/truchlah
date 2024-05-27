import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../asset/logo.png";
import { Link } from "react-router-dom";
import "../../styles/custom.css";
import React, { useState } from "react";
import User from "../../pages/profile/Profile";

function OffcanvasExample({ isAdmin, handleLogout }) {
  const [showMain, setShowMain] = useState(false);

  const handleCloseMain = () => setShowMain(false);
  const handleShowMain = () => setShowMain(true);

  return (
    <section className="header">
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
                          <div className="col-lg-9">
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
                              {isAdmin ? (
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
                          <div className="col-2">
                            <div className="d-flex justify-content-end">
                              <div className="me-2">
                                {isAdmin && (
                                  <User handleLogout={handleLogout} />
                                )}
                              </div>
                              <div className="ride ">
                                {isAdmin ? (
                                  <Link to="/shift">
                                    <li className="nav-item">
                                      <button
                                        type="button"
                                        className="btn btn-primary py-2"
                                        id="NextMove"
                                      >
                                        Book Rides
                                      </button>
                                    </li>
                                  </Link>
                                ) : (
                                  <Link to="/login">
                                    <li className="nav-item">
                                      <button
                                        type="button"
                                        className="btn btn-primary py-2"
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
