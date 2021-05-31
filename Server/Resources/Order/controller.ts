const Orders = require('./order.model')
const Users = require('../Users/users-model')
const Products = require('../Products/product.model')
import { rejects } from 'assert/strict'
import { Request, Response } from 'express'
import { resolve } from 'path/posix'


module.exports.addOrder = async (req: Request, res: Response) => {
    const { ordernumber, products, customer } = req.body
    const productVariant: any = []

    products.map(async (productID: any) =>  {
        const singleProduct = await Products.findOne({_id: productID.id})
        singleProduct.variants.forEach(async (product: {_id: string, size: string, stock: number, quantity: number, title: string}) => {
            if(productID.size === product.size) {
                const variantArray = [ {
                    size: productID.size,
                    stock: product.stock - productID.quantity,
                    quantity: productID.quantity
                }
                ]
                const object =
                    {
                        size: productID.size,
                        stock: product.stock - productID.quantity,
                        quantity: productID.quantity,
                        title: singleProduct.title
                    }
                productVariant.push(object)
                console.log(productVariant)
                await Products.findOneAndUpdate(
                {"_id": productID.id, "variants._id": product._id},
                {
                        "$set": {
                            "variants.$": variantArray
                        }
                    }
                )
            }
        })
    })

    

    setTimeout(() => {
        const newOrder = new Orders({
            ordernumber: ordernumber,
            products: productVariant,
            customer: customer,
            isSent: false
        })
    
        newOrder.save()
        res.status(200).json('Order Made')
        console.log('efter loopen') 
    }, 50);
    
    // const idArray: any = []
    // products.forEach((element: any) => {
    //     idArray.push(element.id)
    // });

    // const currentProduct = await Products.find({ '_id': { $in: idArray } });
    // console.log(currentProduct)
    
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
