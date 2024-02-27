import { Router } from "express"
//import orders from "../../data/fs/ordersFsManager.js"
import { orders } from "../../data/mongo/manager.mongo.js"
//import propsOrders from "../../middlewares/propsOrders.js"
import passCallBack from "../../middlewares/passCallBack.js"
import { verifyToken } from "../../utils/token.util.js"

const ordersRouter = Router()

ordersRouter.post('/', passCallBack("jwt"), /*propsOrders,*/ async (req, res, next) => {
    try {
        const product_id = req.body.product

        const data = {
            uid: req.user._id,
            pid: product_id,
        }

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
        /*const sortAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { _id: 1 }
        }*/

        const filter = {}
        if (req.query.user_id) {
            filter.user_id = req.query.user_id
        }

        const all = await orders.read({ filter/*, sortAndPaginate*/ })
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
        const data = verifyToken(req.cookies.token)
        console.log('user', data)
        const { uid } = data
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