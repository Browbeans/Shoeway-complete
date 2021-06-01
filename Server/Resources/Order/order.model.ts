import mongoose, { Mongoose, Schema } from 'mongoose'

interface Product {
    product: string, 
    price: number, 
    amount: number, 
    size: number, 
}

interface Order extends Document {
    ordernumber: string, 
    products: Product[],
    customer: string, 
    isSent: Boolean
}

const shipment = new mongoose.Schema({
    days: String, 
    price: Number, 
    name: String
})

const orderSchema = new mongoose.Schema({
    ordernumber: {
        type: String, 
        required: true
    }, 
    products: {
        type: Array, 
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }, 
    isSent: {
        type: Boolean, 
        required: true
    },
    orderAmount: {
        type: Number, 
        required: true
    },
    
    delivery: shipment 

}, { timestamps: true })

module.exports = mongoose.model<Order>('Orders', orderSchema)