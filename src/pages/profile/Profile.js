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
import invoice from "../../asset/invoicebg.png";

import Offcanvas from "react-bootstrap/Offcanvas";

function User() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> <div className="d-flex align-items-center justify-content-center">
          <img className="img-fluid" src={User} alt="user" width={100} />
          <p className="mb-0 ms-2">Users</p>

        </div></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* <Link to="/user" onClick={handleClose}>User Profile</Link> */}
        <Table className="table table-hover">
          <tbody>
            <tr>
              <td className="">
                <Link to="/wallet"   className="table-link">
                  <img src={wallet} alt="wallet pic" className="icon mx-3" />
                  <span>WALLET</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="">
                <Link to="/rides"   className="table-link">
                  <img src={rides} alt="rides pic" className="icon mx-3" />
                  <span>MY RIDES</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <Link to="/referearn"   className="table-link">
                  <img src={refer} alt="refer pic" className="icon mx-3" />
                  <span>REFER AND EARN</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <Link to="/coupons"   className="table-link">
                  <img src={rewards} alt="rewards pic" className="icon mx-3" />
                  <span>REWARDS</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <Link to="/invoice" style={{ textDecoration: "none" }}>
                  <img src={invoice} alt="user pic" className="mx-4" />
                  <span>Invoice</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <Link to="/notification"   className="table-link">
                  <img src={notification} alt="notification pic" className="icon mx-3" />
                  <span>NOTIFICATION</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <Link to="/support"   className="table-link">
                  <img src={support} alt="support pic" className="icon mx-3" />
                  <span>SUPPORT</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <Link to="/about"   className="table-link">
                  <img src={about} alt="about pic" className="icon mx-3" />
                  <span>ABOUT</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* You can add more content related to the user profile here */}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default User;
