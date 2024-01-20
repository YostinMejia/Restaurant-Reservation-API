import { UserController } from "../controllers/userController.js";
import { Router } from "express";
import { routerCart } from "./cart.js";
export const routerUser = Router()

routerUser.use("/cart", routerCart)

routerUser.get("/", UserController.get)
routerUser.patch("/", UserController.updateUser)
routerUser.delete("/", UserController.deleteUser)

