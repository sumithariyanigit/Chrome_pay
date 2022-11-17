import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var jwt = require("jsonwebtoken");

function AgentTransactionLimit() {
    
    let token = localStorage.getItem('token');
    var decode1 = jwt.decode(token);

    let adminID = decode1.admminID
    const AddFormData = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const FormValues = Object.fromEntries(data.entries());
        const formData = FormValues;
        console.log(FormValues)
        axios.post(`/updateAgentTransection/${adminID}`,formData)
        .then(resp=>{
            if(resp.status){
                let data = resp.data
                if(data.status){
                    toast.success(data.msg);
                    
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
                                    <h3 className="fw-bold m-0">Agent Transaction Limit</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                            <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        

                                        <div className="row mb-8">
                                        <div className="mb-6">
                                          <h6 className="required fw-semibold fs-6">Transaction Limit</h6>
                                        </div>
                                           
                                            <div className="col-lg-4 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Agent ID</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="agentID" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=" Agent ID "  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Agent Limit</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="limit" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="5 "  />
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
    </div>
  )
}

export default AgentTransactionLimit