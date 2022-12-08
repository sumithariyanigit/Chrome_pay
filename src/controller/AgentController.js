const agentModel = require("../models/AgentModel")
//const adminModel = require("../models/AdminModel");
const logHistory = require("../models/AgentLogHis")
//const jwt = require('jsonwebtoken');
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


//Redis Connection
// const redisClient = redis.createClient(
//     11570,
//     "redis-11570.c264.ap-south-1-1.ec2.cloud.redislabs.com",
//     { no_ready_check: true }
// );
// redisClient.auth("ehBqDLZYo8lUseKNlWgsYCGOIbwVJoJ1", function (err) {
//     if (err) throw err;
// });

// redisClient.on("connect", async function () {
//     console.log("Connected to Redis..");
// });


// const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
// const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


//-----------------------------------------let-verify-token------------------------------------------------------------------------------------

async function decodeToken(token) {


    const decoded = jwt.verify(token, 'Agent')
    var ToeknAgentID = decoded.agentID

    return ToeknAgentID;


}

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
        console.log(AgentCode)

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

        console.log(password)

        if (!username) {
            return res.status(200).send({ status: false, msg: "Please enter email or phone number" })
        }

        console.log(username)

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

        // console.log("check", checkemail)
        // if (!checkemail) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid email or phone" })
        // }

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

//--------------------------------------------------------Agent-View----------------------------------------------------------------------//

const viewAgent = async (req, res) => {
    try {

        const orgID = req.params.orgID

        console.log("orgID===>", orgID)

        let pageNO = req.body.page;
        //let countpages1 = await agentModel.find({ organisationID: '6311a0de778efce58f2336db' })
        // console.log(countpages1)
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
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })






        }


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
            // agentCode: AgentCode,
            country: country,
            address: address,
            city: city,
            postCode: postCode,
            transectionLimit: transectionLimit,
            // organisationID: orgID,

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

        console.log(email)

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
        //console.log(checkOTP.otp)

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        return res.status(200).send({ status: true, msg: "Password Verified Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}
//----------------------------------------------------chnage-password------------------------------------------------------------------------------

const changePassword = async (req, res) => {
    try {

        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        console.log("123123")

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new Password" })
        }

        if (!newPassword.Match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            return res.status(200).send({ status: false, msg: "Please enter valid password, password at least one number and one special caharacter" })
        }

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })

        }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your confirm Password is not match" })
        }


        let updatePassword = await agentModel.findOneAndUpdate({ email: email }, { password: confirmPassword })

        if (!updatePassword) {
            return res.status(200).send({ status: false, msg: "Password not changed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Password change sucessfully" })

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

//----------------------------------Register-Customer--------------------------------


var currOTP = [];
console.log(currOTP)


const customerRegister = async (req, res) => {
    try {
        // let verify = generateOTP(4)

        url = "http://localhost:3000/customer";
        let data = req.body;
        let Idphoto = req.files
        // console.log(Idphoto)

        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let agentID = req.params.agentID

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })
        }





        const { IDphoto, fullname, dateOfBirth, phone, email, gender, nationality, professoin, address,
            organisation, status, nextFOKinName, nextFOKniPhone, landSize } = data

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        //next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await cutomerModel.findOne({ phone: data.phone })


        if (checkPhone)
            return res.status(200).send({ status: false, msg: "Number already register " })
        //next();


        if (!(/^\d{10}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }

        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }

        let findOrgID = await agentModel.findOne({ _id: agentID })
        let orgID = findOrgID.organisationID;





        //const uploadImg = multer({ Idphoto }).single('image');
        const residace = await uploadFile(recidence[0])
        const profilePicture = await uploadFile(Idphoto[0])
        const local = await uploadFile(localDoc[0])
        const land = await uploadFile(ladregistration[0])

        let OTP = 1000 + Math.floor(Math.random() * 9000);

        currOTP.push(OTP)





        let collection = {
            IDphoto: profilePicture,
            fullname: fullname,
            dateOfBirth: dateOfBirth,
            phone: phone,
            email: email,
            gender: gender,
            nationality: nationality,
            professoin: professoin,
            address: address,
            organisation: orgID,
            status: status,
            createdBY: agentID,
            nextFOKniPhone: nextFOKniPhone,
            nextFOKinName: nextFOKinName,
            landSize: landSize,
            residance: residace,
            locaDocument: local,
            landRegistration: land,
            otp: OTP
        }



        const send_mobile_otp = async (req, res) => {

            let mobile = 9877487381;
            let otp = OTP;


            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {
                    //console.log(response);
                    return response;
                });
            } catch (error) {
                console.log(error);

            }
        }

        send_mobile_otp();

        let create = await cutomerModel.create(collection)

        //next();
        return res.status(201).send({ status: true, msg: "OTP send sucessfully", data: create, })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------------verify-OTP-------------------------------------------------------------------------------//

