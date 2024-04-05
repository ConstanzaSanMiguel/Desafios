import service from "../services/users.services.js"

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
            return res
                .cookie("token", req.token, {
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                })
                .success200("Logged in!")
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
                return res.error400()
            }
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
const { register, login, googlecb, me, signout, badauth, forbidden, verifyAccount } = controller

export default SessionsController
export { register, login, googlecb, me, signout, badauth, forbidden, verifyAccount }