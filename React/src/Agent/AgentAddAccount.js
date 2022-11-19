import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

 function AgentAddAccount() {
    const [data ,setData] = useState([]);
    const {_id} = useParams();

    const AddFormData = async (e) => {
        const {customerID} ={ customerID : _id}
        console.log(customerID);

        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;
       
        
        console.log(Formvlaues);
        
        axios.post(`/addBankAccount/${customerID}`, formData)
        
                .then(resp => {
                    if(resp.status){
                        let data = resp.data;
                        if(data.status){
                            toast.success(data.msg);
                            window.location="/Agent-Add-Account-list";
                            e.target.reset();
                        }else{
                            toast.error(data.msg);

                        }
                    }else{
                        toast.error(data.msg)
                    }
                   
                    
                })
        }

       
    

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
                                <form  onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        

                                        <div className="row mb-8">

                                           
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Bank ID</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="bankID" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Eneter ID"  />
                                                    </div>
                                                </div>
                                            </div>
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
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Account Type</label>
                                                <div className="col-lg-8 fv-row">
                                                   <input type="text" name="Accounttype"  className="form-control form-control-lg form-control-solid" placeholder="Account Type" />
                                                </div>
                                             </div>      
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Bank Name</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Bankname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Eneter Name..."  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Bank Code</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Bankcode" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Eneter Code..."  />
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
                                            <div className="col-lg-6 mb-6">
                                            <div className="row ">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Branch Code</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="Branchcode"  className="form-control form-control-lg form-control-solid" placeholder="Branch code" />
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
                                                        <input type="text" name="IFSC"  className="form-control form-control-lg form-control-solid" placeholder="IFSC" />
                                                    </div>
                                                </div>
                                             </div>   
                                            
                                        
                                        <div className="col-lg-6 mb-6">
                                            <div className="row ">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Phone</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="Phonenumber"  className="form-control form-control-lg form-control-solid" placeholder="No..." />
                                                </div>
                                            </div>
                                        </div>
                                     
                                        <div className="col-lg-6 ">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">State </label>
                                                    <div className="col-lg-8 fv-row">
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
                                        <div className="col-lg-6 mb-8">
                                            <div className="row">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Country</label>
                                                <div className="col-lg-8 fv-row">
                                                   <input type="text" name="country"  className="form-control form-control-lg form-control-solid" placeholder="country" />
                                                </div>
                                             </div>      
                                            </div>
                                        
                                        <div className="col-lg-6 ">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Post Code </label>
                                                    <div className="col-lg-8 fv-row">
                                                    <input type="number" name="Postcode"  className="form-control form-control-lg form-control-solid position-relative" placeholder="Post Code" />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                            <div className="row ">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">City</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="City"  className="form-control form-control-lg form-control-solid" placeholder="City" />
                                                </div>
                                            </div>
                                        </div>
                                            <div className="col-lg-6 ">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Transit Number</label>
                                                    <div className="col-lg-8 fv-row">
                                                    <input type="number" name="Transitnumber"  className="form-control form-control-lg form-control-solid position-relative" placeholder="No.." />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                       


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




export default AgentAddAccount