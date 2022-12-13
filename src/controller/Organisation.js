
const Organisation = require("../models/Organisation")
const adminModel = require("../models/AdminModel");
const cutomerModel = require("../models/customer");
const organisationLog = require("../models/Organisationlog")
const transectionModel = require("../models/transaction");
const agentModel = require('../models/AgentModel')
const { uploadFile } = require("../aws/aws.js");
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');
const { count } = require("../models/userModel");
const { find } = require("../models/blockedIPs");
const BlockIP = require("../models/blockedIPs")
var ip = require('ip');
var axios = require('axios')
const temp_Cust = require("../models/temp_Cust")
const { Canvas, Image } = require("canvas");
const faceapi = require("face-api.js");
const canvas = require("canvas");
var fileUpload = require("express-fileupload");
faceapi.env.monkeyPatch({ Canvas, Image });
const subAdmin = require("../models/AdminModel")
const sub_admin_role = require("../models/subAdminRole");
const { findByIdAndRemove } = require("../models/customerBank");
const org_Licenses = require("../models/OrgLicenses")
const License_fee = require("../models/org_LicensesFees")
const admin_Email_request = require("../models/adminEmail")
const customerModel = require("../models/customer")
const agent_Commission = require("../models/agentCommission")
const agent_Commission_His = require("../models/AgentCommissinHistory")
const Organisation_Loans = require("../models/OrgLoans")
const Organisation_Loans_Interestrate = require("../models/LoanIntrestRate")
const Loan_applay_customer = require("../models/Loan_apllied_by")
const Installment_Process = require("../models/LoanInsatallMent");
const LoanInsatallMent = require("../models/LoanInsatallMent");
const bcrypt = require("bcrypt")
const cust_wallet_Model = require("../models/Cust_Wallet")
const nodemailer = require('nodemailer')
const Blocked_Notes = require("../models/Blocked_DID_Notes");
const Delete_Notes = require("../models/Delete_DID_Notes");
const AgentModel = require("../models/AgentModel");
const Delete_DID_Notes = require("../models/Delete_DID_Notes");






//-----------------------------------generate Code---------------------------------------------------------------------------------------

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//--------------------------------------------------------------------------------------------------------------------------------------------
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

//------------------------------------generate-accessKey-----------------------------------------------------------------------------------------

const AccessKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateAccesskey(length) {
    let result = '';
    const charactersLength = AccessKey.length;
    for (let i = 0; i < length; i++) {
        result += AccessKey.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------generate-Sceret-Key-----------------------------------------------------------------------------------------

const SecretKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/#@';

function generateSeceret(length) {
    let result = '';
    const charactersLength = SecretKey.length;
    for (let i = 0; i < length; i++) {
        result += SecretKey.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------



const createOrganisation = async (req, res, next) => {
    try {
        url = "http://localhost:3000/Organisation";
        // next();
        let data = req.body;
        let files = req.files;
        const adminID = req.params.adminID

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid admin ID" })
        }

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.Organisation.addOrganisation

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to add organisation, Contact admin to access add organisation" })

                }

            }

        }




        const { logo, code, name, phone, email, country, city, joiningDate, postCode, address, password, totlaLicense,
            Personal_Loans, secured_Loans, Insatallment_Loans, Student_Loans, Home_Loans, BussinessLoans, PensionLoans,
            PaydeyLoans, AssetLoans, OvercraftLoans } = data



        let Code = generateString(10);
        let Orgpassword = generateString1(8)
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(Orgpassword, saltRounds)
        let JoiningDate = new Date().toISOString().substring(0, 10)


        const profilePicture = await uploadFile(files[0])



        if (!name) {
            return res.status(200).send({ status: false, msg: "Please Enter Name" })
        }

        if (!postCode) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await Organisation.findOne({ phoneNo: phone })


        if (checkPhone)
            return res.status(200).send({ status: false, msg: "Number already register " })
        //next();

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })

        }

        if (!totlaLicense) {
            return res.status(200).send({ status: false, msg: "Please enter Licenses" })

        }


        if (!(/^\d{10}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }



        let checkEmail = await Organisation.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }



        const nodemailer = require("nodemailer");

        const AccessKey = generateAccesskey(20)
        const SceretKey = generateSeceret(30)




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
                subject: 'From Chromepay',
                text: ` Hello! ${name} Welcome to ChromePay family your Password for Login is ${Orgpassword} 
                 your secret Access Key = ${SceretKey} and Your access Key Id = ${AccessKey} do not share this Information to anyone `

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

        let finalData = {
            logo: profilePicture, code: Code, name: name, phoneNo: phone, email: email,
            country: country, city: city, joiningDate: JoiningDate,
            postCode: postCode, address: address, password: encryptedPassword, totlaLicense: totlaLicense, accessKeyId: AccessKey,
            secretAccessKey: SceretKey
        }

        let create = await Organisation.create(finalData);

        let Loans = {
            OrganisationID: create._id,

            TypeOfLoans: {
                Personal_Loans: Personal_Loans,
                secured_Loans: secured_Loans,
                Insatallment_Loans: Insatallment_Loans,
                Student_Loans: Student_Loans,
                Home_Loans: Home_Loans,
                BussinessLoans: BussinessLoans,
                PensionLoans: PensionLoans,
                PaydeyLoans: PaydeyLoans,
                AssetLoans: AssetLoans,
                OvercraftLoans: OvercraftLoans
            }
        }

        let IntersetRate = {
            OrganisationID: create._id
        }


        let cerate_Interest = await Organisation_Loans_Interestrate.create(IntersetRate)

        let createLoans = await Organisation_Loans.create(Loans)





        let orgID = create._id

        let obj = {
            OrganisationID: orgID,
            name: name,
            totalLicenses: totlaLicense


        }

        let createLicenses = await org_Licenses.create(obj)


        return res.status(201).send({ status: true, msg: "Register Sucessfully", data: create, Loans: createLoans })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}


