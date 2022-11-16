const transactionModel = require("../models/transaction")
const customerModel = require("../models/customer");
//const { Organisation, validate } = require("../models/Organisation")

const Organisation = require("../models/Organisation")
const apiHistory = require("../models/apiHistory")
const { Braket } = require("aws-sdk");


//-----------------------------Generate PCN Number--------------------------------------------------------------------------------
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//-------------------------------Generate Tarnsaction ID-------------------------------------------------------------------------

const elements = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString11(length) {
    let result = '';
    const charactersLength = elements.length;
    for (let i = 0; i < length; i++) {
        result += elements.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//-------------------------------Generate Current Date----------------------------------------------------------------------------


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;



//-------------------------------------------------------------------------------------------------------------------------------


const userTransaction = async (req, res, next) => {
    try {
        url = "http://localhost:3000/transaction";
        ////next();();
        const sender = req.body.sender;
        const reciever = req.body.receiver;
        const organisationID = req.body.organisationID;
        const amount1 = req.body.amount;
        const amount = parseInt(amount1)

        if (amount >= 100000) {
            return res.status(200).send({ status: false, msg: "Maximum limit for transection 100000$ " })
        }

        if (!sender) {
            return res.send("Please fill all fields")
        }

        if (!reciever) {
            return res.send("Please fill all fields")
        }

        if (!organisationID) {
            return res.send("Please fill all fields")
        }

        if (!amount1) {
            return res.send("Please fill all fields")
        }


        // let findOrganisation = await organisationModel.findo({_id:organisationID});

        //let findOrganisation = await organisationModel.findById({_id:organisationID})
        let findOrganisation = await Organisation.findById({ _id: organisationID })


        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Organisation not found Please select other One" })
        }


        let findsenderID = await customerModel.findById({ _id: sender })


        if (!findsenderID) {
            return res.status(200).send({ status: false, msg: "You are not available to transection" })
        }

        let findrecevrID = await customerModel.findById({ _id: reciever })

        if (!findrecevrID) {
            return res.status(200).send({ status: false, msg: "Reciver not available" })
        }

        const PCNnumber = generateString(10).toLowerCase()
        const TransactionID = generateString11(10)
        //.toLowerCase()


        sendername = findsenderID.fullname,
            receivername = findrecevrID.fullname


        let data = {
            transactionID: TransactionID,
            senderID: sender,
            recieverID: reciever,
            transactionDate: today,
            PCN: PCNnumber,
            PayInCashier: "",
            PayOutCashier: "",
            senderName: sendername,
            beneficiaryName: receivername,
            sendingAmount: amount,
            receiverAmount: amount,
            Relationship: "",
            status: "Confirmed",
            OrganisationID: organisationID



        }

        let failedData = {
            senderID: sender,
            transactionDate: today,
            PCN: PCNnumber,
            PayInCashier: "",
            PayOutCashier: "",
            senderName: sendername,
            beneficiaryName: receivername,
            sendingAmount: amount,
            receiverAmount: amount,
            Relationship: "",
            status: "Failed"



        }

        let create = await transactionModel.create(data)
        console.log(sendername)
        console.log(receivername)
        console.log(amount)
        console.log(PCNnumber)
        console.log(TransactionID)
        console.log(today)

        if (create) {
            return res.status(200).send({
                status: true, msg: "Transaction done Sucessfully", data: {
                    To: receivername, From: sendername,
                    Amount: amount, transactionID: TransactionID,
                    PCN: PCNnumber,
                    transactionDate: today,
                }
            })
        }

        ////next();();
        if (!create) {
            let create = await transactionModel.create(failedData)
            return res.status(200).send({ status: false, msg: "Transection Failed", data: create })
        }

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


//--------------------------------------get-all-trnsections----------------------------------------------------------------------------------------

const getAllTransections = async (req, res, next) => {
    try {
        url = "http://localhost:3000/getAll";
        //next();();
        let finddata = await transactionModel.find().sort("-1");
        if (finddata.length == 0) {
            return res.status(200).send({ status: false, msg: "No any transection present" })
        }
        //next();();
        return res.status(200).send({ status: true, msg: "Transection data", data: finddata })

    } catch (error) {
        console.log(error)
    }
}


//-----------------------------------------------------Get-Transection-By-ID------------------------------------------------------------------

const getTransectionById = async (req, res, next) => {

    try {
        url = "http://localhost:3000/getTransectionByUser/:ID";
        //next();();
        let userID = req.body.userID;

        //---------------------Pagination-----------------------//

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await customerModel.find({ _id: userID });
        counPages = Math.ceil(countpages11.length / 10)

        //------------------------------------------------------//

        let findUser = await customerModel.find({ _id: userID }).select({ fullname: 1, phone: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let result = [];
        for (user of findUser) {

            let findtransection = await transactionModel.find({ senderID: userID })
            if (findtransection.length == 0) {
                result.push("No Transection Found")
            }



            result.push({ ...user._doc, transaction: findtransection });
        }
        //next();();
        return res.send({ totalPage: counPages, CurrentPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }

}

//-----------------------------get-transection-by-filters-----------------------------------------------------------------------------

const getTransectionByFilters = async (req, res, next) => {
    try {
        url = "http://localhost:3000/getTransectionByFilters";
        //next();();
        let toDate = req.body.todate;
        let fromDate = req.body.fromdate;



        if (!toDate) {
            return res.status(200).send({ status: false, msg: "ToDate and From Date field is required" })
        }

        if (!fromDate) {
            return res.status(200).send({ status: false, msg: "From Date field is required" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        //------------------------count pages----------------------------------------------------------
        let finddate1 = await transactionModel.find({
            createdAt: {
                $gte: new Date(fromDate).toISOString(),
                $lte: new Date(toDate).toISOString()
            }
        })


        counPages = Math.ceil(finddate1.length / 10)
        console.log(counPages)



        let finddate = await transactionModel.find({
            createdAt: {
                $gte: new Date(fromDate).toISOString(),
                $lte: new Date(toDate).toISOString()
            }
        }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();



        let result = [];

        for (users of finddate) {


            let findUser = await customerModel.find({ _id: users.senderID }).select({ fullname: 1, phone: 1 })

            let finalData = {
                _id: users._doc._id,
                transactionID: users._doc.transactionID,
                senderName: findUser.fullName,
                senderID: users._doc.senderID,
                recieverName: users._doc.beneficiaryName,
                recieverID: users._doc.recieverID,
                transactionDate: users._doc.transactionDate,
                PCN: users._doc.PCN,
                PayInCashier: users._doc.PayInCashier,
                PayOutCashier: users._doc.PayOutCashier,
                senderName: users._doc.senderName,
                sendingAmount: users._doc.sendingAmount,
                receiverAmount: users._doc.receiverAmount,
                Relationship: users._doc.Relationship,
                status: users._doc.status,
                createdAt: users._doc.createdAt,
                updatedAt: users._doc.updatedAt,
                __v: users._doc.__v


            }

            result.push({ finalData });

        }

        //next();();
        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}



//--------------------------------------------get-users-total-transection----------------------------------------------------------------------------


const getMaximun = async (req, res, next) => {
    url = "http://localhost:3000/getSum";
    //next();();
    try {
        let userID = req.body.userID;

        const findAll = await transactionModel.find({ senderID: userID });


        let sum = 0;
        let count = 0;
        for (user of findAll) {
            sum += user.sendingAmount
            count++;

        }
        console.log(count)
        //next();();
        return res.status(200).send({ status: true, totalAmount: `${sum}$`, TotalTransection: count })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//-----------------------------------get-data-byPage----------------------------------------------------------------------------------------------


const getByPage = async (req, res, next) => {
    try {

        url = "http://localhost:3000/getByPage";
        //next();();
        let pageNO = req.body.page;

        if (pageNO == 0) {
            pageNO = 1;
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await transactionModel.find();
        counPages = Math.ceil(countpages11.length / 10)


        let overLimit = await transactionModel.find().limit(limit * 1)
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


        //next();();
        return res.status(200).send({ totalPage: counPages, CurrentPage: parseInt(pageNO), data: result })





    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}


//------------------------------------merge-user-and-transection-table----------------------------------------------------------------------



const relationmerge = async (req, res, next) => {
    try {
        url = "http://localhost:3000/relation";
        //next();();
        const findcutomer = await customerModel.find().select({ fullname: 1, phone: 1, email: 1, nationality: 1 });


        let result = [];
        for (items of findcutomer) {
            const findTransection = await transactionModel.find({ senderID: items._id });

            result.push({ ...items._doc, transections: findTransection })
        }


        //next();();
        return res.status(200).send({ status: true, data: result })
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


//--------------------------------------get-transection-By-filter-----------------------------------------------------------------------------//

const getAllTransectionByFilter = async (req, res, next) => {
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

        const searchcriteria = req.body.searchcriteria;
        console.log(Object.keys(req.body))

        let overLimit = await transactionModel.find(
            {
                "$or": [
                    { PCN: { '$regex': req.body.PCN } },

                ], "$or": [

                    { transactionID: { '$regex': req.body.transactionID } },

                ], "$or": [

                    { senderID: { '$regex': req.body.senderID } },

                ],

            }
        ).limit(limit * 1)
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











//----------Modules-Exporst-----------------------//
module.exports.userTransaction = userTransaction;
module.exports.getTransectionById = getTransectionById;
module.exports.getTransectionByFilters = getTransectionByFilters;
module.exports.getAllTransections = getAllTransections;
module.exports.getMaximun = getMaximun;
module.exports.getByPage = getByPage;
module.exports.relationmerge = relationmerge;
module.exports.getAllTransectionByFilter = getAllTransectionByFilter;
