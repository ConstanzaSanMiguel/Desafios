import { Router } from "express"

import productsRouter from "../api/products.router.api.js"
//import products from "../../data/fs/productFsManager.js"
import sessionsRouter from "../api/sessions.router.api.js"
import ordersRouter from "../api/orders.router.api.js"
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

viewsRouter.get("/products/form", (req, res, next) => {
    try {
        return res.render("form", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/auth/register", (req, res, next) => {
    try {
        return res.render("register", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/auth/login", (req, res, next) => {
    try {
        return res.render("login", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/form", sessionsRouter)
viewsRouter.use("/orders", ordersRouter)
viewsRouter.use("/auth", sessionsRouter)

export default viewsRouter