const customer_Model = require("../models/customer")
const organisation_Model = require("../models/Organisation")
const transectionModel = require("../models/transaction");
const cust_Bank = require("../models/customerBank")
const Chrome_pay_wallet = require("../models/Cust_Wallet")
const cust_bank = require('../models/customerBank')
const Chrome_pay_transections = require("../models/Chrome_pay_Transections")
const Loan_applay_customer = require("../models/Loan_apllied_by")
const customer_logs = require("../models/Customer_logs")
const axios = require('axios')
const jwt = require('jsonwebtoken')
var moment = require('moment');
const nodemailer = require('nodemailer')
const customer_bills = require("../models/customer_bill_pay")
const customer_recharge = require("../models/mobile_data")
const customer_loan_installment = require("../models/LoanInsatallMent")


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

//---------------------------------------------------customer-login----------------------------------------------------------------------------

const cust_login = async (req, res) => {
    try {

        const phone1 = req.body.phone;
        const phone = parseInt(phone1)

        const password = req.body.password;

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone number" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })
        }

        let find_cust = await customer_Model.findOne({ phone: phone })

        if (!find_cust) {
            return res.status(200).send({ status: false, msg: "Invalid, Please register first" })
        }

        if (find_cust.password !== password) {
            return res.status(200).send({ status: false, msg: "Please enter valid password" })
        }

        //----------------generate-otp------------------------------------------------------------------------
        let otp = 100000 + Math.floor(Math.random() * 900000);

        let store_otp = await customer_Model.findOneAndUpdate({ phone: phone }, { login_otp: otp })


        const send_mobile_otp = async (req, res) => {

            let mobile = phone;
            let otp1 = otp;

            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp1}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {
                    //console.log(response);
                    return response;
                });
            } catch (error) {
                console.log(error);
            }
        }

        await send_mobile_otp();

        return res.status(200).send({ status: true, msg: "OTP send sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------------verify_otp-------------------------------------------------------------------------------------

const cust_opt_verify = async (req, res) => {
    try {

        const phone = req.body.phone;
        const otp1 = parseInt(req.body.otp)
        const otp = otp1

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone number" })
        }

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter OTP" })
        }

        let find_cust = await customer_Model.findOne({ phone: phone })

        if (!find_cust) {
            return res.status(200).send({ status: false, msg: "Invalid, Please try again" })
        }

        let custID = find_cust._id
        let email = find_cust.email
        let agentID1 = find_cust.createdBY
        let agentID = agentID1[0]

        // console.log(orgID[0])



        if (find_cust.login_otp !== otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })

        }

        let FakeOTP = 100000 + Math.floor(Math.random() * 900000);

        let token = jwt.sign({ custID, email, agentID }, 'Customer')

        if (find_cust.login_otp == otp) {
            console.log("find")
            let update_otp = await customer_Model.findOneAndUpdate({ phone: phone }, { login_otp: FakeOTP })
        }


        let obj1 = {
            customer_ID: custID,
            activity: `Chromepay login`,
            status: 'Failed',
            field: 'Login',
            field_status: "sucess"
        }

        let create_logs1 = await customer_logs.create(obj1)

        return res.status(200).send({ status: true, msg: "login sucessfully", token })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------get-cust-organization-----------------------------------------------------------------------------------


const get_cust_org = async (req, res) => {
    try {

        const custID = req.userId

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer  ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })

        }

        let find_org = await customer_Model.findById({ _id: custID })
        let Organisation = find_org.organisation

        let outPut = []

        for (let i of Organisation) {
            let find_org_detail = await organisation_Model.findOne({ _id: i })
            outPut.push(find_org_detail)
        }

        return res.status(200).send({ status: true, data: outPut })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------customer-credit-score--------------------------------------------------------------------------


