const Orders = require('./order.model')
const Users = require('../Users/users-model')
const Products = require('../Products/product.model')
const ApiError = require("../../Error/ApiError");
import { Request, Response, NextFunction } from 'express'

module.exports.addOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { ordernumber, products, customer, orderAmount } = req.body
    const productVariant: any = []

    let isError = false;

    products.map(async (productID: any) =>  {

        const singleProduct = await Products.findOne({_id: productID.id})

        if(!singleProduct){
            isError = true;
        } else {

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
    }
    })


    setTimeout(() => {
        const newOrder = new Orders({
            ordernumber: ordernumber,
            products: productVariant,
            customer: customer,
            orderAmount: orderAmount,
            delivery: shipment,
            isSent: false
        })
        if(!isError){
            newOrder.save()
            res.status(200).json('Order Made')
        } else {
             next(ApiError.badRequest("Couldnt add the order"));
             return;
        }
    }, 50);
    
}

module.exports.getOrders = async function (req: Request, res: Response, next: NextFunction) {
    const result = await Orders.find()

    if(result){
        res.status(200).json(result);
    } else {
        next(ApiError.badRequest('Something went wrong'));
        return;
    }
    
}

module.exports.getSpecific = async function(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const order = await Orders.findById(id)

    if(order){
      res.status(200).json(order);
    } else {
       next(ApiError.notFound('Couldnt find the specific order'));
       return;
    }
}

module.exports.getUserOrders = async function(req: Request, res: Response, next: NextFunction) {
    const urlId = req.params.id;
    const user = await Users.findById(urlId);

    if(user){
         const userOrder = await Orders.find({ customer: user._id }).populate(
           "customer"
         );
         res.status(200).json(user);

         if(userOrder){
            res.status(200).json(userOrder);
         } else {
             next(ApiError.notFound('Couldnt find the order'));
         }
    } else {
        next(ApiError.notFound("Couldnt find the user"));
        return;
    }
   
        
}

module.exports.orderSent = async function(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id
    const order = await Orders.updateOne({ _id: orderId}, { 
        isSent: req.body.isSent
    })
    if(order){
        return res.status(200).json(order);
    } else {
        next(ApiError.badRequest('Couldnt update the order'));
        return;
    }
}
