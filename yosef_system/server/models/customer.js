const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema(
    {
        name : String,
        email : String,
        telMobile: String,
        telHome: String, 
        telWork: String,
        address: String
    })

module.exports = mongoose.model('customer', customerSchema, 'customer')




