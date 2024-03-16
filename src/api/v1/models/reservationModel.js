import { Schema, model, Types } from "mongoose";
import { constainsSpace, validateEmail } from "../utils/validations.js";
/**
 * @openapi
 * components:
 *  schemas:
 *   Client:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the client.
 *         example: "609bfe4b0c00ff001e06559c"
 *       name:
 *         type: string
 *         example: John
 *       lastName:
 *         type: string
 *         example: "Doe"
 *       birthDay:
 *         type: string
 *         format: date
 *         example: "1990-01-01"
 *       email:
 *         type: string
 *         format: email
 *         example: "john@example.com"
 *       contact:
 *         type: object
 *         properties:
 *           phone:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 example: "123456789"
 *               prefix:
 *                 type: string
 *                 example: "+1"
 *     required:
 *       - _id
 *       - birthDay
 *       - email
 *       - contact
 *
 *   Reservation:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the reservation.
 *         example: "609bfe4b0c00ff001e06559d"
 *       client:
 *         $ref: '#/components/schemas/Client'
 *         example:
 *           _id: "609bfe4b0c00ff001e06559c"
 *           name: "John"
 *           lastName: "Doe"
 *           birthDay: "1990-01-01"
 *           email: "john@example.com"
 *           contact:
 *             phone:
 *               number: "123456789"
 *               prefix: "+1"
 *       date:
 *         type: string
 *         format: date
 *         example: "2024-03-11"
 *       endTime:
 *         type: number
 *         minimum: 0
 *         maximum: 1440
 *         example: 1200
 *       peopleArrive:
 *         type: number
 *         minimum: 1
 *         example: 4
 *       notes:
 *         type: string
 *         example: "Special request: gluten-free"
 * 
 */

const clientSchema = new Schema({
    _id: { type: Types.ObjectId, required: true, ref: "users" },
    name: String,
    lastName: String,
    birthDay: { type: Date, required: true },
    email: { type: String, required: true, validate: validateEmail() },
    contact: {
        phone: {
            number: { type: String, required: true, minLength: 6, maxLength: 15, validate: constainsSpace() },
            prefix: { type: String, required: true, minLength: 1, maxLength: 6, validate: constainsSpace() }
        },
    }
})

export const reservationSchema = new Schema({
    _id: { type: Types.ObjectId, default: new Types.ObjectId() },
    client: { type: clientSchema, required: true },
    date: { type: Date, required: true },
    endTime: { type: Number, min: 0, max: 1440 },
    peopleArrive: { type: Number, min: 1, required: true },
    notes: String
})


export const clientModel = model("client", clientSchema)
export const reservationModel = model("reserve", reservationSchema)