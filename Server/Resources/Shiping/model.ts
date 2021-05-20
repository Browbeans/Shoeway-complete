import mongoose from 'mongoose'

interface Shipping {
  name: string,
  days: string,
  price: number,
}
let shipingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: String, required: true },
  price:{ type: Number, required: true },
});

module.exports = mongoose.model<Shipping>("shiping", shipingSchema);


