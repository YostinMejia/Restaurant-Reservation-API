import { restaurantModel } from "../db/schemas/restaurant.js"

export class Restaurant {

    static async create(req, res) {
        try {
            const restaurant = new restaurantModel(req.body)

            res.status(200).json(await restaurant.save())
        }
        catch (error) { res.status(400).json(error.message) }
    }
    static async getOne(req, res) {
        try {
            const restaurant = await restaurantModel.findById(req.params.id)
            if (!null) { return res.status(404).json({ message: "Element not found" }) }
            res.json(restaurant)
        } catch (error) { res.status(500).json(error) }

    }
    static async get(req, res) {
        try {
            const restaurants = await restaurantModel.find()
            res.json(restaurants)
        } catch (error) { res.status(500).json(error) }

    }
    static async delete(req, res) {
        try {
            res.json(await restaurantModel.deleteOne({ "_id": req.params.id }))
        } catch (error) {
            res.json(error)
        }
    }
    static async update(req, res) {
        try {
            res.json(await restaurantModel.findOneAndUpdate({ "_id": req.params.id }, req.body, {
                new: true,
                runValidators: true
            }))
        }
        catch (error) {
            res.json(error)
        }
    }
}