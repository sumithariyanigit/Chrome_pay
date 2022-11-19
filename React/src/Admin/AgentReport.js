
import Sidebar from './Sidebar'
import Header from './Header'
import axios from "axios";
import React, {useState,useEffect} from "react";
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
var jwt = require("jsonwebtoken");

function AgentReport() {
    const [data, setData] = useState([])
    const [pageCount, setpageCount] = useState('');

    const limit = 10;
     let token = localStorage.getItem('token');
     var decode1 = jwt.decode(token);
     let adminID = decode1.admminID;
   
    //  const AddFormData = async (e, page) => {
    //     e.preventDefault();
    //         const data = new FormData(e.target);
    //         const Formvlaues = Object.fromEntries(data.entries());
    //         const formData =  Formvlaues
    //         console.log(Formvlaues);
    //         axios.post(`/approvalDIDs`,formData)
    //         .then(resp =>{
    //             const data = resp.data.findCust;
    //             setData(data);
    //             // console.warn(data);
    //             const total = resp.data.totlaRow
    //             console.log(total);
    //             const totalPage = (Math.ceil(total / limit));
    //             setpageCount(totalPage);
    //         })
            
    // }

    const userlist = async () =>{

        await axios.post(`/AgentReport`)
        .then(resp=>{
            let data =resp.data.filter
           
            setData(data)
            console.log('dghffdf',data)
            const total = resp.data.totlaRow
            console.log(total);
            const totalPage = (Math.ceil(total / limit));
            setpageCount(totalPage);
        })

    }

    useEffect(() => {
        userlist();
    }, [])
  ///////////////pagenestion///////////////
///////////////pagenestion///////////////
const fetchComments = async (page) => {
    const senData = { page: page }
    // const cosole = Fromvalue;
    // console.log(Fromvalue);
   axios.post(`/AgentReport`, senData)
        .then(resp => {
            const data = resp.data.filter;
            setData(data);
        })
    return data;
};

const handlePageClick = async (data) => {
    // console.log(data.selected);
    const page = data.selected + 1;
    console.log('pushpak',page);
    const commentsFormServer = await fetchComments(page);
    setData(commentsFormServer);
};
    // const handleAproove = async (_id) => {
    //     console.log(_id);
    //     const  {custID} = {custID :_id}
    //     console.log(custID);
    //     axios.post(`/updateDigitalID/${custID}/${adminID}`)
    //     .then(resp =>{
    //         if(resp.status){
    //             let data = resp.data.findCustomer;
    //             // setData(data)
    //             // console.log(data);
    //             if(data.status){
    //                 toast.success(data.msg);
    //                 return  userlist();
    //             }else{
    //                 toast.error(data.msg)
    //             }
    //         }else{
    //             toast.error(data.msg)
    //         }
    //     })
    // }

   ////////////////delete api call /////////////////
   const handleVerfiy = (_id) => {

    console.log(_id)
    window.location =`/agent-report-view/${_id}`;
    
}
const handleReport = (_id) =>{
    console.log(_id)
    window.location =`/performance_repost/${_id}`;
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
                                <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{ marginTop: '2rem' }}>

                                    <div className="card-body container-xxl pt-10 pb-8">

                                        <div className="d-flex align-items-center">
                                            <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                            <span className="fw-semibold text-white opacity-50">Digital ID</span>
                                        </div>

                                      
                                        <div className="d-flex flex-column">
                                        <form >
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">


                                                        {/* <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="senderName"
                                                                placeholder="Digital ID" />

                                                        </div> */}

                                                        <div className="col-lg-6 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="custID"
                                                                placeholder="ID-D" />

                                                        </div>

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
                                                            <select className="form-select border-0 flex-grow-1" name="fromAmount" data-control="select2"
                                                                data-placeholder="Amount" data-hide-search="true">
                                                                <option defaultValue="" selected disabled>Select Amount</option>
                                                                <option defaultValue="5000">500</option>
                                                                <option defaultValue="5000">3500</option>
                                                                <option defaultValue="10000">10000</option>
                                                                <option defaultValue="50000">50000</option>
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
                                                            <select className="form-select border-0 flex-grow-1" name="toAmount" data-control="select2"
                                                                data-placeholder="Amount" data-hide-search="true">
                                                                <option defaultValue="" selected disabled>Select Amount</option>
                                                                <option defaultValue="5000">500</option>
                                                                <option defaultValue="5000">3500</option>
                                                                <option defaultValue="10000">10000</option>
                                                                <option defaultValue="50000">50000</option>
                                                            </select>

                                                        </div> */}


                                                        {/* <div className="col-lg-2 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                            <label className="small_label">Start Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="fromDate" placeholder="from Date.." />
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                            <label className="small_label">End Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="toDate" placeholder="to Date.." />

                                                        </div> */}

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

                            <div className="col-lg-12">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Digital Id List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>
                                                    <tr className="fw-bold text-muted th-title">
                                                       {/* <th className="min-w-125px">Digital ID</th> */}
                                                        <th className="min-w-125px">ID</th>
                                                        <th className="min-w-125px">Fullname</th>
                                                        <th className="min-w-125px">Email</th>
                                                        <th className="min-w-125px">phone</th>
                                                        <th className="min-w-125px">Agent Code</th>
                                                        <th className="min-w-125px">Country</th>
                                                        <th className="min-w-100px text-end">Actions</th>
                                                        
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                      {data.map((item)=>
                                                    <tr>
                                                        
                                                        
                                                        {/* <td>{item.digitalID}	</td> */}
                                                        <td>{item._id}</td>
                                                        <td> {item.name}</td>
                                                        <td> {item.email}</td>
                                                      
                                                        <td>{item.phone}</td>
                                                        <td>{item.agentCode}</td>
                                                        <td>{item.country}</td>
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
                                                              
                                                            <button onClick={(e)=>{handleVerfiy(item._id)}}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Verify">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    <i className="fad fa-eye fs-4"></i>
                                                                      
                                                                        {/* <img src="/assets_new/images/verify.png" width="28px" /> */}
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
    </div>
  )
}



export default AgentReport