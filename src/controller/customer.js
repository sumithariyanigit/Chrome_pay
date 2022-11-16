const cutomerModel = require("../models/customer")
const { uploadFile } = require("../aws/aws.js");
const { exists } = require("../models/customer");
const { json } = require("body-parser");
const jwt = require('jsonwebtoken');
const transactionModel = require("../models/transaction");
const transaction = require("../models/transaction");


//-----------------------------------------------Create------------------------------------------------------------------------------------

const createCustomer = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files;
        let ID = req.params.ID

        if (Object.values(ID).length < 2) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
        }





        const { IDphoto, fullname, dateOfBirth, phone, email, gender, nationality, professoin, address, organisation, status } = data

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        //next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await cutomerModel.findOne({ phone: data.phone })


        if (checkPhone)
            return res.status(200).send({ status: false, msg: "Number already register " })
        //next();


        if (!(/^\d{10}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: q  
                
                , msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }

        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }


        const profilePicture = await uploadFile(files[0])

        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: phone,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, organisation: ID,
            status: status, createdBY: ID, createdBY: ID
        }

        let create = await cutomerModel.create(collection)

        //next();
        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

//---------------------------------------------------get-By-ID----------------------------------------------------------------------------------



const getallusers = async (req, res, next) => {


    try {
        url = "http://localhost:3000/getuser/:ID";
        //next();
        let userID = req.body.ID


        if (!userID)
            return res.status(200).send({ status: false, msg: "Please enter userID" })

        //-------------------------------Pagination------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await cutomerModel.find();
        counPages = Math.ceil(countpages11.length / 10)

            
        let findTrans1 = await cutomerModel.findById({ _id: userID }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        //let findTrans = Object.entries(findTrans1)


        let result = [];
        for (let customer of findTrans) {
            let findTransac = await transactionModel.find({ senderID: userID })
            result.push({ ...customer._doc, transaction: findTransac });
        }


        let findcustomer = await cutomerModel.findById({ _id: userID })
        //next();
        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })

    }
}


//---------------------------------------------------Get-All--------------------------------------------------------------------------------

const getCustomer = async (req, res, next) => {
    try {

        url = "http://localhost:3000/getuser";
        //next();
        //------------------Pagination---------------------------------------------//

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await transactionModel.find();
        counPages = Math.ceil(countpages11.length / 10)


        //------------------------------------------------------------------------//

        let options = [{ phone: req.body.phone }, { _id: req.body.ID }]


        let fetchcustomer = await cutomerModel.find({ $or: options }).limit(limit * 1)
            //{ $or: options }
            .skip((page - 1) * limit)
            .exec();;


        let result = [];
        for (let customer of fetchcustomer) {
            let findTransac = await transactionModel.find({ senderID: customer._id }).select({ recieverID: 0 });
            result.push({ ...customer._doc, transaction: findTransac });
        };
        // next();
        return res.status(200).send({ totalPages: counPages, currenPage: parseInt(pageNO), data: result })



    } catch (error) {
        console.log(error)
    }
}


//-----------------------------------------------Update----------------------------------------------------------------------------------------

const updateCustomer = async (req, res, next) => {

    try {
        url = "http://localhost:3000/update/:userId";
        // next();
        const userId = req.params.userId;
        const data = req.body;
        let files = req.files;



        const { fullname, dateOfBirth, phone, email, gender, nationality, professoin, address } = data

        if (!data) {
            return res.status(200).send({ status: false, msg: "please enter data" })
        }

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await cutomerModel.findOne({ phone: data.phone })
        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register " })
        }

        if (!(/^\d{10}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }

        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter email" })

        }

        const profilePicture = await uploadFile(files[0])

        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: phone,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address
        }

        let updatedata = await cutomerModel.findOneAndUpdate({ _id: userId }, collection, { new: true })

        if (!updatedata) {
            return res.status(200).send({ status: false, msg: "user not found" })
        }
        // next();
        return res.status(200).send({ status: true, msg: "data update sucesssfully", data: updatedata })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }


}

//------------------------------------------------------Delete----------------------------------------------------------------------------

const userDelete = async (req, res, next) => {
    try {
        url = "http://localhost:3000/user/:userID";
        // next();
        const userID = req.body.userID

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter userID" })
        }
        let deleteUser = await cutomerModel.findOneAndDelete({ _id: userID })
        if (!deleteUser) {
            return res.status(200).send({ status: true, msg: "User not found" })
        }
        // next();
        return res.status(200).send({ status: true, msg: "User delete sucessfully", data: deleteUser })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, data: error })
    }
}

//----------------------------------------------delete-By-Email------------------------------------------------------------------------------------


