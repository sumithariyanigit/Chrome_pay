const customer_Model = require("../models/customer")
const axios = require('axios')
const jwt = require('jsonwebtoken')

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

module.exports.cust_login = cust_login
module.exports.cust_opt_verify = cust_opt_verify