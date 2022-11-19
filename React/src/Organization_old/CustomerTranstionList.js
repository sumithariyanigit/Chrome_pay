import React, {useState} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Select from 'react-select';

export default function CustomerTranstionList() {


 const [showhide, setShowhide] = useState({});


 const handleChange=(event) => {
    document.body.classList.add('selecOption');
//    const getuser = event.target.value
//    setShowhide(getuser);
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

                                            <div className="d-lg-flex align-lg-items-center">

                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5 w-100 h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">


                                                    <div className="col-lg-3  d-flex align-items-center mb-5 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <select className="form-select border-0 flex-grow-1" 
                                                            onChange={ (e) =>(handleChange(e))}>
                                                                   <option value=""  selected="">Search Criteria</option>
                                                                   <option value="pcn">PCN</option>
                                                                    <option value="dateRange">Sender Name</option>
                                                                    <option value="dateRange">Beneficiary Name</option>
                                                                    <option value="cashiers">Cashier Name</option>
                                                                    <option value="date">Date Range</option>
                                                                    <option value="amount">Amount Range</option>
                                                                    <option value="range">Amount Range + Date Range</option>
                                                            </select>
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>

                                                        <div className="showpcn col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                                   <span class="svg-icon svg-icon-1 svg-icon-gray-400 me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect><path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path></svg></span>
                                                                    <input type="text" className="form-control form-control-flush flex-grow-1" name="pcn"
                                                                        placeholder="Enter PCN" />
                                                                    <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                                  </div>

                                                             
                                                            <div className="showdateRange showpcn col-lg-2 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                                <label className="small_label">Start Date</label>
                                                                <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                    <i className="fad fa-calendar fs-2"></i>
                                                                </span>
                                                                <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="search" placeholder="User Name.." />
                                                                <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                                </div>
                                                            </div>

                                                            <div className="showdateRange showpcn col-lg-2 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                                <label className="small_label">End Date</label>
                                                                <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                    <i className="fad fa-calendar fs-2"></i>
                                                                </span>
                                                                <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="search" placeholder="User Name.." />

                                                            </div>

                                                            <div className="col-lg-3  d-flex align-items-center mb-5 mb-lg-0">
                                                            
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                    <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <select className="form-select border-0 flex-grow-1" >
                                                                     <option value=""  selected="">Relationship</option>
                                                                       <option value="GRAND_MOTHER">GRAND_MOTHER</option>
                                                                        <option value="HUSBAND">HUSBAND</option>
                                                                        <option value="MOTHER">MOTHER</option>
                                                                        <option value="MOTHER_IN_LAW">MOTHER_IN_LAW</option>
                                                                        <option value="NEPHEW">NEPHEW</option>
                                                                        <option value="NIECE">NIECE</option>
                                                                        <option value="SELF">SELF</option>
                                                                        <option value="SISTER">SISTER</option>
                                                                        <option value="SISTER_IN_LAW">SISTER_IN_LAW</option>
                                                                        <option value="SON">SON</option>
                                                                        <option value="UNCLE">UNCLE</option>
                                                            </select>
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>
                                                          

                                                    </div>

                                                    <div className="min-w-150px text-end">
                                                        <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
                                                    </div>

                                                </div>



                                            </div>

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


                                                    <tr>
                                                        <td>05/06/2022</td>
                                                        <td> CHR55441143 </td>
                                                        <td>puny satavas	</td>
                                                        <td></td>
                                                        <td> Jessica Chinara</td>
                                                        <td> Jessica Chinara</td>
                                                      
                                                        <td>$50.22</td>
                                                        <td>$50.22</td>
                                                   
                                                        <td></td>
                                                        <td><span class="badge badge-light-info fs-5">Confirmed</span></td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                               
                                                                <a href='#'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </a>
                                                              
                                                            </div>
                                                        </td>
                                                    </tr>


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