const deleteByEmail = async (req, res, next) => {
    try {
        url = "http://localhost:3000/useremail";
        // next();
        const userEmail = req.body
        console.log(userEmail)

        const Emaill = Object.values(userEmail)
        const Email2 = Emaill.toString();
        console.log(Email2)

        let deleteuser = await cutomerModel.findOneAndDelete({ email: Email2 })

        if (!deleteuser) {
            return res.status(200).send({ status: false, msg: "User not found" })
        }
        // next();
        return res.status(200).send({ status: true, msg: "Data deleted sucessfully", data: deleteuser })



    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}


//---------------------------------------------Entroll-To-Organisation----------------------------------------------------------------------------------

const addOrganisation = async (req, res, next) => {
    try {
        url = "http://localhost:3000/AddOrganisation";
        // next();
        let OrganisationID = req.body.OrganisationID;
        let userID = req.body.userID;


        let checkOrganisation = await cutomerModel.findOne({ _id: userID })
        let organisation = checkOrganisation.organisation;


        for (items of organisation) {
            if (items == OrganisationID) {
                return res.status(200).send({ status: false, msg: "already Enroll" });
            }
        }
        organisation.push(OrganisationID)


        let object = {
            IDphoto: checkOrganisation.IDphoto,
            fullname: checkOrganisation.fullname,
            dateOfBirth: checkOrganisation.dateOfBirth,
            phone: checkOrganisation.phone,
            email: checkOrganisation.email,
            gender: checkOrganisation.gender,
            nationality: checkOrganisation.nationality,
            address: checkOrganisation.address,
            organisation: organisation,
            createdAt: checkOrganisation.createdAt,
            updatedAt: checkOrganisation.updatedAt
        }

        let add = await cutomerModel.findByIdAndUpdate({ _id: userID }, object, { new: true })
        // next();
        return res.status(200).send({ status: true, msg: add })



        // if(checkOrganisation.organisation == OrganisationID){
        //     return res.send("Already Enroll")
        // }

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


//-------------------------------------------------get-customer-by-filters----------------------------------------------------------------------//

const getAllCustomer = async (req, res) => {
    try {

        url = "http://localhost:3000/getuser";

        //------------------Pagination---------------------------------------------//

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await transactionModel.find();
        counPages = Math.ceil(countpages11.length / 10)


        //------------------------------------------------------------------------//

        let StartDate = req.body.StartDate;
        let EndDAte = req.body.EndDate;

        if (!Object.keys(req.body).length) {
            let filter = await cutomerModel.find().limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            counPages = Math.ceil(filter.length / 10)
            return res.status(200).send({ totalPages: counPages, currenPage: parseInt(pageNO), status: true, filter })
        }

        let options = [{
            createdAt: {
                $gte: new Date(StartDate).toISOString(),
                $lte: new Date(EndDAte).toISOString()
            }
        }, { phone: req.body.phone }, { _id: req.body.ID }, { nationality: req.body.country }]





        let fetchcustomer = await cutomerModel.find({
            $or: options
        }).limit(limit * 1)
            //{ $or: options }
            .skip((page - 1) * limit)
            .exec();

        counPages = Math.ceil(fetchcustomer.length / 10)


        return res.status(200).send({ totalPages: counPages, currenPage: parseInt(pageNO), data: fetchcustomer })



    } catch (error) {
        console.log(error)
    }

}

//--------------------------------------Block-Customer-Api--------------------------------------------------------------------------------------------

const blockCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await cutomerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }



        let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

        return res.status(200).send({ status: 1, msg: "Customer Block Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//--------------------------un-Blocked-Customer---------------------------------------------------------------------------------------------

const UnblockCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await cutomerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Customer Already Unbolcked" })
        }



        let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 0 }, { new: true })

        return res.status(200).send({ status: 0, msg: "Customer Unblock Sucessfully" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//------------------------------------------get-customer--------------------------------------------------------------------------------------------

const getcustomer = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (custID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid ID" })
        }

        let filter = await cutomerModel.findOne({ _id: custID })

        if (!filter) {
            return res.status(200).send({ status: false, msgp })
        }

        return res.status(200).send({ status: true, filter })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}








module.exports.createCustomer = createCustomer;
module.exports.getCustomer = getCustomer;
module.exports.getallusers = getallusers;
module.exports.updateCustomer = updateCustomer;
module.exports.userDelete = userDelete;
module.exports.deleteByemail = deleteByEmail;
module.exports.addOrganisation = addOrganisation;
module.exports.getAllCustomer = getAllCustomer;
module.exports.blockCustomer = blockCustomer;
module.exports.UnblockCustomer = UnblockCustomer;
module.exports.getcustomer = getcustomer;