import express, { Request, Response} from 'express';
const imageRouter = express.Router();
const multer = require('multer');
const controller = require("./image.controller");

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, 'uploads/');
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, Date.now() + req.file.originalname);
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
})

imageRouter.
    post('/uploadImage', upload.single('image'), controller.uploadImage)

export default imageRouter;