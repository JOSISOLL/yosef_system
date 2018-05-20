const mongoose = require('mongoose')
const Schema = mongoose.Schema

const repairSchema = new Schema(
    {
        customer: String,
        plateNumber: String, 
        reportedProblem: String,
        carType: String,
        remark: String,
        presonInCharge: String,
        date: String
    })

module.exports = mongoose.model('repair', repairSchema, 'repair')




