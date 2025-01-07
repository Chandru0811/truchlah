import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
// import wallet from "../../asset/wallet.png";
import rides from "../../asset/my rides.png";
// import refer from "../../asset/refer and earn.png";
// import rewards from "../../asset/rewards.png";
// import notification from "../../asset/notification.png";
// import support from "../../asset/support.png";
import about from "../../asset/about.png";
import password from "../../asset/change_password.webp";
import { Link, useNavigate } from "react-router-dom";
// import invoice from "../../asset/invoice-logo.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CgProfile } from "react-icons/cg";
import profiles from "../../asset/user.png";
import { TbLogout } from "react-icons/tb";
import { toast } from "react-toastify";
import { bookingApi, userApi } from "../../config/URL";

function User({ handleLogout, handleCloseMain }) {
  const [, setShow] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [data, setData] = useState([]);
  console.log("object", data);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Profile
    </Tooltip>
  );
  const handleClose = () => setShow(false);

  const handleCloseProfile = () => {
    setShowProfile(false);
    handleCloseMain();
    setShow(false);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    handleClose();
  };

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await userApi.get(`user/byId/${userId}`);
        if (response.data.success) {
          setData(response.data.responseBody);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };
    getData();
  }, [userId]);
  return (
    <>
      <div id="pro-btn">
        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
          <button className="btn" onClick={handleShowProfile}>
            <CgProfile style={{ color: "#3E4D6A", fontSize: "24px" }} />
          </button>
        </OverlayTrigger>
      </div>

      <Offcanvas show={showProfile} onHide={handleCloseProfile} placement="end">
        <Offcanvas.Header
          style={{ alignItems: "start" }}
          className="view"
          closeButton
        >
          {/* <div>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
            >
              <button
                type="button"
                className="btn logoutButton"
                onClick={onLogout}
              >
                <TbLogout />
              </button>
            </OverlayTrigger>
          </div> */}
          <div className="w-100 centered">
            <Offcanvas.Title className="w-100">
              <div className="d-flex flex-column align-items-center">
                <img
                  className="img-fluid"
                  src={profiles}
                  alt="user"
                  width={100}
                />
                <p className="mb-0 mt-2">
                  {data.firstName} {data.lastName}
                </p>
                {/* <p className="mb-0 mt-2">+{data.countryCode} {data.mobileNo}</p> */}
                <p className="mb-0 mt-2">
                  {data.mobileNo !== 0
                    ? `${
                        data?.countryCode === "+91" ||
                        data?.countryCode === "91"
                          ? "91"
                          : "65"
                      } ${data.mobileNo}`
                    : ""}
                </p>
                <p className="mb-0 mt-2">{data.email}</p>
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
                      <span>MY ORDERS</span>
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
                <tr>
                  <td className="py-2">
                    <Link
                      to="/changepassword"
                      onClick={handleCloseProfile}
                      className="data-link"
                    >
                      <img
                        src={password}
                        alt="about pic"
                        className="got mx-3"
                      />
                      <span>Change Password</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="p-3">
            <button onClick={onLogout} className="btn btn-danger w-100">
              <TbLogout size={20} /> Logout
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default User;
