const bankfield = require("../models/BankAccountField")


const createfields = async (req, res) => {
    try {

        const data = req.body;
        const orgID = req.params.orgID

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findorg = await bankfield.findOne({ organisationID: orgID })





        const { workingCountry, fields, country, Bankcoderequired, Banknamerequired, Transitnumberrequired,
            Accountnumberrequired, Branchnamerequired, Branchdistrictrequired,
            Branchcoderequired, IFSCrequired, Cityrequired, Staterequired, Postcoderequired,
            Phonenumberrequired, Accounttyperequired, Documentnumberrequired, Addresslinerequired } = data


        let final = {
            workingCountry: workingCountry,
            fields: fields,
            country: country,
            Bankcoderequired: Bankcoderequired,
            Banknamerequired: Banknamerequired,
            Transitnumberrequired: Transitnumberrequired,
            Accountnumberrequired: Accountnumberrequired,
            Branchnamerequired: Branchnamerequired,
            Branchdistrictrequired: Branchdistrictrequired,
            Branchcoderequired: Branchcoderequired,
            IFSCrequired: IFSCrequired,
            Cityrequired: Cityrequired,
            Staterequired: Staterequired,
            Postcoderequired: Postcoderequired,
            Phonenumberrequired: Phonenumberrequired,
            Accounttyperequired: Accounttyperequired,
            Documentnumberrequired: Documentnumberrequired,
            Addresslinerequired: Addresslinerequired,
            organisationID: orgID
        }

        let update = await bankfield.findOneAndUpdate({ organisationID: orgID }, final);

        if (update) {
            return res.status(200).send({ status: false, msg: "Update sucessfully" })
        } else {
            let create = await bankfield.create(final)
            return res.status(200).send({ status: true, msg: "update sucessfully" })
        }


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports.createfields = createfields;


