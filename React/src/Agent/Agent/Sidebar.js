
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Sidebar() {
    let token = localStorage.getItem('token')
    console.log(token);

    const logout=()=>{
        alert('okk')
        localStorage.clear();
        window.location =`/login-agent`;

    }
    return (
        <>
         <div id="kt_aside" className="aside bg-primary" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">

                <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-8" id="kt_aside_logo">
                    <a href='/agent-dashbord'>
                        <img alt="Logo" src="/assets/images/logo.png" className="h-50px" />
                    </a>
                </div>

                <div className="aside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0" id="kt_aside_nav">

                    <div className="hover-scroll-overlay-y my-2 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu" data-kt-scroll-offset="5px">

                        <div id="kt_aside_menu" className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-semibold fs-6" data-kt-menu="true">

                            <div  className="menu-item here show py-2">

                                <a href="/agent-dashbord" className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                        <i className="fad fa-home-lg fs-1"></i>
                                    </span>
                                </a>

                            </div>

                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <a href="/agent-dashbord" className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                        <i className="far fa-user-plus fs-1"></i>
                                    </span>
                                </a>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-250px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">CRM</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">

                                    <a href="/agent-customer-list" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">All DIDs List</span>
                                        </a>
                                        <a href="/agent-customer-add" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Create DIDs</span>
                                        </a>
                                        <a href="/agent-did-approvel" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">DIDs awaiting approval</span>
                                        </a>
                                        <a href="/agent-did-blocked" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Blocked DIDs </span>
                                        </a>

                                        
                                        

                                    </div>

                                </div>

                            </div>

                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <span className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                        <i className="fonticon-layers fs-1"></i>
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Transaction Management</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    
                                    <a href="/Agent-transction-list" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Transaction List</span>
                                        </a>

                                    </div>


                                </div>

                            </div>
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <span className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                    <i class="fas fa-users-medical fs-1"></i>
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Bank Management</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    
                                      {/* <a href="/Agent-Add-Account" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Add  Account</span>
                                        </a> */}
                                        <a href="/Agent-Add-Account-list" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Account List</span>
                                        </a>

                                    </div>


                                </div>

                            </div>
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

<span className="menu-link menu-center">
    <span className="menu-icon me-0">
    <i class="fas fa-users-slash fs-1"></i>
    </span>
</span>

<div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

    <div className="menu-item">

        <div className="menu-content">
            <span className="menu-section fs-5 fw-bolder ps-1 py-1">commission</span>
        </div>

    </div>

    <div className="menu-item menu-accordion">
    
      {/* <a href="/Agent-Add-Account" className="menu-link">

            <span className="menu-bullet">
                <span className="bullet bullet-dot"></span>
            </span>
            <span className="menu-title">Add  Account</span>
        </a> */}
        <a href="/Agent-comssion-list" className="menu-link">

            <span className="menu-bullet">
                <span className="bullet bullet-dot"></span>
            </span>
            <span className="menu-title">Customer Commission List</span>
        </a>

    </div>


</div>

                            </div>
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                            <span className="menu-link menu-center">
                                <span className="menu-icon me-0">
                                {/* <i class="fas fa-users-slash fs-1"></i> */}
                                <i class="fad fa-download fs-1"></i>
                                </span>
                            </span>

                            <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                <div className="menu-item">

                                    <div className="menu-content">
                                        <span className="menu-section fs-5 fw-bolder ps-1 py-1">Export Files</span>
                                    </div>

                                </div>

                                <div className="menu-item menu-accordion">
                                
                                <a href="/agent-did-customer" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">All DIDs List</span>
                                    </a>
                                    <a href="/commision-list-export" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Customer Commission List</span>
                                    </a>
                                    <a href="/block-list-export" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Blocked DIDs</span>
                                    </a>

                                </div>


                            </div>

                            </div>
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                            <span className="menu-link menu-center">
                                <span className="menu-icon me-0">
                                {/* <i class="fas fa-users-slash fs-1"></i> */}
                                <i class="fad fa-sack-dollar fs-1"></i>
                                </span>
                            </span>

                            <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                <div className="menu-item">

                                <div className="menu-content">
                                    <span className="menu-section fs-5 fw-bolder ps-1 py-1">Loans Managment</span>
                                </div>

                                </div>

                                <div className="menu-item menu-accordion">
                                
                                <a href="/Customerloanlist" className="menu-link">

                                <span className="menu-bullet">
                                    <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Loan Apply List</span>
                                </a>
                                <a href="/Loanpasslist" className="menu-link">

                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Loan Pass List</span>
                                    </a>
                                    {/* <a href="/block-list-export" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Blocked DIDs</span>
                                    </a> */}

                                </div>


                            </div>

                            </div>
                            
                            

                        </div>

                    </div>

                </div>



                <div className="aside-footer d-flex flex-column align-items-center flex-column-auto" id="kt_aside_footer">

                    <div className="mb-7">
                        <button type="button" className="btn btm-sm btn-custom btn-icon" data-kt-menu-trigger="click" data-kt-menu-overflow="true" data-kt-menu-placement="top-start" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-dismiss="click" title="Profile Setting">
                            <i className="fonticon-setting fs-1"></i>
                        </button>

                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true">

                            <div className="menu-item px-3">
                                <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">Profile Setting</div>
                            </div>

                            <div className="separator mb-3 opacity-75"></div>


                            <div className="menu-item px-3">
                                <a href="/agent-my-profile" className="menu-link px-3">My Profile</a>
                            </div>


                            <div className="menu-item px-3">
                                <a href="/Agent-change-password" className="menu-link px-3">Account Settings</a>
                            </div>
                            
                            <div className="menu-item px-3" >

                              
                            </div>


                            <div className="separator mb-3 opacity-75"></div>

                        </div>
                        <br></br>
                        <br></br>
                        <div>
                        <button onClick={()=>logout()} className="menu-link px-3" style={{border:"none",background:"none"}}><i class="fad fa-sign-out-alt fs-1"></i></button>
                        </div>
                        
                    </div>

                </div>

         </div> 
         </>
  );
}
export default  Sidebar