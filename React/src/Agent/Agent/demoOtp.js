import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AgentCustomerOtp() {
      
    const [otp, setOtp]=useState(new Array(4).fill(""));
    
    const handleChangeOtp = (element, index) => {
       if(isNaN(element.value)) return false;
       setOtp([...otp.map((d, idx) =>(idx === index) ? element.value : d)]);

      if(element.nextSibling){
        element.nextSibling.focus();
      }


    }
    
    async function loginOtp() 
  {

  let data=otp.join(""); 
  console.log(data);
  let result= await fetch('/verifyOTP', {
    method : 'POST',
    body:JSON.stringify(data), 
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        
    },
    
    
 });
      result = await result.json();
     if(result.status){
     
        // localStorage.setItem('token',result.token );
        window.location = "/agent-customer-list"
        // history.push ('admin');
        toast.success(result.msg);

    }else{

      toast.error(result.msg);
  }
   
    
  }
    
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
                                                 {otp.map((dataOtp, index) =>{
                                                    return(
                                                        <input className="otp m-2 text-center form-control rounded"
                                                         type="text"
                                                          value={dataOtp}   
                                                          name="otp"
                                                          key={index}
                                                          maxLength="1"
                                                          onChange={ e=> handleChangeOtp (e.target, index)} 
                                                          onFocus={e =>e.target.select()}
                                                          />
                                                    );
                                                 
                                                })}
                                                    
    
                                                    {/* <input className="otp m-2 text-center form-control rounded" type="text"
                                                   maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" />
                                                    <input className="otp m-2 text-center form-control rounded" type="text" 
                                                  maxLength="1" /> */}
                                                    
                                                </div>
                                                <p>OTP Enterd - {otp.join("")}</p>
                                                <div className="mt-4">
                                                  {/* <Link to='/addcustomer/otp/success' className="btn btn-primary">CONFIRM</Link> */}
                                                    <button type="button" className="btn btn-primary" onClick={loginOtp}>CONFIRM</button>
                                                    {/* <button  className="btn btn-secondry" onClick={(e)=>setOtp([...otp.map(v =>"")])}>Clear</button> */}
                                                </div>
                                            </form>
                                            <div className="card-2">
                                                <div className="content d-flex justify-content-center align-items-center">
                                                    <span>Didn't get the code</span> <a href="#" className="text-decoration-none ms-3">Resend OTP</a>
                                                </div>
                                                <Link to='/agent-customer-add' className="backbtn"><i className="fal fa-angle-double-left"></i>&nbsp;Back</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>


            <ToastContainer position="top-right"  />
        </>
    );
      
}  


export default AgentCustomerOtp