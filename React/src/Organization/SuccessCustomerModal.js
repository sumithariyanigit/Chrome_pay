import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function SuccessCustomerModal() {
    return (
     <>
     <Sidebar />
     <Header />
     <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

     <div className="content d-flex flex-column flex-column-fluid justify-content-space" id="kt_content"  style={{ marginTop: "3.5rem"}}>

            <div className="container-xxl" id="kt_content_container">

              <div className="row g-5 g-xl-8 justify-content-center">
                <div className="col-lg-5">
                  <div className="card mb-5 mb-xl-10">
                 
                      <div className="position-relative mt-4">
                        <div className="card  bg-catd card-ip p-2 text-center mt-5 p-5 text-center">
                          <img src="/assets_new/images/success.gif" className="imgotp mb-3" />
                          <h5 className="customer_success">Customer  Added Successfully</h5>
                          <div> 
                          </div>
                         <h6 className="did">D-ID : <span>0xf64a058e8e15f5e791245f256b193e9eb3d1a7ed88812331c35cc41e8bd3f3ca</span></h6>
                          <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2 p-4">
                                                    <div className="mt-4">
                             <Link to='/addcustomer' className="btn btn-primary">Back</Link>
                          </div>
                       

                      
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