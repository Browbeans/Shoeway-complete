import express from 'express';
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'

const app = express()

const PORT = 5000 

const url = "mongodb://localhost:27017/lab-4"
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(url,  options)
.then((result: any) => app.listen(PORT))
.catch((err: any) => {console.log(err);})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));