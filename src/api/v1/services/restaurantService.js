import { restaurantModel } from "../models/restaurantSchema.js"
import { NotFound } from "../errors/errors.js"

export class RestaurantService {

    static async create(body) {
        const restaurant = new restaurantModel(body)
        return { restaurant: await restaurant.save()}
    }

    static async getOne(id) {
        const restaurant = await restaurantModel.findById(id)
        if (restaurant === null) { throw new NotFound("Restaurant") }
        return { restaurant: restaurant}
    }
 
    static async get() {
        return { restaurants: await restaurantModel.find()}
    }

    static async delete(id) {
        const restaurantDeleted = await restaurantModel.deleteOne({ "_id": id })
        if (restaurantDeleted.deletedCount === 0) { throw new NotFound("Restaurant") }
        return ({ message: 'Restaurant identified as:' + id + " deleted."})
    }

    static async update(id, body) {
        const newRestaurant = (await restaurantModel.findOneAndUpdate({ "_id": id }, body, {
            new: true,
            runValidators: true
        }))
        if (!newRestaurant || newRestaurant.isModified === 0) { throw new NotFound("Restaurant") }
        return { restaurant: newRestaurant}
    }
}