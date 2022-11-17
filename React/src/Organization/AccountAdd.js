import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

 function AccountAdd() {
    

    // const AddFormData = async (e) => {
        

    //     e.preventDefault();
    //     const data = new FormData(e.target);
    //     const Formvlaues = Object.fromEntries(data.entries());
        
    //     Formvlaues.Addsubagent = isChecked
    //     Formvlaues.performPayOut = isChecked1
    //     Formvlaues.cancelTarnsection = isChecked2
    //     Formvlaues.approveTransection = isChecked3
    //     Formvlaues.createdigitalID = isChecked4
    //     Formvlaues.cashierapprove = isChecked5
    //      const formData =  Formvlaues
        
    //     console.log(Formvlaues);
        
    //     axios.post(`/agentregister/6311a0de778efce58f2336db`, formData)
        
    //             .then(resp => {
    //                 if(resp.status){
    //                     let data = resp.data;
    //                     if(data.status){
    //                         toast.success(data.msg);
    //                         window.location="/agent-list";
    //                         e.target.reset();
    //                     }else{
    //                         toast.error(data.msg);

    //                     }
    //                 }else{
    //                     toast.error(data.msg)
    //                 }
                   
                    
    //             })
    //     }

       
    

    return (
       <>
       <ToastContainer/>
       <Sidebar />
        <Header />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Add Account</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form  id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        

                                        <div className="row mb-8">

                                           
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Account Number</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Accountnumber" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Eneter No..."  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Branch Name</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Branchname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Branch Name"  />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6  mb-8 ">
                                                <div className="row">
                                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Branch District</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Branchdistrict"  className="form-control form-control-lg form-control-solid" placeholder="Branch district" />
                                                    </div>
                                                </div>
                                           </div>
                                           <div className="col-lg-6  mb-8 ">
                                                <div className="row">
                                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                        <span className="required">IFSC Code</span>
                                                        <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                                                    </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="number" name="IFSC"  className="form-control form-control-lg form-control-solid" placeholder="IFSC" />
                                                    </div>
                                                </div>
                                             </div>   
                                             <div className="col-lg-6 mb-8">
                                            <div className="row">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Account Type</label>
                                                <div className="col-lg-8 fv-row">
                                                   <input type="text" name="Accounttype"  className="form-control form-control-lg form-control-solid" placeholder="Accounttype" />
                                                </div>
                                             </div>      
                                            </div>
                                        <div className="col-lg-6 mb-6">
                                            <div className="row ">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Branch Code</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="Branchcode"  className="form-control form-control-lg form-control-solid" placeholder="Branch code" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-6 mb-6">
                                            <div className="row ">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Address</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="address"  className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                                </div>
                                            </div>
                                        </div> */}
                                     
                                        <div className="col-lg-6 ">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">State </label>
                                                    <div className="col-lg-6 fv-row">
                                                    <input type="text" name="State"  className="form-control form-control-lg form-control-solid position-relative" placeholder="State" />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                            <div className="row ">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Document Number</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="Documentnumber"  className="form-control form-control-lg form-control-solid" placeholder="5" />
                                                </div>
                                            </div>
                                        </div>
                                            {/* <div className="col-lg-6 ">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6"></label>
                                                    <div className="col-lg-6 fv-row">
                                                    <input type="number" name="transectionLimit"  className="form-control form-control-lg form-control-solid position-relative" placeholder="limit" />
                                                    </div>
                                                </div>
                                                
                                            </div> */}
                                       


                                        </div>
                                       
                                        

                                       
                                       
                                        
                                       


                                       
                                        
                                        

                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit" className="btn btn-light btn-active-light-primary me-2">Submit</button>
                                       
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


export default AccountAdd