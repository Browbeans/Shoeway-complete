import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    adress: String,
    phone: Number,
    email: String,
    zip: Number
})

module.exports = mongoose.model('Users', userSchema);
