import { verifyToken } from "../utils/token.util.js"

export default (req, res, next) => {
    try {
        const data = verifyToken(req.cookies.token)
        const { role } = data
        if (role === "admin") {
            return next()
        } else {
            const error = new Error("Forbidden")
            error.statusCode = 403
            throw error
        }
    } catch (error) {
        return next(error)
    }
}