import { RestaurantService } from "../services/restaurantService.js"

export class RestaurantController {

    static async create(req, res) {
        const response = await RestaurantService.create(req.body)
        if (response.succes) { return res.status(201).json(response.restaurant) }
        else if (response.errors.name === "ValidationError"|| response.errors === "NameRegistered") { return res.status(400).json(response.errors) }
        else { res.status(500).json(response.errors) }
    }
    static async getOne(req, res) {
        const response = await RestaurantService.getOne(req.params.id)
        if (response.succes) { return res.status(200).json(response.restaurant) }
        else if (response.errors.message === "IncorrectId") { return res.status(404).json(response.errors) }
        else { res.status(500).json(response.errors) }
    }
    static async get(req, res) {
        const response = await RestaurantService.get()
        if (response.succes) { return res.status(200).json(response) }
        res.status(500).json(response.errors)
    }
    static async delete(req, res) {
        const response = await RestaurantService.delete(req.params.id)
        if (response.succes) { return res.status(200).json(response) }
        else if (response.errors.message === "IncorrectId") { return res.status(404).json(response.errors.message) }
        else { res.status(500).json(response.errors) }
    }
    static async update(req, res) {
        const response = await RestaurantService.update(req.params.id, req.body)
        if (response.succes) { return res.status(200).json(response) }
        else if (response.errors.message === "ValidationError") { return res.status(400).json(response.errors.message) }
        else if (response.errors.message === "IncorrectId") { return res.status(404).json(response.errors.message) }
        else { res.status(500).json(response.errors) }
    }
}