const Calculate_credit_Score_customer = async (req, res) => {
    try {

        const custID = req.userId

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }

        //--------------------------------calculate_latest_Transection_10%----------------------------------------------------------------------

        let today_Date = new Date()
        let date_form = moment(today_Date).format('YYYY/MM/DD')
        let Curr_month = today_Date.getMonth() + 1;
        let Curr_year = today_Date.getFullYear();
        let Curr_day = today_Date.getDate();
        let last_day = Curr_day + 1
        let last_Month = Curr_month - 3
        let last_Year = Curr_year

        if (Curr_month == 1 || Curr_month == 2) {
            Curr_year = Curr_year - 1

        }

        let option = [{
            createdAt: {
                $gte: new Date(`${Curr_year}-${last_Month}-${Curr_day}`).toISOString(),
                $lte: new Date(`${Curr_year}-${Curr_month}-${last_day}`).toISOString()
            }
        }]

        let findsendingAmount = await transectionModel.find({ $or: option, senderID: custID })
        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await transectionModel.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }

        let final = sendindAmount + receiveAmount

        let creditScore = 0
        if (final > 4000 && final <= 8000) {
            creditScore = 30
        } else if (final > 2000 && final <= 4000) {
            creditScore = 20
        }
        else if (final > 8000 && final <= 10000) {
            creditScore = 40
        } else if (final > 10000 && final <= 15000) {
            creditScore = 55
        } else if (final > 15000) {
            creditScore = 60
        }

        //----------------------------------Types-of-accounts---------------------------------------------------------------------------------

        let findBanks = await cust_Bank.find({ customerID: custID }).distinct("Accounttype")

        let Account_Credit = 0
        if (findBanks.length == 1) {
            Account_Credit = 30
        } else if (findBanks.length == 2) {
            Account_Credit = 45
        } else if (findBanks.length == 3) {
            Account_Credit = 55
        } else if (findBanks.length > 4) {
            Account_Credit = 60
        }

        //---------------------------------Credit-Scoring-Length--------------------------------------------------------------------------


        let find_Transections = await transectionModel.find({ senderID: custID })

        let current_Transection = find_Transections.pop()
        let very_first_transection = find_Transections[0]

        let current_Transection_Date = current_Transection.createdAt;
        let very_first_transection_Date = very_first_transection.createdAt;

        let current_Month = current_Transection_Date.getMonth() + 1
        let current_Year = current_Transection_Date.getFullYear()
        let current_Day = current_Transection_Date.getDate()

        let very_first_Month = very_first_transection_Date.getMonth() + 1
        let very_first_Year = very_first_transection_Date.getFullYear()
        let very_first_Day = very_first_transection_Date.getDate()

        let currYear = `${current_Month}/${current_Day}/${current_Year}`
        let firstYear = `${very_first_Month}/${very_first_Day}/${very_first_Year}`

        var date1 = new Date(firstYear);
        var date2 = new Date(currYear);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        let find_History_Months = Math.round(Difference_In_Days / 30.5)
        let credit_score = 0;

        if ((find_History_Months >= 1) && (find_History_Months <= 3)) {
            credit_score = 20
        }
        else if ((find_History_Months <= 4) && (find_History_Months >= 2)) {
            credit_score = 30
        } else if (find_History_Months <= 8 && find_History_Months >= 5) {
            credit_score = 50
        } else if ((find_History_Months <= 12) && (find_History_Months >= 9)) {
            credit_score = 60
        } else if ((find_History_Months <= 18) && (find_History_Months >= 13)) {
            credit_score = 75
        } else if ((find_History_Months <= 30) && (find_History_Months > 19)) {
            credit_score = 85
        } else if (find_History_Months > 30) {
            credit_score = 90
        }






        //----------------------------------------Amount_owed_Score_calculation-----------------------------------------------------


        let current_balance = 5000

        let Insatallment_Score = "A+"

        let Loan_Pay_History = "A+"


        let Owe_Credit = 0

        if (current_balance > 0 && current_balance <= 500) {
            Owe_Credit = 15
        }
        else if (current_balance > 500 && current_balance <= 1000) {
            Owe_Credit = 20
        }
        else if (current_balance > 1000 && current_balance <= 2000) {
            Owe_Credit = 30;
        } else if (current_balance > 2000 && current_balance <= 5000) {
            Owe_Credit = 45;
        } else if (current_balance > 5000 && current_balance <= 8000) {
            Owe_Credit = 55;
        } else if (current_balance > 8000) {
            Owe_Credit = 60;
        }


        //-------------------------installment-credit-----------------------------------------




        let Installment_Credit = 0

        if (Insatallment_Score == "D") {
            Installment_Credit = 5
        }
        else if (Insatallment_Score == "C") {
            Installment_Credit = 20
        }
        else if (Insatallment_Score == "B") {
            Installment_Credit = 30;
        } else if (Insatallment_Score == "A") {
            Installment_Credit = 45;
        } else if (Insatallment_Score == "A+") {
            Installment_Credit = 60;
        }


        //---------------------Loan-credit---------------------------------------------------------

        let Loan_Credit = 0

        if (Loan_Pay_History == "D") {
            Loan_Credit = 5
        }
        else if (Loan_Pay_History == "C") {
            Loan_Credit = 20
        }
        else if (Loan_Pay_History == "B") {
            Loan_Credit = 30;
        } else if (Loan_Pay_History == "A") {
            Loan_Credit = 45;
        } else if (Loan_Pay_History == "A+") {
            Loan_Credit = 60;
        }


        let final_cal_owe = Owe_Credit + Installment_Credit + Loan_Credit


        //-------------------------------------------------payment_History--------------------------------------------------------------------------


        let Pay_back_Score = "A+"

        let Loan_Pay_Score = "A+"


        //-------------------------installment-credit-----------------------------------------
        let Pay_back_Score_Credit = 0

        if (Pay_back_Score == "D") {
            Pay_back_Score_Credit = 15
        }
        else if (Pay_back_Score == "C") {
            Pay_back_Score_Credit = 35
        }
        else if (Pay_back_Score == "B") {
            Pay_back_Score_Credit = 60;
        } else if (Pay_back_Score == "A") {
            Pay_back_Score_Credit = 90;
        } else if (Pay_back_Score == "A+") {
            Pay_back_Score_Credit = 105;
        }


        //---------------------Loan-credit---------------------------------------------------------

        let Loan_Pay_Score_credit = 0

        if (Loan_Pay_Score == "D") {
            Loan_Pay_Score_credit = 15
        }

        else if (Loan_Pay_Score == "C") {
            Loan_Pay_Score_credit = 35
        }

        else if (Loan_Pay_Score == "B") {
            Loan_Pay_Score_credit = 60;
        }
        else if (Loan_Pay_Score == "A") {
            Loan_Pay_Score_credit = 90;
        }
        else if (Loan_Pay_Score == "A+") {
            Loan_Pay_Score_credit = 105;
        }


        let Payment_His = Pay_back_Score_Credit + Loan_Pay_Score_credit




        //----------------------------final_calculation-------------------------------------

        let CREDIT_SCORE = 300 + creditScore + Account_Credit + credit_score + final_cal_owe + Payment_His

        let percentage = `0.${CREDIT_SCORE / 900 * 100}`
        let slice = percentage.slice(0, 4)
        let per = Number(slice)
        console.log("PER", slice)
        console.log("PER", percentage)



        return res.status(200).send({ status: true, CREDIT_SCORE, CREDIT_PERCENTEGE: per })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------customer-dash-board-------------------------------------------------------------------------------------

