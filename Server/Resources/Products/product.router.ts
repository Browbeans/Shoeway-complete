import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|/;
        const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    } else {
      console.log('not an image');
    }
  },
});

const controller = require('./product.controller')
const productRouter = express.Router();

productRouter
  .get("/", controller.getProducts)
  .get("/:id", controller.getSpecific)
  .post("/addProduct", controller.addNewProduct)
  .post("/uploadImage", upload.single("image"), controller.uploadImage)
  .get('/:id', controller.getImage)
  .delete("/:id", controller.deleteProduct)
  .put("/:id", controller.editProduct);

export default productRouter;