import { socketServer } from "../../server.js"
import products from "../data/fs/productFsManager.js"
import users from "../data/fs/userFsManager.js"

export default (socket) => {
    console.log(`client ${socket.id} connected`)
    socket.emit("products", products.read())
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