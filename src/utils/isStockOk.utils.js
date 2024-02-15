import { products } from "../data/mongo/manager.mongo.js"

export default async (req, res, next) => {
    try {
        const { pid } = req.params
        const { quantity } = req.body
        const one = products.readOne(pid)
        if (!quantity || one.stock >= quantity) {
            one.stock = one.stock - quantity
            await one.save()
            return next()
        } else {
            const error = new Error("There is no stock available")
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        return next(error)
    }
}