let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let shipingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: String, required: true },
  price:{ type: Number, required: true },
});

module.exports = mongoose.model("shiping", shipingSchema);


