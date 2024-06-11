const mongoose = require('mongoose')

const existingModel = new mongoose.Schema({
    ID : {
        type: Number,

    } ,
    Data :{
        type: String,
    },
    Keywords : []
        
,
    Summary : {
        type : String
    }

} , {collection: "GACT_Collection"})

module.exports = mongoose.model('ExistingModel' , existingModel)