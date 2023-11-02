import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../asset/logo.png";
import "../styles/header.css";
import { Link } from "react-router-dom";

function MyApp() {
  return (
    <Navbar className="fixed-top " bg="light" expand="lg">
      <Navbar.Brand href="/">
        {" "}
        <img src={logo} alt="Trucklah" className="img-fluid" />
      </Navbar.Brand>
      <div className="col-2"></div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="col-10 mr-auto ">
          <ul class="navbar-nav ">
            <li class="nav-item px-2">
            <Link className="Links" to="/">HOME</Link>
            </li>
            <li class="nav-item px-2">
              <a className="nav-link" href="#Service">
                OUR SERVICES
              </a>
            </li>
            <li class="nav-item px-2">
              <a className="nav-link" href="#About">
                ABOUT US
              </a>
            </li>
            {/* <li class="nav-item">
                            <a className="nav-link" href="#">CAREER</a>
                        </li> */}
            <li class="nav-item px-2">
              <a className="nav-link" href="#Contact">
                CONTACT US
              </a>
            </li>
            <li class="nav-item px-2">
              <Link className="Links" to="/register">REGISTER</Link>
            </li>
            <li class="nav-item px-2">
              <Link className="Links" to="/login">LOGIN</Link>
            </li>
            <li class="nav-item px-2">
              <a className="nav-link" href="#">
                DRIVER PARTNER'S
              </a>
            </li>
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyApp;
