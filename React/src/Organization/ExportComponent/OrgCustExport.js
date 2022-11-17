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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var jwt = require("jsonwebtoken");

function OrgCustExport() {

    let token = localStorage.getItem('token')
    var decode1 = jwt.decode(token);
    let orgID = decode1.OrganisationID
    console.log(token)


    

    let ID = localStorage.getItem('ID')
    const [data, setData] = useState([])
 


 const AddFormData = (e)=>{
    e.preventDefault();
      const data = new FormData(e.target);
     const Formvlaues = Object.fromEntries(data.entries());
     const formData = Formvlaues
       console.log('Formvlaues === ', Formvlaues);
        axios.post(`/Org_cust/${token}`, formData)
       .then(resp => {
        const data = resp.data.findCust;
        setData(data)
        console.log(data);
        
       })
      
 }

const userlist = async () => {
        await axios.post(`/Org_cust/${token}`)
            .then(resp => {
                
                const data = resp.data.findCust;
                setData(data);
                console.log(data);
                console.log('pushpak',data)
                
                
            })
    }
    useEffect(() => {
        userlist()
    }, [])

   

  
/////////////unblocked user api call ////////////
 








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
                                <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{ marginTop: '2rem' }}>
                                    <div className="card-body container-xxl pt-10 pb-8">
                                        <div className="d-flex align-items-center">
                                            <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                            <span className="fw-semibold text-white opacity-50">Customers</span>
                                        </div>
                                        <form onSubmit={(e) => AddFormData(e)}>
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">

                                                        <div className="col-lg-4 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                            <label className="small_label">Start Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="fromDate" placeholder="from Date.." />
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                            <label className="small_label">End Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="toDate" placeholder="to Date.." />

                                                        </div>

                                                    </div>

                                                    <div className="min-w-150px d-flex">
                                                        <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
                                                        <button type="reset" onClick={userlist} className="btn btn-secondary" id="kt_advanced_search_button_1">Reset</button>
                                                    </div>

                                                </div>

                                                </form>

                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Customers List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>
                                        <div className="text-end">
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="download-table-xls-button btn btn-success mb-3"
                                                table="table-to-xls"
                                                filename="tablexls"
                                                sheet="tablexls"
                                                buttonText="Export Data to Excel Sheet"/>
                                        </div>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" id="table-to-xls">

                                                <thead>

                                                    <tr className="fw-bold text-muted th-title">


                                                        <th className="min-w-125px">D-ID</th>
                                                        <th className="min-w-125px">Name</th>
                                                        <th className="min-w-150px">Email Address</th>
                                                        <th className="min-w-150px">Mobile No. </th>
                                                        <th className="min-w-100px">DOB</th>
                                                        <th className="min-w-100px">Date of Creation</th>
                                                        <th className="min-w-100px">Country</th>
                                                        <th className="min-w-100px ">Status</th>
                                                        {/* <th className="min-w-100px text-end">Actions</th> */}
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                {data.map((item)=>

                                                    <tr>
                                                        <td>{item._id}</td>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.email}</td>
                                                        <td><span>{item.phone}</span> </td>
                                                        <td>{Moment(item.dateOfBirth).format("DD/MM//YYYY")}</td>
                                                        <td>{Moment(item.createdAt).format("DD/MM//YYYY")}</td>
                                                        <td>{item.nationality}</td>
                                                        {item.status == "pending" ? <><td><span className="badge badge-light-pending fs-5">{item.status}</span></td></>:<><td><span className="badge badge-light-info fs-5">{item.status}</span></td></>}
                                                        
                                                        
                                                    </tr>
                                                )}

                                                    {/* <tr>
                                                        <td>##41e8bd3f3ca</td>
                                                        <td> Virendra Shilpkar </td>
                                                        <td> virendra@gmail.com </td>
                                                        <td><span>+221 123-456-7840</span> </td>
                                                        <td>05/06/1980</td>
                                                        <td>05/08/2020</td>
                                                        <td>Ethiopia</td>
                                                        <td>
                                                        <td><span className="badge badge-light-info fs-5">Verified</span></td> 
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <button
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Suspend ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-minus-circle fs-4"></i>
                                                                    </span>
                                                                </a>
                                                                <button
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Password Reset ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fas fa-repeat-alt"></i>
                                                                    </span>
                                                                </a>
                                                                <a href='organization_detail.html'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </a>
                                                                <a href='#'
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Delete">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-trash-alt"></i>
                                                                    </span>

                                                                </a>
                                                                <a href='#'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Disable OTP">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye-slash"></i>
                                                                    </span>

                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr> */}


                                                </tbody>

                                            </table>

                                        </div>

                                        

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


export default OrgCustExport