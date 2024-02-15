import { Router } from "express"
//import products from "../../data/fs/productFsManager.js"
import { products } from "../../data/mongo/manager.mongo.js"
import propsProducts from "../../middlewares/propsProducts.js"
//import isStockOkUtils from "../../utils/isStockOk.utils.js"
import isAdmin from "../../middlewares/isAdmin.js"

const productsRouter = Router()

productsRouter.post('/', isAdmin, propsProducts, async (req, res, next) => {
    try {
        const data = req.body
        const response = await products.create(data)
        if (response) {
            return res.json({
                statusCode: 201,
                response: `Product added successfully.`,
            })
        }
    } catch (error) {
        return next(error)
    }
})

productsRouter.get('/', async (req, res, next) => {
    try {
        const sortAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { title: 1 }
        }
        const filter = {}
        if (req.query.title) {
            filter.title = new RegExp(req.query.title.trim(),'i')
        }

        const all = await products.read({ filter, sortAndPaginate })
        if (all) {
            return res.json({
                statusCode: 200,
                response: all,
            })
        } else {
            return res.json({
                statusCode: 404,
                response: "not found!",
            })
        }
    } catch (error) {
        return next(error)
    }
})

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await products.readOne(pid)
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            })
        }
    } catch (error) {
        return next(error)
    }
})

productsRouter.put('/:pid', isAdmin, /*isStockOkUtils,*/ async (req, res, next) => {
    try {
        const { pid } = req.params
        const data = req.body

        const response = await products.update(pid, data)

        if (response instanceof Error) {
            return res.json({
                statusCode: 400,
                response,
            })
        } else {
            return res.json({
                statusCode: 200,
                response: `Product with id ${pid} has been updated successfully.`,
            })
        }
    } catch (error) {
        return next(error)
    }
})

productsRouter.delete('/:pid', isAdmin, async (req, res, next) => {
    try {
        const { pid } = req.params
        const response = await products.destroy(pid)

        if (response) {
            return res.json({
                statusCode: 200,
                response: `Deleted product with id ${pid} successfully.`,
            })
        }
    } catch (error) {
        return next(error)
    }
})

export default productsRouter