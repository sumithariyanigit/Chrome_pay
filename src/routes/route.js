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
const wallet_controller = require("../controller/Wallet")
const Face_ditection = require("../controller/cust_face_controller")
const customer_controller = require("../controller/coustomer_controller")
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const Third_party_Organization = require("../controller/Orgnization_third_party")

//4564

//-----------------------------------------Auth-Middleware-Imports--------------------------------------------------------------------------------

const AgentAuth = require("../middleware/agentAuth")
const OrgAuth = require("../middleware/OrgAuth")
const AcessKeys = require("../middleware/OrganisationKeys")
const cust_auth = require("../middleware/customer_auth")


//--------------------------------------------------------------------------------------------------------------------------------------------------







/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
*       example:
*         id: d5fE_asz
*         title: The New Turing Omnibus
*         author: Alexander K. Dewdney
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - IDphoto
 *         - author
 *         - fullname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *       IDphoto:
 *           type: string
 *           description: The book title
 *       author:
 *           type: string
 *           description: The book author
 *       fullname:
 *           type: string
 *       dateOfBirth:
 *            type: string
 *       phone:
 *             type: Number
 *       email:
 *             type: string
 *       gender:
 *             type: string
 *       nationality:
 *             type: string
 *       professoin:
 *             type: string
 *       address:
 *             type: string
 *       Latitude:
 *             type: string
 *       Longitude:
 *              type: string
 *       biometric:
 *               type: Number
 *       fingerPrint:
 *        type: Number
 *       city:
 *          type: string
 *       age:
 *        type: Number
 *       status:
 *        type: string
 *       hash:
 *        type: string
 *       owner:
 *        type: string
 *       privateKey:
 *        type: string
 *       walletAddress:
 *        type: string
 *       organisation:
 *         type: string
 *       blocked:
 *         type: Number
 *       isDeleted:
 *         type: Number
 *       createdBY:
 *          type:string
 *       DeletedBy:
 *          type:string
 *       suspendBy:
 *          type:string
 *       nextFOKinName:
 *          type: string
 *       nextFOKniPhone:
 *          type: Number
 *       landSize:
 *          type: string
 *       residance:
 *          type: string
 *       locaDocument:
 *          type: string
 *       landRegistration:
 *          type: string
 *       otp:
 *           type: Number
 *       facialIdentification:
 *           type: Number
 *       faceDiscription:
 *           type: Array
 *       digitalID:
 *          type: string
 *       digitalrefID:
 *          type: string
 *       Location:
 *          type: Number
 *       assetType:
 *         type: string
 *       assetID:
 *          type: string
 *       assetAddress:
 *         type: string
 *       assetLongitude:
 *         type: string
 *       assetLatitude:
 *        type: string
 *       Loan_OTP:
 *         type: string
 *       Linekd_Service_OTP:
 *         type: string
 *       password:
 *         type: string
 *       wrongOTP:
 *         type: Number
 *       wrong_pass:
 *          type: Number
 *       login_otp:
 *         type: Number
 *       example:
 *           id: d5fE_asz
 *           IDphoto: The New Turing Omnibus
 *           author: Alexander K. Dewdney
 *           fullname : sdsd ds
*/












/**
  * @swagger
  * tags:
  *   name: Organization
  *   description: The Organization managing API
  */



//---------------------------------------------------------------organisation-swagger-------------------------------------------------------------------


/**
 * @swagger
 * /Login:
 *   post:
 *     summary: Organization Login
 *     tags: [ORG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Login Sucessfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /createCustomerByOrganization:
 *   post:
 *     summary: Create a new customer
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The OTP send sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /OrgverifyCustomer:
 *   post:
 *     summary: Create customer OTP verify
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The customer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */



/**
 * @swagger
 * /Organization_Customers:
 *   post:
 *     summary: All Digital ID's
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: All Digital IDs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /OrgcustomerVerify/{customerID}:
 *   post:
 *     summary: Veirfy Customer
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *       - in: path
 *         name: customerID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer verify Sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /OrgblockCustomer/{customerID}:
 *   put:
 *     summary: Block Customer
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *       - in: path
 *         name: customerID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer Block Sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /OrgDeleteCustomer/{customerID}:
 *   delete:
 *     summary: Delete Customer
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *       - in: path
 *         name: customerID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer Delete successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */

