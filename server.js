import "dotenv/config.js"

import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import morgan from "morgan"
import { engine } from "express-handlebars"
import expressSession from "express-session"
import sessionFileStore from "session-file-store"
import MongoStore from "connect-mongo"
//import products from "./src/data/fs/productFsManager.js"
//import users from "./src/data/fs/userFsManager.js"
import socketUtils from "./src/utils/socket.utils.js"

import IndexRouter from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import pathHandler from "./src/middlewares/pathHandler.js"
import __dirname from "./utils.js"
import dbConnection from "./src/utils/db.js"
import session from "express-session"
import cookieParser from "cookie-parser"

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
const FileStore = sessionFileStore(expressSession)
server.use(cookieParser(process.env.SECRET_KEY))

//MemoryStore
// server.use(
//     expressSession({
//         secret: process.env.SECRET_KEY,
//         resave: true,
//         saveUninitialized: true,
//         cookie: { maxAge: 60000 },
//     })
// )

//FileStore
// server.use(
//     expressSession({
//         secret: process.env.SECRET_KEY,
//         resave: true,
//         saveUninitialized: true,
//         store: new FileStore({
//             path: "./src/data/fs/files/sessions",
//             ttl: 10,
//             retries: 2,
//         }),
//     })
// )

//MongoStorage
server.use(
    expressSession({
        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            ttl: 7 * 24 * 60 * 60,
            mongoUrl: process.env.DB_LINK,
        }),
    })
)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"))

//endpoints
const router = new IndexRouter()
server.use("/", router.getRouter())
server.use(errorHandler)
server.use(pathHandler)

export { socketServer }