const verifyOTP = async (req, res) => {
    try {

        const otp = req.body.otp;
        let otp11 = otp.toString().replace(/\,/g, '')
        var customerOTP = currOTP[currOTP.length - 1]
        console.log(customerOTP)
        console.log(customerOTP)

        if (!otp11) {
            return res.status(200).send({ status: false, msg: "Please enter OTP " })
        }


        if (otp11 != customerOTP) {
            //count++;
            res.status(200).send({ status: false, msg: "Invalid OTP please enter valid otp " })
        }

        if (otp == customerOTP) {
            return res.status(200).send({ status: true, msg: "Customer Register Sucessfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------Agent-customer-list-----------------------------------------------------------------------------------


const agentCustomerList = async (req, res) => {

    try {

        const adminID = req.params.adminID;
        // const CustomerName = req.body.customerName;
        // const status = req.body.Status

        console.log("test run")



        let countpages = await cutomerModel.find({ createdBY: adminID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        //let currPage = 0
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
            console.log("verif", req.body.nationality)
            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {

            console.log("fghj", req.body.fromDate)

            let option = [{
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]



            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            console.log("countpages2", adminID)
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }

        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            console.log(req.body.nationality)
            console.log("verif", req.body.nationality)
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

            console.log("verif", req.body.nationality)

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

        //console.log(checkUser.createdBY)

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

        console.log("===>", agentID)

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

        // if (findCUstomer.createdBY != agentID) {
        //     return res.status(200).send({ status: false, msg: "you are not authorized person, to delete this coustomer" })
        // }


        // if (findCUstomer.isDeleted == 1) {
        //     return res.status(200).send({ Status: false, msg: "Customer already deleted" })
        // }

        if (findCUstomer.createdBY == agentID) {
            let update = await cutomerModel.findOneAndUpdate({ _id: userID }, { isDeleted: 1, DeletedBy: agentID }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })
        }





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//---------------------------------------Agent-customer-list---------------------------------------------------------------------------------------






const AgentCustomerTest = async (req, res) => {

    try {

        const agentID = req.params.agentID;



        let countpages = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        //let currPage = 0
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {



            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }, {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }


        else if (req.body.ID.length <= 0 && req.body.phone.length <= 0 && req.body.phone.length <= 0 && req.body.status.length <= 0 && req.body.nationality.length <= 0 && req.body.fromDate.length <= 0 && req.body.toDate.length <= 0) {
            let countpages2 = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }

        // let ID = req.body.ID
        //console.log(ID.length)
        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        } else if (req.body.ID.length > 2) {


            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }


        else {




            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, createdBY: agentID })
            let contRow3 = countpages3.length

            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found1" })
            // }
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })



        }



    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
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
                //console.log(item._id)
                var countpages1 = await transectionModel.find({ senderID: item._id }).sort({ createdAt: -1 })

                var totalRaow1 = countpages1.length;
                let filter = await transectionModel.find({ senderID: item._id })
                    //.sort({ createdAt: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();

                // const obj = Object.assign({}, ...filter._doc);

                for (ele of filter) {
                    result.push(ele)
                }

                // if (filter.length >= 1) {
                //     result.push(ele)
                // }



                //return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter, })

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


//-------------------------------------------------------Agent-dash-section---------------------------------------------------------------------------

// const agentdashboard = async (req, res) => {
//     try {

//         const agentID = req.params.agentID

//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error })
//     }
// }

//-------------------------------Agent-Profile------------------------------------------------------------------------------------------

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
            //var email = req.email;
            //var otp = req.otp;
            //console.log(email + " ==jk== " + otp);

            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',
                    // user: 'mailto:donotreply@d49.co.in',
                    //   pass: '&4e=XSQB'
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



//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

const createCustomerByagent = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let agentID = req.params.agentID
        let ID = req.params.ID
        let Idphoto = req.files

        if (Object.values(ID).length < 2) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
        }





        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Longitude, Latitude } = data

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        //next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }
        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }
        let checkPhone = await temp_Cust.findOne({ phone: data.phone })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
            //next();
        }

        // if (!(/^\d{10}$/).test(phone)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        // }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await temp_Cust.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }


        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }


        async function doPostRequest() {

            let payload = {
                data: {
                    "name": fullname,
                    "age": age,
                    "city": city,
                    "email": email
                },
                phoneNumber: `+91${phone}`
            }


            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);

            let data1 = res.data;
            console.log(data1);
        }

        doPostRequest();


        const residace = await uploadFile(recidence[0])
        const profilePicture = await uploadFile(Idphoto[0])
        const local = await uploadFile(localDoc[0])
        const land = await uploadFile(ladregistration[0])

        let collection = {
            IDphoto: profilePicture,
            fullname: fullname,
            dateOfBirth: dateOfBirth,
            phone: phone,
            city: city,
            age: age,
            email: email,
            gender: gender,
            nationality: nationality,
            professoin: professoin,
            address: address,
            organisation: ID,
            status: status,
            createdBY: ID,
            createdBY: ID,
            Longitude: Longitude,
            Latitude: Latitude

        }

        let create = await temp_Cust.create(collection)



        next();
        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

