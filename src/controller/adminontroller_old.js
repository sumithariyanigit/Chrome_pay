// const Organisation = require("../models/Organisation");
// const customerModel = require("../models/customer");
// const transactionModel = require("../models/transaction")
// const adminModel = require("../models/AdminModel");
// const jwt = require("jsonwebtoken");
// const logHistory = require("../models/adminLogHistory");
// const { findOne } = require("../models/transaction");
// const adminLogHistory = require("../models/adminLogHistory")
// var adminLogout11 = require("../controller/customer");
// const { findOneAndUpdate } = require("../models/adminLogHistory");

// const createAdmin = async (req, res, next) => {
//     try {
//         url = "http://localhost:3000/Admin";
//         //next();
//         const data = req.body

//         const { name, email, password } = data;

//         if (!name) {
//             return res.status(200).send({ status: false, msg: "Please enter name" });
//         }

//         if (!email) {
//             return res.status(200).send({ status: false, msg: "Please enter name" });
//         }

//         if (!password) {
//             return res.status(200).send({ status: false, msg: "Please enter name" });
//         }

//         let create = await adminModel.create(data)
//         //next();
//         return res.status(201).send({ status: true, msg: "data created", data: create });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ status: false, error: error });
//     }
// }


// //----------------------------------------------Login--------------------------------------------------------------------------------


// const AdminLogin = async (req, res, next) => {
//     try {

//         url = "http://localhost:3000/adminLogin"
//         //next();
//         let email = req.body.email;
//         let password = req.body.password;

//         //const { email, password } = data

//         if (!email) {
//             return res.status(200).send({ 'status': false, 'msg': "enter email" });
//         }

//         if (!password) {
//             return res.status(200).send({ status: false, msg: "enter password" });
//         }

//         let checkEmail = await adminModel.findOne({ email: email });

//         if (!checkEmail) {
//             return res.status(200).send({ status: false, msg: "Please enter valid information" });
//         }

//         if (checkEmail.password !== password) {
//             return res.status(200).send({ status: false, msg: "Please enter valid info" });
//         }

//         //---------Login_History-------------//
//         let adminID = checkEmail._id
//         let findLoginTime = Date.now();

//         var token = jwt.sign({ adminID, email }, 'Admin')
//         res.header("x-api-key", token);
//         //console.log(token)

//         let findAdmindata = await adminModel.findOne({ email: email });


//         let logData = {
//             email: email,
//             UserID: findAdmindata._id,
//             loginTime: findLoginTime,
//             logoutTime: "",

//         }

//         let MakeLogHIstory = await logHistory.create(logData);


//         //-------------------generate-Otp---------------------------------------------------------------//
//         let otp = 100000 + Math.floor(Math.random() * 900000);



//         let collection = {
//             name: checkEmail.name,
//             email: checkEmail.email,
//             password: checkEmail.password,
//             otp: otp,
//             createdAt: checkEmail.createdAt,
//             updatedAt: checkEmail.updatedAt


//         }

//         let create = await adminModel.findOneAndUpdate({ email: email }, collection)
//         let adminId = checkEmail._id;

//         const nodemailer = require("nodemailer");


//         const sentEmail = async (req, res) => {
//             //var email = req.email;
//             //var otp = req.otp;
//             //console.log(email + " ==jk== " + otp);

//             var transporter = nodemailer.createTransport({
//                 host: 'smtp.gmail.com',
//                 port: 465,
//                 secure: true,
//                 auth: {
//                     user: 'satyamrandwa141@gmail.com',
//                     pass: 'czdkvnjunpkxecwh',
//                     // user: 'donotreply@d49.co.in',
//                     //   pass: '&4e=XSQB'
//                 }
//             });


//             var mailOptions = {
//                 from: 'satyamrandwa141@gmail.com',
//                 to: 'satyamthinkdebug@gmail.com',
//                 subject: 'Sending Email using Node.js',
//                 text: 'your OTP is " ' + otp + ' " do not share this otp'
//                 // text : otp
//             };

//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log('email error line 34 ===  ', error);
//                     return false;
//                 } else {
//                     console.log('Email sent: ' + info.messageId);
//                     return info.messageId;
//                 }
//             });



//         }

//         sentEmail();

//         //-------------------------------------------------------------------------------
//         next();
//         return res.status(200).send({ token, adminId });



