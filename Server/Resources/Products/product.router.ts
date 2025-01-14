import express from 'express';
const controller = require('./product.controller')
const productRouter = express.Router();

productRouter
    .get('/', controller.getProducts)
    .get('/:id', controller.getSpecific)
    .post('/addProduct', controller.addNewProduct)
    .delete('/:id', controller.deleteProduct)
    .put('/:id', controller.editProduct)
    .post('/add-size-stock/:id', controller.addSizeAndStock)

export default productRouter;