import React, { useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import '../styles/Payment.css';
import card from "../asset/card.png";
import upi from "../asset/UPI.png";
import phpay from "../asset/phonePay (2).png";
import paytm from "../asset/paytm (2).png";
import apay from "../asset/amazonpay (2).png";
import gpay from "../asset/gpay (2).png";
import netbank from "../asset/netBanking.png";
import cash from "../asset/cashOnDelivery.png";
import discount from "../asset/discount.png";
import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Captcha from '../Components/Captcha';
import Mandy from '../Components/Mandy';
import { Link } from "react-router-dom";

const CardValidity = () => {


    const bankOptions = [
        'select an option',
        'State Bank of India (SBI)',
        'HDFC Bank',
        'ICICI Bank',
        'Punjab National Bank (PNB)',
        'Bank of Baroda (BOB)',
        'Canara Bank'
    ];
    const offerOption = [
        'select an option',
        '10% offer',
        '25% offer',
        '50% offer'];

    return (

        <div className="row" style={{backgroundColor: "#faf5f6"}}>
            <div className="container-fluid" style={{padding:'0%',margin: '0%'}}>
                <div>
                    <p className="col-12 text-center y py-5" id="bun">MAKE YOUR PAYMENT</p>

                </div >
            </div>
            <div className="container-fluid" style={{padding:'0%',margin: '0%'}}>

                <Table striped bordered hover className="tab container">
                    <tbody>
                        <tr >
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><img src={card} alt="card payment" style={{ float: 'left', height: '55px', width: '155px' }}></img>
                                        <label id="three" className="col-lg-6 col-md-6 col-sm-12 cardpay">
                                            CARD </label></Accordion.Header>
                                    <Accordion.Body >
                                        <form className='col-lg-3 col-md-6 col-sm-12' id="carddetail" sstyle={{ float: 'center' }}>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Enter Card Number" style={{ color: 'rgb(0,0,0,0.9)' }}
                                                className="mb-3">
                                                <Form.Control type="text" placeholder="Enter Card Number" /></FloatingLabel>
                                            <Form.Group controlId="cardValidity">
                                                <Mandy />
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="CVV" style={{ color: 'rgb(0,0,0,0.9)' }}
                                                    className="mb-3">
                                                    <Form.Control type="text" placeholder="CVV" /></FloatingLabel>
                                            </Form.Group>
                                            <button className='btn btn-primary btn-lg py-2 me-5'>pay       </button>
                                        </form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </tr>
                        <tr >
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><img src={upi} alt="card payment" style={{ float: 'left', height: '55px', width: '155px' }}></img>
                                        <label id="three" className="col-lg-6 col-md-6 col-sm-12 cardpay">
                                            UPI </label></Accordion.Header>
                                    <Accordion.Body >
                                        <button className='btn btn-lg py-2 me-5' >  <img src={gpay} style={{ height: '85px', width: '175px' }}></img> </button>
                                        <button className='btn btn-lg py-2 me-5'>  <img src={phpay} style={{ height: '95px', width: '175px' }}></img>   </button>
                                        <button className='btn btn-lg py-2 me-5'>  <img src={paytm} style={{ height: '95px', width: '175px' }} ></img>   </button>
                                        <button className='btn btn-lg py-2 me-5'>  <img src={apay} style={{ height: '95px', width: '175px' }}></img>   </button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </tr>
                        <tr >
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><img src={netbank} alt="card payment" style={{ float: 'left', height: '55px', width: '155px' }}></img>
                                        <label id="three" className="col-lg-6 col-md-6 col-sm-12 cardpay">
                                            NET BANKING </label></Accordion.Header>
                                    <Accordion.Body >
                                        <div>
                                            <select className='form-select-lg justify-content-center mx-3'>
                                                {bankOptions.map((bank, index) => (
                                                    <option key={index} value={bank}>{bank}</option>

                                                ))}

                                            </select>
                                            <button className='btn btn-primary btn-lg py-2 '>pay       </button>
                                        </div><br></br>

                                    </Accordion.Body>

                                </Accordion.Item>
                            </Accordion>


                        </tr>
                        <tr>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><img src={cash} alt="card payment" style={{ float: 'left', height: '55px', width: '155px' }}></img>
                                        <label id="three" className="col-lg-6 col-md-6 col-sm-12 cardpay">
                                            CASH ON DELIVERY</label></Accordion.Header>
                                    <Accordion.Body>
                                        <Captcha />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>


                        </tr>
                        <tr>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><img src={discount} className="mx-5"alt="card payment" style={{float: 'left', height: '55px', width: '65px' }}></img>
                                        <label id="three" className="col-lg-6 col-md-6 col-sm-12 cardpay ">
                                            Select coupon code</label></Accordion.Header>
                                    <Accordion.Body>
                                        <select className='form-select-lg justify-content-center mx-3'>
                                            {offerOption.map((offer, index) => (
                                                <option key={index} value={offer}>{offer}</option>

                                            ))}

                                        </select>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>


                        </tr>
                    </tbody>

                </Table>
                <div className="d-flex justify-content-between mx-5 px-5 mt-5 pt-5 pb-3 amount">
                    <span>
                       <b> <div className=""><p className='mb-1'> &#8377; 750.00</p>view details</div></b>
                    </span>
                    <span>
                        <div className="p-2"><Link to='/successful'> <button className='btn btn-info btn-lg py-2'id='rupees'>pay now    &#x2192;   </button></Link>
                        </div>
                    </span>
                </div>
            </div>
        </div >


    );
}

export default CardValidity;