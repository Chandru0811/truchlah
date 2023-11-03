import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../asset/logo.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "../../styles/custom.css";

function OffcanvasExample() {
  return (
    <section className="header">
      <>
        {["lg"].map((expand) => (
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
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
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
                          <ul class=" navbar-nav">
                            <li class="nav-item px-2">
                              <Link className="Links" to="/">
                                HOME
                              </Link>
                            </li>
                            <li class="nav-item px-2">
                              <Link className="Links" to="">
                                OUR SERVICES
                              </Link>
                            </li>
                            <li class="nav-item px-2">
                              <Link className="Links" to="/about">
                                ABOUT US
                              </Link>
                            </li>
                            <li class="nav-item px-2">
                              <Link className="Links" to="/contact">
                                CONTACT US
                              </Link>
                            </li>
                            <li class="nav-item px-2">
                              <Link className="Links" to="/register">
                                REGISTER
                              </Link>
                            </li>
                            <li class="nav-item px-2">
                              <Link className="Links" to="/login">
                                LOGIN
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-1">
                          <div id="pro-btn">
                            <Link to="/user">
                              <CgProfile style={{ color: "#3E4D6A" }} />
                            </Link>
                          </div>
                        </div>
                      </Nav>
                    </div>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    </section>
  );
}

export default OffcanvasExample;
