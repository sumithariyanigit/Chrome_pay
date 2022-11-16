const express = require('express');
const router = express.Router();
const customerController = require("../controller/customer");
const adminController = require("../controller/adminontroller");
const transaction = require("../controller/transaction");
const Organisation = require("../controller/Organisation");
const adminauth = require("../middleware/adminAUth");
const organisationAuth = require("../middleware/organisationAuth");
const apihis = require("../middleware/apihistory");
//const BlocckIPs = require("../controller/BlockIPS")
const MatchIPc = require("../middleware/blockeIPs")
const userController = require("../controller/user");
const userModel = require('../models/userModel');
const agentController = require("../controller/AgentController");
const AgentModel = require('../models/AgentModel');
const blockChain = require("../controller/Blockchain");
const blockfield = require("../controller/bankfields");
const bankController = require("../controller/customerBank")
const ExportController = require("../controller/ExportsList")

//-----------------------------------------Auth-Middleware-Imports--------------------------------------------------------------------------------

const AgentAuth = require("../middleware/agentAuth")
const OrgAuth = require("../middleware/OrgAuth")
const AcessKeys = require("../middleware/OrganisationKeys")


//--------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/customer/:ID", MatchIPc.findBlockIPs, customerController.createCustomer, apihis.apiHistory);
router.get("/getuser", MatchIPc.findBlockIPs, adminauth.auth, customerController.getCustomer, apihis.apiHistory);
router.get("/getuser/:ID", MatchIPc.findBlockIPs, adminauth.auth, customerController.getallusers, apihis.apiHistory);
router.post("/update/:userId", MatchIPc.findBlockIPs, adminauth.auth, customerController.updateCustomer, apihis.apiHistory);
router.delete("/user/:userID", MatchIPc.findBlockIPs, adminauth.auth, customerController.userDelete, apihis.apiHistory);
router.delete("/useremail", MatchIPc.findBlockIPs, adminauth.auth, customerController.deleteByemail, apihis.apiHistory);
router.post("/AddOrganisation", MatchIPc.findBlockIPs, adminauth.auth, customerController.addOrganisation, apihis.apiHistory);
router.get("/getAllCustomer", MatchIPc.findBlockIPs, customerController.getAllCustomer);
router.put("/BlockCustomer/:ID", MatchIPc.findBlockIPs, customerController.blockCustomer)
router.put("/UnBlockCustomer/:ID", MatchIPc.findBlockIPs, customerController.UnblockCustomer)
router.get("/getcustomer/:custID", MatchIPc.findBlockIPs, customerController.getcustomer)


//-----------ADMIN---------------------------------------------

