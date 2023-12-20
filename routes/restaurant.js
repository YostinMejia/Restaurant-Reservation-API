import { Router } from "express";
import { RestaurantController } from "../src/controllers/restaurantController.js";
export const routerRestaurant = Router()

routerRestaurant.get("/", RestaurantController.get)
routerRestaurant.get("/:id", RestaurantController.getOne)
routerRestaurant.post("/", RestaurantController.create)
routerRestaurant.delete("/:id", RestaurantController.delete)
routerRestaurant.patch("/:id", RestaurantController.update)



