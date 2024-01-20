import { ReservationService } from "../services/reservationService.js"
import { UserService } from "../services/userService.js"
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js"


export class CartController {

    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            return res.json(req.user.cart)
        })(req, res, next)
    }

    static async getOne(req, res, next) {
        tryCatchWrapper(async () => {
            const reservationIndex = await ReservationService.reservationIndex(req.user.cart, req.params.idReservation)
            const reservation = req.user.cart[reservationIndex]
            return res.json(reservation)
        })(req, res, next)
    }

    static async confirmReservation(req, res, next) {
        tryCatchWrapper(async () => {

            const reservationIndex = await ReservationService.reservationIndex(req.user.cart, req.params.idReservation)
            const reservation = req.user.cart.splice(reservationIndex, 1)[0]

            await ReservationService.create(reservation.idTable, reservation)
            await UserService.update(req.user._id, { cart: req.user.cart })

            return res.json({ message: "reservation confirmed", reservation: reservation })
        })(req, res, next)
    }

    static async deleteReservation(req, res, next) {
        tryCatchWrapper(async () => {

            const reservationIndex = await ReservationService.reservationIndex(req.user.cart, req.params.idReservation)
            req.user.cart.splice(reservationIndex, 1)

            await UserService.update(req.user._id, { cart: req.user.cart })

            return res.status(201).json({ message: "Reservation idenfied by: " + req.params.idReservation + " deleted." })
        })(req, res, next)
    }
}