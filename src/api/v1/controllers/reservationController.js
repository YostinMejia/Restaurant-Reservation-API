import { ReservationService } from "../services/reservationService.js"
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js"

export class ReservationController {
    
    static async create(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.create(req.params.idTable, req.body)
            if (response.succes) { return res.status(201).json(response.reservation) }
        })(req, res, next)
    }
    static async getOne(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.getOne(req.params.idTable, req.params.idReservation)
            if (response.succes) { return res.status(200).json(response.reservation) }
        })(req, res, next)
    }
    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.get(req.params.idTable,)
            if (response.succes) { return res.status(200).json(response) }
        })(req, res, next)
    }
    static async delete(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.delete(req.params.idTable, req.params.idReservation)
            if (response.succes) { return res.status(200).json(response) }
        })(req, res, next)
    }
    static async update(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await ReservationService.update(req.params.idTable, req.params.idReservation, req.body)
            if (response.succes) { return res.status(200).json(response) }
        })(req, res, next)
    }
}