//----------------------------------------------------Organisation-Login-------------------------------------------------------------------------//

const organisationLogin = async (req, res, next) => {
    try {
        url = "http://localhost:3000/Login";
        //next();
        const email = req.body.email;
        const password = req.body.password;
        if (!email) {
            return res.status(200).send({ status: false, msg: "email field required" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "password field required" })
        }

        let findData = await Organisation.findOne({ email: email })


        if (!findData) {
            let time = Date.now();
            let UserIP = ip.address()
            return res.status(200).send({ status: false, msg: "Please enter valid email" })

        }

        const decryptedPassword = await bcrypt.compare(password, findData.password)

        if (!decryptedPassword) {
            let time = Date.now();
            let UserIP = ip.address()
            let data = {
                name: findData.name,
                email: email,
                ID: findData._id,
                loginTime: time,
                IP: UserIP,
                status: "Please enter valid email"

            };

            let admindata = await adminModel.findOne();
            let currStatus = await Organisation.findOne({ email: email })
            let wrongCount = currStatus.WrongPassword + 1;
            let update = await Organisation.findOneAndUpdate({ email: email }, { WrongPassword: wrongCount })
            let remainingchance = admindata.orgpasswordlimit - update.WrongPassword

            if (update.WrongPassword >= admindata.orgpasswordlimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await Organisation.findOneAndUpdate({ email: email }, { WrongPassword: 0 })

                setTimeout(async () => {
                    let UserIP = ip.address()
                    let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                }, "10000")

                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

            }

            let createLogHistory = await organisationLog.create(data)
            return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });


        }

        let OrganisationID = findData._id;
        let name = findData.name;
        let phone = findData.phoneNo;
        let accessKeyId = findData.accessKeyId;
        let secretAccessKey = findData.secretAccessKey

        if (!findData.accessKeyId) {
            return res.status(200).send({ status: false, msg: "Missing access key" })
        }

        if (!findData.secretAccessKey) {
            return res.status(200).send({ status: false, msg: "Missing secret access Key" })
        }

        let token = jwt.sign({ OrganisationID, name, email, phone, accessKeyId, secretAccessKey }, 'organisation')
        res.header("x-api-key", token);

        if (findData) {
            let time = Date.now();
            let UserIP = ip.address()

            let data = {
                name: findData.name,
                email: email,
                ID: findData._id,
                loginTime: time,
                IP: UserIP,
                status: "Login Sucessfully"

            };

            let createLogHistory = await organisationLog.create(data)


            let update = await Organisation.findOneAndUpdate({ email: email }, { WrongPassword: 0 })
            return res.status(200).send({ status: true, 'token': token, 'ID': OrganisationID, msg: "Login Sucessfully" })
        } else {
            return res.status(200).send({ status: false, 'msg': "Invalid Data" })
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: { error } })
    }
}






//----------------------------------------------get-organisation-log-history---------------------------------------------------------------------

