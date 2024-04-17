import winstonLogger from "../utils/logger/index.js"

function pathHandler(req, res, next) {
    winstonLogger.WARN(`${req.method} ${req.url} - not found endpoint`)
    return res.json({
        statusCode: 404,
        message: `${req.method} ${req.url} - not found endpoint`
    })
}

export default pathHandler