import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Chart from "react-apexcharts";
export default function Agentuserwallet() {


    const [walletdetails, setwalletdetails] = useState([]);

const walletblance= ()=>{
    axios.post(``)
    .then(res=>{

    }).catch(console.error())
}




    useEffect(()=>{
        walletblance();
    },[])
    
    return (
        <>


<Sidebar />
      <Header />
      
            <div
                className="wrapper d-flex flex-column flex-row-fluid"
                id="kt_wrapper"
            >
                <div
                    className="content d-flex flex-column flex-column-fluid"
                    id="kt_content"
                >
    <div className="container-xxl" id="kt_content_container">
    <div className="row g-5 g-xl-8">
    <div className="col-lg-12">
    <div className="row">
    <div className="col-lg-5">
                    <div className="card rounded-15 mb-5 mb-xl-5 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                      <div className="card-body  pt-9 pb-0 ">
                        {/* <!--begin::Details--> */}
                        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                          {/* <!--begin: Pic--> */}
                          <div className="me-7 mb-4">
                            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                              <img src="data:image/jpeg;base64,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" alt="image" />
                              <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                            </div>
                          </div>

                          {/* <!--end::Pic--> */}

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                              {/* <!--begin::User--> */}
                              <div className="d-flex flex-column">
                                {/* <!--begin::Name--> */}
                                <div className="d-flex align-items-center mb-2">
                                  <a
                                    href="#"
                                    className="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                                  >
                    Rohit sharma
                                  </a>
                                  <a href="#">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen026.svg--> */}
                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z"
                                          fill="white"
                                        />
                                      </svg>
                                    </span>
                                  </a>
                                  {/* <!--  <a href="#" className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Verified</a> --> */}
                                </div>
                                {/* <!--end::Name--> */}

                                <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                  <a
                                    href="#"
                                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                                  >
                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com006.svg--> */}
                                    <span className="svg-icon svg-icon-4 me-1">
                                      <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
                                          fill="currentColor"
                                        />
                                        <rect
                                          x="7"
                                          y="6"
                                          width="4"
                                          height="4"
                                          rx="2"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    cricketer
                                  </a>
                                  <a
                                    href="#"
                                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                                  >
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                                    <span className="svg-icon svg-icon-4 me-1">
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    indian
                                  </a>
                                  <a
                                    href="#"
                                    className="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                                  >
                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                                    <span className="svg-icon svg-icon-4 me-1">
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    rohitiplking@gmail.com
                                  </a>
                                </div>
                                {/* <!--end::Info--> */}
                              </div>
                              {/* <!--end::User--> */}
                            </div>

                            <div className="d-flex flex-wrap flex-stack">
                              <div className="d-flex flex-column flex-grow-1 pe-8">
                               
                              
                              </div>

                         
                            </div>
                          </div>
                    
                        </div>
                      </div>
                      
                    </div>
                    
                    <div className="bg-white overflow-auto p-5">
<Chart
          type="line"
          width={500}
          height={250}
          series={[
            {
            //   name: "Social Media Subscriber",
              data: [6578, 6787, 3245, 9876, 2324, 5123, 2435],
              data: [7578, 4787, 8245, 2876, 5324, 2123, 9435],
            },
          ]}
          options={{
            stroke: {
                width: 2
              },
           
            colors: ["#0000ff"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "Facebook",
                "Twitter",
                "Linkedin",
                "Instagram",
                "GitHub",
                "Stackoverflow",
                "Youtube",
              ],
              title: {
             
                style: { color: "#f90000", fontSize: 0 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
            
              },
            //  
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
                  </div>




                  <div className="col-lg-7">
                          <div className="card card-flush">
                            <div className="bg_div card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px">
                              <h3 className="card-title align-items-start flex-column text-white pt-15">
                                <span className="fw-bold fs-2x mb-3">
                                  Your Wallet
                                </span>
                                <div className="fs-4 text-white">
                                  {/* <span className="opacity-75">Lorem Ipsum is simply dummy text</span> */}
                                </div>
                              </h3>
                            </div>

                            <div className="card-body mt-n20">
                              <div className="mt-n20 position-relative">
                                <div className="row g-3 g-lg-6">
                                <div className="col-6">
                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">
                                      <div className="symbol symbol-30px me-5 mb-8">
                                        <span className="symbol-label">
                                          <span className="svg-icon svg-icon-1 svg-icon-primary">
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                opacity="0.3"
                                                d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </span>
                                        </span>
                                      </div>

                                      <div className="mt-3">
                                        <span className="bank-logo text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-5">
                                          
                                          
                                          $52485
                                        </span>

                                        <span className="text-gray-500 fw-semibold d-block mt-8 fs-6">
                                          Chromepay Wallet
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">
                                      <div className=" me-5 mb-8">
                                       
                                       
                                          <i className="fad fwalleta-"></i>
                                           
                                        
                                      
                                      </div>

                                      <div className="m-0">
                                        <span className="bank-logo text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                          <img
                                            src="../assets_new/images/logo.png"
                                            width="65px"
                                          />
                                        </span>

                                        <span className="text-gray-500 fw-semibold fs-6">
                                          Chromepay Wallet
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">
                                      <div className=" me-5 mb-8">
                                       
                                       
                                          <i className="fad fwalleta-"></i>
                                           
                                        
                                      
                                      </div>

                                      <div className="m-0">
                                        <span className="bank-logo text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                          <img
                                            src="../assets_new/images/logo.png"
                                            width="65px"
                                          />
                                        </span>

                                        <span className="text-gray-500 fw-semibold fs-6">
                                          Chromepay Wallet
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">
                                      <div className=" me-5 mb-8">
                                       
                                       
                                          <i className="fad fwalleta-"></i>
                                           
                                        
                                      
                                      </div>

                                      <div className="m-0">
                                        <span className="bank-logo text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                          <img
                                            src="../assets_new/images/logo.png"
                                            width="65px"
                                          />
                                        </span>

                                        <span className="text-gray-500 fw-semibold fs-6">
                                          Chromepay Wallet
                                        </span>
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




    <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">

<div className="container-xxl d-flex flex-column flex-md-row flex-stack">

    <div className="text-dark order-2 order-md-1">
        <span className="text-gray-400 fw-semibold me-1">Created by</span>
        <a href="#" className="text-muted text-hover-primary fw-semibold me-2 fs-6">Chromepay</a>
    </div>


    <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
        <li className="menu-item">
            <a href="#" className="menu-link px-2">About</a>
        </li>
        <li className="menu-item">
            <a href="#" className="menu-link px-2">Support</a>
        </li>

    </ul>

</div>

</div>
    </div>

    </div>







                </div>
            </div>





        </>
    )
}
