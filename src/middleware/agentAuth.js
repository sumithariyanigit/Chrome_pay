




const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {
        // const token = req.header('x-api-key')
        let token = req.params.token
        console.log(token)
        if (!token) {
            return res.status(200).send({ status: false, message: `Missing authentication token in request` });
        }

        console.log("1")
        const decoded = jwt.verify(token, 'Agent')
        console.log("2")


        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.userId = decoded.agentID

        console.log("middleware==>agent", req.userId)



        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.auth = auth;