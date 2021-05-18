import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
const controller = require('./Controller')

const shiping = express.Router();

shiping
    .get('/', controller.getShiping)
 

export default shiping;