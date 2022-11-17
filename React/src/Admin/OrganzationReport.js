
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import {useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
var jwt = require('jsonwebtoken');

const OrganzationReport = () => {

const [data, setData] = useState([]);
const [pageCount, setpageCount] = useState('');

const limit = 10;
let token = localStorage.getItem('token')
    var decode1  = jwt.decode(token);
    let adminID =decode1.admminID
const AddFormData = async (e, page) => {
    e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData =  Formvlaues
        console.log(Formvlaues);
        axios.post(`/OrganisationList`,formData)
        .then(resp =>{
            const data = resp.data.filter;
            setData(data)
            const total = resp.data.totlaRow
            console.log(total);
            const totalPage = (Math.ceil(total / limit));
            setpageCount(totalPage);
        })
        
}


    const userlist = async () => {
        await axios.post(`/OrganisationList`)
            .then(resp => {
                const data = resp.data.filter;
                setData(data)
                // console.log(data);
                const total = resp.data.totlaRow
                console.log(total);
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
            })
    }
    useEffect(() => {
        userlist()
    }, [])

  ///////////////pagenestion///////////////
  const fetchComments = async (page) => {
    const senData = { page: page }
    // const cosole = Fromvalue;
    // console.log(Fromvalue);
   axios.post(`/OrganisationList`, senData)
        .then(resp => {
            const data = resp.data.filter;
            setData(data);
        })
    return data;
};

const handlePageClick = async (data) => {
    // console.log(data.selected);
    const page = data.selected + 1;
    const commentsFormServer = await fetchComments(page);
    setData(commentsFormServer);
};  
    
/////////////unblocked user api call ////////////
const handleunblocked = (_id) => 
{
console.log(_id);
  axios.put(`/unsuspend/${_id}`)
    .then(res => {
        if (res.status) {
               let data = res.data;
              toast.success(data.msg);
              return userlist();
            } 
        
    })
}

/////////////blocked user api call ////////////
const handlesuspend = (_id) => 
{
axios.put(`/suspend/${_id}`)
.then(res => {
    if (res.status) {
        let data = res.data;
          toast.success(data.msg);
          return  userlist();
        } 
})
}
/////////////Delete orgnization api Call///////


// const handledelete =(_id) => 
// {

// axios.delete(`/deleteOrganization/${_id}`)
// .then(res =>{
//     if(res.status){
//         let data = res.data;
//         toast.success(data.msg);
//         return userlist();
//     }
// })
// }
const handledelete = (_id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to delete selected Customer ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/deleteOrganization/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "Customer deleted successfully",
                            'success'
                          )
                         return userlist();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
}

const handleView = (_id) =>{
    // console.log(_id)
    window.location =`/organzation-view-admin/${_id}`;
    return false;
}
const handleVerfiy = (_id) => {
    const {orgID} = {orgID : _id}
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to verify selected Customer ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, verify it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.post(`/orgVerify/${orgID}/${adminID}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'verified!',
                             "Customer verified successfully",
                            'success'
                          )
                         return userlist();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
}


const handleReport =(_id) =>{
    console.log(_id);
    window.location =`/oragnzation-performance_repost/${_id}`;
    return false;
}

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
                                                                    className="col-lg-4 d-flex input-container align-items-center mb-3  mb-lg-0">
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
                                                                    className="col-lg-4 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                                    <label className="small_label">End Date</label>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <i className="fad fa-calendar fs-2"></i>
                                                                    </span>
                                                                    <input type="date"
                                                                        className="form-control unstyled form-control-flush flex-grow-1"
                                                                        name="toDate" placeholder="User Name.." />

                                                                </div>





                                                                <div className="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
                                                                    <div
                                                                        className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                                    </div>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24"
                                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <rect x="2" y="2" width="9" height="9" rx="2"
                                                                                fill="currentColor" />
                                                                            <rect opacity="0.3" x="13" y="2" width="9"
                                                                                height="9" rx="2" fill="currentColor" />
                                                                            <rect opacity="0.3" x="13" y="13" width="9"
                                                                                height="9" rx="2" fill="currentColor" />
                                                                            <rect opacity="0.3" x="2" y="13" width="9"
                                                                                height="9" rx="2" fill="currentColor" />
                                                                        </svg>
                                                                    </span>
                                                                    <select className="form-select border-0 flex-grow-1"
                                                                        data-control="select2" data-placeholder="Status"
                                                                        data-hide-search="true" name='status'>
                                                                        <option value=""></option>
                                                                        <option value="1" selected="selected">Category</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="Confirmed">Confirmed</option>
                                                                        <option value="verify">verify</option>
                                                                    </select>

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

    </div>

    <div className="card-body py-3">

        <div className="table-responsive">

            <table
                className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                <thead>
                    <tr className="fw-bold text-muted th-title">
                        <th className="min-w-100px">Image</th>
                        <th className="min-w-150px">Code</th>
                        <th className="min-w-150px">Organization </th>
                        <th className="min-w-150px">Country</th>
                        <th className="min-w-150px">Date of Creation    </th>
                        <th className="min-w-150px ">Status</th>
                        <th className="min-w-150px ">Number of Users</th>
                        <th className="min-w-150px text-end">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {data.map((item)=>
                    <tr>
                        <td><img src={item.logo} width="100px" /></td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{item.createdAt}</td>
                         <td><span className="badge badge-light-pending fs-5">{item.status}</span>
                        </td>
                       
                        <td>0</td>


                        <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
                            <button onClick={(e)=>{handleReport(item._id)}}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Report">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    {/* <i className="fad fa-eye fs-4"></i> */}
                                                                      
                                                                        <img src="/assets_new/images/report.png" width="35px" />
                                                                    </span>

                                                                </button>
                            
                           


                                <button onClick= {(e) => {handleView(item._id)}}
                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="View Detail">
                                    <span className="svg-icon svg-icon-3">
                                        <i className="fad fa-eye fs-4"></i>
                                    </span>

                                </button>

                                
                               
                            </div>
                        </td>
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
        <div className="col-lg-12 mt-2 text-end">
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

            



export default OrganzationReport