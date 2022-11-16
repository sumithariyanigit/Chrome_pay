const userModel = require("../models/userModel")
//const { uploadFile } = require("../aws/aws.js");
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken')




const createUser = async (req, res, next) => {
    try {
        url = "http://localhost:3000/user";
        let data = req.body;
        let files = req.files;



        const { IDphoto, fullname, NextofKin, category, dateOfBirth, phone,
            email, gender, nationality, profession, address, refNumber, biometric, fingerPrint, organisation } = data


        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await userModel.findOne({ phone: data.phone })


        if (checkPhone)
            return res.status(200).send({ status: false, msg: "Number already register " })
        //next();


        if (!(/^\d{10}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await userModel.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }

        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }


        //const profilePicture = await uploadFile(files[0])

        //-------------------generate-Otp---------------------------------------------------------------//
        let otp = 100000 + Math.floor(Math.random() * 900000);



        let collection = {
            IDphoto: files, fullname: fullname, NextofKin: NextofKin,
            dateOfBirth: dateOfBirth, phone: phone,
            email: email, gender: gender, nationality: nationality,
            profession: profession, address: address, organisation: organisation,
            category: category, refNumber: refNumber, biometric: biometric, fingerPrint: fingerPrint,
            otp: otp
        }

        let create = await userModel.create(collection)







        const nodemailer = require("nodemailer");


        async function main() {

            let testAccount = await nodemailer.createTestAccount();


            let transporter = nodemailer.createTransport({
                host: "localhost",
                port: 3700,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });


            let info = await transporter.sendMail({
                from: 'satyamthinkdebug@gmail.com',
                to: "satyamrandwa141@gmail.com",
                subject: "verification code",
                text: "Your verification code is 321654",
                html: "<b>Hello world?</b>",
            });

            console.log("Message sent: %s", info.messageId);



            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        }

        main()

        const fast2sms = require('fast-two-sms')

        var options = { authorization: 321123, message: 'YOUR_MESSAGE_HERE', numbers: ['9877487381', '9877487381'] }
        fast2sms.sendMessage(options) //Asynchronous Function.








        //const otp = otpGenerator.generate(6, { number: true, upperCaseAlphabets: false, specialChars: false });






        next();
        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

//---------------------------------------Verify-User-OTP---------------------------------------------------------------------------------------//

const verifyOTP = async (req, res) => {
    try {

        const OTP = req.body.OTP;
        const userID = req.body.userID;

        if (!OTP) {
            return res.status(200).send({ status: false, msg: "Please Enter OTP" })
        }

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please Enter userID" })
        }
        let findOTP = await userModel.findOne({ _id: userID });

        if (!findOTP) {
            return res.status(200).send({ status: false, msg: "User Not Found" })
        }

        if (findOTP.otp != OTP) {
            return res.status(200).send({ status: false, msg: "Invalid OTP" })
        }

        if (findOTP.otp == OTP) {

            let token = jwt.sign({ userID: userID, Name: findOTP.fullname, email: findOTP.email, phone: findOTP.phone }, 'user')
            return res.status(200).send({ status: true, msg: "Login Sucessfully", token: token })
        }




    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}


//-----------------------------------Get-User-----------------------------------------------------------------------------------//


const getAllUser = async (req, res, next) => {
    try {

        url = "http://localhost:3000/getAllUser";
        next();

        //------------------Pagination---------------------------------------------//

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await userModel.find();
        counPages = Math.ceil(countpages11.length / 10)


        //------------------------------------------------------------------------//



        if (!Object.keys(req.body).length) {
            let filter = await userModel.find().limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            counPages = Math.ceil(filter.length / 10)
            return res.status(200).send({ totalPages: counPages, currenPage: parseInt(pageNO), status: true, filter })
        }

        let options = [{ fullname: req.body.userName } && { category: req.body.category }]

        let fetchcustomer = await userModel.find({
            $or: options
        }).limit(limit * 1)
            //{ $or: options }
            .skip((page - 1) * limit)
            .exec();

        counPages = Math.ceil(fetchcustomer.length / 10)

        if (!fetchcustomer.length) {
            return res.status(200).send({ status: false, msg: "No user found" })
        }


        return res.status(200).send({ totalPages: counPages, currenPage: parseInt(pageNO), data: fetchcustomer })



    } catch (error) {
        console.log(error)
    }

}

module.exports.createUser = createUser;
module.exports.getAllUser = getAllUser;
module.exports.verifyOTP = verifyOTP;
