import { Router } from "express"

/*import productsRouter from "../api/products.router.api.js"
//import products from "../../data/fs/productFsManager.js"
import sessionsRouter from "../api/sessions.router.api.js"
import ordersRouter from "../api/orders.router.api.js"
import { products, orders, users } from "../../data/mongo/manager.mongo.js"*/

import { orders, products, users } from "../../data/mongo/manager.mongo.js";
import productsRouter from "./products.views.js";
import ordersRouter from "./orders.views.js";
import sessionsRouter from "./sessions.views.js"

const viewsRouter = Router()

viewsRouter.get("/", async (req, res, next) => {
    try {
        const sortAndPaginate = {
            limit: req.query.limit || 6,
            page: req.query.page || 1,
            sort: { title: 1 }
        }
        const filter = {}
        if (req.query.title) {
            filter.title = new RegExp(req.query.title.trim(), "i")
        }
        if (req.query.sort === "desc") {
            sortAndPaginate.sort.title = -1
        }
        const all = await products.read({ filter, sortAndPaginate })

        return res.render("index", {
            products: all.docs,
            totalPages: all.totalPages,
            currentPage: all.page,
            prevPage: all.prevPage,
            nextPage: all.nextPage,
            title: "INDEX",
            filter: req.query.title
        })
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

viewsRouter.get("/auth/signout", (req, res, next) => {
    try {
        return res.render("signout", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/form", sessionsRouter)
viewsRouter.use("/orders", ordersRouter)

export default viewsRouter