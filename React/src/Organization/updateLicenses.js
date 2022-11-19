import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";


var jwt = require("jsonwebtoken");

const updateLicenses = () => {
    let token = localStorage.getItem('token')
      var decode1 = jwt.decode(token);
      var orgID = decode1.orgID
  
  
    const AddFormData = async (e) =>{
        const [data1, setData] = useState([])
        e.preventDefault();
        let token = localStorage.getItem('token')
      var decode1 = jwt.decode(token);
      let orgID = decode1.orgID
      console.log(orgID)
       
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;
        console.log(Formvlaues);




        const userlist = async () =>{
            await axios.get(`/findLicenses/${'6311a0de778efce58f2336db'}`)
            .then(resp =>{
                let data =resp.data.license
                console.log("===>>>",data);
                setData(data);
                
            })
        }

        useEffect(() => {
            userlist();
          }, [])

        }

        const sendRequest = async () =>{

        axios.post(`/orgLicenses/${'6311a0de778efce58f2336db'}`)
        .then(resp=>{
            if(resp.status){
            let data = resp.data;
            console.log("=====",data);
            console.log("==org===",orgID);
            if(data.status){
                toast.success(data.msg);
             
              }else{
                toast.error(data.msg);
              }
            }
        })

    }

    

   
     
    



    return (
        <div>
            <Header/>
            <Sidebar/>
             <section className="bg-gradient position-relative h-100vh p-0">
      <div className="home-table">
        <div className="home-table-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="text-center">
                </div>
                <div className="account_box bg-gradient" style={{marginTop: "30%"}}>
                  <div className="text-center">
                  <div className='formdetail'>
                    {/* <a href="https://chromepay.io/" className="d-inline-block">
                      <img src="assets/img/logo.png" alt="" className="mx-auto d-block login-logo"/>
                    </a> */}
                   </div>
                  </div>          
                  {/* <h5>Operator Login</h5> */}
                  <p id = 'errors' style = {{"color":"red"}} > </p>
                 
                  <form onSubmit={(e) => AddFormData(e)} >
                    {/* <div className="col-lg-12 ">
                      <label className="mb-2">Old Password</label>
                      <input className="form-control" placeholder="Enter your email"  type="password" name='oldPassword'  />
                    </div>
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2">New Password</label>
                      <input className="form-control" placeholder="Enter your password" type="password" name='newPassword' />
                    </div> */}
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2">Your Current Licenses</label>
                      <input className="form-control"  placeholder="Your Current Licenses" type="password" name='confirmPassword' />
                    </div>
                   
                    <div className="col-lg-12 mt-5">
                      <button type="submit" onClick={ sendRequest}  className="btn ripple btn-success w-100 mt-3" >Send Request</button>
                    </div>
                    <div>
                      {/* <p className="mb-0 text-center mt-3"><a href="forgot.php" className="">Have you forgotten your password?</a></p> */}
                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastContainer  position="top-right"  />   






 
        </div>
    );
}



export default updateLicenses