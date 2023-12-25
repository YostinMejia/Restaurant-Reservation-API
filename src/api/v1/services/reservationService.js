import { TableService } from "../services/tableService.js";
import { tableModel, reservationModel } from "../db/schemas/reservationSchema.js";
import { NotFound } from "../errors/errors.js";

export class ReservationService {

    static async create(idTable, body) {
        const reservation = new reservationModel(body)
        await reservation.validate()
        const { table } = await TableService.getOne(idTable)

        if (!table) {
            throw new NotFound("Table")
        }
        else if (table.reservations.length === 0) {
            const newReserve = await tableModel.updateOne({ _id: idTable }, { $push: { reservations: reservation } })
            return { reservation: newReserve, succes: true }
        }
        else {
            const isSameDay = (date1, date2) => {
                return (
                    date1.getFullYear() === date2.getFullYear() &&
                    date1.getMonth() === date2.getMonth() &&
                    date1.getDate() === date2.getDate()
                )
            }
            //To be able to make a reservation, the table must not be reserved less orthan 1 hour before or after.
            const notReserved = table.reservations.filter((reserve) => {
                return (
                    isSameDay(new Date(body.date), reserve.date) &&
                    Math.abs(new Date(body.date).getTime() - reserve.date.getTime()) < 3600000
                )
            })// returns the table if cannot be booked at that hour.

            if (notReserved.length > 0) {
                throw new Error("HourReserved")
            }

            const newReserve = await tableModel.updateOne({ _id: idTable }, { $push: { reservations: reservation } })
            return { reservation: newReserve, succes: true }
        }
    }

    static async get(idTable) {
        const { table } = await TableService.getOne(idTable)

        if (!table) {
            throw new NotFound("Table")
        }
        
        return { reservation: table.reservations, succes: true }
    }

    static async getOne(idTable, idReservation) {
        const { table } = await TableService.getOne(idTable)

        if (!table) {
            throw new NotFound("Table")
        }

        const indexReservation = table.reservations.findIndex(
            (reservation) => { return reservation._id.toString() === idReservation }
        )

        if (indexReservation === -1) {
            throw new NotFound("Reservation")
        }

        return { reservation: table.reservations[indexReservation], succes: true }
    }
    //to update you need to provide the full reservation object
    static async update(idTable, idReservation, body) {
        const { table } = await TableService.getOne(idTable)

        if (!table) {
            throw new NotFound("Table")
        }

        const indexReservation = table.reservations.findIndex(
            (reservation) => { return reservation._id.toString() === idReservation }
        )

        if (indexReservation === -1) {
            throw new NotFound("Reservation")
        }

        const newReservation = new reservationModel(body)
        await newReservation.validate()

        table.reservations[indexReservation] = newReservation // Reservation update

        const updatedTable = await table.save()

        return { reservation: updatedTable.reservations[indexReservation], success: true }
    }


    static async delete(idTable, idReservation,) {
        const { table } = await TableService.getOne(idTable)

        if (!table) { throw new NotFound("Table") }

        let indexReservation = table.reservations.findIndex(
            (reservation) => { return reservation._id.toString() === idReservation }
        )

        if (indexReservation === -1) {
            throw new NotFound("Reservation")
        }

        table.reservations.splice(indexReservation, 1)
        await table.save()

        return { message: "Reservation idenfied as: " + idReservation + " deleted.", succes: true }
    }
} 