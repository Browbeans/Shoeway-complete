import mongoose from 'mongoose'

interface Product {
    product: string, 
    price: number, 
    amount: number, 
    size: number, 
}

interface Customer {
    name: string, 
    adress: string, 
    zip: number,
    email: string,
    phone: number
}

interface Order extends Document {
    ordernumber: string, 
    products: Array<Product>,
    customer: Customer
}


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
        type: Object,
        required: true
    }, 
    customerId: {
        type: String, 
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model<Order>('Orders', orderSchema)