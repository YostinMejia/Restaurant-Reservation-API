import { restaurantModel } from "../models/restaurantSchema.js";

export class SearchService {
    static async get(queryParams, pages = 1, limitPerPage = 0) {
        const result = { "restaurants": [] }
        for (let i = 0; i < pages; i++) {
            result.restaurants.push(await restaurantModel.find(queryParams).skip(limitPerPage * i).limit(limitPerPage))
        }
        return result
    }
}