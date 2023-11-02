import React from "react";
import ContactImg from '../asset/contact image.png';
import "../styles/custom.css";
function Section3() {
    return (
        <section className="Contact py-4" id="Contact">
            <div className="container" >
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center justify-content-center" >
                        <img className="img-fluid" src={ContactImg} alt="logo" data-aos="flip-up" style={{borderRadius: '5px'}} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 py-3" id="ContactForm">
                        <form className="px-5">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Text Area</label>
                                <textarea className="form-control"></textarea>
                            </div>
                            <div className="text-center my-4">
                                <button className="btn btn-primary py-2" id="Contactbtt" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Section3;