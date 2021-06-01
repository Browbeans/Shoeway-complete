import express from "express";

const controller = require("./controller");
const usersRouter = express.Router();

usersRouter
.get("/", controller.fetchUsers)
.get("/currentUser", controller.getCurrenUser)
.post("/handleRegister", controller.handleRegister)
.post("/handleLogin", controller.handleLogin)
.put("/handleUpdate", controller.handleUpdate)
.delete("/handleLogout", controller.handleLogout)
.put("/handleRole/:id", controller.handleRole)

export default usersRouter;