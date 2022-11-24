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
            return res.status(400).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
        }

        //---------Login_History-------------//
        let adminID = checkEmail._id

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

        let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: 0 })
        res.status(200).send({ status: true, 'ID': adminID, msg: "OTP send sucessfully" })
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
                    pass: 'zawuovwktnkeejlg',
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
            let countpages1 = await customerModel.find({ isDeleted: 0, blocked: 0, }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await customerModel.find({ isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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
            let countpages2 = await customerModel.find({ isDeleted: 0, blocked: 0, })
            let contRow = countpages2.length
            let filter = await customerModel.find({ isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, })
            let contRow = countpages2.length
            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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
            let countpages3 = await customerModel.find({ $or: option, blocked: 0, })
            let contRow3 = countpages3.length

            let filter = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
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
                    pass: 'zawuovwktnkeejlg',
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

        console.log("totalTransection ==", totalTransection)

        console.log("sendindAmount===", sendindAmount)

        console.log("receiveAmount ===", receiveAmount)

        console.log("totalAmount ===", totalAmount)



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

        //  console.log(location)



        // let find11 = await customerModel.find()

        // let data = [

        //     name11 = "styam"

        // ]

        // let result = data.includes(name11)
        // console.log("inckude ===",result)




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

        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        console.log("Phone", phone)
        const cheack_cus = await temp_Cust.findOne({ phone: phone })
        console.log("AGENT_JAMES", cheack_cus)

        if (cheack_cus) {

            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })

        }


        //---------------------------------------------------------------------------------------------------------------------------------





        let findcust = await customerModel.find({ organisation: organisation })
        let findOrg = await org_Licenses.findOne({ OrganisationID: organisation })

        console.log("cutomer==", findcust.length)
        console.log("cutomer license==", findOrg.totalLicenses)

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
                phoneNumber: `+91${phone}`
            }

            console.log("payload", payload)

            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
            // console.log(data1);
        }

        doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()
        console.log(seq);



        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: phone, city: city, age: age,
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


        const custID = req.params.custID;
        console.log('====', custID)
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        let findcust1 = await customerModel.find({ status: "pending" }).sort({ createdAt: -1 })
        let totalRow = findcust1.length
        let findcust = await customerModel.find({ status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
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
                    pass: 'zawuovwktnkeejlg',
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
                        pass: 'zawuovwktnkeejlg',

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
            return res.status(200).send({ status: false, remaning_Licenses, msg: "Your Remaning License is below 10 Please update your licenses for continue customer service" })
        }

        return res.status(200).send({ status: true, remaning_Licenses })



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

        let findrequests1 = await admin_Email_request.find({ By: 'Organisation' })
        let findrequests = await admin_Email_request.find({ By: 'Organisation' }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        let contRow = findrequests1.length

        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findrequests })



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
        let url = "data:image/png;base64,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"
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