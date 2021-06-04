import express, {Request, Response} from 'express'
const controller = require('./controller')

const OrderRouter = express.Router()

OrderRouter.post('/add-order', controller.addOrder)
OrderRouter.get('/all-orders', controller.getOrders)
OrderRouter.get('/specific-order/:id', controller.getSpecific)
OrderRouter.get('/user-orders/:id', controller.getUserOrders)
OrderRouter.patch('/sent-order/:id', controller.orderSent)
OrderRouter.get('/order-test', async(req: Request, res: Response) => res.send('order-test'))

export default OrderRouter