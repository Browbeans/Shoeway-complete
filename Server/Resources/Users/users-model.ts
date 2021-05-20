import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    adress: { 
        city: { type: String, required: true }, 
        street: { type: String, required: true },
        zip: { type: Number, required: true }
    },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('Users', userSchema);