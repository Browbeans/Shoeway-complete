import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface User {
    name: string,
    adress: {
        city: string,
        street: string,
        zip: string
    },
    phone: string,
    email: string,
    password: string
    role: string
}

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        validate: {
            validator: (value: any) => {
                const nameRegex = /^[a-öA-Ö\s,'-]+$/;
                return nameRegex.test(value);
            },
            message: "Name must be a string",
        } 
    },
    adress: { 
        city: { 
            type: String, 
            required: true,
            validate: {
                validator: (value: any) => {
                    const cityRegex = /^[a-öA-Ö\s,'-]+$/;
                    return cityRegex.test(value);
                },
                message: "City must be a string",
            }  
        }, 
        street: { 
            type: String, 
            required: true,
            validate: {
                validator: (value: any) => {
                    const streetRegex = /^[a-öA-Ö0-9\s,'-]*$/;
                    return streetRegex.test(value)
                },
                message: "Street name is inavlid"
            } 
        },
        zip: { 
            type: String, 
            required: true,
            validate: {
                validator: (value: any) => {
                    const zipRegex = /^\d{5}$/;
                    return zipRegex.test(value);
                },
                message: "Zip is invalid"
            }
        }
    },
    phone: { 
        type: String, 
        required: true,
        validate: {
            validator: (value: any) => {
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(value);
            },
            message: "Phone has to contain 10 digits"
        } 
    },
    email: { 
        type: String, 
        required: true,
        validate: {
            validator: (value: any) => {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(value);
            },
            message: "Email is not valid"
        }
    },
    password: { 
        type: String, 
        required: true,
        validate: {
            validator: (value: string) => {
                const phoneRegex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,}).*$/;
                return phoneRegex.test(value);
            },
            message: "Password must be eight characters, atleast one number"
        } 
    },
    role: {
        type: String
    }
})

userSchema.pre<User>("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model<User>('Users', userSchema);