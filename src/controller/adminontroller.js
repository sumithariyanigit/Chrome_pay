const adminModel = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const logHistory = require("../models/adminLogHistory");
const { findOne } = require("../models/transaction");
const adminLogHistory = require("../models/adminLogHistory")
var adminLogout11 = require("../controller/customer")
const Organisation = require("../models/Organisation")
const customerModel = require("../models/customer")
const BlockIP = require("../models/blockedIPs")
const transactionModel = require("../models/transaction");
const BlockIPModel = require("../models/blockedIPs");
var ip = require('ip');
const { findOneAndUpdate } = require("../models/Organisation");
const AgentModel = require("../models/AgentModel");
const userModel = require("../models/userModel");
const sub_Admin_Role = require("../models/subAdminRole")
const subAdmin = require("../models/AdminModel")
const sub_admin_role = require("../models/subAdminRole")
const temp_Cust = require("../models/temp_Cust")
const axios = require('axios')
const { uploadFile } = require("../aws/aws.js");
const agentModel = require("../models/AgentModel");
const License_fee = require("../models/org_LicensesFees")
const org_Licenses = require("../models/OrgLicenses");
const { required } = require("joi");
const org_Doc = require("../models/org_document");
const admin_Email_request = require("../models/adminEmail")
const customer_Bank = require("../models/customerBank")
const agent_Commission = require("../models/agentCommission")
const bankModel = require("../models/customerBank")
const bcrypt = require("bcrypt")
const Org_logs = require("../models/Organisationlog")
const aget_logs = require("../models/AgentLogHis")
const api_his = require("../models/apiHistory")
const Lons_Model = require("../models/Loan_apllied_by")







const createAdmin = async (req, res, next) => {
    try {
        url = "http://localhost:3000/Admin";
        //next();
        const data = req.body

        const { name, email, password, lastName, phone, address, country, state, city, postCode } = data;


        if (!email) {
            return res.status(400).send({ status: false, msg: "Please enter name" });
        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        console.log("==>", encryptedPassword)

        if (!password) {
            return res.status(400).send({ status: false, msg: "Please enter name" });
        }

        let obj = {
            Firstname: name,
            email: email,
            password: encryptedPassword,
            lastName: lastName,
            phone: phone,
            address: address,
            country: country,
            state: state,
            city: city,
            postCode: postCode,
        }

        let create = await adminModel.create(obj)
        //next();
        return res.status(201).send({ status: true, msg: "data created", data: create });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, error: error });
    }
}


//----------------------------------------------Login--------------------------------------------------------------------------------


const AdminLogin = async (req, res) => {
    try {
        url = "http://localhost:3000/adminLogin"

        let email = req.body.email;
        let password = req.body.password;


        //const { email, password } = data

        if (!email) {
            return res.status(200).send({ 'status': false, 'msg': "enter email" });
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "enter password" });
        }





        let checkEmail = await adminModel.findOne({ email: email });

        if (checkEmail.blocked == 1) {
            return res.status(200).send({ status: false, msg: "You are blocked! Please contact to admin" })
        }

        if (!checkEmail) {
            return res.status(200).send({ status: false, msg: "Please enter valid information" });
        }

        const decryptedPassword = await bcrypt.compare(password, checkEmail.password)

        console.log("==>", decryptedPassword)


        if (!decryptedPassword) {

            let findAdmindata = await adminModel.findOne({ email: email });
            let UserIP = ip.address()
            let adminID = checkEmail._id

            let findLoginTime = Date.now();

            let logData = {
                email: email,
                UserID: findAdmindata._id,
                loginTime: findLoginTime,
                IP: UserIP,
                status: "Please enter valid info",

            }

            let admindata = await adminModel.findOne();
            let currStatus = await adminModel.findOne({ email: email })
            let wrongCount = currStatus.wrongpassword + 1;
            let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: wrongCount })
            // console.log(update)
            // console.log(admindata.adminpasswordlimit)
            let remainingchance = admindata.adminpasswordlimit - update.wrongpassword


            if (update.wrongpassword == admindata.adminpasswordlimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: 0 })

                setTimeout(async () => {
                    let UserIP = ip.address()
                    let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                }, "10000")

                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

            }



            let MakeLogHIstory = await logHistory.create(logData);
            return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
        }

        //---------Login_History-------------//
        let adminID = checkEmail._id
        let admminID = checkEmail._id

        let findLoginTime = Date.now();

        // var token = jwt.sign({ adminID, email }, 'Admin')
        // res.header("x-api-key", token);
        // console.log(token)

        let findAdmindata = await adminModel.findOne({ email: email });

        let UserIP = ip.address()
        let logData = {
            email: email,
            UserID: findAdmindata._id,
            loginTime: findLoginTime,
            IP: UserIP,
            status: "Login sucessfully",


        }

        let MakeLogHIstory = await logHistory.create(logData);
        let token = jwt.sign({ admminID, email }, 'Admin')
        let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: 0 })
        return res.status(200).send({ status: true, token: token, ID: checkEmail._id, msg: "Login Sucessfully" })
        //-------------------generate-Otp---------------------------------------------------------------//
        let otp = 100000 + Math.floor(Math.random() * 900000);



        let collection = {
            name: checkEmail.name,
            email: checkEmail.email,
            password: checkEmail.password,
            otp: otp,
            createdAt: checkEmail.createdAt,
            updatedAt: checkEmail.updatedAt


        }

        let create = await adminModel.findOneAndUpdate({ email: email }, collection)

        const nodemailer = require("nodemailer");




        const sentEmail = async (req, res) => {
            //var email = req.email;
            //var otp = req.otp;
            console.log(email + " ==jk== " + otp);

            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',
                    // user: 'donotreply@d49.co.in',
                    //   pass: '&4e=XSQB'
                }
            });


            var mailOptions = {
                from: 'chrmepay123@gmail.com',
                to: 'sumit.hariyani2@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'your OTP is " ' + otp + ' " do not share this otp'
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

        let ID = adminID.toString();


        // return res.status(200).send({ status: true, ID: '654', msg: " OTP Send Sucessfully" });



    } catch (error) {
        console.log(error);
    }
}


//---------------------------------------Verify-User-OTP---------------------------------------------------------------------------------------//

const verifyOTP = async (req, res) => {
    try {

        const OTP = req.body.OTP;
        //const userID = req.body.userID;
        let admminID = req.params.ID
        console.log("ID", admminID)

        if (!OTP) {
            return res.status(200).send({ status: false, msg: "Please Enter OTP" })
        }

        let findOTP = await adminModel.findOne({ _id: admminID });

        if (!findOTP) {
            return res.status(200).send({ status: false, msg: "User Not Found" })
        }

        if (findOTP.otp != OTP) {

            let admindata = await adminModel.findOne();
            let currStatus = await adminModel.findOne({ _id: admminID })
            let wrongCount = currStatus.wrongOTP + 1;
            let update = await adminModel.findOneAndUpdate({ _id: admminID }, { wrongOTP: wrongCount })
            let remainingchance = admindata.adminotplimit - update.wrongOTP

            if (update.wrongOTP >= admindata.adminotplimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await adminModel.findOneAndUpdate({ _id: admminID }, { wrongOTP: 0 })
                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please contact to our team" })
            }
            return res.status(200).send({ status: false, msg: `Invalid OTP remaining chances ${remainingchance}` })
        }

        let email = findOTP.email
        let name = findOTP.name
        let token = jwt.sign({ name, admminID, email }, 'Admin')

        let update = await adminModel.findOneAndUpdate({ _id: admminID }, { wrongOTP: 0 })
        return res.status(200).send({ status: true, token: token, ID: admminID, msg: "OTP Verify Sucessfully" })

        // if (findOTP.otp == OTP) {

        //     let token = jwt.sign({ userID: userID, Name: findOTP.fullname, email: findOTP.email, phone: findOTP.phone }, 'user')
        //     return res.status(400).send({ status: true, msg: "Login Sucessfully", token: token })
        // }




    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}




//-------------------------------------------Get-Admin-Login-History--------------------------------------------------------//

const getHistory = async (req, res, next) => {
    try {

        //----------------------------Pagination------------------------------------------------------------//
        url = "http://localhost:3000/getAdminHistory"
        //next();
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await adminLogHistory.find();
        counPages = Math.ceil(countpages11.length / 10)





        let findData = await adminLogHistory.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        let result = [];
        for (items of findData) {
            let data = {
                Name: items.name,
                Email: items.email,
                AdminID: items.UserID,
                Date: items.loginTime.toISOString().substring(0, 10).replace('T', ' '),
                Time: items.loginTime.toISOString().substring(12, 19).replace('T', ' ')

            }
            result.push(data)
        }
        //next();
        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, error: error })
    }
}

//--------------------------------------Amin-Logout--------------------------------------------------------------//

