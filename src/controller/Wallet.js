const Cust_Wallet = require("../models/Cust_Wallet");
const Wallet_MOdel = require("../models/Cust_Wallet")
const transactionModel = require("../models/Chrome_pay_Transections")
const customerModel = require("../models/customer");
const { findOneAndUpdate } = require("../models/customer");
const { findOne } = require("../models/Chrome_pay_Transections");


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
        const reciever_phone1 = req.body.receiver_phone;
        const reciever_phone = parseInt(reciever_phone1)
        const amount1 = req.body.amount;
        const amount = parseInt(amount1)
        const custID = req.params.custID;


        //----------------------------VALIDATIONS---------------------------------------------------------------
        if (!custID) {
            return res.status(200).send({ status: false, msg: "please enter customer ID" })
        }

        let find_Limit = await Cust_Wallet.findOne({ customer_ID: custID })

        if (amount > find_Limit.current_Amount) {
            return res.status(200).send({ status: false, msg: `Failed!, Insufficient Fund` })
        }

        let tran_limit = find_Limit.Transection_limit
        let phoneNO = find_Limit.phone
        let walletAdress = find_Limit.wallet_Address.slice(42, 46)
        let Date = new Date();
        let currentDAte = Date.getDate();
        let current_Month = Date.getMonth() + 1;
        let current_year = Date.getFullYear();
        let today_date = `${currentDAte}-${current_Month}-${current_year}`

        var d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();




        if (reciever_phone == phoneNO) {
            return res.statsu(200).send({ status: false, msg: "Permission denied!, your phone number is same" })
        }

        if (amount > tran_limit) {
            return res.status(200).send({ status: false, msg: `Failed!, Maximum limit for transection ${tran_limit}` })
        }

        if (!reciever_phone) {
            return res.status(200).send({ status: false, msg: "please fill all fields" })
        }

        if (!amount1) {
            return res.status(200).send({ status: false, msg: "please fill all fields" })
        }

        let findrecieverID = await Cust_Wallet.findOne({ phone: reciever_phone })

        let wallet_address = findrecieverID.wallet_Address

        if (!findrecieverID) {
            return res.status(200).send({ status: false, msg: "This user is not available in chrome pay" })
        }

        let find_cust_wallet = await Wallet_MOdel.findOne({ customer_ID: custID })
            .populate('customer_ID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })

        let findrecevrID = await customerModel.findOne({ phone: reciever_phone })

        console.log("findrecevrID", findrecevrID)

        if (!findrecevrID) {
            return res.status(200).send({ status: false, msg: "Receiver is not available" })
        }

        //-------------------------------------------STORE-DATA---------------------------------------------------------



        const PCNnumber = generateString(10).toLowerCase()
        const TransactionID = generateString11(10)

        sendername = find_cust_wallet.customer_ID.fullname,
            receivername = findrecevrID.fullname
        reciever_ID = findrecevrID._id


        let data = {
            transactionID: TransactionID,
            senderID: custID,
            recieverID: reciever_ID,
            transactionDate: today,
            PCN: PCNnumber,
            senderName: sendername,
            recieverName: receivername,
            sendingAmount: amount,
            receivingAmount: amount,
            Relationship: "",
            status: "Confirmed",
        }

        let failedData = {
            senderID: custID,
            recieverID: reciever_ID,
            transactionDate: today,
            PCN: PCNnumber,
            senderName: sendername,
            recieverName: receivername,
            sendingAmount: amount,
            receivingAmount: amount,
            Relationship: "",
            status: "Failed"

        }

        let create = await transactionModel.create(data)





        if (create) {


            //---------------------manage-account-amount-----------------------------------------------------------------------

            //---------------sender-amount---------------------------------------------------------
            let find_Current_Amount = await Wallet_MOdel.findOne({ customer_ID: custID })
            let curr_amount = find_Current_Amount.current_Amount
            let substracting_amount = curr_amount - amount
            const find_sender_account = await Wallet_MOdel.findOneAndUpdate({ customer_ID: custID }, { current_Amount: substracting_amount })

            //--------------reciver-amount---------------------------------------------------------

            let find_reciver_Current_Amount = await Wallet_MOdel.findOne({ phone: reciever_phone })
            let reciver_curr_amount = find_reciver_Current_Amount.current_Amount
            let add_amount = reciver_curr_amount + amount
            const find_reciver_account = await Wallet_MOdel.findOneAndUpdate({ phone: reciever_phone }, { current_Amount: add_amount })

            //------------------------send-messege-to-sender------------------------------------------------------------------------
            const send_mobile_otp = async (req, res) => {

                let mobile = 9877487381 //phoneNO
                let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=W/A+${walletAdress}+debited+$+${amount}+DT+${today_date}+${`${h}-${m}-${s}`}+thru+${wallet_address}+$+${amount}+Not u?Fwd this SMS to Chrome_pay to block Chrome_pay wallet+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;



                // W/A XX8925 debited INR 30.00 Dt 20-11-22 19:25 thru UPI:269048149795.Bal INR 144.32 Not u?Fwd this SMS to 9264092640 to block UPI.Download PNB ONE-PNB
                try {
                    return await axios.get(url).then(function (response) {
                        //console.log(response);
                        return response;
                    });
                } catch (error) {
                    console.log(error);
                }
            }

            send_mobile_otp();


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
        return res.status(200).send({ status: false, msg: error.message })
    }
}



module.exports.get_Cust_wallet = get_Cust_wallet;
module.exports.Chrome_pay_transection = Chrome_pay_transection;