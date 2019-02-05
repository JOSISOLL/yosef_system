const mongoose = require('mongoose')
const Schema = mongoose.Schema

const importedPartsSchema = new Schema(
    {
        partNumber : String,
        stamp : String,
        description : String,
        remark : String,
        quantity : Number,
        foreign_unit_cost : Number,
        foreign_total : Number,
        local_cost : Number,
        local_total : Number,
        origin : String,
        factory_cost : Number,
        price : Number

    })

    module.exports = mongoose.model('importedParts', importedPartsSchema, 'importedParts')