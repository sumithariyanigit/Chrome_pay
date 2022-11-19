import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import { useParams } from "react-router-dom";

function TransactionViewAgent() {
 const [data,setdata]= useState([]);
 const [transactionDate, setTranData] =useState('');
 const {_id} = useParams();

 const userlist = async (e) =>{
    const {ID} ={ ID : _id}
    console.log(ID);
    await axios.get(`/viewtransection/${ID}`)
    .then(resp => {
        const userData =resp.data.filter;
        const transDate = userData.transactionDate.slice(0,10);
        setdata(userData);
        console.log(userData);
        setTranData(transDate)
        console.log(transDate);
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
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Transaction Date</label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="date" name="transactionDate" value={transactionDate} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">PCN </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="PCN" value={data.PCN} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="password"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Pay In Cashier </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="PayInCashier" value={data.PayInCashier} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="PayInCashier"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Pay Out Cashier </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="PayOutCashier" value={data.PayOutCashier} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="PayOutCashier"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Sender Name </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="senderName" value={data.senderName} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Beneficiary Name </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="beneficiaryName" value={data.beneficiaryName} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Sending Amount </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="sendingAmount" value={data.sendingAmount} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Receiver Amount </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="receiverAmount" value={data.receiverAmount} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Relationship </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="Relationship" value={data.Relationship} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Status </label>
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="status" value={data.status} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder=""  />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                           
                                            
                                        
                                     
                                        
                                         
                                       


                                        </div>
                                       
                                        

                                       

                                       
                                        
                                       


                                       
                                        
                                        

                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit" className="btn btn-light btn-active-light-primary me-2">Update</button>
                                       
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



export default TransactionViewAgent