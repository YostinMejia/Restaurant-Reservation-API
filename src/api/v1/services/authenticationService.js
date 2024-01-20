import { InvalidCredentials } from "../errors/errors.js"
import { userModel } from "../models/userModel.js"

export class AuthenticationService {

    static async createUser(body) {
        const user = new userModel(body)
        await user.validate()
        await user.save()
        
        return user
    }

    static async logIn(email, password) {
        if (!email || !password) {
            throw new InvalidCredentials()
        }

        const user = await userModel.findOne({ email: email })

        if (!user) {
            throw new InvalidCredentials()
        }

        const isPwdCorrect = await user.comparePwd(password)

        if (!isPwdCorrect) {
            throw new InvalidCredentials()
        }
        const token = await user.createJwt()

        return { token }

    }
}