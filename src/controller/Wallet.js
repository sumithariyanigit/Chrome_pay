const Cust_Wallet = require("../models/Cust_Wallet");
const Wallet_MOdel = require("../models/Cust_Wallet")


//===================================================generation-work==========================================================================

//---------------------------------------------------Generate PCN Number----------------------------------------------------------------------
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



//--------------------------------------------------get-cust-wallet-----------------------------------------------------------------

const get_Cust_wallet = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.statsu(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID" })
        }

        let find_cust_wallet = await Wallet_MOdel.findOne({ customer_ID: custID })
            .populate('customer_ID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })

        return res.status(200).send({ status: true, find_cust_wallet })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------------------------Chrome_pay_wallet_Transection------------------------------------------------------------------

const Chrome_pay_transection = async (req, res, next) => {
    try {
        url = "http://localhost:3000/transaction";
        const sender_phone = req.body.sender_phone;
        const reciever_phone = req.body.receiver_phone;
        const amount1 = req.body.amount;
        const amount = parseInt(amount1)
        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        let find_Limit = await Cust_Wallet.findOne({ customer_ID: custID })

        let tran_limit = find_Limit.Transection_limit



        if (amount > tran_limit) {
            return res.status(200).send({ status: false, msg: `Failed!, Maximum limit for transection ${tran_limit}` })
        }

        if (!sender_phone) {
            return res.send("Please fill all fields")
        }

        if (!reciever_phone) {
            return res.send("Please fill all fields")
        }

        if (!amount1) {
            return res.send("Please fill all fields")
        }


        let findOrganisation = await Organisation.findById({ _id: organisationID })


        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Organisation not found Please select other One" })
        }


        let findrecieverID = await Cust_Wallet.findById({ phone: sender_phone })


        if (!findsenderID) {
            return res.status(200).send({ status: false, msg: "You are not available to transection" })
        }

        let findrecevrID = await customerModel.findById({ _id: reciever })

        if (!findrecevrID) {
            return res.status(200).send({ status: false, msg: "Reciver not available" })
        }

        const PCNnumber = generateString(10).toLowerCase()
        const TransactionID = generateString11(10)

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

        if (!create) {
            let create = await transactionModel.create(failedData)
            return res.status(200).send({ status: false, msg: "Transection Failed", data: create })
        }

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}



module.exports.get_Cust_wallet = get_Cust_wallet