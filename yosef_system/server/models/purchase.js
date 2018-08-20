const mongoose = require('mongoose')
// const Parts = require('../models/parts')
const Schema = mongoose.Schema

// let partsSchema = new Parts()
const partsSchema = new Schema(
    {
        invoiceId: Number,
        partNumber: String, 
        stamp: String,
        price: Number,
        description: String,
        supplier: String,
        quantity: Number,
        // sellPrice: Number,
        // remark: String,
        // make: String,
        shelfNumber: String,
        purchaseDate: String
    })
const purchaseSchema = new Schema(
    {
        purchaseId : Number,
        // parts : [{type: mongoose.Schema.Types.ObjectId,  ref: 'parts'}],
        parts : [partsSchema],
        grandTotal : Number,
        date : String
    })
        
module.exports = mongoose.model('purchase', purchaseSchema, 'purchase')