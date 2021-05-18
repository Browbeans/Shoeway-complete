let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let shipingSchema = new Schema({
  Name: { type: String, required: true },
  days: { type: String, required: true },
  price:{ type: Number, required: true },
});

let Shiping = mongoose.model("shiping", shipingSchema); // Our DB - collection name is Users

module.exports = Shiping;
