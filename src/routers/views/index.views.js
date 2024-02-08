import { Router } from "express"

import productsRouter from "../api/products.router.api.js"
//import products from "../../data/fs/productFsManager.js"
import { products, orders, users } from "../../data/mongo/manager.mongo.js"

const viewsRouter = Router()

viewsRouter.get("/", async (req, res, next) => {
    try {
        const sortAndPaginate = {
            limit: Number.MAX_SAFE_INTEGER,
            //page: req.query.page || 1,
            sort: { title: 1 }
        }

        const all = await products.read({ sortAndPaginate }).then(data => data.docs.map(product => product.toJSON()))
        return res.render("index", { products: all })
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/real", async (req, res, next) => {
    try {
        const all = await products.read({})
        return res.render("real", { products: all })
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/form", (req, res, next) => {
    try {
        return res.render("form", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/register", (req, res, next) => {
    try {
        return res.render("register", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/products", productsRouter)
export default viewsRouter