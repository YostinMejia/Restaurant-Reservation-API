import express, { json } from "express"
import dotenv from "dotenv"
import { connectDb } from "./src/db/connection.js"
import { router } from "./routes/restaurant.js"
dotenv.config()
const app = express()

app.use(json())
try {
    await connectDb().then(console.log("Connected to the db"))
    app.use("/restaurants", router)
    app.use("*", (req, res) => { res.status(404).send("404 Url not found") })
    app.listen(process.env.PORT ?? 3000, () => { console.log("Server listening on port", process.env.PORT ?? 3000); })

} catch (error) {
    console.log("Connection falied");
}


