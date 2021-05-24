import express from 'express'
import cookieSession from 'cookie-session'
import OrderRouter from './Resources/Order/order.router'
import mongoose from 'mongoose'
import usersRouter from "./Resources/Users/user-routes";
import shiping from './Resources/Shiping/shiping-routers';
import productRouter from './Resources/Products/product.router';

const app = express()

const PORT = process.env.PORT || 5000 

const url = "mongodb://localhost:27017/lab-4"
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(url,  options)
.then((result: any) => app.listen(PORT))
.catch((err: any) => {console.log(err);})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../Client/public'));
app.use(cookieSession({
    name: "session",
    secret: "s3cr3tK3y",
    secure: false,
    maxAge: 1000 * 10,
    httpOnly: true 
}))

app.use('/order/', OrderRouter)
app.use("/users", usersRouter);
app.use('/products', productRouter);
app.use("/Shiping", shiping )


app.get("/", (_: any, res: any) => {
    console.log('Server connected');
})
