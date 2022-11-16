const cust_Model = require("../models/customer")
const Comisn_Model = require("../models/AgentCommissinHistory")
const organisation = require("../models/Organisation")



/////////////////////////////////////////////////////////[AGENT-EXPORTS]/////////////////////////////////////////////////////////////////////////

const ExportAgentCust = async (req, res) => {
    try {

        const agentID = req.userId;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cust_Model.find({ $or: option, createdBY: agentID })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cust_Model.find({ createdBY: agentID })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//-----------------------------------------------Agent-commission-List--------------------------------------------------------------------------

const ExportCommissionList = async (req, res) => {
    try {

        const agentID = req.userId;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCommission = await Comisn_Model.find({ $or: option })

            return res.status(200).send({ status: true, findCommission })
        } else {

            let findCommission = await Comisn_Model.find()

            return res.status(200).send({ status: true, findCommission })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------------------------Agent-Blocked-list-------------------------------------------------------------------------


const ExportAgentBlockedCust = async (req, res) => {
    try {

        const agentID = req.userId;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cust_Model.find({ $or: option, createdBY: agentID, blocked: 1 })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cust_Model.find({ createdBY: agentID, blocked: 1 })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}




///////////////////////////////////////////////////////////[Organisation-Exports]/////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------Org-cust-list-------------------------------------------------------------------------------

const Org_cust = async (req, res) => {
    try {

        const orgID = req.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID ID" })
        }

        if (orgID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting orgID agentID" })
        }

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cust_Model.find({ $or: option, organisation: orgID })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cust_Model.find({ organisation: orgID })

            return res.status(200).send({ status: true, findCust })

        }






    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//////////////////////////////////////////////[Admin-exports]////////////////////////////////////////////////////////////////////////////////////

//----------------------------------------------All-customer-------------------------------------------------------------------------------------

const AdminCust = async (req, res) => {
    try {

        console.log("Admin customer")
        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cust_Model.find({ $or: option, isDeleted: 0 })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cust_Model.find({ isDeleted: 0 })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------------------------Organisation-List--------------------------------------------------------------------------


const AdminOrg = async (req, res) => {
    try {

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findOrg = await organisation.find({ $or: option, isDeleted: 0 })

            return res.status(200).send({ status: true, findOrg })
        } else {

            let findOrg = await organisation.find({ isDeleted: 0 })

            return res.status(200).send({ status: true, findOrg })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//----------------------------------------------Admin-blocked-customer-------------------------------------------------------------------------------------

const AdminBlockedCust = async (req, res) => {
    try {

        console.log("Admin customer")
        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cust_Model.find({ $or: option, blocked: 1 })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cust_Model.find({ blocked: 1 })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}





module.exports.ExportAgentCust = ExportAgentCust
module.exports.ExportCommissionList = ExportCommissionList;
module.exports.ExportAgentBlockedCust = ExportAgentBlockedCust;
module.exports.Org_cust = Org_cust
module.exports.AdminCust = AdminCust
module.exports.AdminOrg = AdminOrg
module.exports.AdminBlockedCust = AdminBlockedCust