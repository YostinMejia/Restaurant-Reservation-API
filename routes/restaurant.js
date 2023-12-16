import { Router } from "express";
import { Restaurant } from "../src/controllers/restaurant.js";
export const router = Router()

router.get("/", Restaurant.get)
router.get("/:id", Restaurant.getOne)
router.post("/", Restaurant.create)
router.delete("/:id", Restaurant.delete)
router.patch("/:id", Restaurant.update)



