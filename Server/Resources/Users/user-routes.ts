import express from "express";
import mongoose from "mongoose";
const controller = require("./controller");

const usersRouter = express.Router();


usersRouter
// addNewUser
.post("/handleRegister", controller.addNewUser)

// handleLogin

// createCookieSession

export default usersRouter;