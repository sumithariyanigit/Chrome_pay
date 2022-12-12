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
const nodemailer = require('nodemailer')
const transactionModel = require("../models/transaction");


function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


const createCustomerByOrganization = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.orgID;
        console.log("ID", ID)


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

        console.log("Phone", phone)
        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
        console.log("trim", convert_Number)
        const cheack_cus = await customerModel.findOne({ phone: convert_Number })
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

        // if (!(/^\d{8,20}$/).test(phone)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        // } 

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

            console.log("paylaod", payload)

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

//---------------------------------------------------customer-list------------------------------------------------------------------------------

const Organization_Customers = async (req, res) => {

    try {

        const OrganisationID = req.orgID
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
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            console.log("1")
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


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            console.log("2")
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

//-------------------------------------------verify-customer----------------------------------------------------------------------------

let OrgverifyCustomer = async (req, res) => {
    try {

        const OTP = req.body.OTP
        const phoneNo1 = req.body.phoneNo
        const phoneNo = phoneNo1

        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }

        let trim = phoneNo.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)



        var result = [];

        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }

        // async function doPostRequest() {

        let payload = {
            code: OTP,
            phoneNumber: `+${convert_Number}`
        }

        console.log(payload)



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

            console.log(newCust)


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
           // let delete_cust = await temp_Cust.findOneAndDelete({ phone: convert_Number })
            //console.log(error)
            return res.status(200).send({ status: false, error: error.message, msg: "failed please try again" })
        });

        // return res.status(200).send({ status: false, msg: "customer register sucessfully" })




    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })
    }
}


const OrgcustomerVerify = async (req, res) => {
    try {

        const adminID = req.orgID

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

//----------------------------------------block-custmer-------------------------------------------------------------

const OrgblockCustomer = async (req, res) => {
    try {

        const userID = req.params.customerID;

        console.log("userIDD", userID)

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await cutomerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }



        let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

        return res.status(200).send({ status: 1, msg: "Customer Block Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//-------------------------------------delete-cuts---------------------------------------------------------------------------------------

const OrgDeleteCustomer = async (req, res) => {
    try {

        const customerID = req.params.customerID

        console.log("customerID", customerID)

        if (customerID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Customer Id is required" })
        }

        let findCUstomer = await cutomerModel.findOne({ _id: customerID })
        console.log("findCUstomer", findCUstomer)
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

//----------------------------------------customer-detail------------------------------------------------------------------------------

const Org_custdetail = async (req, res) => {
    try {

        const custID = req.params.customerID
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

//--------------------------------------Update-didgital-ID--------------------------------------------------------------------------------------

const org_updateDigitalID = async (req, res) => {
    try {

        const custID = req.params.customerID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (custID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
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


//--------------------------------------org-transection---------------------------------------------------------------------------------------

const organisation_transections = async (req, res) => {
    try {

        const OrganisationID = req.orgID

        console.log("123")

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

//---------------------------------------------create-agent--------------------------------------------------------------------------

const create_org_Agent = async (req, res) => {
    try {
        let AgentCode = 10000000 + Math.floor(Math.random() * 90000000);
        console.log(AgentCode)

        const data = req.body;
        const orgID = req.orgID
        let findOrg = await Organisation.findOne({ _id: orgID })
        let AgentPass = generatePassword()

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

//------------------------------------------get-agent----------------------------------------------------------------------------------------------

const viewAgent = async (req, res) => {
    try {

        const orgID = req.orgID

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

//------------------------------------------------------agent-suspend-------------------------------------------------------------------------

const agentsuspend = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.orgID

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

//-----------------------------------un-suspend-agent------------------------------------------------------------------------------------

const Org_unSuspendagent = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.orgID

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

        //console.log(checkUser.createdBY)

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

//------------------------------------------------agent-delete----------------------------------------------------------------------------------

const org_deleteAgent = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.orgID;

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

//---------------------------------------agent-perfornamce---------------------------------------------------------------------------------

const Org_agentPerformanceReport = async (req, res) => {
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




module.exports.createCustomerByOrganization = createCustomerByOrganization
module.exports.Organization_Customers = Organization_Customers
module.exports.OrgverifyCustomer = OrgverifyCustomer
module.exports.OrgcustomerVerify = OrgcustomerVerify
module.exports.OrgblockCustomer = OrgblockCustomer
module.exports.OrgDeleteCustomer = OrgDeleteCustomer
module.exports.Org_custdetail = Org_custdetail
module.exports.org_updateDigitalID = org_updateDigitalID
module.exports.organisation_transections = organisation_transections
module.exports.create_org_Agent = create_org_Agent
module.exports.viewAgent = viewAgent
module.exports.agentsuspend = agentsuspend
module.exports.Org_unSuspendagent = Org_unSuspendagent
module.exports.org_deleteAgent = org_deleteAgent
module.exports.Org_agentPerformanceReport = Org_agentPerformanceReport