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
        const cheack_cus = await temp_Cust.findOne({ phone: convert_Number })
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




module.exports.createCustomerByOrganization = createCustomerByOrganization
module.exports.Organization_Customers = Organization_Customers