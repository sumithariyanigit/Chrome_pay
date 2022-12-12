const transactionModel = require("../models/transaction")
const customerModel = require("../models/customer");
//const { Organisation, validate } = require("../models/Organisation")
let customer_logs = require("../models/Customer_logs")

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
            let obj = {
                customer_ID: sender,
                activity: `Transfer of ${amount}$ Success`,
                status: 'Pass',
                field: "Withdraw",
                field_status: "sucess"
            }

            let create_logs = await customer_logs.create(obj)

            let obj1 = {
                customer_ID: reciever,
                activity: `Received of ${amount}$ Success`,
                status: 'Pass',
                field: "Deposit",
                field_status: "sucess"
            }

            let create_logs1 = await customer_logs.create(obj1)


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
            let obj = {
                customer_ID: senderID,
                activity: `Transfer of ${amount}$ Failed`,
                status: 'Failed',
                field: "Withdraw",
                field_status: "sucess"
            }

            let create_logs = await customer_logs.create(obj)


            let obj1 = {
                customer_ID: reciever,
                activity: `Received of ${amount}$ Failed`,
                status: 'Failed',
                field: "Deposit",
                field_status: "sucess"
            }

            let create_logs1 = await customer_logs.create(obj1)



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




//----------Modules-Exporst-----------------------//
module.exports.userTransaction = userTransaction;