router.post("/Admin", MatchIPc.findBlockIPs, adminController.createAdmin, apihis.apiHistory);
router.post("/adminLogin", MatchIPc.findBlockIPs, adminController.AdminLogin, apihis.apiHistory);
router.get("/getAdminHistory", MatchIPc.findBlockIPs, adminController.getHistory, apihis.apiHistory);
router.get("/Logout", MatchIPc.findBlockIPs, adminController.adminLogout, apihis.apiHistory);
router.post("/LoginAdmin", MatchIPc.findBlockIPs, adminController.LoginAdmin)
router.post("/adminlogin2", MatchIPc.findBlockIPs, adminController.admin_login)
router.post("/otpVerificationAdmin/:ID", MatchIPc.findBlockIPs, adminController.verifyOTP)
router.post("/OrganisationList", MatchIPc.findBlockIPs, adminController.OrganisationList)
router.put("/suspend/:OrganisationID", MatchIPc.findBlockIPs, adminController.SuspendOrganisation)
router.put("/unsuspend/:OrganisationID", MatchIPc.findBlockIPs, adminController.Un_suspend_Organisation)
router.delete("/deleteOrganization/:OrganisationID", MatchIPc.findBlockIPs, adminController.deleteOrganisation)
router.post("/CustomerList", MatchIPc.findBlockIPs, adminController.AdminCustomerList)
router.put("/suspendcustomer/:ID/:adminID", MatchIPc.findBlockIPs, adminController.suspendCustomer);
router.put("/Unsuspendcustomer/:ID/:adminID", MatchIPc.findBlockIPs, adminController.UnsuspendCustomer);
router.delete("/deleteCustomer/:ID/:adminID", MatchIPc.findBlockIPs, adminController.DeleteCustomer);
router.delete("/unBlockIP/:adminID/:ID", adminController.UnBlockIP)
//router.post("/transectionList", adminController.adminTransectionList)
router.get("/getTransectionList", MatchIPc.findBlockIPs, adminController.AdminTransectionList);
router.post("/admintransectionfillter/:adminID", MatchIPc.findBlockIPs, adminController.admintransectionfillter);
router.get("/adminProfile/:adminID", MatchIPc.findBlockIPs, adminController.adminProfile);
router.post("/changePassword/:adminID", MatchIPc.findBlockIPs, adminController.changePassword);
router.post("/forgotpassword", MatchIPc.findBlockIPs, adminController.forgotpassword)
router.post("/changePasswordotp", MatchIPc.findBlockIPs, adminController.changePasswordotp)
router.post("/blockIPList/:adminID", adminController.blockIPList)
router.put("/updatelimits/:adminID", adminController.updatelimits)
router.get("/viewtransection/:ID", MatchIPc.findBlockIPs, adminController.viewtransection)
router.post("/adminProfileUpdate/:adminID", adminController.adminProfileUpdate)
router.post("/updateAgentTransection/:adminID", adminController.updateAgentTransection)
router.get("/admindash", adminController.admindash)
router.post("/custdetail/:custID", adminController.custdetail)
router.post("/verifyCustomer/:custID", adminController.verifyCustomer)
router.post("/approvalDIDs", adminController.approvalDIDs)
router.post("/blockedIDS", adminController.blockedIDS)
router.post("/blockedOrglist", adminController.blockedOrglist)
router.post("/getAllDIDs", adminController.getAllDIDs)
router.get("/recentUser", adminController.recentUser)
router.get("/recentTransection", adminController.recentTransection)
router.post("/agentPerformance/:agentID", adminController.agentPerformance)
router.get("/DIDsReports/:orgID", adminController.DIDsReports)
router.post("/adminAgent/:adminID", adminController.adminAgent)
router.get("/viewAdminAgent", adminController.viewAdminAgent)
router.put("/updateAdminAgent/:agentID", adminController.updateAdminAgent)
router.put("/deleteAgent/:agentID", adminController.deleteAgent)
router.post("/blockedAgentsList", adminController.blockedAgentsList)
router.post("/addSubAdmin/:adminID", adminController.addSubAdmin)
router.post("/addsubadminrole/:adminID/:subAdminID", adminController.add_sub_admin_role)
router.post("/updateSubAdminRoles/:subAdminID", adminController.updateSubAdminRoles)
router.post("/customerVerify/:custID/:adminID", adminController.customerVerify)
router.post("/orgVerify/:orgID/:adminID", adminController.orgVerify)
router.post("/OrgCust/:custID", adminController.OrgCust)
router.post("/addFeeSetup/:adminID",adminController.addFeeSetup)
router.post("/createCustomerByAdmin/:ID", adminController.createCustomerByAdmin)
router.post("/pendingCust", adminController.pendingCust)
router.post("/AgentReport", adminController.AgentReport)
router.post("/recentAgentUser/:ID", adminController.recentAgentUser)
router.post("/findSubAdmin", adminController.findSubAdmin)
router.post("/subAdminRole/:adminID", adminController.subAdminRole)
router.post("/agregateCust", adminController.agregateCust)
router.post("/orgLicenses/:orgID", adminController.orgLicenses)
router.post("/findLicenses/:orgID", adminController.findLicenses)
router.post("/add_Licenses/:orgID", adminController.add_Licenses)
router.get("/viewFee/:orgID", adminController.viewFee)
router.post("/updateFee/:orgID", adminController.updateFee)
router.post("/addOrgDocument/:orgID",adminController.addOrgDocument)
router.get("/find_Org_RemainingLicenses/:orgID", adminController.find_Org_RemainingLicenses)
router.post("/viewDoc/:orgID", adminController.viewDoc)
router.post("/findlowLicenseOrganisattions", adminController.findlowLicenseOrganisattions)
router.post("/emailRequestsByOrg", adminController.emailRequestsByOrg)
router.post("/customer_bank/:custID", adminController.customer_bank)
router.post("/agentEmailRequest", adminController.agentEmailRequest)
router.post("/bankWithCust/:BankID", adminController.bankWithCust)
router.post("/Block_Bank/:BankID", adminController.Block_Bank)
router.post("/Un_Block_Bank/:BankID", adminController.Un_Block_Bank)
router.post("/OrgChart", adminController.OrgChart)
router.post("/OrgTransectionChart", adminController.OrgTransectionChart)









