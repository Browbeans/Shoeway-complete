const Orders = require('./order.model')
const Users = require('../Users/users-model')
import { Request, Response } from 'express'

module.exports.addOrder = async (req: Request, res: Response) => {
    const { ordernumber, product, customer } = req.body
    const currentCustomer = await Users.findById(customer)
    
    const orderCustomer = {
        name: currentCustomer.name, 
        adress: currentCustomer.adress,
        phoner: currentCustomer.phone,
        email: currentCustomer.email,
        zip: currentCustomer.zip
    }

    const newOrder = new Orders({
        ordernumber: ordernumber, 
        products: product,
        customer: orderCustomer, 
        customerId: customer
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

    const userOrder = await Orders.find({customerId: user._id})

    res.status(200).json(userOrder)
}
