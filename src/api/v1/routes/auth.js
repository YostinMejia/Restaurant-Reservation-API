/**
 * @openapi
 * /auth/register:
 *  post:
 *      summary: Create a new user
 *      tags:
 *          - Register
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          201:
 *              description: New user created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          401:
 *              $ref: "#/components/responses/Registered"   
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled" 
 *      
 * /auth/login:
 *  post:
 *      summary: Log in the user
 *      tags:
 *          - Log in
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Login"
 *      responses:
 *          200:
 *              description: User log in succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  description: User token
 *                                  format: token
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *          
 *          404:
 *              $ref: "#/components/responses/NotFound" 
 *          401:
 *              $ref: "#/components/responses/InvalidCredentials"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 */


import { Router } from "express";
import { Authentication } from "../controllers/authController.js";
export const routerAuth = Router()

routerAuth.post("/register", Authentication.register)
routerAuth.post("/login", Authentication.logIn)
