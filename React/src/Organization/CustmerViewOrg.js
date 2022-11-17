import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams }  from 'react-router-dom';
import Moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

var jwt = require("jsonwebtoken");

function CustmerViewOrg() {
    let token = localStorage.getItem('token');
    var decode1 = jwt.decode(token);
    let orgID = decode1.OrganisationID


  const [ data, setData]= useState([])
  const [ digitalrefID, setDigitalrefID]= useState([])
  const [gender,setGender]=useState()
  const [account,setAccount]= useState([]);
  
  const { _id } = useParams('');
  // const currDate = new Date().toLocaleDateString();
  const userlist = async () =>
  {
      const {custID} = { custID : _id }
      // console.log(senData)
      await axios.post(`/custdetail/${custID}`)
      .then(res => {
        const userData = res.data.obj;
        const digitalrefID = userData.digitalrefID.slice(7, 10);
        const gender =  userData.gender
        console.log(digitalrefID);
        setDigitalrefID(digitalrefID);
        setData(userData);
        
        console.log(userData); 
      })
  }
 useEffect(() => {
   userlist();
   accountlist();
  
 }, []);

 const {custID} = { custID : _id }
 const accountlist = async () =>{
      
    await axios.post(`/customer_bank/${custID}`)
    .then(resp =>{
        let data =resp.data.findCust
        setAccount(data);
        console.log('@pushpak@',data);
    })
}
 
 const handleVerfiy = (_id) => {
    console.log(_id);
    const  {custID} = {custID :_id}
    console.log(custID);
    axios.post(`/updateDigitalID/${custID}/${orgID}`)
    .then(resp =>{
        if(resp.status){
            let data = resp.data;
            // setData(data)
            // console.log(data);
            if(data.status){
               
                toast.success(data.msg);
                return  userlist();
                
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
      <Sidebar/>
      <Header/>
      <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
      <div className="content d-flex flex-column flex-column-fluid" id="kt_content">


<div className="container-xxl" id="kt_content_container">

    <div className="row g-5 g-xl-8">




        <div className="col-lg-12">
            <div className="row">
                <div className="col-lg-8">

                    <div className="card rounded-15 mb-5 mb-xl-10 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                        <div className="card-body  pt-9 pb-0 ">
                            {/* <!--begin::Details--> */}
                            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                                {/* <!--begin: Pic--> */}
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                        <img src={data.IDphoto} alt="image" />
                                        <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px">
                                        </div>
                                    </div>
                                </div>


                                {/* <!--end::Pic--> */}

                                <div className="flex-grow-1">

                                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                        {/* <!--begin::User--> */}
                                        <div className="d-flex flex-column">
                                            {/* <!--begin::Name--> */}
                                            <div className="d-flex align-items-center mb-2">
                                                <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{data.fullname}</a>
                                                <a href="#">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen026.svg--> */}
                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                            <path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="currentColor" />
                                                            <path d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white" />
                                                        </svg>
                                                    </span>

                                                </a>
                                                {/* <!--  <a href="#" className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Verified</a> --> */}
                                            </div>
                                            {/* <!--end::Name--> */}

                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com006.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" />
                                                            <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" />
                                                            <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                    {data.professoin}
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
                                                            <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                   {data.nationality}
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
                                                            <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                  {data.email}
                                                </a>
                                            </div>
                                            {/* <!--end::Info--> */}
                                        </div>
                                        {/* <!--end::User--> */}

                                    </div>


                                    <div className="d-flex flex-wrap flex-stack">

                                        <div className="d-flex flex-column flex-grow-1 pe-8">

                                            <div className="d-flex flex-wrap">
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">

                                                    <div className="d-flex align-items-center">

                                                        <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                                <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                                            </svg>
                                                        </span>

                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value={`$${data.totalAmount }`} data-kt-countup-prefix="$">{`$${data.totalAmount }`}</div>
                                                    </div>


                                                    <div className="fw-semibold fs-6 text-gray-400">
                                                        Transaction Amount</div>

                                                </div>
                                                {/* <!--end::Stat--> */}
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">

                                                    <div className="d-flex align-items-center">

                                                        <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor" />
                                                            </svg>
                                                        </span>

                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value={data.totalTransection}>{data.totalTransection}</div>
                                                    </div>


                                                    <div className="fw-semibold fs-6 text-gray-400">
                                                    Total Transaction </div>

                                                </div>
                                                {/* <!--end::Stat--> */}
                                                {/* <!--begin::Stat--> */}

                                                {/* <!--end::Stat--> */}
                                            </div>
                                            <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                                                <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                                                    <span className="fw-semibold fs-6 text-gray-400">Identity Trust Level
                                                    </span>
                                                    <span className="fw-bold fs-6">{data.proPercentage}%</span>
                                                </div>
                                                <div className="h-5px mx-3 w-100 bg-light mb-3">
                                                    <div className="bg-success rounded h-5px w-50"  role="progressbar"  aria-valuenow="67" aria-valuemin="67" aria-valuemax="67"></div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <!--begin::Progress--> */}

                                        {/* <!--end::Progress--> */}
                                    </div>

                                </div>
                                {/* <!--end::Info--> */}
                            </div>
                            {/* <!--end::Details--> */}
                            {/* <!--begin::Navs--> */}

                            {/* <!--begin::Navs--> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card card-flush">

                        <div className="card-header pt-5">

                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold text-dark fs-3">KYC</span>
                                <span className="text-gray-400 mt-1 fw-semibold fs-6">User
                                    Kyc</span>
                            </h3>




                        </div>


                        <div className="card-body">

                            <div className="d-flex flex-stack animation-css">

                                <div className="d-flex align-items-center jus me-3">
                                    {/* <!--begin::Icon--> */}
                                  
                                    <img src="../assets_new/images/digitalid-03.png" className="me-3 w-30px" alt="" />
                                
                                    
                                
                                    {/* <!--end::Icon--> */}

                                    <div className="flex-grow-1">
                                        <a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bold lh-0">
                                            Fingerprint</a>

                                    </div>

                                </div>


                                <div className="d-flex justify-content-end align-items-center w-100 mw-125px">
                                    {/* <!--begin::Progress--> */}
                                    {data.fingerPrint == 1 ? <> 
                                    <img src="../assets_new/images/digital-04.png" width="25px" />
                                    </>:
                                    <>
                                    <img src="../assets_new/images/cross.png" width="23px" />
                                    </> 
                                    }   
                                </div>

                            </div>


                            <div className="separator separator-dashed my-4"></div>


                            <div className="d-flex flex-stack animation-css">

                                <div className="d-flex align-items-center me-3">
                                    {/* <!--begin::Icon--> */}
                                    <img src="../assets_new/images/icons-16.png" className="me-3 w-30px" alt="" />
                                    {/* <!--end::Icon--> */}

                                    <div className="flex-grow-1">
                                        <a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bold lh-0">Facial
                                            Identification</a>

                                    </div>

                                </div>


                                <div className="d-flex justify-content-end align-items-center w-100 mw-125px">
                                    {/* <!--begin::Progress--> */}
                                    {data.facialIdentification == 1 ? <> 
                                    <img src="../assets_new/images/digital-04.png" width="25px" />
                                    </>:
                                    <>
                                    <img src="../assets_new/images/cross.png" width="23px" />
                                    </> 
                                    }   
                                    {/* <!--end::Progress--> */}



                                </div>

                            </div>


                            <div className="separator separator-dashed my-4"></div>


                            <div className="d-flex flex-stack animation-css">

                                <div className="d-flex  align-items-center me-3">
                                    {/* <!--begin::Icon--> */}
                                    <img src="../assets_new/images/address.png" className="me-3 w-30px" alt="" />
                                    {/* <!--end::Icon--> */}

                                    <div className="flex-grow-1">
                                        <a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bold lh-0">Location
                                        </a>

                                    </div>

                                </div>


                                <div className="d-flex justify-content-end align-items-center w-100 mw-125px">
                                    {data.Location == 1 ? <> 
                                    <img src="../assets_new/images/digital-04.png" width="25px" />
                                    </>:
                                    <>
                                     <img src="../assets_new/images/cross.png" width="23px" />
                                    </>
                                    }
                                   
                                </div>

                            </div>


                            <div className="separator separator-dashed my-4 mbstyle"></div>



                        </div>

                    </div>
                </div>



                <div className="col-lg-8">
                    <div className="card mb-12 rounded-15 bgi-no-repeat bgi-position-x-end 
        bgi-size-cover bg_card">

                        <div className="card-body flex-column p-5">

                            <div className="d-flex align-items-center ">

                                <div className="activediv d-flex flex-column align-items-start justift-content-center flex-equal me-5">

                                    <h1 className="fw-bold fs-4 fs-lg-1 text-white mb-5 mb-lg-10">
                                        <span id="replce">D-ID Ref : #######{digitalrefID}</span>&nbsp;
                                        <span id="replce1">D-ID Ref : {data.digitalrefID}</span>&nbsp;

                                        <button type="button" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" className="didview btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4">
                                            <span className="svg-icon svg-icon-3">
                                                <i className="fad fa-eye fs-4 text-white"></i>
                                            </span>
                                        </button>
                                        
                                        <button onClick={(e)=>{handleVerfiy(data._id)}}
                                                                    className="didview btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Update">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        {/* <i className="fad fa-eye-slash"></i> */}
                                                                      
                                                                        <img src="/assets_new/images/png-02.png" width="28px" />
                                                                    </span>

                                        </button>
                                        </h1>
                                        

                                    <div className="didviewdiv ">
                                        <h1>D-ID : {data.digitalID}</h1>

                                    </div>
                                    {/* <!--  <a href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_new_ticket" className="btn btn-primary fw-bold fs-8 fs-lg-base">View D-ID</a> --> */}

                                    



                                </div>


                                <div className="flex-equal d-flex justify-content-center align-items-end ms-5">

                                    <img src="../../assets/media/illustrations/dozzy-1/20.png" alt="" className="mw-100 mh-125px mh-lg-275px mb-lg-n12" />

                                </div>

                            </div>


                            <div className="card-rounded  d-flex flex-stack flex-wrap p-5 pb-0">

                                <ul className="nav flex-wrap border-transparent fw-bold" role="tablist">

                                    <li className="nav-item my-1" role="presentation">
                                        <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#overview" className="btn btn-color-gray-600 btn-active-secondary  active btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-7 mx-1 text-uppercase">Overview</a>
                                    </li>


                                    <li className="nav-item my-1" role="presentation">
                                        <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#documents" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-7  mx-1 text-uppercase">
                                            Documents</a>
                                    </li>


                                    <li className="nav-item my-1" role="presentation">

                                        <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#land" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-7  mx-1 text-uppercase">Land Registration</a>
                                    </li>





                                    <li className="nav-item my-1">

                                        <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#finance" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-7  mx-1 text-uppercase">
                                            Financial Activities</a>
                                    </li>
                                    <li className="nav-item my-1" role="presentation">
                                        <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#account" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-7 mx-1 text-uppercase">
                                            Bank Account</a>
                                    </li>




                                </ul>






                            </div>

                        </div>

                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card card-flush h-md-90 mb-5 mb-xl-10">
                        <div className="card-header pt-5">
                            <div className="card-title d-flex flex-column">
                                <div className="d-flex align-items-center">
                                    <span className="fs-4 fw-semibold text-gray-400 me-1 align-self-start">$</span>
                                    <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{data.totalAmount }</span>
                                    <span className="badge badge-light-success fs-base">

                                        <span className="svg-icon svg-icon-5 svg-icon-success ms-n1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                                <span className="text-gray-400 pt-1 fw-semibold fs-6">Transaction Amount</span>
                            </div>
                        </div>
                        <div className="card-body pt-2 pb-4 d-flex align-items-center">
                            <div className="d-flex flex-center me-5 pt-2">
                                <div id="kt_card_widget_4_chart" style={{ minWidth: "70px",  minHeight: "70px" }} data-kt-size="70" data-kt-line="11"></div>
                            </div>
                            <div className="d-flex flex-column content-justify-center w-100">
                                <div className="d-flex fs-6 fw-semibold align-items-center">
                                    <div className="bullet w-8px h-6px rounded-2 bg-danger me-3"></div>
                                    <div className="text-gray-500 flex-grow-1 me-4">withdraw</div>


                                    <div className="fw-bolder text-gray-700 text-xxl-end">{`$${ data.sendindAmount}`}</div>

                                </div>


                                <div className="d-flex fs-6 fw-semibold align-items-center my-3">

                                    <div className="bullet w-8px h-6px rounded-2 bg-primary me-3"></div>


                                    <div className="text-gray-500 flex-grow-1 me-4">Deposit</div>


                                    <div className="fw-bolder text-gray-700 text-xxl-end">{`$${data.receiveAmount }`}</div>

                                </div>


                                <div className="d-flex fs-6 fw-semibold align-items-center">

                                    <div className="bullet w-8px h-6px rounded-2 me-3" style={{backgroundColor: "#E4E6EF"}}></div>


                                    <div className="text-gray-500 flex-grow-1 me-4">Others</div>


                                    <div className="fw-bolder text-gray-700 text-xxl-end">$45,257</div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="tab-content">

                    <div className="tab-pane fade active show" id="overview" role="tabpanel">
                        <div className="row">
                            <div className="col-lg-6">

                                <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

                                    <div className="card-header cursor-pointer">

                                        <div className="card-title m-0">
                                            <h3 className="fw-bold m-0">Profile Details</h3>
                                        </div>




                                    </div>


                                    <div className="card-body p-9">

                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Full
                                                Name</label>


                                            <div className="col-lg-8">
                                                <span className="fw-bold fs-6 text-gray-800">{data.fullname}</span>
                                            </div>

                                        </div>


                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Next of
                                                Kin (Name)</label>


                                            <div className="col-lg-8 fv-row">
                                                <span className="fw-semibold text-gray-800 fs-6">{data.nextFOKinName}</span>
                                            </div>

                                        </div>
                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Date of
                                                Birth</label>


                                            <div className="col-lg-8 fv-row">
                                                <span className="fw-semibold text-gray-800 fs-6">{Moment(data.dateOfBirth).format("DD/MM/YYYY")}</span>
                                            </div>

                                        </div>


                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Contact
                                                Phone No.
                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i></label>


                                            <div className="col-lg-8 d-flex align-items-center">
                                                <span className="fw-bold fs-6 text-gray-800 me-2">+91
                                                    {data.phone}
                                                </span>
                                                <span className="badge badge-success">Verified</span>
                                            </div>

                                        </div>


                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Email
                                                Address</label>


                                            <div className="col-lg-8">
                                                <span className="fw-semibold fs-6 text-gray-800 text-hover-primary">
                                                   {data.email}
                                                </span>
                                            </div>

                                        </div>

                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Gender</label>


                                            <div className="col-lg-8">
                                                <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">{data.gender}</a>
                                            </div>

                                        </div>

                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Nationality</label>


                                            <div className="col-lg-8">
                                                <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">{data.nationality}</a>
                                            </div>

                                        </div>

                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Profession</label>


                                            <div className="col-lg-8">
                                                <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">{data.professoin}</a>
                                            </div>

                                        </div>

                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Address</label>


                                            <div className="col-lg-8">
                                                <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">{data.address}</a>
                                            </div>

                                        </div>




                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-6">


                                <div className="card card-flush">

                                    <div className="bg_div card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px">

                                        <h3 className="card-title align-items-start flex-column text-white pt-15">
                                            <span className="fw-bold fs-2x mb-3">Linked Services</span>
                                            <div className="fs-4 text-white">
                                                {/* <span className="opacity-75">Lorem Ipsum is simply dummy text</span> */}
                                            </div>
                                        </h3>


                                    </div>


                                    <div className="card-body mt-n20">

                                        <div className="mt-n20 position-relative">

                                            <div className="row g-3 g-lg-6">

                                                <div className="col-6">

                                                    <div className="bg-gray-100 ative animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                        <div className="symbol symbol-30px me-5 mb-8">
                                                            <span className="symbol-label">

                                                                <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                        <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                    </svg>
                                                                </span>

                                                            </span>
                                                        </div>


                                                        <div className="m-0">

                                                            <span className="bank-logo style12 text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1"
                                                            >
                                                                <img src="../assets_new/images/logo5.png" width="100px" />
                                                            </span>


                                                            <span className="text-gray-500 fw-semibold fs-6">Fuse Wallet</span>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="col-6">

                                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                        <div className="symbol symbol-30px me-5 mb-8">
                                                            <span className="symbol-label">

                                                                <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                        <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                    </svg>
                                                                </span>

                                                            </span>
                                                        </div>


                                                        <div className="m-0">

                                                            <span className="bank-logo text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                <img src="../assets_new/images/logo.png" width="65px" />
                                                            </span>


                                                            <span className="text-gray-500 fw-semibold fs-6">Chromepay Wallet</span>

                                                        </div>

                                                    </div>

                                                </div>


                                                <div className="col-6">

                                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                        <div className="symbol symbol-30px me-5 mb-8">
                                                            <span className="symbol-label">

                                                                <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                        <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                    </svg>
                                                                </span>

                                                            </span>
                                                        </div>


                                                        <div className="m-0">

                                                            <span className=" bank-logo1 text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                <img src="../assets_new/images/bank2.png" width="150px" />
                                                            </span>


                                                            <span className="text-gray-500 fw-semibold fs-6">Bank of Abyssinia</span>

                                                        </div>

                                                    </div>

                                                </div>


                                                <div className="col-6">

                                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                        <div className="symbol symbol-30px me-5 mb-8">
                                                            <span className="symbol-label">

                                                                <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                        <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                    </svg>
                                                                </span>

                                                            </span>
                                                        </div>


                                                        <div className="m-0">

                                                            <span className="bank-logo1 text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                <img src="../assets_new/images/bank3.png" width="150px" />
                                                            </span>


                                                            <span className="text-gray-500 fw-semibold fs-6">Oromia Bank</span>

                                                        </div>

                                                    </div>

                                                </div>






                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className="col-lg-12">
                                <div className="card mb-5 mb-xxl-8">

                                    <div className="card-header align-items-center border-0 mt-4">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="fw-bold mb-2 text-dark">D-ID Activities</span>
                                            <span className="text-muted fw-semibold fs-7">4,500 Transaction</span>
                                        </h3>
                                        <div className="card-toolbar">

                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">

                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="currentColor" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>

                                            </button>

                                            <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_62d4f2ee25eea">

                                                <div className="px-7 py-5">
                                                    <div className="fs-5 text-dark fw-bold">Filter Options</div>
                                                </div>


                                                <div className="separator border-gray-200"></div>

                                                {/* <!--begin::Form--> */}
                                                <div className="px-7 py-5">

                                                    <div className="mb-10">

                                                        <label className="form-label fw-semibold">Status:</label>

                                                        {/* <!--begin::Input--> */}
                                                        <div>
                                                            <select className="form-select form-select-solid" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_62d4f2ee25eea" data-allow-clear="true">
                                                                <option></option>
                                                                <option value="1">withdraw</option>
                                                                <option value="2">Pending</option>
                                                                <option value="2">In Process</option>
                                                                <option value="2">Deposit</option>
                                                            </select>
                                                        </div>

                                                    </div>

                                                    <div className="mb-10">

                                                        <label className="form-label fw-semibold">Notifications:</label>


                                                        <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                                            <input className="form-check-input" type="checkbox" value="" name="notifications" checked="checked" />
                                                            <label className="form-check-label">Enabled</label>
                                                        </div>

                                                    </div>


                                                    <div className="d-flex justify-content-end">
                                                        <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                                                        <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                                                    </div>

                                                </div>

                                            </div>


                                        </div>
                                    </div>


                                    <div className="card-body pt-5">

                                        <div className="timeline-label">

                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">08:42</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-green fs-1"></i>
                                                </div>


                                                <div className="fw-mormal timeline-content text-green ps-3">Chromepay login</div>

                                            </div>


                                        

                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">14:37</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-bold text-gray-800 ps-3">Made deposit of
                                                    <a href="#" className="text-primary">&nbsp;700 Birr</a></div>

                                            </div>


                                            {/* <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-mormal text-muted ps-3">Indulging in poorly driving and keep structure keep great</div>

                                            </div> */}


                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">15:03</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-semibold text-gray-800 ps-3">Transfer of 
                                                    <a href="#" className="text-primary">&nbsp;650 Birr </a>initiated</div>

                                            </div>


                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-green fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-mormal text-green ps-3">Linked to Bank of Oromia</div>

                                            </div>


                                            <div className="timeline-item">

                                                <div className="timeline-label fw-bold text-gray-800 fs-6">21:03</div>


                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>


                                                <div className="timeline-content fw-semibold text-gray-800 ps-3">Transfer of 
                                                    <a href="#" className="text-primary">&nbsp;1200 Birr</a> Received</div>

                                            </div>


                                   

                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>


                    <div className="tab-pane fade" id="documents" role="tabpanel">

                        <div className="row">
                            <div className="col-lg-12 mb-4">
                                <h3 className="fw-bold my-2">User Documents
                                    <span className="fs-6 text-gray-400 fw-semibold ms-1"></span></h3>
                            </div>

                            <div className="row mt-4">




                                <div className="col-lg-3 basicdetail">
                                    <div className="carduser">
                                        <div className="text-center">
                                            <a className="img_div">
                                                <img src={data.residance} />
                                            </a>
                                            <a href="../assets_new/images/largepreview.png" className="viewimg">
                                                <i className="fa fa-eye" data-toggle="lightbox" data-gallery="gallery" aria-hidden="true"></i></a>
                                        </div>
                                        <div className="d-flex justify-content-between p-3">
                                            <h5>Proof of Residence</h5>
                                            <div>

                                                <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-lg-3 basicdetail">
                                    <div className="carduser">
                                        <div className="text-center">
                                            <a className="img_div">
                                                <img src={data.locaDocument} />
                                            </a>

                                            <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery">
                                                <i className="fa fa-eye" aria-hidden="true" data-toggle="lightbox" data-gallery="gallery"></i></a>

                                        </div>
                                        <div className="d-flex justify-content-between p-3">
                                            <h5>Local Govt. Doc</h5>
                                            <div>
                                                <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 basicdetail">
                                    <div className="carduser">
                                        <div className="text-center">
                                            <a className="img_div" href="#">
                                                <img src={data.landRegistration} />
                                            </a>
                                            <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                        </div>
                                        <div className="d-flex justify-content-between p-3">
                                            <h5>Land Registration</h5>
                                            <div>

                                                <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 basicdetail">
                                    <div className="carduser">
                                        <div className="text-center">
                                            <a className="img_div" href="#">
                                                <img src="../assets_new/images/id.png" />
                                            </a><a className="viewimg" href="../assets_new/images/id.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>

                                        </div>
                                        <div className="d-flex justify-content-between p-3">
                                            <h5>National ID</h5>
                                            <div>

                                                <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                    <div className="tab-pane fade" id="land" role="tabpanel">


                        <div className="row">
                            <div className="col-lg-6">

                                <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

                                    <div className="card-header cursor-pointer">

                                        <div className="card-title m-0">
                                            <h3 className="fw-bold m-0">Land Information</h3>
                                        </div>




                                    </div>


                                    <div className="card-body p-9">
                                        <div className="symbol symbol-100px   mb-4 symbol-lg-160px symbol-fixed position-relative">
                                            <img src={data.IDphoto} alt="image" />
                                            <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px">
                                            </div>

                                        </div>

                                        <div className="row mb-7">

                                        </div>

                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Location
                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Location verified"></i>
                                            </label>


                                            <div className="col-lg-8 fv-row">
                                                <span className="fw-semibold text-gray-800 fs-6">
                                                    <img src="../assets_new/images/digital-04.png" width="23px" /></span>&nbsp;
                                                <span className="badge badge-success">Verified</span>
                                            </div>

                                        </div>


                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Land Owner</label>


                                            <div className="col-lg-8">
                                                <span className="fw-bold fs-6 text-gray-800">{data.fullname}</span>
                                            </div>

                                        </div>


                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Contact Phone No.
                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be verified"></i>
                                            </label>


                                            <div className="col-lg-8 fv-row">
                                                <span className="fw-semibold text-gray-800 fs-6">+91{data.phone}</span>
                                                <span className="badge badge-success">Verified</span>
                                            </div>

                                        </div>
                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Land Size</label>


                                            <div className="col-lg-8 fv-row">
                                                <span className="fw-semibold text-gray-800 fs-6">{data.landSize}</span>

                                            </div>

                                        </div>


                                        <div className="row mb-7">

                                            <label className="col-lg-4 fw-semibold text-muted">Address
                                            </label>


                                            <div className="col-lg-8 d-flex align-items-center">
                                                <span className="fw-bold fs-6 text-gray-800 me-2">{data.address}
                                                </span>

                                            </div>

                                        </div>









                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-6">
                            <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

                                            <div className="card-header cursor-pointer">

                                            <div className="card-title m-0">
                                            <h3 className="fw-bold m-0">Land Certificate</h3>
                                            </div>




                                            </div>


                                            <div className="card-body p-9">
                                            <img src={data.landRegistration} className='d-block' style={{width : "53%", margin : "auto"}} />
                                            </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>




                    <div className="tab-pane fade" id="finance" role="tabpanel">

                        <div className="row">
                            <div className="col-lg-6">

                                <div className="card card-flush h-xl-100">

                                    <div className="card-header py-7">

                                        <div className="m-0">

                                            <div className="d-flex align-items-center mb-2">

                                                <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">{`$${data.sendindAmount + data.receiveAmount}`}</span>


                                                <span className="badge badge-light-danger fs-base">

                                                    <span className="svg-icon svg-icon-5 svg-icon-danger ms-n1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                            <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </span>


                                            </div>


                                            <span className="fs-6 fw-semibold text-gray-400">Financial Activities</span>

                                        </div>




                                    </div>


                                    <div className="card-body pt-0 pb-1">
                                        <div id="kt_charts_widget_27" className="min-h-auto"></div>
                                    </div>

                                </div>

                            </div>
                            <div className="col-lg-6">
                                <div className="card card-flush overflow-hidden h-md-100">

                                    <div className="card-header py-5">

                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold text-dark">Transaction Activities</span>
                                            <span className="text-gray-400 mt-1 fw-semibold fs-6"></span>
                                        </h3>




                                    </div>


                                    <div className="card-body d-flex justify-content-between flex-column pb-1 px-0">

                                        <div className="px-9 mb-5">

                                            <div className="d-flex align-items-center mb-2">

                                                <span className="fs-4 fw-semibold text-gray-400 align-self-start me-1">$</span>


                                                <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">4,500</span>


                                                <span className="badge badge-light-success fs-base">

                                                    <span className="svg-icon svg-icon-5 svg-icon-success ms-n1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                            <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </span>

                                            </div>


                                            <span className="fs-6 fw-semibold text-gray-400">Transaction Amount This Month</span>

                                        </div>

                                        <div id="kt_charts_widget_4" className="min-h-auto ps-4 pe-6" style={{height: "300px"}}></div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="tab-pane fade" id="account" role="tabpanel">

<div className="row">
    <div className="col-lg-12 mb-4">
        <h3 className="fw-bold my-2">User Bank Documents
            <span className="fs-6 text-gray-400 fw-semibold ms-1"></span></h3>
    </div>

    <div className="row mt-4 text-hover-primary">


{account.map((item)=>

        <div className="col-lg-3 basicdetail">
            <div className="carduser animestion-bank">
                <div className="text-center">
                    <Link to={`/custmer-bank-detail/${item._id}/${custID} `} className="img_div">
                        {/* <img src={data.residance} /> */}
                        <i class="fad fa-university fs-45"></i>
                    </Link>
                    <a href="../assets_new/images/largepreview.png" className="viewimg1">
                        {/* <i className="fa fa-eye" data-toggle="lightbox" data-gallery="gallery" aria-hidden="true"></i> */}
                        </a>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <h5>{item.Bankname}</h5>
                    <div>

                        <a href="#" className="ml-2"><i className="fad fa-university" aria-hidden="true"></i></a>
                    </div>
                </div>

            </div>
        </div>
        )}

        {/* <div className="col-lg-3 basicdetail">
            <div className="carduser">
                <div className="text-center">
                    <a className="img_div">
                    <i class="fad fa-university"></i>
                        
                    </a>

                    <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery">
                        <i className="fa fa-eye" aria-hidden="true" data-toggle="lightbox" data-gallery="gallery"></i></a>

                </div>
                <div className="d-flex justify-content-between p-3">
                    <h5>Local Govt. Doc</h5>
                    <div>
                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div> */}

        {/* <div className="col-lg-3 basicdetail">
            <div className="carduser">
                <div className="text-center">
                    <a className="img_div" href="#">
                       
                        <i class="fad fa-university"></i>
                    </a>
                    <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <h5>Land Registration</h5>
                    <div>

                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div> */}

        {/* <div className="col-lg-3 basicdetail">
            <div className="carduser">
                <div className="text-center">
                    <a className="img_div" href="#">
                        <img src="../assets_new/images/id.png" />
                    </a><a className="viewimg" href="../assets_new/images/id.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>

                </div>
                <div className="d-flex justify-content-between p-3">
                    <h5>National ID</h5>
                    <div>

                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div> */}

    </div>

</div>
                    </div>



                </div>

            </div>
        </div>

        <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">

            <div className="container-xxl d-flex flex-column flex-md-row flex-stack">

                <div className="text-dark order-2 order-md-1">
                    <span className="text-gray-400 fw-semibold me-1">Created by</span>
                    <a href="#" className="text-muted text-hover-primary fw-semibold me-2 fs-6">Chromepay</a>
                </div>


                <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                    <li className="menu-item">
                        <a href="#" className="menu-link px-2">About</a>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link px-2">Support</a>
                    </li>

                </ul>

            </div>

        </div>

    </div>

</div>

</div>
        </div>
    </div>
  )
}



export default CustmerViewOrg