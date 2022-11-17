import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
var jwt = require("jsonwebtoken");

function IpAddress() {

    const [data,setData]=useState([]) 
    const [pageCount, setpageCount] = useState('');
    
    const limit = 5;
        let token = localStorage.getItem('token')
        var decode1 = jwt.decode(token);
        let adminID = decode1.admminID;

    const AddFormData1 = async(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData =Formvlaues;
        console.log(Formvlaues);
        axios.post(`/blockIPList/${adminID}`,formData)
        .then(resp =>{
            let data =resp.data.filter;
            setData(data);
            console.log(data);

        })
    }
    
    const AddFormData = async (e, page) => {
        e.preventDefault();
            const data = new FormData(e.target);
            const Formvlaues = Object.fromEntries(data.entries());
            const formData =  Formvlaues
            console.log(Formvlaues);
            axios.post(`/BlockIP/${adminID}`,formData)
             .then(resp =>{
                if(resp.status){
                    const data = resp.data;
                    if(data.status){
                        toast.success(data.msg);
                        return userlist();
                    }else{
                        toast.error(data.msg);
                    }
                }else{
                    toast.error(data.msg);
                }
                
                // setData(data);
                 console.warn(data);
                
                 const total = resp.data.totlaRow
                 console.log(total);
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
            })
            
     }
    
    const userlist = async () =>{
       await axios.post(`blockIPList/${adminID}`)
        .then(resp =>{
            let data =resp.data.filter
            setData(data);
            const total = resp.data.totlaRow;
            console.log(total);
            const totalPage =(Math.ceil(total / limit));
            setpageCount(totalPage);

        })
    }
 useEffect(() => {
   userlist();
 }, [])
 
 ////-------------pegination------------///

 const fetchComments = async (page) =>{
     const sentData ={ page:page }

     await axios.post(`blockIPList/${adminID}`,sentData)
     .then(resp =>{
        let data = resp.data.filter;
        setData(data);

     })

 }
 const handlePageClick = async (data) =>{
    const page = data.selected + 1;

    const commentsFormServer = await fetchComments(page);
    setData(commentsFormServer);

 }

// const handleunblocked = async(_id) =>{
//     console.log(_id);
//     axios.delete(`/unBlockIP/${adminID}/${_id}`)
//     .then(resp =>{
//         if(resp.status){
//             let data =resp.data;
//             toast.success(data.msg);
//             return userlist();
//         }
//     })

// }

/////////////////delete api call /////////////////
const handleunblocked = (_id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to Unblock selected IP ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Unblock it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/unBlockIP/${adminID}/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Suspend!',
                             "IP Unblock successfully",
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

    return (
        <>
        <ToastContainer/>
            <Sidebar />
            <Header />
            
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                    <div className="container-xxl" id="kt_content_container">
                        <div className="row g-5 g-xl-8">
                            <div className="col-lg-12">
                                <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{ marginTop: '2rem' }}>

                                    <div className="card-body container-xxl pt-10 pb-8">

                                        <div className="d-flex align-items-center">
                                            <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                            <span className="fw-semibold text-white opacity-50">Customers IP Address</span>
                                        </div>

                                        <div className="d-flex flex-column">

                                            <div className="d-lg-flex align-lg-items-center">
                                              <form onSubmit={(e) => AddFormData1(e)}>
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">


                                                        <div className="col-lg-6 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="IP"
                                                                placeholder="IP Address" />

                                                        </div>

                                                        {/* <div className="col-lg-3 d-flex align-items-center mb-3 mb-lg-0">
                                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="phone"
                                                                placeholder="Name" />

                                                        </div> */}

                                                        {/* <div className="col-lg-2 d-flex align-items-center mb-5 mb-lg-0">
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
                                                            <select className="form-select border-0 flex-grow-1" name="status" data-control="select2"
                                                                data-placeholder="Category" data-hide-search="true">
                                                                <option defaultValue="" selected disabled>Status</option>
                                                                <option defaultValue="In Progress">In Progress</option>
                                                                <option defaultValue="Verified">Verified</option>
                                                                <option defaultValue="pending">pending</option>
                                                            </select>
                                                        </div> */}

                                                        {/* <div className="col-lg-2 d-flex align-items-center mb-5 mb-lg-0">
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
                                                            <select className="form-select border-0 flex-grow-1" data-control="select2" data-placeholder="Category" data-hide-search="true" name="nationality">
                                                            <option value="" selected disabled>Country</option>
                                                                <option value="India">India</option>
                                                                <option value="USA">USA</option>
                                                                <option value="Uganda">Uganda</option>
                                                            </select>

                                                        </div> */}


                                                        <div className="col-lg-2 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                            {/* <label className="small_label">Start Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="fromDate" placeholder="from Date.." />
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div> */}
                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                            {/* <label className="small_label">End Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="toDate" placeholder="to Date.." /> */}

                                                        </div>

                                                    </div>

                                                    <div className="min-w-150px text-end">
                                                        <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
                                                    </div>

                                                </div>

                                                </form>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                            
                            <div className="col-lg-6">

            <div className="card card-xxl-stretch mb-5 mb-xl-8">

                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Blocked IP Address</span>
                        <span className="text-muted mt-1 fw-semibold fs-7"></span>
                    </h3>

                </div>

                <div className="card-body py-3">

                <form onSubmit={(e) => AddFormData(e)} id="kt_account_profile_details_form" className="form" >
                                                <div className="card-body border-top p-9">
                                                    

                                                    <div className="row mb-8">
                                                        <div className="col-lg-12 mb-6">
                                                            <div className="row">
                                                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">IP Address</label>
                                                                <div className="col-lg-8 fv-row">
                                                                    <input type="text" name="IP" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="IP Address"  />
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
                            <div className="col-lg-6">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Blocked IP List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>
                                                    <tr className="fw-bold text-muted th-title">


                                                        <th className="min-w-125px">IP Address</th>
                                                        {/* <th className="min-w-125px">Name</th>
                                                        <th className="min-w-150px">Email Address</th>
                                                        <th className="min-w-150px">Mobile No. </th>
                                                        <th className="min-w-100px">DOB</th>
                                                        <th className="min-w-100px">Date of Creation</th>
                                                        <th className="min-w-100px">Country</th>
                                                        <th className="min-w-100px ">Status</th> */}
                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {data.map((item)=> 
                                                    
                                                    <tr>
                                                        <td>{item.IP}</td>
                                                        {/* <td> Virendra Shilpkar </td>
                                                        <td> virendra@gmail.com </td>
                                                        <td><span>+221 123-456-7840</span> </td>
                                                        <td>05/06/1980</td>
                                                        <td>05/08/2020</td>
                                                        <td>Ethiopia</td>
                                                        <td>
                                                        <td><span class="badge badge-light-info fs-5">Verified</span></td> 
                                                        </td> */}
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                
                                                                
                                                                <button onClick={(e) => {handleunblocked(item._id)}}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Unblock IP">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye-slash"></i>
                                                                    </span>

                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )}

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
        </>
    );
}

export default IpAddress