import { Schema, model, Types } from "mongoose";
import { constainsSpace, validateEmail } from "../utils/validations.js";

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
