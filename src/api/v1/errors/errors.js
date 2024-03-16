/**
 * @openapi
 * components:
 *  responses:
 *     NotFound:
 *          description: Element not found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *                              example: "'Element name' not found"
 *                          success:
 *                              type: boolean
 *                              example: false
 * 
 *     UnaunthenticatedError:
 *          description: Authentication invalid
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *                              example: Authentication invalid
 *                          success:
 *                              type: boolean
 *                              example: false
 *     UnauthorizedError:
 *          description: Access token is missing or invalid
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string 
 *                              example: Unauthorized
 *                          success:
 *                              type: boolean
 *                              example: false
 *     InvalidCredentials:
 *          description: The provided username or password is incorrect
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *                              example: The provided username or password is incorrect
 *                          success:
 *                              type: string
 *                              example: false
 *      
 *     Registered:
 *          description: User alredy registered   
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *                              example: Alredy registered
 *                          success:
 *                              type: string
 *                              example: false     
 *     BadRequest:
 *          description: Bad request body
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *                              example: Bad request body
 *                          success:
 *                              type: string
 *                              example: false          
 *     ErrorNotHandled:
 *          description: Unhandled error occurred. Please contact the administrator for assistance.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                            type: string
 *                            example: Type of error encountered here
 *                          success:
 *                            type: boolean
 *                            example: false  
 */ 

export class NotFound extends Error {
    constructor(elementNotFound, message = "Not found") {
        super(elementNotFound + " " + message)
        this.statusCode = 404
    }
}

export class UnauthenticatedError extends Error {
    constructor(message = "Authentication invalid") {
        super(message)
        this.statusCode = 401
    }
}

export class UnauthorizedError extends Error {
    constructor(message = "Access token is missing or invalid") {
        super(message)
        this.statusCode = 401
    }
}

export class InvalidCredentials extends Error {
    constructor(message = "The provided username or password is incorrect") {
        super(message)
        this.statusCode = 401
    }
}

export class Registered extends Error {
    constructor(elementRegistered, message = "Alredy registered") {
        super(elementRegistered + " " + message)
        this.statusCode = 400
    }
}