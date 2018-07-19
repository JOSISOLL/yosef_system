const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partsSchema = new Schema(
    {
        itemPId: Number,
        partNumber: String, 
        stamp: String,
        price: Number,
        description: String,
        supplier: String,
        quantity: Number,
        shelfNumber: String,
        purchaseDate: String
    })

module.exports = mongoose.model('parts', partsSchema, 'parts')




