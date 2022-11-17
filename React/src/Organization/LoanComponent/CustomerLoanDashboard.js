import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import Moment from 'moment';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import GaugeChart from 'react-gauge-chart';

function CustomerLoanDashboard() {
    const {_id} = useParams();
    console.log(_id)

    const [data , setData] = useState([]);
    const [detail ,setDetail] = useState([]);
    const [custID , setCustID] = useState('');
    const [card ,setCard]= useState('');
    const [score,setScore]=useState('');
  const userlist = async () => {
       const {LoanID} = {LoanID : _id}
    await axios.post(`/org_cust_loan/${LoanID}`)
    .then(resp =>{
         let data = resp.data.Loan;
         const custID =data.CustomerID
         setCustID(custID);
        //  console.log('@pushpak@',custID)
         setData(data);
        //  console.log('@@@@@', data);

    })

  }

  useEffect(() => {
    userlist();
   
  
    
  }, [])
  useEffect(() => {
  const cardScore = async () =>{
    // const {custID} ={custID : _id}
    await axios.post(`/Calculate_credit_Score/${custID}`)
        .then(resp=>{
            let data = resp.data;
            let point = data.CREDIT_PERCENTEGE;
            const score=data.CREDIT_SCORE;
            setScore(score);
            setCard(point);
            console.log('@@@@@P',point)
        })

  };
  cardScore();
}, [custID])

  useEffect(() => {
  const custdetail = async () => {
   
    axios.post(`/custdetail/${custID}`)
    .then(resp =>{
        let data = resp.data.obj
        setDetail(data);
        // console.log('@pushpak@',data);
    })

  };
  custdetail();
}, [custID])

 const handleAccept = (_id) =>{
    console.log(_id);
    const {LoanID} = {LoanID : _id}

    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to Accept this selected Loan ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
      }).then((result) => {
        if (result.isConfirmed) {
    axios.post(`/org_loan_accept/${LoanID}`)
    .then(resp =>{
        if(resp.status){
            let data = resp.data;
            if(data.status){
                toast.success(data.msg);
                Swal.fire(
                    'verified!',
                     "Customer Accept successfully",
                    'success'
                  )

            }else{
                toast.error(data.msg);
            }
        }else{
            toast.error(data.msg);
        }

    })
}
})

 }
