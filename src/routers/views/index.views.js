import { Router } from "express"

import productsRouter from "../api/products.router.api.js"
import products from "../../data/fs/productFsManager.js"

const viewsRouter = Router()


viewsRouter.get("/", (req,res,next)=>{
    try {
        const all = products.read()
        return res.render("index", {products: all})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/real", (req, res, next) => {
    try {
        const all = products.read()
        return res.render("real", { products: all })
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/form", (req,res,next)=>{
    try {
        return res.render("form", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get("/register", (req,res,next)=>{
    try {
        return res.render("register", {})
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/products", productsRouter)
export default viewsRouter;