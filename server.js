import env from "./src/utils/env.utils.js"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import morgan from "morgan"
import { engine } from "express-handlebars"
import cookieParser from "cookie-parser"
import expressSession from "express-session"
import sessionFileStore from "session-file-store"
import MongoStore from "connect-mongo"
import cors from "cors"
import socketUtils from "./src/utils/socket.utils.js"
import compression from "express-compression"
import moment from "moment"

import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import pathHandler from "./src/middlewares/pathHandler.js"
import winston from "./src/middlewares/winston.mid.js"
import winstonLogger from "./src/utils/logger/index.js"
import __dirname from "./utils.js"
import options from "./src/utils/swagger.js"
import swaggerJSDoc from "swagger-jsdoc"
import { serve, setup } from "swagger-ui-express"

const server = express()
const PORT = env.PORT || 8080
const ready = () => {
    winstonLogger.INFO("Server ready on port " + PORT)
}
const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on("connection", socketUtils)

//views
server.engine('handlebars', engine({
    helpers: {
        formatDate: function(date) {
            return moment(date).format('MMMM Do YYYY')
        },
        equals: function (a, b) {
            return a === b
        }
    }
}))
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")

//middlewares
const FileStore = sessionFileStore(expressSession)
server.use(cookieParser(env.SECRET_KEY))

//MongoStorage
server.use(
    expressSession({
        secret: env.SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            ttl: 7 * 24 * 60 * 60,
            mongoUrl: env.DB_LINK,
        }),
    })
)

const specs = swaggerJSDoc(options)
server.use("/api/docs", serve, setup(specs))

server.use(cors({
    origin: true,
    credentials: true
}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"))
server.use(winston)
server.use(compression({ brotli: { enabled: true, zlib: {} }, }))

//endpoints
server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)

export { socketServer }