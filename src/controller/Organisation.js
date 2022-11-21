//const Organisation = require("../models/Organisation");
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
//const org_Licenses = require("../models/OrgLicenses");
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

        console.log("Personal_Loans", Personal_Loans)


        let Code = generateString(10);
        let Orgpassword = generateString1(8)
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(Orgpassword, saltRounds)
        let JoiningDate = new Date().toISOString().substring(0, 10)
        console.log(JoiningDate)


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

        console.log("AcessKey", AccessKey)
        console.log("SceretKey", SceretKey)


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




        console.log(create._id)

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
            let data = {
                name: findData.name,
                email: email,
                ID: findData._id,
                loginTime: time,
                IP: UserIP,
                status: "Please enter valid email"

            };
            let createLogHistory = await organisationLog.create(data)
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

            // return res.status(200).send({ status: false, msg: "Please enter valid password" })
        }

        let OrganisationID = findData._id;
        let name = findData.name;
        let phone = findData.phoneNo;
        let accessKeyId = findData.accessKeyId;
        let secretAccessKey = findData.secretAccessKey

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

            //next();
            console.log(OrganisationID)
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

//----------------------------------------------------get-Organisation---------------------------------------------------------------------------//


const getListOfOrganisation = async (req, res, next) => {
    try {

        url = "http://localhost:3000/getOrganisations";
        // next();

        //----------------Pagination--------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        let countpages11 = await Organisation.find();
        counPages = Math.ceil(countpages11.length / 10)

        const { page = pageNO, limit = 10 } = req.query;

        //-----------------------------------------------------------//
        let getdata = await Organisation.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();;

        // let result = [];
        // for (users of getdata) {
        //     let findCustomer = await cutomerModel.find({ organisation: users._id })


        //     let data = {
        //         logo: users._doc.logo,
        //         code: users._doc.code,
        //         Organization: users._doc.name,
        //         Country: users._doc.country,
        //         DateOfCreation: users._doc.joiningDate,
        //         Status: "Confirmed",
        //         NumberOfUser: findCustomer.length
        //     }

        //     result.push(data)
        // }
        //next();
        return res.status(200).send({ status: true, totalPage: counPages, CurrentPage: parseInt(pageNO), data: getdata })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


//----------------------------------------------------------get-Organisation-by-ID-----------------------------------------------------------------


const getListOfOrganisationwithUser = async (req, res, next) => {
    try {
        url = "http://localhost:3000/getWithUser";
        next();
        const OraganisatioId = req.body.ID;

        //-------------------------Pagination-----------------------//

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        let countpages11 = await Organisation.find({ _id: OraganisatioId });
        counPages = Math.ceil(countpages11.length / 10)

        const { page = pageNO, limit = 10 } = req.query;

        //-----------------------------------------------------//

        let getdata = await Organisation.find({ _id: OraganisatioId }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();;

        let result = [];
        for (users of getdata) {
            let findCustomer = await cutomerModel.find({ organisation: users })


            let data = {
                logo: users._doc.logo,
                code: users._doc.code,
                Organization: users._doc.name,
                Country: users._doc.country,
                DateOfCreation: users._doc.joiningDate,
                Status: "Confirmed",
                User: findCustomer
            }

            result.push(data)
        }
        next();
        return res.status(200).send({ totalPage: counPages, CurrentPage: parseInt(pageNO), result })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


//--------------------------------------------Delete-Organisation-------------------------------------------------------------------------------

const deletOrganisation = async (req, res, next) => {
    try {
        url = "http://localhost:3000/organisation";
        next();
        const OrganisationID = req.body.OrganisationID;
        const userID = req.body.userID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Organisation id needed" })
        }

        if (!userID) {
            return res.status(200).send({ status: false, msg: "userId is needed" })
        }

        let checkOrganisation = await cutomerModel.findOne({ _id: userID })

        let organisations = checkOrganisation.organisation

        //--------------------check Organisation----------------

        if (!organisations.includes(OrganisationID)) {
            return res.status(200).send({ status: false, msg: "Organisation not found" })
        }

        //------------------delete-----------------------------
        const index = organisations.indexOf(OrganisationID);
        if (index > -1) {
            organisations.splice(index, 1);
        }

        let object = {
            IDphoto: checkOrganisation.IDphoto,
            fullname: checkOrganisation.fullname,
            dateOfBirth: checkOrganisation.dateOfBirth,
            phone: checkOrganisation.phone,
            email: checkOrganisation.email,
            gender: checkOrganisation.gender,
            nationality: checkOrganisation.nationality,
            address: checkOrganisation.address,
            organisation: organisations,
            createdAt: checkOrganisation.createdAt,
            updatedAt: checkOrganisation.updatedAt
        }

        let add = await cutomerModel.findByIdAndUpdate({ _id: userID }, object, { new: true })
        next();
        return res.send(add)



    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


//--------------------------------------get-Organisation-Transections---------------------------------------------------------------------------


const getTransections = async (req, res, next) => {
    try {
        const OrganisationID = req.body.OrganisationID;
        url = "http://localhost:3000/getTransection";
        next();
        //----------------------Pagination---------------------------------------------------
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await transectionModel.find({ OrganisationID: OrganisationID })
        counPages = Math.ceil(countpages11.length / 10)

        //---------------------------------------------------------------------------------------        



        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "OrganisationID field is needed" })
        }

        let findTransections = await transectionModel.find({ OrganisationID: OrganisationID }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        if (findTransections.length == 0) {
            return res.status(200).send({ status: false, msg: "No Any Transection Found" })
        }
        next();
        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: findTransections })


    } catch (error) {
        console.log(error)
        res.send(error)
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

        console.log("asdfghj")



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


//-------------------------------------------------Add-customer-by-organisation---------------------------------------------------------------------//



const addCustomerByOrganisation = async (req, res, next) => {
    try {

        url = "http://localhost:3000/Addcustomer";
        next();
        let OrganisationID = req.body.OrganisationID;
        let userID = req.body.userID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter organisation ID" })
        }

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enetr customer ID" })
        }


        let checkOrganisation = await cutomerModel.findOne({ _id: userID })
        let organisation = checkOrganisation.organisation;


        for (items of organisation) {
            if (items == OrganisationID) {
                return res.status(200).send({ status: false, msg: "already Enroll" });
            }
        }
        organisation.push(OrganisationID)


        let object = {
            IDphoto: checkOrganisation.IDphoto,
            fullname: checkOrganisation.fullname,
            dateOfBirth: checkOrganisation.dateOfBirth,
            phone: checkOrganisation.phone,
            email: checkOrganisation.email,
            gender: checkOrganisation.gender,
            nationality: checkOrganisation.nationality,
            address: checkOrganisation.address,
            organisation: organisation,
            createdAt: checkOrganisation.createdAt,
            updatedAt: checkOrganisation.updatedAt
        }

        let add = await cutomerModel.findByIdAndUpdate({ _id: userID }, object, { new: true })
        next();
        return res.status(200).send({ status: true, msg: add })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}

//----------------------------get-customer-by-filter--------------------------------------------------------------------------------------------

const getCustomerByFilter = async (req, res) => {
    try {

        const OrganisationID = req.body.organisationID;
        const customerID = req.body.customerID;
        const CustomerName = req.body.customerName;
        const CustomerEmail = req.body.customerEmail;
        const Nationality = req.body.Nationality

        // // if (!OrganisationID) {
        // //     return res.status(200).send({ status: false, msg: "Please enter organisationID" })
        // // }

        // let findCustomers = await cutomerModel.find();
        // let result = [];

        // for (items of findCustomers) {
        //     console.log(items.organisation)
        //     for (elements of items.organisation) {
        //         if (elements === OrganisationID) {
        //             result.push(items)
        //         }
        //     }
        // }



        let options = [{ _id: req.body.customerID }, { fullname: req.body.CustomerName }, { email: req.body.CustomerEmail }, { nationality: req.body.Nationality }]



        console.log(Object.keys(req.body).length)
        if (!Object.keys(req.body).length) {
            let filter = await blog.find({ isDeleted: false, isPublished: true }).populate('authorId')
            return res.status(200).send({ status: false, filter })
        }

        let filter = await cutomerModel.find({ $or: options })
        if (!filter.length)
            return res.status(404).send({ status: false, msg: "No such documents found" })
        return res.status(200).send({ status: true, data: filter })



    } catch (error) {
        console.log(error)

    }
}

//--------------------------------------View-Customer--------------------------------------------------------------------------------------------

const viewCustomer = async (req, res) => {
    try {

        const organosationID = req.body.OrganisationID;

        if (!organosationID) {
            return res.status(200).send({ status: false, msg: "Please enter organosationID " })
        }

        let findCustomer = await cutomerModel.find({ organisation: organosationID })

        if (!findCustomer) {
            return res.status(200).send({ status: false, msg: "No customer found" })
        }

        return res.status(200).send({ status: true, msg: "Customers", data: findCustomer })



    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
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
        //console.log(Object.keys(req.body).length)
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
        console.log('name', findName.name)
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

        console.log(numberOFUSer)


        let data = {
            name: findName.name,
            totlaLicense: findName.totlaLicense,
            totalUser: numberOFUSer,
            totalTransection: count,
            email: orgEmail,
            country: country,
            image: findName.logo
        }

        return res.status(200).send({ status: true, data: data })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//---------------------------------------------------------Organisation-Customer-------------------------------------------------------------

const OrganisationCustomer = async (req, res) => {

    try {

        const OrganisationID = req.params.ID;
        const CustomerName = req.body.customerName;
        const status = req.body.Status

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }
        let countpages = await cutomerModel.find({ organisation: OrganisationID }).sort({ createdAt: 1 })
        let totlaRow = countpages.length

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!Object.keys(req.body).length) {
            let filter = await cutomerModel.find({ organisation: OrganisationID }).sort({ createdAt: 1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let counPages = Math.ceil(countpages.length / 10)

            return res.status(200).send({ status: false, totlaRow: totlaRow, totalPages: counPages, currenPage: parseInt(pageNO), filter })
        }




        let filter = await cutomerModel.find({ organisation: OrganisationID }).sort({ createdAt: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let counPages = Math.ceil(countpages.length / 10)

        if (!filter.length)
            return res.status(404).send({ status: false, msg: "No such documents found" })
        return res.status(200).send({ status: true, totlaRow: totlaRow, totalPages: counPages, currenPage: parseInt(pageNO), data: filter })


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
            //.sort({ createdAt: -1 })

            return res.status(200).send({ status: true, filter })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


//----------------------------------Organisation-Test-Filter-Data-Customer----------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////


const OrganisationCustomerTest = async (req, res) => {

    try {

        const OrganisationID = req.params.ID;
        const CustomerName = req.body.customerName;
        const status = req.body.Status



        let countpages = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!OrganisationID) {
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
            let countpages1 = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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
            let countpages2 = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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
            let countpages3 = await cutomerModel.find({ $or: option, organisation: OrganisationID })
            let contRow3 = countpages3.length

            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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

//----------------------------------------------Delete-Customer---------------------------------------------------------------------------------


const DeleteCustomer = async (req, res) => {
    try {

        const customerID = req.params.ID

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

        let update = await cutomerModel.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//------------------------------------------view-agents------------------------------------------------------------------------------

const viewAgents = async (req, res) => {
    try {

        const orgID = req.params.OrgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter Valid Organisation ID" })
        }

        let findAgents = await agentModel.find({ organisationID: orgID })

        if (!findAgents) {
            return res.status(200).send({ status: false, msg: "No agent found" })
        }

        return res.status(200).send({ status: true, agents: findAgents })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------------------get-transection-by-month----------------------------------------------------------------------

const getDataByMonth = async (req, res) => {
    try {

        const orgID = req.params.orgID;



        let startTime = performance.now();
        transectionModel.find({ OrganisationID: orgID, createdAt: { $gte: '2022-07-31T09:37:32.320+00:00', $lte: '2022-10-12T07:33:37.480+00:00' } }).then(result => {
            let newMonthsArray = new Array();
            let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let months = {};
            console.log(req.body.startDate)
            for (let i = parseInt("2022-12-31T09:37:32.320+00:00".substring(5, 7)) - 1; i < 12; i++) {
                let year = parseInt("2022-12-31T09:37:32.320+00:00".substring(0, 4)) - 1;
                let month = parseInt("2022-12-31T09:37:32.320+00:00".substring(5, 7));
                newMonth = monthsArray[i] + '-' + year;
                newMonthsArray.push(newMonth);
                months[newMonth] = 0;
            }

            for (let i = 0; i < parseInt(req.body.startDate.substring(5, 7)); i++) {
                let year = parseInt(req.body.startDate.substring(0, 4));
                let month = parseInt(req.body.startDate.substring(5, 7));
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
            res.status(200).send({ Data: months, 'Execution time': endTime - startTime + ' mls' });
        });



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//--------------------------------Transection-List-with-Filters--------------------------------------------------------------------------------

const orgtransectiontransectionList = async (req, res) => {
    try {

        let OrganisationID = req.params.orgID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter organisationDI" })
        }

        if (OrganisationID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid organisation ID " })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await transectionModel.find({ organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await transectionModel.find({ organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.PCN) {

            let option = [{ PCN: req.body.PCN }]
            let countpages2 = await transectionModel.find({ $or: option, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })


        } else if (req.body.senderName && req.body.fromDate) {

            let option = [{ senderName: req.body.senderName } && {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]
            let countpages2 = await transectionModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await transectionModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0 }).sort({ createdAt: -1 })
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

//----------------------------------------------Agent-suspend----------------------------------------------------------------------------------------

const agentsuspend = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.params.orgID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
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
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { blocked: 1, blockedBY: agentID }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Block Sucessfully" })
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
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
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

        //console.log(checkUser.createdBY)

        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person to un-suspend this agent" })
        }


        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Customer Already Unbolcked" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { blocked: 0 }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Un-block Sucessfully" })
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
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
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
            return res.status(200).send({ status: 1, msg: "Customer Already deleted" })
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
                // {
                //     sendingAmount: {
                //         $gte: req.body.fromAmount,
                //         $lte: req.body.toAmount
                //     }
                // }
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

        console.log(findadmin)


        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "organisation not found" })
        }

        const decryptedPassword = await bcrypt.compare(oldPaasword, findadmin.password)

        console.log(decryptedPassword)
        console.log("old", findadmin.password)


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
        //console.log(checkOTP.otp)

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
        console.log(errors)
    }
}


//------------------------------------------Agent-view-------------------------------------------------------------------------------------

const agentView = async (req, res) => {
    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid ID" })
        }

        let filter = await agentModel.findOne({ _id: agentID })

        if (!filter) {
            return res.status(200).send({ status: false, msgp })
        }

        return res.status(200).send({ status: true, filter })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//---------------------------------------update-org------------------------------------------------------------------------------------


const org_update = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: falsle, msg: "enter orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (req.body.logo) {

            let data = req.body;
            let files = req.files;
            const profilePicture = await uploadFile(files[0])

            const { logo, code, name, phone, email, country, city, joiningDate, postCode, address, password } = data



            let checkPhone = await Organisation.findOne({ phoneNo: phone })


            // if (checkPhone)
            //     return res.status(200).send({ status: false, msg: "Number already register " })
            // //next();

            // if (!email) {
            //     return res.status(200).send({ status: false, msg: "Please enter email" })

            // }


            // if (!(/^\d{10}$/).test(phone)) {
            //     return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
            // }

            // if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            //     return res.status(200).send({ status: false, msg: "Please enter valid email" })
            // }



            let checkEmail = await Organisation.findOne({ email: data.email })

            // if (checkEmail) {
            //     return res.status(200).send({ status: false, msg: "Email is already register" })
            // }




            let finalData = {
                logo: profilePicture,
                name: name,
                phoneNo: phone,
                email: email,
                country: country,
                city: city,
                postCode: postCode,
                address: address,
                password: password
            }

            let update = await Organisation.findOneAndUpdate({ _id: orgID }, finalData)

            if (!update) {
                return res.status(200).send({ status: false, msg: "org not found" })
            }


            return res.status(200).send({ status: true, msg: "profile updated sucessfully" })

        } else {



            let data = req.body;
            let files = req.files;
            // const profilePicture = await uploadFile(files[0])

            const { code, name, phone, email, country, city, joiningDate, postCode, address, password } = data




            let checkPhone = await Organisation.findOne({ phoneNo: phone })


            // if (checkPhone)
            //     return res.status(200).send({ status: false, msg: "Number already register " })
            //next();

            // if (!email) {
            //     return res.status(200).send({ status: false, msg: "Please enter email" })

            // }


            // if (!(/^\d{10}$/).test(phone)) {
            //     return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
            // }

            // if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            //     return res.status(200).send({ status: false, msg: "Please enter valid email" })
            // }



            let checkEmail = await Organisation.findOne({ email: data.email })

            // if (checkEmail) {
            //     return res.status(200).send({ status: false, msg: "Email is already register" })
            // }




            let finalData = {
                name: name, phoneNo: phone, email: email,
                country: country, city: city,
                postCode: postCode, address: address, password: password
            }

            let update = await Organisation.findOneAndUpdate({ _id: orgID }, finalData, { new: true })

            if (!update) {
                return res.status(200).send({ status: false, msg: "org not found" })
            }

            console.log('sdsd')


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
        let ID = req.params.ID;
        console.log("ID", ID)

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


       // ------------------------------------Manage - Linked - service----------------------------------------------------------------------

        console.log("Phone", phone)
        const cheack_cus = await temp_Cust.findOne({ phone: phone })
        if (cheack_cus) {

            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })

        }

       // ---------------------------------------------------------------------------------------------------------------------------------



        console.log("orgID", ID)

        let findcust = await customerModel.find({ organisation: ID })
        let findOrg = await org_Licenses.findOne({ OrganisationID: ID })

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
        }

        doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()
        console.log(seq);



        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: phone, city: city, age: age,
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
        const phoneNo = `+91${phoneNo1}`
        console.log(phoneNo)

        console.log(OTP)
        console.log(phoneNo)

        var result = [];

        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }

        // async function doPostRequest() {

        let payload = {
            code: OTP,
            phoneNumber: phoneNo
        }

        console.log("phone", phoneNo)
        console.log("OTP", OTP)


        let res1 = axios.post('http://13.127.64.68:7008/api/mainnet/generate-digitalid', {
            code: OTP,
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
                    createdBY: findCust.createdBY, imageDescriptions: findCust.imageDescriptions, Latitude: findCust.Latitude,
                    Longitude: findCust.Longitude, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
                    locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, landSize: findCust.landSize,
                    digitalID: findCust.digitalID, nextFOKniPhone: findCust.nextFOKniPhone, nextFOKinName: findCust.nextFOKinName,
                    assetType: findCust.assetType, assetID: findCust.assetID,
                    assetAddress: findCust.assetAddress, assetLongitude: findCust.assetLongitude,
                    assetLatitude: findCust.assetLatitude
                }


                let create = await cutomerModel.create(newCust)

                let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

                let totalLicenses = OrganisationList.totalLicenses

                let findreaminig = await customerModel.find({ organisation: findCust.organisation })

                let calculateRemainig = totalLicenses - findreaminig.length;

                let Remainig = calculateRemainig



                let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig }, { new: true })

                console.log("orgTEST", create._id)
                let cust_wallet = `00x${generateString1(43)}`
                let obj = {
                    customer_ID: create._id,
                    phone: create.phone,
                    wallet_Address: cust_wallet
                }
                let create_Wallet = await cust_wallet_Model.create(obj)

                console.log("create_Wallet", create_Wallet)

                return res.status(200).send({ status: true, msg: "customer register sucessfully", create })



            })
            .catch(error => {
                return res.status(200).send({ status: false, msg: "failed please try again" })
            });

        // return res.status(200).send({ status: false, msg: "customer register sucessfully" })







    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//-------------------------------get-owner-digital-ID--------------------------------------------------------------------------------------

const getOwnerDigitalID = async (req, res) => {
    try {

        var fetch = require('cross-fetch')

        const Ownwe_key = '0x66d14c9A62DEa37C755C023E2123f95db7d2d92F'


        let options = {
            method: 'GET',

            url: `http://13.127.64.68:7008/api/testnet/getDigitalIdOfOwner/${Ownwe_key}`,
            "header": [],
            "description": ""
        }
        let result = await axios.get(`http://13.127.64.68:7008/api/testnet/getDigitalIdOfOwner/${Ownwe_key}`)
        console.log("fetch result ==", result.data)

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//---------------------------------get-all-digitalIDs------------------------------------------------------------------------------------


const getallGigitalIDs = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let options = await axios.get(`http://13.127.64.68:7008/api/testnet/getAllDigitalId`)

        let result = options.data.data;




        let filter = []
        for (items of result) {

            let findcust = await cutomerModel.find({ digitalID: items }).select({ _id: 1, fullname: 1, dateOfBirth: 1, email: 1, digitalID: 1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();



            for (i of findcust) {
                filter.push(i)
            }


        }
        let totalRaow1 = filter.length;
        return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}
//--------------------------------get-info-by-digitalID----------------------------------------------------------------------------------

const getInfoByDigitalID = async (req, res) => {
    try {

        const digitalID = req.body.digitalID;
        //let digiID = '0xc0aee9966d48b5741f4fd8ffd2c81dda9e1f03b48d5b74dd5bbbbd72f47b7f3f'

        //console.log(digiID)

        if (!digitalID) {
            return res.status(200).send({ status: false, msg: "please enter digital ID" })
        }

        let options = await axios.get(`http://13.127.64.68:7008/api/testnet/getIpfsDetailsByDigitalId/${digitalID}`)

        let result = options.data.data

        console.log(result)

        let option2 = await axios.get(result)

        console.log(option2.data)

        let final = option2.data

        return res.status(200).send({ status: false, final })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------update-digitalID----------------------------------------------------------------------------------------
//let fetch = require('node-fetch')
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
                    // .then(async (respons) => {
                    //     console.log("res ==", respons)
                    // })

                    .catch((error) => {
                        let data = error.response.data
                        result11.push(data)
                        //console.log(error.response.data)
                    })

                for (item of result11) {
                    //console.log(item.owner)
                    let findCustomer = await cutomerModel.findOneAndUpdate({ _id: custID }, { digitalID: item.owner }, { new: true })

                    if (findCustomer) {

                        return res.status(200).send({ status: false, msg: "Digital ID added sucessfullt", findCustomer })
                    }
                }



                console.log("track", result11.owner)

                let findCustomer = await cutomerModel.findOneAndUpdate({ _id: custID })






            } catch (error) {

                return res.status(200).send({ "catch error": error.message })


                result.push(error)
                console.log(result)

            }
        }

        getID()

        //console.log("result", result)

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

//---------------------------------------------------Org-reports---------------------------------------------------------------------------------

const organisationReports = async (req, res) => {
    try {

        const orgID = req.params.orgID;





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
                subject: 'Request for update licenses',
                text: ` Hello! this is ${name} we want to update our licenses please add ${Licenses} Licenses in our licenses account, thakyou`
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

        console.log(new Date())


        let obj = {
            agentID: agentID,
            type: lastUpdate.type,
            Amount: agentAmount,
            startDate: new Date(),
            type: agentAmountType
        }

        console.log(lastUpdate)

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

        console.log("orgID", orgID)


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
        //  console.log("===>", LastMonthData)

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

        console.log("CM===>", Current_Month)
        console.log("LM===>", LastMonthData.length)

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

//-----------------------------------------AcesssKeyTest-----------------------------------------------------------------------------------

const test = async (req, res) => {
    try {

        return res.status(200).send({ status: false, msg: "HELLO WORLD" })

    } catch (error) {
        console.log(error)
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









module.exports.createOrganisation = createOrganisation;
module.exports.getListOfOrganisation = getListOfOrganisation;
module.exports.getListOfOrganisationwithUser = getListOfOrganisationwithUser;
module.exports.deletOrganisation = deletOrganisation;
module.exports.getTransections = getTransections;
module.exports.organisationLogin = organisationLogin;
module.exports.getLogHistory = getLogHistory;
module.exports.addCustomerByOrganisation = addCustomerByOrganisation;
module.exports.getCustomerByFilter = getCustomerByFilter;
module.exports.viewCustomer = viewCustomer;
module.exports.Organisationdashboard = Organisationdashboard;
module.exports.organisationsTransection = organisationsTransection;
module.exports.OrgDashSection = OrgDashSection;
module.exports.OrganisationCustomer = OrganisationCustomer;
module.exports.organisationsTransectionList = organisationsTransectionList;
module.exports.OrganisationCustomerTest = OrganisationCustomerTest;
module.exports.DeleteCustomer = DeleteCustomer;
module.exports.viewAgents = viewAgents;
module.exports.getDataByMonth = getDataByMonth;
module.exports.orgtransectiontransectionList = orgtransectiontransectionList;
module.exports.agentsuspend = agentsuspend;
module.exports.unSuspendagent = unSuspendagent;
module.exports.deleteAgent = deleteAgent;
module.exports.organisationtransectionfillter = organisationtransectionfillter;
module.exports.changePassword = changePassword;
module.exports.orgforgotpassword = orgforgotpassword;
module.exports.orgchangePasswordotp = orgchangePasswordotp;
module.exports.vieworg = vieworg;
module.exports.agentView = agentView;
module.exports.org_update = org_update;
module.exports.createCustomerByOrg = createCustomerByOrg
module.exports.verifyCustomer = verifyCustomer;
module.exports.getOwnerDigitalID = getOwnerDigitalID;
module.exports.getallGigitalIDs = getallGigitalIDs;
module.exports.getInfoByDigitalID = getInfoByDigitalID;
module.exports.updateDigitalID = updateDigitalID;
module.exports.orgList = orgList
module.exports.applyUpdateLicenses = applyUpdateLicenses;
module.exports.LicenseProcess = LicenseProcess;
module.exports.updateCommission = updateCommission;
module.exports.ViewAgentCommmission = ViewAgentCommmission;
module.exports.OrgPerreort = OrgPerreort;
module.exports.org_add_cust = org_add_cust;
module.exports.test = test
module.exports.Cust_Loan_apply = Cust_Loan_apply
module.exports.org_cust_loan = org_cust_loan
module.exports.org_loan_accept = org_loan_accept
module.exports.get_pass_Loans = get_pass_Loans
module.exports.get_Loan_installment = get_Loan_installment
module.exports.Cust_Linked_Srevice_Org = Cust_Linked_Srevice_Org