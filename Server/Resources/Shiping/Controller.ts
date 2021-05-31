const shiping = require ('./model')
import { Request, Response } from 'express';




module.exports.getShiping =  async function(req: Request, res: Response) {
    const result = await  shiping.find({})
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

module.exports.deletShiping = async function(req: Request, res: Response){

    const id = req.params.id

    const shipping = await shiping.findByIdAndDelete(id);

    try {
        res.status(202).json(shipping)
    } catch (error) {
        res.status(400).json('Couldnt delete shipping')
    }
   
}

module.exports.editShiping = async function(req: Request, res: Response){
    const id = req.params.id

  const change =  await shiping.findByIdAndUpdate(id, {
        name: req.body.name,
        days: req.body.days,
        price: parseInt(req.body.price)
    })
    res.status(200).json(change)
}

 module.exports.getSpecific = async function (req: Request, res: Response) {
     const id = req.params.id;
     const Shiping = await shiping.findById(id)

     try {
        res.status(200).json(Shiping);
      } catch (error) {
        res.status(400).json(error)
      }
 };

