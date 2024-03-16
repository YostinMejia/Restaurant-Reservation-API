import { Schema, model, Types } from "mongoose";
import { validateEmail, validatePassword, constainsSpace } from "../utils/validations.js";
import { reservationSchema } from "./reservationModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

/**
 * @openapi
 * components:
 *  schemas:
 *   Cart:
 *     type: array
 *     items:
 *      properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the reservation.
 *         example: "609bfe4b0c00ff001e06559d"
 *       client:
 *         $ref: '#/components/schemas/Client'
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
 *       tableId:
 *          type: string
 *          example: "609bfe4b0c00ff001e06559c "
 * 
 *   Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: john@example.com
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: password123    
 *
 *   User:
 *     type: object
 *     required:
 *       - name
 *       - lastName
 *       - birthDay
 *       - location
 *       - contact
 *       - email
 *       - password
 *     properties:
 *       _id:
 *         type: string
 *         format: ObjectId
 *       name:
 *         type: string
 *         example: John
 *       lastName:
 *         type: string
 *         example: Doe
 *       birthDay:
 *         type: string
 *         format: date
 *         example: 2002-03-11T10:00:00Z
 *       location:
 *         type: object
 *         properties:
 *           address:
 *             type: string
 *             example: 123 Street
 *           neighborhood:
 *             type: string
 *             example: Downtown
 *           city:
 *             type: string
 *             example: New York
 *           state:
 *             type: string
 *             example: NY
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
 *       rol:
 *         type: string
 *         enum:
 *           - user
 *           - admin
 *           - owner
 *         default: user
 *         example: user
 *       email:
 *         type: string
 *         format: email
 *         example: john@example.com
 *       password:
 *         type: string
 *         format: password
 *         example: Password123
 *       reserves:
 *         type: array
 *         items:
 *           $ref: "#/components/schemas/Reservation"
 *       cart:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Cart"
 *       createdAt:
 *         type: string
 *         format: date
 *         example: "2024-03-11T10:00:00Z"
 *       updatedAt:
 *         type: string
 *         format: date
 *         example: "2024-03-11T10:00:00Z"
 */


const carSchema = new Schema()
carSchema.add(reservationSchema).add({ idTable: { type: Types.ObjectId, required: true } })

const userSchema = new Schema({
    name: { type: String, required: true, maxLength: 60 },
    lastName: { type: String, required: true, maxLength: 60 },
    birthDay: { type: Date, required: true },
    location: {
        address: String,
        neighborhood: String,
        city: { type: String, required: [true, "City is required"], index: true },
        state: { type: String, required: [true, "State is required"], index: true }
    },
    contact: {
        phone: {
            number: { type: String, required: true, minLength: 6, maxLength: 15, validate: constainsSpace() },
            prefix: { type: String, required: true, minLength: 1, maxLength: 6, validate: constainsSpace() }
        },
    },

    rol: { type: String, enum: ["user", "admin", "owner"], default: "user" },
    email: { type: String, unique: true, required: true, validate: validateEmail() },
    password: { type: String, required: true, minLength: 8, validate: validatePassword() },
    reserves: [reservationSchema],
    cart: [carSchema]
},
    { timestamps: true })

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.method("comparePwd", async function (password) {
    return await bcrypt.compare(password, this.password)
})
userSchema.method("createJwt", function () {
    return jwt.sign({ id: this.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
})

export const userModel = model("user", userSchema)

