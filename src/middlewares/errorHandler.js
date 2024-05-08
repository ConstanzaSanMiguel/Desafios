import winstonLogger from "../utils/logger/index.js"

function errorHandler(error, req, res, next) {
    if (!error.statusCode || error.statusCode === 500) {
        error.statusCode = 500
        winstonLogger.ERROR(error.message)
    } else {
        winstonLogger.WARN(error.message)
    } return res.json({
        statusCode: error.statusCode || 500,
        message: `${req.method} ${req.url} - ${error.message}`
    })
}

export default errorHandler