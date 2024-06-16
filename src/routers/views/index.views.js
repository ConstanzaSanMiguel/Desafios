import CustomRouter from "../CustomRouter.js"
import dao from "../../data/index.factory.js"
const { products } = dao

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
                    title: "VIBE - The place you've been looking for",
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

        this.read("/products/form", ["ADMIN"], (req, res, next) => {
            try {
                return res.render("form", {title: "VIBE - Order"})
            } catch (error) {
                next(error)
            }
        })

        this.read("/register", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("register", {title: "VIBE - Register"})
            } catch (error) {
                next(error)
            }
        })

        this.read("/login", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("login", {title: "VIBE - Login"})
            } catch (error) {
                next(error)
            }
        })

        this.read("/profile", ["USER", "ADMIN", "PREM"], (req, res, next) => {
            try {
                if (!req.user) {
                    return res.render('user', { users: [] })
                }
                const userData = req.user
                return res.render('user', { users: userData, title: "VIBE - User profile" })
            } catch (error) {
                next(error)
            }
        })

        this.read("/signout", ["USER", "ADMIN", "PREM"], (req, res, next) => {
            try {
                return res.render("signout", {})
            } catch (error) {
                next(error)
            }
        })

        this.read("/verify", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("verify", {title: "VIBE - Verification"})
            } catch (error) {
                next(error)
            }
        })

        this.read("/password", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("password", {title: "VIBE - Password recovery"})
            } catch (error) {
                next(error)
            }
        })

        this.read("/recovery", ["PUBLIC"], (req, res, next) => {
            try {
                return res.render("recovery", {title: "VIBE - Password recovery"})
            } catch (error) {
                next(error)
            }
        })

        this.read("/thanks", ["USER", "PREM"], (req, res, next) => {
            try {
                return res.render("thanks", {title: "VIBE - Thanks for your purchase"})
            } catch (error) {
                next(error)
            }
        })

        this.router.use("/products", productsRouter)
        this.router.use("/orders", ordersRouter)
        this.router.use("/sessions", sessionsRouter)
    }
}


