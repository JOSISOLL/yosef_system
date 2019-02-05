const mongoose = require('mongoose')
// const Parts = require('../models/parts')
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

const distributeSchema = new Schema(
    {
        
        buyerName : String,
        buyerPhoneNumber : String,
        buyerTinNumber : String,
        personInCharge : String,
        parts : [importedPartsSchema],
        quantity : Number,
        subTotal : Number,
        grandTotal : Number,
        date : Date
    })
        
module.exports = mongoose.model('distribute', distributeSchema, 'distribute')