import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { rateLimit } from 'express-rate-limit'
import https from 'https'
import fs from "fs"

import { connectDb } from "./src/api/v1/db/connection.js"
import { routerRestaurant } from "./src/api/v1/routes/restaurant.js"
import { routerSearch } from "./src/api/v1/routes/search.js"
import { routerAuth } from "./src/api/v1/routes/auth.js"
import { routerUser } from "./src/api/v1/routes/user.js"
import { errorHandlerMiddleware } from "./src/api/v1/middlewares/errorHandlerMiddleware.js"
import { notFoundMiddleware } from "./src/api/v1/middlewares/notFoundMiddleware.js"
import { authorization } from "./src/api/v1/middlewares/authentication.js"
import { swaggerDocs } from "./openapi.js"

const app = express()
dotenv.config()

app.set("trust proxy", 1)

// HTTP to HTTPS redirection middleware
app.use((req, res, next) => {
    if (req.secure || req.protocol === 'https') {
        // If the request is already secure (https), move to the next middleware
        next();
    } else {
        // Redirect HTTP to HTTPS
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
})

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(json())
app.use(cors())
app.use(helmet())
app.use(limiter)

app.use("/api/v1/auth", routerAuth)
app.use("/api/v1/search", routerSearch)
app.use("/api/v1/user", authorization, routerUser)
app.use("/api/v1/restaurants", authorization, routerRestaurant)


// Documentation
swaggerDocs(app)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const serverOptions = {
    key: fs.readFileSync('./ssl/private-key.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem')
}

const server = https.createServer(serverOptions, app);

async function start() {

    try {
        await connectDb()
        console.log("Connected to the db")


        server.listen(process.env.PORT || 3000, () => {
            console.log("Server listening on port", process.env.PORT ?? 3000)
            console.log("HTTPS enabled")
        })

    } catch (error) {
        console.log("Connection failed", error);
    }
}

start()