//  const handleVerfiy = (_id) => {
//     const {custID} = {custID : _id}
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "Are you sure you want to verify selected Customer ?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, verify it!'
//       }).then((result) => {
//         if (result.isConfirmed) {         
//             axios.post(`/customerVerify/${custID}/${orgID}`)
//             .then(res => {
//                 if (res.status) {
//                     let data = res.data;
//                     if (data.status) { 
//                         Swal.fire(
//                             'verified!',
//                              "Customer verified successfully",
//                             'success'
//                           )
//                          return userlist();
//                     } else {
//                         toast.error(data.msg);
//                     }
//                 }
//                 else {
//                     toast.error(data.msg);
//                 }
//             })
//         }
//       })
// }



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
            <div className="row">
                <div className="col-lg-8">

                    <div className="card rounded-15 mb-5 mb-xl-10 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                        <div className="card-body  pt-9 pb-0 ">
                            {/* <!--begin::Details--> */}
                            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                                {/* <!--begin: Pic--> */}
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                        <img src={detail.IDphoto} alt="image" />
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
                                                <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{detail.fullname}</a>
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
                                                    Farmer
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
                                                            <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                  {detail.nationality}
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
                                                            <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                 { detail.email}
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

                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value={detail.totalAmount} data-kt-countup-prefix="$">{detail.totalAmount}</div>
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

                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value={detail.totalTransection}>{detail.totalTransection}</div>
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
                                                    <span className="fw-bold fs-6">{detail.proPercentage}%</span>
                                                </div>
                                                <div className="h-5px mx-3 w-100 bg-light mb-3">
                                                    <div className="bg-success rounded h-5px" style={{width:`${detail.proPercentage}`}} role="progressbar"  aria-valuenow={detail.proPercentage} aria-valuemin="0" aria-valuemax="100"></div>
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
                                    {detail.fingerPrint == 1 ? <> 
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
                                    {detail.facialIdentification == 1 ? <> 
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
                                    {detail.Location == 1 ? <> 
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



                

                

            </div>
        </div>
        

                               <div className="col-lg-12">
                                <div className="card mb-5 mb-xl-10">
                                    <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                        <div className="card-title m-0">
                                            <h3 className="fw-bold m-0">Loan Details</h3>
                                        </div>
                                    </div>
                                    <div id="kt_account_settings_profile_details" className="collapse show">
                                        <form  id="kt_account_profile_details_form" className="form" >
                                            <div className="card-body border-top p-9">


                                                <div className="row mb-8">


                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Organisation ID</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="OrganisationID" value={data.OrganisationID} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full Name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-8">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Customer ID </label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="CustomerID" value={data.CustomerID} className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="password" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6  mb-8 ">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Loan Type</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Loan_type" value={data.Loan_type} className="form-control form-control-lg form-control-solid" placeholder="Email Address" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6  mb-8 ">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                                <span className="required">Loan Status</span>
                                                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                                                            </label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Loan_status" value={data.Loan_status} className="form-control form-control-lg form-control-solid" placeholder="Phone number" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-8">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Interest Rate</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Interest_Rate" value={data.Interest_Rate} className="form-control form-control-lg form-control-solid" placeholder="country" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">EMI</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="EMI" value={data.EMI} className="form-control form-control-lg form-control-solid" placeholder="City" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Total Amount</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Total_Amount" value={data.Total_Amount} className="form-control form-control-lg form-control-solid" placeholder="Address" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 ">
                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Duration Month </label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Duration_Month" value={data.Duration_Month} className="form-control form-control-lg form-control-solid position-relative" placeholder="Post Code" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Duration Year</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Duration_Year" value={data.Duration_Year} className="form-control form-control-lg form-control-solid" placeholder="50000$" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 mb-6">

                                                        <div className="row">
                                                            <label className="col-lg-4 col-form-label  fw-semibold fs-6">Interest Percentege</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Interest_percentege" value={data.Interest_percentege} className="form-control form-control-lg form-control-solid" placeholder="50000$" />
                                                            </div>
                                                          
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 ">
                                                <div className="row">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Intrest Amount Per Year</label>
                                                    <div className="col-lg-6 fv-row">
                                                    <input type="number" name="Intrest_Amount_per_Year" value={data.Intrest_Amount_per_Year} className="form-control form-control-lg form-control-solid position-relative" placeholder="limit" />
                                                    </div>
                                                </div>
                                                
                                            </div>

                                                    <div className="col-lg-6 mb-6">
                                                        <div className="row ">
                                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Total Interest Amount</label>
                                                            <div className="col-lg-8 fv-row">
                                                                <input type="text" name="Total_Interest_Amount" value={data.Total_Interest_Amount} className="form-control form-control-lg form-control-solid" placeholder="Amount" />
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>





                                            </div>
                                            <div className="card-footer d-flex justify-content-end py-6 px-9">
                                                <button type="button" onClick={(e)=>{handleAccept(data._id)}} className="btn btn-light btn-active-light-primary me-2">Accept</button>

                                            </div>
                                        </form>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="row">
                <div className="col-lg-12 mb-4">
                  <h3 className="fw-bold mt-3">Credit Score
                   </h3>
                </div>
                            <div className="col-lg-12 mb-4 ">
                                <div className="card mb-5 mb-xl-10">
                                    {/* <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                        <div className="card-title m-0">
                                            <h3 className="fw-bold m-0">Credit Score</h3>
                                        </div>
                                    </div> */}
                                    <div id="kt_account_settings_profile_details" className="collapse show row">
                                    <div className="col-lg-8 mt-5 mb-0">
                                    <div className="text-center "><h1 className="text-pda">{score}</h1></div>  
                                    <GaugeChart id="gauge-chart5"
                                        nrOfLevels={100}
                                        
                                        arcsLength={[0.2, 0.6, 0.2]}
                                        colors={['#EA4228','#F5CD19','#5BE12C'  ]}
                                        textColor={['#000000']}
                                        fontSize={0.5}
                                        percent={card}
                                        arcPadding={0.02}
                                        
                                        />
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <h1 className="text-padd">300</h1>
                                            </div>
                                            
                                            <div className="col-lg-6">
                                                <h1 className="text-end text-padd1">900</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mt-5">
                                        <div className="text-center">
                                        <div className="row">
                                        <div className="col-lg-12"><h1 className="card-score">Your Credit Card Score </h1></div>
                                        <div className="row">
                                        <div className="col-lg-12 row">
                                        <div className="col-lg-2 mt-5"><div className="box-poor"></div></div>
                                        <div className="col-lg-9 mt-5"><h1>Poor</h1></div>
                                        </div>
                                        <div className="col-lg-12 row">
                                        <div className="col-lg-2 mt-5"><div className="box-good"></div></div>
                                        <div className="col-lg-9 mt-5"><h1>Good</h1></div>
                                        </div>
                                       <div className="col-lg-12 row">
                                       <div className="col-lg-2 mt-5"><div className="box-excellent"></div></div>
                                        <div className="col-lg-9 mt-5"><h1>Excellent</h1></div>
                                       </div>
                                        </div>
                                        

                                        </div>
                                        </div>

                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                            </div>
                            <div className="row">
                <div className="col-lg-12 mb-4">
                  <h3 className="fw-bold mt-3">User Documents
                   </h3>
                </div>

                <div className="row mt-4  mb-5">




                  <div className="col-lg-4 basicdetail mb-2">
                    <div className="carduser">
                      <div className="text-center">
                        <a className="img_div">
                          <img src={data.recidence} />
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

                  <div className="col-lg-4 basicdetail mb-2">
                    <div className="carduser">
                      <div className="text-center">
                        <a className="img_div">
                          <img src={data.LocalGov} />
                        </a>

                        <a className="viewimg" href="../assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery">
                          <i className="fa fa-eye" aria-hidden="true" data-toggle="lightbox" data-gallery="gallery"></i></a>

                      </div>
                      <div className="d-flex justify-content-between p-3">
                        <h5>Local Document</h5>
                        <div>
                          <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 basicdetail mb-2">
                    <div className="carduser">
                      <div className="text-center">
                        <a className="img_div" href="#">
                          <img src={data.LandRegistration} />
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
        </>
  )
}

export default CustomerLoanDashboard