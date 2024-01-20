import { CartController } from "../controllers/cartController.js"
import { Router } from "express"
export const routerCart = Router()


routerCart.get("/", CartController.get)

routerCart.route("/:idReservation")
    .get(CartController.getOne)
    .post(CartController.confirmReservation)
    .delete(CartController.deleteReservation)