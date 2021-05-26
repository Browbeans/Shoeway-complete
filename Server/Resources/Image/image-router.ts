import express from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
const controller = require('./image-controller')
const ImageRouter = express.Router()

ImageRouter.post('/uploadImage', fileUpload({ createParentPath: true }), controller.uploadImage);


export default ImageRouter