import { Schema, model, Types } from "mongoose"
import { validateUrl, constainsSpace } from "../utils/validations.js"

const productSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    description: { type: String },
    imgPath: { type: String }

})

const restaurantTypes = ["fast food", "ethnic", "fast casual", "thematic", "casual dining", "premium casual", "family restaurant", "fine dining", "buffet restaurant", "barbecue restaurant", "pizzeria", "seafood", "café", "steakhouse", "gastropub", "food truck", "bistro"]
const restaurantSchema = new Schema({
    name: { type: String, required: [true, "Name is empty"], unique: true, index: true },
    type: { type: String, enum: { values: restaurantTypes, message: '{VALUE} is not supported' }, required: [true, "Restaurant type required"], index: true },
    contact: {
        phone: {
            number: { type: String, minLength: 6, maxLength: 15, validate: constainsSpace() },
            prefix: { type: String, minLength: 1, maxLength: 6, validate: constainsSpace() }
        },
        url: { type: String, validate: validateUrl() }
    },
    operationTime: {
        open: { type: Number, min: 0, max: 1440, required: [true, "Opening time is required"] },
        close: { type: Number, min: 0, max: 1440, required: [true, "Closing time is required"] }
    },
    location: {
        address: String,
        neighborhood: String,
        city: { type: String, required: [true, "City is required"], index: true },
        state: { type: String, required: [true, "State is required"], index: true }
    },
    products: [productSchema]
});

export const restaurantModel = model("restaurant", restaurantSchema)