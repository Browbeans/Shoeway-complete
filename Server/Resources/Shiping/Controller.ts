const shiping = require ('./model')
import { Request, Response } from 'express';



module.exports.getShiping =  async function(req: Request, res: Response) {
    const result = await  shiping.find()
    res.status(200).json(result)
};

module.exports.addNewshiping = function(req: Request, res: Response) {
    const input = new shiping({
        name: req.body.name, 
        days: req.body.days, 
        price: req.body.price
    })
    input.save()
   res.status(200).json(input)
};
