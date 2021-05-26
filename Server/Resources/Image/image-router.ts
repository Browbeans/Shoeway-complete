import express from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
const controller = require('./image-controller')
const ImageRouter = express.Router()
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {
    if(file.mimtype === 'image/jpeg' || file.mimtype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
});

ImageRouter.post('/uploadImage', upload.single('image'), controller.uploadImage);


export default ImageRouter