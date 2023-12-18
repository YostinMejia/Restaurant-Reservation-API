import mongoose from "mongoose"
import { restaurantModel } from "../db/schemas/restaurantSchema.js"

export class RestaurantService {

    static async create(body) {
        try {
            const restaurant = new restaurantModel(body)
            return { restaurant: await restaurant.save(), succes: true }
        }
        catch (error) { return { errors: error, succes: false } }
    }
    static async getOne(id) {
        try {
            const restaurant = await restaurantModel.findById(id)
            if (restaurant === null) { return { message: "Element not found", succes: false } }
            return { restaurant: restaurant, succes: true }
        } catch (error) { return { errors: error, succes: false } }

    }
    static async get() {
        try {
            return { restaurants: await restaurantModel.find(), succes: true }
        } catch (error) { return { errors: error, succes: false } }

    }
    static async delete(id) {
        try {
            const restaurantDeleted = await restaurantModel.deleteOne({ "_id": id })
            if (restaurantDeleted.deletedCount === 0) { throw new Error("IncorrectId") }
            return ({ message: 'Restaurant identified as:' + id + " deleted.", succes: true })
        } catch (error) { { return { errors: error, succes: false } } }
    }
    static async update(id, body) {
        try {
            const newRestaurant = (await restaurantModel.findOneAndUpdate({ "_id": id }, body, {
                new: true,
                runValidators: true
            }))
            if (!newRestaurant || newRestaurant.isModified === 0) { throw new Error("IncorrectId") }
            return { restaurant: newRestaurant, succes: true }
        }
        catch (error) {
            const { message } = error
            return { "errors": { error, "message": message }, success: false };
        }
    }
}