const Organisation = require("../models/Organisation")
const jwt = require('jsonwebtoken')



const AcessKeys = async (req, res, next) => {
    try {

        const accessKeyId = req.header('accessKeyId')
        const secretAccessKey = req.header('secretAccessKey')
        const token = req.params.token


        console.log(accessKeyId)

        if (!accessKeyId) {
            return res.status(200).send({ status: false, msg: "Please enter accessKeyId " })
        }

        if (!secretAccessKey) {
            return res.status(200).send({ status: false, msg: "Please enter secretAccessKey " })
        }

        if (!token) {
            return res.status(200).send({ status: false, message: `Missing authentication token in request` });
        }

        const decoded = jwt.verify(token, 'organisation')

        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.orgID = decoded.OrganisationID

        let find = await Organisation.findOne({ _id: req.orgID })

        console.log(find)

        next()

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


module.exports.AcessKeys = AcessKeys