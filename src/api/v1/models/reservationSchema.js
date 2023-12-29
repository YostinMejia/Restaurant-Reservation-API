import { Schema, model, Types } from "mongoose";
import { validateUrl, constainsSpace, validateEmail } from "../utils/validations.js";

const clientSchema = new Schema({
    name: String,
    birthDay: { type: Date, required: true, index: true },
    contact: {
        email: { type: String, validate: validateEmail() },
        phoneNumber: { type: String, validate: constainsSpace() },
        instagram: { type: String, validate: validateUrl() }
    },
    _id: false
})

const reservationSchema = new Schema({
    _id: { type: Types.ObjectId, default: new Types.ObjectId() },
    client: { type: clientSchema, required: true },
    date: { type: Date, required: true, index: true },
    endTime: { type: Number, min: 0, max: 1440 },
    peopleArrive: { type: Number, min: 1, required: true },
    notes: String
})

const tableSchema = new Schema({
    restaurant: { type: Schema.Types.ObjectId, required: true, index: true, ref: "restaurants" },
    numberOfTable: { type: Number, required: [true, "empty number of tables"] },
    status: { type: String, required: true, enum: { values: ["available", "out", "reserved", "seated"] }, default: "available" },
    capacity: { type: Number, min: 1, default: 2, required: true, index: true },
    reservations: [reservationSchema]
})

export const tableModel = model("tables", tableSchema)
export const reservationModel = model("reserve", reservationSchema)