//     } catch (error) {
//         console.log(error);
//     }
// }


// //---------------------------------------Verify-User-OTP---------------------------------------------------------------------------------------//

// const verifyOTP = async (req, res) => {
//     try {

//         const OTP = req.body.OTP;
//         //const userID = req.body.userID;
//         let admminID = req.userId


//         if (!OTP) {
//             return res.status(200).send({ status: false, msg: "Please Enter OTP" })
//         }

//         let findOTP = await adminModel.findOne({ _id: admminID });

//         if (!findOTP) {
//             return res.status(200).send({ status: false, msg: "User Not Found" })
//         }

//         if (findOTP.otp != OTP) {
//             return res.status(200).send({ status: false, msg: "Invalid OTP" })
//         }

//         return res.status(200).send({ status: true, msg: "Login Sucessfully" })

//         // if (findOTP.otp == OTP) {

//         //     let token = jwt.sign({ userID: userID, Name: findOTP.fullname, email: findOTP.email, phone: findOTP.phone }, 'user')
//         //     return res.status(200).send({ status: true, msg: "Login Sucessfully", token: token })
//         // }




//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, error: error })
//     }
// }




// //-------------------------------------------Get-Admin-Login-History--------------------------------------------------------//

// const getHistory = async (req, res, next) => {
//     try {

//         //----------------------------Pagination------------------------------------------------------------//
//         url = "http://localhost:3000/getAdminHistory"
//         next();
//         let pageNO = req.body.page;
//         if (pageNO == 0) {
//             pageNO = 1
//         }

//         const { page = pageNO, limit = 10 } = req.query;

//         let countpages11 = await adminLogHistory.find();
//         counPages = Math.ceil(countpages11.length / 10)





//         let findData = await adminLogHistory.find().limit(limit * 1)
//             .skip((page - 1) * limit)
//             .exec();


//         let result = [];
//         for (items of findData) {
//             let data = {
//                 Name: items.name,
//                 Email: items.email,
//                 AdminID: items.UserID,
//                 Date: items.loginTime.toISOString().substring(0, 10).replace('T', ' '),
//                 Time: items.loginTime.toISOString().substring(12, 19).replace('T', ' ')

//             }
//             result.push(data)
//         }
//         next();
//         return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

//     } catch (error) {
//         console.log(error);
//         res.status(200).send({ status: false, error: error })
//     }
// }

// //--------------------------------------Amin-Logout--------------------------------------------------------------//

// const adminLogout = async (req, res, next) => {
//     try {
//         url = "http://localhost:3000/Logout";
//         next();
//         let clear = localStorage.removeItem("name of localStorage variable or item to remove");

//         if (clear) {
//             return res.status(200).send({ status: true, msg: "Logout sucessfully" })
//         }


//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, error: error })
//     }
// }

// //------------------------------------Admin-Controller---------------------------------------------------------------------------------

// const LoginAdmin = async (req, res) => {
//     try {
//         let data = req.body;
//         let cheackEmail = await adminModel.findOne({ email: data.email })
//         if (!cheackEmail) {
//             return res.status(200).send("Email is not register")
//         }


//         if (data.password != cheackEmail.password) {
//             return res.status(200).send("password is incorrect")
//         }

//         userId = cheackEmail._id
//         Email = cheackEmail.email

//         let token = jwt.sign({ userID: userId }, 'satyam')

//         return res.status(200).send({ 'token': token })



//     } catch (error) {
//         console.log(error)

