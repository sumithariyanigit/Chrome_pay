import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import  Jwt  from "jsonwebtoken";

function AgentMyProfile() {
    const [data, setData] =useState([]);



    let token = localStorage.getItem('token')
      var decode1 = Jwt.decode(token);
     
      let agentID = decode1.agentID
      console.log(agentID)

     const UpdateFormData = async (e) => {
        
      
        e.preventDefault();

        const data = new FormData(e.target);
        const FormValues = Object.fromEntries(data.entries());
        const formData = FormValues;
        console.log(FormValues);

        axios.post(`/agentProfileUpdate/${agentID}`,formData)
        .then(resp=>{
            if(resp.status){
                let data =resp.data
                if(data.status){
                    toast.success(data.msg);
                    setData(data);
                    console.log(data)

                }else{
                    toast.error(data.msg)
                }
            }else{
                toast.error(data.msg);
            }
        });
        

     }



      const userlist = async () =>{
        await axios.get(`/agentProfile/${agentID}`)
        .then(res =>{
            let data = res.data.filter
            setData(data);
            console.log(data)

      });

     }

     useEffect(() => {
        userlist();
       }, [])
//-----------tranction-limit-----------//
const handleTransaction = (_id) => {
    console.log(_id)
    axios.post(`/updateTransectionLimit/${agentID}`)
    .then(resp =>{
        if(resp.status){
            let data =resp.data;
            toast.success(data.msg);
            // return userlist();
        }
    })
}
  return (
    <div>
        <ToastContainer/>
        <Header/>
        <Sidebar/>
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">My Prrofile</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => UpdateFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-6 justify-content-center">
                                        <label className="col-form-label fw-semibold fs-6" style={{}}>Profile</label>
                                            
                                            
                                         <div className="col-lg-8">
                                            <div className='row mb-6'>
                                        
                                            
                                                <div className="col-lg-6 fv-row">
                                                <label className="col-form-label required fw-semibold fs-6">Full Name</label>
                                                    <input type="text" name="fullname" defaultValue={data.name} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                                </div>
                                                
                                            <div className="col-lg-6 fv-row">
                                            <label className="col-form-label fw-semibold fs-6">Email </label>
                                                <input type="email" name="email" defaultValue={data.email}  className="form-control form-control-lg form-control-solid" placeholder="Email Address" />
                                            </div>
                                             

                                            <div className="col-lg-6 fv-row">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Password </label>
                                                <input type="password" name="password" defaultValue={data.password}  className="form-control form-control-lg form-control-solid" placeholder="password" />
                                            </div>
                                            
                                            <div className="col-lg-6 fv-row">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Phone </label>
                                                <input type="number" name="phone" defaultValue={data.phone}  className="form-control form-control-lg form-control-solid" placeholder="Phone" />
                                            </div>
                                        
                                            <div className="col-lg-6 fv-row">
                                            <label className=" col-form-label fw-semibold fs-6">Country </label>
                                                <input type="text" name="country" defaultValue={data.country}  className="form-control form-control-lg form-control-solid" placeholder="Country" />
                                            </div>

                                            <div className="col-lg-6 fv-row">
                                            <label className="col-form-label fw-semibold fs-6">City </label>
                                                <input type="text" name="city" defaultValue={data.city} className="form-control form-control-lg form-control-solid" placeholder="City" />
                                            </div>
                                            <div className="col-lg-6 fv-row">
                                            <label className="col-form-label fw-semibold fs-6">Address </label>
                                                <input type="text" name="addres" defaultValue={data.address}  className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                            </div>

                                            <div className="col-lg-6 fv-row">
                                            <label className="col-form-label fw-semibold fs-6">PostCode </label>
                                                <input type="number" name="postcode" defaultValue={data.postCode} className="form-control form-control-lg form-control-solid" placeholder="PostCode" />
                                            </div>

                                            <div className="row mb-6">
                                           
                                        <div className="col-lg-11 fv-row">
                                            <label className="col-form-label fw-semibold fs-6">transectionLimit </label>
                                                <input type="number" name="transectionLimit" defaultValue={data.transectionLimit} className="form-control form-control-lg form-control-solid" placeholder="transectionLimit" />
                                            </div>
                                            <div className="col-lg-1 fv-row text-end">
                                            <button type="button" onClick={(e)=>{ handleTransaction(data._id) }}
                                                     className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 m" style={{marginTop:"3.5rem"}}
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="send Email">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    <i class="fas fa-edit fs-4"></i>
                                                                        
                                                                    </span>

                                                                </button>
                                                    </div>
                                        </div>

                                            </div>
                                       
                                       
                                      
                                            
                                            
                                        
                                       
                                       
                                       
                                       
                                         </div>
                                        </div>


                                       


                                        

                                       
                                        
                                        


                                        

                                       
                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                    <button type="submit" className="btn btn-light btn-active-light-primary me-2" style={{backgroundColor:"#3c7f8c",color:"#fff"}}>Update</button>
                                       
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default AgentMyProfile