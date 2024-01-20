import { Router } from "express";
import { Authentication } from "../controllers/authController.js";
export const routerAuth = Router()

routerAuth.post("/register", Authentication.register)
routerAuth.post("/login", Authentication.logIn)



