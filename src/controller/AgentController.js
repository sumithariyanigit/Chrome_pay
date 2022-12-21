const agentModel = require("../models/AgentModel")
const logHistory = require("../models/AgentLogHis")
const { findOne } = require("../models/Organisation");
const { findOneAndUpdate } = require("../models/userModel");
const { uploadFile } = require("../aws/aws.js");
const cutomerModel = require("../models/customer")
const multer = require('multer');
const axios = require('axios');
const AgentModel = require("../models/AgentModel");
const BlockIP = require("../models/blockedIPs")
const { response } = require("express");
const transectionModel = require("../models/transaction");
const adminModel = require("../models/AdminModel");
var ip = require('ip');
const temp_Cust = require("../models/temp_Cust");
const subAdmin = require("../models/AdminModel");
const Organisation = require("../models/Organisation")
const admin_Email_request = require("../models/adminEmail")
const agent_Commission = require("../models/agentCommission")
const agent_Commission_His = require("../models/AgentCommissinHistory")
const org_Licenses = require("../models/OrgLicenses")
var jwt = require('jsonwebtoken')
const customer_Loan_applay = require("../models/Loan_apllied_by")
const Org_Loans = require("../models/OrgLoans")
const Loan_intrests = require('../models/LoanIntrestRate')
const Loan_applay_customer = require("../models/Loan_apllied_by")
const LoanInsatallMent = require("../models/LoanInsatallMent");
var moment = require('moment');
const cust_Bank = require("../models/customerBank")
const bcrypt = require('bcrypt')
const redis = require('redis')
const { promisify } = require("util");
const cust_wallet = require("../models/Cust_Wallet")
const Agent_logs = require("../models/AgentLogHis")
const cust_wallet_Model = require("../models/Cust_Wallet")
const customer_logs = require("../models/Customer_logs")
const nodemailer = require('nodemailer')




//-------------------------
var FcaeModel = require("../models/CustFace")
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const fileUpload = require("express-fileupload");
faceapi.env.monkeyPatch({ Canvas, Image });


//-----------------------------------generate-Organisation-Password---------------------------------------------------------------------------------------

