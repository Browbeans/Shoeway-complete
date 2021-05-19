import express from "express";
import mongoose from "mongoose";

const controller = require("./controller");
const usersRouter = express.Router();


usersRouter
.get("/", controller.fetchUsers)
.post("/handleRegister", controller.handleRegister)
.post("/handleLogin", controller.handleLogin)
.delete("/handleLogout", controller.handleLogout)

export default usersRouter;