const customer_dash = async (req, res) => {
    try {

        const custID = req.userId;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer  ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }


        let Location = 0;
        let findsendingAmount = await transectionModel.find({ senderID: custID })
        let findCust = await customer_Model.findOne({ _id: custID })
        if (findCust.Latitude.length > 0) {
            Location = 1
        }



        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await transectionModel.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }

        let totalAmount = sendindAmount + receiveAmount;

        let findtotalTransection = await transectionModel.find({ senderID: custID })
        let findtotlaTrans = await transectionModel.find({ recieverID: custID })

        var totalTransection = findtotalTransection.length + findtotlaTrans.length



        let findProfilePercentage = await customer_Model.findOne({ _id: custID })

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

        if (findCust.Latitude.length && findCust.Longitude.length) {
            proPercentage += 33
            var location = 1
        } else {
            var location = 0
        }

        //--------------------------------let-find-chrome-pay-wallet--------------------------------------------------------------------


        const chrome_pay_wallet = await Chrome_pay_wallet.findOne({ customer_ID: custID })

        let chrome_wallet = chrome_pay_wallet.wallet_Address

        //-------------------------------let-find-cust-bank-----------------------------------------------------------------------------

        let find_banks = await cust_Bank.find({ customerID: custID })

        return res.status(200).send({ status: true, findCust, custBanks: find_banks, totalAmount, proPercentage, totalTransection, receiveAmount, sendindAmount, chrome_wallet, Location })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//----------------------------------------------------fuse-wallet-------------------------------------------------------------------------------

