import { Router } from "express";
import { ReservationController } from "../controllers/reservationController.js"

import { validateReservationAccess } from "../middlewares/validateReservationAccess.js";
export const routerReservation = Router()

routerReservation.route("/:idTable/reservations")
    .post(ReservationController.addReservationToCart)
    .get(ReservationController.get)

routerReservation.route("/:idTable/reservations/:idReservation")
    .get(validateReservationAccess, ReservationController.getOne)
    .patch(validateReservationAccess, ReservationController.update)
    .delete(validateReservationAccess, ReservationController.delete)



