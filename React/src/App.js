import { useEffect } from 'react';
import './App.css';


import {Route,Switch} from 'react-router-dom';

import Home from './Chrome/Home';
import Audits_branches from './Chrome/Audits_branches';
import Awaiting_confirmation from './Chrome/awaiting_confirmation';
import Awaiting_verification from './Chrome/Awaiting_verification';
import Bank_account_settings from './Chrome/bank_account_settings'; 
import Bill_payment_smart_routing from './Chrome/Bill_payment_smart_routing';
import Customer_settings from './Chrome/Customer_settings';
import Customer from './Chrome/Customer';
import Customer_detail from './Chrome/Customer_detail';
import Customer_send_message from './Chrome/Customer_send_message';
import Customer_transa_infor from './Chrome/Customer_transa_infor';
import Customer_transaction_reports from './Chrome/Customer_transaction_reports';
import Manage_charges from './Chrome/Manage_charges';
import Default_chrges_setup from './Chrome/Default_chrges_setup';
import Paycenter_commission_manager_default from './Chrome/Paycenter_commission_manager_default';
import Dynamic_field_list from './Chrome/Dynamic_field_list';
import Email_settings from './Chrome/Email_settings';
import Exchange_rates_list from './Chrome/Exchange_rates_list';
import Exchange_rates from './Chrome/Exchange_rates';
import Recurring_charge_fee from './Chrome/Recurring_charge_fee';
import Prepaid_voucher_batch_history from './Chrome/Prepaid_voucher_batch_history'; 
import Supported_services_settings from './Chrome/Supported_services_settings';
import Manage_api_customers from './Chrome/Manage_api_customers';
import Manage_transactions_history from './Chrome/Manage_transactions_history';
import Search_transactions_detail from './Chrome/Search_transactions_detail';
import Search_transactions from './Chrome/Search_transactions';
import Organization from './Chrome/Organization';
import Organization_detail from './Chrome/Organization_detail';
import Payments_awaiting_processing from './Chrome/Payments_awaiting_processing';
import Security_settings from './Chrome/Security_settings';
import Transaction_alerts from './Chrome/Transaction_alerts';
// import AutoAddress from './Agent/components/AutoAddress';


//import jk from './Chrome/demo/Index';

import C_pay  from './Chrome/C_pay';
import Digital_user_detail  from './Chrome/Digital_user_detail';
import OrganizationList from './Chrome/OrganizationList';
import OrganizationNewDetail from './Chrome/OrganizationNewDetail';



import Add_organization from './Chrome/Add_organization';
import Add_customer from './Chrome/Add_customer';
import Logout from './Chrome/Logout';
import Protected from './Protected';
import Customer_3 from './Chrome/Customer_3';
import Manage_partner_centers from './Chrome/Manage_partner_centers';
import Register_pay_centers_agent from './Chrome/Register_pay_centers_agent';
import Edit_api_pay_centers from './Chrome/Edit_api_pay_centers';
import Aaa_jk from './Chrome/Aaa_jk';
import Check_box_malti from './Chrome/sub_com/Check_box_malti';



//---------------------Admin--------------//

import Login  from './Admin/Login';
import Otp_login from './Admin/Otp_login';
import AdminDashbord from './Admin/AdminDashbord';

//---------------------Admin--------------//

////////new page added Organization
import OrganizationDashboard from './Organization/Organization';
import AddCustomer from './Organization/AddCutstomer';
import OtpCustomer from './Organization/OtpCustomer';
import SuccessCustomerModal from './Organization/SuccessCustomerModal';
import OrgLogin from './Organization/OrgLogin';
import CustomersList from './Organization/CustomersList';
import CustomerTranstionList from './Organization/CustomerTranstionList';
import AdminCustomer from './Admin/AdminCustomer';
import ListCustomer from './Admin/ListCustomer';
import TransactionsList from './Admin/TransactionsList';
import ListOrgnization from './Admin/ListOrgnization';
import OrganizationAdd from './Admin/OrgnizationAdd';
import AgentAdd from './Organization/AgentAdd';
import AgentList from './Organization/AgentList';
import updateLicenses from './Organization/updateLicenses'

