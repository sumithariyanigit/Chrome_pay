
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Digital_suer_detail = () => {

    return (

        <div className="d-flex flex-column flex-root">



            <div className="page d-flex flex-row flex-column-fluid">

                <div id="kt_aside" className="aside bg-primary" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">

                    <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-8" id="kt_aside_logo">
                        <a href="#">
                            <img alt="Logo" src="assets_new/images/logo.png" className="h-50px" />
                        </a>
                    </div>

                    <div className="aside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0" id="kt_aside_nav">

                        <div className="hover-scroll-overlay-y my-2 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu" data-kt-scroll-offset="5px">

                            <div id="kt_aside_menu" className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-semibold fs-6" data-kt-menu="true">

                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item here show py-2">

                                    <span className="menu-link menu-center">
                                        <span className="menu-icon me-0">
                                        <i class="fad fa-home-lg fs-1"></i>
                                        </span>
                                    </span>

                                    <div className="menu-sub menu-sub-dropdown py-4 w-200px w-lg-225px">

                                        <div className="menu-item">

                                            <div className="menu-content">
                                                <span className="menu-section fs-5 fw-bolder ps-1 py-1">Home</span>
                                            </div>

                                        </div>

                                        <div className="menu-item">

                                            <a className="menu-link active" href="user-list">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Dashboard</span>
                                            </a>

                                        </div>

                                    </div>

                                </div>


                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                    <span className="menu-link menu-center">
                                        <span className="menu-icon me-0">
                                            {/* <i className="fonticon-stats fs-1"></i> */}
                                        <i class="fad fa-list-ul fs-1"></i>
                                        </span>
                                    </span>


                                    <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-250px">

                                        <div className="menu-item">

                                            <div className="menu-content">
                                                <span className="menu-section fs-5 fw-bolder ps-1 py-1">Pages</span>
                                            </div>

                                        </div>









                                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">

                                            <span className="menu-link">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Digital Customers</span>
                                                <span className="menu-arrow"></span>
                                            </span>


                                            <div className="menu-sub menu-sub-accordion">

                                                <div className="menu-item">

                                                    <a className="menu-link" href="digital_user_list.html">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Digital Customers List</span>
                                                    </a>

                                                </div>


                                            </div>

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
                                                <span className="menu-section fs-5 fw-bolder ps-1 py-1">Utilities</span>
                                            </div>

                                        </div>


                                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">

                                            <span className="menu-link">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Modals</span>
                                                <span className="menu-arrow"></span>
                                            </span>




                                        </div>



                                    </div>

                                </div>


                              
                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                    data-kt-menu-placement="right-start" className="menu-item py-2">

                                    <span className="menu-link menu-center">
                                        <span className="menu-icon me-0">
                                        <i class="fad fa-user-chart fs-1"></i>
                                        </span>
                                    </span>

                                    <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-250px">

                                        <div className="menu-item">

                                            <div className="menu-content">
                                                <span className="menu-section fs-5 fw-bolder ps-1 py-1">Digital Customers</span>
                                            </div>

                                        </div>

                                        <div className="menu-item">

                                            <a className="menu-link" href="user-list">
                                                <span className="menu-icon">
                                                    <i className="bi bi-calendar3-event fs-3"></i>
                                                </span>
                                                <span className="menu-title">Digital Customers List</span>
                                            </a>

                                        </div>

                                    </div>

                                </div>


                             
                            </div>

                        </div>

                    </div>


                    <div className="aside-footer d-flex flex-column align-items-center flex-column-auto" id="kt_aside_footer">

                        <div className="mb-7">
                            <button type="button" className="btn btm-sm btn-custom btn-icon" data-kt-menu-trigger="click" data-kt-menu-overflow="true" data-kt-menu-placement="top-start" 
                            data-bs-toggle="tooltip" data-bs-placement="right" data-bs-dismiss="click" title="Profile Setting">
                                <i className="fonticon-setting fs-1"></i>
                            </button>

                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true">

                                <div className="menu-item px-3">
                                    <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">Profile Setting</div>
                                </div>


                                <div className="separator mb-3 opacity-75"></div>


                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link px-3">My Profile</a>
                                </div>


                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link px-3">Account Settings</a>
                                </div>
                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link px-3">Sign Out</a>
                                </div>


                                <div className="separator mb-3 opacity-75"></div>
                              

                            </div>

                        </div>

                    </div>

                </div>


                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

                    <div id="kt_header"  className="header align-items-stretch">

                        <div className="container-fluid d-flex align-items-stretch justify-content-between">

                            <div className="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
                                <div className="btn btn-icon btn-active-color-primary w-40px h-40px" id="kt_aside_toggle">

                                    <span className="svg-icon svg-icon-1">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                                            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
                                        </svg>
                                    </span>

                                </div>
                            </div>


                            <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                                <a href="#" className="d-lg-none">
                                    <img alt="Logo" src="assets/media/logos/demo4-mobile.svg" className="h-25px" />
                                </a>
                            </div>

                            <div className="d-flex align-items-center" id="kt_header_wrapper">

                                <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-20 pb-5 pb-lg-0" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_wrapper'}">

                                <h1 class="text-dark fw-bold my-1 fs-3 lh-1"><i class="fad fa-home-lg fs-3"></i> Wellcome Back!</h1>

                                </div>

                            </div>

                            <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">

                                <div className="d-flex align-items-stretch" id="kt_header_nav">



                                </div>


                                <div className="d-flex align-items-stretch justify-self-end flex-shrink-0">



                                    <div className="d-flex align-items-center ms-1 ms-lg-3">

                                        <div className="btn btn-icon btn-active-light-primary position-relative btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">

                                            <span className="svg-icon svg-icon-1">
                                                <i className="fad fa-bell-on fs-4"></i>
                                            </span>

                                        </div>

                                        <div className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px" data-kt-menu="true">

                                            <div className="d-flex flex-column bgi-no-repeat rounded-top bgstyle12">

                                                <h3 className="text-white fw-semibold px-9 mt-10 mb-6">Notifications
                                                    <span className="fs-8 opacity-75 ps-3">24 reports</span>
                                                </h3>

                                            </div>


                                            <div className="tab-content">

                                                <div className="" id="kt_topbar_notifications_1" role="tabpanel">

                                                    <div className="scroll-y mh-325px my-5 px-8">

                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-primary">

                                                                        <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.3" d="M11 6.5C11 9 9 11 6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5ZM17.5 2C15 2 13 4 13 6.5C13 9 15 11 17.5 11C20 11 22 9 22 6.5C22 4 20 2 17.5 2ZM6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13ZM17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13Z" fill="currentColor" />
                                                                                <path d="M17.5 16C17.5 16 17.4 16 17.5 16L16.7 15.3C16.1 14.7 15.7 13.9 15.6 13.1C15.5 12.4 15.5 11.6 15.6 10.8C15.7 9.99999 16.1 9.19998 16.7 8.59998L17.4 7.90002H17.5C18.3 7.90002 19 7.20002 19 6.40002C19 5.60002 18.3 4.90002 17.5 4.90002C16.7 4.90002 16 5.60002 16 6.40002V6.5L15.3 7.20001C14.7 7.80001 13.9 8.19999 13.1 8.29999C12.4 8.39999 11.6 8.39999 10.8 8.29999C9.99999 8.19999 9.20001 7.80001 8.60001 7.20001L7.89999 6.5V6.40002C7.89999 5.60002 7.19999 4.90002 6.39999 4.90002C5.59999 4.90002 4.89999 5.60002 4.89999 6.40002C4.89999 7.20002 5.59999 7.90002 6.39999 7.90002H6.5L7.20001 8.59998C7.80001 9.19998 8.19999 9.99999 8.29999 10.8C8.39999 11.5 8.39999 12.3 8.29999 13.1C8.19999 13.9 7.80001 14.7 7.20001 15.3L6.5 16H6.39999C5.59999 16 4.89999 16.7 4.89999 17.5C4.89999 18.3 5.59999 19 6.39999 19C7.19999 19 7.89999 18.3 7.89999 17.5V17.4L8.60001 16.7C9.20001 16.1 9.99999 15.7 10.8 15.6C11.5 15.5 12.3 15.5 13.1 15.6C13.9 15.7 14.7 16.1 15.3 16.7L16 17.4V17.5C16 18.3 16.7 19 17.5 19C18.3 19 19 18.3 19 17.5C19 16.7 18.3 16 17.5 16Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project
                                                                        Alice</a>
                                                                    <div className="text-gray-400 fs-7">Phase 1 development
                                                                    </div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">1 hr</span>

                                                        </div>


                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-danger">

                                                                        <span className="svg-icon svg-icon-2 svg-icon-danger">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                                                                                <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="currentColor" />
                                                                                <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">HR
                                                                        Confidential</a>
                                                                    <div className="text-gray-400 fs-7">Confidential staff
                                                                        documents</div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">2 hrs</span>

                                                        </div>


                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-warning">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg--> */}
                                                                        <span className="svg-icon svg-icon-2 svg-icon-warning">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="currentColor" />
                                                                                <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Company
                                                                        HR</a>
                                                                    <div className="text-gray-400 fs-7">Corporeate staff
                                                                        profiles</div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">5 hrs</span>

                                                        </div>


                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-success">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/files/fil023.svg--> */}
                                                                        <span className="svg-icon svg-icon-2 svg-icon-success">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.3" d="M5 15C3.3 15 2 13.7 2 12C2 10.3 3.3 9 5 9H5.10001C5.00001 8.7 5 8.3 5 8C5 5.2 7.2 3 10 3C11.9 3 13.5 4 14.3 5.5C14.8 5.2 15.4 5 16 5C17.7 5 19 6.3 19 8C19 8.4 18.9 8.7 18.8 9C18.9 9 18.9 9 19 9C20.7 9 22 10.3 22 12C22 13.7 20.7 15 19 15H5ZM5 12.6H13L9.7 9.29999C9.3 8.89999 8.7 8.89999 8.3 9.29999L5 12.6Z" fill="currentColor" />
                                                                                <path d="M17 17.4V12C17 11.4 16.6 11 16 11C15.4 11 15 11.4 15 12V17.4H17Z" fill="currentColor" />
                                                                                <path opacity="0.3" d="M12 17.4H20L16.7 20.7C16.3 21.1 15.7 21.1 15.3 20.7L12 17.4Z" fill="currentColor" />
                                                                                <path d="M8 12.6V18C8 18.6 8.4 19 9 19C9.6 19 10 18.6 10 18V12.6H8Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project
                                                                        Redux</a>
                                                                    <div className="text-gray-400 fs-7">New frontend admin theme
                                                                    </div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">2 days</span>

                                                        </div>


                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/maps/map001.svg--> */}
                                                                        <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.3" d="M6 22H4V3C4 2.4 4.4 2 5 2C5.6 2 6 2.4 6 3V22Z" fill="currentColor" />
                                                                                <path d="M18 14H4V4H18C18.8 4 19.2 4.9 18.7 5.5L16 9L18.8 12.5C19.3 13.1 18.8 14 18 14Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project
                                                                        Breafing</a>
                                                                    <div className="text-gray-400 fs-7">Product launch status
                                                                        update</div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">21 Jan</span>

                                                        </div>


                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-info">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/general/gen006.svg--> */}
                                                                        <span className="svg-icon svg-icon-2 svg-icon-info">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.3" d="M22 5V19C22 19.6 21.6 20 21 20H19.5L11.9 12.4C11.5 12 10.9 12 10.5 12.4L3 20C2.5 20 2 19.5 2 19V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5ZM7.5 7C6.7 7 6 7.7 6 8.5C6 9.3 6.7 10 7.5 10C8.3 10 9 9.3 9 8.5C9 7.7 8.3 7 7.5 7Z" fill="currentColor" />
                                                                                <path d="M19.1 10C18.7 9.60001 18.1 9.60001 17.7 10L10.7 17H2V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V12.9L19.1 10Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Banner
                                                                        Assets</a>
                                                                    <div className="text-gray-400 fs-7">Collection of banner
                                                                        images</div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">21 Jan</span>

                                                        </div>


                                                        <div className="d-flex flex-stack py-4">

                                                            <div className="d-flex align-items-center">

                                                                <div className="symbol symbol-35px me-4">
                                                                    <span className="symbol-label bg-light-warning">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/art/art002.svg--> */}
                                                                        <span className="svg-icon svg-icon-2 svg-icon-warning">
                                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="currentColor" />
                                                                                <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>

                                                                    </span>
                                                                </div>


                                                                <div className="mb-0 me-2">
                                                                    <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Icon
                                                                        Assets</a>
                                                                    <div className="text-gray-400 fs-7">Collection of SVG icons
                                                                    </div>
                                                                </div>

                                                            </div>


                                                            <span className="badge badge-light fs-8">20 March</span>

                                                        </div>

                                                    </div>

                                                    {/* <!--begin::View more--> */}
                                                    <div className="py-3 text-center border-top">
                                                        <a href="pages/user-profile/#" className="btn btn-color-gray-600 btn-active-color-primary">View All
                                                            {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                            <span className="svg-icon svg-icon-5">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor" />
                                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor" />
                                                                </svg>
                                                            </span>

                                                        </a>
                                                    </div>
                                                    {/* <!--end::View more--> */}
                                                </div>
                                            </div>
                                            {/* <!--end::Tab content--> */}
                                        </div>


                                    </div>
                                    {/* <!--end::Notifications--> */}
                                    {/* <!--begin::Chat--> */}
                                    <div className="d-flex align-items-center ms-1 ms-lg-3  mr-3">

                                        <div className="btn btn-icon btn-active-light-primary position-relative btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_drawer_chat_toggle">
                                            {/* <!--begin::Svg Icon | path: icons/duotune/communication/com012.svg--> */}
                                            <span className="svg-icon svg-icon-1">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor" />
                                                    <rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor" />
                                                    <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor" />
                                                </svg>
                                            </span>

                                            <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                                        </div>

                                    </div>
                                    {/* <!--end::Chat--> */}
                                    {/* <!--begin::Quick links--> */}

                                    <div className="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">

                                        <div className="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                                            <img src="assets_new/images/user.jpg" alt="user" />
                                        </div>
                                        {/* <!--begin::User account menu--> */}
                                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">

                                            <div className="menu-item px-3">
                                                <div className="menu-content d-flex align-items-center px-3">
                                                    {/* <!--begin::Avatar--> */}
                                                    <div className="symbol symbol-50px me-5">
                                                        <img alt="Logo" src="assets_new/images/user.jpg" />
                                                    </div>
                                                    {/* <!--end::Avatar--> */}
                                                    {/* <!--begin::Username--> */}
                                                    <div className="d-flex flex-column">
                                                        <div className="fw-bold d-flex align-items-center fs-5">Sumit Hariyani
                                                            <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Admin</span>
                                                        </div>
                                                        <a href="#" className="fw-semibold text-muted text-hover-primary fs-7">sumit@gmail.com</a>
                                                    </div>
                                                    {/* <!--end::Username--> */}
                                                </div>
                                            </div>


                                            <div className="separator my-2"></div>


                                            <div className="menu-item px-5">
                                                <a href="#" className="menu-link px-5">My Profile</a>
                                            </div>











                                            <div className="menu-item px-5 my-1">
                                                <a href="#" className="menu-link px-5">Account Settings</a>
                                            </div>


                                            <div className="menu-item px-5">
                                                <a href="#" className="menu-link px-5">Sign Out</a>
                                            </div>
                                            <div className="separator my-2"></div>

                                        </div>
                                        {/* <!--end::User account menu--> */}

                                    </div>
                                    {/* <!--end::User --> */}
                                    {/* <!--begin::Heaeder menu toggle--> */}
                                    <div className="d-flex align-items-center d-lg-none ms-3 me-n1" title="Show header menu">
                                        <div className="btn btn-icon btn-active-color-primary w-30px h-30px w-md-40px h-md-40px" id="kt_header_menu_mobile_toggle">
                                            {/* <!--begin::Svg Icon | path: icons/duotune/text/txt001.svg--> */}
                                            <span className="svg-icon svg-icon-1">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z" fill="currentColor" />
                                                    <path opacity="0.3" d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z" fill="currentColor" />
                                                </svg>
                                            </span>

                                        </div>
                                    </div>
                                    {/* <!--end::Heaeder menu toggle--> */}
                                </div>
                                {/* <!--end::Toolbar wrapper--> */}
                            </div>

                        </div>
                        {/* <!--end::Container--> */}
                    </div>

                    {/* <!--begin::Search form--> */}

                    {/* <!--end::Search form--> */}

                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">


                        <div className="container-xxl" id="kt_content_container">

                            <div className="row g-5 g-xl-8">




                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-8">

                                            <div className="card rounded-15 mb-5 mb-xl-10 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                                                <div className="card-body  pt-9 pb-0 ">
                                                    {/* <!--begin::Details--> */}
                                                    <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                                                        {/* <!--begin: Pic--> */}
                                                        <div className="me-7 mb-4">
                                                            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                                                <img src="assets_new/images/jassica.PNG" alt="image" />
                                                                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px">
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {/* <!--end::Pic--> */}

                                                        <div className="flex-grow-1">

                                                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                                                {/* <!--begin::User--> */}
                                                                <div className="d-flex flex-column">
                                                                    {/* <!--begin::Name--> */}
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">Jessica
                                                                            Chinara</a>
                                                                        <a href="#">
                                                                            {/* <!--begin::Svg Icon | path: icons/duotune/general/gen026.svg--> */}
                                                                            <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                                                    <path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="currentColor" />
                                                                                    <path d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white" />
                                                                                </svg>
                                                                            </span>

                                                                        </a>
                                                                        {/* <!--  <a href="#" className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Verified</a> --> */}
                                                                    </div>
                                                                    {/* <!--end::Name--> */}

                                                                    <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                                        <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                                            {/* <!--begin::Svg Icon | path: icons/duotune/communication/com006.svg--> */}
                                                                            <span className="svg-icon svg-icon-4 me-1">
                                                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" />
                                                                                    <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" />
                                                                                    <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Farmer
                                                                        </a>
                                                                        <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                                            {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                                                                            <span className="svg-icon svg-icon-4 me-1">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
                                                                                    <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                           Ethiopia
                                                                        </a>
                                                                        <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                                                            {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                                                                            <span className="svg-icon svg-icon-4 me-1">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
                                                                                    <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                          jessica@gmail.com
                                                                        </a>
                                                                    </div>
                                                                    {/* <!--end::Info--> */}
                                                                </div>
                                                                {/* <!--end::User--> */}

                                                            </div>


                                                            <div className="d-flex flex-wrap flex-stack">

                                                                <div className="d-flex flex-column flex-grow-1 pe-8">

                                                                    <div className="d-flex flex-wrap">
                                                                        {/* <!--begin::Stat--> */}
                                                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">

                                                                            <div className="d-flex align-items-center">

                                                                                <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                                                        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                                                                    </svg>
                                                                                </span>

                                                                                <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="4500" data-kt-countup-prefix="$">0</div>
                                                                            </div>


                                                                            <div className="fw-semibold fs-6 text-gray-400">
                                                                                Transaction Amount</div>

                                                                        </div>
                                                                        {/* <!--end::Stat--> */}
                                                                        {/* <!--begin::Stat--> */}
                                                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">

                                                                            <div className="d-flex align-items-center">

                                                                                <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor" />
                                                                                    </svg>
                                                                                </span>

                                                                                <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="75">0</div>
                                                                            </div>


                                                                            <div className="fw-semibold fs-6 text-gray-400">
                                                                                Total Transaction </div>

                                                                        </div>
                                                                        {/* <!--end::Stat--> */}
                                                                        {/* <!--begin::Stat--> */}

                                                                        {/* <!--end::Stat--> */}
                                                                    </div>
                                                                    <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                                                                        <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                                                                            <span className="fw-semibold fs-6 text-gray-400">Identity Trust Level
                                                                            </span>
                                                                            <span className="fw-bold fs-6">50%</span>
                                                                        </div>
                                                                        <div className="h-5px mx-3 w-100 bg-light mb-3">
                                                                            <div className="bg-success rounded h-5px w-50" role="progressbar"  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                {/* <!--begin::Progress--> */}

                                                                {/* <!--end::Progress--> */}
                                                            </div>

                                                        </div>
                                                        {/* <!--end::Info--> */}
                                                    </div>
                                                    {/* <!--end::Details--> */}
                                                    {/* <!--begin::Navs--> */}

                                                    {/* <!--begin::Navs--> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="card card-flush">

                                                <div className="card-header pt-5">

                                                    <h3 className="card-title align-items-start flex-column">
                                                        <span className="card-label fw-bold text-dark fs-3">KYC</span>
                                                        <span className="text-gray-400 mt-1 fw-semibold fs-6">User
                                                            Kyc</span>
                                                    </h3>




                                                </div>


                                                <div className="card-body">

                                                    <div className="d-flex flex-stack animation-css">

                                                        <div className="d-flex align-items-center jus me-3">
                                                            {/* <!--begin::Icon--> */}
                                                            <img src="assets_new/images/digitalid-03.png" className="me-3 w-30px" alt="" />
                                                            {/* <!--end::Icon--> */}

                                                            <div className="flex-grow-1">
                                                                <a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bold lh-0">
                                                                    Fingerprint</a>

                                                            </div>

                                                        </div>


                                                        <div className="d-flex justify-content-end align-items-center w-100 mw-125px">
                                                            {/* <!--begin::Progress--> */}
                                                            <img src="assets_new/images/digital-04.png" width="25px" />

                                                        </div>

                                                    </div>


                                                    <div className="separator separator-dashed my-4"></div>


                                                    <div className="d-flex flex-stack animation-css">

                                                        <div className="d-flex align-items-center me-3">
                                                            {/* <!--begin::Icon--> */}
                                                            <img src="assets_new/images/icons-16.png" className="me-3 w-30px" alt="" />
                                                            {/* <!--end::Icon--> */}

                                                            <div className="flex-grow-1">
                                                                <a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bold lh-0">Facial
                                                                    Identification</a>

                                                            </div>

                                                        </div>


                                                        <div className="d-flex justify-content-end align-items-center w-100 mw-125px">
                                                            {/* <!--begin::Progress--> */}
                                                            <img src="assets_new/images/cross.png" width="23px" />
                                                            {/* <!--end::Progress--> */}



                                                        </div>

                                                    </div>


                                                    <div className="separator separator-dashed my-4"></div>


                                                    <div className="d-flex flex-stack animation-css">

                                                        <div className="d-flex  align-items-center me-3">
                                                            {/* <!--begin::Icon--> */}
                                                            <img src="assets_new/images/address.png" className="me-3 w-30px" alt="" />
                                                            {/* <!--end::Icon--> */}

                                                            <div className="flex-grow-1">
                                                                <a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bold lh-0">Location
                                                                </a>

                                                            </div>

                                                        </div>


                                                        <div className="d-flex justify-content-end align-items-center w-100 mw-125px">
                                                            <img src="assets_new/images/digital-04.png" width="25px" />
                                                        </div>

                                                    </div>


                                                    <div className="separator separator-dashed my-4 mbstyle"></div>



                                                </div>

                                            </div>
                                        </div>



                                        <div className="col-lg-8">
                                            <div className="card mb-12 rounded-15 bgi-no-repeat bgi-position-x-end 
                                bgi-size-cover bg_card">

                                                <div className="card-body flex-column p-5">

                                                    <div className="d-flex align-items-center p-5">

                                                        <div className="activediv d-flex flex-column align-items-start justift-content-center flex-equal me-5">

                                                            <h1 className="fw-bold fs-4 fs-lg-1 text-white mb-5 mb-lg-10">
                                                                <span id="replce">D-ID Ref : #######655</span>&nbsp;
                                                                <span id="replce1">D-ID Ref : 2568900655</span>&nbsp;

                                                                <button type="button" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" className="didview btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4 text-white"></i>
                                                                    </span>
                                                                </button></h1>

                                                            <div className="didviewdiv ">
                                                                <h1>D-ID : 0xf64a058e8e15f5e791245f256b193e9eb3d1a7ed88812331c35cc41e8bd3f3ca</h1>
                                                            </div>
                                                            {/* <!--  <a href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_new_ticket" className="btn btn-primary fw-bold fs-8 fs-lg-base">View D-ID</a> --> */}





                                                        </div>


                                                        <div className="flex-equal d-flex justify-content-center align-items-end ms-5">

                                                            <img src="../../assets/media/illustrations/dozzy-1/20.png" alt="" className="mw-100 mh-125px mh-lg-275px mb-lg-n12" />

                                                        </div>

                                                    </div>


                                                    <div className="card-rounded  d-flex flex-stack flex-wrap p-5 pb-0">

                                                        <ul className="nav flex-wrap border-transparent fw-bold" role="tablist">

                                                            <li className="nav-item my-1" role="presentation">
                                                                <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#overview" className="btn btn-color-gray-600 btn-active-secondary  active btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase">Overview</a>
                                                            </li>


                                                            <li className="nav-item my-1" role="presentation">
                                                                <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#documents" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase">
                                                                    Documents</a>
                                                            </li>


                                                            <li className="nav-item my-1" role="presentation">

                                                                <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#land" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase">Land Registration</a>
                                                            </li>





                                                            <li className="nav-item my-1">

                                                                <a role="tab" aria-selected="true" data-bs-toggle="tab" href="#finance" className="btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase">
                                                                    Financial Activities</a>
                                                            </li>




                                                        </ul>






                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div className="card card-flush h-md-90 mb-5 mb-xl-10">
                                                <div className="card-header pt-5">
                                                    <div className="card-title d-flex flex-column">
                                                        <div className="d-flex align-items-center">
                                                            <span className="fs-4 fw-semibold text-gray-400 me-1 align-self-start">$</span>
                                                            <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">4,500</span>
                                                            <span className="badge badge-light-success fs-base">

                                                                <span className="svg-icon svg-icon-5 svg-icon-success ms-n1">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                                        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <span className="text-gray-400 pt-1 fw-semibold fs-6">Transaction Amount</span>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-2 pb-4 d-flex align-items-center">
                                                    <div className="d-flex flex-center me-5 pt-2">
                                                        <div id="kt_card_widget_4_chart" style={{ minWidth: "70px",  minHeight: "70px" }} data-kt-size="70" data-kt-line="11"></div>
                                                    </div>
                                                    <div className="d-flex flex-column content-justify-center w-100">
                                                        <div className="d-flex fs-6 fw-semibold align-items-center">
                                                            <div className="bullet w-8px h-6px rounded-2 bg-danger me-3"></div>
                                                            <div className="text-gray-500 flex-grow-1 me-4">withdraw</div>


                                                            <div className="fw-bolder text-gray-700 text-xxl-end">$7,660</div>

                                                        </div>


                                                        <div className="d-flex fs-6 fw-semibold align-items-center my-3">

                                                            <div className="bullet w-8px h-6px rounded-2 bg-primary me-3"></div>


                                                            <div className="text-gray-500 flex-grow-1 me-4">Deposit</div>


                                                            <div className="fw-bolder text-gray-700 text-xxl-end">$2,820</div>

                                                        </div>


                                                        <div className="d-flex fs-6 fw-semibold align-items-center">

                                                            <div className="bullet w-8px h-6px rounded-2 me-3" style={{backgroundColor: "#E4E6EF"}}></div>


                                                            <div className="text-gray-500 flex-grow-1 me-4">Others</div>


                                                            <div className="fw-bolder text-gray-700 text-xxl-end">$45,257</div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className="tab-content">

                                            <div className="tab-pane fade active show" id="overview" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-6">

                                                        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

                                                            <div className="card-header cursor-pointer">

                                                                <div className="card-title m-0">
                                                                    <h3 className="fw-bold m-0">Profile Details</h3>
                                                                </div>




                                                            </div>


                                                            <div className="card-body p-9">

                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Full
                                                                        Name</label>


                                                                    <div className="col-lg-8">
                                                                        <span className="fw-bold fs-6 text-gray-800">Jessica
                                                                            Chinara</span>
                                                                    </div>

                                                                </div>


                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Next of
                                                                        Kin (Name)</label>


                                                                    <div className="col-lg-8 fv-row">
                                                                        <span className="fw-semibold text-gray-800 fs-6">Mihai
                                                                            Andrei</span>
                                                                    </div>

                                                                </div>
                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Date of
                                                                        Birth</label>


                                                                    <div className="col-lg-8 fv-row">
                                                                        <span className="fw-semibold text-gray-800 fs-6">20/05/1994</span>
                                                                    </div>

                                                                </div>


                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Contact
                                                                        Phone No.
                                                                        <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i></label>


                                                                    <div className="col-lg-8 d-flex align-items-center">
                                                                        <span className="fw-bold fs-6 text-gray-800 me-2">+251
                                                                            123-456-7890
                                                                        </span>
                                                                        <span className="badge badge-success">Verified</span>
                                                                    </div>

                                                                </div>


                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Email
                                                                        Address</label>


                                                                    <div className="col-lg-8">
                                                                        <span className="fw-semibold fs-6 text-gray-800 text-hover-primary">
                                                                            jessica@gmail.com
                                                                        </span>
                                                                    </div>

                                                                </div>

                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Gender</label>


                                                                    <div className="col-lg-8">
                                                                        <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">Female</a>
                                                                    </div>

                                                                </div>

                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Nationality</label>


                                                                    <div className="col-lg-8">
                                                                        <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">Ethiopian</a>
                                                                    </div>

                                                                </div>

                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Profession</label>


                                                                    <div className="col-lg-8">
                                                                        <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">Farmer</a>
                                                                    </div>

                                                                </div>

                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Address</label>


                                                                    <div className="col-lg-8">
                                                                        <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">XP37+XCW,Addis
                                                                            Ababa,Ethiopia</a>
                                                                    </div>

                                                                </div>




                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="col-lg-6">


                                                        <div className="card card-flush">

                                                            <div className="bg_div card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px">

                                                                <h3 className="card-title align-items-start flex-column text-white pt-15">
                                                                    <span className="fw-bold fs-2x mb-3">Linked Services</span>
                                                                    <div className="fs-4 text-white">
                                                                        {/* <span className="opacity-75">Lorem Ipsum is simply dummy text</span> */}
                                                                    </div>
                                                                </h3>


                                                            </div>


                                                            <div className="card-body mt-n20">

                                                                <div className="mt-n20 position-relative">

                                                                    <div className="row g-3 g-lg-6">

                                                                        <div className="col-6">

                                                                            <div className="bg-gray-100 ative animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                                                <div className="symbol symbol-30px me-5 mb-8">
                                                                                    <span className="symbol-label">

                                                                                        <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                                                <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                                            </svg>
                                                                                        </span>

                                                                                    </span>
                                                                                </div>


                                                                                <div className="m-0">

                                                                                    <span className="bank-logo style12 text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1"
                                                                                    >
                                                                                        <img src="assets_new/images/logo5.png" width="100px" />
                                                                                    </span>


                                                                                    <span className="text-gray-500 fw-semibold fs-6">Fuse Wallet</span>

                                                                                </div>

                                                                            </div>

                                                                        </div>

                                                                        <div className="col-6">

                                                                            <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                                                <div className="symbol symbol-30px me-5 mb-8">
                                                                                    <span className="symbol-label">

                                                                                        <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                                                <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                                            </svg>
                                                                                        </span>

                                                                                    </span>
                                                                                </div>


                                                                                <div className="m-0">

                                                                                    <span className="bank-logo text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                                        <img src="assets_new/images/logo.png" width="65px" />
                                                                                    </span>


                                                                                    <span className="text-gray-500 fw-semibold fs-6">Chromepay Wallet</span>

                                                                                </div>

                                                                            </div>

                                                                        </div>


                                                                        <div className="col-6">

                                                                            <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                                                <div className="symbol symbol-30px me-5 mb-8">
                                                                                    <span className="symbol-label">

                                                                                        <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                                                <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                                            </svg>
                                                                                        </span>

                                                                                    </span>
                                                                                </div>


                                                                                <div className="m-0">

                                                                                    <span className=" bank-logo1 text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                                        <img src="assets_new/images/bank2.png" width="150px" />
                                                                                    </span>


                                                                                    <span className="text-gray-500 fw-semibold fs-6">Bank of Abyssinia</span>

                                                                                </div>

                                                                            </div>

                                                                        </div>


                                                                        <div className="col-6">

                                                                            <div className="bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                                                <div className="symbol symbol-30px me-5 mb-8">
                                                                                    <span className="symbol-label">

                                                                                        <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor" />
                                                                                                <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor" />
                                                                                            </svg>
                                                                                        </span>

                                                                                    </span>
                                                                                </div>


                                                                                <div className="m-0">

                                                                                    <span className="bank-logo1 text-center text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                                        <img src="assets_new/images/bank3.png" width="150px" />
                                                                                    </span>


                                                                                    <span className="text-gray-500 fw-semibold fs-6">Oromia Bank</span>

                                                                                </div>

                                                                            </div>

                                                                        </div>






                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>


                                                    <div className="col-lg-12">
                                                        <div className="card mb-5 mb-xxl-8">

                                                            <div className="card-header align-items-center border-0 mt-4">
                                                                <h3 className="card-title align-items-start flex-column">
                                                                    <span className="fw-bold mb-2 text-dark">D-ID Activities</span>
                                                                    <span className="text-muted fw-semibold fs-7">4,500 Transaction</span>
                                                                </h3>
                                                                <div className="card-toolbar">

                                                                    <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">

                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                    <rect x="5" y="5" width="5" height="5" rx="1" fill="currentColor" />
                                                                                    <rect x="14" y="5" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                                                    <rect x="5" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                                                    <rect x="14" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                                                                                </g>
                                                                            </svg>
                                                                        </span>

                                                                    </button>

                                                                    <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_62d4f2ee25eea">

                                                                        <div className="px-7 py-5">
                                                                            <div className="fs-5 text-dark fw-bold">Filter Options</div>
                                                                        </div>


                                                                        <div className="separator border-gray-200"></div>

                                                                        {/* <!--begin::Form--> */}
                                                                        <div className="px-7 py-5">

                                                                            <div className="mb-10">

                                                                                <label className="form-label fw-semibold">Status:</label>

                                                                                {/* <!--begin::Input--> */}
                                                                                <div>
                                                                                    <select className="form-select form-select-solid" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_62d4f2ee25eea" data-allow-clear="true">
                                                                                        <option></option>
                                                                                        <option value="1">withdraw</option>
                                                                                        <option value="2">Pending</option>
                                                                                        <option value="2">In Process</option>
                                                                                        <option value="2">Deposit</option>
                                                                                    </select>
                                                                                </div>

                                                                            </div>

                                                                            <div className="mb-10">

                                                                                <label className="form-label fw-semibold">Notifications:</label>


                                                                                <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                                                                    <input className="form-check-input" type="checkbox" value="" name="notifications" checked="checked" />
                                                                                    <label className="form-check-label">Enabled</label>
                                                                                </div>

                                                                            </div>


                                                                            <div className="d-flex justify-content-end">
                                                                                <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                                                                                <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                                                                            </div>

                                                                        </div>

                                                                    </div>


                                                                </div>
                                                            </div>


                                                            <div className="card-body pt-5">

                                                                <div className="timeline-label">

                                                                    <div className="timeline-item">

                                                                        <div className="timeline-label fw-bold text-gray-800 fs-6">08:42</div>


                                                                        <div className="timeline-badge">
                                                                            <i className="fa fa-genderless text-green fs-1"></i>
                                                                        </div>


                                                                        <div className="fw-mormal timeline-content text-green ps-3">Chromepay login</div>

                                                                    </div>


                                                                

                                                                    <div className="timeline-item">

                                                                        <div className="timeline-label fw-bold text-gray-800 fs-6">14:37</div>


                                                                        <div className="timeline-badge">
                                                                            <i className="fa fa-genderless text-primary fs-1"></i>
                                                                        </div>


                                                                        <div className="timeline-content fw-bold text-gray-800 ps-3">Made deposit of
                                                                            <a href="#" className="text-primary">&nbsp;700 Birr</a></div>

                                                                    </div>


                                                                    {/* <div className="timeline-item">

                                                                        <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>


                                                                        <div className="timeline-badge">
                                                                            <i className="fa fa-genderless text-primary fs-1"></i>
                                                                        </div>


                                                                        <div className="timeline-content fw-mormal text-muted ps-3">Indulging in poorly driving and keep structure keep great</div>

                                                                    </div> */}


                                                                    <div className="timeline-item">

                                                                        <div className="timeline-label fw-bold text-gray-800 fs-6">15:03</div>


                                                                        <div className="timeline-badge">
                                                                            <i className="fa fa-genderless text-primary fs-1"></i>
                                                                        </div>


                                                                        <div className="timeline-content fw-semibold text-gray-800 ps-3">Transfer of 
                                                                            <a href="#" className="text-primary">&nbsp;650 Birr </a>initiated</div>

                                                                    </div>


                                                                    <div className="timeline-item">

                                                                        <div className="timeline-label fw-bold text-gray-800 fs-6">16:50</div>


                                                                        <div className="timeline-badge">
                                                                            <i className="fa fa-genderless text-green fs-1"></i>
                                                                        </div>


                                                                        <div className="timeline-content fw-mormal text-green ps-3">Linked to Bank of Oromia</div>

                                                                    </div>


                                                                    <div className="timeline-item">

                                                                        <div className="timeline-label fw-bold text-gray-800 fs-6">21:03</div>


                                                                        <div className="timeline-badge">
                                                                            <i className="fa fa-genderless text-primary fs-1"></i>
                                                                        </div>


                                                                        <div className="timeline-content fw-semibold text-gray-800 ps-3">Transfer of 
                                                                            <a href="#" className="text-primary">&nbsp;1200 Birr</a> Received</div>

                                                                    </div>


                                                           

                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>


                                                </div>

                                            </div>


                                            <div className="tab-pane fade" id="documents" role="tabpanel">

                                                <div className="row">
                                                    <div className="col-lg-12 mb-4">
                                                        <h3 className="fw-bold my-2">User Documents
                                                            <span className="fs-6 text-gray-400 fw-semibold ms-1"></span></h3>
                                                    </div>

                                                    <div className="row mt-4">




                                                        <div className="col-lg-3 basicdetail">
                                                            <div className="carduser">
                                                                <div className="text-center">
                                                                    <a className="img_div">
                                                                        <img src="assets_new/images/electronic.png" />
                                                                    </a>
                                                                    <a href="assets_new/images/electronic.png" className="viewimg">
                                                                        <i className="fa fa-eye" data-toggle="lightbox" data-gallery="gallery" aria-hidden="true"></i></a>
                                                                </div>
                                                                <div className="d-flex justify-content-between p-3">
                                                                    <h5>Proof of Residence</h5>
                                                                    <div>

                                                                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 basicdetail">
                                                            <div className="carduser">
                                                                <div className="text-center">
                                                                    <a className="img_div">
                                                                        <img src="assets_new/images/gov.jpg" />
                                                                    </a>

                                                                    <a className="viewimg" href="assets_new/images/gov.jpg" data-toggle="lightbox" data-gallery="gallery">
                                                                        <i className="fa fa-eye" aria-hidden="true" data-toggle="lightbox" data-gallery="gallery"></i></a>

                                                                </div>
                                                                <div className="d-flex justify-content-between p-3">
                                                                    <h5>Local Govt. Doc</h5>
                                                                    <div>
                                                                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 basicdetail">
                                                            <div className="carduser">
                                                                <div className="text-center">
                                                                    <a className="img_div" href="#">
                                                                        <img src="assets_new/images/largepreview.png" />
                                                                    </a>
                                                                    <a className="viewimg" href="assets_new/images/largepreview.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                                </div>
                                                                <div className="d-flex justify-content-between p-3">
                                                                    <h5>Land Registration</h5>
                                                                    <div>

                                                                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 basicdetail">
                                                            <div className="carduser">
                                                                <div className="text-center">
                                                                    <a className="img_div" href="#">
                                                                        <img src="assets_new/images/id.png" />
                                                                    </a><a className="viewimg" href="assets_new/images/id.png" data-toggle="lightbox" data-gallery="gallery"><i className="fa fa-eye" aria-hidden="true"></i></a>

                                                                </div>
                                                                <div className="d-flex justify-content-between p-3">
                                                                    <h5>National ID</h5>
                                                                    <div>

                                                                        <a href="#" className="ml-2"><i className="fa fa-download" aria-hidden="true"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>


                                            <div className="tab-pane fade" id="land" role="tabpanel">


                                                <div className="row">
                                                    <div className="col-lg-6">

                                                        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

                                                            <div className="card-header cursor-pointer">

                                                                <div className="card-title m-0">
                                                                    <h3 className="fw-bold m-0">Land Information</h3>
                                                                </div>




                                                            </div>


                                                            <div className="card-body p-9">
                                                                <div className="symbol symbol-100px   mb-4 symbol-lg-160px symbol-fixed position-relative">
                                                                    <img src="assets_new/images/p1.jpg" alt="image" />
                                                                    <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px">
                                                                    </div>

                                                                </div>

                                                                <div className="row mb-7">

                                                                </div>

                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Location
                                                                        <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Location verified"></i>
                                                                    </label>


                                                                    <div className="col-lg-8 fv-row">
                                                                        <span className="fw-semibold text-gray-800 fs-6">
                                                                            <img src="assets_new/images/digital-04.png" width="23px" /></span>&nbsp;
                                                                        <span className="badge badge-success">Verified</span>
                                                                    </div>

                                                                </div>


                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Land Owner</label>


                                                                    <div className="col-lg-8">
                                                                        <span className="fw-bold fs-6 text-gray-800">Jessica
                                                                            Chinara</span>
                                                                    </div>

                                                                </div>


                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Contact Phone No.
                                                                        <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be verified"></i>
                                                                    </label>


                                                                    <div className="col-lg-8 fv-row">
                                                                        <span className="fw-semibold text-gray-800 fs-6">+251 123-456-7890</span>
                                                                        <span className="badge badge-success">Verified</span>
                                                                    </div>

                                                                </div>
                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Land Size</label>


                                                                    <div className="col-lg-8 fv-row">
                                                                        <span className="fw-semibold text-gray-800 fs-6">2 acre</span>

                                                                    </div>

                                                                </div>


                                                                <div className="row mb-7">

                                                                    <label className="col-lg-4 fw-semibold text-muted">Address
                                                                    </label>


                                                                    <div className="col-lg-8 d-flex align-items-center">
                                                                        <span className="fw-bold fs-6 text-gray-800 me-2">+XP37+XCW,Addis Ababa,Ethiopia
                                                                        </span>

                                                                    </div>

                                                                </div>









                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">

<div className="card-header cursor-pointer">

    <div className="card-title m-0">
        <h3 className="fw-bold m-0">Land Certificate</h3>
    </div>




</div>


<div className="card-body p-9">
    <img src='assets_new/images/largepreview.png' className='d-block' style={{width : "53%", margin : "auto"}} />
    </div>
    </div>
    


                                                    </div>
                                                </div>
                                            </div>




                                            <div className="tab-pane fade" id="finance" role="tabpanel">

                                                <div className="row">
                                                    <div className="col-lg-6">

                                                        <div className="card card-flush h-xl-100">

                                                            <div className="card-header py-7">

                                                                <div className="m-0">

                                                                    <div className="d-flex align-items-center mb-2">

                                                                        <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">120,000</span>


                                                                        <span className="badge badge-light-danger fs-base">

                                                                            <span className="svg-icon svg-icon-5 svg-icon-danger ms-n1">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                                                    <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                        </span>


                                                                    </div>


                                                                    <span className="fs-6 fw-semibold text-gray-400">Financial Activities</span>

                                                                </div>




                                                            </div>


                                                            <div className="card-body pt-0 pb-1">
                                                                <div id="kt_charts_widget_27" className="min-h-auto"></div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="card card-flush overflow-hidden h-md-100">

                                                            <div className="card-header py-5">

                                                                <h3 className="card-title align-items-start flex-column">
                                                                    <span className="card-label fw-bold text-dark">Transaction Activities</span>
                                                                    <span className="text-gray-400 mt-1 fw-semibold fs-6"></span>
                                                                </h3>




                                                            </div>


                                                            <div className="card-body d-flex justify-content-between flex-column pb-1 px-0">

                                                                <div className="px-9 mb-5">

                                                                    <div className="d-flex align-items-center mb-2">

                                                                        <span className="fs-4 fw-semibold text-gray-400 align-self-start me-1">$</span>


                                                                        <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">4,500</span>


                                                                        <span className="badge badge-light-success fs-base">

                                                                            <span className="svg-icon svg-icon-5 svg-icon-success ms-n1">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                        </span>

                                                                    </div>


                                                                    <span className="fs-6 fw-semibold text-gray-400">Transaction Amount This Month</span>

                                                                </div>

                                                                <div id="kt_charts_widget_4" className="min-h-auto ps-4 pe-6" style={{height: "300px"}}></div>
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
            </div>
        </div>

    );
}

export default Digital_suer_detail;