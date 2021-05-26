import { Request, Response } from 'express';
import fileUpload, { UploadedFile } from "express-fileupload";

module.exports.uploadImage = async function(req: Request, res: Response) {
    
    if (req.files?.image) {
      let f = req.files.image as UploadedFile;
      const fileName = Date.now() + "-" + f.name;
      f.mv("uploads/" + fileName, () => {
        res.status(200).send();
      });
    } else {
      res.status(500).send();
    }
}
