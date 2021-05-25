import express, { Request, Response} from 'express';
const imageRouter = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, './uploads/');
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req: Request, file: any, cb: any) => {
         const fileTypes = /jpeg|jpg|png/;
         const extName = fileTypes.test(
             path.extname(file.originalname).toLowerCase()
         );

         if(extName) {
             return cb(null, true);
         } else {
             cb('Only images like jpeg, jpg, png');
         }
    },
})

const { uploadImage, getImage } = require('./image.controller');

imageRouter.use(express.json());

imageRouter.
post('/', upload.single('image'), uploadImage)

export default imageRouter;