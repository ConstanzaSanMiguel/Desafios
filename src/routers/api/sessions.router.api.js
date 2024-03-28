import CustomRouter from "../CustomRouter.js"
import { badauth, forbidden, googlecb, login, me, register, signout, verifyAccount } from "../../controllers/sessions.controllers.js"
import has8char from "../../middlewares/has8char.mid.js"
import passport from "../../middlewares/passport.mid.js"
import passCallBack from "../../middlewares/passCallBack.js"

export default class SessionsRouter extends CustomRouter {
    init() {
        this.create("/register", ["PUBLIC"],
            has8char,
            passport.authenticate("register", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            register)

        this.create("/login", ["PUBLIC"],
            passport.authenticate("login", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            login)

        this.create("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }))

        this.read("/google/callback",
            passport.authenticate("google", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            googlecb)

        this.create("/", ["USER", "PREM", "ADMIN"], passCallBack("jwt"), me)

        this.create("/signout", ["USER", "PREM", "ADMIN"], signout)

        this.create("/verify", ["PUBLIC"], verifyAccount)

        this.read("/badauth", ["PUBLIC"], badauth)

        this.read("/forbidden", ["PUBLIC"], forbidden)
    }
}