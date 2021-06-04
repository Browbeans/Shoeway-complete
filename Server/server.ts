import express from 'express'
import cookieSession from 'cookie-session'
import OrderRouter from './Resources/Order/order.router'
import mongoose from 'mongoose'
import usersRouter from "./Resources/Users/user-routes";
import shiping from './Resources/Shiping/shiping-routers';
import productRouter from './Resources/Products/product.router';
import ImageRouter from './Resources/Image/image-router';
import errorHandler from './Error/ErrorHandler';

const app = express()

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000 

const url = "mongodb+srv://Browbeans:Freak219@cluster0.ghtls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

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
    maxAge: 10000 * 60,
    httpOnly: true 
}))

app.use('/order/', OrderRouter)
app.use("/users", usersRouter);
app.use('/products', productRouter);
app.use("/Shiping", shiping );
app.use('/image', ImageRouter);

app.use(errorHandler);

app.get("/", (_: any, res: any) => {
    console.log('Server connected');
})
