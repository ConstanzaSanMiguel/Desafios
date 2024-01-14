function propsOrders(req, res, next) {
    const data = req.body
    const { uid, pid, quantity, state } = data

    if (!uid || !pid || !quantity || !state) {
        const error = new Error("Missing required parameters")
        error.statusCode = 400
        return next(error)
    } else if (!"reserved".includes(state)) {
        const error = new Error(`Invalid state: ${state}`)
        error.statusCode = 400
        return next(error)
    } else {
        return next()
    }
}

export default propsOrders