const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const orgDoc = new mongoose.Schema({
    organisation_id:{
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },
    name:{
        type:String
    },
    type:{
        type:String
    },
    document:{
        type:String,
        default:""
    }

},{timestamps:true})

module.exports = mongoose.model('Org_Doc', orgDoc)