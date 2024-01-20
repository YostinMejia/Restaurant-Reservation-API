import { ReservationService } from "../services/reservationService.js"
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js"
import { clientModel } from "../models/reservationModel.js"
import { UserService } from "../services/userService.js"
import { TableService } from "../services/tableService.js"

export class ReservationController {

    static async create(req, res, next) {
        tryCatchWrapper(async () => {
            req.body.client = new clientModel(req.user)
            const response = await ReservationService.create(req.table, req.body)
            return res.status(201).json(response.reservation)
        })(req, res, next)
    }

    static async getOne(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.getOne(req.params.idTable, req.params.idReservation, req.user._id)
            return res.json(response.reservation)
        })(req, res, next)
    }

    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.get(req.params.idTable, req.user._id)
            return res.json(response)
        })(req, res, next)
    }

    static async delete(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.delete(req.table, req.params.idReservation)
            return res.json(response)
        })(req, res, next)
    }

    static async update(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.update(req.table, req.params.idReservation, req.body)
            return res.json(response)
        })(req, res, next)
    }

    static async addReservationToCart(req, res, next) {
        tryCatchWrapper(async () => {
            req.body.client = new clientModel(req.user)

            const { table } = await TableService.getOne(req.params.idTable)
            const reserved = ReservationService.isHourReserved(req.body.date, table.reservations)
            const reservedInCart = ReservationService.isHourReserved(req.body.date, req.user.cart)

            if (reserved || reservedInCart) {
                throw new Error("Try making a reservation for a time either 30 minutes earlier or later. ")
            }

            req.body.idTable = table._id

            req.user.cart.push(req.body)
            await UserService.update(req.user._id, { cart: req.user.cart })

            return res.status(201).json({ reservation: req.body })
        })(req, res, next)
    }

}
