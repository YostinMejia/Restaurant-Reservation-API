import { Router } from "express";
import { TableController } from "../src/controllers/tableController.js";
export const routerTable = Router()


routerTable.get("/", TableController.get)
routerTable.get("/:id", TableController.getOne)
routerTable.post("/", TableController.create)
routerTable.delete("/:id", TableController.delete)
routerTable.patch("/:id", TableController.update)