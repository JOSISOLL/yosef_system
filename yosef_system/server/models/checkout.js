const mongoose = require('mongoose')
const Schema = mongoose.Schema

const repairSchema = new Schema({
    customer: String,
    plateNumber: String, 
    reportedProblem: String,
    carType: String,
    remark: String,
    personInCharge: String,
    date: String
})


const checkoutSchema = new Schema({
    
    repair : [repairSchema],
    serviceCharge  : Number,
    problemsFixed  : String,
    tinNumber  : String,
    changedParts  : [
        {
            partNumber : String,
            stamp : String,
            quantity : Number,
            price : String,
        }
    ],
    menInCharge  : [
        {
            name : String
        }
    ],
    checkoutDate  : String
})

module.exports = mongoose.model('checkout', checkoutSchema, 'checkout')