//---------------Transaction----------------------------------

router.post("/transaction", MatchIPc.findBlockIPs, transaction.userTransaction, apihis.apiHistory);
router.get("/getTransectionByUser/:ID", MatchIPc.findBlockIPs, adminauth.auth, transaction.getTransectionById, apihis.apiHistory);
router.get("/getTransectionByFilters", MatchIPc.findBlockIPs, adminauth.auth, transaction.getTransectionByFilters, apihis.apiHistory);
router.get("/getAll", MatchIPc.findBlockIPs, transaction.getAllTransections, apihis.apiHistory);
router.get("/getSum", MatchIPc.findBlockIPs, organisationAuth.auth, transaction.getMaximun, apihis.apiHistory);
router.get("/getByPage", MatchIPc.findBlockIPs, MatchIPc.findBlockIPs, organisationAuth.auth, transaction.getByPage, apihis.apiHistory);
router.get("/relation", MatchIPc.findBlockIPs, organisationAuth.auth, transaction.relationmerge, apihis.apiHistory);
router.get("/getAllByFilter", transaction.getAllTransectionByFilter);

``
//---------------------Organisations-----------------------------------------------

router.post("/Organisation/:adminID", Organisation.createOrganisation, apihis.apiHistory);
router.get("/getOrganisations", MatchIPc.findBlockIPs, Organisation.getListOfOrganisation, apihis.apiHistory);
router.get("/getWithUser", MatchIPc.findBlockIPs, organisationAuth.auth, Organisation.getListOfOrganisationwithUser, apihis.apiHistory);
router.delete("/organisation", MatchIPc.findBlockIPs, Organisation.deletOrganisation, apihis.apiHistory);
router.get("/getTransection", MatchIPc.findBlockIPs, organisationAuth.auth, Organisation.getTransections, apihis.apiHistory);
router.post("/Login", MatchIPc.findBlockIPs, Organisation.organisationLogin);
router.get("/getHistory", MatchIPc.findBlockIPs, organisationAuth.auth, Organisation.getLogHistory, apihis.apiHistory);
router.post("/addCustomer", MatchIPc.findBlockIPs, MatchIPc.findBlockIPs, organisationAuth.auth, Organisation.addCustomerByOrganisation, apihis.apiHistory);
router.get("/getCustomer", MatchIPc.findBlockIPs, Organisation.getCustomerByFilter);
router.get("/ViewCustomer", MatchIPc.findBlockIPs, Organisation.viewCustomer);
router.post("/OrganisationDash/:ID", MatchIPc.findBlockIPs, Organisation.Organisationdashboard)
router.get("/OrganisationTransection/:ID", MatchIPc.findBlockIPs, Organisation.organisationsTransection)
router.get("/orgDashSection/:ID", MatchIPc.findBlockIPs, Organisation.OrgDashSection)
router.get("/OrganisationCustomer/:ID", MatchIPc.findBlockIPs, Organisation.OrganisationCustomer)
router.get("/organisationsTransectionList", MatchIPc.findBlockIPs, Organisation.organisationsTransectionList)
router.post("/OrganisationCustomerTest/:ID", MatchIPc.findBlockIPs, Organisation.OrganisationCustomerTest)
router.delete("/Delete/:ID", MatchIPc.findBlockIPs, Organisation.DeleteCustomer);
router.get("/ViewAgents/:OrgID", MatchIPc.findBlockIPs, Organisation.viewAgents);
router.get("/getDataByMonth/:ID", MatchIPc.findBlockIPs, Organisation.getDataByMonth);
router.post("/orgtransectiontransectionList/:orgID", Organisation.orgtransectiontransectionList);
router.put("/agentSusupend/:agentID/:orgID", MatchIPc.findBlockIPs, Organisation.agentsuspend);
router.put("/unSuspendagent/:agentID/:orgID", MatchIPc.findBlockIPs, Organisation.unSuspendagent)
router.delete("/deleteAgent/:agentID/:orgID", MatchIPc.findBlockIPs, Organisation.deleteAgent);
router.post("/orgtransection/:OrganisationID", MatchIPc.findBlockIPs, Organisation.organisationtransectionfillter);
router.post("/OrgchangePassword/:orgID", MatchIPc.findBlockIPs, Organisation.changePassword);
router.post("/orgforgotpassword", MatchIPc.findBlockIPs, Organisation.orgforgotpassword);
router.post("/orgchangePasswordotp", MatchIPc.findBlockIPs, Organisation.orgchangePasswordotp);
router.get("/vieworg/:orgID", MatchIPc.findBlockIPs, Organisation.vieworg);
router.get("/agentView/:agentID", Organisation.agentView)
router.post("/org_update/:orgID", Organisation.org_update)
router.post("/createCustomerByOrg/:ID", Organisation.createCustomerByOrg);
router.post("/verifyCustomer", Organisation.verifyCustomer)
router.get("/getOwnerDigitalID", Organisation.getOwnerDigitalID)
router.get("/getallGigitalIDs", Organisation.getallGigitalIDs)
router.get("/getInfoByDigitalID", Organisation.getInfoByDigitalID)
router.post("/updateDigitalID/:custID/:adminID", Organisation.updateDigitalID)
router.get("/orgList", Organisation.orgList)
router.post("/applyUpdateLicenses/:orgID", Organisation.applyUpdateLicenses)
router.get("/LicenseProcess/:orgID", Organisation.LicenseProcess)
router.post("/updateCommission/:agentID", Organisation.updateCommission)
router.post("/ViewAgentCommmission/:agentID", Organisation.ViewAgentCommmission)
router.post("/OrgPerreort/:orgID", Organisation.OrgPerreort)
router.post("/org_add_cust/:orgID", Organisation.org_add_cust)
router.post("/test/:token", AcessKeys.AcessKeys, Organisation.test)
router.get("/Cust_Loan_apply/:token", OrgAuth.auth, Organisation.Cust_Loan_apply)
router.post("/org_cust_loan/:LoanID", Organisation.org_cust_loan)
router.post("/org_loan_accept/:LoanID", Organisation.org_loan_accept)
router.post("/get_pass_Loans/:token", OrgAuth.auth, Organisation.get_pass_Loans)
router.post("/get_Loan_installment/:LoanID", Organisation.get_Loan_installment)