//     }
// }


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const admin_login = async (req, res) => {
//     try {
//         let email = req.body.email;
//         let pass = req.body.pass;
//         let token = gen_str(99);

//         adminModel.findOneAndUpdate({ email, pass }, { $set: { token } }, (error, data) => {
//             if (error) { console.log("test errors is == ", error); return res.status(200).send({ 'status': false, 'msg': "Something went wrong please try again", 'body': '' }); }

//             if (data) { data.token = token; return res.status(200).send({ 'status': true, 'msg': "success", 'body': data }); } else {

//                 res.status(200).send({ 'status': false, 'msg': "Invalid User ", 'body': '' });
//             }



//         });



//     } catch (error) {
//         res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
//     }

// }

// //-----------------------------------------------------Admin-Organisation-List-------------------------------------------------------------------


// const OrganisationList = async (req, res) => {

//     try {

//         //const OrganisationID = req.params.ID;
//         // const CustomerName = req.body.customerName;
//         //const status = req.body.Status


//         let countpages = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
//         let totlaRow = countpages.length


//         //let currPage = 0
//         let pageNO = req.body.page;
//         if (pageNO == 0) {
//             pageNO = 1
//         }
//         const { page = pageNO, limit = 10 } = req.query;


//         if (Object.keys(req.body).length <= 1) {
//             let countpages1 = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
//             let totalRaow1 = countpages1.length;
//             let filter = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();

//             // let totlaRow = filter.length;
//             if (filter.length == 0) {
//                 return res.status(200).send({ status: false, msg: "No Customer Found" })
//             }


//             for (items of filter) {

//             }

//             return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
//         }


//         if (req.body.fromDate) {



//             let option = [{ status: req.body.status }, {
//                 createdAt: {
//                     $gte: new Date(req.body.fromDate).toISOString(),
//                     $lte: new Date(req.body.toDate).toISOString()
//                 }
//             }]

//             let countpages2 = await Organisation.find({ isDeleted: 0 })
//             let contRow = countpages2.length
//             let filter = await Organisation.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             if (filter.length == 0) {
//                 return res.status(200).send({ status: false, msg: "No Customer Found" })
//             }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




//         } else {




//             let option = [{ email: req.body.email }, { status: req.body.status }]
//             let countpages3 = await Organisation.find({ $or: option, isDeleted: 0 })
//             let contRow3 = countpages3.length

//             let filter = await Organisation.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             if (filter.length == 0) {
//                 return res.status(200).send({ status: false, msg: "No Customer Found" })
//             }
//             let totlaRow = filter.length;

//             return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })



//         }



//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, msg: error })
//     }
// }


// //--------------------------------Suspend-Organisation----------------------------------------------------------------------------//

// const SuspendOrganisation = async (req, res) => {
//     try {

//         const orgID = req.params.OrganisationID;

//         if (!orgID) {
//             return res.status(200).send({ status: false, msg: "not geting Organisation ID " })
//         }

//         let findOrganisation = await Organisation.findByIdAndUpdate({ _id: orgID }, { blocked: 1 }, { new: true })


//         if (!findOrganisation) {
//             return res.status(200).send({ status: false, msg: "Process failed please try again" })
//         }

//         return res.status(200).send({ status: true, msg: "Organisation Blocked Sucessfully" })

//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error })
//     }
// }

// //----------------------------------------------Un-Suspend-Organisation--------------------------------------------------------------------------

// const Un_suspend_Organisation = async (req, res) => {
//     try {

//         const OrganisationID = req.params.OrganisationID;

//         if (!OrganisationID) {
//             return res.status(200).send({ status: false, msg: "not getting Organisation ID " })
//         }

//         let findOrganisation = await Organisation.findByIdAndUpdate({ _id: OrganisationID }, { blocked: 0 }, { new: true })


//         if (!findOrganisation) {
//             return res.status(200).send({ status: false, msg: "Process failed please try again" })
//         }

//         return res.status(200).send({ status: true, msg: "Organisation Un-Blocked Sucessfully" })

//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error })
//     }
// }








// //----------------------------------------------Delete-Organisation--------------------------------------------------------------------------------

// const deleteOrganisation = async (req, res) => {

//     try {

//         const OrganisationID = req.params.OrganisationID;

//         if (!OrganisationID) {
//             return res.status(200).send({ status: false, msg: "Not getting organisation ID" })
//         }

//         let findOrganisation = await Organisation.findByIdAndUpdate({ _id: OrganisationID }, { isDeleted: 1 }, { new: true })



//         if (!findOrganisation) {
//             return res.status(200).send({ status: false, msg: "Process failed please try again" })
//         }

//         return res.status(200).send({ status: true, msg: "Organisation deleted Sucessfully" })




//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error })
//     }
// }




// //----------------------------------Admin-Test-Filter-Data-Customer----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////////////////


// const AdminCustomerList = async (req, res) => {

//     try {

//        // const OrganisationID = req.params.ID;
//        // const CustomerName = req.body.customerName;
//         //const status = req.body.Status



//         let countpages = await customerModel.find({ isDeleted: 0 }).sort({ createdAt: -1 })
//         let totlaRow = countpages.length


//         // if (!OrganisationID) {
//         //     return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
//         // }

//         //let currPage = 0
//         let pageNO = req.body.page;
//         if (pageNO == 0) {
//             pageNO = 1
//         }
//         const { page = pageNO, limit = 10 } = req.query;
//         let ID1 = req.body.ID

//         if (Object.keys(req.body).length <= 1) {
//             let countpages1 = await customerModel.find({ isDeleted: 0 }).sort({ createdAt: 1 })
//             let totalRaow1 = countpages1.length;
//             let filter = await customerModel.find({ isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             // let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
//         } else if (req.body.nationality || req.body.status) {
//             let option = [{ nationality: req.body.nationality }, { status: req.body.status }]

//             let countpages2 = await customerModel.find({ $or: option, isDeleted: 0 })
//             let contRow = countpages2.length
//             let filter = await customerModel.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

//         } else if (req.body.fromDate) {



//             let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }, {
//                 createdAt: {
//                     $gte: new Date(req.body.fromDate).toISOString(),
//                     $lte: new Date(req.body.toDate).toISOString()
//                 }
//             }]

//             let countpages2 = await customerModel.find({ $or: option, isDeleted: 0 })
//             let contRow = countpages2.length
//             let filter = await customerModel.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




//         }







//         else if (req.body.ID.length <= 0 && req.body.phone.length <= 0 && req.body.phone.length <= 0 && req.body.status.length <= 0 && req.body.nationality.length <= 0 && req.body.fromDate.length <= 0 && req.body.toDate.length <= 0) {
//             let countpages2 = await customerModel.find({ isDeleted: 0 })
//             let contRow = countpages2.length
//             let filter = await customerModel.find({ isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
//         }

//         // let ID = req.body.ID
//         //console.log(ID.length)
//         else if (req.body.ID && req.body.ID > 0) {
//             let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

//             let countpages2 = await customerModel.find({ $or: option, isDeleted: 0 })
//             let contRow = countpages2.length
//             let filter = await customerModel.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




//         } else if (req.body.ID.length > 2) {


//             let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

//             let countpages2 = await customerModel.find({ $or: option, isDeleted: 0 })
//             let contRow = countpages2.length
//             let filter = await customerModel.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

//         }


//         else {




//             let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
//             let countpages3 = await customerModel.find({ $or: option })
//             let contRow3 = countpages3.length

//             let filter = await customerModel.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found1" })
//             // }
//             let totlaRow = filter.length;

//             return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })



//         }



//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, msg: error })
//     }
// }


// //------------------------------Suspend-Customer---------------------------------------------------------------------------------------------
// const suspendCustomer = async (req, res) => {
//     try {

//         const userID = req.params.ID;

//         if (!userID) {
//             return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
//         }

//         let checkUser = await customerModel.findOne({ _id: userID })
//         if (!checkUser) {
//             return res.status(200).send({ status: false, msg: "No User Found" })
//         }
//         if (checkUser.blocked == 1) {
//             return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
//         }



//         let BlockUser = await customerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

//         return res.status(200).send({ status: 1, msg: "Customer Block Sucessfully" })





//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error })
//     }
// }


// //--------------------------un-Suspend-Customer---------------------------------------------------------------------------------------------

// const UnsuspendCustomer = async (req, res) => {
//     try {

//         const userID = req.params.ID;

//         if (!userID) {
//             return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
//         }

//         let checkUser = await customerModel.findOne({ _id: userID })
//         if (!checkUser) {
//             return res.status(200).send({ status: false, msg: "No User Found" })
//         }
//         if (checkUser.blocked == 0) {
//             return res.status(200).send({ status: 1, msg: "Customer Already Unbolcked" })
//         }



//         let BlockUser = await customerModel.findOneAndUpdate({ _id: userID }, { blocked: 0 }, { new: true })

//         return res.status(200).send({ status: 0, msg: "Customer Unblock Sucessfully" })





//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error })
//     }
// }

// //----------------------------------------------DeleteCustomer-----------------------------------------------------------------------------//
// const DeleteCustomer = async (req, res) => {
//     try {

//         const customerID = req.params.ID

//         if (!customerID.length) {
//             return res.status(200).send({ status: false, msg: "Customer Id is required" })
//         }

//         let findCUstomer = await customerModel.findOne({ _id: customerID })
//         if (!findCUstomer) {
//             return res.status(200).send({ status: false, msg: "Customer not found" })
//         }

//         if (findCUstomer.isDeleted == 1) {
//             return res.status(200).send({ Status: false, msg: "Customer already deleted" })
//         }

//         let update = await customerModel.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 }, { new: true })

//         return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, msg: error })
//     }
// }

// //------------------------------------------------------Transection-list---------------------------------------------------------------------------


// const AdminTransectionList = async (req, res, next) => {
//     try {



//         url = "http://localhost:3000/getByPage";
//         ////next();();
//         let pageNO = req.body.page;

//         if (pageNO == 0) {
//             pageNO = 1;
//         }
//         const { page = pageNO, limit = 10 } = req.query;

//         let countpages11 = await transactionModel.find();
//         counPages = Math.ceil(countpages11.length / 10)

//         if (Object.keys(req.body).length <= 1) {
//             let countpages1 = await transactionModel.find().sort({ createdAt: 1 })
//             let totalRaow1 = countpages1.length;
//             let filter = await transactionModel.find().sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();

//             return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })



//         } else if (req.body.PCN || req.body.senderName || req.body.beneficiaryName || req.body.PayInCashier || req.body.amountRange) {




//             let option = [{ PCN: req.body.PCN }, { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName },
//             { PayInCashier: req.body.PayInCashier }, { sendingAmount: req.body.amountRange }]

//             let countpages2 = await transactionModel.find({ $or: option })
//             let contRow = countpages2.length
//             let filter = await transactionModel.find({ $or: option }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

//         } else if (req.body.DateRange.length > 1) {
//             let option = [{
//                 createdAt: {
//                     $lte: new Date(req.body.DateRange).toISOString()
//                 }
//             }]

//             let countpages2 = await transactionModel.find({ $or: option })
//             let contRow = countpages2.length
//             let filter = await transactionModel.find({ $or: option }).sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit)
//                 .exec();
//             let totlaRow = filter.length;
//             // if (filter.length == 0) {
//             //     return res.status(200).send({ status: false, msg: "No Customer Found" })
//             // }
//             return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

//         }





//         let option = [{ PCN: req.body.PCN }, { Relationship: req.body.Relationship }]

//         // const searchcriteria = req.body.searchcriteria;
//         console.log(Object.keys(req.body))

//         let overLimit = await transactionModel.find({ $or: option }).limit(limit * 1)
//             .skip((page - 1) * limit)
//             .exec();
//         let result = [];
//         for (users of overLimit) {

//             let finalData = {
//                 _id: users._id,
//                 transactionID: users.transactionID,
//                 senderName: users.fullName,
//                 senderID: users.senderID,
//                 recieverName: users.beneficiaryName,
//                 recieverID: users.recieverID,
//                 transactionDate: users.transactionDate,
//                 PCN: users.PCN,
//                 PayInCashier: users.PayInCashier,
//                 PayOutCashier: users.PayOutCashier,
//                 senderName: users.senderName,
//                 sendingAmount: users.sendingAmount,
//                 receiverAmount: users.receiverAmount,
//                 Relationship: users.Relationship,
//                 status: users.status,
//                 createdAt: users.createdAt,
//                 updatedAt: users.updatedAt,
//                 __v: users.__v


//             }

//             result.push(finalData)
//         }

//         ////next();();
//         return res.status(200).send({ totalPage: counPages, CurrentPage: parseInt(pageNO), data: result })





//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, error: error })
//     }
// }













// module.exports.createAdmin = createAdmin;
// module.exports.AdminLogin = AdminLogin;
// module.exports.getHistory = getHistory;
// module.exports.adminLogout = adminLogout;
// module.exports.LoginAdmin = LoginAdmin;
// module.exports.admin_login = admin_login;
// module.exports.verifyOTP = verifyOTP;
// module.exports.OrganisationList = OrganisationList;
// module.exports.SuspendOrganisation = SuspendOrganisation;
// module.exports.Un_suspend_Organisation = Un_suspend_Organisation;
// module.exports.deleteOrganisation = deleteOrganisation;
// module.exports.AdminCustomerList = AdminCustomerList;
// module.exports.suspendCustomer = suspendCustomer;
// module.exports.UnsuspendCustomer = UnsuspendCustomer;
// module.exports.DeleteCustomer = DeleteCustomer;
// module.exports.AdminTransectionList = AdminTransectionList;
