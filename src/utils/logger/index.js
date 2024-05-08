import env from "../env.utils.js"

const persistence = env.MODE || "PROD"

let logger

switch (persistence) {
    case "PROD":
        const { default: winstonProd } = await import("./winstonProd.utils.js")
        logger = winstonProd
        break
    default:
        const { default: winstonDev } = await import("./winstonDev.utils.js")
        logger = winstonDev
        break
}

export default logger