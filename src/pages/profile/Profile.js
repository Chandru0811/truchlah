import React, { useState } from "react";
import "../../styles/custom.css";
import { Table } from "react-bootstrap";
import wallet from "../../asset/wallet.png";
import rides from "../../asset/my rides.png";
import refer from "../../asset/refer and earn.png";
import rewards from "../../asset/rewards.png";
import notification from "../../asset/notification.png";
import support from "../../asset/support.png";
import about from "../../asset/about.png";
import { Link } from "react-router-dom";
import invoice from "../../asset/invoice-logo.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CgProfile } from 'react-icons/cg'; 
import profiles from "../../asset/user.png";

function User() {
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseMain = () => setShow(false);
  const handleShowMain = () => setShow(true);
  
  const handleCloseProfile = () => {
    setShowProfile(false);
    setShow(false); 
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    handleCloseMain(); 
  };

  return (
    <>

       <div id="pro-btn">
        <Link to="" onClick={handleShowProfile}>
          <CgProfile style={{ color: "#3E4D6A" }} />
        </Link>
      </div>

      {/* Offcanvas for main user profile */}
      {/* <Offcanvas show={show} onHide={handleCloseMain} placement="end">
        <Offcanvas.Header>
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={handleCloseMain}></button>
          <div className="w-100 text-center">
            <Offcanvas.Title className="w-100">
              <div className="d-flex flex-column align-items-center">
                <img className="img-fluid" src={profiles} alt="profiles pic" width={100} />
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
                    <img src={wallet} alt="wallet pic" className="got mx-3" />
                    <span>WALLET</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/rides" onClick={handleCloseMain} className="table-link">
                    <img src={rides} alt="rides pic" className="got mx-3" />
                    <span>MY RIDES</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/referearn" onClick={handleCloseMain} className="table-link">
                    <img src={refer} alt="refer pic" className="got mx-3" />
                    <span>REFER AND EARN</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/coupons" onClick={handleCloseMain} className="table-link">
                    <img src={rewards} alt="rewards pic" className="got mx-3" />
                    <span>REWARDS</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/invoice" style={{ textDecoration: "none" }} className="table-link">
                    <img src={invoice} alt="user pic" className="got mx-3" />
                    <span>Invoice</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/notification" onClick={handleCloseMain} className="table-link">
                    <img src={notification} alt="notification pic" className="got mx-3" />
                    <span>NOTIFICATION</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/support" onClick={handleCloseMain} className="table-link">
                    <img src={support} alt="support pic" className="got mx-3" />
                    <span>SUPPORT</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  <Link to="/about" onClick={handleCloseMain} className="table-link">
                    <img src={about} alt="about pic" className="got mx-3" />
                    <span>ABOUT</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
          
        </Offcanvas.Body>
      </Offcanvas> */}

      {/* Offcanvas for profile */}
      <Offcanvas show={showProfile} onHide={handleCloseProfile} placement="end">
        <Offcanvas.Header className="view">
          <button type="button" className="closed " aria-label="Close" onClick={handleCloseProfile}></button>
          <div className="w-100 centered">
            <Offcanvas.Title className="w-100">
              <div className="d-flex flex-column align-items-center">
                <img className="img-fluid" src={profiles} alt="user" width={100} />
                <p className="mb-0 mt-2">Users</p>
              </div>
            </Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Table className="data data-hover">
            <tbody>
              <tr>
                <td className="py-2">
                  <Link to="/wallet" onClick={handleCloseProfile} className="data-link">
                    <img src={wallet} alt="wallet pic" className="got mx-3" />
                    <span>WALLET</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/rides" onClick={handleCloseProfile} className="data-link">
                    <img src={rides} alt="rides pic" className="got mx-3" />
                    <span>MY RIDES</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/referearn" onClick={handleCloseProfile} className="data-link">
                    <img src={refer} alt="refer pic" className="got mx-3" />
                    <span>REFER AND EARN</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/coupons" onClick={handleCloseProfile} className="data-link">
                    <img src={rewards} alt="rewards pic" className="got mx-3" />
                    <span>REWARDS</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/invoice" onClick={handleCloseProfile} style={{ textDecoration: "none" }} className="data-link">
                    <img src={invoice} alt="user pic" className="got mx-3" />
                    <span>Invoice</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/notification" onClick={handleCloseProfile} className="data-link">
                    <img src={notification} alt="notification pic" className="got mx-3" />
                    <span>NOTIFICATION</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/support" onClick={handleCloseProfile} className="data-link">
                    <img src={support} alt="support pic" className="got mx-3" />
                    <span>SUPPORT</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link to="/about" onClick={handleCloseProfile} className="data-link">
                    <img src={about} alt="about pic" className="got mx-3" />
                    <span>ABOUT</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* You can add more content related to the user profile here */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default User;
