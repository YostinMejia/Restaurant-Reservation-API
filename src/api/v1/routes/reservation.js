/**
 * @openapi
 * /restaurants/{idRestaurant}/tables/{idTable}/reservations:
 *  get:
 *      tags:
 *          - Reservation
 *      summary: Get all reservations in the restaurant and table
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
 *              $ref: "#/components/schemas/Reservation"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          400:
 *              $ref: "#/components/responses/BadRequest"         
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  post:
 *      tags:
 *          - Reservation
 *      summary: Add reservation to the cart
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
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Reservation"
 *      responses:
 *          201:
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              reservation:
 *                                  $ref: "#/components/schemas/Reservation"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          400:
 *              $ref: "#/components/responses/BadRequest"         
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  
 * /restaurants/{idRestaurant}/tables/{idTable}/reservations/{id}:
 *  get:
 *      tags:
 *          - Reservation
 *      summary: Get only the Reservation identified by the id
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
 *                          $ref: "#/components/schemas/Reservation"
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  patch:
 *      tags:
 *          - Reservation
 *      summary: Update the Reservation identified by the id
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
 *                      $ref: "#/components/schemas/Reservation"
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Reservation"
 *          
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  delete:
 *      tags:
 *          - Reservation
 *      summary: Delete the Reservation identified by the id
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
 *                          example: "Reservation identified as: 609bfe4b0c00ff001e06559c deleted."
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound"    
 */


import { Router } from "express";
import { ReservationController } from "../controllers/reservationController.js"

import { validateReservationAccess } from "../middlewares/validateReservationAccess.js";
export const routerReservation = Router()

routerReservation.route("/:idTable/reservations")
    .post(ReservationController.addReservationToCart)
    .get(ReservationController.get)

routerReservation.route("/:idTable/reservations/:idReservation")
    .get(validateReservationAccess, ReservationController.getOne)
    .patch(validateReservationAccess, ReservationController.update)
    .delete(validateReservationAccess, ReservationController.delete)