//-------------------------API-HIASTORY-----------------------------------------------//

router.get("/getApi", apihis.getApiHistory, apihis.apiHistory);


//--------------------------BlockIPs------------------------------------------------//

router.post("/BlockIP/:adminID", adminController.CreateIPs);

//------------------------User-----------------------------------------------------//

router.post("/user", userController.createUser, apihis.apiHistory)
router.get("/getAllUser", MatchIPc.findBlockIPs, adminauth.auth, userController.getAllUser, apihis.apiHistory)
router.post("/otpverify", userController.verifyOTP)


//----------------------Agent-Controller-------------------------------------------------

router.post("/agentregister/:orgID", MatchIPc.findBlockIPs, agentController.createAgent);
router.post("/Agentlogin", MatchIPc.findBlockIPs, agentController.agentLogin);
router.post("/agentCoustomerRegistration/:agentID", agentController.customerRegister);
router.post("/getagent/:orgID", MatchIPc.findBlockIPs, agentController.viewAgent);
router.put("/updateAgent", MatchIPc.findBlockIPs, agentController.updateAgent);
router.delete("/deleteAgent", agentController.deleteagent);
router.post("/verifyOTP", MatchIPc.findBlockIPs, agentController.verifyOTP);
router.post("/AgentforgotPassword", MatchIPc.findBlockIPs, agentController.forgotpassword);
router.post("/AgentForgetPassVerifyOtp", agentController.ForgetPassVerifyOtp)
router.put("/AgentchangePassword", MatchIPc.findBlockIPs, agentController.changePassword);
router.post("/agentcustomerList/:adminID", MatchIPc.findBlockIPs, agentController.agentCustomerList);
router.put("/SusPendCostomer/:agentID/:userID", MatchIPc.findBlockIPs, agentController.SusPendCostomer);
router.put("/unSuspengCustomer/:agentID/:userID", MatchIPc.findBlockIPs, agentController.unSuspengCustomer);
router.delete("/deleteCustomeragent/:token/:userID", MatchIPc.findBlockIPs, AgentAuth.auth, agentController.deleteCustomer);
router.post("/AgentCustomerTest/:agentID", MatchIPc.findBlockIPs, agentController.AgentCustomerTest);
router.post("/agenttranssection/:agentID", MatchIPc.findBlockIPs, agentController.agenttransectionfillter);
router.post("/agentchangePassword/:agentID", MatchIPc.findBlockIPs, agentController.agentchangePassword)
router.get("/agentProfile/:agentID", agentController.agentProfile);
router.post("/agentProfileUpdate/:agentID", agentController.agentProfileUpdate);
router.post("/updateTransectionLimit/:agentID", agentController.updateTransectionLimit)
router.post("/createCustomerByagent/:ID", agentController.createCustomerByagent)
router.post("/verifyCustomeragent", agentController.verifyCustomeragent)
router.get("/agentDash/:agentID", agentController.agentDash)
router.get("/recentUser/:agentID", agentController.recentUser)
router.get("/recentAgentTransection/:agentID", agentController.recentAgentTransection)
router.post("/createCustomerByOrg1/:agentID/:orgID", agentController.createCustomerByOrg1)
router.post("/commissionlist/:token", adminauth.auth, agentController.commissionlist)
router.post("/AgentAwaiting/:token", adminauth.auth, agentController.AgentAwaiting)
router.post("/agentPerformanceReport/:agentID", agentController.agentPerformanceReport)
router.post("/agentAddCustByMonth/:agentID", agentController.agentAddCustByMonth)
router.post("/agent_blocked/:agentID", agentController.agent_blocked)
router.post("/agentCommissionGarph/:agentID", agentController.agentCommissionGarph)
router.post("/FaceDitection/:custID", agentController.FaceDitection)
router.post('/customerVerifyByAgent/:custID', agentController.customerVerifyByAgent)
router.post("/Customer_Loan_app/:custID", agentController.Customer_Loan_app)
router.post("/getOrgForLoan/:custID", agentController.getOrgForLoan)
router.post("/getOrgLoans/:orgID", agentController.getOrgLoans)
router.post('/getOrgLoans/:orgID', agentController.getOrgLoans)
router.post("/getInterestOFLoan/:orgID", agentController.getInterestOFLoan)
router.post("/get_document/:custID", agentController.get_document)
router.post("/calculate_Amount/:token", AgentAuth.auth, agentController.calculate_Amount)
router.post("/Cust_Loan_apply_agent/:custID", agentController.Cust_Loan_apply_agent)
router.post("/Cust_apply_Agent_Loans/:token", AgentAuth.auth, agentController.Cust_apply_Agent_Loans)
router.post("/get_Agent_pass_Loans/:token", AgentAuth.auth, agentController.get_Agent_pass_Loans)
router.post("/pay_cust_emi/:LoanID", agentController.pay_cust_emi)
router.post("/Calculate_credit_Score/:custID", agentController.Calculate_credit_Score)
router.post("/get_Insatallment_Loans/:LoanID", agentController.get_Insatallment_Loans)
router.post("/send_Loan_Otp/:custID", agentController.send_Loan_Otp)