///custdetail/:custID

/**
 * @swagger
 * /Org_custdetail/{customerID}:
 *   get:
 *     summary: Customer Detaile
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *       - in: path
 *         name: customerID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer Detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


//-------------------------------------pending-12-10-2022---------------------------------------------

/**
 * @swagger
 * /org_updateDigitalID/{customerID}:
 *   put:
 *     summary: Generate customer Digital ID
 *     tags: [ORG]
 *     parameters:
 *       - in: path
 *         name: customerID
 *         required: true
 *       - in: header
 *         name: token
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Generate customer Digital ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


///orgtransection/:OrganisationID


/**
 * @swagger
 * /organisation_transections:
 *   post:
 *     summary: Customer Transection Lists
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer Transection Lists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


//agentregister/6311a0de778efce58f2336db

/**
 * @swagger
 * /create_org_Agent:
 *   post:
 *     summary: Register Agent
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Register Agent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *             example:
 *               application/json: "{name:Virendra Shilpkar,email:123@gmail.com,phone:8508123125,country:India,address:Indore sapna sangeeta,city:indore,transectionLimit:15000$,Addsubagent:0,performPayOut:0,cancelTarnsection:0,approveTransection:0,createdigitalID:0,cashierapprove:0}"
 *       500:
 *         description: Some server error
 */


////getagent/638451d25f12c279fe18e2d1


/**
 * @swagger
 * /viewAgent:
 *   post:
 *     summary: Get Organization Agents
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Get Organization Agents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


//agentSusupend/639424307c6ea0abfc0e0320/638451d25f12c279fe18e2d1


/**
 * @swagger
 * /agentsuspend/{agentID}:
 *   put:
 *     summary: Suspend Agent
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *       - in: path
 *         name: agentID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Suspend Agent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */

///unSuspendagent


/**
 * @swagger
 * /Org_unSuspendagent/{agentID}:
 *   put:
 *     summary: Un-suspend Agent
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *       - in: path
 *         name: agentID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Un-suspend Agent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */

//agentPerformanceReport

/**
 * @swagger
 * /org_deleteAgent/{agentID}:
 *   delete:
 *     summary: Delete Agnet
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *       - in: path
 *         name: agentID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Delete agnet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


//deleteAgent/638455c05f12c279fe18e346/638451d25f12c279fe18e2d1

/**
 * @swagger
 * /Org_agentPerformanceReport/{agentID}:
 *   post:
 *     summary: Organization agnet performance report
 *     tags: [ORG]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *       - in: path
 *         name: agentID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Organization agnet performance report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


///cust/:token





///Cust_Loan_apply/:token


/**
 * @swagger
 * /Cust_Loan_apply/{token}:
 *   post:
 *     summary: Loan Applications
 *     tags: [ORG]
 *     parameters:
 *       - in: path
 *         name: token
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Loan Applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


///org_loan_accept/:LoanID

/**
 * @swagger
 * /org_loan_accept/{LoanID}:
 *   post:
 *     summary: Organization pass customer Loan
 *     tags: [ORG]
 *     parameters:
 *       - in: path
 *         name: LoanID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Organization pass customer Loan Sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */


///get_pass_Loans/:token


/**
 * @swagger
 * /get_pass_Loans/{token}:
 *   post:
 *     summary: Pass Loan Applications
 *     tags: [ORG]
 *     parameters:
 *       - in: path
 *         name: token
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Pass Loan Applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *          description: Some server error
 */


  ///get_Loan_installment/:LoanID


/**
 * @swagger
 * /get_Loan_installment/{LoanID}:
 *   post:
 *     summary: Organization pass customer Loan Installments
 *     tags: [ORG]
 *     parameters:
 *       - in: path
 *         name: LoanID
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Organization pass customer Loan Installments Sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */





