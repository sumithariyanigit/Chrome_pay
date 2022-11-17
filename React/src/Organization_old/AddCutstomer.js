import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var jwt = require("jsonwebtoken");


 function AddCustomer() {
    const [organisation, setDataID] = useState('');

    const AddFormData = async (e) => {

        const organisation = localStorage.getItem('ID');
        let token = localStorage.getItem('token')
        var decode1 = jwt.decode(token);
        let orgID = decode1.OrganisationID
        

        console.log(organisation);
        setDataID(organisation);
        
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        console.log(Formvlaues);
        let dataToSend2 = new FormData();
        dataToSend2.append('image', Formvlaues.image);
        dataToSend2.append('fullname', Formvlaues.fullname);
        dataToSend2.append('dateOfBirth', Formvlaues.dateOfBirth);
        dataToSend2.append('phone', Formvlaues.phone);
        dataToSend2.append('email', Formvlaues.email);
        dataToSend2.append('gender', Formvlaues.gender);
        dataToSend2.append('nationality', Formvlaues.nationality);
        dataToSend2.append('profession', Formvlaues.profession);
        dataToSend2.append('address', Formvlaues.address);
        // dataToSend2.append('organisation', Formvlaues.organisation);
        
        axios.post(`/customer/${orgID}`, dataToSend2)
                .then(res => {
                    if (res.status) {
                        let data = res.data;
                        if (data.status) {
                          toast.success(data.msg);
                          window.location = "/customer-list"
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
        <ToastContainer />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Add Customer</h3>
                                </div>
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                                <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">ID Photo</label>
                                            <div className="col-lg-8">
                                                <div className="image-input image-input-outline" data-kt-image-input="true" style={{backgroundImage: "url('/metronic8/demo4/assets/media/svg/avatars/blank.svg')"}}>
                                                    <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: "url(/metronic8/demo4/assets/media/avatars/300-1.jpg)"}}></div>

                                                    <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Upload Image">
                                                        <i className="bi bi-pencil-fill fs-7"></i>
                                                        <input type="file" name="image"    />
                                                        {/* {/ <input type="hidden" name="avatar_remove" /> /} */}
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


                                        {/* {/ <input type="file" name="image"  /> /} */}


                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                                            <div className="col-lg-8">
                                                <div className="row">
                                                    <div className="col-lg-12 fv-row">
                                                        <input type="hidden" name="organisation" defaultValue={organisation} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                                        <input type="text" name="fullname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Organisation</label>
                                            <div className="col-lg-8">
                                                <div className="row">
                                                    <div className="col-lg-12 fv-row">
                                                        <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  />
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}



                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Date of Birth</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="date" name="dateOfBirth"  className="form-control form-control-lg form-control-solid position-relative" />
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
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Email Address</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="email" name="email"  className="form-control form-control-lg form-control-solid" placeholder="Email Address" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
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
                                        </div>


                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Nationality</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="nationality"  className="form-control form-control-lg form-control-solid" placeholder="Nationality" />
                                            </div>
                                        </div>

                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Profession</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="profession"  className="form-control form-control-lg form-control-solid" placeholder="Profession" />
                                            </div>
                                        </div>

                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Address</label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="text" name="address"  className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit" className="btn btn-light btn-sub me-2">Submit</button>
                                       
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
export default AddCustomer