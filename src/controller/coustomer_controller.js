const customer = require("../models/customer")

const cust_login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })
        }








    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports.cust_login = cust_login