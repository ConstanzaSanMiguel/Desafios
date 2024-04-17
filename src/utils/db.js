import { connect } from "mongoose"
import winstonLogger from "./logger/index.js"

const dbConnection = async () => {
    try {
        await connect(process.env.DB_LINK)
        winstonLogger.INFO("mongo db connected")
    } catch (error) {
        winstonLogger.WARN(error)
    }
}

export default dbConnection