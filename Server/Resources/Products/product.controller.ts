const Product = require('./product.model')
import { Request, Response } from 'express';

module.exports.getProducts = async function(req: Request, res: Response) {

    const products = await Product.find().sort()

    try {
      res.status(200).json(products);
      console.log(Product);
    } catch (error) {
      res.status(400).json(error);
    }
};

module.exports.getSpecific = async function(req: Request, res: Response) {

  const id = req.params.id;
  const product = await Product.findById(id)

  try {
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error)
  }
};

module.exports.addNewProduct = async function(req: Request, res: Response) {

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
      stock: req.body.stock,
    })
    await product.save(function(error: any){
      console.log(error)
    })
    res.status(201).json(product)
  }
};

module.exports.deleteProduct = async function (req: Request, res: Response) {

  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id)

      try {
        res.status(202).json(product);
      } catch (error) {
        res.status(400).json(error);
      }
};

module.exports.editProduct = async function (req: Request, res: Response) {

  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, {
    title: req.body.title,
    price: req.body.price,
    size: req.body.size,
    quantity: req.body.quantity,
    category: req.body.category,
    stock: req.body.stock
  })
  
  try {
    res.status(202).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};