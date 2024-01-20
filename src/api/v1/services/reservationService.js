import { TableService } from "../services/tableService.js";
import { reservationModel } from "../models/reservationModel.js";
import { tableModel } from "../models/tableModel.js";
import { NotFound } from "../errors/errors.js";

export class ReservationService {

    static isHourReserved(date, reservations) {
        const isSameDay = (date1, date2) => {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            )
        }

        //To be able to make a reservation, the table must not be reserved less orthan 1 hour before or after.
        if (reservations.length === 0) { return false }

        const notReserved = reservations.filter((reserve) => {
            return (
                isSameDay(new Date(date), reserve.date) &&
                Math.abs(new Date(date).getTime() - reserve.date.getTime()) < 3600000
            )
        })// returns the table if cannot be booked at that hour.

        return (notReserved.length > 0)
    }

    static async validateReservation(body) {
        const reservation = new reservationModel(body)
        await reservation.validate()
        return reservation
    }

    static reservationIndex(reservations, idReservation) {
        const index = reservations.findIndex(
            (reservation) => {
                return reservation._id.toString() === idReservation
            }
        )

        if (index === -1) {
            throw new NotFound("Reservation")
        }

        return index
    }


    static async create(idTable, body) {
        const { table } = await TableService.getOne(idTable)
        const reservation = await this.validateReservation(body)
        const reserved = this.isHourReserved(body.date, table.reservations)

        if (reserved) {
            throw new Error("Try making a reservation for a time either 30 minutes earlier or later. ")
        }

        await tableModel.updateOne({ _id: table._id }, { $push: { reservations: reservation } })
        return reservation
    }

    static async get(idTable, idUser) {
        idUser = idUser.toString()
        const { table } = await TableService.getOne(idTable)
        let reservations = []

        table.reservations.forEach(reservation => {
            if (reservation.client._id.toString() === idUser) {
                reservations.push(reservation)
            }
        });

        return { reservations: reservations }
    }


    static async getOne(idTable, idReservation) {
        const { table } = await TableService.getOne(idTable)

        const reservationIndex = this.reservationIndex(table.reservations, idReservation)

        return { reservation: table.reservations[reservationIndex] }
    }

    //to update you need to provide the full reservation object
    static async update(table, idReservation, body) {
        const reservation = await this.validateReservation(body)

        const reservationIndex = this.reservationIndex(table.reservations, idReservation)

        if (!body._id || table.reservations[reservationIndex]._id.toString() !== body._id) {
            throw new NotFound("Reservation")
        }

        table.reservations[reservationIndex] = reservation // Reservation update

        const updatedTable = await table.save()

        return { reservation: updatedTable.reservations[reservationIndex] }
    }

    static async delete(table, idReservation) {

        const reservationIndex = this.reservationIndex(table.reservations, idReservation)

        table.reservations.splice(reservationIndex, 1)
        await table.save()

        return { message: "Reservation idenfied by: " + idReservation + " deleted." }
    }


} 