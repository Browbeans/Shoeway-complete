const Orders = require('./order.model')
const Users = require('../Users/users-model')
const Products = require('../Products/product.model')
import { Request, Response } from 'express'

module.exports.addOrder = async (req: Request, res: Response) => {
    const { ordernumber, products, customer } = req.body
    const currentCustomer = await Users.findById(customer)
    products.forEach(async (productID: any) =>  {
        await Products.update({ _id: productID.id }, 
            { "$inc": { stock : -productID.quantity }}
        )
        await Products.update({ _id: productID.id },
            { "$set": { quantity : productID.quantity }}
        )
        })

    const idArray: any = []
    products.forEach((element: any) => {
        idArray.push(element.id)
    });

    const currentProduct = await Products.find({ '_id': { $in: idArray } });

    const newOrder = new Orders({
        ordernumber: ordernumber, 
        products: currentProduct,
        customer: customer,
        isSent: false 
    })

    await newOrder.save()
    res.status(200).json(newOrder)
}

module.exports.getOrders = async function (req: Request, res: Response) {
    const result = await Orders.find()
    res.status(200).json(result)
}

module.exports.getSpecific = async function(req: Request, res: Response) {
    const id = req.params.id
    const order = await Orders.findById(id)
    res.status(200).json(order)
}

module.exports.getUserOrders = async function(req: Request, res: Response) {
    const urlId = req.params.id
    const user = await Users.findById(urlId)
    const userOrder = await Orders.find({customer: user._id}).populate('customer')

    res.status(200).json(userOrder)
}

module.exports.getOrderProducts = async function(req: Request, res: Response) {
    const orderId = req.params.id
    const orderProducts = await Orders.findById(orderId).populate('products')
    res.status(200).json(orderProducts)
}

module.exports.orderSent = async function(req: Request, res: Response) {
    const orderId = req.params.id
    const order = await Orders.updateOne({ _id: orderId}, { isSent: true})
    res.status(200).json(order)
}
