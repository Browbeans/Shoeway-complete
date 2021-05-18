const userModel = require("./users-model");
import { Request, Response } from 'express'

module.exports.addNewUser = function(req: Request, res: Response) {
    const newUser = new userModel({
        name: req.body.name,
        adress: req.body.adress,
        phone: req.body.phone,
        email: req.body.email,
        zip: req.body.zip,
    })
    newUser.save();
    res.status(201).json(newUser)
};