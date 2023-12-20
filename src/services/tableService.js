import { tableModel } from "../db/schemas/reservationSchema.js";

export class TableService {

    static async create(body) {
        try {
            const table = new tableModel(body)
            return { table: await table.save(), succes: true }
        } catch (error) {
            return { errors: error, succes: false }
        }
    }

    static async get() {
        try { return { tables: await tableModel.find(), succes: true } }
        catch (error) { return { errors: error, succes: false } }
    }

    static async getOne(id) {
        try {
            const table = await tableModel.findById(id)
            if (table == null) { throw new Error("IncorrectId") }
            return { table: table, succes: true }
        } catch (error) { 
            return { errors: {error,"message":error.message}, succes: false } }
    }

    static async update(id, body) {
        try {
            const newtable = await tableModel.findByIdAndUpdate({ "_id": id }, body, { new: true, runValidators: true })
            if (!newtable || newtable.isModified === 0) { throw new Error("IncorrectId") }
            return { table: newtable, succes: true }
        } catch (error) {
            return { errors: { error, "message": error.message }, succes: false }
        }
    }

    static async delete(id) {
        try {
            const response = await tableModel.deleteOne({ "_id": id })
            if (response.deletedCount === 0) { throw new Error("IncorrectId") }
            return { message: "table idenfied as: " + id + " deleted", succes: true }
        } catch (error) {
            return { errors: { error, "message": error.message }, succes: false }
        }

    }
} 