//-----------------------------------------------------Agent-Swegger----------------------------------------------------------------------------- 





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
router.post("/custdetail/:custID", AcessKeys.AcessKeys, adminController.custdetail)
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
router.post("/addFeeSetup/:adminID", adminController.addFeeSetup)
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
router.post("/addOrgDocument/:orgID", adminController.addOrgDocument)
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
router.post("/cust_organisation/:custID", adminController.cust_organisation)
router.post("/chrome_pay_logs", adminController.chrome_pay_logs)
router.post("/Force_IP_Block", adminController.Force_IP_Block)
router.post("/dummy_image", adminController.dummy_image)
router.post("/getlast10sec", adminController.getlast10sec)
router.post("/get_all_loans", adminController.get_all_loans)
router.post("/Block_sub_admin/:sub_admin_ID", adminController.Block_sub_admin)
router.post("/Unblock_sub_admin/:sub_admin_ID", adminController.Unblock_sub_admin)
router.post("/admin_read_notification/:ID", adminController.admin_read_notification)
router.post("/get_admin_cust_data_graph", adminController.get_admin_cust_data_graph)

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
router.post("/getHistory", MatchIPc.findBlockIPs, Organisation.getLogHistory, apihis.apiHistory);
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
router.post("/createCustomerByOrg/:token", OrgAuth.auth, Organisation.createCustomerByOrg);



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
router.post("/Cust_Loan_apply/:token", OrgAuth.auth, Organisation.Cust_Loan_apply)
router.post("/org_cust_loan/:LoanID", Organisation.org_cust_loan)
router.post("/org_loan_accept/:LoanID", Organisation.org_loan_accept)
router.post("/get_pass_Loans/:token", OrgAuth.auth, Organisation.get_pass_Loans)
router.post("/get_Loan_installment/:LoanID", Organisation.get_Loan_installment)
router.post("/Cust_Linked_Srevice_Org/:token", OrgAuth.auth, Organisation.Cust_Linked_Srevice_Org)
router.post("/get_org_cust_data_graph/:token", OrgAuth.auth, Organisation.get_org_cust_data_graph)



//-------------------------API-HIASTORY-----------------------------------------------//

router.get("/getApi", apihis.getApiHistory, apihis.apiHistory);


//--------------------------BlockIPs------------------------------------------------//

router.post("/BlockIP/:adminID", adminController.CreateIPs);

//------------------------User-----------------------------------------------------//

// router.post("/user", userController.createUser, apihis.apiHistory)
// router.get("/getAllUser", MatchIPc.findBlockIPs, adminauth.auth, userController.getAllUser, apihis.apiHistory)
// router.post("/otpverify", userController.verifyOTP)


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
router.post("/Cust_Linked_Srevice_send_OTP", agentController.Cust_Linked_Srevice_send_OTP)
router.post("/Cust_Linked_Srevice", agentController.Cust_Linked_Srevice)
router.post("/get_next_month_emi/:LoanID", agentController.get_next_month_emi)
router.post("/get_agent_LogHistory", agentController.get_agent_LogHistory)
router.post("/test_face", agentController.test_face)
router.post("/dummy_face_main_api", agentController.dummy_face_main_api)
router.post("/Customer_Bank_view/:token", AgentAuth.auth, agentController.Customer_Bank_view)
router.post("/new_verify_customer", agentController.new_verify_customer)
router.post("/get_agent_cut_month/:token", AgentAuth.auth, agentController.get_agent_cut_month)
router.post("/Resend_otp/:phone", agentController.Resend_otp)
router.post("/createCustomerByAgnet_web/:agentID/:orgID", agentController.createCustomerByAgnet_web)
router.post("/createCustomerByOrg2", agentController.createCustomerByOrg2)
router.post("/agent_login_new", agentController.agent_login_new)



