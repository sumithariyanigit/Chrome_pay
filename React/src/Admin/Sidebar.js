
import React from "react";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
var jwt = require("jsonwebtoken");

export default function Sidebar() {

    let token = localStorage.getItem('token');
    var decode1= jwt.decode(token);
    let adminID = decode1.admminID
    // console.log('pushpak',adminID);
   
    const [menu ,setMenu] = useState([]);
    const [orgmenu, setOrgMenu] = useState([]);
    const [agent, setAgent] =useState([]);
    const [ip, setIP] = useState([]);

    const subAdminlist = async () =>{
        await axios.post(`/subAdminRole/${adminID}`)
        .then(resp=>{
            let data = resp.data.find
            // console.log('@@@@@',data.customer.addCustomer)
            setMenu(data.customer);
            setOrgMenu(data.Organisation)
            setAgent(data.Agent)
            setIP(data.IP)
        })

    }



    useEffect(() => {
        subAdminlist();
    }, [])

    const logout=()=>{
        alert('okk')
        localStorage.clear();
        window.location =`/`;

    }

    return (
        <>
         <div id="kt_aside" className="aside bg-primary" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">

                <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-8" id="kt_aside_logo">
                    <a href='/admin'>
                        <img alt="Logo" src="/assets/images/logo.png" className="h-50px" />
                    </a>
                </div>

                <div className="aside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0" id="kt_aside_nav">

                    <div className="hover-scroll-overlay-y my-2 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu" data-kt-scroll-offset="5px">

                        <div id="kt_aside_menu" className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-semibold fs-6" data-kt-menu="true">

                            <div  className="menu-item here show py-2">

                                <a href="/admin" className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                        <i className="fad fa-home-lg fs-1"></i>
                                    </span>
                                </a>

                            </div>

                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <a href="/admin" className="menu-link menu-center">
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

                                        <a href="/list-customer" className="menu-link">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">All DIDs list</span>
                                            </a>

                                            {menu.addCustomer == 1 ?
                                            <><a href="/customer-add" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Create DIDs</span>
                                        </a></>
                                        :""
}
                                        
                                        <a href="/digital-id-list" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">DIDs awaiting approval</span>
                                        </a>
                                        {orgmenu.addOrganisation == 1 ?<><a href ="/organization-Add" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Create Organization</span>
                                        </a></>:""
}
                                        <a href ="/organization-list-admin" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Organization List</span>
                                        </a>

                                        
                                        
                                        <a href="/organisations-block-list" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Block Organisations</span>
                                        </a>
                                       

                                        <a href="/Customer-block-list" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title"> Blocked IDs</span>
                                        </a>

                                        <a href="/less-licence" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title"> Organisation have less licenses</span>
                                        </a>

                                    </div>

                                </div>

                            </div>
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                            <a href="/admin" className="menu-link menu-center">
                            <span className="menu-icon me-0">
                                <i class="fas fa-users-medical fs-1"></i>
                               
                            </span>
                            </a>

                            <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-250px">

                            <div className="menu-item">

                                <div className="menu-content">
                                    <span className="menu-section fs-5 fw-bolder ps-1 py-1">Reports</span>
                                </div>

                            </div>

                            <div className="menu-item menu-accordion">


                                <a href ="/did-report" className="menu-link">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">DID reports</span>
                                </a>

                                <a href ="/agent-report" className="menu-link">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Agents Performance Report</span>
                                </a>
                                <a href ="/organzation-report" className="menu-link">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Organization Reports</span>
                                </a>
                                <a href ="/all-orgnzation-report" className="menu-link">
                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">All Organzation Reports</span>
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
                                    
                                    <a href="/transction-list" className="menu-link">

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
                                   
                                    <i class="fab fa-digital-ocean fs-1"></i>
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">DID Management</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    
                                    <a href="/pendding-did" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Customer DIDs  List</span>
                                        </a>
                                        <a href="/digital-approve-list" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Approved DID</span>
                                        </a>

                                    </div>
                                    


                                </div>

                            </div>
                            

                            {/* <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <span className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                    <i class="fad fa-user-plus fs-1"></i>
                                   
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Sub-Admin Managment</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    
                                    <a href="/subadmin-add" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Add Sub Admin</span>
                                        </a>
                                        <a href="/roles-add" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Add Roles</span>
                                        </a>
                                        

                                    </div>
                                    


                                </div>

                            </div> */}
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <span className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                    <i class="fad fa-user-plus fs-1"></i>
                                    {/* <i class="fab fa-digital-ocean fs-1"></i> */}
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Managment</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    
                                    <a href="#" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Organisations/Agents/Branches </span>
                                        </a>
                                        <a href="#" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" className="menu-item py-2">

                                            <span className="menu-title">Administration </span>

                                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px changeposition" >

                                                    <div className="menu-item">

                                                        {/* <div className="menu-content">
                                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Security</span>
                                                        </div> */}

                                                    </div>

                                                    <div className="menu-item menu-accordion">
                                                    
                                                    <a href="/subadmin-add" className="menu-link">

                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title"> Add Sub Admin</span>
                                                        </a>
                                                        <a href="/roles-add" className="menu-link">

                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title"> Add Roles</span>
                                                        </a>
                                                        <a href="/subadmin-role-list" className="menu-link">

                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Roles List</span>
                                                        </a>
                                                    </div>
                                                    


                                                </div>

                                            </div>
                                        </a>
                                        <a href="#" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Employees</span>
                                        </a>
                                        <a href="#" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Import Data
</span>
                                        </a>

                                    </div>
                                    


                                </div>

                            </div>
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <span className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                    <i class="far fa-shield-check fs-1"></i>
                                    {/* <i class="fad fa-user-plus fs-1"></i> */}
                                    {/* <i class="fab fa-digital-ocean fs-1"></i> */}
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Security</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    {ip.IPblackListing == 1 ? <>
                                    <a href="/customer-ipaddress" className="menu-link">

                                    <span className="menu-bullet">
                                        <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">IP whitelisting/blacklisting</span>
                                    </a></> : ""}
                                    
                                        <a href="#" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Audit Records</span>
                                        </a>
                                        {/* <a href="/agent-block-list" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Blocked Agents</span>
                                        </a> */}

                                    </div>
                                    


                                </div>

                            </div>
                            {/* <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

                                <span className="menu-link menu-center">
                                    <span className="menu-icon me-0">
                                    <i class="fas fa-users-medical fs-1"></i>
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Agent Management</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                       <a href="/Agent-admin-add" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Add Agent</span>
                                        </a>


                                        <a href="/Agent-admin-list" className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Agent List</span>
                                        </a>

                                    </div>


                                </div>

                            </div>   */}
                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item py-2">

<span className="menu-link menu-center">
    <span className="menu-icon me-0">
    <i class="fas fa-users-slash fs-1"></i>
   
    </span>
</span>

<div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

    <div className="menu-item">

        <div className="menu-content">
            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Commission</span>
        </div>

    </div>

    <div className="menu-item menu-accordion">
    
    <a href="/customer-commission-list" className="menu-link">

            <span className="menu-bullet">
                <span className="bullet bullet-dot"></span>
            </span>
            <span className="menu-title">Customers Commission List</span>
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
                                
                                <a href="/admin-did-customer-export" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">All DIDs List</span>
                                    </a>
                                    <a href="/Org-customer-export" className="menu-link">

                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Organzation Customer List</span>
                                    </a>
                                    <a href="/admin-blocked-export" className="menu-link">

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
                                    <i className="fonticon-setting fs-1"></i>
                                    {/* <i class="fab fa-digital-ocean fs-1"></i> */}
                                    </span>
                                </span>

                                <div className="menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-200px w-lg-225px">

                                    <div className="menu-item">

                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">Setting</span>
                                        </div>

                                    </div>

                                    <div className="menu-item menu-accordion">
                                    
                                    <a href="/my-profile" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">My Profile</span>
                                        </a>
                                        <a href="/Admin-change-password" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Account Settings</span>
                                        </a>
                                        <a href="/Admin-setting" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Passwords and OTP</span>
                                        </a>
                                        <a href="/agent-transaction-limit" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Agent Transaction Limit</span>
                                        </a>
                                        <a href="/setup-fees" className="menu-link">

                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title"> Fee Setup</span>
                                        </a>

                                    </div>
                                    


                                </div>

                            </div>
                            
                            

                        </div>
                        <br></br>
                        <br></br>
                        <div>
                        <button onClick={()=>logout()} className="menu-link px-3" style={{border:"none",background:"none"}}><i class="fad fa-sign-out-alt fs-1"></i></button>
                        </div>
                    </div>

                </div>

                

                {/* <div className="aside-footer d-flex flex-column align-items-center flex-column-auto" id="kt_aside_footer">

                    <div className="mb-7">
                        
                        <button type="button" className="btn btm-sm btn-custom btn-icon" data-kt-menu-trigger="click" data-kt-menu-overflow="true" data-kt-menu-placement="top-start" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-dismiss="click" title=" Setting">
                            <i className="fonticon-setting fs-1"></i>
                        </button>

                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true">

                            <div className="menu-item px-3">
                                <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">Setting</div>
                            </div>

                            <div className="separator mb-3 opacity-75"></div>


                            <div className="menu-item px-3">
                                <a href="/my-profile" className="menu-link px-3">My Profile</a>
                            </div>


                            <div className="menu-item px-3">
                                <a href="/Admin-change-password" className="menu-link px-3">Account Settings</a>
                            </div>
                            <div className="menu-item px-3">
                                <a href="/Admin-setting" className="menu-link px-3">Passwords and OTP</a>
                            </div>
                           
                            <div className="menu-item px-3">
                                <a href="/agent-transaction-limit" className="menu-link px-3">Agent Transaction Limit</a>
                            </div>
                            <div className="menu-item px-3">
                                <a href="/setup-fees" className="menu-link px-3">Fee Setup</a>
                            </div>
                            <div className="menu-item px-3">
                                <a href="#" className="menu-link px-3">Sign Out</a>
                            </div>


                            <div className="separator mb-3 opacity-75"></div>

                        </div>

                    </div>

                </div> */}

         </div> 
         </>
  );
}