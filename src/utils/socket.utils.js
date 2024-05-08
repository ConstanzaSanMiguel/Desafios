import { socketServer } from "../../server.js"
import products from "../data/mongo/manager.mongo.js"
import  users  from "../data/mongo/manager.mongo.js"
import winstonLogger from "./logger/index.js"

export default async (socket) => {
    winstonLogger.INFO(`client ${socket.id} connected`)
    socket.emit("products", await products.read({}).then(data=> data.docs))
    socket.on("new product", async (data) => {
        try {
            await products.create(data)
        } catch (error) {
            winstonLogger.WARN(error)
        }
    })
    socket.on("newUser", async (data) => {
        try {
            await users.create(data)
        } catch (error) {
            winstonLogger.WARN(error)
        }
    })
}