//-----------------------------------verify-otp-and-register-customer-with-digitalID-----------------------------------------------------------------------------

let verifyCustomeragent = async (req, res) => {
    try {

        const otp = req.body.OTP
        console.log(otp)

        const phoneNo1 = req.body.phoneNo
        const phoneNo = `+91${phoneNo1}`

        console.log("phoneNo", phoneNo)
        console.log("otp", otp)


        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp" })
        }

        if (!phoneNo) {
            return res.status(200).send({ status: false, msg: "Please enter phoneNo" })
        }

        console.log(otp)
        console.log(phoneNo)

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

                console.log(data1.response.owner);



                let findCust = await temp_Cust.findOne({ phone: phoneNo1 })


                let newCust = {
                    IDphoto: findCust.IDphoto, fullname: findCust.fullname,
                    dateOfBirth: findCust.dateOfBirth, phone: findCust.phone, city: findCust.city, age: findCust.age,
                    email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: data1.hash,
                    owner: data1.response.owner, privateKey: data1.response.privateKey, walletAddress: data1.response.walletAddress,
                    professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
                    createdBY: findCust.createdBY, Longitude: findCust.Longitude, Latitude: findCust.Latitude
                }

                console.log("1")
                let create = await cutomerModel.create(newCust)

                console.log("2")

                let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

                let totalLicenses = OrganisationList.totalLicenses

                let findreaminig = await customerModel.find({ organisation: findCust.organisation })

                let calculateRemainig = totalLicenses - findreaminig.length;

                let Remainig = calculateRemainig

                let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig })

                console.log("===>", updateLicenses)
                return res.status(200).send({ status: true, msg: "customer register sucessfully", create })
            })
            .catch(error => {
                // console.log(error.response.data)
                return res.status(200).send({ status: false, msg: "failed please try again" })
            });

        // return res.status(200).send({ status: false, msg: "customer register sucessfully" })


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

        console.log(data)

        let findtrans = await transectionModel.find({ senderID: data })

        let totalTransection = 0
        for (let i of findtrans) {
            totalTransection += i.sendingAmount
        }



        //------------


        let data1 = []
        for (let i of findAgentUsers) {
            // let findtrans = await transectionModel.find({senderID : i._id})

            data1.push(i._id)
        }

        console.log(data1)

        let findtrans1 = await transectionModel.find({ recieverID: data1 })

        let receive = 0
        for (let i of findtrans1) {
            receive += i.sendingAmount
        }

        let totalAmount = totalTransection + receive



        let NumberOFUser = findAgentUsers.length

        //====================================================================================================

        return res.status(200).send({ status: true, NumberOFUser: NumberOFUser, agentName: agentName, email: email, country: country, mobile: mobile, totalTransection: totalAmount })

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

        //let  final =  final11.slice(Math.max(findAgentUsers.length - 3, 0))
        let final = final11.slice(0, 3)

        //console.log("==>",final12.length)

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

        //landSize , , assetType, assetID,
        // //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        // const cheack_cus = await cutomerModel.findOne({ phone: phone })

        // if (cheack_cus) {
        //     return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        // }

        // //---------------------------------------------------------------------------------------------------------------------------------


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


        let checkPhone = await cutomerModel.findOne({ phone: data.phone })


        // if (checkPhone) {
        //     return res.status(200).send({ status: false, msg: "Number already register" })
        //     //next();
        // }


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



        // async function doPostRequest() {

        //     let payload = {
        //         data: {
        //             "name": fullname,
        //             "age": age,
        //             "city": city,
        //             "email": email
        //         },
        //         phoneNumber: `${phone}`

        //     }

        //     let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
        //     let data1 = res.data;

        // }

        // await doPostRequest();

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
        //.populate('agentID')
        let agent_Cmisn = latestCommission.slice(-1)[0]
        //return res.status(200).send({ status: true, agent_Cmisn })
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

            //let perAmount = (amount/100*5000)

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

            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
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


        // let finddata = await agent_Commission_His.find({ agentID: agentID })

        // console.log(finddata)


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
        console.log("====>", agentID)

        let countpages = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        //let currPage = 0
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
            // let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
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
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
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
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }

        // else if (req.body.ID.length <= 0 && req.body.phone.length <= 0 && req.body.status.length <= 0 && req.body.nationality.length <= 0 && req.body.fromDate.length <= 0 && req.body.toDate.length <= 0) {
        //     let countpages2 = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 })
        //     let contRow = countpages2.length
        //     let filter = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
        //         .limit(limit * 1)
        //         .skip((page - 1) * limit)
        //         .exec();
        //     let totlaRow = filter.length;
        //     // if (filter.length == 0) {
        //     //     return res.status(200).send({ status: false, msg: "No Customer Found" })
        //     // }
        //     return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        // }

        // let ID = req.body.ID
        //console.log(ID.length)
        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
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
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
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
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found1" })
            // }
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

        //console.log("Last Month==>", LastMonthData)

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

        console.log("last Month = ", LastMonthData.length)
        console.log("current Month = ", Current_Month)

        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()


        if (perDayLastMonth > perDayCurrMonth) {
            ///let positive = perDayLastMonth - perDayCurrMonth

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

        //return res.status(200).send({ status: true, Current_Month })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------------Agent-add-Customers-By-Month-------------------------------------------------------------------

const agentAddCustByMonth = async (req, res) => {
    try {

        const agentID = req.params.agentID

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID " })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID ID" })
        }

        let currDate = new Date().getFullYear()
        let finalYear = currDate - 1
        let startTime = performance.now();

        let test = await cutomerModel.find({ createdBY: agentID })

        console.log("test===>s", test)


        cutomerModel.find({ createdBY: agentID, createdAt: { $gte: `${finalYear}-01-31T09:37:32.320+00:00`, $lte: '2022-11-05T07:33:37.480+00:00' } }).then(result => {
            let newMonthsArray = new Array();
            let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let months = {};

            for (let i = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7)) - 1; i < 12; i++) {
                let year = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(0, 4)) - 1;
                let month = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7));
                newMonth = monthsArray[i] + '-' + year;
                newMonthsArray.push(newMonth);
                months[newMonth] = 0;
            }

            for (let i = 0; i < parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7)); i++) {
                let year = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(0, 4));
                let month = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7));
                newMonth = monthsArray[i] + '-' + year;
                newMonthsArray.push(newMonth);
                months[newMonth] = 0;
            }
            0
            for (i = 0; i < result.length; i++) {
                let getDate = result[i].createdAt.toISOString();
                let year = getDate.substring(0, 4);
                let month = parseInt(getDate.substring(5, 7));
                let monthName = monthsArray[month - 1];
                let date = monthName + '-' + year;
                let count = Number(months[date]) + 1;
                months[date] = count;
            }

            let endTime = performance.now();
            return res.status(200).send({ Data: months, 'Execution time': endTime - startTime + ' mls' });
        });

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

