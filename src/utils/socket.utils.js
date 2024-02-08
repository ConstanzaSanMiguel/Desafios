import { socketServer } from "../../server.js"
import { products } from "../data/mongo/manager.mongo.js"
//import products from "../data/fs/productFsManager.js"
import { users } from "../data/mongo/manager.mongo.js"
//import users from "../data/fs/userFsManager.js"

export default async (socket) => {
    console.log(`client ${socket.id} connected`)
    socket.emit("products", await products.read({}).then(data=> data.docs))
    socket.on("new product", async (data) => {
        try {
            await products.create(data)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on("newUser", async (data) => {
        try {
            await users.create(data)
        } catch (error) {
            console.log(error)
        }
    })
}