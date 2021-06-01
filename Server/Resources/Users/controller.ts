const Users = require("./users-model");
import { Request, Response } from 'express';
import bcrypt from "bcrypt";

module.exports.handleRegister = async function(req: Request, res: Response) {
    const { name, adress, phone, email, password, role } = req.body;
    const registeredUsers = await Users.find({email: email})
    const existingUsers = registeredUsers.find((u: any) => u.email === email);

    if (existingUsers) {
        return res.status(400).json("Email already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
        name: name,
        adress: {
            city: adress.city,
            street: adress.street,
            zip: adress.zip
        },
        phone: phone,
        email: email,
        password: hashedPassword,
        role: role
    })
    await newUser.save((error: any) => {
        if(error) {
            return res.status(400).json(error.message)
        }
        res.status(201).json("Register Success!") 
    })
};


module.exports.handleLogin = async function(req: Request, res: Response) {
    const { email, password} = req.body
    console.log(req.body)
    const registeredUsers = await Users.find({email: email})
    const user = registeredUsers.find((u: any) => u.email === email);
    console.log(user)
    try {
        if(!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json('Incorrect email or password');
        }     
        
        if (req.session) {
            req.session.name = user.name;
            req.session.adress = user.adress;
            req.session.phone = user.phone;
            req.session.email = user.email;
            req.session.zip = user.zip;
            req.session.role = user.role;
        }
        res.status(200).json(null)
        console.log(req.session!.name)
    } catch (error) {
        console.log(error);
    }
}

module.exports.handleLogout = async function(req: Request, res: Response) {
    if (req.session!.name) {
        req.session = null;
        return res.status(200).json("Logout Success!")
    }
    res.status(400).json("You are already logged out!");
}

module.exports.handleUpdate = async function(req: Request, res: Response) {
    console.log(req.body)
    if (req.session?.email) {
        const email = req.session.email
        console.log(email)
        const registeredUsers = await Users.findOne({email: email})
    
        await registeredUsers.updateOne({
            name: req.body.name,
            adress: req.body.adress,
            phone: req.body.phone, 
            email: req.body.email,
        })
        return res.status(202).json("User updated!")
    }
    res.status(400).json("You must login to update");
}

module.exports.getCurrenUser = async function ( req: Request, res: Response) {
    if(req.session!.email) {
        const currentEmail = req.session!.email
        const currentUser = await Users.findOne({email: currentEmail})
        res.status(200).json(currentUser)
    } else {
        res.status(400).json('No user available')
    }
}

module.exports.fetchUsers = async (req: Request, res: Response) => {
    if (req.session?.email) {
        if (req.session?.role === 'admin') {
            const result = await Users.find({})
            res.json(result)
        } else {
            return res.status(403).json("You dont have authorization")
        }
    } else {
        res.status(400).json("You must login");
    }
};

module.exports.handleRole = async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await Users.findByIdAndUpdate( id, {
        role: req.body.role
    })
    res.status(200).json('Role updated!')
}
