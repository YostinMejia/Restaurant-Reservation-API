import { TableService } from "../services/tableService.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

export class TableController {

    static async create(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await TableService.create(req.body)
            if (response.succes) { return res.status(201).json(response.table) }
        })(req, res, next)
    }

    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await TableService.get()
            if (response.succes) { return res.status(200).json(response.tables) }
        })(req, res, next)
    }

    static async getOne(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await TableService.getOne(req.params.id)
            if (response.succes) { return res.status(200).json(response.table) }
        })(req, res, next)
    }

    static async update(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await TableService.update(req.params.id, req.body)
            if (response.succes) { return res.status(200).json(response.table) }
        })(req, res, next)
    }

    static async delete(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await TableService.delete(req.params.id)
            if (response.succes) { return res.status(200).json(response.message) }
        })(req, res, next)
    }
}