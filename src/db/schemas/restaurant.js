import { Schema, model, Types } from "mongoose"

const productSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    description: { type: String },
    imgPath: { type: String }

})

const restaurantSchema = new Schema({
    name: { type: String, required: [true, "Name is empty"], unique: true, index: true },
    type: {
        type: String, enum: {
            values: ["fast food", "ethnic", "fast casual", "thematic", "casual dining", "premium casual", "family restaurant", "fine dining", "buffet restaurant", "barbecue restaurant", "pizzeria", "seafood", "café", "steakhouse", "gastropub", "food truck", "bistro", "virtual restaurant"]
            , message: '{VALUE} is not supported'
        },
        required: [true, "Restaurant type required"],
        index: true
    },
    contact: {
        phone: {
            number: {
                type: String, minLength: 6, maxLength: 15,
                validate: { validator: constainsSpace, message: "{VALUE} Can't contain spaces." }
            },
            prefix: {
                type: String, minLength: 1, maxLength: 6,
                validate: { validator: constainsSpace, message: "{VALUE} Can't contain spaces." }
            }
        },
        url: {
            type: String,
            validate: { validator: validateUrl, message: "{VALUE} Invalid URL format" }
        }
    },
    operationTime: {
        open: {
            type: String,
            required: true,
            validate: { validator: validateHour, message: "Time Format invalid, the valid format is HH:MM:SS (00:00 a 23:59)." }
        },
        close: {
            type: String,
            required: true,
            validate: { validator: validateHour, message: "Time Format invalid, the valid format is HH:MM:SS (00:00 a 23:59)." }
        }
    },
    location: {
        address: String,
        neighborhood: String,
        city: { type: String, required: true, index: true },
        state: { type: String, required: true, index: true }
    },
    products: [productSchema]

})

function validateHour(hour) {
    const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regexHora.test(hour)
}
function constainsSpace(text) { return !(/\s/.test(text)) }

function validateUrl(url) {
    const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
    return urlRegex.test(url)
}

export const restaurantModel = model("restaurant", restaurantSchema)
