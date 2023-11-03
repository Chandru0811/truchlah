import React from "react";
import "../styles/custom.css";
import { Table } from "react-bootstrap";
import wallet from "../asset/wallet.png";
import rides from "../asset/my rides.png";
import refer from "../asset/refer and earn.png";
import rewards from "../asset/rewards.png";
import notification from "../asset/notification.png";
import support from "../asset/support.png";
import about from "../asset/about.png";
import { Link } from "react-router-dom";
import pro from "../asset/profile.png";

function User() {
  return (
    <div className="container-fluid" id="pic">
      <div className="col-12 container">
        <img
          src={pro}
          alt="user pic"
          className="my-4"
          style={{ height: "50", width: "100" }}
        />
        <b>
          {" "}
          <p className=" px-5">Jhon Cena </p>
          <p className=" px-4">9486494325</p>
        </b>
      </div>

      <div className="col-12 container-fluid  py-5" id="menu">
        <div className="col-12 my-5">
          <Table className="table">
            <tbody>
              <tr>
                {" "}
                <td className="py-4 ">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={wallet} alt="user pic" className="mx-4" />
                    <span>WALLET</span>
                  </Link>
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  <Link to="/rides" style={{ textDecoration: "none" }}>
                    <img src={rides} alt="user pic" className="mx-4" />
                    <span>MY RIDES</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={refer} alt="user pic" className="mx-4" />
                    <span>REFER AND EARN</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <Link to="/coupons" style={{ textDecoration: "none" }}>
                    <img src={rewards} alt="user pic" className="mx-4" />
                    <span>REWARDS</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={notification} alt="user pic" className="mx-4" />
                    <span>NOTIFICATION</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={support} alt="user pic" className="mx-4" />
                    <span>SUPPORT</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={about} alt="user pic" className="mx-4" />
                    <span>ABOUT</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default User;
