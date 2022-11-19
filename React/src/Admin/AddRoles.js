import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
var jwt = require("jsonwebtoken");

 function AddRoles() {
    const ID = localStorage.getItem('ID');
//   console.log(ID);

    let token = localStorage.getItem('token')
    var decode1 = jwt.decode(token);
    let adminID = decode1.admminID



 
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
    const [isChecked16, setIsChecked16] = useState(0);
    const [isChecked17, setIsChecked17] = useState(0);
    const [isChecked18, setIsChecked18] = useState(0);
    const [isChecked19, setIsChecked19] = useState(0);
    const [isChecked20, setIsChecked20] = useState(0);
    const [isChecked21, setIsChecked21] = useState(0);
    const [isChecked22, setIsChecked22] = useState(0);
    const [isChecked23, setIsChecked23] = useState(0);
    const [isChecked24, setIsChecked24] = useState(0);
    const [isChecked25, setIsChecked25] = useState(0);
    const [isChecked26, setIsChecked26] = useState(0);
    const [isChecked27, setIsChecked27] = useState(0);
    const [isChecked28, setIsChecked28] = useState(0);
    const [isChecked29, setIsChecked29] = useState(0);
    const [isChecked30, setIsChecked30] = useState(0);
   
 
    const handleOnChangeCustomer = (event) => {
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

     const handleOnChangeEditCustomer = (e) => {
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
     const handleOnChangeApproveDID = (e) => {
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
     const handleOnChangeviewCustomer = (e) => {
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
     const handleOnChangeblockCustomer = (e) => {
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
     const handleOnChangeunBlockCustomer = (e) => {
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
     const handleOnChangedeleteCustomer = (e) => {
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
     const handleOnChangesetcustomerOtpLimit = (e) => {
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
     const handleOnChangesetCustomerPasswordLimit = (e) => {
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
     const handleOnChangeupdateCustomer = (e) => {
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
     const handleOnChangeaddOrganisation = (e) => {
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
     const handleOnChangeblockorganisation = (e) => {
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
     const handleOnChangeunBlockOrganisation = (e) => {
        if(isChecked12 == 1)
        {
            setIsChecked12(0);
        }
        if(isChecked12 == 0)
        {
            setIsChecked12(1);
        }
       console.log(isChecked12)
     };
     const handleOnChangedeleteOrganisation = (e) => {
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
     const handleOnChangesetOrgOptLimit = (e) => {
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
     const handleOnChangesetOrgPasswordLimit = (e) => {
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
     const handleOnChangeupdateOrganisation = (e) => {
        if(isChecked16 == 1)
        {
            setIsChecked16(0);
        }
        if(isChecked16 == 0)
        {
            setIsChecked16(1);
        }
       console.log(isChecked16)
     };
     const handleOnChangeaddAgent = (e) => {
        if(isChecked17 == 1)
        {
            setIsChecked17(0);
        }
        if(isChecked17 == 0)
        {
            setIsChecked17(1);
        }
       console.log(isChecked17)
     };
     const handleOnChangeblockAgent = (e) => {
        if(isChecked18 == 1)
        {
            setIsChecked18(0);
        }
        if(isChecked18 == 0)
        {
            setIsChecked18(1);
        }
       console.log(isChecked18)
     };
     const handleOnChangeunBlockAgent = (e) => {
        if(isChecked19 == 1)
        {
            setIsChecked19(0);
        }
        if(isChecked19 == 0)
        {
            setIsChecked19(1);
        }
       console.log(isChecked19)
     };
     const handleOnChangedeleteAgent = (e) => {
        if(isChecked20 == 1)
        {
            setIsChecked20(0);
        }
        if(isChecked20 == 0)
        {
            setIsChecked20(1);
        }
       console.log(isChecked20)
     };
     const handleOnChangesetagentOtpLimit = (e) => {
        if(isChecked21 == 1)
        {
            setIsChecked21(0);
        }
        if(isChecked21 == 0)
        {
            setIsChecked21(1);
        }
       console.log(isChecked21)
     };
     const handleOnChangesetagentPasswordLimit = (e) => {
        if(isChecked22 == 1)
        {
            setIsChecked22(0);
        }
        if(isChecked22 == 0)
        {
            setIsChecked22(1);
        }
       console.log(isChecked22)
     };
     const handleOnChangeupdateAgent = (e) => {
        if(isChecked23 == 1)
        {
            setIsChecked23(0);
        }
        if(isChecked23 == 0)
        {
            setIsChecked23(1);
        }
       console.log(isChecked23)
     };
     const handleOnChangeIPblackListing = (e) => {
        if(isChecked24 == 1)
        {
            setIsChecked24(0);
        }
        if(isChecked24 == 0)
        {
            setIsChecked24(1);
        }
       console.log(isChecked24)
     };
     const handleOnChangeIPwhiteListing = (e) => {
        if(isChecked25 == 1)
        {
            setIsChecked25(0);
        }
        if(isChecked25 == 0)
        {
            setIsChecked25(1);
        }
       console.log(isChecked25)
     };
     const handleOnChangeaddSubAdmin = (e) => {
        if(isChecked26 == 1)
        {
            setIsChecked26(0);
        }
        if(isChecked26 == 0)
        {
            setIsChecked26(1);
        }
       console.log(isChecked26)
     };
     const handleOnChangeblockSubAdmin = (e) => {
        if(isChecked27 == 1)
        {
            setIsChecked27(0);
        }
        if(isChecked27 == 0)
        {
            setIsChecked27(1);
        }
       console.log(isChecked27)
     };
     const handleOnChangeunBlockSubAdmin = (e) => {
        if(isChecked28 == 1)
        {
            setIsChecked28(0);
        }
        if(isChecked28 == 0)
        {
            setIsChecked28(1);
        }
       console.log(isChecked28)
     };
     const handleOnChangedeleteSubAdmin = (e) => {
        if(isChecked29 == 1)
        {
            setIsChecked29(0);
        }
        if(isChecked29 == 0)
        {
            setIsChecked29(1);
        }
       console.log(isChecked29)
     };
     const handleOnChangeupdateSubAgent = (e) => {
        if(isChecked30 == 1)
        {
            setIsChecked30(0);
        }
        if(isChecked30 == 0)
        {
            setIsChecked30(1);
        }
       console.log(isChecked30)
     };
     

    const AddFormData = async (e) => {
        // const organisation = localStorage.getItem('6311a0de778efce58f2336db');

        // console.log(organisation);
        // setDataID(organisation);
        
        const {subAdminID} = {subAdminID: ID}
        console.log(subAdminID);
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        
        Formvlaues.addCustomer = isChecked
        Formvlaues.editCustomer = isChecked1
        Formvlaues.approveDID = isChecked2
        Formvlaues.viewCustomer = isChecked3
        Formvlaues.blockCustomer = isChecked4
        Formvlaues.unBlockCustomer = isChecked5
        Formvlaues.deleteCustomer = isChecked6
        Formvlaues.setcustomerOtpLimit = isChecked7
        Formvlaues.setCustomerPasswordLimit = isChecked8
        Formvlaues.updateCustomer = isChecked9
        Formvlaues.addOrganisation = isChecked10
        Formvlaues.blockorganisation = isChecked11
        Formvlaues.unBlockOrganisation = isChecked12
        Formvlaues.deleteOrganisation = isChecked13
        Formvlaues.setOrgOptLimit = isChecked14
        Formvlaues.setOrgPasswordLimit = isChecked15
        Formvlaues.updateOrganisation = isChecked16
        Formvlaues.addAgent = isChecked17
        Formvlaues.blockAgent = isChecked18
        Formvlaues.unBlockAgent = isChecked19
        Formvlaues.deleteAgent = isChecked20
        Formvlaues.setagentOtpLimit = isChecked21
        Formvlaues.setagentPasswordLimit = isChecked22
        Formvlaues.updateAgent = isChecked23
        Formvlaues.IPblackListing = isChecked24
        Formvlaues.IPwhiteListing = isChecked25
        Formvlaues.addSubAdmin = isChecked26
        Formvlaues.blockSubAdmin = isChecked27
        Formvlaues.unBlockSubAdmin = isChecked28
        Formvlaues.deleteSubAdmin = isChecked29
        Formvlaues.updateSubAgent = isChecked30
         const formData =  Formvlaues
        // let dataToSend2 = new FormData();
        // dataToSend2.append('Addsubagent', Formvlaues.Addsubagent);
        // // dataToSend2.append('performPayOut', Formvlaues.isChecked);
        // // dataToSend2.append('cancelTarnsection', Formvlaues.isChecked);
        // // dataToSend2.append('approveTransection', Formvlaues.isChecked);
        // // dataToSend2.append('createdigitalID', Formvlaues.isChecked);
        // // dataToSend2.append('cashierapprove', Formvlaues.isChecked);
        console.log(Formvlaues);
        
        axios.post(`/addsubadminrole/${adminID}/${subAdminID}`, formData)
        
                .then(resp => {
                    if(resp.status){
                        let data = resp.data;
                        if(data.status){
                            // window.location="/agent-list";
                            toast.success(data.msg);
                           
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
                                    <h3 className="fw-bold m-0">Add Roles</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        
                                        <div className="mb-6">
                                          <h6 className="required fw-semibold fs-66">Customer Role</h6>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-6">
                                                
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Add Customer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                      <input class="form-check-input mt-5" type="checkbox" name="addCustomer" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeCustomer(e)}  />
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Edit Customer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="editCustomer" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeEditCustomer(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Approve DID</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="approveDID" role="switch" id="flexSwitchCheckDefault"  onChange={(e) => handleOnChangeApproveDID(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">View Customer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="viewCustomer" role="switch" id="flexSwitchCheckDefault"   onChange={(e) => handleOnChangeviewCustomer(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Block Customer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    
                                                    <input class="form-check-input mt-5" type="checkbox" name="blockCustomer" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeblockCustomer(e)} />
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Un BlockCustomer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="unBlockCustomer" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeunBlockCustomer(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Delete Customer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="deleteCustomer" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangedeleteCustomer(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Setcustomer OtpLimit</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="setcustomerOtpLimit" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangesetcustomerOtpLimit(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Set Customer Password Limit</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="setCustomerPasswordLimit" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangesetCustomerPasswordLimit(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Update Customer</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="updateCustomer" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeupdateCustomer(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>

                                        </div>

                                        <div className="mb-6 ">
                                          <h6 className="required fw-semibold fs-66">Organzation Role</h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-6">
                                                
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Add Organisation</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                      <input class="form-check-input mt-5" type="checkbox" name="addOrganisation" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeaddOrganisation(e)}  />
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Block Organisation</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="blockorganisation" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeblockorganisation(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">UnBlock Organisation</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="unBlockOrganisation" role="switch" id="flexSwitchCheckDefault"  onChange={(e) => handleOnChangeunBlockOrganisation(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Delete Organisation</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="deleteOrganisation" role="switch" id="flexSwitchCheckDefault"   onChange={(e) => handleOnChangedeleteOrganisation(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Set Organisation OTP Limit</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    
                                                    <input class="form-check-input mt-5" type="checkbox" name="setOrgOptLimit" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangesetOrgOptLimit(e)} />
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Set Organisation Password Limit</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="setOrgPasswordLimit" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangesetOrgPasswordLimit(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Update Organisation</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="updateOrganisation" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeupdateOrganisation(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            
                                            

                                        </div>
                                        <div className="mb-6 ">
                                          <h6 className="required fw-semibold fs-66">Agent Role</h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-6">
                                                
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Add Agent</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                      <input class="form-check-input mt-5" type="checkbox" name="addAgent" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeaddAgent(e)}  />
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Block Agent</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="blockAgent" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeblockAgent(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Unblock Agent</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="unBlockAgent" role="switch" id="flexSwitchCheckDefault"  onChange={(e) => handleOnChangeunBlockAgent(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Delete Agent</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="deleteAgent" role="switch" id="flexSwitchCheckDefault"   onChange={(e) => handleOnChangedeleteAgent(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Set Agent Otp Limit</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    
                                                    <input class="form-check-input mt-5" type="checkbox" name="setagentOtpLimit" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangesetagentOtpLimit(e)} />
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Set Agent Password Limit</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="setagentPasswordLimit" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangesetagentPasswordLimit(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Update Agent</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="updateAgent" role="switch" id="flexSwitchCheckDefault"    onChange={(e) => handleOnChangeupdateAgent(e)} />
                                                
                                                    </div>
                                                </div> 
                                            </div>
                                            
                                            

                                        </div>
                                        <div className="mb-6 ">
                                          <h6 className="required fw-semibold fs-66">IP Role</h6>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-6">
                                                
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">IP Black Listing</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                      <input class="form-check-input mt-5" type="checkbox" name="IPblackListing" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeIPblackListing(e)}  />
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">IP White Listing</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="IPwhiteListing" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeIPwhiteListing(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>        
                                        </div>
                                        <div className="mb-6 ">
                                          <h6 className="required fw-semibold fs-66">Sub Admin</h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-6">
                                                
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Add Sub Admin</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                      <input class="form-check-input mt-5" type="checkbox" name="addSubAdmin" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeaddSubAdmin(e)}  />
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Block Sub Admin</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="blockSubAdmin" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeblockSubAdmin(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Unblock Sub Admin</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="unBlockSubAdmin" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeunBlockSubAdmin(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Delete Sub Admin</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="deleteSubAdmin" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangedeleteSubAdmin(e)} />
                                                
                                                    </div>
                                                </div>
                                            </div>  
                                            <div className="col-lg-6 mb-6">
                                                <div className="row">
                                                    <label class="col-lg-10  form-check-label col-form-label  fw-semibold fs-6" for="flexSwitchCheckDefault">Update Sub Agent</label>
                                                    <div class="col-lg-2 form-check form-switch  ">
                                                    <input class="form-check-input mt-5" type="checkbox" name="updateSubAgent" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeupdateSubAgent(e)} />
                                                
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




export default AddRoles