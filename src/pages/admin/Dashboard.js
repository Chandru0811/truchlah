import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../asset/logo.png";
import "../../styles/bootstrapCdn.css";
function Dashboard({ onLogout }) {
  const handleLogOutClick = () => {
    onLogout();
  };

  return (
    <nav
      className="navbar navbar-vertical h-100 navbar-expand-lg p-0 navbar-light border-end-lg"
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "250px",
        overflowY: "auto",
      }}
      id="navbarVertical"
    >
      <div className="container-fluid p-0 flex-column">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse flex-column"
          id="sidebarCollapse"
        >
          {" "}
          <NavLink
            style={{ background: "#fff"}}
            className={`navbar-brand logo_ats py-lg-2 px-lg-6 d-flex align-items-center justify-content-center p-4`}
            to="/"
          >
            <img src={Logo} alt="logo" style={{ width: "130px" }} />
          </NavLink>
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bx bx-bar-chart pe-3"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/vehicle-management">
                <i className="bx bx-car pe-3"></i> Vehicle Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/house-category-management">
                <i className="bx bx-home pe-3"></i> House Category
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/support-team-management">
                <i className="bx bx-support pe-3"></i> Support Team
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/user-management">
                <i className="bx bx-user pe-3"></i> User Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/driver-management">
                <i className="bx bx-id-card pe-3"></i> Driver Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/banners-and-offers">
                <i className="bx bx-gift pe-3"></i> Banners and Offers
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/booking-management">
                <i className="bx bx-calendar pe-3"></i> Booking Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/reviews-feedback">
                <i className="bx bx-message-square-dots pe-3"></i> Reviews and
                Feedback
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/contact-form">
                <i className="bx bx-envelope pe-3"></i> Contact Form
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bx bx-bar-chart pe-3"></i> User Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bx bx-bar-chart pe-3"></i> Driver Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bx bx-bar-chart pe-3"></i> Booking Management
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bx bx-bar-chart pe-3"></i> Reviews and Feedback
              </NavLink>
            </li>
            <li className="nav-item pt-2">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bx bx-bar-chart pe-3"></i> Contact Form
              </NavLink>
            </li>
          </ul>
          <div className="ps-4 mt-4 w-100">
            <button
              id="logoutbtn"
              className="text-start btn"
              onClick={handleLogOutClick}
            >
              <i className="bi bi-box-arrow-left pe-3"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Dashboard;
