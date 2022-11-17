import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AutoAddress from "../Mapcomponents/AutoAddress";
import LandMap from "../Mapcomponents/LandMap";
var jwt = require("jsonwebtoken");

 function AddCustomer() {

  const [listorg, setlistOrg] =useState([]);

    const [lat, setLat]= useState('');
    const [long, setLong]= useState('');
    
    const userlist = async () =>{
       await axios.get(`/orgList`)
        .then(resp =>{
            let data = resp.data.Org;
            setlistOrg(data);
            console.log(data);
        })
    }

    useEffect(() => {
      userlist();
    }, [])
    
    const handleClick = () =>
    {
       const latInnerLat = document.getElementById("lat").innerHTML;
       console.log(latInnerLat);
       setLat(latInnerLat);
       const latInnerLong = document.getElementById("lon").innerHTML;
       console.log(latInnerLong);
       setLong(latInnerLong);
    }


    let token = localStorage.getItem('token')
    var decode1 = jwt.decode(token);
    let adminID = decode1.admminID

    const AddFormData = async (e) => {
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
        dataToSend2.append('organisation', Formvlaues.organisation);
        dataToSend2.append('nextFOKinName', Formvlaues.nextFOKinName);
        dataToSend2.append('nextFOKniPhone', Formvlaues.nextFOKniPhone);
        dataToSend2.append('landSize', Formvlaues.landSize);
        dataToSend2.append('residance', Formvlaues.residance);
        dataToSend2.append('locaDocument', Formvlaues.locaDocument);
        dataToSend2.append('landRegistration', Formvlaues.landRegistration);
        dataToSend2.append('Latitude', Formvlaues.Latitude);
        dataToSend2.append('Longitude', Formvlaues.Longitude);
        dataToSend2.append('assetType', Formvlaues.assetType);
        dataToSend2.append('assetID', Formvlaues.assetID);
        
        
        localStorage.setItem('phone',Formvlaues.phone );
                   console.log('pushpak',Formvlaues.phone);
        axios.post(`/createCustomerByAdmin/${adminID}`, dataToSend2)
        .then(res => {
            if (res.status) {
                let data = res.data;
                if (data.status) {
                  toast.success(data.msg);
                  window.location = "/admin-customer-otp"
                   e.target.reset();
                   
                } else {
                  toast.error(data.msg);
                }
              }
              else {
                toast.error(data.msg);
              }
        })
                // .then(response => {
                //    let data = response.data;
                //     console.log(data);  
                // })
        }


    return (
       <>
       <Sidebar />
        <Header />
        <ToastContainer  position="top-right"  />
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
                                            <div className="col-lg-6">
                                                <div className="image-input image-input-outline" data-kt-image-input="true" style={{backgroundImage: "url('/metronic8/demo4/assets/media/svg/avatars/blank.svg')"}}>
                                                    <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: "url(/metronic8/demo4/assets/media/avatars/300-1.jpg)"}}></div>

                                                    <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Upload Image">
                                                        <i className="bi bi-pencil-fill fs-7"></i>
                                                        <input type="file" name="image"    />
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


                                        {/* <input type="file" name="image"  /> */}

                                                        {/* //////////map input filed hidden */}
                                                        <input type="hidden" name="Latitude" value={lat} />
                                                       <input type="hidden" name="Longitude" value={long} />
                                                        {/* ////////// end map input filed hidden */}   


                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                                           
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="fullname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name"  />
                                                    </div>
                                           
                                        </div>
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Organisation</label>
                            
                                                    <div className="col-lg-8 fv-row">
                                                        {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}
                                                        
                                                         <select className="form-select border-0 flex-grow-1"
                                                                        data-control="select2" data-placeholder="organisation"
                                                                        data-hide-search="true" name='organisation'>
                                                                            <option value="1" selected="selected"> Select Organisation</option>
                                                                        {listorg.map((item)=>(
                                                                        <option key={item._id} value={item._id}>{item.name}</option>
                                                                    ))}
                                                                        
                                                                    </select>
                                                    </div>
                                               
                                        </div>

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

                                        <AutoAddress style={{width : "100% !important"}} />
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Next Of Kin Name</label>
                                           
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="text" name="nextFOKinName" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Next Of Kin Name"  />
                                                    </div>
                                           
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                <span className="">Next Of Kin Phone</span>
                                                {/* <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i> */}
                                            </label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="tel" name="nextFOKniPhone"  className="form-control form-control-lg form-control-solid" placeholder="Next Of Kin number" />
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                <span className="">Land Size</span>
                                                {/* <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i> */}
                                            </label>
                                            <div className="col-lg-8 fv-row">
                                                <input type="tel" name="landSize"  className="form-control form-control-lg form-control-solid" placeholder="land Size" />
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-6">

<label className="col-lg-4 col-form-label  fw-semibold fs-6">Asset Type</label>

        <div className="col-lg-8 fv-row">
            {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}
            
             <select className="form-select border-0 flex-grow-1"
                            data-control="select2" data-placeholder="assetType"
                            data-hide-search="true" name='assetType'>
                                <option value="1" selected="selected"> Select Asset</option>
                                <option value="Land" > Land</option>
                                <option value="House" > House</option>
                                <option value="Car" > Car</option>
                                <option value="Store" > Store</option>
                            {/* {listorg.map((item)=>(
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))} */}
                            
                        </select>
        </div>
   
                                        </div>
                                        {/* <LandMap style={{width : "100% !important"}} /> */}
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">ID Type</label>

                                                    <div className="col-lg-8 fv-row">
                                                        {/* <input type="text" name="organisation" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Organisation"  /> */}
                                                        
                                                        <select className="form-select border-0 flex-grow-1"
                                                                        data-control="select2" data-placeholder="assetID"
                                                                        data-hide-search="true" name='assetID'>
                                                                            <option value="1" selected="selected"> Select ID</option>
                                                                            <option value="National" > National ID</option>
                                                                            <option value="Passport" > Passport</option>
                                                                            <option value="Drivers" > Drivers Licence</option>
                                                                            <option value="Notarised" > Notarised Document</option>
                                                                        {/* {listorg.map((item)=>(
                                                                        <option key={item._id} value={item._id}>{item.name}</option>
                                                                    ))} */}
                                                                        
                                                                    </select>
                                                    </div>
   
                                        </div>
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Residance Image</label>
                                           
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="file" name="residance" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Residance Image"  />
                                                    </div>
                                           
                                        </div>

                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Proof of address</label>
                                           
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="file" name="locaDocument" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Local Document"  />
                                                    </div>
                                           
                                        </div>
                                        <div className="row mb-6">

                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Assets Ownership Certificate</label>
                                           
                                                    <div className="col-lg-8 fv-row">
                                                        <input type="file" name="landRegistration" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Land Registration"  />
                                                    </div>
                                           
                                        </div>

                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                                        <button type="submit" onClick={handleClick} className="btn btn-light btn-active-light-primary me-2">Submit</button>
                                       
                                    </div>
                                    {/* <Rings
                                        height="80"
                                        width="80"
                                        color="#4fa94d"
                                        radius="6"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="rings-loading"
                                        /> */}
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