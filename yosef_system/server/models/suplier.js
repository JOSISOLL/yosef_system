const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suplierSchema = new Schema({
  name: String,
  email: String,
  address: String,
  country: String,
  phone: String,
  fax: String,
  website: String,
  manufacturer: String
});

module.exports = mongoose.model("suplier", suplierSchema, "suplier");
