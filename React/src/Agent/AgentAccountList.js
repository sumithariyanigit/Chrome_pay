import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import  Jwt  from "jsonwebtoken";


function AgentAccountList() {
      const [pageCount, setpageCount] = useState('');
       const [data ,setData] = useState([]);

      const limit =10;

       const AddFormData = async (e,page) =>{
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;
        console.log(Formvlaues);

        axios.post(`/viewBankAccounts`,formData)
        .then(resp =>{
          let data =resp.data.filter;
          setData(data);
          console.log(data);
          const total =resp.data.totlaRow;
          console.log(total);
          const totalPage =(Math.ceil(total / limit));
          setpageCount(totalPage);
        })

        

       }


       const userlist = async () =>{

        await axios.post(`/viewBankAccounts`)
        .then(resp =>{
          const data = resp.data.filter
          setData(data);
          console.log(data);
          const total =resp.data.totlaRow;
          console.log(total);
          const totalPage =(Math.ceil(total / limit));
          setpageCount(totalPage);
        })
       }

       useEffect(() => {
        userlist();
       }, [])
       

//-----------------pagenation------------------//

const fetchComments = async (page) =>{
  const sentData = { page:page }
  axios.post(`/viewBankAccounts`,sentData)
  .then(res=>{
    let data = res.data.filter;
    setData(data);
    console.log(data);
  })
  return data;

}

const handlePageClick = async (data) =>{
  const page = data.selcted + 1;
  const commentsFormServer = await fetchComments(page);
  setData(commentsFormServer);

}


  const handleunblocked = (_id) =>{
    // console.log(_id)
    const {accountID} = {accountID : _id}
    console.log(accountID);
    axios.put(`/unSuspendAccount/${accountID}`)
    .then(res =>{
      if(res.status){
        let data = res.data;
        toast.success(data.msg)
        return userlist();
      }
    })

  }
  const handlesuspend = (_id) => {
    // console.log(_id)
    const {accountID} = {accountID : _id}
    console.log(accountID);
    axios.put(`/accountSuspend/${accountID}`)
    .then(res =>{
      if(res.status){
        let data = res.data;
        toast.success(data.msg)
        return userlist();
      }
    })
  }

  const handledelete = (_id) =>{
    // console.log(_id);
    const {customerID} = {customerID :_id}
    console.log(customerID);
    axios.delete(`/deleteAccount/${customerID}`)
    .then(res =>{
      if(res.status){
        let data = res.data;
        toast.success(data.msg)
        return userlist();
      }
    })
  }

    return (
        <>
         <ToastContainer />
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
                                            <span className="fw-semibold text-white opacity-50">Agent / Customers</span>
                                        </div>

                                        <div className="d-flex flex-column">

                                            <div className="d-lg-flex align-lg-items-center">
                                               <form onSubmit={(e) => AddFormData(e)}>
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">


                                                        <div className="col-lg-3 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="customerID"
                                                                placeholder="Enter D-ID" />

                                                        </div>

                                                        <div className="col-lg-3 d-flex align-items-center mb-3 mb-lg-0">
                                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="Accountnumber"
                                                                placeholder="Account Number" />

                                                        </div>

                                                       


                                                        <div className="col-lg-3 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                            <label className="small_label">Start Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="fromDate" placeholder="from Date.." />
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                            <label className="small_label">End Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="toDate" placeholder="to Date.." />

                                                        </div>

                                                    </div>

                                                    <div className="min-w-150px text-end">
                                                        <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
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
                                            <span className="card-label fw-bold fs-3 mb-1"> Agent Customers List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>
                                                    <tr className="fw-bold text-muted th-title">


                                                       
                                                        <th className="min-w-125px">customerID</th>
                                                        <th className="min-w-125px">bankID</th>
                                                        <th className="min-w-150px">country </th>
                                                        <th className="min-w-150px">Bankcode </th>
                                                        <th className="min-w-100px">Bankname</th>
                                                        <th className="min-w-100px">Transitnumber</th>
                                                        <th className="min-w-100px">Accountnumber</th>
                                                        <th className="min-w-100px ">Branchname</th>
                                                        <th className="min-w-100px ">IFSC</th>
                                                        <th className="min-w-100px ">City</th>
                                                        <th className="min-w-100px ">Postcode</th>
                                                        <th className="min-w-100px ">Phonenumber</th>
                                                        <th className="min-w-100px ">Branchcode</th>
                                                        <th className="min-w-100px ">State</th>
                                                        <th className="min-w-100px ">Documentnumber</th>
                                                        <th className="min-w-100px ">Accounttype</th>

                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                   
                                                    {data.map((item)=>
                                    
                                                   
                                                    <tr>    
                                                        <td>{item.customerID}</td>
                                                        <td> {item.bankID}</td>
                                                        <td> {item.country} </td>
                                                        <td><span>{item.Bankcode}</span> </td>
                                                        <td>{item.Bankname}</td>
                                                        <td>{item.Transitnumber}</td>
                                                        <td>{item.Accountnumber}</td>
                                                        <td>{item.Branchname}</td>
                                                        <td>{item.IFSC}</td>
                                                        <td>{item.City}</td>
                                                        <td>{item.Postcode}</td>
                                                        <td>{item.Phonenumber}</td>
                                                        <td>{item.Branchcode}</td>
                                                        <td>{item.State}</td>
                                                        <td>{item.Documentnumber}</td>
                                                        <td>{item.Accounttype}</td>
                                                        {/* <td>
                                                        <td><span class="badge badge-light-info fs-5">Verified</span></td> 
                                                        </td> */}
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                              {item.suspend == '1'?
                                                              <><button onClick={(e) =>{ handleunblocked(item._id)}}
                                                              className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                              data-bs-toggle="tooltip" data-bs-placement="top"
                                                              data-bs-trigger="hover" title="Suspend ">
                                                              <span className="svg-icon svg-icon-3">
                                                              <img src="/assets_new/images/blocked.png" width="20px" />
                                                              </span>
                                                          </button></>:
                                                          <>
                                                          <button onClick={(e) =>{ handlesuspend(item._id)}}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Password Reset ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    <img src="/assets_new/images/suspand.png" width="20px" />
                                                                    </span>
                                                                </button>
                                                          </>}
                                                                
                                                                
                                                                <a href='organization_detail.html'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </a>
                                                                <button onClick={(e) =>{handledelete(item._id)}}
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Delete">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    <img src="/assets_new/images/cross.png" width="20px" />
                                                                    </span>

                                                                </button>
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
                                                        <td><span class="badge badge-light-info fs-5">Verified</span></td> 
                                                        </td>
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
        </>
    );
}


export default AgentAccountList