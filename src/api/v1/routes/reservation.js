import { Router } from "express";
import { ReservationController } from "../controllers/reservationController.js"
export const routerReservation = Router()

routerReservation.route("/:idTable/reservations")
    .get(ReservationController.get)
    .post(ReservationController.create)

routerReservation.route("/:idTable/reservations/:idReservation")
    .get(ReservationController.getOne)
    .patch(ReservationController.update)
    .delete(ReservationController.delete)
