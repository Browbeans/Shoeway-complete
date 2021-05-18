import mongoose from 'mongoose';

interface Product{
    title: string,
    price: number,
    size: number,
    quantity: number,
    category: string,
}
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number, 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model<Product>('Products', productSchema);