let axios = require("axios")


let getdigitalID = async function (req, res) {

    try {
        let options = {
            method: 'GET',
            url: 'http://13.127.64.68:7008/api/testnet/getTransaction/0x53847d12dc110976d5598c946f0a215dbcf0e500a627431b1a9d07dbf405a469',
            "header": [],
            "body": {
                "mode": "raw",
                "raw": "{\n    \"name\":\"Kamlesh\"\n}"
            },
            "description": ""
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getdigitalID = getdigitalID;