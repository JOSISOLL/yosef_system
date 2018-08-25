const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemsSchema = new Schema(
    {
        part_number : String,
        stamp : String,
        description : String,
        remark : String,
        imported_quantity : Number,
        foreign_unit_cost : Number,
        foreign_total : Number,
        local_cost : Number,
        local_total : Number,
        origin : String,
        factory_cost : Number,
        price : Number

    })
    
const importSchema = new Schema(
    {
        import_date : Date,
        items : [itemsSchema]
    })
module.exports = mongoose.model('import', importSchema, 'import')




