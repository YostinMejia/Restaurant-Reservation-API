import express, { json } from "express"
import dotenv from "dotenv"
import { connectDb } from "./src/db/connection.js"
import { routerRestaurant } from "./routes/restaurant.js"
import { routerReservation } from "./routes/reservation.js"
import { routerTable } from "./routes/tables.js"
dotenv.config()
const app = express()

app.use(json())
try {
    await connectDb().then(console.log("Connected to the db"))
    app.use("/restaurants", routerRestaurant)
    app.use("/restaurants/:idRestaurant/tables", routerTable)
    app.use("/restaurants/:idRestaurant/tables/:idTable/reserve", routerReservation)
    app.use("*", (req, res) => { res.status(404).send("404 Url not found") })
    app.listen(process.env.PORT ?? 3000, () => { console.log("Server listening on port", process.env.PORT ?? 3000); })

} catch (error) {
    console.log("Connection falied", error);
}


