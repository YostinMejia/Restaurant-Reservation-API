import { userModel } from "../models/userModel.js";
import { NotFound } from "../errors/errors.js";

export class UserService {

    static async get(id) {
        return { user: await userModel.findById(id) }
    }

    static async update(id, body) {
        const newUser = await userModel.findByIdAndUpdate({ _id: id }, body, {
            new: true,
            runValidators: true
        })
        if (!newUser || newUser.isModified === 0) {
            throw new NotFound("User")
        }
        return newUser
    }

    static async delete(id) {
        const userDeleted = await userModel.deleteOne({ _id: id })
        if (userDeleted === 0) {
            throw new NotFound("User")
        }
        return userDeleted
    }


}