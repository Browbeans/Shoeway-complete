import { Request, Response, NextFunction } from "express";
const Product = require("./product.model");
const ApiError = require("../../Error/ApiError");

module.exports.getProducts = async function(req: Request, res: Response, next: NextFunction) {

    const products = await Product.find().sort()

    if(products){
      res.status(200).json(products);
      console.log(Product);
    }else {
      next(ApiError.notFound('Couldnt find any products'));
      return;
    }
};

module.exports.getSpecific = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const product = await Product.findById(id);

  if(product){
    res.status(200).json(product);
  } else {
    next(ApiError.notFound('Couldnt find the specific product'))
    return;
  }
};
 
module.exports.addNewProduct = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body) {
    if (!req.body.title) {
      next(ApiError.badRequest('Couldnt add product'));
      return;
    }

    const product = new Product({
      price: req.body.price,
      category: req.body.category,
      title: req.body.title,
      image: req.body.image,
      info: req.body.info,
    });

    product.variants.push({
      size: req.body.size,
      stock: req.body.stock,
      quantity: req.body.quantity,
      title: req.body.title,
    });

    await product.save(function (error: any) {
      console.log(error);
    });
    res.status(201).json(product);
  }
};

module.exports.deleteProduct = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);

  if (product) {
    res.status(202).json(product);
  } else {
    next(ApiError.notFound('This product does not exist'));
    return;
  }
};

module.exports.editProduct = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, {
    title: req.body.title,
    price: req.body.price,
    size: req.body.size,
    quantity: req.body.quantity,
    category: req.body.category,
    stock: req.body.stock,
    image: req.body.image,
    info: req.body.info,
  });

  if (product) {
    res.status(202).json(product);
  } else {
    next(ApiError.notFound('Cant find the product'));
    return;
  }
};

module.exports.addSizeAndStock = async function (req: Request, res: Response, next: NextFunction ) {
  const id = req.params.id;

  const currentProduct = await Product.findById(id)
  
  const found = currentProduct.variants.some((variant: any) => variant.size === req.body.size);
  if (found) {
      await Product.findOneAndUpdate(
        {"_id": id, "variants.size": req.body.size},
        {
          "$set": {
            "variants.$.stock": req.body.stock
          }
        }
      );
    res.status(200).json('Changed stock');
  } else {
    const product = await Product.update(
      { _id: id },
      {
        $push: {
          variants: {
            size: req.body.size,
            stock: req.body.stock,
            quantity: req.body.quantity,
            title: req.body.title,
          },
        },
      }
  );

  if(product) {
    res.status(200).json(product);
  } else {
    next(ApiError.notFound('Couldnt find the product'));
    return;
  }
}


  // if(variantArray.size === req.body.size) {
  //   await Product.findOneAndUpdate(
  //     {"_id": id, "variants._id": variantArray._id},
  //     {
  //             "$set": {
  //                 "variants.$.stock": req.body.stock
  //             }
  //         }
  //     )
  // } else {
    
  // }
};


