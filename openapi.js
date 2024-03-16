import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

const config = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Restaurant Reservation API",
            summary: "Restaurant reservation API",
            contact: {
                email: "ysmaprogramming@gmail.com"
            },
            version: "1.0.0"
        },
        servers: [
            {
                url: "https://{domain}:{port}/api/{basePath}",
                description: "API server",
                variables: {
                    domain: {
                        default: "localhost"
                    },
                    port: {
                        enum: [
                            "3000"
                        ],
                        default: "3000"
                    },
                    basePath: {
                        default: "v1"
                    }
                }
            }
        ],
    },

    apis: [
        "./src/api/v1/models/reservationModel.js",
        "./src/api/v1/models/restaurantModel.js",
        "./src/api/v1/models/tableModel.js",
        "./src/api/v1/models/userModel.js",

        "./src/api/v1/errors/errors.js",

        "./src/api/v1/routes/auth.js",
        "./src/api/v1/routes/user.js",
        "./src/api/v1/routes/cart.js",
        "./src/api/v1/routes/restaurant.js",
        "./src/api/v1/routes/reservation.js",
        "./src/api/v1/routes/table.js",
        "./src/api/v1/routes/search.js"
    ]
}

const swaggerSpec = swaggerJSDoc(config)

export function swaggerDocs(app) {
    app.use("/api/v1/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
    app.get("/api/v1/docs.json", (req, res) => {
        res.json(swaggerSpec)
    })
}

