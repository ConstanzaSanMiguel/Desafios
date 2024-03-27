import ordersService from "../services/orders.services.js"
import { verifyToken } from "../utils/token.util.js"

class OrdersController {
    constructor() {
        this.service = ordersService
    }

    create = async (req, res, next) => {
        try {
            const product_id = req.body.product

            const data = {
                uid: req.user._id,
                pid: product_id,
            }

            const response = await this.service.create(data)
            if (response) {
                return res.success201(response)
            }
        } catch (error) {
            return next(error)
        }
    }
    read = async (req, res, next) => {
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

            const all = await this.service.read({ filter/*, sortAndPaginate*/ })
            if (all) {
                return res.success200(all)
            } else {
                return res.error404()
            }
        } catch (error) {
            return next(error)
        }
    }
    readOne = async (req, res, next) => {
        const { uid } = req.params
        const filter = { uid: uid }
        try {
            const one = await this.service.read({ filter })
            res.json(one)
        } catch (error) {
            return next(error)
        }
    }
    report = async (req, res, next) => {
        try {
            const data = verifyToken(req.cookies.token)
            console.log('user', data)
            const { uid } = data
            const report = await this.service.report(uid)
            return res.success201(report)
        } catch (error) {
            return next(error)
        }
    }
    update = async (req, res, next) => {
        try {
            const { oid } = req.params
            const data = req.body
            //const { quantity, state } = data

            const response = await this.service.update(oid, /*quantity, state*/ data)

            if (response) {
                return res.success200(`User with id ${oid} has been updated successfully.`,)
            }
        } catch (error) {
            return next(error)
        }
    }
    destroy = async (req, res, next) => {
        try {
            const { oid } = req.params
            const response = await this.service.destroy(oid)
            if (response) {
                return res.success200(`Deleted order with id ${oid} successfully.`,)
            }
        } catch (error) {
            return next(error)
        }
    }
}

const controller = new OrdersController()
const { create, read, readOne, report, update, destroy } = controller

export default OrdersController
export { create, read, readOne, report, update, destroy }