import AgentDashbord from './Agent/AgentDashbord';
import LoginAgent from './Agent/LoginAgent';
import CustomerAgentAdd from './Agent/CustomerAgentAdd';
import AgentCustomerList from './Agent/AgentCustomerList';
import AgentCustomerOtp from './Agent/AgentCustomerOtp';
import AgentTransactionList from './Agent/AgentTransactionList';
import AgentChangePassword from './Agent/AgentChangePassword';
import AdminChangePassword from './Admin/AdminChangePassword';
import OrgChangePassword from './Organization/OrgChangePassword';
import AdminSetting from './Admin/AdminSetting';
import IpAddress from './Admin/IpAddress';
import CustomerView from './Admin/CustomerView';
import TransactionView from './Admin/TransactionView';
import OrgnazationView from './Admin/OrgnazationView';
import CustmerViewOrg from './Organization/CustmerViewOrg';
import TransctionViewOrg from './Organization/TransctionViewOrg';
import AgentViewOrg from './Organization/AgentViewOrg';
import CutomerViewAgent from './Agent/CutomerViewAgent';
import TransactionViewAgent from './Agent/TransactionViewAgent';
import AddBank from './Organization/AddBank';
import AgentAddAccount from './Agent/AgentAddAccount';
import AgentAccountList from './Agent/AgentAccountList';
import MyProfile from './Admin/MyProfile';
import AgentMyProfile from './Agent/AgentMyProfile';
import MyProfileOrg from './Organization/MyProfileOrg';
import OtpOrg from './Organization/OtpOrg';
import AgentTransactionLimit from './Admin/AgentTransactionLimit';
import AdminCustomerOtp from './Admin/AdminCustomerOtp';
import DigitalID from './Admin/DigitalID';
import AllDigitalID from './Admin/AllDigitalID';
import CustomerBlockList from './Admin/CustomerBlockList';
import OrgnizationBlockList from './Admin/OrgnizationBlockList';
import AgentBlocskList from './Admin/AgentBlocskList';
import SubadminAdd from './Admin/SubadminAdd';
import AddRoles from './Admin/AddRoles';
import UserCustView from './Admin/UserCustView';

import SetupFees from './Admin/SetupFees';
import PenddingDID from './Admin/PenddingDID';
import AgentReport from './Admin/AgentReport';
import AgentReportView from './Admin/AgentReportView';
import OrganzationReport from './Admin/OrganzationReport';
import DIDReport from './Admin/DIDReport';
import SubAdminList from './Admin/SubAdminList';
import SubAdminView from './Admin/SubAdminView';
import Add_admin_document from './Admin/Add_admin_document';
import RemaningLicenses from './Organization/RemaningLicenses';
import AgentAdminAdd from './Admin/AgentAdminAdd';
import AgentAdminList from './Admin/AgentAdminList';
import CommisionList from './Admin/CommisionList';
import AgentCommisionList from './Agent/AgentCommisionList';
import AgentDIDApprovel from './Agent/AgentDIDApprovel';
import CustmerBankDetail from './Admin/CustmerBankDetail';
import LicensesOrganzation from './Admin/LicensesOrganzation';
import performance_repost from './Admin/performance_repost';
import OrganzationPerfomance from './Admin/OrganzationPerfomance';
import AgentBlockedDIDs from './Agent/AgentBlockedDIDs';
import ExportCustomerDIDs from './Agent/Component/ExportCustomerDIDs';
import ExportCommissionList from './Agent/Component/ExportCommissionList';
import ExportBlockedList from './Agent/Component/ExportBlockedList';
import AdminExportCustList from './Admin/ExportComponent/AdminExportCustList';
import ExportOrgCustList from './Admin/ExportComponent/ExportOrgCustList';
import ExportAdminBlockedList from './Admin/ExportComponent/ExportAdminBlockedList';
import OrgCustExport from './Organization/ExportComponent/OrgCustExport';
import AllOrgnReport from './Admin/AllOrgnReport';
import LoanApply from './Organization/LoanComponent/LoanApply';
import CustomerLoanDashboard from './Organization/LoanComponent/CustomerLoanDashboard';
import LongApply from './Agent/LoanApply';
import LoanPassList from './Organization/LoanComponent/LoanPassList';
import LoanPassDashbord from './Organization/LoanComponent/LoanPassDashbord';
import Customerloanlist from './Agent/loanlist/Customerloanlist';
import Loanpasslist from './Agent/loanlist/Loanpasslist';
import CardScore from './Organization/CreditScoreComponent/CardScore';
import AgentLoanPassDashbord from './Agent/loanlist/AgentLoanPassDashbord';
import AgentCustLink from './Agent/LinkComponent/AgentCustLink';
import OrgCustLink from './Organization/LinkComponent/OrgCustLink';
import AdminCustLink from './Admin/LinkComponent/AdminCustLink';
import Scanner from './Agent/Scanner';








