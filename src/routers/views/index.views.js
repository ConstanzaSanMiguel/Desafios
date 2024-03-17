import CustomRouter from "../CustomRouter.js"

/*import productsRouter from "../api/products.router.api.js"
//import products from "../../data/fs/productFsManager.js"
import sessionsRouter from "../api/sessions.router.api.js"
import ordersRouter from "../api/orders.router.api.js"*/

import { orders, products, users } from "../../data/mongo/manager.mongo.js"
import productsRouter from "./products.views.js"
import ordersRouter from "./orders.views.js"
import sessionsRouter from "./sessions.views.js"

export default class ViewsRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], async (req, res, next) => {
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

        this.read("/real", ["PUBLIC"], async (req, res, next) => {
            try {
                const all = await products.read({})
                return res.render("real", { products: all })
            } catch (error) {
                next(error)
            }
        })

        this.read("/products/form", ["ADMIN", "PREM"], (req, res, next) => {
            try {
                return res.render("form", {})
            } catch (error) {
                next(error)
            }
        })

        this.read("/auth/register", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("register", {})
            } catch (error) {
                next(error)
            }
        })

        this.read("/auth/login", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("login", {})
            } catch (error) {
                next(error)
            }
        })

        this.read("/auth/signout", ["USER", "ADMIN", "PREM"], (req, res, next) => {
            try {
                return res.render("signout", {})
            } catch (error) {
                next(error)
            }
        })

        this.router.use("/products", productsRouter)
        this.router.use("/orders", ordersRouter)
        this.router.use("/form", sessionsRouter)
    }
}


