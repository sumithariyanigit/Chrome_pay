const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const FaceDitection = new mongoose.Schema({
    customerID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },
    name: {
        type: String,
        required: true
    },
    descriptions: {
        type: Array

    },
}, { timestamps: true })

module.exports = mongoose.model("Customer_Face_data", FaceDitection)