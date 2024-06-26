import { config } from "dotenv"
import args from "./args.utils.js"

const { env } = args
const path = (env === "prod") ? ("./.env.prod") : ((env === "dev") ? ("./.env.dev") : ("./.env.test"))
config({ path })

export default {
    PORT: process.env.PORT,
    DB_LINK: process.env.DB_LINK,
    SECRET: process.env.SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD, 
    RECOVERY: process.env.RECOVERY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
}