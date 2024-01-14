import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import morgan from "morgan"
import { engine } from "express-handlebars"
import products from "./src/data/fs/productFsManager.js"
import users from "./src/data/fs/userFsManager.js"

import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import pathHandler from "./src/middlewares/pathHandler.js"
import __dirname from "./utils.js"

const server = express()
const PORT = 8080
const ready = () => console.log("Server ready on port " + PORT)
const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on("connection", (socket) => {
    console.log(`client ${socket.id} connected`)
    socket.emit("products", products.read())
    socket.on("new product", async(data)=>{
        try {
            await products.create(data)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on("newUser", async(data)=>{
        try {
            await users.create(data)
        } catch (error) {
            console.log(error)
        }
    })
})

//views
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")

//middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"))

//endpoints
server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)