import express from "express";

const controller = require("./controller");
const usersRouter = express.Router();

usersRouter
.get("/", controller.fetchUsers)
.post("/handleRegister", controller.handleRegister)
.post("/handleLogin", controller.handleLogin)
.put("/handleUpdate", controller.handleUpdate)
.delete("/handleLogout", controller.handleLogout)

export default usersRouter;