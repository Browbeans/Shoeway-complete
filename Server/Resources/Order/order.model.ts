import mongoose from 'mongoose'

interface Product {
    product: string, 
    price: number, 
    amount: number, 
    size: number, 
}

interface Customer {
    firstname: string, 
    lastname: string, 
    adress: Object,
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
    }
}, { timestamps: true })

module.exports = mongoose.model<Order>('Orders', orderSchema)