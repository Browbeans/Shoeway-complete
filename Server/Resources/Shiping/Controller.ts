const shiping = require ('./model')
import { Request, Response, NextFunction } from 'express';
const ApiError = require("../../Error/ApiError");

module.exports.getShiping = async function(req: Request, res: Response, next: NextFunction) {
    const result = await  shiping.find({})
    if(result){
        res.status(200).json(result);
    } else {
        next(ApiError.badRequest('Something went wrong'))
    }
    
};

module.exports.addNewshiping = async function(req: Request, res: Response, next: NextFunction) {
    
    if(req.body){

    if (req.body.title) {
      next(ApiError.badRequest("Couldnt save the shipping method"));
    }

    const input = new shiping({
      name: req.body.name,
      days: req.body.days,
      price: req.body.price,
    });
    await input.save();

    res.status(201).json(input);

    }
    
};

module.exports.deletShiping = async function(req: Request, res: Response, next: NextFunction){

    const id = req.params.id

    const shipping = await shiping.findByIdAndDelete(id);

    if(shipping) {
        res.status(202).json(shipping);
    } else {
        next(ApiError.notFound('Couldnt delete the shipping method'));
    }
   
}

module.exports.editShiping = async function(req: Request, res: Response, next: NextFunction){
    const id = req.params.id

  const change =  await shiping.findByIdAndUpdate(id, {
        name: req.body.name,
        days: req.body.days,
        price: parseInt(req.body.price)
    })

    if(change){
        res.status(200).json(change);
    } else {
        next(ApiError.notFound('Couldnt edit the chosen shipping method'));
    }
}

 module.exports.getSpecific = async function (req: Request, res: Response, next: NextFunction) {
     const id = req.params.id;
     const specificShiping = await shiping.findById(id)

     if(specificShiping){
        res.status(200).json(specificShiping);
      } else{
        next(ApiError.notFound('Couldnt find the specific shipping method'))
      }
 };

