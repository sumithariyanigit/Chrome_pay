import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var jwt = require("jsonwebtoken");

 function SubadminAdd() {

  

    let token = localStorage.getItem('token')
    var decode1 = jwt.decode(token);
    let adminID = decode1.admminID

    const AddFormData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;

        console.log(Formvlaues);
        
        axios.post(`/addSubAdmin/${adminID}`, formData)
        .then(res => {
            if (res.status) {
                let data = res.data;
                console.log(data)
                if (data.status) {
                  toast.success(data.msg);
                  window.location = "/roles-add"
                  localStorage.setItem('ID',data.create._id );
                    
                   e.target.reset();
                } else {
                  toast.error(data.msg);
                }
              }
              else {
                toast.error(data.msg);
              }
        })
                
        }


    return (
       <>
        <Sidebar />
        <Header />
        <ToastContainer  position="top-right"  />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Add Subadmin</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">First Name</label>
                                           
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Firstname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name"  />
                                                    </div>
                                           
                                        </div>
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Last Name</label>
                            
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="lastName" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Last Name"  />
                                                        
                                                        
                                                    </div>
                                               
                                        </div>

                                       

                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                <span className="required">Contact Phone</span>
                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                                            </label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="tel" name="phone"  className="form-control form-control-lg form-control-solid" placeholder="Phone number" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6 required">Email Address</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="email" name="email"  className="form-control form-control-lg form-control-solid" placeholder="Email Address" />
                                            </div>
                                        </div>
                                        {/* <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Gender</label>
                                            <div className="col-lg-8 fv-row">
                                                <div className="d-flex align-items-center mt-3">

                                                    <label className="form-check form-check-inline form-check-solid me-5">
                                                        <input className="form-check-input" name="gender" type="radio" value="Male"  />
                                                        <span className="fw-semibold ps-2 fs-6">Male</span>
                                                    </label>
                                                    <label className="form-check form-check-inline form-check-solid">
                                                        <input className="form-check-input" name="gender" type="radio" value="Fmale"   />
                                                        <span className="fw-semibold ps-2 fs-6">Female</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div> */}


                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Address</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="address"  className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                            </div>
                                        </div>

                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Password</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="password" name="password"  className="form-control form-control-lg form-control-solid" placeholder="Password" />
                                            </div>
                                        </div>

                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Confirm Password</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="password" name="confirmPassword"  className="form-control form-control-lg form-control-solid" placeholder="Confirm Password" />
                                            </div>
                                        </div>

                                       
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Country</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="Country"  className="form-control form-control-lg form-control-solid" placeholder="Country" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">State</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="state"  className="form-control form-control-lg form-control-solid" placeholder="State" />
                                            </div>
                                        </div>
                                        


                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">City</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="city"  className="form-control form-control-lg form-control-solid" placeholder="City" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">

<label className="col-lg-4 col-form-label  fw-semibold fs-6">Role</label>

        <div className="col-lg-8 fv-row">
            {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}
            
            <select className="form-select border-0 flex-grow-1"
                            data-control="select2" data-placeholder="assetID"
                            data-hide-search="true" name='role'>
                                <option value="1" selected="selected"> Select Role</option>
                                <option value="sub_Admin" >Sub-Admin</option>
                                {/* <option value="Passport" > Passport</option>
                                <option value="Drivers" > Drivers Licence</option>
                                <option value="Notarised" > Notarised Document</option> */}
                            {/* {listorg.map((item)=>(
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))} */}
                            
                        </select>
        </div>

</div>
                                        
                                        
                                        
                                        

                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit"  className="btn btn-light btn-active-light-primary me-2">Submit</button>
                                       
                                    </div>
                                   
                                </form>
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


export default SubadminAdd