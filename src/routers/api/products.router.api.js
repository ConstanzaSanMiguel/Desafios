import { Router } from "express";
import products from "../../data/fs/productFsManager.js";
import propsProducts from "../../middlewares/propsProducts.js";

const productsRouter = Router()

productsRouter.post('/', propsProducts, async (req, res, next) => {
    try {
        const data = req.body
        const response = await products.create(data)
        if (response) {
            
            return res.json({
                statusCode: 201,
                response: `Product added successfully.`,
            });
        }
    } catch (error) {
        return next(error)
    }
})

productsRouter.get('/', async (req, res, next) => {
    try {
        const productArray = await products.read();
        if (Array.isArray(productArray)) {
            return res.json({
                statusCode: 200,
                response: productArray,
            });
        } 
    } catch (error) {
        return next(error)
    }
})

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params
        const object = await products.readOne(pid);
        if (object) {
            return res.json({
                statusCode: 200,
                response: object,
            })
        }
    } catch (error) {
        return next(error)
    }
})

productsRouter.put('/:pid', async (req, res, next) => {
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
});

productsRouter.delete('/:pid', async (req, res, next) => {
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
});

export default productsRouter