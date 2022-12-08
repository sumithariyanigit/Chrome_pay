




const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {
        // const token = req.header('x-api-key')
        let token = req.params.token

        console.log(token)
        if (!token) {
            return res.status(200).send({ status: false, message: `Missing authentication token in request` });
        }



        const decoded = jwt.verify(token, 'organisation')

        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        if (!decoded.accessKeyId) {
            return res.status(200).send({ status: false, message: `Missing Accesskey` });

        }

        if (!decoded.secretAccessKey) {
            return res.status(200).send({ status: false, message: `Missing secret Access Key` });

        }



        req.orgID = decoded.OrganisationID

        console.log("middleware==>org", req.orgID)



        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.auth = auth;