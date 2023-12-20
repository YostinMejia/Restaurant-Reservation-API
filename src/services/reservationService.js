import { tableModel, reservationModel } from "../db/schemas/reservationSchema.js";

export class ReservationService {

    static async create(idTable, body) {
        try {
            const table = await this.getOne(idTable)
            const notReserved = (table.reseve).filter((reserve) => { ( ((body.date).setHours(body.date.getHours) - 1.50 >= reserve.date) && (reserve.date >= body.date) ) }) //returns the tables that can be booked.
            console.log(notReserved);
            // const reservation = new reservationModel(body)
            // const newReserve = await tableModel.updateOne({ _id: idTable }, { $push: { reservations: reservation } })
            return { table: notReserved, succes: true }
        } catch (error) {
            return { errors: error, succes: false }
        }
    }

    static async get() {
        try { return { tables: await reservationModel.find(), succes: true } }
        catch (error) { return { errors: error, succes: false } }
    }

    static async getOne(id) {
        try {
            const table = await reservationModel.findById(id)
            if (table == null) { throw new Error("IncorrectId") }
            return { table: table, succes: true }
        } catch (error) {
            return { errors: { error, "message": error.message }, succes: false }
        }
    }

    static async update(id, body) {
        try {
            const newtable = await reservationModel.findByIdAndUpdate({ "_id": id }, body, { new: true, runValidators: true })
            if (!newtable || newtable.isModified === 0) { throw new Error("IncorrectId") }
            return { table: newtable, succes: true }
        } catch (error) {
            return { errors: { error, "message": error.message }, succes: false }
        }
    }

    static async delete(id) {
        try {
            const response = await reservationModel.deleteOne({ "_id": id })
            if (response.deletedCount === 0) { throw new Error("IncorrectId") }
            return { message: "table idenfied as: " + id + " deleted", succes: true }
        } catch (error) {
            return { errors: { error, "message": error.message }, succes: false }
        }

    }
} 