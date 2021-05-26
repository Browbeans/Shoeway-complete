import express from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'

const ImageRouter = express.Router()

ImageRouter.post('/uploadImage', fileUpload({ createParentPath: true }), (req, res) => {
    
    if(req.files?.image) {
        let f = req.files.image as UploadedFile
        const fileName = Date.now() + '-' + f.name
        f.mv('uploads/' + fileName, () => {

            res.status(200).send()
        })
    } else{
        res.status(500).send()
    }
})


export default ImageRouter