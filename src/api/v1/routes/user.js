/**
 * @openapi
 * 
 * /user:
 *  get:
 *      tags:
 *          - User
 *      summary: User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User" 
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"    
 *  patch:
 *      tags:
 *          - User
 *      summary: Update the User
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: Element to update and the new value 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *          
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *  delete:
 *      tags:
 *          - User
 *      summary: Delete the User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok: 
 *                                  type: integer
 *                                  example: 1 if no errors occurred
 *                              deletedCount: 
 *                                  type: integer
 *                                  example: the number of documents deleted
 *                              n: 
 *                                  type: integer
 *                                  example: the number of documents deleted. Equal to deletedCount.
 *          401:
 *              $ref: "#/components/responses/UnauthorizedError"
 *          404:
 *              $ref: "#/components/responses/NotFound"    
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              in: header
 *              scheme: bearer
 *              name: token
 *              description: Use Bearer token
 *              bearerFormat: JWT
 * 
 */

import { UserController } from "../controllers/userController.js";
import { Router } from "express";
import { routerCart } from "./cart.js";
export const routerUser = Router()

routerUser.use("/cart", routerCart)

routerUser.get("/", UserController.get)
routerUser.patch("/", UserController.updateUser)
routerUser.delete("/", UserController.deleteUser)

