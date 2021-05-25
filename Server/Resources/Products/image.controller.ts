// import Image from './image.model';
const Image = require('./image.model')
import { Request, Response} from 'express';

module.exports.uploadImage = async (req: Request, res: Response) => {

    console.log(req.file);
    console.log('hello');
    try {
        const uploadedImage = new Image({
            image: req.file.path,
        });
        await uploadedImage.save();
        res.status(200).json(uploadedImage);
    } catch (error) {
        console.log(error);
    }
}