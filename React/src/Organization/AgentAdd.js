import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AgentAdd() {
    const [isChecked, setIsChecked] = useState(0);
    const [isChecked1, setIsChecked1] = useState(0);
    const [isChecked2, setIsChecked2] = useState(0);
    const [isChecked3, setIsChecked3] = useState(0);
    const [isChecked4, setIsChecked4] = useState(0);
    const [isChecked5, setIsChecked5] = useState(0);
    const [isChecked6, setIsChecked6] = useState(0);

    const handleOnChange = (event) => {
        if (isChecked == 1) {
            setIsChecked(0);
        }
        if (isChecked == 0) {
            setIsChecked(1);
        }
        console.log(isChecked)
    };

    const handleOnChangePayOut = (e) => {
        if (isChecked1 == 1) {
            setIsChecked1(0);
        }
        if (isChecked1 == 0) {
            setIsChecked1(1);
        }
        console.log(isChecked)
    };
    const handleOnChangecancelTarnsection = (e) => {
        if (isChecked2 == 1) {
            setIsChecked2(0);
        }
        if (isChecked2 == 0) {
            setIsChecked2(1);
        }
        console.log(isChecked2)
    };
    const handleOnChangeapproveTransection = (e) => {
        if (isChecked3 == 1) {
            setIsChecked3(0);
        }
        if (isChecked3 == 0) {
            setIsChecked3(1);
        }
        console.log(isChecked3)
    };
    const handleOnChangecreatedigitalID = (e) => {
        if (isChecked4 == 1) {
            setIsChecked4(0);
        }
        if (isChecked4 == 0) {
            setIsChecked4(1);
        }
        console.log(isChecked4)
    };
    const handleOnChangecashierapprove = (e) => {
        if (isChecked5 == 1) {
            setIsChecked5(0);
        }
        if (isChecked5 == 0) {
            setIsChecked5(1);
        }
        console.log(isChecked5)
    };
   const handleOnChangeverify = (e) => {
    if (isChecked6 == 1) {
        setIsChecked6(0);
    }
    if (isChecked6 == 0) {
        setIsChecked6(1);
    }
    console.log(isChecked6)
};

    const AddFormData = async (e) => {
        // const organisation = localStorage.getItem('6311a0de778efce58f2336db');

        // console.log(organisation);
        // setDataID(organisation);

        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());

        Formvlaues.Addsubagent = isChecked
        Formvlaues.performPayOut = isChecked1
        Formvlaues.cancelTarnsection = isChecked2
        Formvlaues.approveTransection = isChecked3
        Formvlaues.createdigitalID = isChecked4
        Formvlaues.cashierapprove = isChecked5
        Formvlaues.verify = isChecked6
        const formData = Formvlaues
        // let dataToSend2 = new FormData();
        // dataToSend2.append('Addsubagent', Formvlaues.Addsubagent);
        // // dataToSend2.append('performPayOut', Formvlaues.isChecked);
        // // dataToSend2.append('cancelTarnsection', Formvlaues.isChecked);
        // // dataToSend2.append('approveTransection', Formvlaues.isChecked);
        // // dataToSend2.append('createdigitalID', Formvlaues.isChecked);
        // // dataToSend2.append('cashierapprove', Formvlaues.isChecked);
        console.log(Formvlaues);

        axios.post(`/agentregister/6311a0de778efce58f2336db`, formData)

            .then(resp => {
                if (resp.status) {
                    let data = resp.data;
                    if (data.status) {
                        toast.success(data.msg);
                        window.location = "/agent-list";
                        e.target.reset();
                    } else {
                        toast.error(data.msg);

                    }
                } else {
                    toast.error(data.msg)
                }


            })
    }




    return (
        <>
            <ToastContainer />
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
                                            <h3 className="fw-bold m-0">Add Agent</h3>
                                        </div>
                                    </div>
                                    <div id="kt_account_settings_profile_details" className="collapse show">
                                        <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                            <div className="card-body border-top p-9">


                                                <div className="row mb-8">


                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Agent Name</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="name" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-8">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Password *</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="password" name="password" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="password" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6  mb-8 ">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Email Address</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="email" name="email" className="form-control form-control-lg form-control-solid" placeholder="Email Address" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6  mb-8 ">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                                <span className="required">Contact Phone</span>
                                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                                                            </label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="tel" name="phone" className="form-control form-control-lg form-control-solid" placeholder="Phone number" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-8">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Country</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="country" className="form-control form-control-lg form-control-solid" placeholder="country" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">City</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="city" className="form-control form-control-lg form-control-solid" placeholder="City" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Address</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="address" className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 ">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Post Code </label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="number" name="postCode" className="form-control form-control-lg form-control-solid position-relative" placeholder="Post Code" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Transaction Limit</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="transectionLimit" className="form-control form-control-lg form-control-solid" placeholder="50000$" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 mb-6">

                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Commission Type</label>

                                                            <div className="col-lg-8 fv-row">
                                                                {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}

                                                                <select className="form-select border-0 flex-grow-1"
                                                                    data-control="select2" data-placeholder="assetID"
                                                                    data-hide-search="true" name='commisionType'>
                                                                    <option value="1" selected="selected">select commission</option>
                                                                    <option value="Percentage" >Percentage</option>
                                                                    <option value="Flat Money" >Flat Money</option>

                                                                    {/* {listorg.map((item)=>(
                    <option key={item._id} value={item._id}>{item.name}</option>
                ))} */}

                                                                </select>
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

                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Enter Amount</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="commissionAmount" className="form-control form-control-lg form-control-solid" placeholder="Amount" />
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>



                                                <div className="mb-6">
                                                    <h6 className="required fw-semibold fs-6">Agent Role</h6>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6 mb-6">

                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Is this Agent allowed to create a Sub Agent/Branches Network?</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="Addsubagent" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChange(e)} />

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Is this Agent allowed to perform pay-out?</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="performPayOut" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangePayOut(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Set if Agent can cancel a transaction.</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="cancelTarnsection" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecancelTarnsection(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Agent Admin must approve each transaction by Cashier/Teller (Maker Checker)</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="approveTransection" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeapproveTransection(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">I want all Cashiers/Tellers to be forwarded to me for approval.</label>
                                                            <div class="col-lg-2 form-check form-switch  ">

                                                                <input class="form-check-input mt-5" type="checkbox" name="cashierapprove" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecashierapprove(e)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Is this Agent/branch allowed to create digital id?</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="createdigitalID" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecreatedigitalID(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Verify Customer</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="verify" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeverify(e)} />

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