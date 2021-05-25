// import Image from './image.model';
const Image = require('./image.model')
import { Request, Response} from 'express';

const uploadImage = async (req: Request, res: Response) => {

    try {
        const uploadedImage = new Image({
            image: req.file.path,
            name: req.body.name
        });
        await uploadedImage.save();
        res.status(200).json(uploadImage);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadImage };