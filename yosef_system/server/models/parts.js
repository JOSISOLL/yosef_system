const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = mongoose.model('parts', partsSchema, 'parts')




