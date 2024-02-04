import { Router } from "express"
//import orders from "../../data/fs/ordersFsManager.js"
import { orders } from "../../data/mongo/manager.mongo.js"
//import propsOrders from "../../middlewares/propsOrders.js"

const ordersRouter = Router()

ordersRouter.post('/', /*propsOrders,*/ async (req, res, next) => {
    try {
        const data = req.body
        const response = await orders.create(data)
        if (response) {
            return res.json({
                statusCode: 201,
                response: `Order added successfully.`,
            })
        }
    } catch (error) {
        return next(error)
    }
})

ordersRouter.get('/', async (req, res, next) => {
    try {
        const ordersArray = await orders.read({})
        if (Array.isArray(ordersArray)) {
            return res.json({
                statusCode: 200,
                response: ordersArray,
            })
        }
    } catch (error) {
        return next(error)
    }
})

ordersRouter.get("/:uid", async (req, res, next) => {
    const { uid } = req.params
    const filter = {uid : uid}
    try {
        const one = await orders.read({filter})
        res.json(one)
    } catch (error) {
        return next(error)
    }
})

ordersRouter.delete('/:oid', async (req, res, next) => {
    try {
        const { oid } = req.params
        const response = await orders.destroy(oid)
        if (response) {
            return res.json({
                statusCode: 200,
                response: `Deleted order with id ${oid} successfully.`,
            })
        } 
    } catch (error) {
        return next(error)
    }
})

ordersRouter.put('/:oid', async (req, res, next) => {
    try {
        const { oid } = req.params
        const data = req.body
        //const { quantity, state } = data

        const response = await orders.update(oid, /*quantity, state*/ data)
        
        if (response) {
            return res.json({
                statusCode: 200,
                response: `User with id ${oid} has been updated successfully.`,
            })
        }
    } catch (error) {
        return next(error)
    }
})

export default ordersRouter