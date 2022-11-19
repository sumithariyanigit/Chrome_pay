import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
var jwt = require("jsonwebtoken");

 function AgentAdd() {
    const [isChecked, setIsChecked] = useState(0);
    const [isChecked1, setIsChecked1] = useState(0);
    const [isChecked2, setIsChecked2] = useState(0);
    const [isChecked3, setIsChecked3] = useState(0);
    const [isChecked4, setIsChecked4] = useState(0);
    const [isChecked5, setIsChecked5] = useState(0);
    const [isChecked6, setIsChecked6] = useState(0);
    const [isChecked7, setIsChecked7] = useState(0);
    const [isChecked8, setIsChecked8] = useState(0);
    const [isChecked9, setIsChecked9] = useState(0);
    const [isChecked10, setIsChecked10] = useState(0);
    const [isChecked11, setIsChecked11] = useState(0);
    const [isChecked12, setIsChecked12] = useState(0);
    const [isChecked13, setIsChecked13] = useState(0);
    const [isChecked14, setIsChecked14] = useState(0);
    const [isChecked15, setIsChecked15] = useState(0);
 
    const handleOnChange = (event) => {
        if(isChecked == 1)
        {
            setIsChecked(0);
        }
        if(isChecked == 0)
        {
            setIsChecked(1);
        }
       console.log(isChecked)
     };

     const handleOnChangePayOut = (e) => {
        if(isChecked1 == 1)
        {
            setIsChecked1(0);
        }
        if(isChecked1 == 0)
        {
            setIsChecked1(1);
        }
       console.log(isChecked)
     };
     const handleOnChangecancelTarnsection = (e) => {
        if(isChecked2 == 1)
        {
            setIsChecked2(0);
        }
        if(isChecked2 == 0)
        {
            setIsChecked2(1);
        }
       console.log(isChecked2)
     };
     const handleOnChangeapproveTransection = (e) => {
        if(isChecked3 == 1)
        {
            setIsChecked3(0);
        }
        if(isChecked3 == 0)
        {
            setIsChecked3(1);
        }
       console.log(isChecked3)
     };
     const handleOnChangecreatedigitalID = (e) => {
        if(isChecked4 == 1)
        {
            setIsChecked4(0);
        }
        if(isChecked4 == 0)
        {
            setIsChecked4(1);
        }
       console.log(isChecked4)
     };
     const handleOnChangecashierapprove = (e) => {
        if(isChecked5 == 1)
        {
            setIsChecked5(0);
        }
        if(isChecked5 == 0)
        {
            setIsChecked5(1);
        }
       console.log(isChecked5)
     };
     const handleOnChangeBranchname = (e) => {
        if(isChecked6 == 1)
        {
            setIsChecked6(0);
        }
        if(isChecked6 == 0)
        {
            setIsChecked6(1);
        }
       console.log(isChecked6)
     };
     const handleOnChangeBranchdistrict = (e) => {
        if(isChecked7 == 1)
        {
            setIsChecked7(0);
        }
        if(isChecked7 == 0)
        {
            setIsChecked7(1);
        }
       console.log(isChecked7)
     };
     const handleOnChangeIFSC = (e) => {
        if(isChecked8 == 1)
        {
            setIsChecked8(0);
        }
        if(isChecked8 == 0)
        {
            setIsChecked8(1);
        }
       console.log(isChecked8)
     };
     const handleOnChangeCountry  = (e) => {
        if(isChecked9 == 1)
        {
            setIsChecked9(0);
        }
        if(isChecked9 == 0)
        {
            setIsChecked9(1);
        }
       console.log(isChecked9)
     };
     const handleOnChangeCity  = (e) => {
        if(isChecked10 == 1)
        {
            setIsChecked10(0);
        }
        if(isChecked10 == 0)
        {
            setIsChecked10(1);
        }
       console.log(isChecked10)
     };
     const handleOnChangeAddress  = (e) => {
        if(isChecked11 == 1)
        {
            setIsChecked11(0);
        }
        if(isChecked11 == 0)
        {
            setIsChecked11(1);
        }
       console.log(isChecked11)
     };
     const handleOnChangePostcode  = (e) => {
        if(isChecked12 == 1)
        {
            setIsChecked12(0);
        }
        if(isChecked12 == 0)
        {
            setIsChecked12(1);
        }
       console.log(isChecked11)
     };
     const handleOnChangeState  = (e) => {
        if(isChecked13 == 1)
        {
            setIsChecked13(0);
        }
        if(isChecked13 == 0)
        {
            setIsChecked13(1);
        }
       console.log(isChecked13)
     };
     const handleOnChangeDocument  = (e) => {
        if(isChecked14 == 1)
        {
            setIsChecked14(0);
        }
        if(isChecked14 == 0)
        {
            setIsChecked14(1);
        }
       console.log(isChecked14)
     };
     const handleOnChangePhone  = (e) => {
        if(isChecked15 == 1)
        {
            setIsChecked15(0);
        }
        if(isChecked15 == 0)
        {
            setIsChecked15(1);
        }
       console.log(isChecked15)
     };
     

    const AddFormData = async (e) => {
        let token = localStorage.getItem('token')
        var decode1 = jwt.decode(token);
        let orgID = decode1.OrganisationID

        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        
        Formvlaues.Accounttyperequired = isChecked
        Formvlaues.Bankcoderequired = isChecked1
        Formvlaues.Banknamerequired = isChecked2
        Formvlaues.Transitnumberrequired = isChecked3
        Formvlaues.Accountnumberrequired = isChecked4
        Formvlaues.Branchcoderequired = isChecked5
        Formvlaues.Branchnamerequired = isChecked6
        Formvlaues.Branchdistrictrequired = isChecked7
        Formvlaues.IFSCrequired = isChecked8
        Formvlaues.country = isChecked9
        Formvlaues.Cityrequired = isChecked10
        Formvlaues.Addresslinerequired = isChecked11
        Formvlaues.Postcoderequired = isChecked12
        Formvlaues.Staterequired = isChecked13
        Formvlaues.Documentnumberrequired = isChecked14
        Formvlaues.Phonenumberrequired = isChecked15
         const formData =  Formvlaues
       
        console.log(Formvlaues);
        
        axios.post(`/createfields/${orgID}`, formData)
        
                .then(resp => {
                    if(resp.status){
                        let data = resp.data;
                        if(data.status){
                            toast.success(data.msg);
                            // window.location="/agent-list";
                            // e.target.reset();
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
                                    <h3 className="fw-bold m-0">BANK ACCOUNT FIELDS</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        

                                        <div className="row mb-8">

                                           
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                <label className="col-lg-10 col-form-label required fw-semibold fs-6">Country</label>
                                                    <div className="col-lg-2 fv-row">
                                                    <label className="col-form-label  fw-semibold fs-6">Ethopia</label>
                                                        {/* <input type="text" name="workingCountry" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Ethopia" readOnly  /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-8">
                                                <div className="row">
                                                {/* <label className="col-lg-4 col-form-label required fw-semibold fs-6">Password *</label> */}
                                                    <div className="col-lg-11 fv-row">
                                                    <select className="form-select border-0 flex-grow-1" data-control="select2" data-placeholder="Please select" data-hide-search="true" name="fields">
                                                                    <option value="" selected disabled>Please select</option>
                                                                        <option value="Airtime Topup">Airtime Topup</option>
                                                                        <option value="Bank Transfer">Bank Transfer</option>
                                                                        <option value="Debit Card">Debit Card</option>
                                                                        <option value="Credit Card">Credit Card</option>
                                                                        <option value="Cash Pickup">Cash Pickup</option>
                                                                        <option value="Bureau de Change">Bureau de Change</option>
                                                                        <option value="Cryptocurrency">Cryptocurrency</option>
                                                                        <option value="BILL PAYMENT">BILL PAYMENT</option>
                                                                        <option value="WALLET">WALLET</option>
                                                                        <option value="MERCHANT PRODUCT">MERCHANT PRODUCT</option>
                                                                        <option value="Mobile Money">Mobile Money</option>
                                                                        <option value="Merchant Payment">Merchant Payment</option>
                                                                        <option value="Payment Method">Payment Method</option>
                                                                        <option value="Wholesale Mobile Top-up">Wholesale Mobile Top-up</option>
                                                                        <option value="Wholesale Bill Payment">Wholesale Bill Payment</option>
                                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                          
                                           
                                             
                                        
                                       
                                           
                                       


                                        </div>
                                       
                                        

                                        {/* <div className="mb-6">
                                          <h6 className="required fw-semibold fs-6">Agent Role</h6>
                                        </div> */}

                                        <div className="row">
                                            <div className="col-lg-6 mb-6">
                                                
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Account type required :</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                      <input class="form-check-input mt-5" type="checkbox" name="Accounttyperequired" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChange(e)}  />
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Bank code required :</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Bankcoderequired" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangePayOut(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Bank name required :</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Banknamerequired" role="switch" id="flexSwitchCheckDefault"  onChange={(e) => handleOnChangecancelTarnsection(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Transit number required :</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Transitnumberrequired" role="switch" id="flexSwitchCheckDefault"   onChange={(e) => handleOnChangeapproveTransection(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Account number required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    
                                                    <input class="form-check-input mt-5" type="checkbox" name="Accountnumberrequired" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecashierapprove(e)} />
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Branch code required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Branchcoderequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangecreatedigitalID(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Branch name required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Branchnamerequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeBranchname(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Branch district required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Branchdistrictrequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeBranchdistrict(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">IFSC required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="IFSCrequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeIFSC(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Country required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="country" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeCountry(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">City required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Cityrequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeCity(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Address line required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Addresslinerequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeAddress(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Postcode / Area Code required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Postcoderequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangePostcode(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">State required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Staterequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeState(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Document number required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Documentnumberrequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeDocument(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Phone number required:</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="Phonenumberrequired" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangePhone(e)} />
                                                
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


export default AgentAdd