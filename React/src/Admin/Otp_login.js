import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

function Otp_login() { 
  let history = useHistory ();
  const [OTP, setOtp]=useState('');
  
  let ID = localStorage.getItem('ID')
  async function loginOtp() 
  {

  let data={OTP}; 
  console.log(data);
  let result= await fetch(`/otpVerificationAdmin/${ID}`, {
    method : 'POST',
    body:JSON.stringify(data), 
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        
    },
    
    
 });
      result = await result.json();
     if(result.status){
      console.log(result.token)
     
        localStorage.setItem('token',result.token );
        localStorage.setItem('ID',result.ID );
        window.location = "admin"
        // history.push ('admin');
        toast.success(result.msg);

    }else{

      toast.error(result.msg);
  }
   
    
  }
//   const log_sum = async (e) =>{
//     e.preventDefault();
//     let otp = e.target.Uotp.value ;
//     let email = localStorage.getItem('email');
    
//     if(email == ''){ window.location.href = '/';  }
      
//    if(otp == ''){    
//       document.querySelector("#errors").innerHTML = '***OTP field required';
//       setTimeout((e) =>{ document.querySelector("#errors").innerHTML =''; return false;  },3000) ;
//     }
   
//     const options = { headers:{"Content-type": "application/json" }};
//     var formData =  {"email" : email,"otp": otp };

//     const getData = async () => 
//                 {  try{
//                     let response = await axios.post('/verify_otp',formData,options);
//                     return   response.data;
//                   } catch(err){ console.error(err); return false;  }
//                }  
// let  serverData = await getData() ; 

//         console.log("serverData call == ");
//         console.log(serverData );
          
//     if(serverData.success)
//      { 
//        let  token = serverData.response; 
//       let   options_2 =  { headers:{"Content-type": "application/json","x-access-token" :token}};
//           let  serAllData = await verify_token({},options_2) ; 
//             console.log(serAllData);  
//             localStorage.setItem('token',token );
//             localStorage.setItem('first_name',serAllData.first_name );
//             localStorage.setItem('last_neme',serAllData.last_neme );
//             localStorage.setItem('address',serAllData.address );
//             localStorage.setItem('mobile',serAllData.mobile );
//             localStorage.setItem('time_exp',serAllData.exp );
//             localStorage.setItem('type',serAllData.type );
//             localStorage.setItem('loginTime',serAllData.loginTime );
            

//        window.location.href = 'Home';
//      }else{
//       document.querySelector("#errors").innerHTML = serverData.msg;
//       setTimeout((e) =>{ document.querySelector("#errors").innerHTML = ''; return false;  },3000) ;
//           }                             
  

//   }

//   const verify_token = async (formData,options) => 
//   {  try{
//       let response = await axios.post('/verify_token',formData,options);
//           return   response.data;

//     } catch(err){ console.error(err); return false;  }
//  }  

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
                  <form>
                    <div className="col-lg-12 mt-5">
                      <label className="mb-2">Enter OTP</label>
                      <input className="form-control" placeholder="Enter your Otp" type="number" value={OTP}
                                                        onChange={ (e)=>setOtp(e.target.value) } />
                    </div>
                    <div className="col-lg-12 mt-5 mb-5 bottom-space">
                      <button type="button" className="btn ripple btn-success w-100 mt-3" onClick={loginOtp}>Validate OTP</button>
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

export default Otp_login;