import { connect } from "mongoose"
import winstonLogger from "./logger/index.js"

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK)
    winstonLogger.INFO("Connection to the database was successful.")
  } catch (error) {
    winstonLogger.WARN(error)
  }
}

export default dbConnection