import mongoose, { Schema } from 'mongoose'

// interface Product {
//     product: string, 
//     price: number, 
//     amount: number, 
//     size: number, 
// }

// interface Customer {
//     name: string, 
//     adress: string, 
//     zip: number,
//     email: string,
//     phone: number
// }

interface Order extends Document {
    ordernumber: string, 
    products: [],
    customer: string
}


const orderSchema = new mongoose.Schema({
    ordernumber: {
        type: String, 
        required: true
    }, 
    products: {
        type: [Schema.Types.ObjectId], 
        ref: 'Products',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model<Order>('Orders', orderSchema)