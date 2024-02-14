import { products } from "../data/mongo/manager.mongo.js"
//import products from "../data/fs/productFsManager.js"

export default (req, res, next) => {
    try {
        const { pid, stock } = req.params
        const one = products.readOne(pid)
        if (one.stock >= stock) {
            return next()
        } else {
            const error = new Error("there aren't stock")
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        return next(error)
    }
}