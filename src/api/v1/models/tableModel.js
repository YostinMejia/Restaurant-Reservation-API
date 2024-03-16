import { Schema, model } from "mongoose";
import { reservationSchema } from "./reservationModel.js";

/**
 * @openapi
 * 
 * components:
 *  schemas:
 *      Table:
 *          type: object
 *          properties:
 *              restaurant:
 *                  $ref: "#/components/schemas/Restaurant"
 *              numberOfTable:
 *                  type: number
 *                  minimun: 0
 *              status:
 *                  type: string
 *                  enum:
 *                      - available
 *                      - out
 *                      - reserved
 *                      - seated
 *                  default: available
 *              capacity:
 *                  type: number
 *                  minimum: 1
 *                  default: 2
 *              reservations:
 *                  type: array
 *                  items:
 *                      $ref: "#/components/schemas/Reservation"
 *          required:
 *              - restaurant
 *              - numberOfTable
 *              - status
 *              - capacity
 */

const tableSchema = new Schema({

    restaurant: { type: Schema.Types.ObjectId, required: true, ref: "restaurants" },
    numberOfTable: { type: Number, min: 0, required: [true, "empty number of tables"] },
    status: { type: String, required: true, enum: { values: ["available", "out", "reserved", "seated"] }, default: "available" },
    capacity: { type: Number, min: 1, default: 2, required: true, index: true },
    reservations: [reservationSchema]
})

export const tableModel = model("tables", tableSchema)