const getLogHistory = async (req, res) => {
    try {

        url = "http://localhost:3000/getHistory";


        //-----------------Pagination-----------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await organisationLog.find();
        counPages = Math.ceil(countpages11.length / 10)




        let findHistory = await organisationLog.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let result = []
        for (items of findHistory) {

            let data = {
                Name: items.name,
                Email: items.email,
                ID: items.ID,
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

//---------------------------------------------------------Organisation-Dashboard-api-------------------------------------------------------------

const Organisationdashboard = async (req, res) => {

    try {

        const OrganisationID = req.params.ID;
        const CustomerName = req.body.customerName;
        const status = req.body.Status

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        if (OrganisationID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        let options = [{ fullname: req.body.customerName }, { status: req.body.status }]

        const { page = pageNO, limit = 5 } = req.query;
        if (!Object.keys(req.body).length) {

            let countpages2 = await cutomerModel.find({ organisation: OrganisationID }).sort({ createdAt: -1 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ organisation: OrganisationID }).sort({ createdAt: -1 }).sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        } else if (req.body.name || req.body.category) {
            let option = [{ fullname: req.body.name }, { status: req.body.category }]

            let countpages2 = await cutomerModel.find({ organisation: OrganisationID, $or: option }).sort({ createdAt: -1 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ organisation: OrganisationID, $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })


        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//-----------------------------------Organisation-dashboard-transection---------------------------------------------------------------------------------//

const organisationsTransection = async (req, res) => {
    try {

        const organisationID = req.params.ID;


        if (!organisationID) {
            return res.status(200).send({ status: false, msg: ' not geting OrganisationID ' })
        }
        const { page = 1, limit = 5 } = req.query;
        let filter = await transectionModel.find({ OrganisationID: organisationID }).sort({ createdAt: -1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
            //.sort({ createdAt: -1 })

        return res.status(200).send({ status: true, data: filter })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//----------------------------------Organisation-Dashboard-section--------------------------------------------------------------------------------

const OrgDashSection = async (req, res) => {
    try {

        const organisationID = req.params.ID;

        if (!organisationID) {
            return res.status(200).send({ Status: false, msg: "Not Geting Organisation ID" })
        }

        let findName = await Organisation.findOne({ _id: organisationID })
        let orgName = findName.name
        let orgEmail = findName.email
        let country = findName.country

        let findUsers = await transectionModel.find({ OrganisationID: organisationID });




        //-------------------------users-and-totaltransections---------------------------
        let totalTransection = 0;
        let count = 0
        for (items of findUsers) {
            totalTransection += items.sendingAmount
            count++;
        }

        //--------------------------find-total-use--------------------------------------------

        let finduser = await cutomerModel.find({ organisation: organisationID })

        let numberOFUSer = 0;
        for (Element of finduser) {
            numberOFUSer++
        }



        let data = {
            name: findName.name,
            totlaLicense: findName.totlaLicense,
            totalUser: numberOFUSer,
            totalTransection: count,
            email: orgEmail,
            country: country,
            image: findName.logo
        }

        console.log("data", data)

        return res.status(200).send({ status: true, data: data })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}




//-----------------------------------Organisation-Transection-list---------------------------------------------------------------------------------//

const organisationsTransectionList = async (req, res) => {
    try {

        const organisationID = req.query.ID;




        if (!organisationID) {
            return res.status(200).send({ status: false, msg: ' not geting OrganisationID ' })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;



        if (!Object.keys(req.body).length) {
            const { page = 1, limit = 10 } = req.query;
            let filter = await transectionModel.find({ OrganisationID: organisationID, }).sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            return res.status(200).send({ status: true, filter })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


//----------------------------------Organisation-Test-Filter-Data-Customer----------------------------------------------------------------------------



const OrganisationCustomerTest = async (req, res) => {

    try {
        const OrganisationID = req.params.ID;
        const CustomerName = req.body.customerName;
        const status = req.body.Status



        let countpages = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }
        else if (req.body.ID.length <= 0 && req.body.phone.length <= 0 && req.body.phone.length <= 0 && req.body.status.length <= 0 && req.body.nationality.length <= 0 && req.body.fromDate.length <= 0 && req.body.toDate.length <= 0) {
            let countpages2 = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }


        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        } else if (req.body.ID.length > 2) {


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

        else {

            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, organisation: OrganisationID })
            let contRow3 = countpages3.length

            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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

//----------------------------------------------Delete-Customer---------------------------------------------------------------------------------

const DeleteCustomer = async (req, res) => {
    try {

        const customerID = req.params.ID
        const Note = req.body.note

        console.log("1231231231231")

        if (!customerID.length) {
            return res.status(200).send({ status: false, msg: "Customer Id is required" })
        }

        let findCUstomer = await cutomerModel.findOne({ _id: customerID })
        if (!findCUstomer) {
            return res.status(200).send({ status: false, msg: "Customer not found" })
        }

        if (findCUstomer.isDeleted == 1) {
            return res.status(200).send({ Status: false, msg: "Customer already deleted" })
        }

        let obj = {
            customerID: req.params.ID,
            deletd: true,
            Notes: Note

        }

        let add_note = await Delete_DID_Notes.create(obj)

        let update = await cutomerModel.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}




//----------------------------------------------Agent-suspend----------------------------------------------------------------------------------------

const agentsuspend = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.params.orgID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter Agent" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting org id" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })
        }

        let checkUser = await agentModel.findOne({ _id: agentID, organisationID: orgID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No agent Found" })
        }

        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person, to suspend this agent" })
        }


        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Agent Already Bolcked" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { blocked: 1, blockedBY: agentID }, { new: true })

            return res.status(200).send({ status: true, msg: "Agent Block Sucessfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//--------------------------------------------------un-suspend-agent----------------------------------------------------------------------------

const unSuspendagent = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.params.orgID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter AgentID" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let checkUser = await agentModel.findOne({ _id: agentID, organisationID: orgID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No agent Found" })
        }


        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person to un-suspend this agent" })
        }


        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Agent Already Unbolcked" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { blocked: 0 }, { new: true })

            return res.status(200).send({ status: true, msg: "Agent Un-block Sucessfully" })
        }






    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------------Delete-agent------------------------------------------------------------------------------//

const deleteAgent = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.params.orgID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter AgentID" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }



        let checkUser = await agentModel.findOne({ _id: agentID, organisationID: orgID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No agent Found" })
        }


        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person to un-suspend this agent" })
        }


        if (checkUser.isDeleted == 1) {
            return res.status(200).send({ status: 1, msg: "Agent Already deleted" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { isDeleted: 1, DeletedBy: orgID }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })
        }




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-----------------------------------------Orgaanisation-transection-list-------------------------------------------------------------------------

const organisationtransectionfillter = async (req, res) => {
    try {

        const OrganisationID = req.params.OrganisationID;

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (OrganisationID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await transectionModel.find({ OrganisationID: OrganisationID }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await transectionModel.find({ OrganisationID: OrganisationID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })



        } else if (req.body.fromDate) {

            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString().substring(0, 10).replace('T', ' '),
                        $lte: new Date(req.body.toDate).toISOString().substring(0, 10).replace('T', ' '),
                    }
                }

            ]




            let countpages2 = await transectionModel.find({ $or: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $or: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
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




            let countpages2 = await transectionModel.find({ $and: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $and: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
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




            let countpages2 = await transectionModel.find({ $and: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $and: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.senderName && req.body.beneficiaryName) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },

            ]




            let countpages2 = await transectionModel.find({ $and: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $and: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
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




            let countpages2 = await transectionModel.find({ $and: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $and: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
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




            let countpages2 = await transectionModel.find({ $and: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $and: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
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




            let countpages2 = await transectionModel.find({ $or: option, OrganisationID: OrganisationID })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $or: option, OrganisationID: OrganisationID }).sort({ transactionDate: -1 })
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

//-------------------------------------organisation-cahnge-password------------------------------------------------------------------------------------------

const changePassword = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        const oldPaasword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "orgID not getting" })
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

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findadmin = await Organisation.findOne({ _id: orgID })



        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "organisation not found" })
        }

        const decryptedPassword = await bcrypt.compare(oldPaasword, findadmin.password)



        if (!decryptedPassword) {
            return res.status(200).send({ status: false, msg: "Please enter valid old password" })
        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)

        let findadmin1 = await Organisation.findOneAndUpdate({ _id: orgID }, { password: encryptedPassword })


        return res.status(200).send({ status: false, msg: "Password Change Sucessfully" })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//------------------------------------------------org-forgot-password-----------------------------------------------------------------------

const orgforgotpassword = async (req, res) => {
    try {


        const email = req.body.email;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter your register email" })
        }


        let cheackEmail = await Organisation.findOne({ email: email })

        if (!cheackEmail) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (cheackEmail.email !== email) {
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
                text: ' Hello! admin your OTP for change password is " ' + otp + ' " do not share this otp'
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

        let updateOTP = await Organisation.findOneAndUpdate({ email: email }, { otp: otp })

        if (!updateOTP) {
            return res.status(200).send({ status: false, msg: "Agent not Found" })
        }

        return res.status(200).send({ status: true, msg: "Otp send Sucessfully" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------------change-password------------------------------------------------------------------------------

const orgchangePasswordotp = async (req, res) => {
    try {


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

        // if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid password in between 6 to 10 character, password at least one number and one special caharacter" })
        // }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your confirm Password is not match" })
        }

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp, which you getting through your email" })
        }

        let checkOTP = await Organisation.findOne({ email: email })

        if (!checkOTP) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(confirmPassword, saltRounds)

        let updatePassword = await Organisation.findOneAndUpdate({ email: email }, { password: encryptedPassword })

        if (!updatePassword) {
            return res.status(200).send({ status: false, msg: "Password not changed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Password change sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//--------------------------------View-organisation----------------------------------------------------------------------------------------

const vieworg = async (req, res) => {
    try {

        const orgID = req.params.orgID

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgDI" })
        }

        let data = await Organisation.findOne({ _id: orgID })


        if (!find) {
            return res.status(200).send({ status: false, msg: "No organisation found" })
        }

        return res.status(200).send({ status: true, data })




    } catch (error) {
        console.log(error)
    }
}




//---------------------------------------update-org------------------------------------------------------------------------------------


const org_update = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        let files = req.files;


        if (!orgID) {
            return res.status(200).send({ status: falsle, msg: "enter orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (files.length > 0) {

            let data = req.body;

            const profilePicture = await uploadFile(files[0])




            const { logo, code, name, phone, email, country, city, joiningDate, postCode, address, password } = data

            const saltRounds = 10
            const encryptedPassword = await bcrypt.hash(password, saltRounds)


            let checkPhone = await Organisation.findOne({ phoneNo: phone })

            let checkEmail = await Organisation.findOne({ email: data.email })


            let finalData = {
                logo: profilePicture,
                name: name,
                phoneNo: phone,
                email: email,
                country: country,
                city: city,
                postCode: postCode,
                address: address,
                password: encryptedPassword
            }


            let update = await Organisation.findOneAndUpdate({ _id: orgID }, finalData)

            if (!update) {
                return res.status(200).send({ status: false, msg: "org not found" })
            }


            return res.status(200).send({ status: true, msg: "profile updated sucessfully" })

        } else {



            let data = req.body;
            let files = req.files;

            const { code, name, phone, email, country, city, joiningDate, postCode, address, password } = data

            let checkPhone = await Organisation.findOne({ phoneNo: phone })
            const saltRounds = 10
            const encryptedPassword = await bcrypt.hash(password, saltRounds)


            let checkEmail = await Organisation.findOne({ email: data.email })

            let finalData = {
                name: name, phoneNo: phone, email: email,
                country: country, city: city,
                postCode: postCode, address: address, password: encryptedPassword
            }



            let update = await Organisation.findOneAndUpdate({ _id: orgID }, finalData, { new: true })

            if (!update) {
                return res.status(200).send({ status: false, msg: "org not found" })
            }



            return res.status(200).send({ status: true, msg: "profile updated sucessfully" })


        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

const createCustomerByOrg = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.orgID;

        console.log("org")

        if (!ID) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })

        }

        if (ID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Adding ID" })

        }

        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data


        if (!data) {
            return res.status(200).send({ status: false, msg: "Please fill all fields " })

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




       // ------------------------------------Manage - Linked - service----------------------------------------------------------------------

        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
        const cheack_cus = await customerModel.findOne({ phone: convert_Number })
        if (cheack_cus) {

            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })

        }

       // ---------------------------------------------------------------------------------------------------------------------------------




        let findcust = await customerModel.find({ organisation: ID })
        let findOrg = await org_Licenses.findOne({ OrganisationID: ID })


        if (findOrg.totalLicenses <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update your licenses" })

        }



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



        let checkPhone = await customerModel.findOne({ phone: convert_Number })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
        }


        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await customerModel.findOne({ email: data.email })

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

        doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()



        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: ID,
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

        let create = await temp_Cust.create(collection)

        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}
//-----------------------------------verify-otp-and-register-customer-with-digitalID-----------------------------------------------------------------------------

let verifyCustomer = async (req, res) => {
    try {

        const OTP = req.body.OTP
        const phoneNo1 = req.body.phoneNo
        const phoneNo = phoneNo1

        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }

        if (!OTP) {
            return res.status(200).send({ Status: false, msg: "Please enter OTP" })
        }

        let trim = phoneNo.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)



        var result = [];



        // async function doPostRequest() {

        let payload = {
            code: OTP,
            phoneNumber: `+${convert_Number}`
        }



        let findCust = await temp_Cust.findOne({ phone: convert_Number })


        let res1 = axios.post('http://13.127.64.68:7008/api/mainnet/generate-digitalid', {
            code: OTP,
            phoneNumber: `+${convert_Number}`
        }).then(async respons => {


                let data1 = respons.data
            let cust_password = generateString1(10)



            let findCust = await temp_Cust.findOne({ phone: convert_Number })

                let newCust = {
                    IDphoto: findCust.IDphoto, fullname: findCust.fullname,
                    dateOfBirth: findCust.dateOfBirth, phone: findCust.phone, city: findCust.city, age: findCust.age,
                    email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: data1.hash,
                    owner: data1.response.owner, privateKey: data1.response.privateKey, walletAddress: data1.response.walletAddress,
                    professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
                    createdBY: findCust.createdBY, imageDescriptions: findCust.imageDescriptions, Latitude: findCust.Latitude,
                    Longitude: findCust.Longitude, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
                    locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, landSize: findCust.landSize,
                    digitalID: findCust.digitalID, nextFOKniPhone: findCust.nextFOKniPhone, nextFOKinName: findCust.nextFOKinName,
                    assetType: findCust.assetType, assetID: findCust.assetID,
                    assetAddress: findCust.assetAddress, assetLongitude: findCust.assetLongitude,
                    assetLatitude: findCust.assetLatitude, password: cust_password, facialIdentification: 1
                }



                let create = await cutomerModel.create(newCust)

                let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

                let totalLicenses = OrganisationList.totalLicenses

                let findreaminig = await customerModel.find({ organisation: findCust.organisation })

                let calculateRemainig = totalLicenses - findreaminig.length;

                let Remainig = calculateRemainig



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

            sentEmail();



            let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig }, { new: true })
                let cust_wallet = `00x${generateString1(43)}`
                let obj = {
                    customer_ID: create._id,
                    phone: create.phone,
                    wallet_Address: cust_wallet
                }
            let create_Wallet = await cust_wallet_Model.create(obj)
            let delete_cust = await temp_Cust.findOneAndDelete({ phone: convert_Number })
            return res.status(200).send({ status: true, msg: "customer register sucessfully" })



        }).catch(async error => {
            let delete_cust = await temp_Cust.findOneAndDelete({ phone: convert_Number })

            return res.status(200).send({ status: false, error: error.message, msg: "failed please try again" })
            });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//-------------------------------------update-digitalID----------------------------------------------------------------------------------------

const updateDigitalID = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (custID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }



        const adminID = req.params.adminID

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid admin ID" })
        }

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.customer.approveDID

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to block customer, Contact admin to access block customer" })

                }

            }

        }


        let findCustomer = await cutomerModel.findOne({ _id: custID })

        if (!findCustomer) {
            return res.status(200).send({ status: false, msg: "not found ciustomer" })
        }

        if (!findCustomer.owner) {
            return res.status(200).send({ status: false, msg: "Customer not have owner key" })
        }

        let custOwnerKey = findCustomer.owner;


        async function getID() {

            try {
                const Ownwe_key = '0x12734821a5B2be1D204fEdb3e986a6d149772a6B'

                var result11 = []
                let result = await axios.get(`http://13.127.64.68:7008/api/mainnet/getDigitalIdOfOwner/${custOwnerKey}`)

                    .catch((error) => {
                        let data = error.response.data
                        result11.push(data)

                    })

                for (item of result11) {

                    let findCustomer = await cutomerModel.findOneAndUpdate({ _id: custID }, { digitalID: item.owner }, { new: true })

                    if (findCustomer) {

                        return res.status(200).send({ status: false, msg: "Digital ID added sucessfullt", findCustomer })
                    }
                }




                let findCustomer = await cutomerModel.findOneAndUpdate({ _id: custID })






            } catch (error) {

                return res.status(200).send({ "catch error": error.message })


                result.push(error)

            }
        }

        getID()



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//--------------------------------------org-list--------------------------------------------------------

const orgList = async (req, res) => {
    try {

        let Org = await Organisation.find().select({ name: 1 })

        return res.status(200).send({ status: true, Org })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}




//--------------------------------------------Update-Licenses-send-request---------------------------------------------------------------------------------


const applyUpdateLicenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        let Licenses = req.body.Licenses

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }

        let findOrg = await Organisation.findOne({ _id: orgID })

        const name = findOrg.name
        const logo = findOrg.logo



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
                subject: 'Request for update licenses',
                text: ` Hello! this is ${name} we want to update our licenses please add ${Licenses} Licenses in our licenses account, thakyou`

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
            logo: logo,
            By: "Organisation",
            messege: ` Hello! this is ${name} we want to update our licenses please add ${Licenses} Licenses in our licenses account, thakyou`,
            receivedBy: `${name} Organisation`,
            subject: `Request for update licenses`,
            code: orgID
        }

        let createRequest = await admin_Email_request.create(obj)

        let update = await org_Licenses.findOneAndUpdate({ OrganisationID: orgID }, { LicenseUpdateStatus: 0 })

        return res.status(200).send({ status: true, msg: "Request send Sucessfully For Update Licenses" })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------license-process--------------------------------------------------------------------------------//

const LicenseProcess = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        let find = await org_Licenses.findOne({ OrganisationID: orgID })

        if (find.LicenseUpdateStatus == 1) {
            return res.status(200).send({ status: true })
        } else {
            return res.status(200).send({ status: false })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-----------------------------------------agent-Commission-update-------------------------------------------------------------------------

const updateCommission = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const agentAmountType = req.body.AmountType
        const agentAmount = req.body.Amount;



        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })

        }

        if (!agentAmount) {
            return res.status(200).send({ status: false, msg: "Please enter Amount" })
        }

        if (!agentAmountType) {
            return res.status(200).send({ status: false, msg: "Please enter Amount Type" })
        }


        let findCommissions = await agent_Commission.find({ agentID: agentID })

        let lastUpdate = findCommissions[findCommissions.length - 1]



        let obj = {
            agentID: agentID,
            type: lastUpdate.type,
            Amount: agentAmount,
            startDate: new Date(),
            type: agentAmountType
        }


        let updateOldData = await agent_Commission.findOneAndUpdate({ _id: lastUpdate._id }, { endDate: new Date() })

        let create = await agent_Commission.create(obj)

        return res.status(200).send({ status: true, create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-----------------------------------------------------View-agent-Commission-------------------------------------------------------------------

const ViewAgentCommmission = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })

        }

        let findCommissions = await agent_Commission.find({ agentID: agentID })

        let lastUpdate = findCommissions[findCommissions.length - 1]

        return res.status(200).send({ status: true, lastUpdate })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-------------------------------------Org-per-reports---------------------------------------------------------------------------------------

const OrgPerreort = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })

        }



        const LastMonthData = await customerModel.aggregate([
            {
                $match: {
                    organisation: orgID,
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

        const Current_Month = await customerModel.find({
            $and: [
                {
                    createdAt: {
                        $gte: startOfCurrentMonth,
                        $lt: startOfNextMonth
                    },
                    organisation: orgID
                },
            ],
        }).count();



        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()

        if (perDayLastMonth > perDayCurrMonth) {
            let Negetive = perDayLastMonth - perDayCurrMonth
            let nextMonthTarget = Negetive * 30
            let Target1 = nextMonthTarget + Last_Month
            let Target = Math.ceil(Target1)
            if (Target <= 0) {
                Target = 100
            }


            return res.status(200).send({ status: true, Negetive, Current_Month, Target, Last_Month, Today_date })

        } else {
            let positive = perDayCurrMonth - perDayLastMonth
            let nextMonthTarget = positive * 30
            let Target1 = nextMonthTarget + Last_Month
            let Target = Math.ceil(Target1)


            return res.status(200).send({ status: true, positive, Current_Month, Target, Last_Month, Today_date })
        }




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }

}

//------------------------------------------Organisation-month-add-cust------------------------------------------------------------------------


const org_add_cust = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }


        let currDate = new Date().getFullYear();

        let finalYear = currDate - 1

        let startTime = performance.now();
        cutomerModel.find({ organisation: orgID, createdAt: { $gte: `${finalYear}-01-31T09:37:32.320+00:00`, $lte: '2022-11-05T07:33:37.480+00:00' } }).then(result => {
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


//-------------------------------------------Customer_which_apply_Loan---------------------------------------------------------------------------


const Cust_Loan_apply = async (req, res) => {
    try {

        const orgID = req.orgID

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let find_Loans1 = await Loan_applay_customer.find({ OrganisationID: orgID, Loan_status: "PENDING" })

        let totalRaow1 = find_Loans1.length


        let find_Loans = await Loan_applay_customer.find({ OrganisationID: orgID, Loan_status: "PENDING" }).populate('CustomerID', { 'fullname': 1 })
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

//------------------------------------------organisation-loan-Accept--------------------------------------------------------------------------


const org_loan_accept = async (req, res) => {
    try {

        let LoanID = req.params.LoanID;

        if (!LoanID) {
            return res.status(200).send({ status: false, msg: "Please enter Loan ID" })
        }

        if (LoanID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Loan ID" })
        }

        let Accept_Loan = await Loan_applay_customer.findOneAndUpdate({ _id: LoanID }, { Loan_status: 'PASS' }, { new: true })

        let obj = {

            OrganisationID: Accept_Loan.OrganisationID,

            customerID: Accept_Loan.CustomerID,

            Loan_ID: Accept_Loan._id,

            No_Of_Installment: Accept_Loan.Duration_Month,

            remainig_Insallment: Accept_Loan.Duration_Month,

            Installment_Amount: Accept_Loan.EMI,

            Interest_Rate: Accept_Loan.Duration_Month,

            Installment_Pay_Date: Accept_Loan.createdAt,

            start_Date: Accept_Loan.createdAt,

            End_Date: Accept_Loan.createdAt,

            Total_Duration: Accept_Loan.Duration_Month

        }


        let cerate = await Installment_Process.create(obj)
        return res.status(200).send({ status: true, msg: "Loan Pass Sucessfully", Accept_Loan })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: " " })
    }
}

//------------------------------------------get-cut-loan---------------------------------------------------------------------------------------

const org_cust_loan = async (req, res) => {
    try {

        let LoanID = req.params.LoanID;

        if (!LoanID) {
            return res.status(200).send({ status: false, msg: "Please enter Loan ID" })
        }

        if (LoanID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter Loan custID" })
        }

        let Loan = await Loan_applay_customer.findOne({ _id: LoanID })

        return res.status(200).send({ status: true, Loan })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "" })
    }
}

//------------------------------------------get-Pass-loans---------------------------------------------------------------------------------------

const get_pass_Loans = async (req, res) => {
    try {

        const orgID = req.orgID

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        let find = await Loan_applay_customer.find({ OrganisationID: orgID, Loan_status: "PASS" })
            .populate('CustomerID', { 'fullname': 1 })
            .populate('OrganisationID', { 'name': 1 })

        return res.status(200).send({ status: true, find })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------get-customer-installment-details---------------------------------------------------------------------------


const get_Loan_installment = async (req, res) => {
    try {

        const LoanID = req.params.LoanID;

        if (!LoanID) {
            return res.status(200).send({ status: false, msg: "Please enter LoanID" })
        }

        if (LoanID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter Loan custID" })
        }

        let find_Installment = await LoanInsatallMent.findOne({ Loan_ID: LoanID })
            .populate('OrganisationID', { 'name': 1 })

        return res.status(200).send({ status: true, find_Installment })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//---------------------------------------------Customer-Linked-service------------------------------------------------------------------------

const Cust_Linked_Srevice_Org = async (req, res) => {
    try {

        const cust_phone = req.body.Phone;
        const orgID = req.orgID
        const otp = req.body.otp;

        if (!orgID) {
            return res.status(200).send({ statsu: false, msg: "Please enter Organisation ID" })
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

        if (all_organisations.includes(orgID)) {
            return res.status(200).send({ statsu: false, msg: `This customer already linked with ${org_name} organisation` })
        }

        if (verify_OTP.Linekd_Service_OTP != otp) {
            return res.status(200).send({ status: false, msg: "Please enter Valid otp" })
        }

        let update_OTP = await cutomerModel.findOneAndUpdate({ phone: cust_phone }, { $push: { "organisation": orgID } }, { new: true })

        let update_OTP_Again = await cutomerModel.findOneAndUpdate({ phone: cust_phone }, { Linekd_Service_OTP: "000@$#&*" })

        return res.status(200).send({ status: true, msg: `Congratulation now you are also part of ${org_name}`, update_OTP })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ satatus: false, msg: error.messege })
    }
}

const get_org_cust_data_graph = async (req, res) => {
    try {


        let orgID = req.orgID



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await customerModel.find({ organisation: orgID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })

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

//----------------------------------------------DID-awaiting----------------------------------------------------------------------------------

const Org_pendingCust = async (req, res) => {
    try {


        const orgID = req.orgID
        let pageNO = req.body.page;

        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        let findcust1 = await customerModel.find({ organisation: orgID, status: "pending", isDeleted: 0, blocked: 0 }).sort({ createdAt: -1 })
        let totalRow = findcust1.length
        if (Object.keys(req.body).length <= 1) {


            let findcust = await customerModel.find({ organisation: orgID, status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })

        }


        let option = [{ digitalrefID: req.body.digitalrefID }]
        let findcust = await customerModel.find({ $or: option, organisation: orgID, status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//------------------------------------------blocked-DID's-------------------------------------------------------------------------------------

const Org_blockedIDS = async (req, res) => {
    try {

        const OrgID = req.orgID
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findBlockedIDs1 = await customerModel.find({ organisation: OrgID, blocked: 1 })
        let totlaRow = findBlockedIDs1.length

        let findBlockedIDs = await customerModel.find({ organisation: OrgID, blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let totalRaow1 = findBlockedIDs.length;

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: findBlockedIDs })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------------Blocked-customers-------------------------------------------------------------------------------


const blockCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;
        const Note = req.body.note

        console.log("blocked", userID)



        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        if (userID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }

        if (!Note) {
            return res.status(200).send({ status: false, msg: "Please write the reason of blocking" })
        }

        let checkUser = await cutomerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }

        let obj = {
            customerID: req.params.ID,
            blocked: true,
            Notes: Note

        }

        let add_note = await Blocked_Notes.create(obj)

        let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

        return res.status(200).send({ status: 1, msg: "Customer Block Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------No_of_agents----------------------------------------------------------------------------------

const get_num_of_Agnet = async (req, res) => {
    try {
        const OrgID = req.orgID;


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let find_Agent1 = await AgentModel.find({ organisationID: OrgID, blocked: 0, isDeleted: 0 })
        let totlaRow = find_Agent1.length
        let find_Agent = await AgentModel.find({ organisationID: OrgID, blocked: 0, isDeleted: 0 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let find_Numbers = find_Agent.length

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), Agents: find_Numbers, data: find_Agent })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------Blocking_Notes-----------------------------------------------------------------------------------

const Blocking_DID_Note = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let find_notes1 = await Blocked_Notes.find()
        let totlaRow = find_notes1.length

        let find_notes = await Blocked_Notes.find().populate('customerID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: find_notes })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//--------------------------------------------get-elete-notes-------------------------------------------------------------------------------

const Delete_DID_Note = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let find_notes1 = await Blocked_Notes.find()
        let totlaRow = find_notes1.length

        let find_notes = await Delete_DID_Notes.find().populate('customerID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: find_notes })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------------------org-agent-reports-------------------------------------------------------------------

const Org_get_agent_cut_month = async (req, res) => {
    try {

        let agentID = req.params.agentID
        let date = new Date()
        let date1 = new Date

        console.log("jkl", agentID)



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



module.exports.createOrganisation = createOrganisation;
module.exports.organisationLogin = organisationLogin;
module.exports.getLogHistory = getLogHistory;
module.exports.Organisationdashboard = Organisationdashboard;
module.exports.organisationsTransection = organisationsTransection;
module.exports.OrgDashSection = OrgDashSection;
module.exports.organisationsTransectionList = organisationsTransectionList;
module.exports.OrganisationCustomerTest = OrganisationCustomerTest;
module.exports.DeleteCustomer = DeleteCustomer;
module.exports.agentsuspend = agentsuspend;
module.exports.unSuspendagent = unSuspendagent;
module.exports.deleteAgent = deleteAgent;
module.exports.organisationtransectionfillter = organisationtransectionfillter;
module.exports.changePassword = changePassword;
module.exports.orgforgotpassword = orgforgotpassword;
module.exports.orgchangePasswordotp = orgchangePasswordotp;
module.exports.vieworg = vieworg;
module.exports.org_update = org_update;
module.exports.createCustomerByOrg = createCustomerByOrg
module.exports.verifyCustomer = verifyCustomer;
module.exports.updateDigitalID = updateDigitalID;
module.exports.orgList = orgList
module.exports.applyUpdateLicenses = applyUpdateLicenses;
module.exports.LicenseProcess = LicenseProcess;
module.exports.updateCommission = updateCommission;
module.exports.ViewAgentCommmission = ViewAgentCommmission;
module.exports.OrgPerreort = OrgPerreort;
module.exports.org_add_cust = org_add_cust;
module.exports.Cust_Loan_apply = Cust_Loan_apply
module.exports.org_cust_loan = org_cust_loan
module.exports.org_loan_accept = org_loan_accept
module.exports.get_pass_Loans = get_pass_Loans
module.exports.get_Loan_installment = get_Loan_installment
module.exports.Cust_Linked_Srevice_Org = Cust_Linked_Srevice_Org
module.exports.get_org_cust_data_graph = get_org_cust_data_graph
module.exports.Org_pendingCust = Org_pendingCust
module.exports.Org_blockedIDS = Org_blockedIDS
module.exports.blockCustomer = blockCustomer
module.exports.get_num_of_Agnet = get_num_of_Agnet
module.exports.Blocking_DID_Note = Blocking_DID_Note
module.exports.Delete_DID_Note = Delete_DID_Note
module.exports.Org_get_agent_cut_month = Org_get_agent_cut_month