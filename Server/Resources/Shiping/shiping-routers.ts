import express from 'express';
const controller = require('./Controller')

const shiping = express.Router();

shiping
    .get('/getall', controller.getShiping)
    .post('/addshiping', controller.addNewshiping)
    .delete('/deleteshiping/:id', controller.deletShiping)
    .put('/editshiping/:id', controller.editShiping)
    .get('/:id', controller.getSpecific)

export default shiping;