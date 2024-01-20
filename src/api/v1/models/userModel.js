import { Schema, model, Types } from "mongoose";
import { validateEmail, validatePassword, constainsSpace } from "../utils/validations.js";
import { reservationSchema } from "./reservationModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


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

