import { Schema, model, Types } from "mongoose";
import { validateHour, validateUrl, constainsSpace, validateEmail } from "./validations";

const clientSchema = new Schema({
    name: { type: String },
    birthDay: { type: Date, requiried: true, index: true },
    contact: {
        email: { type: String, validate: validateEmail() },
        phoneNumber: { type: String, validate: constainsSpace() },
        instagram: { type: String, validate: validateUrl() }
    },
})

const tableSchema = new Schema({
    number: { type: Number, min: 0, requiried: true, index: true },
    status: { requiried: true, index: true, enum: ["available", "out", "reserved", "seated"], default: "avalible" },
    capacity: { type: Number, min: 1, default: 1, requiried: true, index: true },
    reserve: {
        client: clientSchema,
        date: { type: Date, requiried: true, index: true },
        arriveTime: {
            type: String,
            required: true,
            validate: validateHour()
            ,
        },
        endTime: {
            type: String,
            required: true,
            validate: validateHour()
        },
        peopleArrive: Number,
        notes: String
    },
})

const reservationSchema = new Schema({
    restaurant: { type: Types.ObjectId, requiried: true, index: true, ref: "restaurants" },
    tables: [tableSchema]
})

export const reservationModel = model("reservations", reservationSchema)