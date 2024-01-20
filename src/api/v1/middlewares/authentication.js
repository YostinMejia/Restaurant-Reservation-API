import { UnauthenticatedError } from "../errors/errors.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export async function authorization(req, res, next) {
    tryCatchWrapper(async () => {
        const scheme = req.headers.authorization

        if (!scheme || !scheme.toLowerCase().startsWith("bearer ")) {
            throw new UnauthenticatedError()
        }

        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findOne({ _id: payload.id })

        next()

    })(req, res, next)

}