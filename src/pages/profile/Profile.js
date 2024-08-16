import React, { useState } from "react";
import "../../styles/custom.css";
import { Table } from "react-bootstrap";
// import wallet from "../../asset/wallet.png";
import rides from "../../asset/my rides.png";
// import refer from "../../asset/refer and earn.png";
// import rewards from "../../asset/rewards.png";
// import notification from "../../asset/notification.png";
// import support from "../../asset/support.png";
import about from "../../asset/about.png";
import { Link, useNavigate } from "react-router-dom";
// import invoice from "../../asset/invoice-logo.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CgProfile } from "react-icons/cg";
import profiles from "../../asset/user.png";
import { TbLogout } from "react-icons/tb";

function User({ handleLogout }) {
  const [, setShow] = useState(false);
  const userName = sessionStorage.getItem("username");
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseMain = () => setShow(false);

  const handleCloseProfile = () => {
    setShowProfile(false);
    setShow(false);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    handleCloseMain();
  };

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <>
      <div id="pro-btn">
        <button className="btn" onClick={handleShowProfile}>
          <CgProfile style={{ color: "#3E4D6A", fontSize: "24px" }} />
        </button>
      </div>

      <Offcanvas show={showProfile} onHide={handleCloseProfile} placement="end">
        <Offcanvas.Header
          style={{ alignItems: "start" }}
          className="view"
          closeButton
        >
          <div>
            <button
              type="button"
              className="btn logoutButton"
              onClick={onLogout}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Logout"
            >
              <TbLogout />
            </button>
          </div>
          <div className="w-100 centered">
            <Offcanvas.Title className="w-100">
              <div className="d-flex flex-column align-items-center">
                <img
                  className="img-fluid"
                  src={profiles}
                  alt="user"
                  width={100}
                />
                <p className="mb-0 mt-2">{userName}</p>
              </div>
            </Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 d-flex flex-column justify-content-between">
          <div>
            <Table className="data data-hover">
              <tbody>
                {/* <tr>
                  <td className="py-2">
                    <Link
                      to="/wallet"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img src={wallet} alt="wallet pic" className="got mx-3" />
                      <span>WALLET</span>
                    </Link>
                  </td>
                </tr> */}
                <tr>
                  <td className="py-2">
                    <Link
                      to="/rides"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img src={rides} alt="rides pic" className="got mx-3" />
                      <span>MY RIDES</span>
                    </Link>
                  </td>
                </tr>
                {/* <tr>
                  <td className="py-2">
                    <Link
                      to="/referearn"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img src={refer} alt="refer pic" className="got mx-3" />
                      <span>REFER AND EARN</span>
                    </Link>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className="py-2">
                    <Link
                      to="/coupons"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img
                        src={rewards}
                        alt="rewards pic"
                        className="got mx-3"
                      />
                      <span>REWARDS</span>
                    </Link>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className="py-2">
                    <Link
                      to="/invoice"
                      onClick={handleCloseProfile}
                      style={{ textDecoration: "none" }}
                      className="data-link"
                    >
                      <img src={invoice} alt="user pic" className="got mx-3" />
                      <span>Invoice</span>
                    </Link>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className="py-2">
                    <Link
                      to="/notification"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img
                        src={notification}
                        alt="notification pic"
                        className="got mx-3"
                      />
                      <span>NOTIFICATION</span>
                    </Link>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className="py-2">
                    <Link
                      to="/support"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img
                        src={support}
                        alt="support pic"
                        className="got mx-3"
                      />
                      <span>SUPPORT</span>
                    </Link>
                  </td>
                </tr> */}
                <tr>
                  <td className="py-2">
                    <Link
                      to="/about"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img src={about} alt="about pic" className="got mx-3" />
                      <span>ABOUT</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="p-3">
            <Link
              to="/changepassword"
              onClick={handleCloseProfile}
              className="data-link"
            >
              <button className="btn btn-danger w-100">Change Password</button>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default User;
