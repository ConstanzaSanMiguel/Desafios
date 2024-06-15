import { Router } from "express"

import passCallBack from "../../middlewares/passCallBack.js"
import isAdmin from "../../middlewares/isAdmin.js"
import { verifyToken } from "../../utils/token.util.js"
import CustomError from "../../utils/errors/CustomError.js"
import errors from "../../utils/errors/errors.js"

import dao from "../../data/index.factory.js"
const { products } = dao

const productsRouter = Router()

productsRouter.get("/real", passCallBack("jwt"), isAdmin, (req, res, next) => {
    try {
        return res.render("real", { title: "Real" })
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/form", passCallBack("jwt"), isAdmin, (req, res, next) => {
    try {
        return res.render("form", { title: "New product" })
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await products.readOne(pid)
        const token = req.cookies.token
        let user
        if (token) {
            try {
                user = verifyToken(token)
            } catch (error) {
                CustomError.new(errors.token)
            }
        }
        return res.render("detail", { product: one, title: one.title.toUpperCase(), user: user })
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/update/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const product = await products.readOne(pid);
        if (product) {
            res.render("update", { product, title: `Update ${product.title}` })
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        next(error)
    }
})

productsRouter.post("/update/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const data = req.body
        const updatedProduct = await products.update(pid, data)
        if (updatedProduct) {
            res.redirect(`/products/${pid}`);
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        next(error)
    }
})

export default productsRouter