//-------------------------------------------agent-commission-graph---------------------------------------------------------------------------

const agentCommissionGarph = async (req, res) => {
    try {
        const agentID = req.params.agentID;

        let commissionHis = await agent_Commission_His.find({ agentID: agentID }).distinct('commissionID')
        console.log(commissionHis)

        let find = await agent_Commission_His.aggregate(
            [

                {
                    $group: {
                        _id: "$commissionID ",
                        commission: { $sum: { $multiply: "$commission" } },
                        Average_qty: { $avg: "$commission" },
                        count: { $sum: 1 }
                    }
                }
            ]
        )
        //.pretty();

        console.log("==>", find)




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------------------Face-ditection-----------------------------------------------------------------------
//const sharp = require("../controller/sharp")
const fs = require("fs")
const sharp = require('sharp');
const { now } = require("mongoose");
const FaceDitection = async (req, res) => {
    try {

        const files = req.files
        const custID = req.params.custID;
        console.log("custID===>", custID)
        const Picture = req.body.picture
        //let image = files;
        //let image = req.files.File1.tempFilePath

        console.log("PICTURE", Picture)

        const data = JSON.parse(Picture);
        const buff = Buffer.from(data, 'base64');
        await sharp(buff).toFile('output.png')
        await fs.writeFileSync('felix.jpeg', buff);

        console.log("Image===>", files)
        //console.log("ImageLen===>", files.length)


        const image = await uploadFile(files[0])


        async function LoadModels() {
            await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        }
        LoadModels();



        console.log("===>", image)



        let faces = await FcaeModel.find();
        if (faces.length == 0) {

            console.log("asdfghjkl")

            let create = await cutomerModel.findOne({ _id: custID })
            const descriptions = []
            // let imagess = create.IDphoto


            const img = await canvas.loadImage(image);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            descriptions.push(detections.descriptor);
            //}
            console.log(create.fullname)
            const obj = {
                customerID: create._id,
                label: create.fullname,
                descriptions: descriptions,
            }
            let createFce = await FcaeModel.create(obj)

            return res.status(200).send({ status: true, msg: "face recognized sucessfully" })


        }

        //---------------------------------------------------------
        console.log(faces)
        for (i = 0; i < faces.length; i++) {
            for (j = 0; j < faces[i].descriptions.length; j++) {
                faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
            }
            faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].label, faces[i].descriptions);
        }

        const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
        //console.log("@@@@@@@>")
        const img = await canvas.loadImage(image);
        console.log("@@@@@@@>")

        let temp = faceapi.createCanvasFromMedia(img);

        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(temp, displaySize);


        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
        console.log("===>", results)

        for (items of results) {
            if (items._label == "unknown") {

                //-------------------------------------------------store-face-regnization------------------------------------------------------------------

                let create = cutomerModel.findOne({ _id: custID })
                const descriptions = []
                //let imagess = create.IDphoto


                const img = await canvas.loadImage(image);
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor);
                //}
                const obj = {
                    customerID: create._id,
                    label: "Arjun kapoor",
                    descriptions: descriptions,
                }
                let createFce = await FcaeModel.create(obj)

                return res.status(200).send({ status: true, msg: "face recognized sucessfully" })

            } else {
                return res.status(200).send({ status: false, results, msg: "Image already register, try again" })
            }
        }
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

        // let findOrganisations = 

        let find = await cutomerModel.findOne({ _id: custID })

        let organisations = find.organisation

        console.log(organisations)

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter Customer ID" })
        }


        let result = []
        for (let i of organisations) {
            let findOrg = await Organisation.find({ _id: i })
            result.push(findOrg)
            //console.log("====>", findOrg)
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

        //console.log(values)



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

        console.log("LoanType", LoanType)

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

        // console.log(test)




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

        console.log(Phone)

        let OTP = 100000 + Math.floor(Math.random() * 900000);


        const send_mobile_otp = async (req, res) => {

            let mobile = Phone;
            let otp = OTP;


            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {
                    //console.log(response);
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

        console.log("calculate_amount")

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
        console.log("Loan", find_OTP.Loan_OTP)
        console.log("front OTp", OTP)

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

        // if (!recidence) {
        //     return res.status(200).send({ staus: false, msg: "Please enter Emi recidence " })
        // }
        // if (!LocalGov) {
        //     return res.status(200).send({ staus: false, msg: "Please enter Emi Local Gov certificate " })
        // }
        // if (!LandRegistration) {
        //     return res.status(200).send({ staus: false, msg: "Please enter Emi Land Registration " })
        // }




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

        console.log(obj)
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

        console.log("my ip")

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
        console.log("PER", slice)
        console.log("PER", percentage)

        // console.log("creditScore", creditScore)
        // console.log("Account_Credit", Account_Credit)
        // console.log("credit_score", credit_score)
        // console.log("final_cal_owe", final_cal_owe)
        // console.log("Payment_His", Payment_His)
        // console.log("Final_Credit", CREDIT_SCORE)

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

        if (!cust_phone) {
            return res.status(200).send({ status: false, msg: "Please enter user phone number" })
        }

        let check_cust = await cutomerModel.findOne({ phone: cust_phone })

        if (!check_cust) {
            return res.status(200).send({ status: false, msg: "customer not regiater please register first" })
        }

        let OTP = 100000 + Math.floor(Math.random() * 900000);

        console.log("OTP", OTP)

        const send_mobile_otp = async (req, res) => {

            let mobile = cust_phone;
            let otp = OTP;

            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {
                    //console.log(response);
                    return response;
                });
            } catch (error) {
                console.log(error);
            }
        }

        send_mobile_otp();

        let update_OTP = await cutomerModel.findOneAndUpdate({ phone: cust_phone }, { Linekd_Service_OTP: OTP })

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
        console.log(("date", current_Month))
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


const test_face = async (req, res) => {
    try {



        //------------------------------------------------- store - face - regnization------------------------------------------------------------------
        let files = req.files

        //console.log("fils", files)
        // let url = 'data:image/jpeg;base64,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'


        // const fs = require("fs");
        // //const base64 = fs.readFileSync(url);
        // const buffer = Buffer.from(url);
        // fs.writeFileSync("new-path.jpg", buffer);

        const profilePicture = await uploadFile(files[0])

        console.log("==>", profilePicture)


        async function LoadModels() {
            await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        }
        LoadModels();

        let findCust = await cutomerModel.findOne({ _id: '637cb2b030972aef8fd3d00a' })
        let image1 = findCust.IDphoto



        const descriptions = []

        const img = await canvas.loadImage(profilePicture);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
        //}
        const obj = {
            customerID: "637cb15130972aef8fd3cf10",
            name: "fullname",
            descriptions: descriptions,
        }
        console.log(descriptions)
        let createFce = await Face_model.create(obj)

        return res.send(descriptions)



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//---------------------------------------dummy_face_main_api-------------------------------------------------------------------------------
//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

const dummy_face_main_api = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.params.agentID;
        let orgID = req.params.orgID;

        console.log("===>", files)


        console.log("=recidence===>", files.length - 1)
        let findsubAdminID = await subAdmin.findOne({ _id: ID })

        if (files.length == 0) {
            return res.status(200).send({ status: false, msg: "Please enter ID photo" })
        }

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

        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data



        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        console.log("Phone", phone)
        const cheack_cus = await temp_Cust.findOne({ phone: phone })
        console.log("AGENT_JAMES", cheack_cus)

        if (cheack_cus) {

            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })

        }

        // if (!ckeck_us) {
        //     return res.status(200).send({ sttaus: false, msg: "Please eneter valiid informantion" })
        // }

        //---------------------------------------------------------------------------------------------------------------------------------


        let findcust = await cutomerModel.find({ createdBY: orgID })
        let findOrg = await Organisation.findOne({ _id: orgID })

        console.log("cutomer==", findcust.length)

        if (findOrg.totlaLicense <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update yout licenses" })

        }

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        //next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let checkPhone = await temp_Cust.findOne({ phone: data.phone })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
            //next();
        }


        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await temp_Cust.findOne({ email: data.email })

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
                phoneNumber: `+91${phone}`
            }


            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
            // console.log(data1);
        }

        doPostRequest();


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
        //.populate('agentID')
        let agent_Cmisn = latestCommission.slice(-1)[0]
        //return res.status(200).send({ status: true, agent_Cmisn })
        let create = await temp_Cust.create(collection)

        //latestCommission
        //------------------------------------------------- store - face - regnization------------------------------------------------------------------


        async function LoadModels() {
            await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        }
        LoadModels();

        console.log("error", create);
        const descriptions = []
        let imagess = create.IDphoto
        console.log("inagess", imagess)

        const img = await canvas.loadImage(imagess);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
        //}
        const obj = {
            userID: "123123",
            label: fullname,
            descriptions: descriptions,
        }
        let createFce = await FcaeModel.create(obj)
        //-------------------------------------------------------------------------------------------------------------------------------------------

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

            //let perAmount = (amount/100*5000)

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

        return results;
        let result = await getDescriptorsFromDB(profilePicture);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

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
            console.log("==>", i)
            let find_banks = await cust_Bank.find({ customerID: i })
            console.log(find_banks)
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
      //  console.log(data1)
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
        console.log("123")


        let create_cust = await cutomerModel.create(newCust)

        console.log("123")

        let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

        console.log("OrganisationList", OrganisationList)

        let totalLicenses = OrganisationList.totalLicenses

        console.log("totalLicenses", totalLicenses)

        let findreaminig = await cutomerModel.find({ organisation: findCust.organisation })

        console.log("findreaminig", findreaminig)

        let calculateRemainig = totalLicenses - findreaminig.length;

        let Remainig = calculateRemainig

        let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig }, { new: true })

        console.log("updateLicenses", updateLicenses)
        let cust_wallet = `00x${generateString1(43)}`
        let obj = {
            customer_ID: create_cust._id,
            phone: create_cust.phone,
            wallet_Address: cust_wallet
        }


        let create_Wallet = await cust_wallet_Model.create(obj)
        console.log("create_Wallet", create_Wallet)
        let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })





        //----------------------------------------------------------------------------------------

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

        //---------------------------------------------------------------------------------------------------------------



        if (create_cust) {

            return res.status(200).send({ status: true, msg: "customer register sucessfullyy" })
        }

    } catch (error) {

            const phoneNo1 = req.body.phoneNo
            let find = await cutomerModel.findOne({ phone: phoneNo1 })
            if (find) {
                return res.status(200).send({ status: true, msg: "customer register  succesfully" })
            } else {
                return res.status(200).send({ status: false, msg: "Failed Please try again" })
            }

    }
}

