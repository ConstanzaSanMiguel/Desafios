import CustomRouter from "../CustomRouter.js"
import { create, destroy, read, readOne, report, update } from "../../controllers/orders.controllers.js"
//import propsOrders from "../../middlewares/propsOrders.js"
import passCallBack from "../../middlewares/passCallBack.js"

export default class OrdersRouter extends CustomRouter {
    init() {
        this.create('/', ["USER", "PREM"], passCallBack("jwt"),/*propsOrders,*/create)
        this.read('/', ["ADMIN", "PREM"], read)
        this.read("/:uid", ["USER", "PREM"], readOne)
        this.read('/total/:uid', ["USER", "PREM"], report)
        this.update('/:oid', ["USER", "PREM"], update)
        this.destroy('/:oid', ["USER", "PREM"], destroy)
    }
}