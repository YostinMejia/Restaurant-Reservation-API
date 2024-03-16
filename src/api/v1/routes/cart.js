/**
 * @openapi
 * /user/cart:
 *  get:
 *      tags:
 *          - Cart
 *      summary: User reservations in cart
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Cart" 
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 * 
 * /user/cart/{idReservation}:
 *  get:
 *      tags:
 *          - Cart
 *      summary: Get only the reservation identified by the idReservation
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idReservation
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Cart"  
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"     
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 * 
 *  post:
 *      tags:
 *          - Cart
 *      summary: confirm the reservation identified by the idReservation
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: idReservation
 *            schema:
 *                type: string
 *                example: "609bfe4b0c00ff001e06559c" 
 *            required: true
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Cart"        
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError" 
 *          400:
 *              $ref: "#/components/responses/BadRequest"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *
 * 
 *  delete:
 *      tags:
 *          - Cart
 *      summary: Delete only the reservation identified by the idReservation
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: idReservation
 *          schema:
 *              type: string
 *              example: "609bfe4b0c00ff001e06559c" 
 *          required: true
 *      responses:
 *          200:
 *             description: Reservation deleted successfully
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Cart"     
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"   
 *          404:
 *              $ref: "#/components/responses/NotFound"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 */

import { CartController } from "../controllers/cartController.js"
import { Router } from "express"
export const routerCart = Router()

routerCart.get("/", CartController.get)

routerCart.route("/:idReservation")
    .get(CartController.getOne)
    .post(CartController.confirmReservation)
    .delete(CartController.deleteReservation)