const adminLogout = async (req, res, next) => {
    try {
        url = "http://localhost:3000/Logout";
        next();
        let clear = localStorage.removeItem("name of localStorage variable or item to remove");

        if (clear) {
            return res.status(400).send({ status: true, msg: "Logout sucessfully" })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}

//------------------------------------Admin-Controller---------------------------------------------------------------------------------

const LoginAdmin = async (req, res) => {
    try {
        let data = req.body;
        let cheackEmail = await adminModel.findOne({ email: data.email })
        if (!cheackEmail) {
            return res.status(400).send("Email is not register")
        }


        if (data.password != cheackEmail.password) {
            return res.status(400).send("password is incorrect")
        }

        userId = cheackEmail._id
        Email = cheackEmail.email

        let token = jwt.sign({ userID: userId }, 'satyam')

        return res.status(200).send({ 'token': token })



    } catch (error) {
        console.log(error)

    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const admin_login = async (req, res) => {
    try {
        let email = req.body.email;
        let pass = req.body.pass;
        let token = gen_str(99);

        adminModel.findOneAndUpdate({ email, pass }, { $set: { token } }, (error, data) => {
            if (error) { console.log("test errors is == ", error); return res.status(200).send({ 'status': false, 'msg': "Something went wrong please try again", 'body': '' }); }

            if (data) { data.token = token; return res.status(200).send({ 'status': true, 'msg': "success", 'body': data }); } else {

                res.status(200).send({ 'status': false, 'msg': "Invalid User ", 'body': '' });
            }



        });



    } catch (error) {
        res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

}




//-----------------------------------------------------Admin-Organisation-List-------------------------------------------------------------------


const OrganisationList = async (req, res) => {

    try {

        //const OrganisationID = req.params.ID;
        // const CustomerName = req.body.customerName;
        //const status = req.body.Status


        let countpages = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        //let currPage = 0
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
            let totalRaow1 = countpages1.length;
            let filter = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // let totlaRow = filter.length;
            if (filter.length == 0) {
                return res.status(200).send({ status: false, msg: "No Customer Found" })
            }
            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }


        if (req.body.fromDate) {



            let option = [{ status: req.body.status }, {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await Organisation.find({ isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await Organisation.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else {

            let option = [{ status: req.body.status }]
            let countpages3 = await Organisation.find({ $or: option, isDeleted: 0 })
            let contRow3 = countpages3.length

            let filter = await Organisation.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
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




//----------------------------------Admin-Test-Filter-Data-Customer----------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////


const AdminCustomerList = async (req, res) => {

    try {

        // const OrganisationID = req.params.ID;
        // const CustomerName = req.body.customerName;
        //const status = req.body.Status



        let countpages = await customerModel.find({ isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        // if (!OrganisationID) {
        //     return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        // }

        //let currPage = 0
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality || req.body.status) {
            let option = [{ nationality: req.body.nationality }, { status: req.body.status }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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
            let countpages2 = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        } else if (req.body.ID.length > 2) {


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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
            let countpages3 = await customerModel.find({ $or: option, blocked: 0, status: "verified" })
            let contRow3 = countpages3.length

            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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



//-----------------------------------Admin-Transection-list---------------------------------------------------------------------------------//

const AdminTransectionList = async (req, res, next) => {
    try {



        url = "http://localhost:3000/getByPage";
        ////next();();
        let pageNO = req.body.page;

        if (pageNO == 0) {
            pageNO = 1;
        }
        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await transactionModel.find();
        counPages = Math.ceil(countpages11.length / 10)

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await transactionModel.find().sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await transactionModel.find().sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })



        } else if (req.body.PCN || req.body.senderName || req.body.beneficiaryName || req.body.PayInCashier || req.body.amountRange) {




            let option = [{ PCN: req.body.PCN }, { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName },
            { PayInCashier: req.body.PayInCashier }, { sendingAmount: req.body.amountRange }]

            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.DateRange && req.body.DateRange.length > 1) {
            let option = [{
                createdAt: {
                    $lte: new Date(req.body.DateRange).toISOString()
                }
            }]

            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.Relationship) {


            let option = [{ Relationship: req.body.Relationship }]

            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }
        let option = [{ PCN: req.body.PCN }, { Relationship: req.body.Relationship }]

        // const searchcriteria = req.body.searchcriteria;
        console.log(Object.keys(req.body))

        let overLimit = await transactionModel.find({ $or: option }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let result = [];
        for (users of overLimit) {

            let finalData = {
                _id: users._id,
                transactionID: users.transactionID,
                senderName: users.fullName,
                senderID: users.senderID,
                recieverName: users.beneficiaryName,
                recieverID: users.recieverID,
                transactionDate: users.transactionDate,
                PCN: users.PCN,
                PayInCashier: users.PayInCashier,
                PayOutCashier: users.PayOutCashier,
                senderName: users.senderName,
                sendingAmount: users.sendingAmount,
                receiverAmount: users.receiverAmount,
                Relationship: users.Relationship,
                status: users.status,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
                __v: users.__v


            }

            result.push(finalData)
        }


        ////next();();
        return res.status(200).send({ totalPage: counPages, CurrentPage: parseInt(pageNO), data: result })





    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}









//--------------------------------Suspend-Organisation----------------------------------------------------------------------------//

const SuspendOrganisation = async (req, res) => {
    try {

        const orgID = req.params.OrganisationID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not geting Organisation ID " })
        }

        let findOrganisation = await Organisation.findByIdAndUpdate({ _id: orgID }, { blocked: 1 }, { new: true })


        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "Organisation Blocked Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------Un-Suspend-Organisation--------------------------------------------------------------------------

const Un_suspend_Organisation = async (req, res) => {
    try {

        const OrganisationID = req.params.OrganisationID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "not getting Organisation ID " })
        }

        let findOrganisation = await Organisation.findByIdAndUpdate({ _id: OrganisationID }, { blocked: 0 }, { new: true })


        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "Organisation Un-Blocked Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}








//----------------------------------------------Delete-Organisation--------------------------------------------------------------------------------

const deleteOrganisation = async (req, res) => {

    try {

        const OrganisationID = req.params.OrganisationID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Not getting organisation ID" })
        }

        let findOrganisation = await Organisation.findByIdAndUpdate({ _id: OrganisationID }, { isDeleted: 1 }, { new: true })



        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "Organisation deleted Sucessfully" })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//------------------------------Suspend-Customer---------------------------------------------------------------------------------------------
const suspendCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;

        const adminID = req.params.adminID

        let findsubAdminID = await adminModel.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {


                let customerRole = findRole.customer.blockCustomer

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to block customer, Contact admin to access block customer" })

                }
            }

        }



        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await customerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }



        let BlockUser = await customerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

        return res.status(200).send({ status: 1, msg: "Customer Block Sucessfully" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}
//--------------------------un-Suspend-Customer---------------------------------------------------------------------------------------------

const UnsuspendCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;
        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })
            if (findRole) {
                let customerRole = findRole.customer.unBlockCustomer
                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to unblocke customer, Contact admin to access block customer" })

                }
            }
        }


        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await customerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Customer Already Unbolcked" })
        }

        let BlockUser = await customerModel.findOneAndUpdate({ _id: userID }, { blocked: 0 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Unblock Sucessfully" })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//----------------------------------------------DeleteCustomer-----------------------------------------------------------------------------//
const DeleteCustomer = async (req, res) => {
    try {

        const customerID = req.params.ID
        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "please enter admin ID" })
        }


        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })
            let customerRole = findRole.customer.deleteCustomer
            if (customerRole == 0) {
                return res.status(200).send({ status: false, msg: "You are not allow to unblocke customer, Contact admin to access block customer" })
            }
        }



        if (!customerID.length) {
            return res.status(200).send({ status: false, msg: "Customer Id is required" })
        }

        let findCUstomer = await customerModel.findOne({ _id: customerID })
        if (!findCUstomer) {
            return res.status(200).send({ status: false, msg: "Customer not found" })
        }

        if (findCUstomer.isDeleted == 1) {
            return res.status(200).send({ Status: false, msg: "Customer already deleted" })
        }

        let update = await customerModel.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//---------------------------------------------------IP-Unblock-admin---------------------------------------------------------------------------

const UnBlockIP = async (req, res) => {
    try {

        const adminID = req.params.adminID;
        const ID = req.params.ID;

        console.log("123", adminID)

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "adminID not getting" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid admin ID" })
        }


        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.IP.IPwhiteListing

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to un block IP, Contact admin to access Un block IP" })

                }
            }

        }
        let findadmin = await adminModel.findOne({ _id: adminID })

        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }

        if (!ID) {
            return res.status(200).send({ status: false, msg: "Please enter ID" })
        }

        if (ID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid IP ID" })
        }

        let findIP = await BlockIP.findOneAndDelete({ _id: ID })

        if (!findIP) {
            return res.status(200).send({ status: false, msg: "ip adress not found" })
        }

        return res.status(200).send({ status: true, msg: "IP adress un-blocked sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//---------------------------------------transection-list-filter-----------------------------------------------------------------------------------

const admintransectionfillter = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await transactionModel.find().sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await transactionModel.find().sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })



        } else if (req.body.fromDate) {

            let option = [
                // { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName },
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
                //, {
                //     sendingAmount: {
                //         $gte: req.body.fromAmount,
                //         $lte: req.body.toAmount
                //     }
                // }
            ]




            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromAmount && req.body.senderName) {
            let option = [{ senderName: req.body.senderName }, {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromAmount && req.body.beneficiaryName) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.senderName && req.body.beneficiaryName) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },
                // {
                //     sendingAmount: {
                //         $gte: req.body.fromAmount,
                //         $lte: req.body.toAmount
                //     }
                // }
            ]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromAmount && req.body.senderName) {
            let option = [{ senderName: req.body.senderName }, {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.senderName && req.body.beneficiaryName && req.body.fromAmount && req.body.toAmount) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },
            {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }
            ]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }










        else {



            let option = [{
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }, { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName }]




            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ transactionDate: -1 })
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

//--------------------------------------admin-profle----------------------------------------------------------------------------------------

