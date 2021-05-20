import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
const controller = require('./Controller')

const shiping = express.Router();

shiping
    .get('/getall', controller.getShiping)
    .post('/addshiping', controller.addNewshiping)
    .delete('/deleteshiping/:id', controller.deletShiping)
    .put('/editshiping/:id', controller.editShiping)

export default shiping;