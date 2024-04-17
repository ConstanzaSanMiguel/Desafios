import winstonLogger from "./logger/index.js"

process.on("exit", (code) =>
    winstonLogger.INFO("The process ended with code " + code)
)

process.on("uncaughtException", (error) =>
    winstonLogger.WARN("An error has occurred: " + error.message)
)

winstonLogger.INFO("Process PID: " + process.pid)
process.pid()
process.exit(1)