const adminProfile = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admin ID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let findadmin = await adminModel.findOne({ _id: adminID })
        // .select({ name: 1, email: 1, _id: 1 })
        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "no admin find" })
        }

        return res.status(200).send({ status: true, data: findadmin })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------admin-change-Spassword------------------------------------------------------------------------------------------

const changePassword = async (req, res) => {
    try {

        const adminID = req.params.adminID;
        const oldPaasword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "adminID not getting" })
        }

        if (!oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter oldPassword" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new password" })
        }

        if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
            return res.status(200).send({ status: false, msg: "Please enter valid password, password at least one number and one special caharacter" })
        }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: " Your confirm password is not match" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let findadmin = await adminModel.findOneAndUpdate({ _id: adminID }, { password: newPassword })


        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }

        if (findadmin.password !== oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter valid old password" })
        }

        return res.status(200).send({ status: true, msg: "Password Change Sucessfully" })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}



//------------------------------------------------admin-forgot-password-----------------------------------------------------------------------

const forgotpassword = async (req, res) => {
    try {


        const email = req.body.email;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter your register email" })
        }


        let cheackEmail = await adminModel.findOne({ email: email })

        if (!cheackEmail) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (cheackEmail.email !== email) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }
        let otp = 100000 + Math.floor(Math.random() * 900000);
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
                subject: 'Sending Email using Node.js',
                text: ' Hello! admin your OTP for change password is" ' + otp + ' " do not share this otp'
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

        let updateOTP = await adminModel.findOneAndUpdate({ email: email }, { otp: otp })

        if (!updateOTP) {
            return res.status(200).send({ status: false, msg: "Agent not Found" })
        }

        return res.status(200).send({ status: true, msg: "Otp send Sucessfully" })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------------chnage-password------------------------------------------------------------------------------

const changePasswordotp = async (req, res) => {
    try {

        // const agentID = req.params.agentID;
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        const otp = req.body.otp;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Not getting email" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new Password" })
        }

        if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
            return res.status(200).send({ status: false, msg: "Please enter valid password, password at least one number and one special caharacter" })
        }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your confirm Password is not match" })
        }

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp, which you getting through your email" })
        }

        let checkOTP = await adminModel.findOne({ email: email })
        //console.log(checkOTP.otp)

        if (!checkOTP) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        let updatePassword = await adminModel.findOneAndUpdate({ email: email }, { password: confirmPassword })

        if (!updatePassword) {
            return res.status(200).send({ status: false, msg: "Password not changed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Password change sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//-------------------------------------------blockip-----------------------------------------------------------------------------

const CreateIPs = async (req, res) => {
    try {

        const IP = req.body.IP;

        const adminID = req.params.adminID



        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }








        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        console.log(findsubAdminID)

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })
            if (findRole) {

                let customerRole = findRole.IP.IPblackListing
                console.log(customerRole)

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to block IP, Contact admin to access block IP" })

                }
            }

        }

        if (!IP) {
            return res.status(400).send({ status: false, msg: "Please enter IP" })
        }

        let caheckIP = await BlockIPModel.findOne({ IP: IP })
        if (caheckIP) {
            return res.status(400).send({ status: false, msg: "IP Already Blocked" })
        }


        let create = await BlockIPModel.create({ IP })
        return res.status(201).send({ status: true, msg: `${IP} is Blocked` })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}



//----------------------------------------Blockip-fiter-list------------------------------------------------------------------------------------

