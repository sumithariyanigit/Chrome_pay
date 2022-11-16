const customerBank = require("../models/customerBank")
const customerModel = require("../models/customer")
const orgModel = require("../models/Organisation");
const bankfield = require("../models/BankAccountField")
const { response } = require("express");

const createCustomer = async (req, res) => {
    try {


        const customerID = req.params.customerID


        const data = req.body;

        const { Accounttype, City, Transitnumber, Accountnumber, bankID, country, Bankcode,
            Bankname, Postcode, Phonenumber, Branchname, Branchdistrict, IFSC, Branchcode,
            State, Documentnumber } = data

        if (!customerID) {
            return res.status(200).send({ status: false, msg: "not getting customerID" })
        }

        if (customerID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid customerID" })
        }

        if (!customerID) {
            return res.status(200).send({ status: false, msg: "Please enter customerID" })
        }

        //let findorg = await orgModel.findOne({ _id: orgID })

        let checkcustomer = await customerModel.findOne({ _id: customerID })


        if (!checkcustomer) {
            return res.status(200).send({ status: false, msg: "customer not found" })
        }

        let checkAccount = await customerBank.findOne({ customerID: customerID })


        // if (!bankID) {
        //     return res.status(200).send({ status: false, msg: "Please enter bankID" })
        // }
        // if (!country) {
        //     return res.status(200).send({ status: false, msg: "Please enter country" })
        // }
        // if (!Bankcode) {
        //     return res.status(200).send({ status: false, msg: "Please enter Bankcode" })
        // }
        // if (!Bankname) {
        //     return res.status(200).send({ status: false, msg: "Please enter Bankname" })
        // }

        if (!Transitnumber) {
            return res.status(200).send({ status: false, msg: "Please enter Transitnumber" })
        }

        if (!Accountnumber) {
            return res.status(200).send({ status: false, msg: "Please enter Accountnumber" })
        }

        if (!Branchname) {
            return res.status(200).send({ status: false, msg: "Please enter Branchname" })
        }

        if (!Branchdistrict) {
            return res.status(200).send({ status: false, msg: "Please enter Branchdistrict " })
        }

        if (!IFSC) {
            return res.status(200).send({ status: false, msg: "Please enter IFSC" })
        }
        // if (!City) {
        //     return res.status(200).send({ status: false, msg: "Please enter City" })
        // }
        // if (!Postcode) {
        //     return res.status(200).send({ status: false, msg: "Please enter Postcode" })
        // }
        // if (!Phonenumber) {
        //     return res.status(200).send({ status: false, msg: "Please enter Phonenumber" })
        // }

        //let findfields = await bankfield.findOne({ organisationID: orgID })



        let finaldata = {

            customerID: customerID,
            bankID: bankID,
            Accounttype: Accounttype,
            Documentnumber: Documentnumber,
            country: country,
            Bankcode: Bankcode,
            Bankname: Bankname,
            Transitnumber: Transitnumber,
            Accountnumber: Accountnumber,
            Branchname: Branchname,
            Branchdistrict: Branchdistrict,
            Branchcode: Branchcode,
            State: State,
            IFSC: IFSC,
            City: City,
            Postcode: Postcode,
            Phonenumber: Phonenumber,

        }

        let create = await customerBank.create(finaldata)

        return res.status(200).send({ status: true, msg: "Customer account add sucessfully", data: create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------------view-bank-accounts---------------------------------------------------------------------------

const viewBankAccounts = async (req, res) => {
    try {

        //const filter = await customerBank.find();

        //const agentID = req.params.agentID;



        let countpages = await customerBank.find({ isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        // if (!agentID) {
        //     return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        // }

        //let currPage = 0
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await customerBank.find({ isDeleted: 0 }).sort({ createdAt: -1 })
            let totalRaow1 = countpages1.length;
            let filter = await customerBank.find({ isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.customerID) {
            let option = [{ customerID: req.body.customerID }]

            let countpages2 = await customerBank.find({ $or: option, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await customerBank.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {

            let option = [{
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await customerBank.find({ $or: option, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await customerBank.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }

        else if (req.body.Accountnumber) {
            let option = [{ Accountnumber: req.body.Accountnumber }]

            let countpages2 = await customerBank.find({ $or: option, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await customerBank.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            // if (filter.length == 0) {
            //     return res.status(200).send({ status: false, msg: "No Customer Found" })
            // }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

        else if (req.body.customerID && req.body.customerID > 0) {
            let option = [{ customerID: req.body.customerID }, { Accountnumber: req.body.Accountnumber }]

            let countpages2 = await customerBank.find({ $or: option, createdBY: agentID, isDeleted: 0 })
            let contRow = countpages2.length
            let filter = await customerBank.find({ $or: option, createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}



//-------------------------------------------------view-customer-bank-account--------------------------------------------------------------------

const viewBankAccount = async (req, res) => {
    try {

        const customerID = req.params.customerID

        if (!customerID) {
            return res.status(200).send({ status: false, msg: "not getting customerID" })
        }

        if (customerID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid customerID" })
        }

        let findcustomerBank = await customerBank.findOne({ customerID: customerID })

        if (!findcustomerBank) {
            return res.status(200).send({ status: false, msg: "not found Customer account" })
        }

        return res.status(200).send({ status: true, data: findcustomerBank })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------------update-account--------------------------------------------------------------------------------

const updateAccount = async (req, res) => {
    try {

        const BankID = req.params.BankID;

        let data = req.body

        const { bankID, country, Bankcode, Bankname, Transitnumber, Accountnumber, isDeleted,
            Branchname, Branchdistrict, IFSC, City, Postcode, Phonenumber, organisationID,
            Branchcode, State, Documentnumber, Accounttype, customerID } = data



        if (!BankID) {
            return res.status(200).send({ status: false, msg: "not getting BankID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid BankID" })
        }

        let finaldata = {
            customerID: customerID,
            bankID: bankID,
            country: country,
            Bankcode: Bankcode,
            Bankname: Bankname,
            Transitnumber: Transitnumber,
            Accountnumber: Accountnumber,
            Branchname: Branchname,
            Branchdistrict: Branchdistrict,
            IFSC: IFSC,
            City: City,
            Postcode: Postcode,
            Phonenumber: Phonenumber,
            organisationID: organisationID,
            Branchcode: Branchcode,
            State: State,
            Documentnumber: Documentnumber,
            Accounttype: Accounttype,
            isDeleted: isDeleted
        }

        let update = await customerBank.findOneAndUpdate({ _id: BankID }, finaldata, { new: true })

        if (!update) {
            return res.status(200).send({ status: false, msg: "No customer found" })
        }

        return res.status(200).send({ status: false, msg: "account update sucessfully", update })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------delete-customer-account-------------------------------------------------------------------------

const deleteAccount = async (req, res) => {
    try {

        const customerID = req.params.customerID;

        if (!customerID) {
            return res.status(200).send({ status: false, msg: "not getting customerID" })
        }

        if (customerID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid customerID" })
        }

        let deleteCustomer = await customerBank.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 })

        if (!deleteCustomer) {
            return res.status(200).send({ status: false, msg: "customer not found" })
        }

        return res.status(200).send({ status: true, msg: "account delete sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------account-suspend----------------------------------------------------------------------------------

const accountSuspend = async (req, res) => {
    try {

        const accountID = req.params.accountID;

        if (!accountID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (accountID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid customerID" })
        }

        let findCustomer = await customerBank.findOneAndUpdate({ _id: accountID }, { suspend: 1 })

        if (!findCustomer) {
            return res.status(200).send({ status: false, msg: "account not found" })
        }

        return res.status(200).send({ status: true, msg: "customer suspend sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------un-suspend------------------------------------------------------------------------------------

const unSuspendAccount = async (req, res) => {
    try {

        const accountID = req.params.accountID;

        if (!accountID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (accountID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid customerID" })
        }


        let findCustomer = await customerBank.findOneAndUpdate({ _id: accountID }, { suspend: 0 })

        if (!findCustomer) {
            return res.status(200).send({ status: false, msg: "customer not found" })
        }

        return res.status(200).send({ status: true, msg: "customer Un-suspend sucessfully" })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports.createCustomer = createCustomer;
module.exports.viewBankAccount = viewBankAccount;
module.exports.updateAccount = updateAccount;
module.exports.deleteAccount = deleteAccount;
module.exports.viewBankAccounts = viewBankAccounts;
module.exports.accountSuspend = accountSuspend;
module.exports.unSuspendAccount = unSuspendAccount;