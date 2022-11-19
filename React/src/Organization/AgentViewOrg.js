import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import { useParams } from "react-router-dom";

function AgentViewOrg() {
 const [data,setdata]= useState([]);
 const [transactionDate, setTranData] =useState('');
 const {_id} = useParams();

 const userlist = async (e) =>{
    const {agentID} ={ agentID : _id}
    console.log(agentID);
    await axios.get(`/agentView/${agentID}`)
    .then(resp => {
        const userData =resp.data.filter;
        // const transDate = userData.transactionDate.slice(0,10);
        setdata(userData);
        console.log(userData);
        // setTranData(transDate)
        // console.log(transDate);
    })
 }

 useEffect(() => {
    userlist();
   }, [])


  return (
    <div>
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
                                    <h3 className="fw-bold m-0">Transaction Detail</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        

                                        <div className="row mb-8">

                                           
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Name</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="name" value={data.name} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Email </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="email" name="email" value={data.email} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="password"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Mobile </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="number" name="phone" value={data.phone} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="PayInCashier"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Agent Code</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="agentCode" value={data.agentCode} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="PayOutCashier"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Address </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="address" value={data.address} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Country </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="country" value={data.country} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">City  </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="city" value={data.city} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Post Code </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="postCode" value={data.postCode} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Transection Limit </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="transectionLimit" value={data.transectionLimit} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Status </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="status" value={data.status} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
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

    </div>
  )
}


export default AgentViewOrg