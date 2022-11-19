import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Moment from 'moment';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

function SubAdminList() {
       
       const [data, setData] = useState([]);
        
       

       const userlist = async () =>{
        await axios.post(`/findSubAdmin`)
        .then(resp =>{
           let data =resp.data.find
           setData(data);
           console.log(data);

        })
       }

       useEffect(() => {
        userlist();
       }, [])

       const handleView = (_id) =>{
          console.log(_id);
        window.location = `/subadmin-view/${_id}`;
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
                                <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{ marginTop: '2rem' }}>
                                    <div className="card-body container-xxl pt-10 pb-8">
                                        <div className="d-flex align-items-center">
                                            <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                            <span className="fw-semibold text-white opacity-50">Sub Admin </span>
                                        </div>
                                        <form >
                                        <div className="d-flex flex-column">
                                            <div className="d-lg-flex align-lg-items-center">
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">
                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">
                                                        <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="ID"
                                                                placeholder="Enter D-ID" />

                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                                </svg>
                                                            </span>
                                                            <input type="number" className="form-control form-control-flush flex-grow-1" name="phone"
                                                                placeholder="Mobile Number" />

                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-5 mb-lg-0">
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <select className="form-select border-0  flex-grow-1" name="status" data-control="select2"
                                                                data-placeholder="Category" data-hide-search="true">
                                                                    <option value="" selected disabled>Status</option>
                                                                <option value="pending">In Progress</option>
                                                                <option value="verify">Verified</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-5 mb-lg-0">
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <select name="nationality" className="form-select border-0 flex-grow-1" data-control="select2" data-placeholder="Category" data-hide-search="true">
                                                                <option value="" selected disabled>Country</option>
                                                                <option value="india">India</option>
                                                                <option value="USA">USA</option>
                                                                <option value="Uganda">Uganda</option>
                                                            </select>

                                                        </div>


                                                        <div className="col-lg-2 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                            <label className="small_label">Start Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="fromDate" placeholder="User Name.." />
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                            <label className="small_label">End Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="toDate" placeholder="User Name.." />

                                                        </div>

                                                    </div>

                                                    <div className="min-w-150px text-end d-flex">
                                                        <button type="submit" className="btn btn-dark mr-3" id="kt_advanced_search_button_1">Search</button>
                                                        <button type="reset"  className="btn btn-secondary" id="kt_advanced_search_button_1">Reset</button>
                                                    </div>

                                                </div>



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
                                            <span className="card-label fw-bold fs-3 mb-1">Sub Admin List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>

                                                    <tr className="fw-bold text-muted th-title">


                                                        <th className="min-w-125px">D-ID</th>
                                                        <th className="min-w-125px">Name</th>
                                                        <th className="min-w-150px">Email Address</th>
                                                        <th className="min-w-150px">Mobile No. </th>
                                                        <th className="min-w-100px">Address</th>
                                                        <th className="min-w-100px">State</th>
                                                        <th className="min-w-100px">City</th>
                                                        <th className="min-w-100px ">Role</th>
                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                               {data.map((item)=>

                                                    <tr>
                                                        <td>{item._id}</td>
                                                        <td> {`${item.Firstname} ${item.lastName}` } </td>
                                                        <td> {item.email} </td>
                                                        <td><span>{item.phone}</span> </td>
                                                        <td>{item.address}</td>
                                                        <td>{item.state}</td>
                                                        <td>{item.city}</td>
                                                        <td>
                                                        <td><span className="badge badge-light-info fs-5">{item.role}</span></td> 
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                {/* <button
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Suspend ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-minus-circle fs-4"></i>
                                                                    </span>
                                                                </button> */}
                                                                {/* <button
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Password Reset ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fas fa-repeat-alt"></i>
                                                                    </span>
                                                                </button> */}
                                                                <button onClick={(e) =>{ handleView(item._id) }}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </button>
                                                                {/* <a href='#'
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Delete">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-trash-alt"></i>
                                                                    </span>

                                                                </a> */}
                                                                {/* <a href='#'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Disable OTP">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye-slash"></i>
                                                                    </span>

                                                                </a> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                </tbody>

                                            </table>

                                        </div>

                                        {/* <div className="col-lg-12 mt-2 text-end">
                                        <ReactPaginate
                                            previousLabel={"previous"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination justify-content-end"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousClassName={"page-item"}
                                            previousLinkClassName={"page-link pagestyle"}
                                            nextClassName={"page-item"}
                                            nextLinkClassName={"page-link"}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                            activeClassName={"active"}
                                        />
                                    </div> */}

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
  )
}

export default SubAdminList