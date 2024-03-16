/**
 * @openapi
 * 
 * /restaurants/{idRestaurant}/tables:
 *  get:
 *      tags:
 *          - Table
 *      summary: Get all the restaurants
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idRestaurant
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Table"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  post:
 *      tags:
 *          - Table
 *      summary: Create a new table
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idRestaurant
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Table"
 *      responses:
 *          201:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Table"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          400:
 *              $ref: "#/components/responses/BadRequest"         
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 * 
 * 
 * /restaurants/{idRestaurant}/tables/{id}:
 *  get:
 *      tags:
 *          - Table
 *      summary: Get only the table identified by the id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idRestaurant
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
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
 *                          $ref: "#/components/schemas/Table"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  patch:
 *      tags:
 *          - Table
 *      summary: Update the table identified by the id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idRestaurant
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
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
 *                      $ref: "#/components/schemas/Table"
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Table"
 *          
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  delete:
 *      tags:
 *          - Table
 *      summary: Delete the table identified by the id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idRestaurant
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          example: "Table identified as: 609bfe4b0c00ff001e06559c deleted."
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound"    
 * 
 */

import { Router } from "express";
import { TableController } from "../controllers/tableController.js";
import { routerReservation } from "./reservation.js"
export const routerTable = Router()

routerTable.use("/", routerReservation)

routerTable.route("/")
    .get(TableController.get)
    .post(TableController.create)

routerTable.route("/:id")
    .get(TableController.getOne)
    .delete(TableController.delete)
    .patch(TableController.update)