router.get("/hello",(req,res)=>{
    console.log("hello satyam")
    res.send("hello satyam")
})



//----------------------Block-chain--------------------------------------------------------------------------

router.post("/getdigitalID", blockChain.getdigitalID)

//--------------------------blackfields----------------------------------------------------------------------

router.post("/createfields/:orgID", blockfield.createfields)

//-----------------------customer-bank-----------------------------------------------------------------------

router.post("/addBankAccount/:customerID", bankController.createCustomer)
router.get("/viewBankAccount/:customerID", bankController.viewBankAccount)
router.post("/viewBankAccounts", bankController.viewBankAccounts)
router.put("/updateAccount/:BankID", bankController.updateAccount)
router.delete("/deleteAccount/:customerID", bankController.deleteAccount)
router.put("/accountSuspend/:accountID", bankController.accountSuspend)
router.put("/unSuspendAccount/:accountID", bankController.unSuspendAccount)


//-------------------------------------------Exports-system---------------------------------------------------------------------------------

router.post("/ExportAgentCust/:token", AgentAuth.auth, ExportController.ExportAgentCust)
router.post("/ExportCommissionList/:token", AgentAuth.auth, ExportController.ExportCommissionList)
router.post("/ExportAgentBlockedCust/:token", AgentAuth.auth, ExportController.ExportAgentBlockedCust)
router.post("/Org_cust/:token", OrgAuth.auth, ExportController.Org_cust)
router.post("/AdminCust", ExportController.AdminCust)
router.post("/AdminOrg", ExportController.AdminOrg)
router.post("/AdminBlockedCust", ExportController.AdminBlockedCust)


module.exports = router