import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function OrganizationDashboard() {
    return (
     <>
     <Sidebar />
     <Header />
     <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
     <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                <div className="container-xxl" id="kt_content_container">
                    <div className="row g-5 g-xl-8">
                        <div className="col-lg-12">
                         <div className="row">
                             <div className="col-lg-6">
                                    <div className="card card-flush">

                                        <div className="bg_div card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px">

                                            <h3 className="card-title align-items-start flex-column text-white pt-15">
                                                <span className="fw-bold fs-2x mb-3">AB Bank Dashboard</span>
                                                <div className="fs-4 text-white">

                                                </div>
                                            </h3>


                                        </div>


                                        <div className="card-body mt-n20">

                                            <div className="mt-n20 position-relative dashorgnastion">

                                                <div className="row g-3 g-lg-6">

                                                    <div className="col-6">

                                                        <div className="retative bg-gray-100 ative animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">

                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fad fa-users"></i>
                                                                    </span>

                                                                </span>
                                                            </div>


                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value="870" className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    870</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Number Of Users</span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="col-6">

                                                        <div className="retative bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">
                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fad fa-hands-usd"></i>
                                                                    </span>
                                                                </span>
                                                            </div>

                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value="6850" data-kt-countup-prefix="$" className="text-gray-700  fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    6850</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Total Transaction </span>
                                                            </div>

                                                        </div>

                                                    </div>


                                                    <div className="col-6">

                                                        <div className="retative bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">

                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fas fa-id-card"></i>
                                                                    </span>

                                                                </span>
                                                            </div>


                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value="869" className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    869</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Total License </span>
                                                            </div>

                                                        </div>

                                                    </div>


                                                    <div className="col-6">

                                                        <div className=" retative bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">

                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fad fa-landmark"></i>
                                                                    </span>

                                                                </span>
                                                            </div>
                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value="1829" className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    0</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Loans Applied</span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                  
                                    <div className="card card-flush h-xl-100">
                                       
                                        <div className="card-header pt-7">
                                           
                                            <h3 className="card-title align-items-start flex-column">
                                                <span className="card-label fw-bold text-gray-800">Users Activity</span>
                                                <span className="text-gray-400 mt-1 fw-semibold fs-6">Activity Of Users </span>
                                            </h3>
                                           
                                            <div className="card-toolbar">
                                          
                                                <div data-kt-daterangepicker="true" data-kt-daterangepicker-opens="left" className="btn btn-sm btn-light d-flex align-items-center px-4">
                                                    
                                                    <div className="text-gray-600 fw-bold">Loading date range...</div>
                                                   
                                                    <span className="svg-icon svg-icon-1 ms-2 me-0">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor" />
                                                            <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor" />
                                                            <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                  
                                                </div>
                                              
                                            </div>
                                           
                                        </div>
                                      
                                        <div className="card-body d-flex align-items-end px-0 pt-3 pb-5">
                                            
                                            <div id="kt_charts_widget_18_chart" className="h-325px w-100 min-h-auto ps-4 pe-6"></div>
                                         
                                        </div>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover"
                                style={{marginTop :  '2rem'}}>

                                <div className="card-body container-xxl pt-10 pb-8">

                                    <div className="d-flex align-items-center">
                                        <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                        <span className="fw-semibold text-white opacity-50">Users List</span>
                                    </div>

                                    <div className="d-flex flex-column">

                                        <div className="d-lg-flex align-lg-items-center">

                                            <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5 w-xxl-850px h-lg-60px me-lg-10 my-5">

                                                <div className="row flex-grow-1 mb-5 mb-lg-0">

                                                    <div className="col-lg-4 d-flex align-items-center mb-3 mb-lg-0">
                                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                            </svg>
                                                        </span>
                                                        <input type="text" autoComplete="off" className="form-control form-control-flush flex-grow-1" name="search" placeholder="User Name.." />

                                                    </div>





                                                    <div className="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
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
                                                        <select className="form-select border-0 flex-grow-1" data-control="select2" data-placeholder="Category" data-hide-search="true">
                                                            <option defaultValue="">Please Select</option>
                                                            <option defaultValue="1" selected="selected">Category</option>
                                                            <option defaultValue="2">In Progress</option>
                                                            <option defaultValue="3">Verified</option>
                                                        </select>

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

                        <div className="col-lg-6">

                            <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                <div className="card-header border-0 pt-5">
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label fw-bold fs-3 mb-1">Recent Users</span>
                                        <span className="text-muted mt-1 fw-semibold fs-7">Over 50 Customer</span>
                                    </h3>

                                </div>

                                <div className="card-body py-3">

                                    <div className="table-responsive">

                                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                            <thead>
                                                <tr className="fw-bold text-muted th-title">

                                                 
                                                    <th className="min-w-125px">Name</th>
                                                    <th className="min-w-150px">Email Address</th>
                                                    <th className="min-w-150px">Mobile No. </th>
                                                    <th className="min-w-100px">DOB</th>
                                                    <th className="min-w-100px ">Status</th>
                                                    <th className="min-w-100px text-end">Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>


                                                <tr>


                                                    <td>
                                                        Punit Joshi
                                                    </td>
                                                    <td>punit@gmail.com   </td>
                                                    <td><span>+241 123-456-2890 </span>
                                                </td>
                                                <td>05/06/1998</td>
                                                <td><span className="text-success">Verified</span></td>
                                                <td>
                                                    <div className="d-flex justify-content-end flex-shrink-0">
                                                        <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                            <span className="svg-icon svg-icon-3">
                                                                <i className="fad fa-eye fs-4"></i>
                                                            </span>

                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td>
                                                    Sunil Ganwane
                                                </td>
                                                <td>ganwanesunil@gmail.com   </td>
                                                <td><span>+211 123-456-7890 </span>
                                            </td>
                                            <td>05/06/1998</td>
                                            <td><span className="text-success">Verified</span></td>
                                            <td>
                                                <div className="d-flex justify-content-end flex-shrink-0">
                                                    <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                        <span className="svg-icon svg-icon-3">
                                                            <i className="fad fa-eye fs-4"></i>
                                                        </span>

                                                    </a>
                                                </div>
                                            </td>
                                        </tr><tr>

                                            <td>
                                                Jessica Chinara
                                            </td>
                                            <td> jessica@gmail.com </td>
                                            <td><span>+251 123-456-7890</span>
                                        </td>
                                        <td>05/06/1998</td>
                                        <td><span className="text-success">Verified</span></td>
                                        <td>
                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
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



            <div className="col-lg-6">

                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                    <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bold fs-3 mb-1">Recent Transaction</span>
                            <span className="text-muted mt-1 fw-semibold fs-7">Over 50 Customer</span>
                        </h3>

                    </div>

                    <div className="card-body py-3">

                        <div className="table-responsive">

                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                <thead>
                                    <tr className="fw-bold text-muted th-title">

                                        <th className="min-w-125px">Transaction <br /> Date </th>
                                        <th className="min-w-150px">PCN  <br />Number</th>
                                        <th className="min-w-150px">Sender <br /> Name </th>
                                        <th className="min-w-100px">Beneficiary <br /> Name </th>
                                        <th className="min-w-100px text-center">Sending <br /> Amount</th>
                                        <th className="min-w-100px text-center">Receiver <br /> Amount</th>
                                        <th className="min-w-100px ">Status</th>
                                        <th className="min-w-100px text-end">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>


                                    <tr>


                                        <td>
                                            Aug 17, 2021
                                        </td>
                                        <td>CHR55441143   </td>
                                        <td><span>Sumit</span>
                                    </td>
                                    <td>Sumit</td>

                                    <td>$50.22</td>
                                    <td>$50.22</td>
                                    <td><span className="text-success">Success</span></td>
                                    <td>
                                        <div className="d-flex justify-content-end flex-shrink-0">
                                            <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                <span className="svg-icon svg-icon-3">
                                                    <i className="fad fa-eye fs-4"></i>
                                                </span>

                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>


                                    <td>
                                        Aug 17, 2021
                                    </td>
                                    <td>CHR55441143   </td>
                                    <td><span>Punit Joshi</span>
                                </td>
                                <td>Punit Joshi</td>

                                <td>$50.22</td>
                                <td>$50.22</td>
                                <td><span className="text-success">Success</span></td>
                                <td>
                                    <div className="d-flex justify-content-end flex-shrink-0">
                                        <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                            <span className="svg-icon svg-icon-3">
                                                <i className="fad fa-eye fs-4"></i>
                                            </span>

                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>


                                <td>
                                    Aug 17, 2021
                                </td>
                                <td>CHR55441143   </td>
                                <td><span>Pushpak</span>
                            </td>
                            <td>Pushpak</td>

                            <td>$50.22</td>
                            <td>$50.22</td>
                            <td><span className="text-success">Success</span></td>
                            <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                    <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
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

      </div >

    </div >

  </div >
</div >

            </div>

            </div>
     </>
  );   
}

