import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
//import Select from 'react-select';
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import  Jwt  from "jsonwebtoken";


function AgentTransactionList() {
    let token = localStorage.getItem('token')


    const [transection, setTtransection] = useState([]);
    const [pageCount ,setpageCount]= useState('');

    const limit=10;

   
      var decode1 = Jwt.decode(token);
      let orgID = decode1.orgID
      let agentID = decode1.agentID
      console.log(agentID)

    let ID = localStorage.getItem('ID')
    
    

    const [data, setData] = useState([])

    const AddFormData = async (e, page) =>{
        e.preventDefault();

        const data = new FormData(e.target);
        const Formvlaues =Object.fromEntries(data.entries());
        const formData = Formvlaues;
        console.log(Formvlaues);
        axios.post(`/agenttranssection/${agentID}`,formData)
        .then(resp => {
            const data =resp.data.result
            setData(data);
            const total =resp.data.totlaRow;
            console.log(total);
            const totalPage =(Math.ceil(total / limit));
            setpageCount(totalPage);
        })

    }


    const userlist = async () => {
        await axios.post(`/agenttranssection/${agentID}`)
        .then(resp =>{
            let data = resp.data.result
            setData(data);
            console.log(data);
            console.log('pushpak')
            const total =resp.data.totlaRow;
            console.log(total);
            const totalPage = (Math.ceil(total / limit));
            setpageCount(totalPage);
        })
    }

    useEffect(() => {
        userlist();
        // fetch(`/organisationsTransectionList/${ID}`).then((result) => {
        //     result.json().then((resp) => {
        //         const dataOrg = resp.filter
        //         //console.log("pk" + data);
        //         setData(dataOrg)
        //         //console.warn("result", dataOrg)
        //     })
        // })
    }, [])

    //------------------pagenation----------------//

    const fetchComments = async (page) =>{
        const setdata = {page:page}
        axios.post(`/agenttranssection/${agentID}`,setdata)
        .then(resp =>{
            const data =resp.data.result;
            setData(data);
            console.log(data);
    

        })
        return data;
    }

    const  handlePageClick = async (data) =>{
        const page =data.selected + 1;
        const commentsFormServer = await fetchComments(page);
        setData(commentsFormServer);

    }
//-------------detail-----------///
const handleView = (_id) =>{
    console.log(_id)
    window.location = `/Agent-transaction-view/${_id}`;
    return false;  
}
    return (
        <>
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
                                            <span className="fw-semibold text-white opacity-50">Transactions</span>
                                        </div>


                                        <div className="d-flex flex-column">

                                        <form onSubmit={(e) => AddFormData(e)}>
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">


                                                        <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="senderName"
                                                                placeholder="Sender Name" />

                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="beneficiaryName"
                                                                placeholder="Beneficiary Name" />

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

                                                        </div>


                                                        <div className="col-lg-2 d-flex input-container align-items-center mb-3  mb-lg-0">
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
                            </div>

                            <div className="col-lg-12">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Transactions List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>
                                                    <tr className="fw-bold text-muted th-title">
                                                        <th className="min-w-125px">Transaction Date</th>
                                                        <th className="min-w-125px">PCN</th>
                                                        <th className="min-w-125px">Pay-in Cashier</th>
                                                        <th className="min-w-125px">Pay-out Cashier</th>
                                                        <th className="min-w-150px">Sender Name</th>
                                                        <th className="min-w-150px">Beneficiary Name </th>
                                                        <th className="min-w-150px">Sending Amount </th>
                                                        <th className="min-w-100px">Receiver Amount</th>
                                                        <th className="min-w-100px">Relationship</th>
                                                        <th className="min-w-100px ">Status</th>
                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                {data.map((item)=>

                                                    <tr>
                                                        <td>{moment(item.transactionDate).format("DD/MM/YYYY")}</td>
                                                        <td> {item.PCN}</td>
                                                        <td>Nitesh</td>
                                                        <td>Rahul</td>
                                                        <td>{item.senderName}</td>
                                                        <td> {item.beneficiaryName}</td>

                                                        <td>{item.sendingAmount}</td>
                                                        <td>{item.receiverAmount}</td>

                                                        <td>Mother</td>
                                                        <td><span class="badge badge-light-info fs-5">{item.status}</span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">

                                                                <button onClick={(e)=>{handleView(item._id)}}
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


export default AgentTransactionList