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
        shelfNumber: String,
        purchaseDate: String
    })
const sellSchema = new Schema(
    {
        sellId : Number,
        buyerName : String,
        buyerPhoneNumber : String,
        buyerTinNumber : String,
        personIncharge : String,
        parts : [partsSchema],
        quantity : Number,
        grandTotal : Number
    })
        
module.exports = mongoose.model('sell', sellSchema, 'sell')