import React from 'react';

import {Link} from 'react-router-dom';
function Header(props) {
  let first_name = localStorage.getItem('first_name');
  let last_neme = localStorage.getItem('last_neme');
  let full_name = first_name +'  '+last_neme;
  let loginTime = localStorage.getItem('loginTime');
const logoutfun = () =>{
        alert('fun call');
        return false; 
}

    return (
        // <div style = {{display:"none"}}>
           <div>
      <header id="header" className="header fixed-top">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
    <Link to="/Home" className="logo aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
        <center><img src="../assets/images/logo.png" alt=""/></center>
        <br/> {//../assets/images/logo.png
}
        <span>Chromepay</span>
      </Link>

      <nav id="navbar" className="navbar">
        <ul className="mobile_ul">
          <li><Link className="nav-link scrollto active" to="/Home">Dashboard</Link></li>
            <li className="dropdown"><Link to="#" className=""><span>CRM</span> <i className="bi bi-chevron-down"></i></Link>
            <ul className="opentool">
                 <li><Link to="customer_transaction_reports"> Customer Detail Transaction Reports</Link></li>
                 <li><Link to="customer_transa_infor">Customer Transactions Details Information</Link></li>
                 <li><Link to="search_transactions">Search Transactions</Link></li>
                 <li><Link to="manage_api_customers">View API Customers</Link></li>
                 <li><Link to="organization">Organization<span className="recent_count">5</span></Link>

                 <div className="tooltip_curve tooltip_curve-west tool4" data-aos="fade-left" data-aos-delay="500">
                        <span className="tooltip_curve-content">
                         <p> <b>Organization</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
               <button type="button" className="btn btn-white btn-got1">ok</button>
               <button type="button" className="btn btn-got1">Got it</button>
              </span>
              </div>
                 </li>
                <li><Link to="customer">Customers<span className="recent_count">40</span></Link>
              <div className="tooltip_curve tooltip_curve-west tool3" data-aos="fade-left" data-aos-delay="500">
                        <span className="tooltip_curve-content">
                         <p> <b>Customers</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                <button type="button" className="btn btn-white btn-got2">ok</button>
                <button type="button" className="btn btn-got2">Got it</button>
              </span>
              </div>
                

                </li>
                <li><Link to="customer-settings"> Customer Settings</Link></li>
                <li><Link to="awaiting_verification">Awaiting Verification<span className="recent_count_pending">10</span></Link>

               <div className="tooltip_curve tooltip_curve-west tool2" data-aos="fade-left" data-aos-delay="500">
                        <span className="tooltip_curve-content">
              <p> <b>Awaiting Verification</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                <button type="button" className="btn btn-white btn-got3">ok</button>
                <button type="button" className="btn btn-got3">Got it</button>
              </span>
              </div>
                
                </li>
           
 
            </ul>
          </li> 
             <div className="tooltip_curve hide1 tooltip_curve-west" data-aos="zoom-out" data-aos-delay="200">
              <span className="tooltip_curve-content">
               <p> <b>CRM</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
               <h5>Organization</h5>
               <h5>Customers</h5>
               <h5>Awaiting Verification</h5>
                <button type="button" className="btn btn-white btn-got">ok</button>
               <button type="button" className="btn btn-got">Got it</button>
              </span>
              </div>
            <li className="dropdown"><Link to="#"><span>Reports</span> <i className="bi bi-chevron-down"></i></Link>
            <ul className="opentool2">
              <li><Link to="awaiting_confirmation">Awaiting confirmation<span className="recent_count_pending ml-3">9</span></Link>
               <div className="tooltip_curve tooltip_curve-west tool6" data-aos="fade-left" data-aos-delay="500">
                        <span className="tooltip_curve-content">
                         <p> <b>Awaiting Verification</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                <button type="button" className="btn btn-white btn-got6">ok</button>
               <button type="button" className="btn btn-got6">Got it</button>
              </span>
              </div>
                </li>
              <li><Link to="manage_transactions_history">Transaction History</Link></li>
              <li><Link to="payments_awaiting_processing">Payment Received<span className="recent_count ml-3">21</span></Link>

               <div className="tooltip_curve tooltip_curve-west tool7" data-aos="fade-left" data-aos-delay="500">
                        <span className="tooltip_curve-content">
                         <p> <b>Payment Received</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                <button type="button" className="btn btn-white btn-got7">ok</button>
               <button type="button" className="btn btn-got7">Got it</button>
              </span>
              </div>
              </li>
            </ul>
           </li> 
            <div className="tooltip_curve tooltip_curve-west tool5" data-aos="zoom-out" data-aos-delay="200">
              <span className="tooltip_curve-content">
               <p> <b>Reports</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
               <h5>Awaiting confirmation</h5>
               <h5>Payment Received</h5>
                <button type="button" className="btn btn-white btn-got5">ok</button>
               <button type="button" className="btn btn-got5">Got it</button>
              </span>
              </div>
        <li className="dropdown"><Link to="#"><span>Compliance</span> <i className="bi bi-chevron-down"></i></Link>
    
          </li>
          <li className="dropdown"><Link to="#"><span>Management</span> <i className="bi bi-chevron-down"></i></Link>
          <ul>
               <li><Link to="manage_partner_centers">Partners/Agents/Branches</Link></li>
               <li><Link to="#"> Adminstrators</Link></li> 
               <li><Link to="#">  Employees</Link></li> 
               <li><Link to="#">   Approve/Disapprove Cashier Profiles</Link></li> 
               <li><Link to="#">  Approve/Disapprove Agents</Link></li> 
               <li><Link to="#">   Import Data From File</Link></li> 
               </ul>
          </li>
          <li className="dropdown"><Link to="#"><span>Accounting</span> <i className="bi bi-chevron-down"></i></Link>
       
          </li> 
            <li className="dropdown"><Link to="#"><span>Settings</span> <i className="bi bi-chevron-down"></i></Link>
         <ul>
              <li><Link to="exchange_rates"> Add Exchange Rates</Link></li>
               <li><Link to="exchange_rates_list"> List Exchange Rates</Link></li> 
               <li><Link to="manage_charges"> Fee Setup</Link></li>
               <li><Link to="recurring_charge_fee">Recurring Fee</Link></li>
               <li><Link to="bill-payment-smart-routing"> Bill Payment Setup</Link></li>
               <li><Link to="prepaid_voucher_batch_history"> Prepaid Vouchers</Link></li>
               <li><Link to="email_settings">Email Settings</Link></li>
               <li><Link to="Bank-account-settings"> Bank Account Fields</Link></li>
               <li><Link to="supported_services_settings"> Enable Services</Link></li>
               <li><Link to="dynamic_field_list">  Dynamic Fields</Link></li>
            </ul>
          </li> 
            <div className="tooltip_curve tool8 tooltip_curve-west tool8" data-aos="zoom-out" data-aos-delay="200">
              <span className="tooltip_curve-content">
               <p> <b>Settings</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
               <h5>Add Exchange Rates</h5>
               <h5>List Exchange Rates</h5>
               <h5>Fee Setup</h5>
                <button type="button" className="btn btn-white btn-got8">ok</button>
                <button type="button" className="btn btn-got8">Got it</button>
              </span>
              </div>
         <li className="dropdown"><Link to="#"><span>Security</span> <i className="bi bi-chevron-down"></i></Link>
            <ul>
              <li><Link to="security_settings"> IP whitelisting</Link></li>
              <li><Link to="Audits_branches"> Audits Records Branches</Link></li>
           <li><Link to="transaction_alerts"> Transaction Alerts</Link></li>
          </ul>
          </li>
            <div className="tooltip_curve tooltip_curve-west tool9" data-aos="zoom-out" data-aos-delay="200">
              <span className="tooltip_curve-content">
               <p> <b>Security</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
               <h5>IP whitelisting</h5>
               <h5>Audits Records Branches</h5>
               <h5>Transaction Alerts</h5>
                <button type="button" className="btn btn-white btn-got9">ok</button>
                <button type="button" className="btn btn-got9">Got it</button>
              </span>
              </div>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
        <ul className="menu" data-aos="zoom-in">
        <li><Link to="#">
      <img src="../assets/images/user.png" style={{width: "35px"}}/></Link>
      <ul className="ul_arrow-top">
        
        <div className="card-title-admin">
          <h6>{full_name}</h6>
          <h5>Last Login :<span>{loginTime}</span></h5>
        </div>
        <li className="border-top"> <Link to="#"><span><i className="fe fe-user"></i></span> My Profile</Link> </li>
        <li><Link to="#"> <span><i className="fe fe-bell header-icons"></i></span> Notifications</Link></li>
        <li><Link to="#"><span><i className="fe fe-settings"></i></span> Account Settings</Link></li>
        <li  > <Link to="logout" ><span><i className="fe fe-power"></i></span> logout</Link></li>
      </ul>   
    </li>
      <div className="tooltip_curve tooltip_curve-west tools1" data-aos="zoom-out" data-aos-delay="200">
              <span className="tooltip_curve-content">
               <p> <b>Sumit Hariyani</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
               <h5>Last Login :<span> 04/08/2021 00:00</span></h5>
                <button type="button" className="btn btn-white btn-gots1">ok</button>
                <button type="button" className="btn btn-gots1">Got it</button>
              </span>
              </div>
  </ul>
    </div>
  </header>
        </div>
    );
}

export default Header;