const Fuse_wallet_transections = async (req, res) => {
    try {

        const custID = req.userId

        //-----------------Pagination-----------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let find_fuse_sending_trans1 = await transectionModel.find({ senderID: custID })
        let find_fuse_recived_trans1 = await transectionModel.find({ recieverID: custID })
        let transecions1 = find_fuse_sending_trans1.concat(find_fuse_recived_trans1)
        let countPages = transecions1.length


        let find_fuse_sending_trans = await transectionModel.find({ senderID: custID }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let find_fuse_recived_trans = await transectionModel.find({ recieverID: custID }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let transecions = find_fuse_sending_trans.concat(find_fuse_recived_trans)

        let sort_trans = []
        transecions.sort(function (a, b) {

            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return res.status(200).send({ status: true, totalPages: countPages, currenPage: parseInt(pageNO), transecions })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const Fuse_wallet_dash = async (req, res) => {
    try {

        const custID = req.userId;

        let find_cust = await customer_Model.findById({ _id: custID }).select({ IDphoto: 1, email: 1, fullname: 1, phone: 1, walletAddress: 1 })

        let findsendingAmount = await transectionModel.find({ senderID: custID })


        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await transectionModel.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }

        let totalAmount = sendindAmount + receiveAmount;

        return res.status(200).send({ status: true, find_cust, totalAmount, receiveAmount, sendindAmount })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------Chrome_pay_transections-------------------------------------------------------------------------------

const Chrome_pay_trans = async (req, res) => {
    try {

        const custID = req.userId;


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let find_fuse_sending_trans1 = await Chrome_pay_transections.find({ senderID: custID })
        let find_fuse_recived_trans1 = await Chrome_pay_transections.find({ recieverID: custID })
        let transecions1 = find_fuse_sending_trans1.concat(find_fuse_recived_trans1)
        let countPages = transecions1.length


        let find_fuse_sending_trans = await Chrome_pay_transections.find({ senderID: custID }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let find_fuse_recived_trans = await Chrome_pay_transections.find({ recieverID: custID }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let transecions = find_fuse_sending_trans.concat(find_fuse_recived_trans)

        let sort_trans = []
        transecions.sort(function (a, b) {

            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return res.status(200).send({ status: true, totalPages: countPages, currenPage: parseInt(pageNO), transecions })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------Chrome_pay_dash--------------------------------------------------------------------------------------


const Chrome_pay_dash = async (req, res) => {
    try {

        const custID = req.userId;

        let find_cust = await customer_Model.findById({ _id: custID }).select({ IDphoto: 1, email: 1, fullname: 1, phone: 1 })

        let findsendingAmount = await Chrome_pay_transections.find({ senderID: custID })

        let find_chrome_wallet = await Chrome_pay_wallet.findOne({ customer_ID: custID })

        console.log("chrome", find_chrome_wallet)

        let hash_chrome_wallet = find_chrome_wallet.wallet_Address.slice(40, 46)
        let chrome_wallet = find_chrome_wallet.wallet_Address
        let Transection_limit = find_chrome_wallet.Transection_limit
        let current_Amount = find_chrome_wallet.current_Amount

        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await Chrome_pay_transections.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }
        let totalAmount = sendindAmount + receiveAmount;


        return res.status(200).send({ status: true, find_cust, totalAmount, receiveAmount, sendindAmount, chrome_wallet, hash_chrome_wallet, current_Amount, Transection_limit })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//-----------------------------------------Chrome_pay_Payment---------------------------------------------------------------------------------

const Chrome_pay_cust_transection = async (req, res, next) => {
    try {


        const custID = req.userId;



        const sender_phone = req.body.sender_phone;
        const reciever_phone1 = req.body.receiver_phone;
        const reciever_phone = parseInt(reciever_phone1)
        const amount1 = req.body.amount;
        const amount = parseInt(amount1)


        //----------------------------VALIDATIONS---------------------------------------------------------------
        if (!custID) {
            return res.status(200).send({ status: false, msg: "please enter customer ID" })
        }

        let find_Limit = await Chrome_pay_wallet.findOne({ customer_ID: custID })

        if (amount > find_Limit.current_Amount) {
            return res.status(200).send({ status: false, msg: `Failed!, Insufficient Fund` })
        }

        let tran_limit = find_Limit.Transection_limit
        let phoneNO = find_Limit.phone
        let walletAdress = find_Limit.wallet_Address.slice(42, 46)
        let Date1 = new Date();
        let currentDAte = Date1.getDate();
        let current_Month = Date1.getMonth() + 1;
        let current_year = Date1.getFullYear();
        let today_date = `${currentDAte}-${current_Month}-${current_year}`

        var d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        let current_time = `${h}-${m}-${s}`




        if (reciever_phone == phoneNO) {
            return res.statsu(200).send({ status: false, msg: "Permission denied!, your phone number is same" })
        }

        if (amount > tran_limit) {
            return res.status(200).send({ status: false, msg: `Failed!, Maximum limit for transection ${tran_limit}` })
        }

        if (!reciever_phone) {
            return res.status(200).send({ status: false, msg: "please fill all fields " })
        }

        if (!amount1) {
            return res.status(200).send({ status: false, msg: "please fill all fields" })
        }

        let findrecieverID = await Chrome_pay_wallet.findOne({ phone: reciever_phone })

        if (!findrecieverID) {
            return res.status(200).send({ status: false, msg: "Receiver is not available" })
        }

        let wallet_address = findrecieverID.wallet_Address

        if (!findrecieverID) {
            return res.status(200).send({ status: false, msg: "This user is not available in chrome pay" })
        }

        let find_cust_wallet = await Chrome_pay_wallet.findOne({ customer_ID: custID })
            .populate('customer_ID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })

        let findrecevrID = await Chrome_pay_wallet.findOne({ phone: reciever_phone })
        let findrecevrID1 = await customer_Model.findOne({ phone: reciever_phone })



        if (!findrecevrID) {
            return res.status(200).send({ status: false, msg: "Receiver is not available" })
        }

        //-------------------------------------------STORE-DATA---------------------------------------------------------



        const PCNnumber = generateString(10).toLowerCase()
        const TransactionID = generateString11(10)


        sendername = find_cust_wallet.customer_ID.fullname,
            receivername = findrecevrID1.fullname
        reciever_ID = findrecevrID.customer_ID


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

        let create = await Chrome_pay_transections.create(data)





        if (create) {


            //---------------------manage-account-amount-----------------------------------------------------------------------

            //---------------sender-amount---------------------------------------------------------
            let find_Current_Amount = await Chrome_pay_wallet.findOne({ customer_ID: custID })
            let curr_amount = find_Current_Amount.current_Amount
            let substracting_amount = curr_amount - amount
            const find_sender_account = await Chrome_pay_wallet.findOneAndUpdate({ customer_ID: custID }, { current_Amount: substracting_amount })

            //--------------reciver-amount---------------------------------------------------------

            let find_reciver_Current_Amount = await Chrome_pay_wallet.findOne({ phone: reciever_phone })
            let reciver_curr_amount = find_reciver_Current_Amount.current_Amount
            let add_amount = reciver_curr_amount + amount
            console.log("add_amount", add_amount)
            const find_reciver_account = await Chrome_pay_wallet.findOneAndUpdate({ phone: reciever_phone }, { current_Amount: add_amount })

            //------------------------send-messege-to-sender------------------------------------------------------------------------
            const send_mobile_otp = async (req, res) => {

                let mobile = 9877487381 //phoneNO
                let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=W/A+${654}+debited+$+${amount}+DT+${123}+${123}+thru+${654}+$+${amount}+Not+u?Fwd+this+SMS+to+Chrome+pay+to+block+Chrome+pay+wallet+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

                //let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${123}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`
                try {
                    return await axios.get(url).then(function (response) {
                        //console.log("==>", response);
                        return response;
                    });
                } catch (error) {
                    console.log(error);
                }
            }

            send_mobile_otp();

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

                //sumit.hariyani2@gmail.com
                var mailOptions = {
                    from: 'chrmepay123@gmail.com',
                    to: 'sumit.hariyani2@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: `W/A XXXXXXX${654} debited $${amount} DT ${today_date} ${current_time} thru XXXXXXX${654} $ ${amount} Not u?Fwd this SMS to Chrome pay to block Chrome pay wallet`
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


            next();

            return res.status(200).send({
                status: true, msg: `Transaction done Sucessfully , To ${receivername}, Amount-${Number(amount)} Your Current Balance $${parseInt(substracting_amount)}`, data: {
                    To: receivername, From: sendername,
                    Amount: amount, transactionID: TransactionID,
                    PCN: PCNnumber,
                    transactionDate: today
                }
            })
        }

        if (!create) {
            let create = await Chrome_pay_transections.create(failedData)
            return res.status(200).send({ status: false, msg: "Transection Failed", data: create })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//=======================================================cutomer=loan=apply====================================================================


//--------------------------------get-organisations--------------------------------------------------------------------------------------------

const getOrgForLoan_cust = async (req, res) => {
    try {

        const custID = req.userId;



        let find = await customer_Model.findOne({ _id: custID })

        let organisations = find.organisation

        console.log(organisations)

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter Customer ID" })
        }


        let result = []
        for (let i of organisations) {
            let findOrg = await organisation_Model.find({ _id: i })
            result.push(findOrg)
            //console.log("====>", findOrg)
        }

        let final = []
        for (let i of result) {
            for (let j of i) {
                final.push(j)
            }
        }


        let findOrg = await organisation_Model.find({ isDeleted: 0, blocked: 0 })

        return res.status(200).send({ status: true, final })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

const calculate_Amount_cust = async (req, res) => {
    try {

        console.log("calculate_amount")

        let custID = req.userId
        let agentID = req.agentID

        const Interest1 = req.body.Interest;
        const Amount1 = req.body.Amount
        const Emi_Months1 = req.body.Emi_Months
        const orgID = req.body.orgID
        //const custID = req.body.custID
        const Loan_type = req.body.Loan_type
        const recidence = req.body.recidence
        const LocalGov = req.body.LocalGov
        const LandRegistration = req.body.LandRegistration
        const OTP = req.body.otp




        let Amount = parseInt(Amount1)
        let Emi_Months = parseInt(Emi_Months1)
        let Interest = parseInt(Interest1)

        let find_OTP = await customer_Model.findOne({ _id: custID })
        console.log("Loan", find_OTP.Loan_OTP)
        console.log("front OTp", OTP)

        if (find_OTP.Loan_OTP != OTP) {
            return res.status(200).send({ status: false, msg: "Please enter Valid OTP" })
        }


        if (!Interest) {
            return res.status(200).send({ status: false, msg: "Please enter Interest" })
        }

        if (!Amount) {
            return res.status(200).send({ status: false, msg: "Please enter Amount" })
        }

        if (!Emi_Months) {
            return res.status(200).send({ staus: false, msg: "Please enter Emi Length" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter org ID" })
        }

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter cust ID" })
        }

        if (!Loan_type) {
            return res.status(200).send({ staus: false, msg: "Please enter Emi Loan_type" })
        }

        // if (!recidence) {
        //     return res.status(200).send({ staus: false, msg: "Please enter Emi recidence " })
        // }
        // if (!LocalGov) {
        //     return res.status(200).send({ staus: false, msg: "Please enter Emi Local Gov certificate " })
        // }
        // if (!LandRegistration) {
        //     return res.status(200).send({ staus: false, msg: "Please enter Emi Land Registration " })
        // }




        let Calculate = Interest / 100 * Amount
        let year = Emi_Months / 12
        let totalAmount = Calculate * year
        let Finalamount = Amount + Calculate
        let EmiPerMonth = (Finalamount / Emi_Months).toFixed(2);
        let Num_Emi = Number(EmiPerMonth)

        let obj = {
            OrganisationID: orgID,
            CustomerID: custID,
            agentID: agentID,
            Loan_type: Loan_type,
            recidence: recidence,
            LocalGov: LocalGov,
            LandRegistration: LandRegistration,
            Interest_Rate: Interest,
            EMI: Num_Emi,
            Total_Amount: Finalamount,
            Duration_Month: Emi_Months,
            Duration_Year: year,
            Interest_percentege: Interest,
            Intrest_Amount_per_Year: Calculate,
            Total_Interest_Amount: totalAmount,

        }
        let create = await Loan_applay_customer.create(obj)
        return res.status(200).send({
            status: true, msg: "Loan apply successfully", obj, EMI: Num_Emi, Total_Amount: Finalamount, Duration_Month: Emi_Months, Duration_Year: year,
            Interest_percentege: Interest, Intrest_Amount_per_Year: Calculate, Total_Interest_Amount: totalAmount
        })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-------------------------------get-customer-logs---------------------------------------------------------------------------------------------

const get_cust_logs = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Not getting customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Not getting valid customer ID" })
        }

        const { page = 1, limit = 5 } = req.query;

        if (Object.keys(req.body).length == 0) {
            let filter = await customer_logs.find({ customer_ID: custID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((1 - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, filter })
        }
        let options = [{ field: req.body.field }, { status: req.body.status }]

        console.log(req.body.field)

        let filter = await customer_logs.find({ $or: options, customer_ID: custID })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((1 - 1) * limit)
            .exec();

        return res.status(200).send({ statussss: true, filter })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

let Pay_bills = async (req, res) => {
    try {

        let create = await customer_bills.create({ customerID: "6388bb24932fecd402d93245", bill_ID: "123456456456", amount: 2500 })

        return res.status(200).send({ status: true, msg: "bill pay" })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


let cust_Recaharge = async (req, res) => {
    try {

        let create = await customer_recharge.create({ customerID: "6388bb24932fecd402d93245", Recharge_ID: "123456456456", amount: 250 })

        return res.status(200).send({ status: true, msg: "recharhe succesfully" })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------------------customer-financil-activities-------------------------------------------------------

const calculate_final_activities = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }

        let find_recived_payment = await transectionModel.find({ recieverID: custID })

        var reciving_amount = 0

        for (let i of find_recived_payment) {
            reciving_amount += i.receiverAmount
        }


        let find_bills_amount = await customer_bills.find({ customerID: custID })


        var bills_amount = 0
        for (let i of find_bills_amount) {
            bills_amount += i.amount
        }


        let find_recharge_amount = await customer_recharge.find({ customerID: custID })

        var recharge_amount = 0
        for (let i of find_recharge_amount) {
            recharge_amount += i.amount
        }


        let find_Loan_amoount = await customer_loan_installment.find({ customerID: custID })

        let result = []
        for (let i of find_Loan_amoount) {

            for (let j of i.Installments_History) {
                result.push(j)
            }

        }

        let Loan_amount = 0;

        for (let i of result) {
            Loan_amount += i.Installment_Pay_Amount
        }

        return res.status(200).send({ status: true, reciving_amount, bills_amount, recharge_amount, Loan_amount })





    } catch (error) {
        console.log(error)
    }
}


module.exports.cust_login = cust_login;
module.exports.cust_opt_verify = cust_opt_verify;
module.exports.get_cust_org = get_cust_org;
module.exports.Calculate_credit_Score_customer = Calculate_credit_Score_customer;
module.exports.customer_dash = customer_dash;
module.exports.Fuse_wallet_transections = Fuse_wallet_transections;
module.exports.Fuse_wallet_dash = Fuse_wallet_dash;
module.exports.Chrome_pay_trans = Chrome_pay_trans
module.exports.Chrome_pay_dash = Chrome_pay_dash
module.exports.Chrome_pay_cust_transection = Chrome_pay_cust_transection
module.exports.getOrgForLoan_cust = getOrgForLoan_cust
module.exports.calculate_Amount_cust = calculate_Amount_cust
module.exports.get_cust_logs = get_cust_logs
module.exports.Pay_bills = Pay_bills
module.exports.cust_Recaharge = cust_Recaharge
module.exports.calculate_final_activities = calculate_final_activities
