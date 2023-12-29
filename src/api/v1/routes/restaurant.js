import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController.js";
import { routerTable } from "./table.js"
export const routerRestaurant = Router()

routerRestaurant.use("/:id/tables", routerTable)

routerRestaurant.route("/")
    .get(RestaurantController.get)
    .post(RestaurantController.create)

routerRestaurant.route("/:id")
    .get(RestaurantController.getOne)
    .delete(RestaurantController.delete)
    .patch(RestaurantController.update)