router.get("/hello", (req, res) => {
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

//--------------------------------------------wallet----------------------------------------------------------------------------------------------

router.post("/get_Cust_wallet/:custID", wallet_controller.get_Cust_wallet, apihis.apiHistory)
router.post("/Chrome_pay_transection/:custID", wallet_controller.Chrome_pay_transection, apihis.apiHistory)
router.post("/latest_transecitons/:custID", wallet_controller.latest_transecitons, apihis.apiHistory)
router.post("/Transection_detail/:transection_ID", wallet_controller.Transection_detail, apihis.apiHistory)

//---------------------------------------------Cust_Face_ditection---------------------------------------------------------------------------------

router.post("/cust_Face_ditect/:custID", Face_ditection.cust_Face_ditect)
router.post("/pre_cust_Face_ditect", Face_ditection.pre_cust_Face_ditect)
// router.post("/get_items", Face_ditection.get_items)

//-----------------------------------------------Customer-Controller-----------------------------------------------------------------------------

router.post("/customer_controller", customer_controller.cust_login)
router.post("/cust_opt_verify", customer_controller.cust_opt_verify)
router.post("/get_cust_org/:token", cust_auth.auth, customer_controller.get_cust_org)
router.post("/Calculate_credit_Score_customer/:token", cust_auth.auth, customer_controller.Calculate_credit_Score_customer)
router.post("/customer_dash/:token", cust_auth.auth, customer_controller.customer_dash)
router.post("/Fuse_wallet_transections/:token", cust_auth.auth, customer_controller.Fuse_wallet_transections)
router.post("/Fuse_wallet_dash/:token", cust_auth.auth, customer_controller.Fuse_wallet_dash)
router.post("/Chrome_pay_trans/:token", cust_auth.auth, customer_controller.Chrome_pay_trans)
router.post("/Chrome_pay_dash/:token", cust_auth.auth, customer_controller.Chrome_pay_dash)
router.post("/Chrome_pay_cust_transection/:token", cust_auth.auth, customer_controller.Chrome_pay_cust_transection)
router.post("/getOrgForLoan_cust/:token", cust_auth.auth, customer_controller.getOrgForLoan_cust)
router.post("/calculate_Amount_cust/:token", cust_auth.auth, customer_controller.calculate_Amount_cust)
router.post("/get_cust_logs/:custID", customer_controller.get_cust_logs)
router.post("/Pay_bills", customer_controller.Pay_bills)
router.post("/cust_Recaharge", customer_controller.cust_Recaharge)
router.post("/calculate_final_activities/:custID", customer_controller.calculate_final_activities)



//----------------------------------------org-third-party-api----------------------------------------------------------------------------

router.post("/createCustomerByOrganization", AcessKeys.AcessKeys, Third_party_Organization.createCustomerByOrganization)
router.post("/Organization_Customers", AcessKeys.AcessKeys, Third_party_Organization.Organization_Customers)
router.post("/OrgverifyCustomer", AcessKeys.AcessKeys, Third_party_Organization.OrgverifyCustomer)
router.post("/OrgcustomerVerify/:custID", AcessKeys.AcessKeys, Third_party_Organization.OrgcustomerVerify)
router.put("/OrgblockCustomer/:customerID", AcessKeys.AcessKeys, Third_party_Organization.OrgblockCustomer)
router.delete("/OrgDeleteCustomer/:customerID", AcessKeys.AcessKeys, Third_party_Organization.OrgDeleteCustomer)
router.get("/Org_custdetail/:customerID", AcessKeys.AcessKeys, Third_party_Organization.Org_custdetail)
router.put("/org_updateDigitalID/:customerID", AcessKeys.AcessKeys, Third_party_Organization.org_updateDigitalID)
router.post("/organisation_transections", AcessKeys.AcessKeys, Third_party_Organization.organisation_transections)
router.post("/create_org_Agent", AcessKeys.AcessKeys, Third_party_Organization.create_org_Agent)
router.post("/viewAgent", AcessKeys.AcessKeys, Third_party_Organization.viewAgent)
router.put("/agentsuspend/:agentID", AcessKeys.AcessKeys, Third_party_Organization.agentsuspend)
router.put("/Org_unSuspendagent/:agentID", AcessKeys.AcessKeys, Third_party_Organization.Org_unSuspendagent)
router.delete("/org_deleteAgent/:agentID", AcessKeys.AcessKeys, Third_party_Organization.org_deleteAgent)
router.post("/Org_agentPerformanceReport/:agentID", AcessKeys.AcessKeys, Third_party_Organization.Org_agentPerformanceReport)

module.exports = router