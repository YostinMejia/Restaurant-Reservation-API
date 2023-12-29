import { Router } from "express";
import { SearchController } from "../controllers/searchController.js";
export const routerSearch = Router()

routerSearch.get("/", SearchController.get)