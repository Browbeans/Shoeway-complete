import { Request, Response } from 'express';
const Image = require('./image-model');

module.exports.uploadImage = async function(req: Request, res: Response) {

    try{
        const uploadedImage = new Image({
            Image: req.file.path
        })
        await uploadedImage.save();
        res.json(req.file.path)
        console.log("hello");

    } catch(error){
        console.log(error);
    }

}

module.exports.getImage = async function(req: Request, res: Response){

    const id = req.params.id;
    const specificImage = await Image.findById(id);
    res.status(200).json(specificImage);
}

