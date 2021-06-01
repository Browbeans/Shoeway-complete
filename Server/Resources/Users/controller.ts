const Users = require("./users-model");
import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
const ApiError = require("../../Error/ApiError");

module.exports.handleRegister = async function(req: Request, res: Response, next: NextFunction) {
    const { name, adress, phone, email, password, role } = req.body;
    const registeredUsers = await Users.find({email: email})
    const existingUsers = registeredUsers.find((u: any) => u.email === email);

    if (existingUsers) {
        next(ApiError.badRequest('Email already exist'))
        return;
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
            next(ApiError.badRequest(error.message))
            return;
        }
        res.status(201).json("Register Success!") 
    })
};


module.exports.handleLogin = async function(req: Request, res: Response, next: NextFunction) {
    const { email, password} = req.body
    const registeredUsers = await Users.find({email: email})
    const user = registeredUsers.find((u: any) => u.email === email);
    try {
        if(!user || !await bcrypt.compare(password, user.password)) {

            next(ApiError.unauthorized("Incorrect email or password"))
            return;
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
        next(ApiError.badRequest(error.message));
    }
}

module.exports.handleLogout = async function(req: Request, res: Response, next: NextFunction) {
    if (req.session!.name) {
        req.session = null;
        return res.status(200).json("Logout Success!")
    } else {
        next(ApiError.badRequest("You are already logged out!"));
        return;
    }
}

module.exports.handleUpdate = async function(req: Request, res: Response, next: NextFunction) {
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
    } else {
        next(ApiError.badRequest("You must login to update"));
        return;
    }
}

module.exports.getCurrenUser = async function ( req: Request, res: Response, next: NextFunction) {
    if(req.session!.email) {
        const currentEmail = req.session!.email
        const currentUser = await Users.findOne({email: currentEmail})
        res.status(200).json(currentUser)
    } else {
        next(ApiError.badRequest("No user available"));
        return;
    }
}

module.exports.fetchUsers = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.email) {
        if (req.session?.role === 'admin') {
            const result = await Users.find({})
            res.json(result)
        } else {
            return res.status(403).json("You dont have authorization")
        }
    } else {
        next(ApiError.badRequest("You must login"));
        return;
    }
};

module.exports.handleRole = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const user = await Users.findByIdAndUpdate( id, {
        role: req.body.role
    })
    if(user){
        res.status(200).json("Role updated!");
    } else {
        next(ApiError.notFound('Couldnt find the user'));
    }
}