//-------------------------------------------get-agent-data-by-month-------------------------------------------------------------------------

const get_agent_cut_month = async (req, res) => {
    try {

        let agentID = req.userId;
        let date = new Date()
        let date1 = new Date

        // date.setMonth(date.getMonth() – 12);

        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await cutomerModel.find({ createdBY: agentID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })

        January = 0, February = 0, March = 0, April = 0, May = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December = 0



        for (let i of find_cust) {

            //console.log(i.createdAt.getMonth() + 1)

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

            console.log("pay", payload)
            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
        }
        await doPostRequest();
        return res.status(200).send({ status: true, msg: "OTP send sucessfully" })

    } catch (error) {
        // console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const createCustomerByAgnet_web = async (req, res, next) => {
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

        console.log(files)


        let findsubAdminID = await subAdmin.findOne({ _id: ID })

        if (files.length == 0) {
            return res.status(200).send({ status: false, msg: "Please enter ID photo" })

        }

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


        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data

        console.log("type_of", typeof phone)
        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
        console.log("trim", convert_Number)
        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        const cheack_cus = await cutomerModel.findOne({ phone: convert_Number })

        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }

        //---------------------------------------------------------------------------------------------------------------------------------

        //const cheack_cus = await temp_Cust.findOne({ phone: convert_Number })

        let findcust = await cutomerModel.find({ createdBY: orgID })
        let findOrg = await Organisation.findOne({ _id: orgID })


        if (findOrg.totlaLicense <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update yout licenses" })

        }

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        //next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
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
            // console.log(data1);
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
        //.populate('agentID')
        let agent_Cmisn = latestCommission.slice(-1)[0]
        //return res.status(200).send({ status: true, agent_Cmisn })
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

            //let perAmount = (amount/100*5000)

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



        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        const cheack_cus = await cutomerModel.findOne({ phone: phone_number })

        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }

         //---------------------------------------------------------------------------------------------------------------------------------


        const { landSize, assetType, assetID, } = data

        console.log("data", data)


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

                console.log("payload", payload)

                let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
                let data1 = res.data;

            }

            await doPostRequest();

            console.log("456")

            return res.status(200).send({ status: true, msg: "Otp send sucessfully" })
        } else {
            return res.status(200).send({ status: false, msg: "Please try again" })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}







