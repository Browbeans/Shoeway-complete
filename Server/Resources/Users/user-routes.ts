import express from "express";
import mongoose from "mongoose";

const controller = require("./controller");
const usersRouter = express.Router();


usersRouter
.post("/handleRegister", controller.addNewUser)
.post("/handleLogin", controller.handleLogin)

// createCookieSession

export default usersRouter;