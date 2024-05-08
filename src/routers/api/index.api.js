import CustomRouter from "../CustomRouter.js"
import UsersRouter from "./user.router.api.js"
import ProductsRouter from "./products.router.api.js"
import OrdersRouter from "./orders.router.api.js"
import SessionsRouter from "./sessions.router.api.js"
import passCallBack from "../../middlewares/passCallBack.js"

import winstonLogger from "../../utils/logger/index.js"
import fs from "fs"
import args from "../../utils/args.utils.js"

const product = new ProductsRouter()
const user = new UsersRouter()
const order = new OrdersRouter()
const session = new SessionsRouter()

const environment = args.env
function getLogFileName() {
    return environment === 'dev' ? 'errorsDev.log' : 'errorsProd.log'
}

export default class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", user.getRouter())
        this.router.use("/products", product.getRouter())
        this.router.use("/orders", passCallBack("jwt"), order.getRouter())
        this.router.use("/sessions", session.getRouter())
        this.router.use("/loggers", (req, res, next) => {
            try {
                const logFileName = getLogFileName()
                fs.readFile(`./src/utils/errors/${logFileName}`, 'utf8', (err, data) => {
                    if (err) {
                        winstonLogger.WARN('Cannot read the log file:', err)
                        return res.status(500).send('Cannot read the log file')
                    }
                    const logs = data.split('\n').filter(log => log.trim() !== '')
                    res.send(`
                        <style>
                            ul {
                                list-style-type: none;
                            }
                        </style>
                        <ul>${logs.map(log => `<li>${log}</li>`).join('')}</ul>
                    `)
                })
            } catch (error) {
                return next(error)
            }
        })
    }
}