import { verifyToken } from "../utils/token.util"

//no logro hacer navegar la navbar según el usuario que inicie sesión

export default (req, res, next) => {
    try {
        const data = verifyToken(req.cookies.token)
        const { role } = data
        if (role === "admin") {
            if (req.path !== '/' && req.path !== '/form') {
                return res.redirect('/')
            }
        } else if (role === "user ") {
            if (req.path !== '/' && req.path !== '/orders') {
                return res.redirect('/')
            }
        } else {
            if (req.path !== '/' && req.path !== '/auth/register' && req.path !== '/auth/login') {
                return res.redirect('/')
            }
        }
    } catch (error) {
        return next(error)
    }
}
