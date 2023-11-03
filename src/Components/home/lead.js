import React from "react";
import "../../styles/custom.css";
import truck from "../../asset/delivery-trucks-road.jpg";
function Lead() {
    return (
        <div className="container-fluid we py-5">

            <div className="container">
                <h4 className="text-center" data-aos="fade-up"> We Take The</h4>
                <h2 className="text-center" data-aos="fade-down">LEADING POSITION</h2>
                <div className="row d-flex align-items-center">

                    <div className="col-lg-5 col-md-6 col-12 d-flex justify-content-center">
                        <img id="icon" src={truck} alt="img" data-aos="zoom-in" className="img-fluid " />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12" id="point" >
                        <ul>
                            <li>Business it will frequently occur that pleasures.</li>
                            <li>Foresee the pain and trouble that are bound.</li>
                            <li>Make long term business decisions</li>
                            <li>Provide a service we are proud of</li>
                            <li>Be a responsible member of the community</li>
                            <li>Do what we like best, every pleasure is to be</li>
                            <li>Always seek to improve</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>


    );
}
export default Lead;