const characters1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString1(length) {
    let result = '';
    const charactersLength = characters1.length;
    for (let i = 0; i < length; i++) {
        result += characters1.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//---------------------------------create-Agent---------------------------------------------------------


const createAgent = async (req, res) => {
    try {
        let AgentCode = 10000000 + Math.floor(Math.random() * 90000000);


        const data = req.body;
        const orgID = req.params.orgID
        let findOrg = await Organisation.findOne({ _id: orgID })
        let AgentPass = generateString1(8)

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(AgentPass, saltRounds)



        let orgName = findOrg.name;

        const { name, email, phone, agentCode, country, address, city, postCode, transectionLimit, password, organisationID,
            Addsubagent, performPayOut, cancelTarnsection, approveTransection, createdigitalID, cashierapprove, commisionType, commissionAmount } = data

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter OrganisationID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Organisation ID" })
        }

        if (!name) {
            return res.status(200).send({ status: false, msg: "Please enter name" })
        }
        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })
        }
        let checkemail = await agentModel.findOne({ email: email })

        if (checkemail) {
            return res.status(200).send({ status: false, msg: "Email already register try Unique email" })
        }
        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phonne number" })
        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let chechphone = await agentModel.findOne({ phone: phone })
        if (chechphone) {
            return res.status(200).send({ status: false, msg: "Phone number already register please try unique number" })
        }

        if (!country) {
            return res.status(200).send({ status: false, msg: "Please enter country" })
        }
        if (!address) {
            return res.status(200).send({ status: false, msg: "Please enter address" })
        }
        if (!city) {
            return res.status(200).send({ status: false, msg: "Please enter city" })
        }
        if (!postCode) {
            return res.status(200).send({ status: false, msg: "Please enter postCode" })
        }
        if (!transectionLimit) {
            return res.status(200).send({ status: false, msg: "Please enter transectionLimit" })
        }

        let agentData = {

            name: name,
            email: email,
            password: encryptedPassword,
            phone: phone,
            agentCode: AgentCode,
            country: country,
            address: address,
            city: city,
            postCode: postCode,
            transectionLimit: transectionLimit,
            organisationID: orgID,
            agentBy: orgID,

            role: {
                Addsubagent: Addsubagent,
                performPayOut: performPayOut,
                cancelTarnsection: cancelTarnsection,
                approveTransection: approveTransection,
                createdigitalID: createdigitalID,
                cashierapprove: cashierapprove
            }
        }


        const nodemailer = require("nodemailer");


        const sentEmail = async (req, res) => {

            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',
                }
            });


            var mailOptions = {
                from: 'chrmepay123@gmail.com',
                to: 'sumit.hariyani2@gmail.com',
                subject: 'Agent Register',
                text: `Hello ${name}! congratulation now you are part of ${orgName} family, your username ${email} & your password ${AgentPass}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });
        }
        sentEmail();




        let create = await agentModel.create(agentData)

        let obj = {
            agentID: create._id,
            type: commisionType,
            Amount: commissionAmount,
            startDate: create.createdAt,
        }

        let createCommissiin = await agent_Commission.create(obj)

        return res.status(200).send({ status: true, msg: "Agent Register sucessfully", data: create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//-------------------------------Agent-Login-------------------------------------------------------------------------------------------//

const agentLogin = async (req, res) => {
    try {

        const data = req.body;

        const { username, password } = data



        if (!username) {
            return res.status(200).send({ status: false, msg: "Please enter email or phone number" })
        }



        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter pasword" })
        }

        let checkemail = await agentModel.findOne({ email: username })

        if (!checkemail) {
            let checkemail = await agentModel.findOne({ phone: username })

            if (!checkemail) {
                return res.status(200).send({ status: false, msg: "Please enter valid email or phone" })
            } else {
                const decryptedPassword = await bcrypt.compare(password, checkemail.password)
                if (!decryptedPassword) {
                    let UserIP = ip.address()
                    let AgentID = checkemail._id

                    let findLoginTime = Date.now();

                    let logData = {
                        email: email,
                        UserID: checkemail._id,
                        loginTime: findLoginTime,
                        IP: UserIP,
                        status: "Please enter valid password",
                    }
                    let admindata = await adminModel.findOne();
                    let currStatus = await agentModel.findOne({ email: email })
                    let wrongCount = currStatus.WrongPassword + 1;
                    let update = await agentModel.findOneAndUpdate({ email: email }, { WrongPassword: wrongCount })
                    let remainingchance = admindata.agentpasswordlimit - update.WrongPassword

                    if (update.WrongPassword >= admindata.agentpasswordlimit) {
                        let UserIP = ip.address()
                        let data = {
                            IP: UserIP
                        }
                        let blockIP = await BlockIP.create(data)
                        let update = await agentModel.findOneAndUpdate({ email: checkemail.email }, { WrongPassword: 0 })

                        setTimeout(async () => {
                            let UserIP = ip.address()
                            let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                        }, "10000")

                        return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

                    }

                    let MakeLogHIstory = await logHistory.create(logData);

                    return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
                }

                let agentID = checkemail._id;
                let name = checkemail.name
                let orgID = checkemail.organisationID

                let token = jwt.sign({ name, agentID, orgID, username, }, 'Agent')

                let setTooken = await agentModel.findOneAndUpdate({ email: checkemail.email }, { token: token })
                let UserIP = ip.address()
                let AgentID = checkemail._id;

                let findLoginTime = Date.now();

                let logData = {
                    email: checkemail.email,
                    UserID: checkemail._id,
                    loginTime: findLoginTime,
                    IP: UserIP,
                    status: "Login Sucessfull",

                }

                let MakeLogHIstory = await logHistory.create(logData);
                let update = await agentModel.findOneAndUpdate({ email: checkemail.email }, { WrongPassword: 0 })
                return res.status(200).send({ status: true, msg: "Login Sucessfull", token: token, ID: agentID, orgID: orgID })



            }
        }

        if (!checkemail) {
            return res.status(200).send({ status: false, msg: "Please enter valid email or phone" })
        }


        const decryptedPassword = await bcrypt.compare(password, checkemail.password)

        if (!decryptedPassword) {
            let UserIP = ip.address()
            let AgentID = checkemail._id

            let findLoginTime = Date.now();

            let logData = {
                email: email,
                UserID: checkemail._id,
                loginTime: findLoginTime,
                IP: UserIP,
                status: "Please enter valid password",

            }

            let admindata = await adminModel.findOne();
            let currStatus = await agentModel.findOne({ email: checkemail.email })
            let wrongCount = currStatus.WrongPassword + 1;
            let update = await agentModel.findOneAndUpdate({ email: checkemail.email }, { WrongPassword: wrongCount })
            let remainingchance = admindata.agentpasswordlimit - update.WrongPassword

            if (update.WrongPassword >= admindata.agentpasswordlimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await agentModel.findOneAndUpdate({ email: checkemail.email }, { WrongPassword: 0 })

                setTimeout(async () => {
                    let UserIP = ip.address()
                    let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                }, "10000")

                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

            }






            let MakeLogHIstory = await logHistory.create(logData);

            return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
        }

        let agentID = checkemail._id;
        let name = checkemail.name
        let orgID = checkemail.organisationID

        let token = jwt.sign({ name, agentID, orgID, username, }, 'Agent')

        let setTooken = await agentModel.findOneAndUpdate({ email: checkemail.email }, { token: token })
        let UserIP = ip.address()
        let AgentID = checkemail._id;

        let findLoginTime = Date.now();

        let logData = {
            email: checkemail.email,
            UserID: checkemail._id,
            loginTime: findLoginTime,
            IP: UserIP,
            status: "Login Sucessfull",

        }

        let MakeLogHIstory = await logHistory.create(logData);
        let update = await agentModel.findOneAndUpdate({ email: checkemail.email }, { WrongPassword: 0 })
        return res.status(200).send({ status: true, msg: "Login Sucessfull", token: token, ID: agentID, orgID: orgID })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//--------------------------------------------update-agent----------------------------------------------------------------------------------

const updateAgent = async (req, res) => {
    try {

        const data = req.body;

        const { name, email, phone, agentCode, country, address, city, postCode, transectionLimit, password, organisationID,
            Addsubagent, performPayOut, cancelTarnsection, approveTransection, createdigitalID, cashierapprove } = data

        const agentID = req.body.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }

        let updateData = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            country: country,
            address: address,
            city: city,
            postCode: postCode,
            transectionLimit: transectionLimit,

            role: {
                Addsubagent: Addsubagent,
                performPayOut: performPayOut,
                cancelTarnsection: cancelTarnsection,
                approveTransection: approveTransection,
                createdigitalID: createdigitalID,
                cashierapprove: cashierapprove
            }
        }

        let update = await agentModel.findOneAndUpdate({ _id: agentID }, updateData)

        return res.status(200).send({ status: true, msg: "Data Update Sucessfully" })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//------------------------------------------------Agent-forgot-password-----------------------------------------------------------------------

const forgotpassword = async (req, res) => {
    try {

        const email = req.body.email;


        let cheackEmail = await agentModel.findOne({ email: email })

        if (!cheackEmail) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }
        let otp = 100000 + Math.floor(Math.random() * 900000);
        const nodemailer = require("nodemailer");


        const sentEmail = async (req, res) => {


            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',

                }
            });


            var mailOptions = {
                from: 'chrmepay123@gmail.com',
                to: 'sumit.hariyani2@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'your OTP for change password is " ' + otp + ' " do not share this otp'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });



        }
        sentEmail();


        let updateOTP = await agentModel.findOneAndUpdate({ email: email }, { otp: otp })

        if (!updateOTP) {
            return res.status(200).send({ status: false, msg: "Agent not Found" })
        }

        return res.status(200).send({ status: true, msg: "Otp send Sucessfully" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//------------------------------------------------------verify-otp-----------------------------------------------------------------------------

const ForgetPassVerifyOtp = async (req, res) => {
    try {

        const otp = req.body.otp;
        const email = req.body.email

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp, which you getting through your email" })
        }

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })

        }

        let checkOTP = await agentModel.findOne({ email: email })

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        return res.status(200).send({ status: true, msg: "Password Verified Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-----------------------------------------------Delete-agent--------------------------------------------------------------------------------------

const deleteagent = async (req, res) => {
    try {

        const agentID = req.body.agentID;
        const OrganisationID = req.body.OrganisationID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter OrganisationID" })
        }

        if (OrganisationID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid OrganisationID" })
        }

        let matchID = await AgentModel.findOne({ organisationID: OrganisationID })

        if (!matchID) {
            return res.status(400).send({ status: false, msg: "You are not authorized" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }

        let update = await agentModel.findOneAndUpdate({ _id: agentID }, { isDeleted: 1 })

        return res.status(200).send({ status: true, msg: "Agent Delete Sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------Agent-customer-list-----------------------------------------------------------------------------------


const agentCustomerList = async (req, res) => {

    try {

        const adminID = req.params.adminID;

        let countpages = await cutomerModel.find({ createdBY: adminID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length
        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }
        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 2) {
            let countpages1 = await cutomerModel.find({ createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {



            let option = [{
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]



            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })

            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }

        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.ID.length > 2) {


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }
        else {

            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, createdBY: adminID, status: "verified", isDeleted: 0, })
            let contRow3 = countpages3.length



            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


//------------------------------------------Agent-Suspend-customer-------------------------------------------------------------------------



const SusPendCostomer = async (req, res) => {
    try {

        const userID = req.params.userID;
        const agentID = req.params.agentID;

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agent id" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })
        }

        let checkUser = await cutomerModel.findOne({ id_: userID, createdBY: agentID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }

        if (checkUser.createdBY != agentID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person, to suspend this coustomer" })
        }


        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }

        if (checkUser.createdBY == agentID) {
            let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 1, suspendBy: agentID }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Block Sucessfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//--------------------------un-Blocked-Customer---------------------------------------------------------------------------------------------

const unSuspengCustomer = async (req, res) => {
    try {

        const userID = req.params.userID;
        const agentID = req.params.agentID;

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let checkUser = await cutomerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }



        if (checkUser.createdBY != agentID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person to un-suspend this coustomer" })
        }


        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Customer Already Unbolcked" })
        }

        if (checkUser.createdBY == agentID) {
            let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 0 }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Unblock Sucessfully" })
        }



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//------------------------------Delete-customer-by-agent-------------------------------------------------------------------------------------------

const deleteCustomer = async (req, res) => {
    try {

        const userID = req.params.userID;
        const agentID = req.userId


        if (!userID) {
            return res.status(200).send({ status: false, msg: " Id is required" })
        }

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }



        let findCUstomer = await cutomerModel.findOne({ _id: userID })
        if (!findCUstomer) {
            return res.status(200).send({ status: false, msg: "Customer not found" })
        }


        if (findCUstomer.createdBY == agentID) {
            let update = await cutomerModel.findOneAndUpdate({ _id: userID }, { isDeleted: 1, DeletedBy: agentID }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//---------------------------------------------Agent-transection-list------------------------------------------------------------------------------

const agenttransectionfillter = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        if (Object.keys(req.body).length <= 1) {
            let findCustomer = await cutomerModel.find({ createdBY: agentID })


            result = []
            for (item of findCustomer) {

                var countpages1 = await transectionModel.find({ senderID: item._id }).sort({ createdAt: -1 })

                var totalRaow1 = countpages1.length;
                let filter = await transectionModel.find({ senderID: item._id })

                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();


                for (ele of filter) {
                    result.push(ele)
                }


            }


            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), result })




        } else if (req.body.fromDate) {

            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {

                let option = [
                    // { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName },
                    {
                        createdAt: {
                            $gte: new Date(req.body.fromDate).toISOString().substring(0, 10).replace('T', ' '),
                            $lte: new Date(req.body.toDate).toISOString().substring(0, 10).replace('T', ' '),
                        }
                    }
                    //, {
                    //     sendingAmount: {
                    //         $gte: req.body.fromAmount,
                    //         $lte: req.body.toAmount
                    //     }
                    // }
                ]




                let countpages2 = await transectionModel.find({ $or: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $or: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                if (filter.length >= 1) {
                    result.push(filter)
                }

                for (ele of filter) {
                    result.push(ele)
                }

                //return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })

        }



        else if (req.body.fromAmount && req.body.senderName) {

            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {
                let option = [{ senderName: req.body.senderName }, {
                    sendingAmount: {
                        $gte: req.body.fromAmount,
                        $lte: req.body.toAmount
                    }
                }]




                var countpages2 = await transectionModel.find({ $and: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $and: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                //return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

                for (ele of filter) {
                    result.push(ele)
                }
            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })

        }



        else if (req.body.fromAmount && req.body.beneficiaryName) {

            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {
                let option = [{ beneficiaryName: req.body.beneficiaryName }, {
                    sendingAmount: {
                        $gte: req.body.fromAmount,
                        $lte: req.body.toAmount
                    }
                }]




                var countpages2 = await transectionModel.find({ $and: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $and: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                // return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

                for (ele of filter) {
                    result.push(ele)
                }
            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })

        }


        else if (req.body.senderName && req.body.beneficiaryName) {

            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {
                let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },
                    // {
                    //     sendingAmount: {
                    //         $gte: req.body.fromAmount,
                    //         $lte: req.body.toAmount
                    //     }
                    // }
                ]




                var countpages2 = await transectionModel.find({ $and: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $and: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                // return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

                for (ele of filter) {
                    result.push(ele)
                }
            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })

        }

        else if (req.body.fromAmount && req.body.senderName) {

            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {
                let option = [{ senderName: req.body.senderName }, {
                    sendingAmount: {
                        $gte: req.body.fromAmount,
                        $lte: req.body.toAmount
                    }
                }]




                var countpages2 = await transectionModel.find({ $and: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $and: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                // return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

                for (ele of filter) {
                    result.push(ele)
                }
            }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })
        }

        else if (req.body.senderName && req.body.beneficiaryName && req.body.fromAmount && req.body.toAmount) {


            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {
                let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },
                {
                    sendingAmount: {
                        $gte: req.body.fromAmount,
                        $lte: req.body.toAmount
                    }
                }
                ]




                var countpages2 = await transectionModel.find({ $and: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $and: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                // return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
                for (ele of filter) {
                    result.push(ele)
                }
            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })

        }



        else {

            let findCustomer = await cutomerModel.find({ createdBY: agentID })
            result = []
            for (item of findCustomer) {

                let option = [{
                    sendingAmount: {
                        $gte: req.body.fromAmount,
                        $lte: req.body.toAmount
                    }
                }, { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName }]




                var countpages2 = await transectionModel.find({ $or: option, senderID: item._id })
                var contRow = countpages2.length
                let filter = await transectionModel.find({ $or: option, senderID: item._id }).sort({ transactionDate: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                var totlaRow = filter.length;
                // return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
                for (ele of filter) {
                    result.push(ele)
                }
            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), result })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------organisation-change-password------------------------------------------------------------------------------------------

const agentchangePassword = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const oldPaasword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "agentID not getting" })
        }

        if (!oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter oldPassword" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new password" })
        }

        if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
            return res.status(200).send({ status: false, msg: "Please111 enter valid password, password at least one number and one special caharacter" })
        }


        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: " Your confirm password is not match" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let findadmin = await agentModel.findOne({ _id: agentID })
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(confirmPassword, saltRounds)

        const decryptedPassword = await bcrypt.compare(oldPaasword, findadmin.password)


        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "organisation not found" })
        }


        if (!decryptedPassword) {
            return res.status(200).send({ status: false, msg: "Please enter valid old password" })
        }

        let findadmin1 = await agentModel.findOneAndUpdate({ _id: agentID }, { password: encryptedPassword })

        return res.status(200).send({ status: true, msg: "Password Change Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-----------------------------Agent-Profile------------------------------------------------------------------------------------------

const agentProfile = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let filter = await agentModel.findOne({ _id: agentID }).select({
            name: 2, email: 1, _id: 1, password: 1, country: 1,
            phone: 1, address: 1, city: 1, postCode: 1, transectionLimit: 1
        })

        if (!filter) {
            return res.status(200).send({ status: false, msg: "agent not found" })
        }

        return res.status(200).send({ status: true, filter })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------agent-profile-update------------------------------------------------------------------------------

const agentProfileUpdate = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        const data = req.body;
        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }
        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }
        const { name, email, phone, agentCode, country, address, city, postCode, password, transectionLimit, organisationID } = data

        final = {
            name: name,
            email: email,
            phone: phone,
            agentCode: agentCode,
            country: country,
            address: address,
            city: city,
            postCode: postCode,
            password: password,
            transectionLimit: transectionLimit,
            organisationID: organisationID
        }

        let upadte = await agentModel.findOneAndUpdate({ _id: agentID }, final, { new: true })

        if (!upadte) {
            return res.status(200).send({ status: false, msg: "agent not found" })
        }

        return res.status(200).send({ status: true, msg: "Profile Updated sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({})
    }
}


//----------------------------------transection-limit-update--------------------------------------------------------------------------------

const updateTransectionLimit = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        if (agentID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let agent = await agentModel.findOne({ _id: agentID })
        let admin = await adminModel.findOne()
        let adminEmail = admin.email;
        let name = agent.name

        const nodemailer = require("nodemailer");
        const sentEmail = async (req, res) => {


            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',

                }
            });


            var mailOptions = {
                from: 'chrmepay123@gmail.com',
                to: 'sumit.hariyani2@gmail.com',
                subject: 'for update transection limit',
                text: `Hello! i am agent ${agent.name} of chromepay i want to update my Transection Limit
                    my ID = ${agent._id}`
                // text : otp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });
        }

        sentEmail();


        let obj = {
            By: "Agent",
            messege: `Hello! i am agent ${agent.name} of chromepay i want to update my Transection Limit
            my ID = ${agent._id}`,
            receivedBy: `${agent.name} Agent`,
            subject: `Request for update licenses`,
            code: agent._id
        }

        let createRequest = await admin_Email_request.create(obj)

        return res.status(200).send({ status: true, msg: "your request is register for update transection limit " })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//-----------------------------------verify-otp-and-register-customer-with-digitalID-----------------------------------------------------------------------------

let verifyCustomeragent = async (req, res) => {
    try {

        const otp = req.body.OTP


        const phoneNo1 = req.body.phoneNo
        const phoneNo = `+91${phoneNo1}`




        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp" })
        }

        if (!phoneNo) {
            return res.status(200).send({ status: false, msg: "Please enter phoneNo" })
        }



        var result = [];

        // async function doPostRequest() {

        let payload = {
            code: otp,
            phoneNumber: phoneNo
        }




        let res1 = axios.post('http://13.127.64.68:7008/api/mainnet/generate-digitalid', {
            code: otp,
            phoneNumber: phoneNo
        })
            .then(async respons => {


                let data1 = respons.data




                let findCust = await temp_Cust.findOne({ phone: phoneNo1 })


                let newCust = {
                    IDphoto: findCust.IDphoto, fullname: findCust.fullname,
                    dateOfBirth: findCust.dateOfBirth, phone: findCust.phone, city: findCust.city, age: findCust.age,
                    email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: data1.hash,
                    owner: data1.response.owner, privateKey: data1.response.privateKey, walletAddress: data1.response.walletAddress,
                    professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
                    createdBY: findCust.createdBY, Longitude: findCust.Longitude, Latitude: findCust.Latitude
                }


                let create = await cutomerModel.create(newCust)



                let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

                let totalLicenses = OrganisationList.totalLicenses

                let findreaminig = await customerModel.find({ organisation: findCust.organisation })

                let calculateRemainig = totalLicenses - findreaminig.length;

                let Remainig = calculateRemainig

                let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig })


                return res.status(200).send({ status: true, msg: "customer register sucessfully", create })
            })
            .catch(error => {

                return res.status(200).send({ status: false, msg: "failed please try again" })
            });


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//-------------------------------------agent-dashBoard---------------------------------------------------------------------------------------

const agentDash = async (req, res) => {

    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        let findagent = await agentModel.findOne({ _id: agentID })

        let image = findagent.image
        let agentName = findagent.name;
        let email = findagent.email
        let mobile = findagent.phone
        let country = findagent.country

        //======================================total=transection====

        let findAgentUsers = await cutomerModel.find({ createdBY: agentID })

        let data = []
        for (let i of findAgentUsers) {
            data.push(i._id)
        }


        let findtrans = await transectionModel.find({ senderID: data })

        let totalTransection = 0
        for (let i of findtrans) {
            totalTransection += i.sendingAmount
        }



        //------------


        let data1 = []
        for (let i of findAgentUsers) {
            data1.push(i._id)
        }

        let findtrans1 = await transectionModel.find({ recieverID: data1 })

        let receive = 0
        for (let i of findtrans1) {
            receive += i.sendingAmount
        }

        let totalAmount = totalTransection + receive



        let NumberOFUser = findAgentUsers.length

        //====================================================================================================

        return res.status(200).send({ status: true, NumberOFUser: NumberOFUser, image: image, agentName: agentName, email: email, country: country, mobile: mobile, totalTransection: totalAmount })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------recent-User----------------------------------------------------------------------------------------
const recentUser = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        let findAgentUsers = await cutomerModel.find({ createdBY: agentID })

        let totalUser = findAgentUsers.length

        let final = findAgentUsers.slice(Math.max(findAgentUsers.length - 3, 0))

        return res.status(200).send({ status: true, totalUser: totalUser, final })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//------------------------------------agent-recent-transection--------------------------------------------------------------------------

const recentAgentTransection = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        let findAgentUsers = await cutomerModel.find({ createdBY: agentID })


        let data1 = []
        for (let i of findAgentUsers) {

            data1.push(i._id)
        }



        let final11 = await transectionModel.find({ recieverID: data1 })

        let totalTransection = final11.length

        let final = final11.slice(0, 3)

        return res.status(200).send({ status: true, totalTransection: totalTransection, final })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

const createCustomerByOrg1 = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        console.log("456")
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.params.agentID;
        let orgID = req.params.orgID;

        if (files.length == 0) {
            return res.status(200).send({ status: false, msg: "Please enter ID photo" })

        }


        if (ID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
        }


        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone } = data




        let findcust = await cutomerModel.find({ createdBY: orgID })
        let findOrg = await Organisation.findOne({ _id: orgID })


        if (findOrg.totlaLicense <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You organization not have enough licenses to add DID, Please contact admin to update yout licenses" })

        }


        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }


        if (phone.length < 5) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone" })

        }


        let checkPhone = await cutomerModel.findOne({ phone: data.phone })



        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }


        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }

        const profilePicture = await uploadFile(files[0])





        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()

        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: phone, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: orgID,
            status: status, createdBY: ID, createdBY: ID,
            nextFOKinName: nextFOKinName,
            nextFOKniPhone: nextFOKniPhone,
            digitalrefID: seq,

        }
        let latestCommission = await agent_Commission.find({ agentID: ID })
        let agent_Cmisn = latestCommission.slice(-1)[0]
        let create = await temp_Cust.create(collection)

        if (!agent_Cmisn) {
            return res.status(200).send({ status: false, msg: "Agent commisiion is missing" })
        }


        if (agent_Cmisn.type == 'Percentage') {

            let amount = agent_Cmisn.Amount

            let perAmount = (amount / 100 * 5000)

            let obj = {
                custPhoto: create.IDphoto,
                agentName: agent_Cmisn.agentID.name,
                agentID: agent_Cmisn.agentID,
                custID: create._id,
                custName: create.fullname,
                commissionID: agent_Cmisn._id,
                commission: perAmount

            }

            let createcomsn = await agent_Commission_His.create(obj)
        } else if (agent_Cmisn.type == 'Flat Money') {

            let amount = agent_Cmisn.Amount


            let obj = {
                custPhoto: create.IDphoto,
                agentName: agent_Cmisn.agentID.name,
                agentID: agent_Cmisn.agentID,
                custID: create._id,
                custName: create.fullname,
                commission: amount
            }

            let createcomsn = await agent_Commission_His.create(obj)

        }

        return res.status(201).send({ status: true, msg: "", data: create, })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

//-----------------------------------------agent-commission-list----------------------------------------------------------------------------------

const commissionlist = async (req, res) => {
    try {

        const agentID = req.userId;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (agentID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        //---------------------pagination----------------------------------
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }
        const { page = pageNO, limit = 10 } = req.query;

        //-----------------------------------------------------------------

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await agent_Commission_His.find({ agentID: agentID }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;

            let filter = await agent_Commission_His.find({ agentID: agentID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.fromDate) {

            let toDate = new Date(req.body.toDate).toISOString()
            let new_per = new Date()
            new_per.setDate(new_per.getDate() + 1);


            let date_num = Number(toDate)
            console.log("check permisioin", new_per)

            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new_per.toISOString() 
                    }
                }

            ]

            let countpages2 = await agent_Commission_His.find({ agentID: agentID, $or: option })
            let contRow = countpages2.length
            let filter = await agent_Commission_His.find({ agentID: agentID, $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-----------------------------agent-awaiting-customers--------------------------------------------------------------------------------------

const AgentAwaiting = async (req, res) => {
    try {

        const agentID = req.userId
        const CustomerName = req.body.customerName;
        const status = req.body.Status

        console.log("agentID", agentID)


        let countpages = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 2) {
            let countpages1 = await cutomerModel.find({ createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {



            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }, {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }

        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        } else if (req.body.ID.length > 2) {


            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }
        else {

            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, createdBY: agentID, status: 'pending' })
            let contRow3 = countpages3.length

            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();


            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-------------------------------------------Agent-Performane-reports---------------------------------------------------------------------------

const agentPerformanceReport = async (req, res) => {
    try {

        const agentID = req.params.agentID
        // console.log("==>", agentID)

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter " })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid ID" })
        }


        const LastMonthData = await cutomerModel.aggregate([
            {
                $match: {
                    createdBY: agentID,
                    $expr: {
                        $and: [
                            {
                                "$eq": [
                                    {
                                        $month: "$createdAt"
                                    },
                                    {
                                        $month: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$eq": [
                                    {
                                        $year: "$createdAt"
                                    },
                                    {
                                        $year: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ])



        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const Current_Month = await cutomerModel.find({
            $and: [

                {
                    createdAt: {
                        $gte: startOfCurrentMonth,
                        $lt: startOfNextMonth
                    },
                    createdBY: agentID
                },
            ],
        }).count();



        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()


        if (perDayLastMonth > perDayCurrMonth) {


            let positive1 = `-${perDayLastMonth - perDayCurrMonth}`
            let positive = parseFloat(positive1)
            let nextMonthTarget = positive1 * 30
            let nexttarget1 = nextMonthTarget + Last_Month
            let nexttarget = Math.ceil(nexttarget1)
            if (nexttarget <= 0) {
                nexttarget = 100
            }


            return res.status(200).send({ status: true, positive, nexttarget, Current_Month, Last_Month, Today_date })

        } else {
            let positive = perDayCurrMonth - perDayLastMonth
            let nextMonthTarget = positive * 30
            let nexttarget1 = nextMonthTarget + Last_Month
            let nexttarget = Math.ceil(nexttarget1)
            return res.status(200).send({ status: true, positive, nexttarget, Current_Month, Last_Month, Today_date })
        }


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//------------------------------------------agent-blocked-customers----------------------------------------------------------------------------

const agent_blocked = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter " })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid ID" })
        }
        let findCust = await cutomerModel.find({ createdBY: agentID, blocked: 1 })

        return res.status(200).send({ status: true, findCust })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


//----------------------------------------------customer-verify------------------------------------------------------------------

const customerVerifyByAgent = async (req, res) => {
    try {

        //const agentID = req.userId
        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        let findcust = await cutomerModel.findOneAndUpdate({ _id: custID }, { status: "verified" })

        if (findcust) {
            return res.status(200).send({ status: true, msg: "customer verified sucessfully" })
        }



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------Customer-Loan-applay-----------------------------------------------------------------------------------

const Customer_Loan_app = async (req, res) => {
    try {

        const custID = req.params.custID;
        const data = req.body

        const { OrganisationID, CustomerID, Loan_type, Loan_documents, Loan_status, Interest_Rate } = data

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        if (!OrganisationID) {

            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        let obj = {
            OrganisationID: OrganisationID,
            CustomerID: custID,
            Loan_type: Loan_type,
            Loan_documents: Loan_documents,
            Loan_status: Loan_status,
            Interest_Rate: Interest_Rate
        }



        let Applay_Loan = await customer_Loan_applay.create(obj)

        return res.status(200).send({ status: true, msg: Applay_Loan })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//--------------------------------get-organisations--------------------------------------------------------------------------------------------

const getOrgForLoan = async (req, res) => {
    try {

        let custID = req.params.custID



        let find = await cutomerModel.findOne({ _id: custID })

        let organisations = find.organisation



        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter Customer ID" })
        }


        let result = []
        for (let i of organisations) {
            let findOrg = await Organisation.find({ _id: i })
            result.push(findOrg)

        }

        let final = []
        for (let i of result) {
            for (let j of i) {
                final.push(j)
            }
        }


        let findOrg = await Organisation.find({ isDeleted: 0, blocked: 0 })
        return res.status(200).send({ status: true, final })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//---------------------------------------get-loans-of-orgs-------------------------------------------------------------------------------------

const getOrgLoans = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter org ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid org ID" })
        }

        let findOrg = await Org_Loans.findOne({ OrganisationID: orgID })

        let roles = findOrg.TypeOfLoans
        let values = Object.keys(roles)
        return res.status(200).send({ staus: true, values })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//---------------------------------------------get-interset-of-org-loan--------------------------------------------------------------------------

const getInterestOFLoan = async (req, res) => {
    try {

        const orgID = req.params.orgID
        var LoanType = req.body.LoanType


        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter org ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid org ID" })
        }

        let find = await Loan_intrests.findOne({ OrganisationID: orgID }, { LoanType: 1 })


        Loan_intrests.findOne({ OrganisationID: orgID }, { [LoanType]: 1 }, function (err, item) {

            return res.status(200).send({ status: true, msg: "Loan Rates", item })
        });


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------------get-loan-documents-------------------------------------------------------------------------------

const get_document = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        let findDocuments = await cutomerModel.findOne({ _id: custID }).select({ residance: 1, locaDocument: 1, landRegistration: 1 })

        if (findDocuments.residance.length < 2 || findDocuments.locaDocument.length < 2 || findDocuments.locaDocument.length < 2 || findDocuments.landRegistration.length < 2) {
            return res.status(200).send({ status: true, DOC: false, findDocuments })
        }

        return res.status(200).send({ status: true, DOC: true, findDocuments })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------add_Loan_otp_send-----------------------------------------------------------------------------

const send_Loan_Otp = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.statsu(200).send({ status: 200, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.statsu(200).send({ statsu: false, msg: "please enter valid customer ID" })
        }

        let findPhone = await cutomerModel.findOne({ _id: custID })

        let Phone = findPhone.phone



        let OTP = 100000 + Math.floor(Math.random() * 900000);


        const send_mobile_otp = async (req, res) => {

            let mobile = Phone;
            let otp = OTP;


            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {

                    return response;
                });
            } catch (error) {
                console.log(error);

            }
        }

        send_mobile_otp();

        let update_OTP = await cutomerModel.findOneAndUpdate({ _id: custID }, { Loan_OTP: "123456" })



        return res.status(200).send({ statsu: true, msg: "OTP sned sucessfully" })



    } catch (error) {
        console.log(error)
        return res.statsu(200).send({ status: false, msg: error.messege })
    }
}
//--------------------------------------------calculate-amounts--------------------------------------------------------------------------------

const calculate_Amount = async (req, res) => {
    try {



        let = req.userId

        const Interest1 = req.body.Interest;
        const Amount1 = req.body.Amount
        const Emi_Months1 = req.body.Emi_Months
        const orgID = req.body.orgID
        const custID = req.body.custID
        const Loan_type = req.body.Loan_type
        const recidence = req.body.recidence
        const LocalGov = req.body.LocalGov
        const LandRegistration = req.body.LandRegistration
        const OTP = req.body.otp




        let Amount = parseInt(Amount1)
        let Emi_Months = parseInt(Emi_Months1)
        let Interest = parseInt(Interest1)

        let find_OTP = await cutomerModel.findOne({ _id: custID })


        if (find_OTP.Loan_OTP != OTP) {
            return res.status(200).send({ status: false, msg: "Please enter Valid OTP" })
        }


        if (!Interest) {
            return res.status(200).send({ status: false, msg: "Please enter Interest" })
        }

        if (!Amount) {
            return res.status(200).send({ status: false, msg: "Please enter Amount" })
        }

        if (!Emi_Months) {
            return res.status(200).send({ staus: false, msg: "Please enter Emi Length" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter org ID" })
        }

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter cust ID" })
        }

        if (!Loan_type) {
            return res.status(200).send({ staus: false, msg: "Please enter Emi Loan_type" })
        }


        let Calculate = Interest / 100 * Amount
        let year = Emi_Months / 12
        let totalAmount = Calculate * year
        let Finalamount = Amount + Calculate
        let EmiPerMonth = (Finalamount / Emi_Months).toFixed(2);
        let Num_Emi = Number(EmiPerMonth)



        let obj = {

            OrganisationID: orgID,
            CustomerID: custID,
            agentID: agentID,
            Loan_type: Loan_type,
            recidence: recidence,
            LocalGov: LocalGov,
            LandRegistration: LandRegistration,
            Interest_Rate: Interest,
            EMI: Num_Emi,
            Total_Amount: Finalamount,
            Duration_Month: Emi_Months,
            Duration_Year: year,
            Interest_percentege: Interest,
            Intrest_Amount_per_Year: Calculate,
            Total_Interest_Amount: totalAmount,

        }


        let create = await Loan_applay_customer.create(obj)


        return res.status(200).send({
            status: true, msg: "Loan apply successfully", obj, EMI: Num_Emi, Total_Amount: Finalamount, Duration_Month: Emi_Months, Duration_Year: year,
            Interest_percentege: Interest, Intrest_Amount_per_Year: Calculate, Total_Interest_Amount: totalAmount
        })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------------get-Agent-Agent--------------------------------------------------------------------------------------

const Cust_apply_Agent_Loans = async (req, res) => {
    try {

        const agentID = req.userId



        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter custID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;



        let find_Loans1 = await Loan_applay_customer.find({ agentID: agentID })



        let totalRaow1 = find_Loans1.length


        let find_Loans = await Loan_applay_customer.find({ agentID: agentID, Loan_status: "PENDING" })
            .populate('CustomerID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })
            .populate('OrganisationID', { 'name': 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), find_Loans })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------get-cust_applied_Loans----------------------------------------------------------------------------------------


const Cust_Loan_apply_agent = async (req, res) => {
    try {

        const custID = req.params.custID

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID" })
        }


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let find_Loans1 = await Loan_applay_customer.find()

        let totalRaow1 = find_Loans1.length

        let find_Loans = await Loan_applay_customer.find({ CustomerID: custID })
            .populate('CustomerID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })
            .populate('OrganisationID', { 'name': 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), find_Loans })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//----------------------------------Agent-Pass-Loan-List----------------------------------------------------------------------------------------

const get_Agent_pass_Loans = async (req, res) => {
    try {

        const agentID = req.userId

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        let find = await Loan_applay_customer.find({ agentID: agentID, Loan_status: "PASS" })
            .populate('CustomerID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })
            .populate('OrganisationID', { 'name': 1 })

        return res.status(200).send({ status: true, find })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------------pay-cust-EMi----------------------------------------------------------------------------

const pay_cust_emi = async (req, res) => {
    try {

        const LoanID = req.params.LoanID;
        const Amount1 = req.body.Amount
        const Amount = Number(Amount1)

        if (!LoanID) {
            return res.status(200).send({ status: false, msg: "Please enter Loan ID" })
        }

        if (LoanID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Loan ID" })
        }

        if (!Amount) {
            return res.status(200).send({ status: false, msg: "Please enter Amount" })
        }

        let find_Installment = await LoanInsatallMent.findOne({ Loan_ID: LoanID })



        if (find_Installment.Installment_Amount !== Amount) {
            return res.status(200).send({ status: false, msg: `Your Installment Amount is ${find_Installment.Installment_Amount} please pay valid amount` })
        }

        let test = find_Installment.Installments_History.length

        if (test == 0) {
            test = 1
        }

        let data =
        {
            Installment_No: test + 1,
            Installment_Pay_Amount: Amount,
            Pay_Date: new Date(),
            Installment_Date: find_Installment.Installment_Pay_Date,
            status: "Paid"

        }

        let push_data = await LoanInsatallMent.findOneAndUpdate({ Loan_ID: LoanID }, { $push: { "Installments_History": data } }, { new: true })
        return res.status(200).send({ status: true, msg: "Installment add succesfully", push_data })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })

    }
}

//-------------------------------------------------credit-score--------------------------------------------------------------------------------

const Calculate_credit_Score = async (req, res) => {
    try {

        const custID = req.params.custID

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }

        //--------------------------------calculate_latest_Transection_10%----------------------------------------------------------------------

        let today_Date = new Date()
        let date_form = moment(today_Date).format('YYYY/MM/DD')
        let Curr_month = today_Date.getMonth() + 1;
        let Curr_year = today_Date.getFullYear();
        let Curr_day = today_Date.getDate();
        let last_day = Curr_day + 1
        let last_Month = Curr_month - 3
        let last_Year = Curr_year

        if (Curr_month == 1 || Curr_month == 2) {
            Curr_year = Curr_year - 1

        }

        let option = [{
            createdAt: {
                $gte: new Date(`${Curr_year}-${last_Month}-${Curr_day}`).toISOString(),
                $lte: new Date(`${Curr_year}-${Curr_month}-${last_day}`).toISOString()
            }
        }]

        let findsendingAmount = await transectionModel.find({ $or: option, senderID: custID })
        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await transectionModel.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }

        let final = sendindAmount + receiveAmount

        let creditScore = 0
        if (final > 4000 && final <= 8000) {
            creditScore = 30
        } else if (final > 2000 && final <= 4000) {
            creditScore = 20
        }
        else if (final > 8000 && final <= 10000) {
            creditScore = 40
        } else if (final > 10000 && final <= 15000) {
            creditScore = 55
        } else if (final > 15000) {
            creditScore = 60
        }

        //----------------------------------Types-of-accounts---------------------------------------------------------------------------------

        let findBanks = await cust_Bank.find({ customerID: custID }).distinct("Accounttype")

        let Account_Credit = 0
        if (findBanks.length == 1) {
            Account_Credit = 30
        } else if (findBanks.length == 2) {
            Account_Credit = 45
        } else if (findBanks.length == 3) {
            Account_Credit = 55
        } else if (findBanks.length > 4) {
            Account_Credit = 60
        }

        //---------------------------------Credit-Scoring-Length--------------------------------------------------------------------------


        let find_Transections = await transectionModel.find({ senderID: custID })

        let current_Transection = find_Transections.pop()
        let very_first_transection = find_Transections[0]

        let current_Transection_Date = current_Transection.createdAt;
        let very_first_transection_Date = very_first_transection.createdAt;

        let current_Month = current_Transection_Date.getMonth() + 1
        let current_Year = current_Transection_Date.getFullYear()
        let current_Day = current_Transection_Date.getDate()

        let very_first_Month = very_first_transection_Date.getMonth() + 1
        let very_first_Year = very_first_transection_Date.getFullYear()
        let very_first_Day = very_first_transection_Date.getDate()

        let currYear = `${current_Month}/${current_Day}/${current_Year}`
        let firstYear = `${very_first_Month}/${very_first_Day}/${very_first_Year}`

        var date1 = new Date(firstYear);
        var date2 = new Date(currYear);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        let find_History_Months = Math.round(Difference_In_Days / 30.5)
        let credit_score = 0;

        if ((find_History_Months >= 1) && (find_History_Months <= 3)) {
            credit_score = 20
        }
        else if ((find_History_Months <= 4) && (find_History_Months >= 2)) {
            credit_score = 30
        } else if (find_History_Months <= 8 && find_History_Months >= 5) {
            credit_score = 50
        } else if ((find_History_Months <= 12) && (find_History_Months >= 9)) {
            credit_score = 60
        } else if ((find_History_Months <= 18) && (find_History_Months >= 13)) {
            credit_score = 75
        } else if ((find_History_Months <= 30) && (find_History_Months > 19)) {
            credit_score = 85
        } else if (find_History_Months > 30) {
            credit_score = 90
        }






        //----------------------------------------Amount_owed_Score_calculation-----------------------------------------------------


        let current_balance = 5000

        let Insatallment_Score = "A+"

        let Loan_Pay_History = "A+"


        let Owe_Credit = 0

        if (current_balance > 0 && current_balance <= 500) {
            Owe_Credit = 15
        }
        else if (current_balance > 500 && current_balance <= 1000) {
            Owe_Credit = 20
        }
        else if (current_balance > 1000 && current_balance <= 2000) {
            Owe_Credit = 30;
        } else if (current_balance > 2000 && current_balance <= 5000) {
            Owe_Credit = 45;
        } else if (current_balance > 5000 && current_balance <= 8000) {
            Owe_Credit = 55;
        } else if (current_balance > 8000) {
            Owe_Credit = 60;
        }


        //-------------------------installment-credit-----------------------------------------




        let Installment_Credit = 0

        if (Insatallment_Score == "D") {
            Installment_Credit = 5
        }
        else if (Insatallment_Score == "C") {
            Installment_Credit = 20
        }
        else if (Insatallment_Score == "B") {
            Installment_Credit = 30;
        } else if (Insatallment_Score == "A") {
            Installment_Credit = 45;
        } else if (Insatallment_Score == "A+") {
            Installment_Credit = 60;
        }


        //---------------------Loan-credit---------------------------------------------------------

        let Loan_Credit = 0

        if (Loan_Pay_History == "D") {
            Loan_Credit = 5
        }
        else if (Loan_Pay_History == "C") {
            Loan_Credit = 20
        }
        else if (Loan_Pay_History == "B") {
            Loan_Credit = 30;
        } else if (Loan_Pay_History == "A") {
            Loan_Credit = 45;
        } else if (Loan_Pay_History == "A+") {
            Loan_Credit = 60;
        }


        let final_cal_owe = Owe_Credit + Installment_Credit + Loan_Credit


        //-------------------------------------------------payment_History--------------------------------------------------------------------------


        let Pay_back_Score = "A+"

        let Loan_Pay_Score = "A+"


        //-------------------------installment-credit-----------------------------------------
        let Pay_back_Score_Credit = 0

        if (Pay_back_Score == "D") {
            Pay_back_Score_Credit = 15
        }
        else if (Pay_back_Score == "C") {
            Pay_back_Score_Credit = 35
        }
        else if (Pay_back_Score == "B") {
            Pay_back_Score_Credit = 60;
        } else if (Pay_back_Score == "A") {
            Pay_back_Score_Credit = 90;
        } else if (Pay_back_Score == "A+") {
            Pay_back_Score_Credit = 105;
        }


        //---------------------Loan-credit---------------------------------------------------------

        let Loan_Pay_Score_credit = 0

        if (Loan_Pay_Score == "D") {
            Loan_Pay_Score_credit = 15
        }

        else if (Loan_Pay_Score == "C") {
            Loan_Pay_Score_credit = 35
        }

        else if (Loan_Pay_Score == "B") {
            Loan_Pay_Score_credit = 60;
        }
        else if (Loan_Pay_Score == "A") {
            Loan_Pay_Score_credit = 90;
        }
        else if (Loan_Pay_Score == "A+") {
            Loan_Pay_Score_credit = 105;
        }


        let Payment_His = Pay_back_Score_Credit + Loan_Pay_Score_credit




        //----------------------------final_calculation-------------------------------------

        let CREDIT_SCORE = 300 + creditScore + Account_Credit + credit_score + final_cal_owe + Payment_His

        let percentage = `0.${CREDIT_SCORE / 900 * 100}`
        let slice = percentage.slice(0, 4)
        let per = Number(slice)



        return res.status(200).send({ status: true, CREDIT_SCORE, CREDIT_PERCENTEGE: per })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------get-all-current-insatalment-of-loan--------------------------------------------------------------

const get_Insatallment_Loans = async (req, res) => {
    try {

        const LoanID = req.params.LoanID;

        if (!LoanID) {
            return res.status(200).send({ status: false, msg: "Please enter Loan ID" })
        }

        if (LoanID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Loan ID" })
        }

        let find = await LoanInsatallMent.findOne({ Loan_ID: LoanID })

        let Installments = find.Installments_History
        let No_Of_Installments = Installments.length

        return res.status(200).send({ status: true, No_Of_Installments, Installments })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ statsu: false, msg: error.messege })
    }
}

//---------------------------------------------Customer-Linked-service-Send-OTP----------------------------------------------------------------


const Cust_Linked_Srevice_send_OTP = async (req, res) => {
    try {

        const cust_phone = req.body.Phone;
        console.log("cust_phone", cust_phone)
        let trim = cust_phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)

        if (!cust_phone) {
            return res.status(200).send({ status: false, msg: "Please enter user phone number" })
        }

        let check_cust = await cutomerModel.findOne({ phone: convert_Number })

        if (!check_cust) {
            return res.status(200).send({ status: false, msg: "customer not regiater please register first" })
        }

        let OTP = 100000 + Math.floor(Math.random() * 900000);



        const send_mobile_otp = async (req, res) => {

            let mobile = convert_Number;
            let otp = OTP;

            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {

                    return response;
                });
            } catch (error) {
                console.log(error);
            }
        }

        send_mobile_otp();

        let update_OTP = await cutomerModel.findOneAndUpdate({ phone: convert_Number }, { Linekd_Service_OTP: OTP })

        return res.status(200).send({ status: true, msg: "OTP send succesfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ satatus: false, msg: error.messege })
    }
}


//---------------------------------------------Customer-Linked-service------------------------------------------------------------------------

const Cust_Linked_Srevice = async (req, res) => {
    try {
        const cust_phone = req.body.Phone;
        const orgID = req.body.OrgID;
        const otp = req.body.otp;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        if (!cust_phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone number" })
        }

        let find_org = await Organisation.findOne({ _id: orgID })

        let org_name = find_org.name

        if (!otp) {
            return res.status(200).send({ statsu: false, msg: "Please enter OTP " })
        }

        let verify_OTP = await cutomerModel.findOne({ phone: cust_phone })
        let all_organisations = verify_OTP.organisation
        let cust_ID = verify_OTP._id

        if (all_organisations.includes(orgID)) {
            return res.status(200).send({ statsu: false, msg: `This customer already linked with ${org_name} organisation` })
        }

        if (verify_OTP.Linekd_Service_OTP != otp) {
            return res.status(200).send({ status: false, msg: "Please enter Valid otp" })
        }

        let update_OTP = await cutomerModel.findOneAndUpdate({ phone: cust_phone }, { $push: { "organisation": orgID } }, { new: true })

        let update_OTP_Again = await cutomerModel.findOneAndUpdate({ phone: cust_phone }, { Linekd_Service_OTP: "000@$#&*" })

        let obj = {
            customer_ID: cust_ID,
            activity: `Linked to ${org_name}`,
            status: 'Pass',
            field: "Linked_service",
            field_status: "Pass"
        }

        let create_logs = await customer_logs.create(obj)


        return res.status(200).send({ status: true, msg: `Congratulation now you are also part of ${org_name}`, update_OTP })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ satatus: false, msg: error.messege })
    }
}

//-----------------------------------------get-next-Month-emi----------------------------------------------------------------------------------------

const get_next_month_emi = async (req, res) => {
    try {

        const LoanID = req.params.LoanID;

        if (!LoanID) {
            return res.status(200).send({ status: false, msg: "Please enter LoanID" })
        }

        if (LoanID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid LoanID" })
        }

        let getInsatllment = await LoanInsatallMent.findOne({ Loan_ID: LoanID })
        let Emi_pay_date = getInsatllment.Installment_Pay_Date
        let installments = getInsatllment.Installments_History;
        let getDay = Emi_pay_date.getDate()
        let current = new Date()
        let current_Month = current.getMonth() + 1;
        let current_year = current.getFullYear();
  
        let Next_EMI = `${getDay}-${current_Month}-${current_year}`
        let Amount = getInsatllment.Installment_Amount
        return res.status(200).send({ status: true, Next_EMI, Amount })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ statsu: false, msg: error.messege })
    }
}

//----------------------------------------------get-organisation-log-history---------------------------------------------------------------------

const get_agent_LogHistory = async (req, res) => {
    try {




        //-----------------Pagination-----------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await Agent_logs.find();
        counPages = Math.ceil(countpages11.length / 10)

        let findHistory = await Agent_logs.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let result = []
        for (items of findHistory) {

            let data = {
                Name: items.name,
                Email: items.email,
                ID: items.ID,
                status: items.status,
                Date: items.loginTime.toISOString().substring(0, 10),
                Time: items.loginTime.toISOString().substring(12, 19)

            }
            result.push(data)
        }


        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error })
    }
}

const Face_model = require("../models/Customer_Face_data")





//--------------------------------------Agent-cust-banks---------------------------------------------------------------------------------------

const Customer_Bank_view = async (req, res) => {
    try {

        const agentID = req.userId

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Pleas enter valid agent ID" })
        }

        if (agentID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }


        let find_agent_customers = await cutomerModel.find({ createdBY: agentID }).select({ "_id": 1 })

        let IDs = []

        for (let i of find_agent_customers) {
            IDs.push(i._id)
        }

        let customers_banks = []

        for (let i of IDs) {
           
            let find_banks = await cust_Bank.find({ customerID: i })
            
            customers_banks.push(find_banks)
        }

        let data = []

        for (let i of customers_banks) {
            for (let j of i) {
                data.push(j)
            }
        }

        return res.status(200).send({ status: true, data })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------verify-customer-----------------------------------------------------------------------------------

const new_verify_customer = async (req, res) => {
    try {

        const OTP = req.body.OTP
        const phoneNo1 = req.body.phoneNo
        const phoneNo = `+${phoneNo1}`
        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }

        var findCust = await temp_Cust.findOne({ phone: phoneNo1 })





        let payload = {
            code: OTP,
            phoneNumber: phoneNo
        }


        const response = await axios.post('http://13.127.64.68:7008/api/mainnet/generate-digitalid', payload)

        let data1 = response.data
        let cust_password = generateString1(5)

        let newCust = {
            IDphoto: findCust.IDphoto, fullname: findCust.fullname,
            dateOfBirth: findCust.dateOfBirth, phone: findCust.phone,
            email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: data1.hash,
            owner: data1.response.owner, privateKey: data1.response.privateKey, walletAddress: data1.response.walletAddress,
            professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
            createdBY: findCust.createdBY, Latitude: findCust.Latitude,
            Longitude: findCust.Longitude, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
            locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, landSize: findCust.landSize,
            digitalID: findCust.digitalID, nextFOKniPhone: findCust.nextFOKniPhone, nextFOKinName: findCust.nextFOKinName,
            password: cust_password, facialIdentification: 1
        }
     


        let create_cust = await cutomerModel.create(newCust)

        if (create_cust) {

            let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

            let totalLicenses = OrganisationList.totalLicenses

            let findreaminig = await cutomerModel.find({ organisation: findCust.organisation })

            let calculateRemainig = totalLicenses - findreaminig.length;

            let Remainig = calculateRemainig

            let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig }, { new: true })


            let cust_wallet = `00x${generateString1(43)}`
            let obj = {
                customer_ID: create_cust._id,
                phone: create_cust.phone,
                wallet_Address: cust_wallet
            }

            let create_Wallet = await cust_wallet_Model.create(obj)

            const sentEmail = async (req, res) => {


                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'chrmepay123@gmail.com',
                        pass: 'jgiplcgrbddvktkl',
                    }
                });


                var mailOptions = {
                    from: 'chrmepay123@gmail.com',
                    to: 'sumit.hariyani2@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: `Hello! welcome to chrome pay your login password is ${cust_password}`

                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log('email error line 34 ===  ', error);
                        return false;
                    } else {
                        console.log('Email sent: ' + info.messageId);
                        return info.messageId;
                    }
                });
            }
            await sentEmail();

            return res.status(200).send({ status: true, msg: "customer register " })

        }



        let find = await cutomerModel.findOne({ phone: phoneNo1 })
        console.log("find", find)
        if (!find) {
            let find1 = await cutomerModel.findOne({ phone: phoneNo1 })
            if (!find1) {
                let find2 = await cutomerModel.findOne({ phone: phoneNo1 })
                if (!find2) {
                    let find3 = await cutomerModel.findOne({ phone: phoneNo1 })
                    if (!find3) {
                        return res.status(200).send({ status: false, msg: "Failed " })
                    }
                }
            }
        }

        //---------------------------------------------------------------------------------------------------------------
        if (create_cust) {
            let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })
            return res.status(200).send({ status: false, msg: "customer register " })
        }
    } catch (error) {

        setTimeout(async function () {
            const phoneNo1 = req.body.phoneNo
            let find = await cutomerModel.findOne({ phone: phoneNo1 })
            console.log("find", find)
            if (find) {
                let find1 = await cutomerModel.findOne({ phone: phoneNo1 })
                if (find1) {
                    let find2 = await cutomerModel.findOne({ phone: phoneNo1 })
                    if (find2) {
                        let find3 = await cutomerModel.findOne({ phone: phoneNo1 })
                        if (find3) {
                            let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })
                            return res.status(200).send({ status: true, msg: "customer register  succesfully" })
                        }
                    }
                }
            } else {
                let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })
                return res.status(200).send({ status: false, msg: "Failed Please Try Again" })

            }
        }, 3 * 1000);


    }
}

//-------------------------------------------get-agent-data-by-month-------------------------------------------------------------------------

const get_agent_cut_month = async (req, res) => {
    try {

        let agentID = req.userId;
        let date = new Date()
        let date1 = new Date



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await cutomerModel.find({ createdBY: agentID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })

        January = 0, February = 0, March = 0, April = 0, May = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December = 0



        for (let i of find_cust) {


            if (i.createdAt.getMonth() + 1 == 1) {
                January++
            } else if (i.createdAt.getMonth() + 1 == 2) {
                February++
            } else if (i.createdAt.getMonth() + 1 == 3) {
                March++
            } else if (i.createdAt.getMonth() + 1 == 4) {
                April++
            } else if (i.createdAt.getMonth() + 1 == 5) {
                May++
            } else if (i.createdAt.getMonth() + 1 == 6) {
                June++
            } else if (i.createdAt.getMonth() + 1 == 7) {
                July++
            } else if (i.createdAt.getMonth() + 1 == 8) {
                August++
            } else if (i.createdAt.getMonth() + 1 == 9) {
                September++
            } else if (i.createdAt.getMonth() + 1 == 10) {
                October++
            } else if (i.createdAt.getMonth() + 1 == 11) {
                November++
            } else if (i.createdAt.getMonth() + 1 == 12) {
                December++
            }
        }


        let obj = {
            January: January,
            February: February,
            March: March,
            April: April,
            May: May,
            June: June,
            July: July,
            August: August,
            September: September,
            October: October,
            November: November,
            December: December
        }

        return res.status(200).send({ status: true, obj })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------Resent-otp-customer--------------------------------------------------------------------------------

const Resend_otp = async (req, res) => {
    try {

        let phone = req.params.phone;


        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone nummber" })
        }

        async function doPostRequest() {

            let payload = {
                data: {
                    "name": "",
                    "age": "",
                    "city": "",
                    "email": ""
                },
                phoneNumber: `+${phone}`
            }

            
            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
        }
        await doPostRequest();
        return res.status(200).send({ status: true, msg: "OTP send sucessfully" })

    } catch (error) {
      
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const createCustomerByAgnet_web = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.params.agentID;
        let orgID = req.params.orgID;

        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })


        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }


        let findsubAdminID = await subAdmin.findOne({ _id: ID })



        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: ID })

            if (findRole) {

                let customerRole = findRole.customer.addCustomer

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to add customer, Contact admin to access add customer" })
                }
            }
        }

        if (Object.values(ID).length < 2) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
        }




    
        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
       
        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        const cheack_cus = await cutomerModel.findOne({ phone: convert_Number })

        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }

        //---------------------------------------------------------------------------------------------------------------------------------



        let findcust = await cutomerModel.find({ createdBY: orgID })
        let findOrg = await Organisation.findOne({ _id: orgID })


        if (findOrg.totlaLicense <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update yout licenses" })

        }



        // if (!(/^\d{8,12}$/).test(phone)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        // }

        let checkPhone = await cutomerModel.findOne({ phone: convert_Number })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
            //next();
        }


        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }


        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }

        const profilePicture = await uploadFile(files[0])
        const residace = await uploadFile(recidence[1])
        const local = await uploadFile(localDoc[2])
        const land = await uploadFile(ladregistration[3])







        async function doPostRequest() {

            let payload = {
                data: {
                    "name": fullname,
                    "age": age,
                    "city": city,
                    "email": email
                },
                phoneNumber: `+${convert_Number}`

            }


            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
            
        }

        await doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()

        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: orgID,
            status: status, createdBY: ID, createdBY: ID,
            nextFOKinName: nextFOKinName,
            nextFOKniPhone: nextFOKniPhone,
            landSize: landSize,
            residance: residace,
            locaDocument: local,
            landRegistration: land,
            digitalrefID: seq,
            assetType: assetType, assetID: assetID,
            assetAddress: assetAddress, assetLongitude: assetLongitude,
            assetLatitude: assetLatitude
        }

        let latestCommission = await agent_Commission.find({ agentID: ID })

        let agent_Cmisn = latestCommission.slice(-1)[0]

        let create = await temp_Cust.create(collection)

        if (!agent_Cmisn) {
            return res.status(200).send({ status: false, msg: "Agent commisiion is missing" })
        }

        if (agent_Cmisn.type == 'Percentage') {

            let amount = agent_Cmisn.Amount

            let perAmount = (amount / 100 * 5000)

            let obj = {
                custPhoto: create.IDphoto,
                agentName: agent_Cmisn.agentID.name,
                agentID: agent_Cmisn.agentID,
                custID: create._id,
                custName: create.fullname,
                commissionID: agent_Cmisn._id,
                commission: perAmount

            }

            let createcomsn = await agent_Commission_His.create(obj)
        } else if (agent_Cmisn.type == 'Flat Money') {

            let amount = agent_Cmisn.Amount



            let obj = {
                custPhoto: create.IDphoto,
                agentName: agent_Cmisn.agentID.name,
                agentID: agent_Cmisn.agentID,
                custID: create._id,
                custName: create.fullname,
                commission: amount
            }

            let createcomsn = await agent_Commission_His.create(obj)

        }

        return res.status(201).send({ status: true, msg: "otp send sucessfully", data: create, })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}


//-----------------------------------create-customer-new------------------------------------------------------------------------------------------

const createCustomerByOrg2 = async (req, res) => {
    try {

        let data = req.body;
        let phone_number = req.body.phone
        let email = req.body.email
        let age = req.body.age
        let name = req.body.name
        let city = req.body.city
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files


        if (req.files.length < 3) {
            return res.status(200).send({ status: false, msg: "Please upload all documents" })
        }



        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        const cheack_cus = await cutomerModel.findOne({ phone: phone_number })

        console.log("cheack_cus", cheack_cus)

        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }

        //---------------------------------------------------------------------------------------------------------------------------------


        const { landSize, assetType, assetID, } = data

        if (!landSize) {
            return res.status(200).send({ status: false, msg: "Please enter land size" })

        }

        // if (!assetType) {
        //     return res.status(200).send({ status: false, msg: "Please enter asset type" })

        // }

        // if (!assetID) {
        //     return res.status(200).send({ status: false, msg: "Please enter asset ID" })

        // }

     


        const residace = await uploadFile(recidence[0])
        const local = await uploadFile(localDoc[2])
        const land = await uploadFile(ladregistration[1])


        const find_and_update = await temp_Cust.findOneAndUpdate({ phone: phone_number }, {
            assetID: assetID, assetType: assetType,
            landSize: landSize, residance: residace, locaDocument: local, landRegistration: land
        }, { new: true })

        if (find_and_update) {

            async function doPostRequest() {

                let payload = {
                    data: {
                        "name": "",
                        "age": "",
                        "city": "",
                        "email": email
                    },
                    phoneNumber: `${phone_number}`

                }

                

                let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
                //console.log(res, "123123")
                let data1 = res.data;

            }

            await doPostRequest();

           

            return res.status(200).send({ status: true, msg: "Otp send sucessfully" })
        } else {
            return res.status(200).send({ status: false, msg: "Please try again" })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "server error" })
    }
}


//-------------------------------------------------------new-agent-login----------------------------------------------------------------------

const agent_login_new = async (req, res) => {
    try {

        const data = req.body;
        const { username, password } = data

        if (!username) {
            return res.status(200).send({ status: false, msg: "Please enter email or phone number11" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter pasword" })
        }


        if (username.length > 29) {

            let find_customer = await cutomerModel.findOne({ digitalID: username })

            //conosle.log("12")

            if (!find_customer) {
                return res.status(200).send({ status: false, msg: "Please enter valid phone or email or didgital ID" })
            }

            if (find_customer.password != password) {
                return res.status(200).send({ status: false, msg: "Please enter valid password" })
            }

            let custID = find_customer._id
            let cust_email = find_customer.email

            let token = jwt.sign({ custID, cust_email }, 'Customer')

            return res.status(200).send({ status: true, Login_status: "customer", msg: "Login sucessfully", token, custID })


        }

        if ((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(username)) {

            let find_agent = await agentModel.findOne({ email: username })

            if (find_agent) {

                const decryptedPassword = await bcrypt.compare(password, find_agent.password)

                if (!decryptedPassword) {
                    let UserIP = ip.address()
                    let AgentID = find_agent._id
                    let findLoginTime = Date.now();
                    let logData = {
                        email: find_agent.email,
                        UserID: find_agent._id,
                        loginTime: findLoginTime,
                        IP: UserIP,
                        status: "Please enter valid password",
                    }
                    let admindata = await adminModel.findOne();
                    let currStatus = await agentModel.findOne({ email: username })
                    let wrongCount = currStatus.WrongPassword + 1;
                    let update = await agentModel.findOneAndUpdate({ email: username }, { WrongPassword: wrongCount })
                    let remainingchance = admindata.agentpasswordlimit - update.WrongPassword

                    if (update.WrongPassword >= admindata.agentpasswordlimit) {
                        let UserIP = ip.address()
                        let data = {
                            IP: UserIP
                        }
                        let blockIP = await BlockIP.create(data)
                        let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })

                        setTimeout(async () => {
                            let UserIP = ip.address()
                            let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                        }, "10000")

                        return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

                    }

                    let MakeLogHIstory = await logHistory.create(logData);

                    return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
                }

                let agentID = find_agent._id;
                let name = find_agent.name
                let orgID = find_agent.organisationID
                let token = jwt.sign({ name, agentID, orgID, username, }, 'Agent')
                let setTooken = await agentModel.findOneAndUpdate({ email: find_agent.email }, { token: token })
                let UserIP = ip.address()
                let AgentID = find_agent._id;
                let findLoginTime = Date.now();
                let logData = {
                    email: find_agent.email,
                    UserID: find_agent._id,
                    loginTime: findLoginTime,
                    IP: UserIP,
                    status: "Login Sucessfull",

                }
                let MakeLogHIstory = await logHistory.create(logData);
                let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })
                return res.status(200).send({ status: true, Login_status: "agent", msg: "Login Sucessfull", token: token, ID: agentID, orgID: orgID })

            } else {

                let find_customer = await cutomerModel.findOne({ email: username })
                if (!find_customer) {
                    return res.status(200).send({ status: false, msg: "Please enter valid phone or email" })
                }
                if (find_customer.password != password) {
                    return res.status(200).send({ status: false, msg: "Please enter valid password" })
                }
                let custID = find_customer._id
                let cust_email = find_customer.email

                let token = jwt.sign({ custID, cust_email }, 'Customer')

                return res.status(200).send({ status: true, Login_status: "customer", msg: "Login sucessfully", token, custID })

            }

        } else {


            let find_agent = await agentModel.findOne({ phone: username })

            if (find_agent) {

                const decryptedPassword = await bcrypt.compare(password, find_agent.password)

                if (!decryptedPassword) {
                    let UserIP = ip.address()
                    let AgentID = find_agent._id

                    let findLoginTime = Date.now();

                    let logData = {
                        email: find_agent.email,
                        UserID: find_agent._id,
                        loginTime: findLoginTime,
                        IP: UserIP,
                        status: "Please enter valid password",

                    }

                    let admindata = await adminModel.findOne();
                    let currStatus = await agentModel.findOne({ email: find_agent.email })
                    let wrongCount = currStatus.WrongPassword + 1;
                    let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: wrongCount })
                    let remainingchance = admindata.agentpasswordlimit - update.WrongPassword
                    if (update.WrongPassword >= admindata.agentpasswordlimit) {
                        let UserIP = ip.address()
                        let data = {
                            IP: UserIP
                        }
                        let blockIP = await BlockIP.create(data)
                        let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })
                        setTimeout(async () => {
                            let UserIP = ip.address()
                            let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                        }, "10000")
                        return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

                    }

                    let MakeLogHIstory = await logHistory.create(logData);
                    return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
                }

                let agentID = find_agent._id;
                let name = find_agent.name
                let orgID = find_agent.organisationID

                let token = jwt.sign({ name, agentID, orgID, username, }, 'Agent')

                let setTooken = await agentModel.findOneAndUpdate({ email: find_agent.email }, { token: token })
                let UserIP = ip.address()
                let AgentID = find_agent._id;

                let findLoginTime = Date.now();

                let logData = {
                    email: find_agent.email,
                    UserID: find_agent._id,
                    loginTime: findLoginTime,
                    IP: UserIP,
                    status: "Login Sucessfull",
                }
                let MakeLogHIstory = await logHistory.create(logData);
                let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })
                return res.status(200).send({ status: true, Login_status: "agent", msg: "Login Sucessfull", token: token, ID: agentID, orgID: orgID })
            } else {



                let find_customer = await cutomerModel.findOne({ phone: username })

                if (!find_customer) {
                    return res.status(200).send({ status: false, msg: "Please enter valid phone or email" })
                }

                if (find_customer.password != password) {
                    return res.status(200).send({ status: false, msg: "Please enter valid password" })
                }

                let custID = find_customer._id
                let cust_email = find_customer.email

                let token = jwt.sign({ custID, cust_email }, 'Customer')

                return res.status(200).send({ status: true, Login_status: "customer", msg: "Login sucessfully", token, custID })

            }
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const viewAgent = async (req, res) => {
    try {

        const orgID = req.params.orgID
        console.log("orgID===>", orgID)
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }
        const { page = pageNO, limit = 10 } = req.query;
        if (Object.keys(req.body).length <= 1) {
            console.log("1")
            let countpages1 = await agentModel.find({ organisationID: orgID, isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;

            let filter = await agentModel.find({ organisationID: orgID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }
        else if (req.body.name || req.body.phone || req.body.agentCode || req.body.country) {
            console.log("2")
            let option = [{ name: req.body.name }, { phone: req.body.phone }, { country: req.body.country }, { agentCode: req.body.agentCode }]


            let countpages2 = await agentModel.find({ $or: option, organisationID: orgID })
            let contRow = countpages2.length
            let filter = await agentModel.find({ $or: option, organisationID: orgID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


module.exports.createAgent = createAgent;
module.exports.agentLogin = agentLogin;
module.exports.updateAgent = updateAgent;
module.exports.deleteagent = deleteagent;
module.exports.forgotpassword = forgotpassword;
module.exports.ForgetPassVerifyOtp = ForgetPassVerifyOtp;
module.exports.agentCustomerList = agentCustomerList;
module.exports.SusPendCostomer = SusPendCostomer;
module.exports.unSuspengCustomer = unSuspengCustomer;
module.exports.deleteCustomer = deleteCustomer;
module.exports.agenttransectionfillter = agenttransectionfillter;
module.exports.agentchangePassword = agentchangePassword;
module.exports.agentProfile = agentProfile;
module.exports.agentProfileUpdate = agentProfileUpdate;
module.exports.updateTransectionLimit = updateTransectionLimit;
module.exports.verifyCustomeragent = verifyCustomeragent;
module.exports.agentDash = agentDash;
module.exports.recentUser = recentUser;
module.exports.recentAgentTransection = recentAgentTransection;
module.exports.agentPerformanceReport = agentPerformanceReport;
module.exports.createCustomerByOrg1 = createCustomerByOrg1;
module.exports.commissionlist = commissionlist;
module.exports.AgentAwaiting = AgentAwaiting;
module.exports.agent_blocked = agent_blocked;
module.exports.customerVerifyByAgent = customerVerifyByAgent;
module.exports.Customer_Loan_app = Customer_Loan_app;
module.exports.getOrgForLoan = getOrgForLoan;
module.exports.getOrgLoans = getOrgLoans;
module.exports.getInterestOFLoan = getInterestOFLoan;
module.exports.get_document = get_document;
module.exports.calculate_Amount = calculate_Amount;
module.exports.Cust_Loan_apply_agent = Cust_Loan_apply_agent;
module.exports.Cust_apply_Agent_Loans = Cust_apply_Agent_Loans;
module.exports.get_Agent_pass_Loans = get_Agent_pass_Loans;
module.exports.pay_cust_emi = pay_cust_emi;
module.exports.Calculate_credit_Score = Calculate_credit_Score;
module.exports.get_Insatallment_Loans = get_Insatallment_Loans;
module.exports.send_Loan_Otp = send_Loan_Otp;
module.exports.Cust_Linked_Srevice_send_OTP = Cust_Linked_Srevice_send_OTP;
module.exports.Cust_Linked_Srevice = Cust_Linked_Srevice;
module.exports.get_next_month_emi = get_next_month_emi;
module.exports.get_agent_LogHistory = get_agent_LogHistory;
module.exports.Customer_Bank_view = Customer_Bank_view;
module.exports.new_verify_customer = new_verify_customer;
module.exports.get_agent_cut_month = get_agent_cut_month;
module.exports.Resend_otp = Resend_otp;
module.exports.createCustomerByAgnet_web = createCustomerByAgnet_web
module.exports.createCustomerByOrg2 = createCustomerByOrg2
module.exports.agent_login_new = agent_login_new
module.exports.viewAgent = viewAgent

