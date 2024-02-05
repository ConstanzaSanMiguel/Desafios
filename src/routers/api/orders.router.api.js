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
        const sortAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { _id: 1 }
        }

        const filter = {}
        if (req.query._id) {
            filter._id = req.query._id
        }

        const all = await orders.read({ filter, sortAndPaginate })
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

ordersRouter.get("/:uid", async (req, res, next) => {
    const { uid } = req.params
    const filter = { uid: uid }
    try {
        const one = await orders.read({ filter })
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

ordersRouter.get('/total/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params
        const report = await orders.report(uid)
        return res.json({
            statusCode: 201,
            response: report
        })
    } catch (error) {
        return next(error)
    }
})

export default ordersRouter