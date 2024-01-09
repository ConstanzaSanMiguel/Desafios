function propsUsers(req, res, next) {
    const data = req.body
    const required = ["name", "photo", "email"]
    const missing = required.filter(prop => !(prop in data))

    if (missing.length > 0) {
        const error = new Error(`Missing fields: ${missing.join(" ")}`)
        error.statusCode = 400
        return next(error)
    } else {
        return next()
    }
}

export default propsUsers
