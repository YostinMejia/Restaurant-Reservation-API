import { RestaurantService } from "../services/restaurantService.js"
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js"

export class RestaurantController {
    
    static async create(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await RestaurantService.create(req.body)
            return res.status(201).json(response.restaurant)
        })(req, res, next)
    }
    
    static async getOne(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await RestaurantService.getOne(req.params.id)
            return res.status(200).json(response.restaurant)
        })(req, res, next)
    }
    
    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await RestaurantService.get()
            return res.status(200).json(response.restaurants)
        })(req, res, next)
    }
    
    static async delete(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await RestaurantService.delete(req.params.id)
            return res.status(200).json(response.message)
        })(req, res, next)
    }
    
    static async update(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await RestaurantService.update(req.params.id, req.body)
            return res.status(200).json(response.restaurant)
        })(req, res, next)
    }
}