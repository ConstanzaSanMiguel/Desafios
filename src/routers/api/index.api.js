import CustomRouter from "../CustomRouter.js"
import usersRouter from "./user.router.api.js"
import ProductsRouter from "./products.router.api.js"
import ordersRouter from "./orders.router.api.js"
import sessionsRouter from "./sessions.router.api.js"
import passCallBack from "../../middlewares/passCallBack.js"

const product = new ProductsRouter()

export default class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", usersRouter)
        this.router.use("/products", product.getRouter())
        this.router.use("/orders", passCallBack("jwt"), ordersRouter)
        this.router.use("/sessions", sessionsRouter)
    }
}