import { tryCatchWrapper } from "../utils/tryCatchWrapper.js"
import { AuthenticationService } from "../services/authenticationService.js";

export class Authentication {
    static async register(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await AuthenticationService.createUser(req.body)
            return res.json(response)
        })(req, res, next)
    }
    static async logIn(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await AuthenticationService.logIn(req.body.email, req.body.password)
            return res.json(response)
        })(req, res, next)
    }
}