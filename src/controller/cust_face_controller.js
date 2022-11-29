const Face_model = require("../models/Customer_Face_data")
const customerModel = require("../models/customer")
const { uploadFile } = require("../aws/aws.js");
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
//const redis = require("redis");
const { promisify } = require("util");
//const redisclient = redis.createClient();


const cust_Face_ditect = async (req, res) => {
    try {

        console.log("Working")

        const custID = req.params.custID;
        let files = req.files

        if (files.length == 0) {
            return res.status(200).send({ sttaus: false, msg: "Please provide image" })
        }
        if (!custID) {
            return res.status(200).send({ sttaus: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter vallid customer ID" })
        }

        let findCust = await customerModel.findOne({ _id: custID })
        let Cust_Name = findCust.fullname

        if (!findCust) {
            return res.status(200).send({ status: false, msg: "customer not found" })
        }

        const profilePicture = await uploadFile(files[0])
        console.log("==>", profilePicture)


        //----------------------------------Check_faec_data-------------------------------------------------------------------------------------

        async function LoadModels() {
            await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        }
        LoadModels();


        // async function getDescriptorsFromDB(image) {

        let faces = await Face_model.find();

        for (i = 0; i < faces.length; i++) {

            console.log("==>", faces[i])

            for (j = 0; j < faces[i].descriptions.length; j++) {
                faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
            }

            faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].name, faces[i].descriptions);
        }

        console.log("time test")

        const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
        const img = await canvas.loadImage(profilePicture);
        let temp = faceapi.createCanvasFromMedia(img);
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(temp, displaySize);
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
        console.log("tag", results)
        for (let items of results) {
            if (items._label === "unknown") {
                console.log("8")
                const descriptions = []
                const img1 = await canvas.loadImage(profilePicture);
                const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections1.descriptor);
                console.log("9")
                const obj = {
                    customerID: custID,
                    name: Cust_Name,
                    descriptions: descriptions,
                }
                console.log(descriptions)
                let createFce = await Face_model.create(obj)
                let update_face_data = await customerModel.findOneAndUpdate({ _id: custID }, { facialIdentification: 1 })
                return res.status(200).send({ status: true, msg: "Face identify Successfully" })
            } else {
                console.log("Face Match")
                return res.status(200).send({ status: false, msg: "Face already register ", results })
            }

        }

        //------------------------------------------------- store-face-regnization------------------------------------------------------------------

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

module.exports.cust_Face_ditect = cust_Face_ditect
// module.exports.get_items = get_items