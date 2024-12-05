import React, { useEffect } from "react";
import "../../styles/custom.css";
import { Link, useSearchParams } from "react-router-dom";
import success from "../../asset/success logo.webp";
import errorimg from "../../asset/cancelimg-removebg-preview.png";
import toast from "react-hot-toast";
import { GiCancel } from "react-icons/gi";

function Successfull() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const bookingId = searchParams.get("bookingId");

  const bookingIdString = window.location.href.split("bookingId=")[1];
  const secondQueryPart = bookingIdString?.split("?")[1];
  const secondParams = new URLSearchParams(secondQueryPart);

  const result = secondParams.get("result");
  const refNo = secondParams.get("refNo");

  console.log("result", secondParams);
  
  // useEffect(() => {
  //   if (result === "success") {
  //     toast.success("Payment successful!");
  //   }else if(result === "error"){
  //     toast.error("Payment Failed!");
  //   }
  // }, []);

  return (
    // <section
    //   className="Success d-flex justify-content-center align-items-center "
    //   style={{ minHeight: "80vh" }}
    // >
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-lg-4 col-md-6 col-12">
    //         <div
    //           className={`card p-4 text-center cardStyle position-relative ${
    //             result === "error" && "pt-5 pb-4"
    //           }`}
    //         >
    //           <div className="d-flex justify-content-center align-items-center mb-3 icon-container">
    //             {result === "success" ? (
    //               <img
    //                 src={success}
    //                 className="img-fluid "
    //                 alt="Success"
    //                 style={{ maxWidth: "110%" }}
    //               />
    //             ) : (
    //               <img
    //                 src={errorimg}
    //                 className="img-fluid "
    //                 alt="Success"
    //                 style={{ maxWidth: "180%" }}
    //               />
    //             )}
    //           </div>
    //           {result === "success" && (
    //             <>
    //               <h4 className="titleStyle mt-5">Congratulations</h4>

    //               <span className="smallTextStyle">
    //                 Booking ID: {bookingId.split("?")[0]}
    //               </span>
    //             </>
    //           )}
    //           {result === "success" ? (
    //             <h5 className="mt-4" style={{ color: "#1bc24a" }}>
    //               Order Successful
    //             </h5>
    //           ) : (
    //             <h5 className="mt-4" style={{ color: "#e74c3c" }}>
    //               Payment Unsuccessful
    //             </h5>
    //           )}
    //           {result === "error"&&(
    //             <span className="smallTextStyle mt-2">
    //                 Booking Id: {bookingId.split("?")[0]}
    //               </span>
    //           )}
    //           {result === "success" ? (
    //             <p className="mt-2">Thank You</p>
    //           ) : (
    //             <p className="mt-4 mx-3">
    //               We encountered an issue processing your payment. Please check
    //               your details and try again.
    //             </p>
    //           )}
    //           {/* <p>Reference No: {refNo}</p> */}
    //           <center>
    //             {result === "success" ? (
    //               <Link to={`/rides?type=${type}`}>
    //                 <button
    //                   id="button"
    //                   type="button"
    //                   className="btn btn-success my-3 successBtn"
    //                 >
    //                   Done
    //                 </button>
    //               </Link>
    //             ) : (
    //               <Link to={`/support?type=${type}`}>
    //                 <button
    //                   id="support-button"
    //                   type="button"
    //                   className="btn btn-secondary my-3 mx-2 "
    //                   style={{width:"100%"}}
    //                 >
    //                   Contact Support
    //                 </button>
    //               </Link>
    //             )}
    //           </center>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="container mt-5 py-2">
    <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-12">
            <div className={`card p-4 text-center cardStyle position-relative ${result === "error" && "pt-5 pb-4"
                }`}
                style={{ minHeight: "60vh" }}>
                <div className="d-flex justify-content-center align-items-center mb-3 icon-container">
                    {result === "success" ? (
                        <img
                            src={success}
                            className="img-fluid img-responsive success-img"
                            alt="Success"
                        />
                    ) : (
                        <img
                            src={errorimg}
                            className="img-fluid img-responsive error-img"
                            alt="Error"
                        />
                    )}
                </div>
                {result === "success" ? (
                    <>
                        <h3 className="mt-4 p-1" style={{ color: "#1bc24a",fontSize:"24px" }}>
                            Order Placed Successfully!
                        </h3>
                    </>
                ) : (
                    <>
                        <h3 className="mt-4" style={{ color: "#e74c3c",fontSize:"24px" }}>
                            Payment Unsuccessfully!
                        </h3>
                    </>
                )}
                {result === "success" ? (
                    <span className="mt-4 fw-bold">
                        Booking ID: {bookingId}
                    </span>
                ) : (
                    <>
                    </>
                )}
                {result === "success" ? (
                    <span className="mt-4 fw-bold">
                       {/* {formData?.vehicle?.type?.split("_").join(" ")|| "1.7M_VAN" } */}
                    </span>
                ) : (
                    <></>
                )}
                {result === "success" ? (
                    <span className="mt-4 mb-4 fw-bold">
                        {/* {formData?.data?.transactionDetails?.txnRef || "TR_TXN20241107000049"} */}
                    </span>
                ) : (
                    <p className="mt-4 mx-3">
                        We encountered an issue processing your payment. Please check your
                        details and try again.
                    </p>
                )}
                <center>
                    {result === "success" ? (
                        <Link to={`/rides?type=${type}`}>
                            <button
                                id="button"
                                type="button"
                                className="btn btn-success my-3  successBtn border"
                            >
                                Done
                            </button>
                        </Link>
                    ) : (
                        <Link to={`/support?type=${type}`}>
                            <button
                                id="support-button"
                                type="button"
                                className="btn btn-secondary my-3 mx-2"
                                style={{ width: "100%" }}
                            >
                                Contact Support
                            </button>
                        </Link>
                    )}
                </center>
            </div>
        </div>
    </div>
</div >

  );
}

export default Successfull;
