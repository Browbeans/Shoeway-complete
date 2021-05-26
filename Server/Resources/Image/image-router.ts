import express from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
const controller = require('./image-controller')
const ImageRouter = express.Router()
import multer from 'multer';


const upload = multer({

})

ImageRouter.post('/uploadImage', upload.single('image'), controller.uploadImage);


export default ImageRouter