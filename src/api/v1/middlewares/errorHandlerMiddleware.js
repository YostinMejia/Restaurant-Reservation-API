import { Error } from "mongoose";
import { Registered, NotFound, InvalidCredentials } from "../errors/errors.js";
import jwt from "jsonwebtoken"

export function errorHandlerMiddleware(err, req, res, next) {

    console.log(err);

    if (err instanceof NotFound || err instanceof Registered || err instanceof InvalidCredentials) {
        return res.status(err.statusCode).json({ error: err.message, success: false })
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: err.message, success: false })
    }

    if (err instanceof Error) {
        return res.status(400).json({ error: err.message, success: false })
    }

    return res.status(500).json({ error: err.message, success: false })
}