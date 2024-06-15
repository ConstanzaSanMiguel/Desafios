import service from "../services/users.services.js"
import repository from "../repositories/users.rep.js"
import CustomError from "../utils/errors/CustomError.js"
import errors from "../utils/errors/errors.js"
import { createToken, verifyToken } from "../utils/token.util.js"

class SessionsController {
    constructor() {
        this.service = service
    }
    register = async (req, res, next) => {
        const { email, name, verifiedCode } = req.user
        await this.service.register({ email, name, verifiedCode })
        try {
            return res.success200("User registered")
        } catch (error) {
            return next(error)
        }
    }
    login = async (req, res, next) => {
        try {
            const options = {
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true,
            }
            const user = await repository.readByEmail(req.user.email)
            
            return res.cookie("token", req.token, options).success200({user, message: "Logged In"});

        } catch (error) {
            return next(error)
        }
    }
    googlecb = async (req, res, next) => {
        try {
            return res.success200("Logged in with google")
        } catch (error) {
            return next(error)
        }
    }
    me = async (req, res, next) => {
        try {
            const user = {
                uid: req.user.uid,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                photo: req.user.photo,
            }
            return res.success200(user)
        } catch (error) {
            return next(error)
        }
    }
    signout = async (req, res, next) => {
        try {
            return res.clearCookie("token")
                .redirect("/")
                //no se muestra el json por el redirect de arriba
                .success200("User signed out")
        }
        catch (error) {
            return next(error)
        }
    }
    verifyAccount = async (req, res, next) => {
        try {
            const { email, verifiedCode } = req.body
            const user = await service.readByEmail(email)
            if (user.verifiedCode === verifiedCode) {
                await service.update(user._id, { verified: true })
                return res.success200("Verified user")
            } else {
                CustomError.new(errors.token)
            }
        } catch (error) {
            return next(error)
        }
    }
    recovery = async (req, res, next) => {
        try {
            const { email } = req.body
            const user = await this.service.readByEmail(email)
            if (user) {
                const token = createToken({ uid: user._id, email: user.email }, { expiresIn: 5400 })
                await this.service.recovery(user, token)
                return res.json({
                    statusCode: 200,
                    message: "Email sent! Please check your inbox.",
                })
            } else {
                CustomError.new(errors.notFound)
            }
        } catch (error) {
            return next(error)
        }
    }
    resetPassword = async (req, res, next) => {
        try {
            const { token, newPassword } = req.body
            const decoded = verifyToken(token) // Verificar y decodificar el token
            if (!decoded || !decoded.uid) {
                return res.status(400).json({ message: "Invalid or expired token" })
            }
            const user = await this.service.readOne(decoded.uid)
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            await this.service.updatePassword(user._id, newPassword) // Método para actualizar la contraseña
            return res.json({ message: "Password updated successfully" })
        } catch (error) {
            return next(error)
        }
    }
    badauth = (req, res, next) => {
        try {
            return res.error401()
        } catch (error) {
            return next(error)
        }
    }
    forbidden = (req, res, next) => {
        try {
            return res.error403()
        } catch (error) {
            return next(error)
        }
    }
}

const controller = new SessionsController()
const { register, login, googlecb, me, signout, badauth, forbidden, verifyAccount, recovery, resetPassword } = controller

export default SessionsController
export { register, login, googlecb, me, signout, badauth, forbidden, verifyAccount, recovery, resetPassword }