import { Schema, model, Types } from "mongoose"
import { validateUrl, constainsSpace } from "../utils/validations.js"

/**
 * @openapi
 * components:
 *  schemas:
 *   Product:
 *     type: object
 *     required:
 *       - name
 *       - price
 *     properties:
 *       _id:
 *         type: string
 *         format: ObjectId
 *         example: "61660df88f595dbf98d08f8d"
 *       name:
 *         type: string
 *         example: "Pizza"
 *       price:
 *         type: number
 *         minimum: 0
 *         example: 10.99
 *       description:
 *         type: string
 *         example: "Delicious pizza with pepperoni and cheese"
 *       imgPath:
 *         type: string
 *         example: "/images/pizza.jpg"
*
 *   Restaurant:
 *     type: object
 *     required:
 *       - name
 *       - type
 *       - contact
 *       - operationTime
 *       - location
 *       - products
 *     properties:
 *       name:
 *         type: string
 *         example: "Best Pizza Place"
 *       type:
 *         type: string
 *         enum:
 *           - fast food
 *           - ethnic
 *           - fast casual
 *           - thematic
 *           - casual dining
 *           - premium casual
 *           - family restaurant
 *           - fine dining
 *           - buffet restaurant
 *           - barbecue restaurant
 *           - pizzeria
 *           - seafood
 *           - café
 *           - steakhouse
 *           - gastropub
 *           - food truck
 *           - bistro
 *         example: "fast food"
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
 *           url:
 *             type: string
 *             example: "http://www.bestpizzaplace.com"
 *       operationTime:
 *         type: object
 *         properties:
 *           open:
 *             type: number
 *             minimum: 0
 *             maximum: 1440
 *             example: 600
 *           close:
 *             type: number
 *             minimum: 0
 *             maximum: 1440
 *             example: 1320
 *       location:
 *         type: object
 *         properties:
 *           address:
 *             type: string
 *             example: "123 Main St"
 *           neighborhood:
 *             type: string
 *             example: "Downtown"
 *           city:
 *             type: string
 *             example: "New York"
 *           state:
 *             type: string
 *             example: "NY"
 *       products:
 *         type: array
 *         items:
 *           $ref: "#/components/schemas/Product"
*/
              
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