import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from 'react';

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 var jwt = require('jsonwebtoken');

 function OrgnizationAdd() {
   
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

    const handleOnChange = (e) => {
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
   const handleOnChangePaydeyLoans = (e) => {
    if (isChecked7 == 1) {
        setIsChecked7(0);
    }
    if (isChecked7 == 0) {
        setIsChecked7(1);
    }
    console.log(isChecked7)
};
   const handleOnChangeAssetLoans = (e) => {
    if (isChecked8 == 1) {
        setIsChecked8(0);
    }
    if (isChecked8 == 0) {
        setIsChecked8(1);
    }
    console.log(isChecked8)
};
   const handleOnChangeOvercraftLoans = (e) => {
    if (isChecked9 == 1) {
        setIsChecked9(0);
    }
    if (isChecked9 == 0) {
        setIsChecked9(1);
    }
    console.log(isChecked9)
};

    const AddFormData = async (e) => {

        let token = localStorage.getItem('token');
        var decode1 = jwt.decode(token);
        let adminID = decode1.admminID

        // const organisation = localStorage.getItem('ID');
        // console.log(organisation);
        // setDataID(organisation);
        
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        console.log(Formvlaues);
        
      
        let dataToSend2 = new FormData();
        dataToSend2.append('logo', Formvlaues.logo);
        dataToSend2.append('name', Formvlaues.name);
        // dataToSend2.append('dateOfBirth', Formvlaues.dateOfBirth);
        dataToSend2.append('phone', Formvlaues.phone);
        dataToSend2.append('email', Formvlaues.email);
        dataToSend2.append('totlaLicense', Formvlaues.totlaLicense);
        dataToSend2.append('country', Formvlaues.country);
        dataToSend2.append('city', Formvlaues.city);
        dataToSend2.append('address', Formvlaues.address);
        dataToSend2.append('postCode', Formvlaues.postCode);
        dataToSend2.append('Personal_Loans', Formvlaues.Personal_Loans = isChecked);
        dataToSend2.append('secured_Loans', Formvlaues.secured_Loans = isChecked1);
        dataToSend2.append('Insatallment_Loans', Formvlaues.Insatallment_Loans = isChecked2);
        dataToSend2.append('Student_Loans', Formvlaues.Student_Loans = isChecked3);
        dataToSend2.append('Home_Loans',  Formvlaues.Home_Loans = isChecked4);
        dataToSend2.append('BussinessLoans',  Formvlaues.BussinessLoans = isChecked5);
        dataToSend2.append('PensionLoans',  Formvlaues.PensionLoans = isChecked6);
        dataToSend2.append('PaydeyLoans',   Formvlaues.PaydeyLoans = isChecked7);
        dataToSend2.append('AssetLoans',   Formvlaues.AssetLoans = isChecked8);
        dataToSend2.append('OvercraftLoans',  Formvlaues.OvercraftLoans = isChecked9);
        
        
        
        
        axios.post(`/Organisation/${adminID}`, dataToSend2)
                .then(res => {
                    if (res.status) {
                        let data = res.data;
                        if (data.status) {
                          toast.success(data.msg);
                        //   window.location = "/organization-list-admin"
                        //    e.target.reset();
                        } else {
                          toast.error(data.msg);
                        }
                      }
                      else {
                        toast.error(data.msg);
                      }
                })
        }



    // const AddFormData = async (e) => {
    //     e.preventDefault();
    //     const data = new FormData(e.target);
    //     const Formvlaues = Object.fromEntries(data.entries());
        

    //     console.log(Formvlaues);
        // let dataToSend2 = new FormData();
        // dataToSend2.append('logo', Formvlaues.logo);
        // dataToSend2.append('name', Formvlaues.name);
        // // dataToSend2.append('dateOfBirth', Formvlaues.dateOfBirth);
        // dataToSend2.append('phone', Formvlaues.phone);
        // dataToSend2.append('email', Formvlaues.email);
        // dataToSend2.append('totlaLicense', Formvlaues.totlaLicense);
        // dataToSend2.append('country', Formvlaues.country);
        // dataToSend2.append('city', Formvlaues.city);
        // dataToSend2.append('address', Formvlaues.address);
        // dataToSend2.append('postCode', Formvlaues.postCode);
        
        
    //     axios.post(`/Organisation`, dataToSend2)
    //             .then(response => {
    //                let data = response.data;
    //                 console.log(data);  
    //             })
    //     }

  return (
    <div>

        <ToastContainer />
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
                                    <h3 className="fw-bold m-0">Add Orgnization</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                       


                                    <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">ID Photo</label>
                                            <div className="col-lg-6">
                                                <div className="image-input image-input-outline" data-kt-image-input="true" style={{backgroundImage: "url('/metronic8/demo4/assets/media/svg/avatars/blank.svg')"}}>
                                                    <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: "url(/metronic8/demo4/assets/media/avatars/300-1.jpg)"}}></div>

                                                    <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Upload Image">
                                                        <i className="bi bi-pencil-fill fs-7"></i>
                                                        <input type="file" name="logo"    />
                                                        {/* <input type="hidden" name="avatar_remove" /> */}
                                                    </label>
                                                    <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                        <i className="bi bi-x fs-2"></i>
                                                    </span>
                                                    <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                        <i className="bi bi-x fs-2"></i>
                                                    </span>
                                                </div>
                                                <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
                                            </div>
                                        </div>


                                        <div className="row mb-6">

                                            <label className="col-lg-6 col-form-label required fw-semibold fs-6">Organization Name</label>
                                            
                                            <div className="col-lg-6 fv-row">
                                                
                                                <input type="text" name="name" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organization Name"  />
                                                 
                                            </div>

                                        </div>
                                        {/* <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">organisation</label>
                                            <div className="col-lg-8">
                                                <div className="row">
                                                    <div className="col-lg-6 fv-row">
                                                        <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="organisation"  />
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}

                                        {/* <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label required fw-semibold fs-6">Joining Date</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="date" name="dateOfBirth"  className="form-control form-control-lg form-control-solid position-relative" />
                                            </div>
                                        </div> */}

                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">
                                                <span className="required">Contact Phone</span>
                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                                            </label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="tel" name="phone"  className="form-control form-control-lg form-control-solid" placeholder="Phone number" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">Email Address</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="email" name="email"  className="form-control form-control-lg form-control-solid" placeholder="Email Address" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">Country</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="text" name="country"  className="form-control form-control-lg form-control-solid" placeholder="Country" />
                                            </div>
                                        </div>
                                        


                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">City</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="text" name="city"  className="form-control form-control-lg form-control-solid" placeholder="City" />
                                            </div>
                                        </div>

                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">Area/Post code</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="number" name="postCode"  className="form-control form-control-lg form-control-solid" placeholder="pin_code" />
                                            </div>
                                        </div>

                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label fw-semibold fs-6">Address</label>
                                            <div className="col-lg-6 fv-row">
                                                <input type="text" name="address"  className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label required fw-semibold fs-6">totlaLicense</label>
                                            <div className="col-lg-6 fv-row">
                                            <input type="number" name="totlaLicense"  className="form-control form-control-lg form-control-solid" placeholder="Enter totlaLicense" />
                                               
                                            </div>
                                        </div>
                                        {/* <div className="row mb-6">
                                            <label className="col-lg-6 col-form-label required fw-semibold fs-6">Number of license</label>
                                            <div className="col-lg-6 fv-row">
                                            <input type="number" name="license"  className="form-control form-control-lg form-control-solid" placeholder="Number of license" />
                                               
                                            </div>
                                        </div> */}
                                        <div className="mb-6">
                                                    <h6 className="required fw-semibold fs-6">Organzation Role</h6>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6 mb-6">

                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Personal Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="Personal_Loans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChange(e)} />

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Secured Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="secured_Loans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangePayOut(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Insatallment Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="Insatallment_Loans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecancelTarnsection(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Student Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="Student_Loans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeapproveTransection(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Home Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">

                                                                <input class="form-check-input mt-5" type="checkbox" name="Home_Loans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecashierapprove(e)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Bussiness Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="BussinessLoans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangecreatedigitalID(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Pension Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="PensionLoans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeverify(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Paydey Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="PaydeyLoans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangePaydeyLoans(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Asset Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="AssetLoans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeAssetLoans(e)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label class="col-lg-10  form-check-label col-form-label required fw-semibold fs-6" for="flexSwitchCheckDefault">Asset Loans</label>
                                                            <div class="col-lg-2 form-check form-switch  ">
                                                                <input class="form-check-input mt-5" type="checkbox" name="OvercraftLoans" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleOnChangeOvercraftLoans(e)} />

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

export default OrgnizationAdd