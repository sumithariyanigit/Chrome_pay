import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import {useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import Modal from "react-responsive-modal";
import { Button } from "react-bootstrap";
import moment from 'moment';
var jwt = require('jsonwebtoken');

const ExportOrgCustList = () => {

const [data, setData] = useState([]);
const [pageCount, setpageCount] = useState('');
const [orgmenu, setOrgMenu] = useState([]);
const [open, setOpen] = useState(false);
const [orgID2, setorgID2] = useState("");

const limit = 10;
let token = localStorage.getItem('token')
    var decode1  = jwt.decode(token);
    let adminID = decode1.admminID
const AddFormData = async (e, page) => {
    e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData =  Formvlaues
        console.log(Formvlaues);
            axios.post(`/AdminOrg`,formData)
            .then(resp =>{
                const data = resp.data.findOrg;
                setData(data)
                
            })
        
}


    const userlist = async () => {
        await axios.post(`/AdminOrg`)
            .then(resp => {
                const data = resp.data.findOrg;
                setData(data)
                // console.log(data);
                
            })
    }
    useEffect(() => {
        userlist()
    }, [])

 

    return (
    
    <div>
        <ToastContainer/>
       <Header/>
       <Sidebar/>
        <div className="d-flex flex-column flex-root">

            <div className="page d-flex flex-row flex-column-fluid">
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">


                        <div className="container-xxl" id="kt_content_container">

                            <div className="row g-5 g-xl-8">

                                <div className="col-lg-12">
                                    {/* style="background-color: #2c486d;background-size: auto 100%; background-image: url(assets_new/images/taieri.svg)" */}
                                    <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover">

                                        <div className="card-body container-xxl pt-10 pb-8">

                                            <div className="d-flex align-items-center">
                                                <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                                <span className="fw-semibold text-white opacity-50">
                                                    Organization List
                                                </span>
                                            </div>

                                            <div className="d-flex flex-column">

                                                <div className="d-lg-flex align-lg-items-center">
                                                <form  onSubmit={(e) => AddFormData(e)}>
                                                        <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body w-xxl-850px  me-lg-10 my-5">

                                                            <div className="row flex-grow-1 mb-5 mb-lg-0 h-lg-60px">

                                                                <div
                                                                    className="col-lg-6 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                                    <label className="small_label">Start Date</label>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <i className="fad fa-calendar fs-2"></i>
                                                                    </span>
                                                                    <input type="date"
                                                                        className="form-control unstyled form-control-flush flex-grow-1"
                                                                        name="fromDate" placeholder="User Name.." />
                                                                    <div
                                                                        className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className="col-lg-6 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                                    <label className="small_label">End Date</label>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <i className="fad fa-calendar fs-2"></i>
                                                                    </span>
                                                                    <input type="date"
                                                                        className="form-control unstyled form-control-flush flex-grow-1"
                                                                        name="toDate" placeholder="User Name.." />

                                                                </div>


                                                              

                                                            </div>

                                                            <div className="min-w-150px text-center">
                                                                <button type="submit" className="btn btn-dark"
                                                                    id="kt_advanced_search_button_1">Search</button>
                                                                <button type="reset" onClick={userlist} className="btn btn-secondary" id="kt_advanced_search_button_1">Reset</button>
                                                            </div>

                                                        </div>
                                                </form>


                                                </div>

                                            </div>

                                        </div>

                                        </div>
                                    </div>

                                <div className="col-lg-12">

<div className="card card-xxl-stretch mb-5 mb-xl-8">

    <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Organization List</span>
            <span className="text-muted mt-1 fw-semibold fs-7">Over 50 Organization </span>
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

            <table
                className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" id="table-to-xls">

                <thead>
                    <tr className="fw-bold text-muted th-title">
                        <th className="min-w-100px">D-ID</th>
                        <th className="min-w-150px">Code</th>
                        <th className="min-w-150px">Organization </th>
                        <th className="min-w-150px">Country</th>
                        <th className="min-w-150px">Date of Creation    </th>
                        <th className="min-w-150px ">Status</th>
                        <th className="min-w-150px ">Number of Users</th>
                        
                    </tr>
                </thead>

                <tbody>

                    {data.map((item)=>
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                         <td><span className="badge badge-light-pending fs-5">{item.status}</span>
                        </td>
                       
                        <td>0</td>


                        
                    </tr>
                     )}
                    {/* <tr>
                         <td><img src="/assets_new/images/ide.png" width="60px" /></td>
                        <td>ZXUDAC</td>
                        <td>Ide</td>
                        <td>Ethiopia</td>
                        <td>18/02/2018</td>


                       
                         <td><span className="badge badge-light-info fs-5">Confirmed</span>
                        </td>
                    
                        <td>505433</td>


                        <td>
                            <div className="d-flex justify-content-end flex-shrink-0">


                                <a href="#"
                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="Suspend ">
                                    <span className="svg-icon svg-icon-3">
                                        <i className="fad fa-minus-circle fs-4"></i>
                                    </span>

                                </a>

                                <a href="#"
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

            </div>
            </div>
            </div>


            );
}


export default ExportOrgCustList