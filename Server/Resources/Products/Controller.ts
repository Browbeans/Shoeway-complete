const Product = require('./Model')
import { Request, Response } from 'express';

module.exports.getProducts = function(req: Request, res: Response) {
    Product.find().sort()
    .then((result: any) => {
      res.status(200).json(result)
      console.log(Product)
    })
    .catch((error: any) => {
      res.status(400).json(error);
    })
};

module.exports.getSpecific = function(req: Request, res: Response) {
  const id = req.params.id;
  Product.findById(id)
    .then((result: any) => {
      res.status(200).json(result)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
};

module.exports.addNewProduct = function(req: Request, res: Response) {
  if(req.body){
    if(!req.body.title){
      return res.status(400).json('Cant add product')
    }
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      size: req.body.size,
      quantity: req.body.quantity,
      category: req.body.category,
    })
    product.save()
    res.status(201).json(product)
  }
};

module.exports.deleteProduct = function (req: Request, res: Response) {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((result: any) => {
    res.status(202).json(result);
    })
    .catch((error: any) => {
    res.status(400).json(error);
    })
};

module.exports.editProduct = function (req: Request, res: Response) {
  const id = req.params.id;

  Product.findByIdAndUpdate(id, {
    title: req.body.title,
    price: req.body.price,
    size: req.body.size,
    quantity: req.body.quantity,
    category: req.body.category,
  })
    .then((result: any) => {
      res.status(202).json(result);
    })
    .catch((error: any) => {
      res.status(400).json(error);
    });
};