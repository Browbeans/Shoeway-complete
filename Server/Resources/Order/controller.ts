const Orders = require('./order.model')
import { Request, Response } from 'express'

module.exports.addOrder = async (req: Request, res: Response) => {
    const { ordernumber, product, customer } = req.body

    const newOrder = new Orders({
        ordernumber: ordernumber, 
        products: product,
        customer: customer
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
