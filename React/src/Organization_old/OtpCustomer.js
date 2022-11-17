import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

 export default function OtpCustomer() {

    return (
        <>
            <Sidebar />
            <Header />
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div className="content d-flex flex-column flex-column-fluid justify-content-space" style={{ marginTop: "3.5rem"}} id="kt_content">
                    <div className="container-xxl mt-5" id="kt_content_container" >
                        <div className="row g-5 g-xl-8 justify-content-center">
                            <div className="col-lg-5">
                                <div className="card mb-5 mb-xl-10">
                                    <div className="position-relative mt-4">
                                        <div className="card  card-ip p-2 text-center mt-5 p-5 text-center">
                                            <img src="/assets_new/images/otp.png" className="imgotp" />
                                            <h6 className="pt-5">Please enter the one time password <br /> to verify your account</h6>
                                            <div> <span>A code has been sent to</span> <small>*******9897</small>
                                            </div>
                                            <form>
                                                <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2 p-4">

                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text"
                                                   maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" />
                                                </div>
                                                <div className="mt-4">
                                                  <Link to='/addcustomer/otp/success' className="btn btn-primary">CONFIRM</Link>
                                                    {/* <button type="submit" className="btn btn-primary">CONFIRM</button> */}
                                                </div>
                                            </form>
                                            <div className="card-2">
                                                <div className="content d-flex justify-content-center align-items-center">
                                                    <span>Didn't get the code</span> <a href="#" className="text-decoration-none ms-3">Resend OTP</a>
                                                </div>
                                                <Link to='/addcustomer' className="backbtn"><i className="fal fa-angle-double-left"></i>&nbsp;Back</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>


          
        </>
    );
      
}  
