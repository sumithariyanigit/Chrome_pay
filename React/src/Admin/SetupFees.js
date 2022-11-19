import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";


var jwt = require("jsonwebtoken");

const SetupFees = () => {
  
    const [listorg, setlistOrg] =useState([]);
    const userlist = async () =>{
        await axios.get(`/orgList`)
         .then(resp =>{
             let data = resp.data.Org;
             setlistOrg(data);
             console.log(data);
         })
     }

     useEffect(() => {
        userlist();
      }, [])
      
 
    const AddFormData = async (e) =>{
        e.preventDefault();
        let token = localStorage.getItem('token')
      var decode1 = jwt.decode(token);
      let adminID = decode1.admminID
       
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;
        console.log("===>",Formvlaues.organisation);
        let dataToSend2 = new FormData();
        dataToSend2.append('RecurringFees', Formvlaues.RecurringFees);
        dataToSend2.append('LicenceFees', Formvlaues.LicenceFees);
        dataToSend2.append('orgID', Formvlaues.orgID);
        
        axios.post(`/addFeeSetup/${adminID}`,formData)
        .then(resp=>{
            if(resp.status){
            let data = resp.data;
            console.log(data);
            if(data.status){
                toast.success(data.msg);
             
              }else{
                toast.error(data.msg);
              }
            }else{
                toast.error(data.msg);
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
                    <div className="col-lg-12 ">
                      <label className="mb-2">Organzation</label>
                      <select className="form-select border-0 flex-grow-1"
                            data-control="select2" data-placeholder="organisation"
                         data-hide-search="true" name='orgID'>
                                    <option value="1" selected="selected"> Select Organisation</option>
                                                {listorg.map((item)=>(
                                                     <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                                                                        
                     </select>
                    </div>
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2">Recurring Fee</label>
                      <input className="form-control" placeholder="Enter total  fess" type="text" name='RecurringFees' />
                    </div>
                    <div className="col-lg-12 mt-3 ">
                      <label className="mb-2">Licence Fee</label>
                      <input className="form-control" placeholder="Enter total license" type="text" name='LicenceFees' />
                    </div>
                   
                    <div className="col-lg-12 mt-5">
                      <button type="submit"  className="btn ripple btn-success w-100 mt-3" >Set Fee</button>
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



export default SetupFees