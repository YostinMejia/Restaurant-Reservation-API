/**
 * @openapi
 * /restaurants:
 *  get:
 *      tags:
 *          - Restaurant
 *      summary: Get all the restaurants
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Restaurant"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  post:
 *      tags:
 *          - Restaurant
 *      summary: Create a new restaurant
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Restaurant"
 *      responses:
 *          201:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Restaurant"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          400:
 *              $ref: "#/components/responses/BadRequest"         
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 * 
 * 
 * /restaurants/{id}:
 *  get:
 *      tags:
 *          - Restaurant
 *      summary: Get only the restaurant identified by the id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Restaurant"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  patch:
 *      tags:
 *          - Restaurant
 *      summary: Update the restaurant identified by the id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      requestBody:
 *          description: Element to update and the new value 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Restaurant"
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Restaurant"
 *          
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  delete:
 *      tags:
 *          - Restaurant
 *      summary: Delete the restaurant identified by the id
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          example: "Restaurant identified as: 609bfe4b0c00ff001e06559c deleted."
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound"    
 * 
 */ 

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




