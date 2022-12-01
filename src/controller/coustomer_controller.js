const customer_Model = require("../models/customer")
const organisation_Model = require("../models/Organisation")
const transectionModel = require("../models/transaction");
const cust_Bank = require("../models/customerBank")
const Chrome_pay_wallet = require("../models/Cust_Wallet")
const cust_bank = require('../models/customerBank')
const Chrome_pay_transections = require("../models/Chrome_pay_Transections")
const axios = require('axios')
const jwt = require('jsonwebtoken')
var moment = require('moment');

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


        if (find_cust.login_otp !== otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })

        }

        let FakeOTP = 100000 + Math.floor(Math.random() * 900000);

        let token = jwt.sign({ custID, email }, 'Customer')

        if (find_cust.login_otp == otp) {
            console.log("find")
            let update_otp = await customer_Model.findOneAndUpdate({ phone: phone }, { login_otp: FakeOTP })
        }

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



        let findsendingAmount = await transectionModel.find({ senderID: custID })
        let findCust = await customer_Model.findOne({ _id: custID })



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

        return res.status(200).send({ status: true, findCust, custBanks: find_banks, totalAmount, proPercentage, totalTransection, receiveAmount, sendindAmount, chrome_wallet })




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

        let find_cust = await customer_Model.findById({ _id: custID }).select({ IDphoto: 1, email: 1, fullname: 1, phone: 1 })

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






module.exports.cust_login = cust_login;
module.exports.cust_opt_verify = cust_opt_verify;
module.exports.get_cust_org = get_cust_org;
module.exports.Calculate_credit_Score_customer = Calculate_credit_Score_customer;
module.exports.customer_dash = customer_dash;
module.exports.Fuse_wallet_transections = Fuse_wallet_transections;
module.exports.Fuse_wallet_dash = Fuse_wallet_dash