function App() {  
 
  useEffect(() => {
    // Update the document title using the browser API

  });

  return (
    
    <div className="App">
   
  {/* <Header/> */}
    <Switch>
          


   {/* ////////new page added   Orgnzation   */}
   <Route exact path='/loginorg' component={OrgLogin} /> 
  <Route exact path='/organization' component={OrganizationDashboard} /> 
  <Route exact path='/addcustomer' component={AddCustomer} /> 
  <Route exact path='/addcustomer/otp' component={OtpCustomer} /> 
  <Route exact path='/addcustomer/otp/success' component={SuccessCustomerModal} /> 
  <Route exact path='/customer-list' component={CustomersList} /> 
  <Route exact path='/transtion-list' component={CustomerTranstionList} /> 
  <Route exact path='/agent-add' component={AgentAdd} /> 
  <Route exact path='/agent-list' component={AgentList} /> 
  <Route exact path='/org-change-password' component={OrgChangePassword} /> 
  <Route exact path='/org-customer-view/:_id' component={CustmerViewOrg} /> 
  <Route exact path='/transaction-view-org/:_id' component={TransctionViewOrg} /> 
  <Route exact path='/agent-view-org/:_id' component={AgentViewOrg} /> 
  <Route exact path='/Add-Bank' component={AddBank} /> 
  <Route exact path='/my-profile-org' component={MyProfileOrg} /> 
  <Route exact path='/otp-org' component={OtpOrg} /> 
  <Route exact path='/update-license' component={updateLicenses}/>
  <Route exact path='/remaning-license' component={RemaningLicenses}/>
  <Route exact path='/loan-apply-list' component={LoanApply}/>
  <Route exact path='/loan-dashboard/:_id' component={CustomerLoanDashboard}/>
  <Route exact path='/loan-pass' component={LoanPassList}/>
  <Route exact path='/loan-pass-dashbord/:_id' component={LoanPassDashbord}/>
  <Route exact path='/card-score' component={CardScore}/>
  <Route exact path='/org-customer-links' component={OrgCustLink} />

 
  

 

  {/* ////////new page end Admin    */}

  <Route exact path='/organization-list' component={OrganizationList} /> 
  <Route exact path='/organization-detail' component={OrganizationNewDetail} /> 
  <Route exact path='/user-list' component={C_pay} /> 
  <Route exact path='/user-list-detail' component={Digital_user_detail} /> 
  <Route exact path='/' component={Login} />
  <Route exact path='/admin' component={AdminDashbord} />
  <Route exact path='/customer-add' component={AdminCustomer} />
  <Route exact path='/list-customer' component={ListCustomer} />
  <Route exact path='/transction-list' component={TransactionsList} />
  <Route exact path='/organization-Add' component={OrganizationAdd} />
  <Route exact path='/organization-list-admin' component={ListOrgnization} />
  <Route exact path='/Admin-change-password' component={AdminChangePassword} />
  <Route exact path='/Admin-setting' component={AdminSetting} />
  <Route exact path='/customer-ipaddress' component={IpAddress} />
  <Route exact path='/customer-view-admin/:_id' component={CustomerView} />
  <Route exact path='/transaction-view-admin/:_id' component={TransactionView} />
  <Route exact path='/organzation-view-admin/:_id' component={OrgnazationView} />
  <Route exact path='/my-profile' component={MyProfile} />
  <Route exact path='/agent-transaction-limit' component={AgentTransactionLimit} />
  <Route exact path='/admin-customer-otp' component={AdminCustomerOtp} />
  <Route exact path='/digital-id-list' component={DigitalID} />
  <Route exact path='/digital-approve-list' component={AllDigitalID} />
  <Route exact path='/Customer-block-list' component={CustomerBlockList} />
  <Route exact path='/organisations-block-list' component={OrgnizationBlockList} />
  <Route exact path='/agent-block-list' component={AgentBlocskList} />
  <Route exact path='/subadmin-add' component={SubadminAdd} />
  <Route exact path='/roles-add' component={AddRoles} />
  <Route exact path='/user-customer-view/:_id' component={UserCustView} />
  <Route exact path='/setup-fees' component={SetupFees} />
  <Route exact path='/pendding-did' component={PenddingDID} />
  <Route exact path='/agent-report' component={AgentReport} />
  <Route exact path='/agent-report-view/:_id' component={AgentReportView} />
  <Route exact path='/organzation-report' component={OrganzationReport} />
  <Route exact path='/did-report' component={DIDReport} />
  <Route exact path='/subadmin-role-list' component={SubAdminList} />
  <Route exact path='/subadmin-view/:_id' component={SubAdminView} />
  <Route exact path='/Add_admin_document/:id' component={Add_admin_document} />
  <Route exact path='/Agent-admin-add' component={AgentAdminAdd} />
  <Route exact path='/Agent-admin-list' component={AgentAdminList} />
  <Route exact path='/customer-commission-list' component={CommisionList} />
  <Route exact path='/custmer-bank-detail/:_id/:custID' component={CustmerBankDetail} />
  <Route exact path='/less-licence' component={LicensesOrganzation} />
  <Route exact path='/performance_repost/:_id' component={performance_repost} />
  <Route exact path='/oragnzation-performance_repost/:_id' component={OrganzationPerfomance} />
  <Route exact path='/all-orgnzation-report' component={AllOrgnReport} />
  <Route exact path='/admin-customer-links' component={AdminCustLink} />
  
  
  
  
  
  

 {/* //////////------Agent  --------///// */}
 
 <Route exact path='/login-agent' component={LoginAgent} />
 <Route exact path='/agent-dashbord' component={AgentDashbord} />
 <Route exact path='/agent-customer-add' component={CustomerAgentAdd} />
 <Route exact path='/agent-customer-list' component={AgentCustomerList} />
 <Route exact path='/agent-customer-otp' component={AgentCustomerOtp} />
 <Route exact path='/Agent-transction-list' component={AgentTransactionList} />
 <Route exact path='/Agent-change-password' component={AgentChangePassword} />
 <Route exact path='/Agent-customer-view/:_id' component={CutomerViewAgent} />
 <Route exact path='/Agent-transaction-view/:_id' component={TransactionViewAgent} />
 <Route exact path='/Agent-Add-Account/:_id' component={AgentAddAccount} />
 <Route exact path='/Agent-Add-Account-list' component={AgentAccountList} />
 <Route exact path='/agent-my-profile' component={AgentMyProfile} />
 <Route exact path='/Agent-comssion-list' component={AgentCommisionList} />
 <Route exact path='/agent-did-approvel' component={AgentDIDApprovel} />
 <Route exact path='/agent-did-blocked' component={AgentBlockedDIDs} />
 <Route exact path='/longApply/:_id' component={LongApply} />
 <Route exact path='/Customerloanlist' component={Customerloanlist} />
  <Route exact path='/Loanpasslist' component={Loanpasslist} />
  <Route exact path='/agent-loan-pass-dashbord/:_id' component={AgentLoanPassDashbord}/>
  <Route exact path='/agent-customer-links' component={AgentCustLink}/>
  <Route exact path='/scanner' component={Scanner}/>

  {/*--------------Export Agent---------------- */}
  <Route exact path='/agent-did-customer' component={ExportCustomerDIDs} />
  <Route exact path='/commision-list-export' component={ExportCommissionList} />
  <Route exact path='/block-list-export' component={ExportBlockedList} />
  {/*--------------Export Admin---------------- */}
  <Route exact path='/admin-did-customer-export' component={AdminExportCustList} />
  <Route exact path='/Org-customer-export' component={ExportOrgCustList} />
  <Route exact path='/admin-blocked-export' component={ExportAdminBlockedList} />
  {/*--------------Export Admin---------------- */}
  <Route exact path='/Export-customer-export' component={OrgCustExport} />
 

  










  <Route exact path='/logout' component={Logout} />
  <Route exact path='/otp_login' component={Otp_login} />
  <Route exact path='/Aaa_jk' component={Aaa_jk} />
  <Route exact path='/Check_box_malti' component={Check_box_malti} />
  <Route exact path='/Home'><Protected cmp = {Home} /></Route>
  <Route exact path='/Audits_branches' component={Audits_branches}/>
  
  <Route exact path='/Awaiting_confirmation' component={Awaiting_confirmation}/>
  <Route exact path='/awaiting_verification' component={Awaiting_verification}/>

  <Route exact path='/Bank-account-settings' component={Bank_account_settings}/>
  <Route exact path='/bill-payment-smart-routing' component={Bill_payment_smart_routing}/>

  <Route exact path='/customer-settings' component={Customer_settings}/>
  <Route exact path='/customer' component={Customer}/>
  <Route exact path='/customer_3' component={Customer_3}/>
  <Route exact path='/add-customer' component={Add_customer}/>
  <Route exact path='/customer_detail' component={Customer_detail}/>
  <Route exact path='/customer_send_message' component={Customer_send_message}/>
  <Route exact path='/customer_transa_infor' component={Customer_transa_infor}/>
  <Route exact path='/customer_transaction_reports' component={Customer_transaction_reports}/>

  <Route exact path='/dynamic_field_list' component={Dynamic_field_list}/>
  <Route exact path='/default_chrges_setup' component={Default_chrges_setup}/>

  <Route exact path='/email_settings' component={Email_settings}/>


  <Route exact path='/manage_charges' component={Manage_charges}/>
  <Route exact path='/manage_api_customers' component={Manage_api_customers}/>
  <Route exact path='/manage_transactions_history' component={Manage_transactions_history}/>

  <Route exact path='/exchange_rates_list' component={Exchange_rates_list}/>
  <Route exact path='/exchange_rates' component={Exchange_rates}/>

  <Route exact path='/paycenter_commission_manager_default' component={Paycenter_commission_manager_default}/>
  <Route exact path='/recurring_charge_fee' component={Recurring_charge_fee}/>
  <Route exact path='/prepaid_voucher_batch_history' component={Prepaid_voucher_batch_history}/>
  <Route exact path='/supported_services_settings' component={Supported_services_settings}/>
  <Route exact path='/search_transactions_detail' component={Search_transactions_detail}/>
  <Route exact path='/search_transactions' component={Search_transactions}/>
  <Route exact path='/add-organization' component={Add_organization}/>
  <Route exact path='/organization' component={Organization}/>
  <Route exact path='/organization_detail/' component={Organization_detail}/>
  <Route exact path='/payments_awaiting_processing' component={Payments_awaiting_processing}/>
  <Route exact path='/security_settings' component={Security_settings}/>
  <Route exact path='/transaction_alerts' component={Transaction_alerts}/>
  <Route exact path='/manage_partner_centers' component={Manage_partner_centers}/>
  <Route exact path='/register_pay_centers_agent' component={Register_pay_centers_agent}/>
  <Route exact path='/edit_api_pay_centers' component={Edit_api_pay_centers}/>

  </Switch>

    </div>
  );
}

export default App;
