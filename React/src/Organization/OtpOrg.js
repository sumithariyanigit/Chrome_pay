import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

function OtpOrg() { 
  const [phoneno, setPhoneno]= useState('');
  const phone = localStorage.getItem('phone');
  console.log(phone);
   const OtpFormData = async (e) =>{
         e.preventDefault();

         const data = new FormData(e.target);
         const FormValues = Object.fromEntries(data.entries());
         const formData = FormValues;
         console.log(FormValues);

         axios.post(`/verifyCustomer`,formData)
         .then(resp=>{
          if(resp.status){
            let data =resp.data
            if(data.status){
              toast.success(data.msg);
              window.location = "/customer-list";
            }else{
              toast.error(data.msg)
            }
          }else{
            toast.error(data.msg)
          }
         })

         
   }

    return (
        <div>
            <ToastContainer position="top-right"  />
            <section className="bg-gradient position-relative h-100vh p-0">
      <div className="home-table">
        <div className="home-table-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 mt-5">
                <div className="text-center">
                </div>
                <div className="account_box bg-gradient">
                  <div className="text-center">
                    <a href="https://chromepay.io/" className="d-inline-block">
                      <img src="assets/img/logo.png" alt="" className="img-fluid mx-auto d-block login-logo boot"/>
                    </a>
                  </div>
                  {/* <h5>Operator Enter OTP</h5> */}
                  <p id = 'errors' style = {{"color":"red"}} > </p>
                  <form onSubmit={(e) => OtpFormData(e)}>
                    <div className="col-lg-12 mt-5">
                      <label className="mb-2">OTP</label>
                      <input className="form-control" placeholder="Enter your Otp" type="number" name="OTP"  />
                    </div>
                    <div className="col-lg-12 mt-5">
                      <label className="mb-2">Phone</label>
                      <input className="form-control" placeholder="Enter your Phone" type="number" name="phoneNo" value={phone}  />
                    </div>
                    <div className="col-lg-12 mt-5 mb-5 bottom-space">
                      <button type="submit" className="btn ripple btn-success w-100 mt-3" >Validate OTP</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
    
        </div>
    );
}



export default OtpOrg