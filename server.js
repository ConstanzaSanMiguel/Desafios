import "dotenv/config.js"

import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import morgan from "morgan"
import { engine } from "express-handlebars"
import socketUtils from "./src/utils/socket.utils.js"
import dbConnection from "./src/utils/db.js"
//import products from "./src/data/fs/productFsManager.js"
//import users from "./src/data/fs/userFsManager.js"

import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import pathHandler from "./src/middlewares/pathHandler.js"
import __dirname from "./utils.js"

const server = express()
const PORT = process.env.PORT || 8080
const ready = () => { 
    console.log("Server ready on port " + PORT) 
    dbConnection()
}
const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on("connection", socketUtils)

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

export { socketServer }