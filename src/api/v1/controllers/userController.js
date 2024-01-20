import { UserService } from "../services/userService.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

export class UserController {

    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await UserService.get(req.user._id)
            return res.json(response)
        })(req, res, next)
    }

    static async updateUser(req, res, next) {
        tryCatchWrapper(async () => {
            delete req.body.rol
            const response = await UserService.update(req.user._id, req.body)
            return res.status(200).json(response)
        })(req, res, next)
    }

    static async deleteUser(req, res, next) {
        tryCatchWrapper(async () => {
            const response = await UserService.delete(req.user._id)
            req.user = {}
            req.headers.authorization = ""
            return res.status(200).json(response)
        })(req, res, next)
    }

}