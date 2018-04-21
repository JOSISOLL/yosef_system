const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema(
    {
        client_name : String,
        plate_number : String,
        date: String,
        reported_problem: String, 
        remark: String,
        car_type: String,
        person_in_charge: String
    })``

module.exports = mongoose.model('client', userSchema, 'client')