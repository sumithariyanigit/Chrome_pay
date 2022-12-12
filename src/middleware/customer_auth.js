const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {
        // const token = req.header('x-api-key')
        let token = req.params.token
        if (!token) {
            return res.status(200).send({ status: false, message: `Missing authentication token in request` });
        }



        const decoded = jwt.verify(token, 'Customer')

        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.userId = decoded.custID
        req.email = decoded.email
        req.agentID = decoded.agentID




        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.auth = auth;