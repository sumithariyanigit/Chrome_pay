const mongoose = require('mongoose')

const apiHistory = new mongoose.Schema({
    url:{
        type:String,
    },
    time:{
        type:Date
    },
    userID:{
        type:String
    },
    IPAdress:{
        type:String
    },
    comment:{
        type:[String]
    }
})

module.exports = mongoose.model('API History',apiHistory)