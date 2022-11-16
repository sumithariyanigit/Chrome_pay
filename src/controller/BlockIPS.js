const BlockIPModel = require("../models/blockedIPs");



const CreateIPs = async (req, res) => {
    try{

        const IP = req.body.IP;
        

        if(!IP){
            return res.status(400).send({status:false, msg:"Please enter IP"})
        }

        let caheckIP = await BlockIPModel.findOne({IP:IP})
        if(caheckIP){
            return res.status(400).send({status:false, msg:"IP Already Blocked"})
        }


        let create = await BlockIPModel.create({IP})
        return res.status(201).send({status:true, msg:`${IP} is Blocked`})

    }catch(error){
        console.log(error)
        return res.status(500).send({status:false, error:error})
    }
}

module.exports.CreateIPs = CreateIPs