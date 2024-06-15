import args from "../utils/args.utils.js"
import dbConnection from "../utils/dbConnection.utils.js"
import env from "../utils/env.utils.js"
import winstonLogger from "../utils/logger/index.js"
const { DB_LINK } = env

const environment = args.env

let dao = {}

switch (environment) {
    case "test":
        winstonLogger.INFO("Memory connected")
        const { default: productsMemory } = await import("./memory/productManager.js")
        dao = { products: productsMemory }
        break
    case "dev":
        winstonLogger.INFO("FS connected")
        const { default: productsFs } = await import("./fs/productFsManager.js")
        const { default: usersFs } = await import("./fs/userFsManager.js")
        const { default: ordersFs } = await import("./fs/ordersFsManager.js")
        dao = { products: productsFs, users: usersFs, orders: ordersFs }
        break
    case "prod":
        dbConnection().then(() => winstonLogger.INFO("Mongo connected"))
        const { default: productsMongo } = await import("./mongo/products.mongo.js")
        const { default: usersMongo } = await import("./mongo/users.mongo.js")
        const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
        dao = { products: productsMongo, users: usersMongo, orders: ordersMongo }
        break
    default:
        break
}

export default dao