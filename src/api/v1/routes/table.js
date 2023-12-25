import { Router } from "express";
import { TableController } from "../controllers/tableController.js";
import { routerReservation } from "./reservation.js"
export const routerTable = Router()

routerTable.use("/", routerReservation)

routerTable.route("/")
    .get(TableController.get)
    .post(TableController.create)
    
routerTable.route("/:id")
    .get(TableController.getOne)
    .delete(TableController.delete)
    .patch(TableController.update)
