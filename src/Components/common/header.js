import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../asset/logo.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "../../styles/custom.css";
import React, { useState } from 'react';
import { Table } from "react-bootstrap";
import wallet from "../../asset/wallet.png";
import rides from "../../asset/my rides.png";
import refer from "../../asset/refer and earn.png";
import rewards from "../../asset/rewards.png";
import notification from "../../asset/notification.png";
import support from "../../asset/support.png";
import about from "../../asset/about.png";
// import logos from "../../asset/logos.png";
import User from "../../pages/profile/Profile";
import invoice from "../../asset/invoicebg.png";


function OffcanvasExample() {
  const [showMain, setShowMain] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseMain = () => setShowMain(false);
  const handleShowMain = () => setShowMain(true);

  const handleCloseProfile = () => {
    setShowProfile(false);
    setShowMain(false);  // Also close the main offcanvas
  };
  const handleShowProfile = () => {
    setShowProfile(true);
    handleCloseMain();  // Close the main offcanvas when opening the profile
  };

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
                <Navbar.Brand href="/">
                  <img src={logo} alt="Trucklah" className="img-fluid" />
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
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Trucklah
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="container-fluid">
                      <div className="row">
                        <Nav className="flex-grow-1 pe-3">
                          <div className="col-2"></div>
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
                            </ul>
                          </div>
                          <User />
                          {/* <div className="col-lg-1">
                            <div id="pro-btn">
                              <Link to="/user" onClick={handleShowProfile}>
                                <CgProfile style={{ color: "#3E4D6A" }} />
                              </Link>
                            </div>

                          </div> */}
                        </Nav>
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>

            {/* <Offcanvas show={showProfile} onHide={handleCloseProfile} placement="end">
              <Offcanvas.Header>
                <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={handleCloseProfile}></button>
                <div className="w-100 text-center">
                  <Offcanvas.Title className="w-100">
                    <div className="d-flex flex-column align-items-center">
                      <img className="img-fluid" src={User} alt="user" width={100} />
                      <p className="mb-0 mt-2">Users</p>
                    </div>
                  </Offcanvas.Title>
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Table className="table table-hover">
                  <tbody>
                    <tr>
                      <td className="py-1">
                        <Link to="/wallet" onClick={handleCloseMain} className="table-link">
                          <img src={wallet} alt="wallet pic" className="icon mx-3" />
                          <span>WALLET</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/rides" onClick={handleCloseMain} className="table-link">
                          <img src={rides} alt="rides pic" className="icon mx-3" />
                          <span>MY RIDES</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/referearn" onClick={handleCloseMain} className="table-link">
                          <img src={refer} alt="refer pic" className="icon mx-3" />
                          <span>REFER AND EARN</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/coupons" onClick={handleCloseMain} className="table-link">
                          <img src={rewards} alt="rewards pic" className="icon mx-3" />
                          <span>REWARDS</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/invoice" style={{ textDecoration: "none" }} className="table-link">
                          <img src={invoice} alt="user pic" className="icon mx-3" />
                          <span>Invoice</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/notification" onClick={handleCloseMain} className="table-link">
                          <img src={notification} alt="notification pic" className="icon mx-3" />
                          <span>NOTIFICATION</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/support" onClick={handleCloseMain} className="table-link">
                          <img src={support} alt="support pic" className="icon mx-3" />
                          <span>SUPPORT</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <Link to="/about" onClick={handleCloseMain} className="table-link">
                          <img src={about} alt="about pic" className="icon mx-3" />
                          <span>ABOUT</span>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </Table>

              </Offcanvas.Body>
            </Offcanvas> */}
          </>
        ))}
      </>
    </section>
  );
}

export default OffcanvasExample;