const blockIPList = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admiID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid asminID" })
        }

        let findadmin = await adminModel.findOne({ _id: adminID })
        if (!findadmin) {
            return res.status(200).send({ Status: false, msg: "admin not found" })
        }

        let countpages = await BlockIP.find().sort({ createdAt: 1 })
        let totlaRow = countpages.length

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 5 } = req.query;


        if (req.body.IP) {
            console.log("else")
            let option = [{ IP: req.body.IP }]

            let countpages2 = await BlockIP.find({ $or: option }).sort({ createdAt: -1 })
            let contRow = countpages2.length
            console.log(contRow)
            let filter = await BlockIP.find({ $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            let counPages = Math.ceil(countpages.length / 10)
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, totalPages: 1, currenPage: parseInt(pageNO), filter })
        }

        if (!Object.keys(req.body).length <= 1) {
            console.log("if")

            let filter = await BlockIP.find().sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let counPages = Math.ceil(countpages.length / 10)

            return res.status(200).send({ status: false, totlaRow: totlaRow, totalPages: counPages, currenPage: parseInt(pageNO), filter })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//--------------------------------------------------update-limits---------------------------------------------------------------------------------//

const updatelimits = async (req, res) => {
    try {

        const adminID = req.params.adminID;
        const adminotplimit = req.body.AdminOTP
        const adminpasswordlimit = req.body.AdminPassword
        const agentotplimit = req.body.agentOTP
        const agentpasswordlimit = req.body.agentPassword
        const orgpasswordlimit = req.body.orgPassword
        const orgotplimit = req.body.orgOTP

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }


        if (!adminotplimit) {
            return res.status(200).send({ status: false, msg: "Please enter admin otp limit" })
        }
        if (!adminpasswordlimit) {
            return res.status(200).send({ status: false, msg: "Please enter admin password limit" })
        }

        if (agentotplimit === null) {
            console.log("full null")
        }


        // if (!agentotplimit) {
        //     return res.status(200).send({ status: false, msg: "Please enter agent otp limit" })
        // }
        if (!agentpasswordlimit) {
            return res.status(200).send({ status: false, msg: "Please enter agent password limit" })
        }
        if (!orgpasswordlimit) {
            return res.status(200).send({ status: false, msg: "Please enter organisation password limit" })
        }

        if (!orgotplimit) {
            return res.status(200).send({ status: false, msg: "Please enter organisation otp limit" })
        }


        if (!Object.keys(req.body).length) {
            return res.status(200).send({ status: false, msg: "please enter data to update" })
        }

        let data = {
            adminotplimit: adminotplimit, adminpasswordlimit: adminpasswordlimit,
            agentotplimit: agentotplimit, agentpasswordlimit: agentpasswordlimit, orgpasswordlimit: orgpasswordlimit,
            orgotplimit: orgotplimit
        }

        let updatedata = await adminModel.findOneAndUpdate({ _id: adminID }, data, { new: true })

        console.log(updatedata)
        if (!updatedata) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }

        return res.status(200).send({ status: true, msg: "data update sucessfully", updatedata })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//----------------------------------view-transection----------------------------------------------------------------------------------

const viewtransection = async (req, res) => {
    try {

        const ID = req.params.ID;

        if (!ID) {
            return res.status(200).send({ status: false, msg: "Please enter transection ID" })
        }

        if (ID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid transection ID" })
        }

        let filter = await transactionModel.findOne({ _id: ID })

        if (!filter) {
            return res.status(200).send({ status: faslse, msg: "no transection found" })
        }

        return res.status(200).send({ status: true, filter })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//-----------------------------------Admin-Profile-Update-----------------------------------------------------------------------------

const adminProfileUpdate = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        const data = req.body

        const { Firstname, email, password, lastName, phone, address, country, state
            , city, postCode } = data;


        let final = {
            Firstname: Firstname,
            lastName: lastName,
            email: email,
            password: password,
            lastName: lastName,
            phone: phone,
            address: address,
            country: country,
            state: state,
            city: city, postCode: postCode
        }

        let updateAdmin = await adminModel.findOneAndUpdate({ _id: adminID }, final, { new: true })

        return res.status(200).send({ status: true, msg: "admin profile update sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}





//------------------------------------------update-transection-limit----------------------------------------------------------------------

const updateAgentTransection = async (req, res) => {
    try {

        const agentID = req.body.agentID;
        const limit = req.body.limit;




        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            let customerRole = findRole.Agent.updateAgent

            if (customerRole == 0) {
                return res.status(200).send({ status: false, msg: "You are not allow to update transaction limit, Contact admin to access update transaction limit" })

            }

        }



        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agent ID" })
        }

        let findAgent = await AgentModel.findOne({ _id: agentID })

        if (!findAgent) {
            return res.status(200).send({ status: false, msg: "no agent found" })
        }

        if (findAgent.blocked == 1) {
            return res.status(200).send({ status: false, msg: "agent is blocked" })
        }

        if (findAgent.isDeleted == 1) {
            return res.status(200).send({ status: false, msg: "no agent found" })
        }


        let upadteAgent = await AgentModel.findOneAndUpdate({ _id: agentID }, { transectionLimit: limit })

        if (!upadteAgent) {
            return res.status(200).send({ staus: false, msg: "limit update process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "limit update sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//--------------------------------------------admin-dashboard-list-------------------------------------------------------------------------------

const admindash = async (req, res) => {
    try {

        let findcust = await customerModel.find();

        console.log(findcust.length)
        let totaluser = findcust.length

        let findtrans = await transactionModel.find()

        let sum = 0;
        for (let i of findtrans) {
            sum += i.sendingAmount
        }

        console.log(sum)

        let findorg = await Organisation.find()

        let sum1 = 0;
        for (let i of findorg) {
            sum1 += i.totlaLicense
        }

        let dashData = {
            totalUser: totaluser,
            totlaTransection: sum,
            totlaLicense: sum1


        }


        return res.status(200).send({ staus: true, msg: "dashboard updated", dashData })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------add-sub-admin---------------------------------------------------------------------------------

const addSubAgent = async (req, res) => {
    try {

        const addadmin = req.params.adminID;
        let data = req.body;

        const { Firstname, lastName, email, password, phone, address, country, state, city, postCode, otp, wrongOTP
            , wrongpassword, orgpasswordlimit, adminpasswordlimit, agentpasswordlimit,
            agentotplimit, adminotplimit, orgotplimit } = data

        if (!Firstname) {
            return res.status(200).send({ status: false, msg: "Please enter First Name" })
        }




    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------customer-detail-dash--------------------------------------------------------------------------

const custdetail = async (req, res) => {
    try {

        const custID = req.params.custID
        console.log("fghjk")

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }

        let findCust = await customerModel.findOne({ _id: custID })


        let findsendingAmount = await transactionModel.find({ senderID: custID })


        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await transactionModel.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }

        let totalAmount = sendindAmount + receiveAmount;

        let findtotalTransection = await transactionModel.find({ senderID: custID })
        let findtotlaTrans = await transactionModel.find({ recieverID: custID })

        var totalTransection = findtotalTransection.length + findtotlaTrans.length



        let findProfilePercentage = await customerModel.findOne({ _id: custID })

        let proPercentage = 0
        if (findProfilePercentage.biometric == 1) {
            proPercentage += 33
        }

        if (findProfilePercentage.fingerPrint == 1) {
            proPercentage += 33
        }

        if (findProfilePercentage.facialIdentification == 1) {
            proPercentage += 34
        }

        console.log(proPercentage)

        //var location = 0

        if (findCust.Latitude.length && findCust.Longitude.length) {
            proPercentage += 33
            var location = 1
        } else {
            var location = 0
        }




        let obj = {

            _id: findCust._id, IDphoto: findCust.IDphoto, fullname: findCust.fullname,
            dateOfBirth: findCust.dateOfBirth, biometric: findCust.biometric, fingerPrint: findCust.fingerPrint,
            facialIdentification: findCust.facialIdentification, phone: findCust.phone, city: findCust.city, age: findCust.age,
            email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: findCust.hash,
            owner: findCust.owner, privateKey: findCust.privateKey, walletAddress: findCust.walletAddress,
            professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
            createdBY: findCust.createdBY, imageDescriptions: findCust.imageDescriptions, Latitude: findCust.Latitude,
            Longitude: findCust.Longitude, digitalID: findCust.digitalID, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
            locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, totalTransection: totalTransection,
            sendindAmount: sendindAmount, receiveAmount: receiveAmount, proPercentage: proPercentage, totalAmount: totalAmount,
            landSize: findCust.landSize, nextFOKinName: findCust.nextFOKinName, nextFOKniPhone: findCust.nextFOKniPhone, Location: location

        }


        return res.status(200).send({ status: true, obj })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//-------------------------------verify-the-customer-------------------------------------------------------------------------------------


const verifyCustomer = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }

        let findAndUpdate = await customerModel.findOneAndUpdate({ _id: custID }, { status: 'verifyied' })

        if (!findAndUpdate) {
            return res.status(200).send({ status: false, msg: "not update please try again" })

        }

        return res.status(200).send({ status: false, msg: "customer verifyied sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const approvalDIDs = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 2 } = req.query;

        if (Object.keys(req.body).length <= 1) {


            let findCust11 = await customerModel.find({ digitalID: null })
            let findCust = await customerModel.find({ digitalID: null }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totalRaow1 = findCust11.length;

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), findCust })

        } else if (req.body.custID) {


            let option = [{ _id: req.body.custID }]

            let findCust11 = await customerModel.find({ $or: option, digitalID: null })
            let findCust = await customerModel.find({ $or: option, digitalID: null }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totalRaow1 = findCust11.length;

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), findCust })


        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}
//-------------------------------------------------BlockedIDS----------------------------------------------------------------------------------


const blockedIDS = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findBlockedIDs1 = await customerModel.find({ blocked: 1 })
        let totlaRow = findBlockedIDs1.length

        let findBlockedIDs = await customerModel.find({ blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let totalRaow1 = findBlockedIDs.length;

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: findBlockedIDs })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//----------------------------------------------------Blocked-organisation--------------------------------------------------------------------

const blockedOrglist = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findBlockedOrg1 = await Organisation.find({ blocked: 1 })

        let totalRow = findBlockedOrg1.length;

        let findBlockedOrg = await Organisation.find({ blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let totalRaow1 = findBlockedOrg.length;

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), data: findBlockedOrg })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------all-DIDs-------------------------------------------------------------------------------------


const getAllDIDs = async (req, res) => {
    try {


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let findCust12 = await customerModel.find({ "digitalID": { "$nin": [null, ""] } })

        let findDIDs11 = await customerModel.find({ "digitalID": { "$nin": [null, ""] } }).select({ _id: 1, fullname: 1, dateOfBirth: 1, email: 1, digitalID: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        console.log("findDIDs11 ==", findDIDs11)


        let totalRaow1 = findCust12.length;

        // console.log(result.length)

        return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), data: findDIDs11 })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ Status: false, msg: error.message })
    }
}
//----------------------------------------------recent-users---------------------------------------------------------------------------------


const recentUser = async (req, res) => {
    try {

        let findUser = await customerModel.find().select({ fullname: 1, phone: 1, email: 1, dateOfBirth: 1, status: 1 })

        let totalCustomer = findUser.length

        let final = findUser.slice(Math.max(findUser.length - 3, 0))

        console.log(final.length)

        return res.status(200).send({ status: true, totalCustomer: totalCustomer, final })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//-------------------------------------latest-transection--------------------------------------------------------------------

const recentTransection = async (req, res) => {
    try {

        let findUser = await transactionModel.find()

        let final = findUser.slice(Math.max(findUser.length - 3, 0))

        let totalTransection = findUser.length

        console.log(final.length)

        return res.status(200).send({ status: true, totalTransection: totalTransection, data: final })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//----------------------------------------admin-agents-blocked-lists-----------------------------------------------------------------

// const blockedAgentsList = async (req, res) => {
//     try{


//       let pageNO = req.body.page;
//         if (pageNO == 0) {
//             pageNO = 1
//         }
//         const { page = pageNO, limit = 10 } = req.query;

//         let findCust11 = await admin_agent.find({blocked: 1})

//         let totalRow = findCust11.length


//         let find = await admin_agent.find({blocked: 1})  .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .exec();

//         return res.status(200).send({status:true,  totlaRow: totalRow, currenPage: parseInt(pageNO), find})



//     }catch(error){
//         console.log(error)
//         return res.status(200).send({status:false, msg:""})
//     }
// }

//===================================================================================================================================
//-------------------------------------------Admin-agent------------------------------------------------------------------------------
//====================================================================================================================================

const adminAgent = async (req, res) => {
    try {

        let adminID = req.params.adminID;
        let data = req.body;

        const { firstName, lastName, email, phone, createdBy, city, state, country, password, confirmPass, commisionType, commissionAmount } = data

        let findadmin = await adminModel.findOne({ _id: adminID })

        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }


        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        if (!firstName) {
            return res.status(200).send({ status: false, msg: "Please enter first name" })
        }

        if (!lastName) {
            return res.status(200).send({ status: false, msg: "Please enter last name" })
        }
        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email name" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enterphone" })
        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let checkEmail = await admin_agent.findOne({ email: email })

        if (checkEmail) {
            return res.status(200).send({ status: false, mag: "email already register" })
        }

        let checkPhone = await admin_agent.findOne({ phone: phone })
        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "phone already register" })
        }



        if (!city) {
            return res.status(200).send({ status: false, msg: "Please enter city name" })
        }

        if (!state) {
            return res.status(200).send({ status: false, msg: "Please enter state name" })
        }

        if (!country) {
            return res.status(200).send({ status: false, msg: "Please enter country name" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })
        }

        if (!confirmPass) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (password !== confirmPass) {
            return res.status(200).send({ status: true, msg: "Please enter confirm password" })
        }

        let obj = {

            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            createdBy: adminID,
            city: city,
            state: state,
            country: country,
            password: password

        }

        let create = await admin_agent.create(obj)

        let obj1 = {
            agentID: create._id,
            type: commisionType,
            Amount: commissionAmount,
            startDate: create.createdAt,



        }

        let createCommissiin = await agent_Commission.create(obj1)

        return res.status(200).send({ statuss: true, msg: "Agent register sucessfully", data: create })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------view-admin_agent------------------------------------------------------------------------------

const viewAdminAgent = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findAgents1 = await admin_agent.find()


        let totlaRow = findAgents1.length

        let findAgents = await admin_agent.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: findAgents })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//------------------------------------------update-admin-agents-------------------------------------------------------------------------

const updateAdminAgent = async (req, res) => {
    try {

        let data = req.body

        const AgentID = req.params.agentID

        if (!AgentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (AgentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid " })
        }

        const { firstName, lastName, email, phone, createdBy, city, state, country, password, confirmPass } = data

        let obj = {
            firstName: firstName, lastName: lastName, email: email, phone: phone,
            city: city, state: state,
            country: country, password: password
        }


        let findAgent = await admin_agent.findOneAndUpdate({ _id: AgentID }, obj, { new: true })

        if (!findAgent) {
            return res.status(200).send({ status: true, msg: "process failed pleas try agian" })

        }

        return res.status(200).send({ status: true, msg: "agent updated sucessfully", findAgent })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------dlete-agent----------------------------------------------------------------------------

const deleteAgent = async (req, res) => {
    try {

        const AgentID = req.params.agentID

        if (!AgentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (AgentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid " })
        }

        let deleteAgent = await admin_agent.findOneAndUpdate({ _id: AgentID }, { isDeletd: 1 })

        if (!deleteAgent) {
            return res.status(200).send({ status: false, msg: "Failed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "agent deleted succesfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------admin-agents-blocked-lists-----------------------------------------------------------------

const blockedAgentsList = async (req, res) => {
    try {


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findCust11 = await admin_agent.find({ blocked: 1 })

        let totalRow = findCust11.length


        let find = await admin_agent.find({ blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), find })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "" })
    }
}



//----------------------------------------agent-performances--------------------------------------------------------------------------------

const agentPerformance = async (req, res) => {
    try {

        const agentID = req.params.custID

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter custID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------DIDs-reports-Organisation-------------------------------------------------------------------

const DIDsReports = async (req, res) => {
    try {

        const orgID = req.params.orgID

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (Object.keys(req.body).length <= 1) {

            let countpages1 = await customerModel.find({ createdBY: orgID }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await customerModel.find({ createdBY: orgID }).sort({ createdAt: -1 })
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

            let countpages2 = await customerModel.find({ createdBY: orgID, $or: option })
            let contRow = countpages2.length
            let filter = await customerModel.find({ createdBY: orgID, $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}













/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------SUB-ADMINS-------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addSubAdmin = async (req, res) => {
    try {


        const adminID = req.params.adminID;
        const data = req.body;



        const { Firstname, lastName, email, phone, createdBy, city, state, Country, address, password, confirmPassword, role } = data

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        if (!Firstname) {
            return res.status(200).send({ status: false, msg: "Please enter first name " })

        }

        if (!lastName) {
            return res.status(200).send({ status: false, msg: "Please enter last name " })

        }

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email " })

        }

        let checkemail = await adminModel.findOne({ email: email })

        if (checkemail) {
            return res.status(200).send({ status: false, msg: "email already register" })

        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone " })

        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let checkphone = await adminModel.findOne({ phone: phone })

        if (checkphone) {
            return res.status(200).send({ status: false, msg: "mobile number already register" })

        }

        if (!city) {
            return res.status(200).send({ status: false, msg: "Please enter city " })

        }

        if (!state) {
            return res.status(200).send({ status: false, msg: "Please enter state " })

        }

        if (!Country) {
            return res.status(200).send({ status: false, msg: "Please enter country " })

        }

        if (!address) {
            return res.status(200).send({ status: false, msg: "Please enter address " })

        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })

        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })

        }

        if (password !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your Confirm password not matched" })

        }

        if (!role) {
            return res.status(200).send({ status: false, msg: "please enter role" })

        }

        let obj = {
            Firstname: Firstname,
            lastName: lastName,
            email: email,
            phone: phone,
            createdBy: adminID,
            city: city,
            state: state,
            Country: Country,
            address: address,
            password: encryptedPassword,
            role: role

        }

        let create = await adminModel.create(obj)

        if (!create) {
            return res.status(200).send({ status: false, msg: "failed please try again" })
        }


        return res.status(200).send({ status: true, msg: "sub admin register sucessfullyy", create })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------add-sub-admin-role------------------------------------------------------------------------


const add_sub_admin_role = async (req, res) => {
    try {

        const adminID = req.params.adminID
        const subAdminID = req.params.subAdminID

        let checksubAdmin = await sub_Admin_Role.findOne({ adminID: subAdminID })



        if (checksubAdmin) {
            return res.status(200).send({ status: false, msg: "role already register, go to update role" })

        }

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        if (!subAdminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (subAdminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        let findSubAdmin = await adminModel.findOne({ _id: subAdminID, blocked: 0 })

        if (!findSubAdmin) {
            return res.status(200).send({ status: false, msg: "not found sub admin" })
        }

        let obj = {
            adminID: subAdminID,
            customer: {
                addCustomer: req.body.addCustomer,
                editCustomer: req.body.editCustomer,
                approveDID: req.body.approveDID,
                viewCustomer: req.body.viewCustomer,
                blockCustomer: req.body.blockCustomer,
                unBlockCustomer: req.body.unBlockCustomer,
                deleteCustomer: req.body.deleteCustomer,
                setcustomerOtpLimit: req.body.setcustomerOtpLimit,
                setCustomerPasswordLimit: req.body.setCustomerPasswordLimit,
                updateCustomer: req.body.updateCustomer
            },

            Organisation: {
                addOrganisation: req.body.addOrganisation,
                blockorganisation: req.body.blockorganisation,
                unBlockOrganisation: req.body.unBlockOrganisation,
                deleteOrganisation: req.body.deleteOrganisation,
                setOrgOptLimit: req.body.setOrgOptLimit,
                setOrgPasswordLimit: req.body.setOrgPasswordLimit,
                updateOrganisation: req.body.updateOrganisation
            },

            Agent: {
                addAgent: req.body.addAgent,
                blockAgent: req.body.blockAgent,
                unBlockAgent: req.body.unBlockAgent,
                deleteAgent: req.body.deleteAgent,
                setagentOtpLimit: req.body.setagentOtpLimit,
                setagentPasswordLimit: req.body.setagentPasswordLimit,
                updateAgent: req.body.updateAgent
            },

            IP: {
                IPblackListing: req.body.IPblackListing,
                IPwhiteListing: req.body.IPwhiteListing,

            },

            subAdmin: {
                addSubAdmin: req.body.addSubAdmin,
                blockSubAdmin: req.body.blockSubAdmin,
                unBlockSubAdmin: req.body.unBlockSubAdmin,
                deleteSubAdmin: req.body.deleteSubAdmin,
                updateSubAgent: req.body.updateSubAgent

            }
        }
        let create = await sub_Admin_Role.create(obj)
        return res.status(200).send({ status: true, msg: "role added sucessfully", create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------update-sub-admin-roles--------------------------------------------------------------------------------

const updateSubAdminRoles = async (req, res) => {
    try {

        const subAdminID = req.params.subAdminID

        if (!subAdminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (subAdminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        let checkID = await sub_Admin_Role.findOne({ adminID: subAdminID })


        if (!checkID) {
            return res.status(200).send({ status: false, msg: "not found sub admin" })
        }

        let obj = {
            adminID: subAdminID,
            customer: {
                addCustomer: req.body.addCustomer,
                editCustomer: req.body.editCustomer,
                approveDID: req.body.approveDID,
                viewCustomer: req.body.viewCustomer,
                blockCustomer: req.body.blockCustomer,
                unBlockCustomer: req.body.unBlockCustomer,
                deleteCustomer: req.body.deleteCustomer,
                setcustomerOtpLimit: req.body.setcustomerOtpLimit,
                setCustomerPasswordLimit: req.body.setCustomerPasswordLimit,
                updateCustomer: req.body.updateCustomer
            },

            Organisation: {
                addOrganisation: req.body.addOrganisation,
                blockorganisation: req.body.blockorganisation,
                unBlockOrganisation: req.body.unBlockOrganisation,
                deleteOrganisation: req.body.deleteOrganisation,
                setOrgOptLimit: req.body.setOrgOptLimit,
                setOrgPasswordLimit: req.body.setOrgPasswordLimit,
                updateOrganisation: req.body.updateOrganisation
            },

            Agent: {
                addAgent: req.body.addAgent,
                blockAgent: req.body.blockAgent,
                unBlockAgent: req.body.unBlockAgent,
                deleteAgent: req.body.deleteAgent,
                setagentOtpLimit: req.body.setagentOtpLimit,
                setagentPasswordLimit: req.body.setagentPasswordLimit,
                updateAgent: req.body.updateAgent
            },

            IP: {
                IPblackListing: req.body.IPblackListing,
                IPwhiteListing: req.body.IPwhiteListing,

            },

            subAdmin: {
                addSubAdmin: req.body.addSubAdmin,
                blockSubAdmin: req.body.blockSubAdmin,
                unBlockSubAdmin: req.body.unBlockSubAdmin,
                deleteSubAdmin: req.body.deleteSubAdmin,
                updateSubAgent: req.body.updateSubAgent

            }
        }
        let update = await sub_Admin_Role.findOneAndUpdate({ adminID: subAdminID }, obj, { new: true })

        if (!update) {
            return res.status(200).send({ status: false, msg: "Failed!, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Roles Updated Sucessfully", update })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}




//----------------------------------------------customer-verify------------------------------------------------------------------

const customerVerify = async (req, res) => {
    try {

        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        console.log(findsubAdminID)

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.customer.approveDID

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to verify customer, Contact admin to access verify customer" })

                }
            }

        }

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        let findcust = await customerModel.findOneAndUpdate({ _id: custID }, { status: "verified" })

        if (findcust) {
            return res.status(200).send({ status: true, msg: "customer verified sucessfully" })
        }



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//-------------------------------------------verify-organisation------------------------------------------------------------------------

const orgVerify = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.Organisation.updateOrganisation

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to verify customer, Contact admin to access verify customer" })

                }
            }

        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        let findcust = await Organisation.findOneAndUpdate({ _id: orgID }, { status: "verified" })

        if (findcust) {
            return res.status(200).send({ status: true, msg: "Organisation verified sucessfully" })
        }



    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------------admin-org-customer-----------------------------------------------------------------

const OrgCust = async (req, res) => {
    try {

        const custID = req.params.custID;
        console.log(custID)
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter cust ID" })
        }

        let findORg = await Organisation.findOne({ _id: custID })

        let name = findORg.name

        let findCust11 = await customerModel.find({ organisation: custID, isDeleted: 0, blocked: 0 })
        let findCust = await customerModel.find({ organisation: custID, isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let contRow = findCust11.length
        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), OrganisationName: name, findCust })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------------Fee-setup----------------------------------------------------------------------------

const addFeeSetup = async (req, res) => {

    try {
        const orgID = req.body.orgID

        const data = req.body;

        const { RecurringFees, Licences, LicenceFees } = data

        if (!RecurringFees) {
            return res.status(200).send({ status: false, msg: "Please enter Recurring Fees" })
        }

        if (!LicenceFees) {
            return res.status(200).send({ status: false, msg: "Please enter Fees" })
        }




        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }

        let findOrganisation = await Organisation.findOne({ _id: orgID, blocked: 0, isDeleted: 0 })

        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Organisation not found, maybe blocked or deleted" })
        }

        let orgName = findOrganisation.name;




        let obj = {
            OrganisationID: orgID,
            name: orgName,
            recuuringFees: RecurringFees,
            perLicenseFee: LicenceFees

        }

        let findOrg = await License_fee.create(obj)




        return res.status(200).send({ status: true, msg: "Fees Setup Sucessfully", findOrg })


    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------------------------add-customer----------------------------------------------------------------


//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

const createCustomerByAdmin = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.params.ID;

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


        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data

        console.log("organisation11", organisation)

        //------------------------------------Manage-Linked-service----------------------------------------------------------------------
        console.log("Phone11", phone)
        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
        console.log("trim", convert_Number)
        const cheack_cus = await temp_Cust.findOne({ phone: convert_Number })




        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }


        //---------------------------------------------------------------------------------------------------------------------------------





        let findcust = await customerModel.find({ organisation: organisation })
        let findOrg = await org_Licenses.findOne({ OrganisationID: organisation })

        if (findOrg.totalLicenses <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update your licenses" })

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

        let checkPhone = await temp_Cust.findOne({ phone: convert_Number })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
            //next();
        }


        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
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
        //  const profilePicture = await uploadFile(Idphoto[0])
        const local = await uploadFile(localDoc[2])
        const land = await uploadFile(ladregistration[3])

        // async function LoadModels() {
        //     // Load the models
        //     // __dirname gives the root directory of the server
        //     await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
        //     await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
        //     await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        // }

        //LoadModels();



        // let faces = await temp_Cust.find();

        // let faces = await FaceModel.find();
        // for (i = 0; i < faces.length; i++) {
        //     // Change the face data descriptors from Objects to Float32Array type
        //     for (j = 0; j < faces[i].imageDescriptions.length; j++) {
        //         //console.log(faces[i].imageDescriptions[j])
        //         faces[i].imageDescriptions[j] = new Float32Array(Object.values(faces[i].imageDescriptions[j]));
        //     }
        //     // Turn the DB face docs to
        //     faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].fullname, faces[i].imageDescriptions);
        // }

        // Load face matcher to find the matching face
        // const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

        // // Read the image using canvas or other method
        // const img1 = await canvas.loadImage(image);
        // let temp = faceapi.createCanvasFromMedia(img1);
        // // Process the image for the model
        // const displaySize = { width: img1.width, height: img1.height };
        // faceapi.matchDimensions(temp, displaySize);

        // // Find matching faces
        // const detections1 = await faceapi.detectAllFaces(img1).withFaceLandmarks().withFaceDescriptors();
        // const resizedDetections = faceapi.resizeResults(detections1, displaySize);
        // const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));


        // let ele = results.body

        //for (items of results) {
        // if (items._label == "unknown") {



        // fileUpload({ useTempFiles: true })


        // const descriptions = [];
        // const img = await canvas.loadImage(profilePicture);
        // const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        // descriptions.push(detections.descriptor);



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

            console.log("payload", payload)

            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;

        }

        doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()
        console.log(seq);



        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: organisation,
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

            //imageDescriptions: descriptions
        }

        let create = await temp_Cust.create(collection)


        // next();
        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })


        //rn res.status(200).send({ status: false, 'msg': 'face matched, please change your profile', results })
        //}
        // }

        return results;


        //const File1 = req.files.File1.tempFilePath;
        let result = await getDescriptorsFromDB(profilePicture);
        // if (!result) {


        //     // return res.status(200).send({ status: true, 'msg': 'face not matched', body: '' })
        // }
        // else
        //     return res.status(200).send({ status: true, 'msg': 'face matched, please change your profile', body: result })



    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

//------------------------------list-of-pending-Customer----------------------------------------------------------------------------------

const pendingCust = async (req, res) => {
    try {


        console.log("nm")
        let pageNO = req.body.page;
        console.log("==>", pageNO)
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        let findcust1 = await customerModel.find({ status: "pending", isDeleted: 0, blocked: 0 }).sort({ createdAt: -1 })
        let totalRow = findcust1.length
        if (Object.keys(req.body).length <= 1) {

            console.log("vbnmn")
            let findcust = await customerModel.find({ status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })

        }


        let option = [{ digitalrefID: req.body.digitalrefID }]
        let findcust = await customerModel.find({ $or: option, status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//-------------------------------------agent-reports-----------------------------------------------------------------------------------

const AgentReport = async (req, res) => {
    try {

        // const orgID = req.params.orgID
        //console.log(orgID)
        //let ID = orgID.toString();
        //console.log(ID);

        //let orgIIDD = '6321706c9e519284c9d77bd6'

        let pageNO = req.body.page;
        //let countpages1 = await agentModel.find({ organisationID: '6311a0de778efce58f2336db' })
        // console.log(countpages1)
        if (pageNO == 0) {
            pageNO = 1;
        }

        // if (!orgID) {
        //     return res.status(200).send({ status: false, msg: "Please enter agentID" })
        // }

        // if (orgID.length < 24) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        // }
        const { page = pageNO, limit = 10 } = req.query;
        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await agentModel.find({ isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;

            let filter = await agentModel.find({ isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }
        else if (req.body.name || req.body.phone || req.body.agentCode || req.body.country) {
            let option = [{ name: req.body.name }, { phone: req.body.phone }, { country: req.body.country }, { agentCode: req.body.agentCode }]


            let countpages2 = await agentModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await agentModel.find({ $or: option }).sort({ createdAt: -1 })
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

//----------------------------------------------recent-users---------------------------------------------------------------------------------


const recentAgentUser = async (req, res) => {
    try {

        const agentID = req.params.ID

        let findUser = await customerModel.find({ createdBY: agentID }).select({ fullname: 1, phone: 1, email: 1, dateOfBirth: 1, status: 1 })

        let users = findUser.length
        let result = [];
        let totalTransection = 0

        let tt = [];
        //let NumberOfTransection = tt.length
        for (let i of findUser) {

            let findTransection = await transactionModel.find({ senderID: i._id })

            for (i of findTransection) {
                tt.push(i)
            }
            // result.push(findTransection)



            for (let j of findTransection) {
                totalTransection += j.sendingAmount
            }

        }

        let NumberOfTransection = tt.length

        // console.log(totalTransection)

        // console.log(users)



        let totalCustomer = findUser.length

        let final = findUser.slice(Math.max(findUser.length - 3, 0))



        return res.status(200).send({ status: true, totalTransection, NumberOfTransection, totalCustomer: totalCustomer, final })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


// const recentAgentTransection = async (req, res) => {
//     try {

//         let findUser = await transactionModel.find()

//         let final = findUser.slice(Math.max(findUser.length - 3, 0))

//         let totalTransection = findUser.length

//         console.log(final.length)

//         return res.status(200).send({ status: true, totalTransection: totalTransection, data: final })




//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error.message })
//     }
// } 


//------------------------------------list-of--sub-admin----------------------------------------------------------------------------

const findSubAdmin = async (req, res) => {
    try {

        let find = await adminModel.find({ role: 'sub_Admin' })

        return res.status(200).send({ staus: true, find })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------sub-admin-roles-------------------------------------------------------------------------------

const subAdminRole = async (req, res) => {
    try {

        const Sub_admin_ID = req.params.adminID

        if (!Sub_admin_ID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID" })
        }

        if (Sub_admin_ID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }

        let find = await sub_Admin_Role.findOne({ adminID: Sub_admin_ID })

        if (!find) {
            return res.status(200).send({ status: false, msg: "no admin roles" })
        }

        return res.status(200).send({ status: true, find })



    } catch (error) {
        console.log(error)
        return rees.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------agrregation-------------------------------------------------------------------------------------

const agregateCust = async (req, res) => {
    try {

        let cust = await customerModel.aggregate([{ $match: { organisation: "6311a0de778efce58f2336db" } }])

        let transection = await transactionModel.find({ senderID: "634ea2268bccc0b4b9acdae8" })
        // { $group: { _id : '634ea2268bccc0b4b9acdae8', sending_Amount: { $sum: '$sendingAmount' }  } } 
        // ])

        let trans = await transactionModel.find({ senderID: "6347e7d5135b8cbde40c4384" })

        return res.status(200).send({ status: true, transection })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------org-licenses-inncrement--------------------------------------------------------------------------------

const orgLicenses = async (req, res) => {
    try {

        let orgID = req.params.orgID;

        console.log(orgID)

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findOrg = await Organisation.findOne({ _id: orgID })



        if (!findOrg) {
            return res.status(200).send({ status: false, msg: "org not found" })
        }

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
                subject: 'for update Licenses limit',
                text: `Hello! this is  ${findOrg.name} organisation of chromepay we want to update our Licenses Limit, please update.
                   Our Organisation ID = ${findOrg._id}`
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

        return res.status(200).send({ status: true, msg: "request add sucessfully! please wait for admin response" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------find-total-licenses-------------------------------------------------------------------------------

const findLicenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let find = await Organisation.findOne({ _id: orgID })

        let license = find.totlaLicense

        return res.status(200).send({ status: true, license })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------------update-Licenses------------------------------------------------------------------------------

const add_Licenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        const Licenses = req.body.Licenses

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findOrg_Licenses = await org_Licenses.findOne({ OrganisationID: orgID })


        let updateLicenses = findOrg_Licenses.totalLicenses

        let addLicenses = updateLicenses += parseInt(Licenses)

        console.log("===>", addLicenses)


        let update = await org_Licenses.findOneAndUpdate({ OrganisationID: orgID }, { totalLicenses: addLicenses, LicenseUpdateStatus: 1 }, { new: true })



        if (!update) {
            return res.status(200).send({ status: false, msg: "Organisation not have License Please add first organisation Licenses" })

        }



        return res.status(200).send({ status: true, msg: "Licenses add sucessfully", update })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------view-fee-setup-----------------------------------------------------------------------------------

const viewFee = async (req, res) => {
    try {

        const orgID = req.params.orgID;


        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findLicenseFees = await License_fee.findOne({ OrganisationID: orgID }).select({ recuuringFees: 1, perLicenseFee: 1 })

        return res.status(200).send({ status: true, findLicenseFees })


        //console.log(findLicenseFees)

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------update-fee-setup--------------------------------------------------------------------------------------------

const updateFee = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        const recurring = req.body.recurring;
        const perLicenseFee = req.body.perLicenseFee;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let update = await License_fee.findOneAndUpdate({ OrganisationID: orgID }, { recuuringFees: recurring, perLicenseFee: perLicenseFee }, { new: true })

        return res.status(200).send({ status: true, msg: "fee section update sucessfully", update })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------add-Organisation-document----------------------------------------------------------------------------

const addOrgDocument = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        // let recidence = req.files
        // let localDoc = req.files
        let document = req.files
        const type = req.body.type

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findOrg = await Organisation.findOne({ _id: orgID })

        let name = findOrg.name
        const Org_document = await uploadFile(document[0])


        let obj = {
            organisation_id: orgID,
            name: name,
            type: type,
            document: Org_document
        }

        let create = await org_Doc.create(obj)

        return res.status(200).send({ status: true, msg: "Organisation document upload sucessfully", create })






    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------remainig-licenses-------------------------------------------------------------------------------------

const find_Org_RemainingLicenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findCust = await customerModel.find({ organisation: orgID })
        let total_DIDs = findCust.length

        let totalCust = findCust.length;

        let findorg = await org_Licenses.findOne({ OrganisationID: orgID })

        let totalLicense = findorg.totalLicenses
        let name = findorg.name;
        let remaning_Licenses = totalLicense - totalCust

        if (remaning_Licenses <= 10) {

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

                    }
                });

                var mailOptions = {
                    from: 'chrmepay123@gmail.com',
                    to: 'sumit.hariyani2@gmail.com',
                    subject: 'Alert to update Licenses',
                    text: `Hello! ${name}, your Licenses for add customer is remainig ${remaning_Licenses} please contact admin to update your licenses`
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

        }

        if (remaning_Licenses < 10) {
            return res.status(200).send({ status: false, remaning_Licenses, total_DIDs, msg: "Your Remaning License is below 10 Please update your licenses for continue customer service" })
        }

        return res.status(200).send({ status: true, remaning_Licenses, total_DIDs })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------view-Organisation-documents-------------------------------------------------------------------------

const viewDoc = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findDoc = await org_Doc.findOne({ organisation_id: orgID })

        return res.status(200).send({ status: true, findDoc })


    } catch (error) {

        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })

    }

}

//----------------------------------------------org-low-License-list--------------------------------------------------------------------------

const findlowLicenseOrganisattions = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        const { page = pageNO, limit = 10 } = req.query;


        let findorg1 = await org_Licenses.find({ totalLicenses: { $lt: 15 } })
        let findorg = await org_Licenses.find({ totalLicenses: { $lt: 15 } }).populate('OrganisationID', { 'logo': 1, 'email': 1, 'phoneNo': 1, 'code': 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        let contRow = findorg1.length
        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findorg })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------admin-email-requests-By-Organisation---------------------------------------------------------------------------------


const emailRequestsByOrg = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        const { page = pageNO, limit = 10 } = req.query;

        //let findrequests1 = await admin_Email_request.find({ By: 'Organisation', status: "pending" })
        let findrequests = await admin_Email_request.find({ By: 'Organisation', status: "pending" })
        // .limit(limit * 1)
        //     .skip((page - 1) * limit)
        //     .exec()

        //let contRow = findrequests1.length

        return res.status(200).send({ status: true, findrequests })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------Customer-Bank--------------------------------------------------------------------------------------

const customer_bank = async (req, res) => {
    try {

        const custID = req.params.custID

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID" })
        }

        let findCust = await customer_Bank.find({ customerID: custID }).populate('customerID', { 'IDphoto': 1, 'fullname': 1, 'phone': 1, 'email': 1, })

        for (let i of findCust) {
            console.log("custID", i.customerID._id)
        }

        return res.status(200).send({ status: true, findCust })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------admin-email-request-By-agent---------------------------------------------------------------------

const agentEmailRequest = async (req, res) => {
    try {
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }
        const { page = pageNO, limit = 10 } = req.query;


        let findrequests1 = await admin_Email_request.find({ By: 'Agent' })
        let findrequests = await admin_Email_request.find({ By: 'Agent' }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        let contRow = findrequests1.length

        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findrequests })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------find-bank-with-customer-------------------------------------------------------------------------------


const bankWithCust = async (req, res) => {
    try {

        const BankID = req.params.BankID

        if (!BankID) {
            return res.status(200).send({ status: false, msg: "Please enter Bank ID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Bank ID" })
        }

        let findCust = await customer_Bank.findOne({ _id: BankID }).populate('customerID', { 'IDphoto': 1, 'fullname': 1, 'phone': 1, 'email': 1, })

        if (findCust.suspend == 1) {
            return res.status(200).send({ status: true, findCust, suspend: 1, msg: "This Account Is Blocked By Admin" })
        }

        return res.status(200).send({ status: true, findCust })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------BLOCK-BANK---------------------------------------------------------------------------------

const Block_Bank = async (req, res) => {

    try {

        const BankID = req.params.BankID

        if (!BankID) {
            return res.status(200).send({ status: false, msg: "Please enter Bank ID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Bank ID" })
        }

        let findCust = await customer_Bank.findOneAndUpdate({ _id: BankID }, { suspend: 1 })

        return res.status(200).send({ status: true, msg: "Bank Block Successfully " })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------BLOCK-BANK---------------------------------------------------------------------------------

const Un_Block_Bank = async (req, res) => {

    try {

        const BankID = req.params.BankID

        if (!BankID) {
            return res.status(200).send({ status: false, msg: "Please enter Bank ID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Bank ID" })
        }

        let findCust = await customer_Bank.findOneAndUpdate({ _id: BankID }, { suspend: 0 })

        return res.status(200).send({ status: true, msg: "Bank Un Block Successfully " })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------------Org-Cust-Chart-by-Month------------------------------------------------------------------------------

const OrgChart = async (req, res) => {
    try {

        let find = await Organisation.find().select({ name: 1 });

        let result = [];

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]
            for (let i of find) {
                let findCust = await customerModel.find({ $or: option, organisation: i._id })

                result.push({ ...i._doc, customers: findCust.length })
            }


            let sorted = result.sort(function (c1, c2) {
                if (c1.customers < c2.customers) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })

        } else {
            for (let i of find) {
                let findCust = await customerModel.find({ organisation: i._id })

                result.push({ ...i._doc, customers: findCust.length })
            }


            let sorted = result.sort(function (c1, c2) {
                if (c1.customers < c2.customers) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })


        }






    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------org-transection-chart---------------------------------------------------------------------------------

const OrgTransectionChart = async (req, res) => {
    try {

        let find = await Organisation.find().select({ name: 1 });

        let result = [];


        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]
            for (let i of find) {
                let findCust = await transactionModel.find({ $or: option, OrganisationID: i._id })

                result.push({ ...i._doc, Transections: findCust.length })
            }


            let sorted = result.sort(function (c1, c2) {
                if (c1.Transections < c2.Transections) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })

        } else {

            for (let i of find) {
                let findCust = await transactionModel.find({ OrganisationID: i._id })

                result.push({ ...i._doc, Transections: findCust.length })
            }

            let sorted = result.sort(function (c1, c2) {
                if (c1.Transections < c2.Transections) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------Customer-organisation's------------------------------------------------------------------------------------

const cust_organisation = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }
        if (custID.length == 0) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }
        let find_Oragnsiations = await customerModel.findOne({ _id: custID })
        let Organisations = find_Oragnsiations.organisation
        let result = [];
        for (let i of Organisations) {
            let find_Org = await Organisation.find({ _id: i }).select({ name: 1, logo: 1, })
            result.push(find_Org)
        }

        let final = []
        for (let organisations of result) {
            for (let org of organisations) {
                final.push(org)
            }
        }

        return res.status(200).send({ status: true, final })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------chrome_pay_logs--------------------------------------------------------------------------------------

const chrome_pay_logs = async (req, res) => {
    try {

        const API_HIS = await api_his.find();
        data = req.body;
        const { IP, Category, toDate, fromDate, status } = data

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        //---------------------------------------------------------------------------------------

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await api_his.find().sort({ createdAt: -1 })
            let totalRaow1 = countpages1.length;
            let filter = await api_his.find().sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // let totlaRow = filter.length;
            if (filter.length == 0) {
                return res.status(200).send({ status: false, msg: "No Customer Found" })
            }
            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }

        let option = [{ IPAdress: IP }, { BY: Category }, { status: status }]
        let countpages2 = await api_his.find({ $or: option })
        let contRow = countpages2.length
        const filter = await api_his.find({ $or: option }).sort({ time: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();



        //------------------------------date-filter--------------------------------------------------------

        if (req.body.fromDate) {

            let option = [

                {
                    time: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }

            ]


            let countpages2 = await api_his.find({ $or: option })
            let contRow = countpages2.length
            let filter = await api_his.find({ $or: option }).sort({ time: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })

    }
}


//------------------------------------------------get-force-ips---------------------------------------------------------------------------------

const Force_IP_Block = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

var fs = require('fs')

//-------------------------------------------dummy-image-----------------------------------------------------------------------------------
//var sharp = require('sharp')
const dummy_images = require("../models/Dummy_images")
const dummy_image = async (req, res) => {
    try {

        let files = req.files
        let url = "data:image/jpeg;base64,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"
        const data1 = "user";
        const buff = Buffer.from(data1, url);
        await fs.writeFileSync('felix.jpeg', buff);



        let data = {
            image: profilePicture
        }

        let create = await dummy_images.create(data)

        return res.status(200).send({ status: true, create })

    } catch (error) {
        console.log(error)
    }
}

//------------------------------------get-last-10-sec-data-------------------------------------------------------------------------------------

const getlast10sec = async (req, res) => {
    try {

        let date = new Date();
        let create_day = date.getDate();
        let create_month = date.getMonth();
        let create_year = date.getFullYear();
        let create_hours = date.getHours();
        let create_minute = date.getMinutes();
        let creeate_seconds = date.getSeconds();

        console.log("MMMMMMMMM", `${create_hours} - ${create_minute} - ${creeate_seconds}`)
        console.log("MMMMMMMMM", `${create_hours} - ${create_minute} - ${creeate_seconds - 10}`)
        let make_date = `${create_year}-${create_month}-${create_day}T${create_hours}:${create_minute}:${creeate_seconds - 10}.56Z`

        console.log("make_date", make_date)
        console.log("d", date)
        let find = await api_his.find({ createdAt: { $gt: new Date(make_date) } })
        //.sort({ x: 1 });
        return res.status(200).send({ status: true, find })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------get-all-loans-----------------------------------------------------------------------------------------------------

const get_all_loans = async (req, res) => {
    try {

        let find_loans = await Lons_Model.find();
        let find_Numbers = find_loans.length

        return res.status(200).send({ status: true, find: find_Numbers })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------Block-sub-admin----------------------------------------------------------------------------------

const Block_sub_admin = async (req, res) => {
    try {

        const sub_admin_id = req.params.sub_admin_ID;

        if (!sub_admin_id) {
            return res.staus(200).send({ sataus: false, msg: "Please enter sub admin iD" })
        }

        if (sub_admin_id.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid sub admin ID" })
        }

        let findAndBlock = await adminModel.findByIdAndUpdate({ _id: sub_admin_id }, { blocked: 1 })

        if (!findAndBlock) {
            return res.status(200).send({ status: false, msg: "Failed! Please try again" })
        }

        return res.status(200).send({ status: true, msg: "sub admin blocked sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------------Un-block-subadmin----------------------------------------------------------------------------

const Unblock_sub_admin = async (req, res) => {
    try {

        const sub_admin_id = req.params.sub_admin_ID;

        if (!sub_admin_id) {
            return res.staus(200).send({ sataus: false, msg: "Please enter sub admin iD" })
        }

        if (sub_admin_id.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid sub admin ID" })
        }

        let findAndBlock = await adminModel.findByIdAndUpdate({ _id: sub_admin_id }, { blocked: 0 })

        if (!findAndBlock) {
            return res.status(200).send({ status: false, msg: "Failed! Please try again" })
        }

        return res.status(200).send({ status: true, msg: "sub admin Un-blocked sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------admin_read_notification-------------------------------------------------------------------------

const admin_read_notification = async (req, res) => {
    try {

        const notification_ID = req.params.ID;

        let find_notification = await admin_Email_request.findOneAndUpdate({ _id: notification_ID }, { status: "Read" })

        if (find_notification) {
            return res.status(200).send({ status: true })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------admin-cust-graph----------------------------------------------------------------------------------

const get_admin_cust_data_graph = async (req, res) => {
    try {



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await customerModel.find({ $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })

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

module.exports.createAdmin = createAdmin;
module.exports.AdminLogin = AdminLogin;
module.exports.getHistory = getHistory;
module.exports.adminLogout = adminLogout;
module.exports.LoginAdmin = LoginAdmin;
module.exports.admin_login = admin_login;
module.exports.verifyOTP = verifyOTP;
module.exports.OrganisationList = OrganisationList;
module.exports.SuspendOrganisation = SuspendOrganisation;
module.exports.Un_suspend_Organisation = Un_suspend_Organisation;
module.exports.deleteOrganisation = deleteOrganisation;
module.exports.AdminCustomerList = AdminCustomerList;
module.exports.suspendCustomer = suspendCustomer;
module.exports.UnsuspendCustomer = UnsuspendCustomer;
module.exports.DeleteCustomer = DeleteCustomer;
module.exports.UnBlockIP = UnBlockIP;
module.exports.AdminTransectionList = AdminTransectionList;
module.exports.admintransectionfillter = admintransectionfillter;
module.exports.adminProfile = adminProfile;
module.exports.changePassword = changePassword;
module.exports.forgotpassword = forgotpassword;
module.exports.changePasswordotp = changePasswordotp;
module.exports.CreateIPs = CreateIPs;
module.exports.blockIPList = blockIPList;
module.exports.updatelimits = updatelimits;
module.exports.viewtransection = viewtransection;
module.exports.adminProfileUpdate = adminProfileUpdate;
module.exports.updateAgentTransection = updateAgentTransection;
module.exports.admindash = admindash;
module.exports.custdetail = custdetail;
module.exports.verifyCustomer = verifyCustomer;
module.exports.approvalDIDs = approvalDIDs;
module.exports.blockedIDS = blockedIDS;
module.exports.blockedOrglist = blockedOrglist;
module.exports.getAllDIDs = getAllDIDs;
module.exports.recentUser = recentUser;
module.exports.recentTransection = recentTransection;
//module.exports.blockedAgentsList = blockedAgentsList;
module.exports.agentPerformance = agentPerformance
module.exports.DIDsReports = DIDsReports;
module.exports.adminAgent = adminAgent;
module.exports.viewAdminAgent = viewAdminAgent;
module.exports.updateAdminAgent = updateAdminAgent;
module.exports.deleteAgent = deleteAgent;
module.exports.blockedAgentsList = blockedAgentsList;
module.exports.addSubAdmin = addSubAdmin
module.exports.add_sub_admin_role = add_sub_admin_role
module.exports.updateSubAdminRoles = updateSubAdminRoles
module.exports.customerVerify = customerVerify;
module.exports.orgVerify = orgVerify;
module.exports.OrgCust = OrgCust;
module.exports.addFeeSetup = addFeeSetup;
module.exports.createCustomerByAdmin = createCustomerByAdmin
module.exports.pendingCust = pendingCust
module.exports.AgentReport = AgentReport
module.exports.recentAgentUser = recentAgentUser;
//module.exports.recentAgentTransection = recentAgentTransection
module.exports.findSubAdmin = findSubAdmin;
module.exports.subAdminRole = subAdminRole;
module.exports.agregateCust = agregateCust;
module.exports.orgLicenses = orgLicenses;
module.exports.findLicenses = findLicenses;
module.exports.add_Licenses = add_Licenses;
module.exports.viewFee = viewFee;
module.exports.updateFee = updateFee;
module.exports.addOrgDocument = addOrgDocument;
module.exports.find_Org_RemainingLicenses = find_Org_RemainingLicenses;
module.exports.viewDoc = viewDoc;
module.exports.findlowLicenseOrganisattions = findlowLicenseOrganisattions;
module.exports.emailRequestsByOrg = emailRequestsByOrg;
module.exports.customer_bank = customer_bank;
module.exports.agentEmailRequest = agentEmailRequest;
module.exports.bankWithCust = bankWithCust;
module.exports.Block_Bank = Block_Bank;
module.exports.Un_Block_Bank = Un_Block_Bank;
module.exports.OrgChart = OrgChart
module.exports.OrgTransectionChart = OrgTransectionChart;
module.exports.cust_organisation = cust_organisation;
module.exports.chrome_pay_logs = chrome_pay_logs;
module.exports.Force_IP_Block = Force_IP_Block
module.exports.dummy_image = dummy_image
module.exports.getlast10sec = getlast10sec
module.exports.get_all_loans = get_all_loans
module.exports.Block_sub_admin = Block_sub_admin
module.exports.Unblock_sub_admin = Unblock_sub_admin
module.exports.admin_read_notification = admin_read_notification
module.exports.get_admin_cust_data_graph = get_admin_cust_data_graph