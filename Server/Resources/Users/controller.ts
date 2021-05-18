const Users = require("./users-model");
import { Request, Response } from 'express';
import bcrypt from "bcrypt";

module.exports.addNewUser = async function(req: Request, res: Response) {
    const { name, adress, phone, email, password, zip } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
        name: name,
        adress: adress,
        phone: phone,
        email: email,
        password: hashedPassword,
        zip: zip
    })
    newUser.save();
    res.status(201).json(newUser)
};

module.exports.handleLogin = async function(req: Request, res: Response) {
    const { email, password} = req.body

    const registeredUsers = await Users.find({email: email})
    const user = registeredUsers.find((u: any) => u.email === email);

    if(!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json('Incorrect email or password');
    } else {
        return res.status(200).json("Logged in!")
    };
}