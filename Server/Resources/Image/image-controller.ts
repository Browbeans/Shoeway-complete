import { Request, Response } from 'express';
const Image = require('./image-model');

module.exports.uploadImage = async function(req: Request, res: Response) {

    try{
        const uploadedImage = new Image({
            Image: req.file.path
        })
        await uploadedImage.save();
        res.send(req.file.path)
        console.log("hello");

    } catch(error){
        console.log(error);
    }

}

