import passport from "passport"
import CustomError from "../utils/errors/customError.js"
import errors from "../utils/errors/errors.js"

export default (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            console.log({ error, user, info })
            if (error) {
                return next(error);
            }
            if (!user) {
                CustomError.new({
                    message: info.message || errors.auth.message,
                    statusCode: info.statusCode || errors.auth.statusCode,
                })
            }
            req.user = user
            return next()
        })(req, res, next)
    }
}