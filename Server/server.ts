import express from 'express'
import cookieSession from 'cookie-session'
import OrderRouter from './Resources/Order/order.router'
import mongoose from 'mongoose'
import usersRouter from "./Resources/Users/user-routes";
import productRouter from './Resources/Products/routes';

const app = express()

const PORT = process.env.PORT || 5000 

const url = "mongodb://localhost:27017/lab-4"
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(url,  options)
.then((result: any) => app.listen(PORT))
.catch((err: any) => {console.log(err);})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/order/', OrderRouter)
app.use(express.static('../client/public'))
app.use("/users", usersRouter);
app.use('/products', productRouter);


app.get("/", (_: any, res: any) => {
    console.log('Server connected');
})