module.exports.createAgent = createAgent;
module.exports.agentLogin = agentLogin;
module.exports.customerRegister = customerRegister;
module.exports.viewAgent = viewAgent;
module.exports.updateAgent = updateAgent;
module.exports.deleteagent = deleteagent;
module.exports.verifyOTP = verifyOTP;
module.exports.forgotpassword = forgotpassword;
module.exports.ForgetPassVerifyOtp = ForgetPassVerifyOtp;
module.exports.changePassword = changePassword;
module.exports.agentCustomerList = agentCustomerList;
module.exports.SusPendCostomer = SusPendCostomer;
module.exports.unSuspengCustomer = unSuspengCustomer;
module.exports.deleteCustomer = deleteCustomer;
module.exports.AgentCustomerTest = AgentCustomerTest;
module.exports.agenttransectionfillter = agenttransectionfillter;
module.exports.agentchangePassword = agentchangePassword;
module.exports.agentProfile = agentProfile;
module.exports.agentProfileUpdate = agentProfileUpdate;
module.exports.updateTransectionLimit = updateTransectionLimit;
module.exports.createCustomerByagent = createCustomerByagent;
module.exports.verifyCustomeragent = verifyCustomeragent;
module.exports.agentDash = agentDash;
module.exports.recentUser = recentUser;
module.exports.recentAgentTransection = recentAgentTransection;
module.exports.agentPerformanceReport = agentPerformanceReport;
module.exports.createCustomerByOrg1 = createCustomerByOrg1;
module.exports.commissionlist = commissionlist;
module.exports.AgentAwaiting = AgentAwaiting;
module.exports.agentAddCustByMonth = agentAddCustByMonth;
module.exports.agent_blocked = agent_blocked;
module.exports.agentCommissionGarph = agentCommissionGarph;
module.exports.FaceDitection = FaceDitection;
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
module.exports.test_face = test_face;
module.exports.dummy_face_main_api = dummy_face_main_api;
module.exports.Customer_Bank_view = Customer_Bank_view;
module.exports.new_verify_customer = new_verify_customer;
module.exports.get_agent_cut_month = get_agent_cut_month;
module.exports.Resend_otp = Resend_otp;
module.exports.createCustomerByAgnet_web = createCustomerByAgnet_web
module.exports.createCustomerByOrg2 = createCustomerByOrg2

