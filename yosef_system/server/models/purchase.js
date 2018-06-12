const mongoose = require('mongoose')
const Parts = require('../models/parts')
const Schema = mongoose.Schema

let parts = new Parts()
const purchaseSchema = new Schema(
    {
        purchaseId : Number,
        parts : [{type: mongoose.Schema.Types.ObjectId,  ref: 'parts'}]
    })
        
module.exports = mongoose.model('purchase', purchaseSchema, 'purchase')