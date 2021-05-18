import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
const controller = require('./Controller')

const productRouter = express.Router();

productRouter
    .get('/', controller.getProducts)
    .get('/:id', controller.getSpecific)
    .post('/addProduct', controller.addNewProduct)
    .delete('/:id', controller.deleteProduct)
    .put('/:id', controller.editProduct)

export default productRouter;