import express, { json } from "express"
import { connectDb } from "./src/api/v1/db/connection.js"
import { routerRestaurant } from "./src/api/v1/routes/restaurant.js"
import { routerSearch } from "./src/api/v1/routes/search.js"
import { errorHandler } from "./src/api/v1/middlewares/errorHandler.js"
import { notFound } from "./src/api/v1/middlewares/notFound.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(json())
app.use("/api/v1/restaurants", routerRestaurant)
app.use("/api/v1/search",routerSearch)
app.use(notFound)
app.use(errorHandler)

async function start() {

    try {
        await connectDb().then(console.log("Connected to the db"))

        app.listen(process.env.PORT || 3000, () => { console.log("Server listening on port", process.env.PORT ?? 3000); })

    } catch (error) {
        console.log("Connection falied", error);
    }
}
start()
