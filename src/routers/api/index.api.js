import CustomRouter from "../CustomRouter.js"
import UsersRouter from "./user.router.api.js"
import ProductsRouter from "./products.router.api.js"
import OrdersRouter from "./orders.router.api.js"
import SessionsRouter from "./sessions.router.api.js"
import passCallBack from "../../middlewares/passCallBack.js"

const product = new ProductsRouter()
const user = new UsersRouter()
const order = new OrdersRouter()
const session = new SessionsRouter()

export default class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", user.getRouter())
        this.router.use("/products", product.getRouter())
        this.router.use("/orders", passCallBack("jwt"), order.getRouter())
        this.router.use("/sessions", session.getRouter())
    }
}