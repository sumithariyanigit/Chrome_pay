const Organisation = require("../models/Organisation")
const jwt = require('jsonwebtoken')



const AcessKeys = async (req, res, next) => {
    try {

        //const accessKeyId = req.header('accessKeyId')
        //const secretAccessKey = req.header('secretAccessKey')
        const token = req.headers["token"]
        const token1 = req.body.token


        // console.log("fghf", req.headers);
        console.log("token", token)

        // if (!accessKeyId) {
        //     return res.status(200).send({ status: false, msg: "Please enter accessKeyId " })
        // }

        // if (!secretAccessKey) {
        //     return res.status(200).send({ status: false, msg: "Please enter secretAccessKey " })
        // }

        if (!token) {
            return res.status(200).send({ status: false, message: `Missing authentication token in request` });
        }

        const decoded = jwt.verify(token, 'organisation')

        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.orgID = decoded.OrganisationID

        let find = await Organisation.findOne({ _id: req.orgID })

        if (!find.accessKeyId) {
            return res.status(200).send({ status: false, msg: " Access Key Id is Missing, You are Not Authorized To This Activity" })
        }

        if (!find.secretAccessKey) {
            return res.status(200).send({ status: false, msg: "Secret AccessKey Key Id Is Missing, You Are Not Authorized To This Activity" })
        }



        next()

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


module.exports.AcessKeys = AcessKeys