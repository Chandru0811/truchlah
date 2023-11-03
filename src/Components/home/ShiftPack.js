import Container from "react-bootstrap/Container";
import "../../styles/custom.css";
import boxImg from "../../asset/boxicon.png";
import monitorImg from "../../asset/monitorImg.png";
import calenderImg from "../../asset/itemShifting.png";
import moversImg from "../../asset/moversImg.png";
import itemShiftingImg from "../../asset/itemShifting.png";
import houseshiftingImg from "../../asset/houseShifting.png";
import industrialMoveImg from "../../asset/industrialMoveImg.png";
import commercialImg from "../../asset/commercialShifting.png";


function Containerpsd() {
  return (
    <div className="psd" id="Service">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <h1 data-aos="fade-up"> PACK </h1>
          </div>
          <div class="col">
            <h1 data-aos="fade-up">SHIFT </h1>
          </div>
          <div class="col">
            <h1 data-aos="fade-up"> DELIVER</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
function Card() {
  return (
    <center>
      <Container>
        <div className="firstcard">
          <div class="initalcard" data-aos="fade-up-right">
            <div class="container text-start">
              <div class="row ">
                <div class="col-lg-3 col-md-6 col-12">
                  <img src={boxImg} className="img-fluid my-3" id="cardimg" />
                  <h6>
                    <span>01</span> Give us a Details
                  </h6>
                  <p>
                    Choose vehicle type, addresses and date to receive instant
                    quotation
                  </p>
                </div>

                <div class="col-lg-3 col-md-6 col-12">
                  <img
                    src={monitorImg}
                    className="img-fluid my-3"
                    id="cardimg"
                  />

                  <h6>
                    <span>02</span> Provide an quote
                  </h6>
                  <p>Book manpower, shrink wrapping or assembly service</p>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                  <img
                    src={calenderImg}
                    className="img-fluid my-3"
                    id="cardimg"
                    style={{ width: "90px" }}
                  />

                  <h6>
                    <span>03</span> Confirm your date
                  </h6>
                  <p>
                    Trucklah will match your booking with a reputable driver
                  </p>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                  
                  <img
                    src={moversImg}
                    className="img-fluid my-3"
                    id="cardimg"
                  />

                  <h6>
                    <span>04</span> Move easily
                  </h6>
                  <p>
                    Pay cash to the driver or pay online using credit card or
                    online banking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </center>
  );
}

function Servicedivider() {
  return (
    <div className="dividerdiv">
      <div class="container text-center align-center">
        <div class="row">
          <div class="col">
            <hr></hr>
          </div>
          <div class="col">
            <div classname="dividerdivcontainer">
              <h6 data-aos="fade-up"> What We Do</h6>{" "}
            </div>
            <div data-aos="fade-down">
              <h2 > SERVICES</h2>
            </div>
          </div>
          <div class="col">
            <hr></hr>
          </div>
        </div>
      </div>
    </div>
  );
}

function Servicescard() {
  return (
    <div className="servicecardcontainer">
      <div class="container text-center justify-content-center">
        <div class="row">
          <div class="col-lg-3 col-md-6 pt-3 col-12">
            <div className="card pop-on-hover" data-aos="flip-left">
              <div className="shiftingcard">
                <img src={itemShiftingImg} />
                <center>
                  <div className="imgul my-2 align-center"></div>
                </center>
                <h6>Item Shifting</h6>
                <hr></hr>
                <p>We are very proud workforce have worked hard create.</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 pt-3 col-12">
            <div className="card pop-on-hover" data-aos="flip-right">
              <div className="shiftingcard ">
                <img src={houseshiftingImg} />
                <center>
                  <div className="imgul my-2 align-center"></div>
                </center>
                <h6>House Shifting</h6>
                <hr></hr>
                <p>We are very proud workforce have worked hard create.</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 pt-3 col-12">
            <div className="card pop-on-hover" data-aos="flip-left">
              <div className="shiftingcard">
                <img src={industrialMoveImg} />
                <center>
                  <div className="imgul my-2 align-center"></div>
                </center>

                <h6>Industrial Shifting</h6>
                <hr></hr>
                <p>We are very proud workforce have worked hard create.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 pt-3 col-12">
            <div className="card pop-on-hover" data-aos="flip-right">
              <div className="shiftingcard">
                <img src={commercialImg} />
                <center>
                  <div className="imgul my-2 align-center"></div>
                </center>

                <h6>Commercial Shifting</h6>
                <hr></hr>
                <p>We are very proud workforce have worked hard create.</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Packshiftdeliver() {
  return (
    <>
      <div className="fullbody">
        {/* heading pack shift deliver */}
        <Containerpsd />
        {/* Card functional Component  */}

        <div className="bottom">
          <Card />
          {/* Servicedivider functional component */}
          <Servicedivider />

          {/* Services Card */}
          <Servicescard />
        </div>
      </div>
    </>
  );
}

export default Packshiftdeliver;
